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
    formatOutput,
    getNow,
    compareDates,
    addDays,
    calculateDaysDifference,
    getCurrentMonthRange,
    parseInputToSimpleDate,
    formatSimpleDate,
    type SimpleDateValue,
    type DateTimeInput
} from '../utils/dateUtils';
import type { OutputType } from '../types/main';

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

interface DateRangeShortcut {
    label: string;
    getValue: () => { start: SimpleDateValue; end: SimpleDateValue };
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
const DEFAULT_TIMES = {
    start: '00:00:00',
    end: '23:59:59'
} as const;

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
        locale = 'zh-TW'
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
        defaultTime: DEFAULT_TIMES.start,
        enableSeconds
    });

    const endDateTime = useDateTimeValue({
        showTime,
        dateFormat,
        timeFormat,
        outputType,
        defaultTime: DEFAULT_TIMES.end,
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

    // 計算屬性
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
                return { start: today, end: today };
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

    // 統一的時間初始化
    const initializeTimeValues = () => {
        if (!showTime) return;

        if (startDateTime.internalDateTime.value && !startDateTime.inputTimeValue.value) {
            startDateTime.inputTimeValue.value = DEFAULT_TIMES.start;
        }

        if (endDateTime.internalDateTime.value && !endDateTime.inputTimeValue.value) {
            endDateTime.inputTimeValue.value = DEFAULT_TIMES.end;
        }
    };

    // 統一的錯誤清理
    const clearFieldErrors = (validation: any, fields: string[]) => {
        fields.forEach(field => validation.clearFieldErrors(field));
    };

    // 統一的事件發射
    const emitRangeEvents = () => {
        const start = startDateTime.internalDateTime.value;
        const end = endDateTime.internalDateTime.value;

        if (!start || !end) {
            emitters.update?.(null);
            emitters.change?.(null);
            return;
        }

        const customFormat = showTime ? `${dateFormat} ${timeFormat}` : dateFormat;
        const range = {
            start: formatOutput(start, outputType, customFormat, showTime, calendar, locale, useStrictISO),
            end: formatOutput(end, outputType, customFormat, showTime, calendar, locale, useStrictISO)
        };

        emitters.update?.(range);
        emitters.change?.(range);

        // 發送驗證狀態
        const isValid = isValidRange.value && !hasErrors.value;
        emitters.validation?.(isValid, mergedErrors.value);
    };

    // 事件處理函數
    const setEmitters = (newEmitters: DateRangeEmitters) => {
        emitters = newEmitters;
    };

    // 驗證事件處理 - 統一處理
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
        console.log('Handling start date validation:', isValid);
        console.log('Validation errors:', validationErrors);
        console.log('Error params:', errorParams);
        handleValidation(isValid, validationErrors, startValidation, 'startDate', errorParams);
    };

    const handleEndDateValidation = (isValid: boolean, validationErrors: Record<string, string>, errorParams?: Record<string, Record<string, any>>) => {
        handleValidation(isValid, validationErrors, endValidation, 'endDate', errorParams);
    };

    const handleStartTimeValidation = (isValid: boolean, validationErrors: Record<string, string>, errorParams?: Record<string, Record<string, any>>) => {
        startValidation.handleTimeValidation(isValid, validationErrors, 'startTime', errorParams);
        emitters.validation?.(!hasErrors.value, mergedErrors.value);
    };

    const handleEndTimeValidation = (isValid: boolean, validationErrors: Record<string, string>, errorParams?: Record<string, Record<string, any>>) => {
        endValidation.handleTimeValidation(isValid, validationErrors, 'endTime', errorParams);
        emitters.validation?.(!hasErrors.value, mergedErrors.value);
    };

    // 完成事件處理 - 統一處理
    const handleDateComplete = (
        dateStr: string,
        dateTime: any,
        validation: any,
        navigation: any,
        isStart: boolean
    ) => {
        dateTime.inputDateValue.value = dateStr;
        const updatedDateTime = dateTime.updateFromInputs();

        if (!updatedDateTime) {
            validation.handleDateValidation(false, { date: 'date.invalid' });
            return;
        }

        if (!validation.validateDateRange(updatedDateTime)) {
            return;
        }

        initializeTimeValues();
        emitRangeEvents();

        clearFieldErrors(validation, ['date', 'year', 'month', 'day']);

        // 處理焦點轉移
        if (showTime) {
            navigation.autoFocusTimeAfterDateComplete(
                !!dateTime.inputTimeValue.value,
                isStart ? DEFAULT_TIMES.start : DEFAULT_TIMES.end
            );
        } else if (isStart) {
            endNavigation.focusFirstInput();
        }
    };

    const handleStartDateComplete = (dateStr: string) => {
        handleDateComplete(dateStr, startDateTime, startValidation, startNavigation, true);
    };

    const handleEndDateComplete = (dateStr: string) => {
        handleDateComplete(dateStr, endDateTime, endValidation, endNavigation, false);
    };

    const handleTimeComplete = (timeStr: string, dateTime: any, validation: any, fieldPrefix: string) => {
        dateTime.inputTimeValue.value = timeStr;
        const updatedDateTime = dateTime.updateFromInputs();

        if (updatedDateTime) {
            emitRangeEvents();
        }

        clearFieldErrors(validation, [`${fieldPrefix}Time`, 'hour', 'minute', 'second']);
    };

    const handleStartTimeComplete = (timeStr: string) => {
        handleTimeComplete(timeStr, startDateTime, startValidation, 'start');
    };

    const handleEndTimeComplete = (timeStr: string) => {
        handleTimeComplete(timeStr, endDateTime, endValidation, 'end');
    };

    // 日曆事件處理
    const handleCalendarRangeSelect = (startDate: SimpleDateValue | null, endDate: SimpleDateValue | null) => {
        if (startDate && !endDate) {
            // 單個日期選擇
            if (!startValidation.validateDateRange(startDate)) return;

            startDateTime.setInternalDateTime(startDate);
            endDateTime.clearValues();
            clearFieldErrors(startValidation, ['startDate', 'year', 'month', 'day']);
        } else if (startDate && endDate) {
            // 範圍選擇
            if (!startValidation.validateDateRange(startDate) ||
                !endValidation.validateDateRange(endDate)) return;

            startDateTime.setInternalDateTime(startDate);
            endDateTime.setInternalDateTime(endDate);

            initializeTimeValues();

            clearFieldErrors(startValidation, ['startDate', 'endDate', 'range', 'year', 'month', 'day']);
            clearFieldErrors(endValidation, ['startDate', 'endDate', 'range', 'year', 'month', 'day']);
        } else {
            // 清空選擇
            clearRange();
            return;
        }

        emitRangeEvents();
    };

    const handleTimeSelect = (timeValue: string, source: 'start' | 'end') => {
        if (source === 'start' && startDateTime.internalDateTime.value) {
            handleStartTimeComplete(timeValue);
        }
        if (source === 'end' && endDateTime.internalDateTime.value) {
            handleEndTimeComplete(timeValue);
        }
    };

    // 主要操作方法
    const applyShortcut = (shortcut: DateRangeShortcut) => {
        const range = shortcut.getValue();

        startDateTime.setInternalDateTime(range.start);
        endDateTime.setInternalDateTime(range.end);

        initializeTimeValues();
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
        if (newValue && newValue.start && newValue.end) {
            const startDate = parseInputToSimpleDate(newValue.start, locale);
            const endDate = parseInputToSimpleDate(newValue.end, locale);

            // 檢查日期順序，如果順序錯誤則自動交換
            if (startDate && endDate && compareDates(startDate, endDate) > 0) {
                console.warn('Initial date range has start > end, auto-swapping values');
                startDateTime.setExternalValue(newValue.end);
                endDateTime.setExternalValue(newValue.start);

                // 發出修正後的值
                setTimeout(() => {
                    emitRangeEvents();
                }, 0);
            } else {
                startDateTime.setExternalValue(newValue.start);
                endDateTime.setExternalValue(newValue.end);
            }
        } else if (newValue) {
            // 只有部分值的情況
            startDateTime.setExternalValue(newValue.start || null);
            endDateTime.setExternalValue(newValue.end || null);
        } else {
            startDateTime.clearValues();
            endDateTime.clearValues();
        }
    }, { immediate: true });

    return {
        // 狀態
        isDisabled,
        hasErrors,
        mergedErrors,
        mergedErrorParams,
        isValidRange,
        startDateTime,
        endDateTime,
        hasRangeValue,
        // 日期約束
        startDateConstraints,
        endDateConstraints,
        startDateConstraintsStr,
        endDateConstraintsStr,
        shortcuts,

        // 日曆相關
        ...calendarPopup,

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
