/**
 * useDateRange.ts
 * 專門處理日期範圍選擇的 Composable
 */

import { ref, computed, watch, type Ref } from 'vue';
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
import type { OutputType, DateRangeShortcut } from '../types/main';

// 類型定義
interface DateRangeOptions {
    calendar?: string;
    modelValue?: { start: DateTimeInput; end: DateTimeInput } | null;
    showTime?: boolean;
    required?: boolean;
    disabled?: boolean;
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
}

interface DateRangeRefs {
    containerRef: Ref<HTMLElement | null>;
    calendarRef: Ref<HTMLElement | null>;
    startDateInputRef: Ref<any>;
    endDateInputRef: Ref<any>;
    startTimeInputRef: Ref<any>;
    endTimeInputRef: Ref<any>;
}

interface DateRangeEmitters {
    update?: (range: { start: DateTimeInput; end: DateTimeInput } | null) => void;
    change?: (range: { start: DateTimeInput; end: DateTimeInput } | null) => void;
    validation?: (isValid: boolean, errors: Record<string, string>) => void;
}

interface RangeValidationResult {
    valid: boolean;
    error?: string;
    params?: Record<string, any>;
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
        modelValue = null,
        showTime = false,
        required = false,
        disabled = false,
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
    const isDisabled = ref(disabled);
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

    const isValidRange = computed(() => {
        const start = startDateTime.internalDateTime.value;
        const end = endDateTime.internalDateTime.value;

        if (!start || !end) return false;

        // 檢查日期順序
        if (compareDates(start, end) > 0) return false;

        // 檢查範圍限制
        if (maxRange || minRange) {
            const diffDays = calculateDaysDifference(start, end);

            if (maxRange && diffDays > maxRange) {
                endValidation.handleDateValidation(false, {
                    range: 'range.exceedsMaxRange'
                }, 'endDate', {
                    range: { maxRange, actualDays: diffDays }
                });
                return false;
            }

            if (minRange && diffDays < minRange) {
                endValidation.handleDateValidation(false, {
                    range: 'range.belowMinRange'
                }, 'endDate', {
                    range: { minRange, actualDays: diffDays }
                });
                return false;
            }

            // 清除範圍錯誤如果都通過
            endValidation.clearFieldErrors('range');
        }

        return !hasErrors.value;
    });

    const shortcuts = computed<DateRangeShortcut[]>(() => [
        {
            label: '今天',
            getValue: () => {
                const today = getNow();
                return {
                    start: createSimpleDate(today.year, today.month, today.day, 0, 0, 0),
                    end: createSimpleDate(today.year, today.month, today.day, 23, 59, 59)
                };
            }
        },
        {
            label: '最近7天',
            getValue: () => ({
                start: addDays(getNow(), -6),
                end: getNow()
            })
        },
        {
            label: '最近30天',
            getValue: () => ({
                start: addDays(getNow(), -29),
                end: getNow()
            })
        },
        {
            label: '本月',
            getValue: getCurrentMonthRange
        }
    ]);

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

    function emitRangeEvents() {
        if (!startDateTime.internalDateTime.value || !endDateTime.internalDateTime.value) {
            emitters.update?.(null);
            emitters.change?.(null);
            return;
        }

        const customFormat = showTime ? `${dateFormat} ${timeFormat}` : dateFormat;
        const range = {
            start: formatOutput(
                startDateTime.internalDateTime.value,
                outputType,
                customFormat,
                showTime,
                calendar,
                locale,
                useStrictISO
            ),
            end: formatOutput(
                endDateTime.internalDateTime.value,
                outputType,
                customFormat,
                showTime,
                calendar,
                locale,
                useStrictISO
            )
        };

        emitters.update?.(range);
        emitters.change?.(range);

        // 發送驗證狀態
        const isValid = isValidRange.value && !hasErrors.value;
        emitters.validation?.(isValid, mergedErrors.value);
    }

    function clearFieldErrors(validation: any, fields: string[]) {
        fields.forEach(field => validation.clearFieldErrors(field));
    }

    // 事件處理函數
    const setEmitters = (newEmitters: DateRangeEmitters) => {
        emitters = newEmitters;
    };

    const handleValidation = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        validation: any,
        fieldPrefix: string,
        errorParams?: Record<string, Record<string, any>>
    ) => {
        validation.handleDateValidation(isValid, validationErrors, fieldPrefix, errorParams);
        emitters.validation?.(!hasErrors.value, mergedErrors.value);
    };

    const handleStartDateValidation = (isValid: boolean, validationErrors: Record<string, string>, errorParams?: Record<string, Record<string, any>>) => {
        handleValidation(isValid, validationErrors, startValidation, 'startDate', errorParams);
    };

    const handleEndDateValidation = (isValid: boolean, validationErrors: Record<string, string>, errorParams?: Record<string, Record<string, any>>) => {
        handleValidation(isValid, validationErrors, endValidation, 'endDate', errorParams);
    };


    const handleStartTimeValidation = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        errorParams: Record<string, Record<string, any>> = {}
    ) => {
        startValidation.handleTimeValidation(isValid, validationErrors, 'startTime', errorParams);
        emitters.validation?.(!hasErrors.value, mergedErrors.value);
    };

    const handleEndTimeValidation = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        errorParams: Record<string, Record<string, any>> = {}
    ) => {
        endValidation.handleTimeValidation(isValid, validationErrors, 'endTime', errorParams);
        emitters.validation?.(!hasErrors.value, mergedErrors.value);
    };

    const handleStartDateComplete = (dateStr: string) => {
        startDateTime.inputDateValue.value = dateStr;
        const updatedDateTime = startDateTime.updateFromInputs();

        if (!updatedDateTime) {
            startValidation.handleDateValidation(false, { date: 'date.invalid' });
            return;
        }

        if (!startValidation.validateDateRange(updatedDateTime)) {
            return;
        }
        // applyDefaultTimeIfNeeded(startDateTime, DEFAULT_START_TIME);
        startNavigation.autoFocusTimeAfterDateComplete(
            startDateTime,
            DEFAULT_START_TIME
        );
        emitRangeEvents();

        clearFieldErrors(startValidation, ['startDate', 'date.year', 'date.month', 'date.day']);

        // 處理焦點轉移
        if (!showTime) {
            endNavigation.focusFirstInput();
        }
        // if (showTime) {
        //     startNavigation.autoFocusTimeAfterDateComplete(
        //         !!startDateTime.inputTimeValue.value,
        //         DEFAULT_START_TIME
        //     );
        // } else {
        //     endNavigation.focusFirstInput();
        // }
    };

    const handleEndDateComplete = (dateStr: string) => {
        endDateTime.inputDateValue.value = dateStr;
        const updatedDateTime = endDateTime.updateFromInputs();

        if (!updatedDateTime) {
            endValidation.handleDateValidation(false, { date: 'date.invalid' });
            return;
        }

        if (!endValidation.validateDateRange(updatedDateTime)) {
            return;
        }
        // applyDefaultTimeIfNeeded(endDateTime, DEFAULT_END_TIME);
        endNavigation.autoFocusTimeAfterDateComplete(
            endDateTime,
            DEFAULT_END_TIME
        );
        emitRangeEvents();

        clearFieldErrors(endValidation, ['endDate', 'date.year', 'date.month', 'date.day']);

        // if (showTime) {
        //     endNavigation.autoFocusTimeAfterDateComplete(
        //         !!endDateTime.inputTimeValue.value,
        //         DEFAULT_END_TIME
        //     );
        // }
    };

    const handleStartTimeComplete = (timeStr: string) => {
        startDateTime.inputTimeValue.value = timeStr;
        const updatedDateTime = startDateTime.updateFromInputs();

        if (updatedDateTime) {
            emitRangeEvents();
        }

        clearFieldErrors(startValidation, ['startTime', 'time.hour', 'time.minute', 'time.second']);
    };

    const handleEndTimeComplete = (timeStr: string) => {
        endDateTime.inputTimeValue.value = timeStr;
        const updatedDateTime = endDateTime.updateFromInputs();

        if (updatedDateTime) {
            emitRangeEvents();
        }

        clearFieldErrors(endValidation, ['endTime', 'time.hour', 'time.minute', 'time.second']);
    };

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
            // applyDefaultTimeIfNeeded(startDateTime, DEFAULT_START_TIME);
            // applyDefaultTimeIfNeeded(endDateTime, DEFAULT_END_TIME);
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
            // applyDefaultTimeIfNeeded(startDateTime, DEFAULT_START_TIME);
            // applyDefaultTimeIfNeeded(endDateTime, DEFAULT_END_TIME);
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

    // 監聽外部值變化並驗證日期順序
    watch(() => modelValue, (newValue) => {
        if (newValue && (newValue.start || newValue.end)) {
            const startDate = newValue.start ? parseInputToSimpleDate(newValue.start, locale, calendar) : null;
            const endDate = newValue.end ? parseInputToSimpleDate(newValue.end, locale, calendar) : null;

            // 檢查無效輸入
            if (newValue.start && !startDate) {
                console.warn(`Invalid start date provided: ${newValue.start}`);
                startValidation.handleDateValidation(false, { date: 'date.invalid' }, 'startDate');
            }

            if (newValue.end && !endDate) {
                console.warn(`Invalid end date provided: ${newValue.end}`);
                endValidation.handleDateValidation(false, { date: 'date.invalid' }, 'endDate');
            }

            // 只有在兩個日期都有效時才檢查順序
            if (startDate && endDate) {
                if (compareDates(startDate, endDate) > 0) {
                    console.warn('Initial date range has start > end, auto-swapping values');
                    startDateTime.setExternalValue(newValue.end);
                    endDateTime.setExternalValue(newValue.start);

                    setTimeout(() => {
                        emitRangeEvents();
                    }, 0);
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
