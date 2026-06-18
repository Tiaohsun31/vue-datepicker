/**
 * useDateRange.ts
 * 專門處理日期範圍選擇的 Composable
 */

import { computed, watch, nextTick, toValue, type Ref, type MaybeRefOrGetter } from 'vue';
import { warn } from '../utils/logger';
import { useDateTimeValidation } from './useDateTimeValidation';
import { useDateTimeValue } from './useDateTimeValue';
import { useCalendarPopup } from './useCalendarPopup';
import { useInputNavigation } from './useInputNavigation';
import {
    parseInputToSimpleDate,
    formatSimpleDate,
    formatOutput,
    getNow,
    compareDates,
    addDays,
    calculateDaysDifference,
    getCurrentMonthRange,
    type SimpleDateValue,
    type DateTimeInput,
    createSimpleDate
} from '../utils/dateUtils';
import type { OutputType, DateRangeShortcut } from '../types/public';
import type { FieldErrorParams, ErrorParams, DateTimeInputExpose } from '../types/internal';

/** useDateTimeValidation 的回傳型別（驗證 API），供 handler 取代 `validation: any`。 */
type ValidationApi = ReturnType<typeof useDateTimeValidation>;

// 類型定義
interface DateRangeOptions {
    calendar?: string;
    // 接受響應式來源（ref / getter / 純值），讓掛載後的外部 v-model 更新能傳播。
    modelValue?: MaybeRefOrGetter<{ start: DateTimeInput; end: DateTimeInput } | null>;
    showTime?: boolean;
    required?: boolean;
    disabled?: Ref<boolean>;
    incomplete?: boolean;
    dateFormat?: string;
    timeFormat?: string;
    outputType?: OutputType;
    useStrictISO?: boolean;
    enableSeconds?: boolean;
    minDate?: DateTimeInput;
    maxDate?: DateTimeInput;
    maxRange?: number;
    minRange?: number;
    locale?: string;
    // i18n：由元件傳入（取自 useLocale），讓預設快捷選項標籤跟隨語系。
    getMessage?: (path: string, variables?: ErrorParams) => string;
    localeRef?: Readonly<Ref<string>>;
}

interface DateRangeRefs {
    containerRef: Ref<HTMLElement | null>;
    calendarRef: Ref<HTMLElement | null>;
    startDateInputRef: Ref<DateTimeInputExpose | null>;
    endDateInputRef: Ref<DateTimeInputExpose | null>;
    startTimeInputRef: Ref<DateTimeInputExpose | null>;
    endTimeInputRef: Ref<DateTimeInputExpose | null>;
}

interface DateRangeEmitters {
    update?: (range: { start: DateTimeInput; end: DateTimeInput } | null) => void;
    change?: (range: { start: DateTimeInput; end: DateTimeInput } | null) => void;
    validation?: (isValid: boolean, errors: Record<string, string>, errorParams?: FieldErrorParams) => void;
}

interface RangeValidationResult {
    valid: boolean;
    error?: string;
    params?: ErrorParams;
}

// 常量定義
const DEFAULT_START_TIME = '00:00:00';
const DEFAULT_END_TIME = '23:59:59';

export function useDateRange(
    options: DateRangeOptions = {},
    refs: DateRangeRefs
) {
    // 解構配置選項並設置默認值
    const {
        calendar = 'gregory',
        showTime = false,
        required = false,
        incomplete = false,
        dateFormat = 'YYYY-MM-DD',
        timeFormat = 'HH:mm:ss',
        outputType = 'iso',
        useStrictISO = false,
        enableSeconds = false,
        minDate,
        maxDate,
        maxRange,
        minRange,
        locale = 'zh-TW',
    } = options;

    const {
        containerRef,
        calendarRef,
        startDateInputRef,
        endDateInputRef,
        startTimeInputRef,
        endTimeInputRef
    } = refs;

    // 狀態管理
    const isDisabled = computed(() => options.disabled?.value ?? false);
    let emitters: DateRangeEmitters = {};

    // 初始化子 composables
    const startValidation = useDateTimeValidation({
        required,
        showTime,
        minDate,
        maxDate,
        dateFormat
    });

    const endValidation = useDateTimeValidation({
        required,
        showTime,
        minDate,
        maxDate,
        dateFormat
    });

    const startDateTime = useDateTimeValue({
        showTime,
        dateFormat,
        timeFormat,
        outputType,
        defaultTime: DEFAULT_START_TIME,
        enableSeconds
    });

    const endDateTime = useDateTimeValue({
        showTime,
        dateFormat,
        timeFormat,
        outputType,
        defaultTime: DEFAULT_END_TIME,
        enableSeconds
    });

    const calendarPopup = useCalendarPopup(
        containerRef,
        calendarRef,
        { disabled: isDisabled }
    );

    const startNavigation = useInputNavigation(
        { dateInputRef: startDateInputRef, timeInputRef: startTimeInputRef },
        { showTime, autoFocusTimeAfterDate: true }
    );

    const endNavigation = useInputNavigation(
        { dateInputRef: endDateInputRef, timeInputRef: endTimeInputRef },
        { showTime, autoFocusTimeAfterDate: true }
    );

    const hasRangeValue = computed(() =>
        startDateTime.hasValue.value || endDateTime.hasValue.value
    );

    const mergedErrors = computed(() => {
        const errors = {
            ...startValidation.mergedErrors.value,
            ...endValidation.mergedErrors.value
        };

        // 檢查範圍完整性
        if (startDateTime.internalDateTime.value &&
            !endDateTime.internalDateTime.value &&
            incomplete) {
            errors['range.endRequired'] = 'range.endRequired';
        }

        return errors;
    });

    const mergedErrorParams = computed(() => ({
        ...startValidation.mergedErrorParams.value,
        ...endValidation.mergedErrorParams.value
    }));

    const hasErrors = computed(() => Object.keys(mergedErrors.value).length > 0);

    // 純函數：只回傳布林，不產生副作用（範圍錯誤的設定/清除改由 applyRangeConstraintValidation 處理）。
    const isValidRange = computed(() => {
        const start = startDateTime.internalDateTime.value;
        const end = endDateTime.internalDateTime.value;

        if (!start || !end) return false;

        // 檢查日期順序
        if (compareDates(start, end) > 0) return false;

        // 檢查範圍限制
        if (maxRange || minRange) {
            const diffDays = calculateDaysDifference(start, end);
            if (maxRange && diffDays > maxRange) return false;
            if (minRange && diffDays < minRange) return false;
        }

        return !hasErrors.value;
    });

    // 標籤走 i18n（getMessage）；未提供 getMessage 或該語系缺 shortcuts 時，回退繁中字面值（向後相容）。
    const shortcutLabel = (key: string, fallback: string) => {
        if (!options.getMessage) return fallback;
        const path = `shortcuts.${key}`;
        const msg = options.getMessage(path);
        return msg === path ? fallback : msg; // getMessage 找不到時回傳原 path
    };

    const shortcuts = computed<DateRangeShortcut[]>(() => {
        // 反應式依賴：語系變更時重新計算標籤。
        void options.localeRef?.value;
        return [
            {
                label: shortcutLabel('today', '今天'),
                getValue: () => {
                    const today = getNow();
                    return {
                        start: createSimpleDate(today.year, today.month, today.day, 0, 0, 0),
                        end: createSimpleDate(today.year, today.month, today.day, 23, 59, 59)
                    };
                }
            },
            {
                label: shortcutLabel('last7Days', '最近7天'),
                getValue: () => ({
                    start: addDays(getNow(), -6),
                    end: getNow()
                })
            },
            {
                label: shortcutLabel('last30Days', '最近30天'),
                getValue: () => ({
                    start: addDays(getNow(), -29),
                    end: getNow()
                })
            },
            {
                label: shortcutLabel('thisMonth', '本月'),
                getValue: getCurrentMonthRange
            }
        ];
    });

    // 計算動態的最大/最小日期約束
    const startDateConstraints = computed(() => {
        return {
            minDate: parseInputToSimpleDate(minDate, locale),
            maxDate: endDateTime.internalDateTime.value || parseInputToSimpleDate(maxDate, locale)
        };
    });

    const endDateConstraints = computed(() => {
        return {
            minDate: startDateTime.internalDateTime.value || parseInputToSimpleDate(minDate, locale),
            maxDate: parseInputToSimpleDate(maxDate, locale)
        };
    });

    // 格式化約束日期為字符串（供 DateInput 使用）
    const startDateConstraintsStr = computed(() => {
        return {
            minDate: startDateConstraints.value.minDate ? formatSimpleDate(startDateConstraints.value.minDate, dateFormat) : null,
            maxDate: startDateConstraints.value.maxDate ? formatSimpleDate(startDateConstraints.value.maxDate, dateFormat) : null
        };
    });

    const endDateConstraintsStr = computed(() => {
        return {
            minDate: endDateConstraints.value.minDate ? formatSimpleDate(endDateConstraints.value.minDate, dateFormat) : null,
            maxDate: endDateConstraints.value.maxDate ? formatSimpleDate(endDateConstraints.value.maxDate, dateFormat) : null
        };
    });

    function validateRangeConstraints(start: SimpleDateValue, end: SimpleDateValue): RangeValidationResult {
        const diffDays = calculateDaysDifference(start, end);

        if (maxRange && diffDays > maxRange) {
            return {
                valid: false,
                error: 'range.exceedsMaxRange',
                params: { maxRange, actualDays: diffDays }
            };
        }

        if (minRange && diffDays < minRange) {
            return {
                valid: false,
                error: 'range.belowMinRange',
                params: { minRange, actualDays: diffDays }
            };
        }

        return { valid: true };
    }

    function handleRangeValidationError(rangeValidation: RangeValidationResult) {
        if (!rangeValidation.error || !rangeValidation.params) return;

        endValidation.handleDateValidation(
            false,
            { range: rangeValidation.error },
            'endDate',
            { range: rangeValidation.params }
        );
    }

    // 範圍限制驗證的副作用（原本誤置於 isValidRange computed 內）。
    // 由 emitRangeEvents 在每次完整範圍變更時呼叫，集中設定/清除範圍錯誤。
    function applyRangeConstraintValidation(start: SimpleDateValue, end: SimpleDateValue) {
        if (!(maxRange || minRange)) return;
        const result = validateRangeConstraints(start, end);
        if (!result.valid) {
            handleRangeValidationError(result);
        } else {
            endValidation.clearFieldErrors('range');
        }
    }

    function emitRangeEvents() {
        if (!startDateTime.internalDateTime.value || !endDateTime.internalDateTime.value) {
            emitters.update?.(null);
            emitters.change?.(null);
            return;
        }

        const finalTimeFormat = showTime ? timeFormat : undefined;
        const range = {
            start: formatOutput(
                startDateTime.internalDateTime.value,
                outputType,
                dateFormat,
                finalTimeFormat,
                showTime,
                calendar,
                locale,
                useStrictISO,
                enableSeconds
            ),
            end: formatOutput(
                endDateTime.internalDateTime.value,
                outputType,
                dateFormat,
                finalTimeFormat,
                showTime,
                calendar,
                locale,
                useStrictISO,
                enableSeconds
            )
        };

        emitters.update?.(range);
        emitters.change?.(range);

        // 在發送驗證狀態前，套用範圍限制驗證（設定/清除範圍錯誤）
        applyRangeConstraintValidation(
            startDateTime.internalDateTime.value,
            endDateTime.internalDateTime.value
        );

        // 發送驗證狀態
        const isValid = isValidRange.value && !hasErrors.value;
        emitters.validation?.(isValid, mergedErrors.value, mergedErrorParams.value);
    }

    function clearFieldErrors(validation: ValidationApi, fields: string[]) {
        fields.forEach(field => validation.clearFieldErrors(field));
    }

    // 事件處理函數
    const setEmitters = (newEmitters: DateRangeEmitters) => {
        emitters = newEmitters;
    };

    const handleValidation = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        validation: ValidationApi,
        fieldPrefix: string,
        errorParams?: FieldErrorParams
    ) => {
        validation.handleDateValidation(isValid, validationErrors, fieldPrefix, errorParams);
        emitters.validation?.(!hasErrors.value, mergedErrors.value, mergedErrorParams.value);
    };

    // start / end 兩側的事件處理近乎複製貼上，差別只在所用的 validation/dateTime/navigation 實例、
    // 欄位前綴與預設時間 → 抽成 factory，消除重複（§5.6）。
    const createSideHandlers = (
        validation: ValidationApi,
        dateTime: ReturnType<typeof useDateTimeValue>,
        navigation: ReturnType<typeof useInputNavigation>,
        config: {
            datePrefix: 'startDate' | 'endDate';
            timePrefix: 'startTime' | 'endTime';
            defaultTime: string;
            /** 日期完成後的額外副作用（如 start 在非時間模式時把焦點轉到 end 側）。 */
            onDateComplete?: () => void;
        }
    ) => {
        const handleDateValidation = (
            isValid: boolean,
            validationErrors: Record<string, string>,
            errorParams?: FieldErrorParams
        ) => {
            handleValidation(isValid, validationErrors, validation, config.datePrefix, errorParams);
        };

        const handleTimeValidation = (
            isValid: boolean,
            validationErrors: Record<string, string>,
            errorParams: FieldErrorParams = {}
        ) => {
            validation.handleTimeValidation(isValid, validationErrors, config.timePrefix, errorParams);
            emitters.validation?.(!hasErrors.value, mergedErrors.value, mergedErrorParams.value);
        };

        const handleDateComplete = (dateStr: string) => {
            dateTime.inputDateValue.value = dateStr;
            const updatedDateTime = dateTime.updateFromInputs();

            if (!updatedDateTime) {
                validation.handleDateValidation(false, { date: 'date.invalid' });
                return;
            }

            if (!validation.validateDateRange(updatedDateTime)) {
                return;
            }
            navigation.autoFocusTimeAfterDateComplete(dateTime, config.defaultTime);
            emitRangeEvents();

            clearFieldErrors(validation, [config.datePrefix, 'date.year', 'date.month', 'date.day']);

            config.onDateComplete?.();
        };

        const handleTimeComplete = (timeStr: string) => {
            dateTime.inputTimeValue.value = timeStr;
            const updatedDateTime = dateTime.updateFromInputs();

            if (updatedDateTime) {
                emitRangeEvents();
            }

            clearFieldErrors(validation, [config.timePrefix, 'time.hour', 'time.minute', 'time.second']);
        };

        return { handleDateValidation, handleTimeValidation, handleDateComplete, handleTimeComplete };
    };

    const startHandlers = createSideHandlers(startValidation, startDateTime, startNavigation, {
        datePrefix: 'startDate',
        timePrefix: 'startTime',
        defaultTime: DEFAULT_START_TIME,
        // 非時間模式下，start 日期完成後把焦點轉到 end 側第一個輸入框。
        onDateComplete: () => {
            if (!showTime) {
                endNavigation.focusFirstInput();
            }
        }
    });

    const endHandlers = createSideHandlers(endValidation, endDateTime, endNavigation, {
        datePrefix: 'endDate',
        timePrefix: 'endTime',
        defaultTime: DEFAULT_END_TIME
    });

    const handleStartDateValidation = startHandlers.handleDateValidation;
    const handleEndDateValidation = endHandlers.handleDateValidation;
    const handleStartTimeValidation = startHandlers.handleTimeValidation;
    const handleEndTimeValidation = endHandlers.handleTimeValidation;
    const handleStartDateComplete = startHandlers.handleDateComplete;
    const handleEndDateComplete = endHandlers.handleDateComplete;
    const handleStartTimeComplete = startHandlers.handleTimeComplete;
    const handleEndTimeComplete = endHandlers.handleTimeComplete;

    const handleCalendarRangeSelect = (startDate: SimpleDateValue | null, endDate: SimpleDateValue | null) => {
        if (startDate && !endDate) {
            handleSingleDateSelect(startDate);
        } else if (startDate && endDate) {
            handleRangeSelect(startDate, endDate);
        } else {
            clearRange();
        }

        emitRangeEvents();
    };

    function handleSingleDateSelect(startDate: SimpleDateValue) {
        if (!startValidation.validateDateRange(startDate)) {
            return;
        }

        startDateTime.setInternalDateTime(startDate);
        clearFieldErrors(startValidation, ['startDate', 'date.year', 'date.month', 'date.day']);
        endDateTime.clearValues();
    }

    function handleRangeSelect(startDate: SimpleDateValue, endDate: SimpleDateValue) {
        if (!startValidation.validateDateRange(startDate) ||
            !endValidation.validateDateRange(endDate)) {
            return;
        }

        if (maxRange || minRange) {
            const rangeValidation = validateRangeConstraints(startDate, endDate);
            if (!rangeValidation.valid) {
                handleRangeValidationError(rangeValidation);
                return;
            }
        }

        startDateTime.setInternalDateTime(startDate);
        endDateTime.setInternalDateTime(endDate);

        // 應用默認時間
        if (showTime) {
            if (!startDateTime.inputTimeValue.value) {
                startDateTime.inputTimeValue.value = DEFAULT_START_TIME;
                startDateTime.updateFromInputs();
            }
            if (!endDateTime.inputTimeValue.value) {
                endDateTime.inputTimeValue.value = DEFAULT_END_TIME;
                endDateTime.updateFromInputs();
            }
        }

        clearFieldErrors(startValidation, ['startDate', 'endDate', 'range', 'date.year', 'date.month', 'date.day']);
        clearFieldErrors(endValidation, ['startDate', 'endDate', 'range', 'date.year', 'date.month', 'date.day']);
    }

    const handleTimeSelect = (timeValue: string, source: 'start' | 'end') => {
        if (source === 'start' && startDateTime.internalDateTime.value) {
            handleStartTimeComplete(timeValue);
        }
        if (source === 'end' && endDateTime.internalDateTime.value) {
            handleEndTimeComplete(timeValue);
        }
    };

    const applyShortcut = (shortcut: DateRangeShortcut) => {
        const range = shortcut.getValue();

        startDateTime.setInternalDateTime(range.start);
        endDateTime.setInternalDateTime(range.end);

        if (showTime) {
            if (!startDateTime.inputTimeValue.value) {
                startDateTime.inputTimeValue.value = DEFAULT_START_TIME;
                startDateTime.updateFromInputs();
            }
            if (!endDateTime.inputTimeValue.value) {
                endDateTime.inputTimeValue.value = DEFAULT_END_TIME;
                endDateTime.updateFromInputs();
            }
        }

        emitRangeEvents();
    };

    const clearRange = () => {
        startDateTime.clearValues();
        endDateTime.clearValues();
        startValidation.clearAllErrors();
        endValidation.clearAllErrors();
        emitRangeEvents();
    };

    const setRange = (range: { start: DateTimeInput; end: DateTimeInput } | null) => {
        if (range) {
            startDateTime.setExternalValue(range.start);
            endDateTime.setExternalValue(range.end);
        } else {
            clearRange();
        }
        emitRangeEvents();
    };

    const validate = () => {
        startDateInputRef.value?.validate();
        endDateInputRef.value?.validate();

        if (showTime) {
            startTimeInputRef.value?.validate();
            endTimeInputRef.value?.validate();
        }

        return isValidRange.value;
    };

    const focusStartDate = (event: MouseEvent) => {
        calendarPopup.handleContainerClick(event, () => {
            startNavigation.focusFirstInput();
        });
    };

    const focusEndDate = (event: MouseEvent) => {
        calendarPopup.handleContainerClick(event, () => {
            endNavigation.focusFirstInput();
        });
    };

    // 監聽外部值變化並驗證日期順序（toValue 解析響應式來源，支援受控更新）
    watch(() => toValue(options.modelValue) ?? null, (newValue) => {
        if (newValue && (newValue.start || newValue.end)) {
            const startDate = newValue.start ? parseInputToSimpleDate(newValue.start, locale, calendar) : null;
            const endDate = newValue.end ? parseInputToSimpleDate(newValue.end, locale, calendar) : null;

            // 檢查無效輸入
            if (newValue.start && !startDate) {
                warn(`Invalid start date provided: ${newValue.start}`);
                startValidation.handleDateValidation(false, { date: 'date.invalid' }, 'startDate');
            }

            if (newValue.end && !endDate) {
                warn(`Invalid end date provided: ${newValue.end}`);
                endValidation.handleDateValidation(false, { date: 'date.invalid' }, 'endDate');
            }

            // 只有在兩個日期都有效時才檢查順序
            if (startDate && endDate) {
                if (compareDates(startDate, endDate) > 0) {
                    warn('Initial date range has start > end, auto-swapping values');
                    startDateTime.setExternalValue(newValue.end);
                    endDateTime.setExternalValue(newValue.start);

                    // 等內部 ref 更新沖刷後再 emit 交換後的範圍（取代 setTimeout(0) 排序 hack）。
                    nextTick(() => {
                        emitRangeEvents();
                    });
                    return;
                }
            }

            // 設置有效的值，無效的值會被忽略或設為 null

            startDateTime.setExternalValue(startDate ? newValue.start : null);
            endDateTime.setExternalValue(endDate ? newValue.end : null);
        } else {
            startDateTime.clearValues();
            endDateTime.clearValues();
        }
    }, { immediate: true });

    return {
        // 狀態
        isDisabled,
        startDateConstraints,
        endDateConstraints,
        startDateConstraintsStr,
        endDateConstraintsStr,
        // 驗證相關
        hasErrors,
        mergedErrors,
        mergedErrorParams,
        isValidRange,

        // 日期時間值
        startDateTime,
        endDateTime,

        // 顯示值
        hasRangeValue,

        // 日曆相關
        ...calendarPopup,

        // 快捷選項
        shortcuts,

        // 事件設置
        setEmitters,

        // 驗證事件處理
        handleStartDateValidation,
        handleEndDateValidation,
        handleStartTimeValidation,
        handleEndTimeValidation,

        // 完成事件處理
        handleStartDateComplete,
        handleEndDateComplete,
        handleStartTimeComplete,
        handleEndTimeComplete,

        // 日曆事件處理
        handleCalendarRangeSelect,
        handleTimeSelect,

        // 導航事件處理
        handleStartNavigateToDate: startNavigation.handleNavigateToDate,
        handleEndNavigateToDate: endNavigation.handleNavigateToDate,

        // 主要操作
        applyShortcut,
        clearRange,
        setRange,
        validate,

        // 導航方法
        focusStartDate,
        focusEndDate,
    };
}
