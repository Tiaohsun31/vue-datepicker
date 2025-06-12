/**
 * useDateRange.ts
 * 專門處理日期範圍選擇的 Composable
 */

import { ref, computed, watch, type Ref } from 'vue';
import { useDateTimeValidation } from './useDateTimeValidation';
import { useDateTimeValue } from './useDateTimeValue';
import { useCalendarPopup } from './useCalendarPopup';
import { useDefaultTime } from './useDefaultTime';
import { useInputNavigation } from './useInputNavigation';
import {
    formatSimpleDate,
    formatOutput,
    getNow,
    createSimpleDate,
    compareDates,
    addDays,
    type SimpleDateValue,
    type DateTimeInput
} from '../utils/dateUtils';
import type { OutputType } from '../types/main';

interface DateRangeOptions {
    calendar?: string
    // 基本配置
    modelValue?: { start: DateTimeInput; end: DateTimeInput } | null;
    showTime?: boolean;
    required?: boolean;
    disabled?: boolean;
    incomplete?: boolean;

    // 格式配置
    dateFormat?: string;
    timeFormat?: string;
    outputType?: OutputType;

    // 時間配置
    enableSeconds?: boolean;

    // 限制配置
    minDate?: DateTimeInput;
    maxDate?: DateTimeInput;
    maxRange?: number; // 最大天數限制
    minRange?: number; // 最小天數限制
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

// 日期範圍快捷選項
interface DateRangeShortcut {
    label: string;
    getValue: () => { start: SimpleDateValue; end: SimpleDateValue };
}

export function useDateRange(
    options: DateRangeOptions = {},
    refs: DateRangeRefs
) {
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

    // 禁用狀態
    const isDisabled = ref(disabled);

    // 驗證 composable
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

    // 開始日期時間值管理
    const startDateTime = useDateTimeValue({
        showTime,
        dateFormat,
        timeFormat,
        outputType,
        defaultTime: '00:00:00',
        enableSeconds
    });

    // 結束日期時間值管理
    const endDateTime = useDateTimeValue({
        showTime,
        dateFormat,
        timeFormat,
        outputType,
        defaultTime: '23:59:59',
        enableSeconds
    });

    // 日曆彈窗管理
    const calendarPopup = useCalendarPopup(
        containerRef,
        calendarRef,
        { disabled: isDisabled }
    );

    // 預設時間管理
    const defaultTime = useDefaultTime({
        enableSeconds,
        fallbackTime: '00:00:00'
    });

    // 導航管理 - 為開始和結束日期分別創建
    const startNavigation = useInputNavigation(
        {
            dateInputRef: startDateInputRef,
            timeInputRef: startTimeInputRef
        },
        { showTime, autoFocusTimeAfterDate: true }
    );

    const endNavigation = useInputNavigation(
        {
            dateInputRef: endDateInputRef,
            timeInputRef: endTimeInputRef
        },
        { showTime, autoFocusTimeAfterDate: true }
    );

    // 事件發射器
    let emitUpdate: ((range: { start: DateTimeInput; end: DateTimeInput } | null) => void) | null = null;
    let emitChange: ((range: { start: DateTimeInput; end: DateTimeInput } | null) => void) | null = null;
    let emitValidation: ((isValid: boolean, errors: Record<string, string>) => void) | null = null;

    /**
     * 設置事件發射器
     */
    const setEmitters = (emitters: {
        update?: (range: { start: DateTimeInput; end: DateTimeInput } | null) => void;
        change?: (range: { start: DateTimeInput; end: DateTimeInput } | null) => void;
        validation?: (isValid: boolean, errors: Record<string, string>) => void;
    }) => {
        emitUpdate = emitters.update || null;
        emitChange = emitters.change || null;
        emitValidation = emitters.validation || null;
    };

    // 顯示的日期範圍
    const displayStartDate = computed(() => {
        if (!startDateTime.internalDateTime.value) return null;
        const dateStr = formatSimpleDate(startDateTime.internalDateTime.value, dateFormat);
        const timeStr = showTime && startDateTime.inputTimeValue.value ? ` ${startDateTime.inputTimeValue.value}` : '';
        return dateStr + timeStr;
    });

    const displayEndDate = computed(() => {
        if (!endDateTime.internalDateTime.value) return null;
        const dateStr = formatSimpleDate(endDateTime.internalDateTime.value, dateFormat);
        const timeStr = showTime && endDateTime.inputTimeValue.value ? ` ${endDateTime.inputTimeValue.value}` : '';
        return dateStr + timeStr;
    });

    // 檢查是否有範圍值
    const hasRangeValue = computed(() => {
        return !!(startDateTime.hasValue.value || endDateTime.hasValue.value);
    });

    // 合併所有錯誤
    const mergedErrors = computed(() => {
        const errors = {
            ...startValidation.mergedErrors.value,
            ...endValidation.mergedErrors.value
        };
        // 只選擇 start 未選擇 end 時，補上錯誤
        if (
            startDateTime.internalDateTime.value &&
            !endDateTime.internalDateTime.value && incomplete
        ) {
            errors['range.endRequired'] = 'range.endRequired';
        }
        return errors;
    });

    // 合併所有錯誤參數
    const mergedErrorParams = computed(() => {
        return {
            ...startValidation.mergedErrorParams.value,
            ...endValidation.mergedErrorParams.value
        };
    });

    // 是否有錯誤
    const hasErrors = computed(() => {
        return Object.keys(mergedErrors.value).length > 0;
    });

    // 驗證範圍是否有效
    const isValidRange = computed(() => {
        if (!startDateTime.internalDateTime.value || !endDateTime.internalDateTime.value) {
            return false;
        }

        // 基本順序檢查
        if (compareDates(startDateTime.internalDateTime.value, endDateTime.internalDateTime.value) > 0) {
            return false;
        }

        // 範圍限制檢查
        if (maxRange || minRange) {
            const startDate = new Date(
                startDateTime.internalDateTime.value.year,
                startDateTime.internalDateTime.value.month - 1,
                startDateTime.internalDateTime.value.day
            );
            const endDate = new Date(
                endDateTime.internalDateTime.value.year,
                endDateTime.internalDateTime.value.month - 1,
                endDateTime.internalDateTime.value.day
            );
            const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

            if (maxRange && diffDays > maxRange) return false;
            if (minRange && diffDays < minRange) return false;
        }

        return !hasErrors.value;
    });

    // 快捷選項
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
            getValue: () => {
                const end = getNow();
                const start = addDays(end, -6);
                return { start, end };
            }
        },
        {
            label: '最近30天',
            getValue: () => {
                const end = getNow();
                const start = addDays(end, -29);
                return { start, end };
            }
        },
        {
            label: '本月',
            getValue: () => {
                const now = getNow();
                const start = createSimpleDate(now.year, now.month, 1, 0, 0, 0);
                // 計算月末
                const nextMonth = now.month === 12 ? 1 : now.month + 1;
                const nextYear = now.month === 12 ? now.year + 1 : now.year;
                const firstDayNextMonth = createSimpleDate(nextYear, nextMonth, 1);
                const end = addDays(firstDayNextMonth, -1);
                return { start, end };
            }
        }
    ]);

    /**
     * 發送範圍更新事件
     */
    const emitRangeEvents = () => {
        if (!startDateTime.internalDateTime.value || !endDateTime.internalDateTime.value) {
            emitUpdate?.(null);
            emitChange?.(null);
            return;
        }

        const range = {
            start: formatOutput(startDateTime.internalDateTime.value, outputType),
            end: formatOutput(endDateTime.internalDateTime.value, outputType)
        };

        emitUpdate?.(range);
        emitChange?.(range);

        // 發送驗證狀態
        const isValid = isValidRange.value && !hasErrors.value;
        emitValidation?.(isValid, mergedErrors.value);
    };

    /**
     * 監聽外部值變化
     */
    watch(() => modelValue, (newValue) => {
        if (newValue) {
            startDateTime.setExternalValue(newValue.start);
            endDateTime.setExternalValue(newValue.end);
        } else {
            startDateTime.clearValues();
            endDateTime.clearValues();
        }
    }, { immediate: true });

    /**
     * 處理開始日期驗證
     */
    const handleStartDateValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        startValidation.handleDateValidation(isValid, validationErrors, 'startDate');
        emitValidation?.(!hasErrors.value, mergedErrors.value);
    };

    /**
     * 處理結束日期驗證
     */
    const handleEndDateValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        endValidation.handleDateValidation(isValid, validationErrors, 'endDate');
        emitValidation?.(!hasErrors.value, mergedErrors.value);
    };

    /**
     * 處理開始時間驗證
     */
    const handleStartTimeValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        startValidation.handleTimeValidation(isValid, validationErrors, 'startTime');
        emitValidation?.(!hasErrors.value, mergedErrors.value);
    };

    /**
     * 處理結束時間驗證
     */
    const handleEndTimeValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        endValidation.handleTimeValidation(isValid, validationErrors, 'endTime');
        emitValidation?.(!hasErrors.value, mergedErrors.value);
    };

    /**
     * 處理開始日期完成
     */
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

        // 如果啟用時間且沒有時間值，應用默認時間
        if (showTime && !startDateTime.inputTimeValue.value) {
            startDateTime.inputTimeValue.value = '00:00:00';
            startDateTime.updateFromInputs();
        }

        emitRangeEvents();

        // 清除錯誤
        ['startDate', 'date.year', 'date.month', 'date.day'].forEach(field => {
            startValidation.clearFieldErrors(field);
        });

        // 自動聚焦到時間輸入或下一個日期輸入
        if (showTime) {
            startNavigation.autoFocusTimeAfterDateComplete(
                !!startDateTime.inputTimeValue.value,
                '00:00:00'
            );
        } else {
            // 如果不需要時間，聚焦到結束日期
            endNavigation.focusFirstInput();
        }
    };

    /**
     * 處理結束日期完成
     */
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

        // 如果啟用時間且沒有時間值，應用默認時間
        if (showTime && !endDateTime.inputTimeValue.value) {
            endDateTime.inputTimeValue.value = '23:59:59';
            endDateTime.updateFromInputs();
        }

        emitRangeEvents();

        // 清除錯誤
        ['endDate', 'date.year', 'date.month', 'date.day'].forEach(field => {
            endValidation.clearFieldErrors(field);
        });

        // 自動聚焦到時間輸入
        if (showTime) {
            endNavigation.autoFocusTimeAfterDateComplete(
                !!endDateTime.inputTimeValue.value,
                '23:59:59'
            );
        }
    };

    /**
     * 處理開始時間完成
     */
    const handleStartTimeComplete = (timeStr: string) => {
        startDateTime.inputTimeValue.value = timeStr;
        startDateTime.updateFromInputs();
        emitRangeEvents();
    };

    /**
     * 處理結束時間完成
     */
    const handleEndTimeComplete = (timeStr: string) => {
        endDateTime.inputTimeValue.value = timeStr;
        endDateTime.updateFromInputs();
        emitRangeEvents();
    };

    /**
     * 處理日曆範圍選擇
     */
    const handleCalendarRangeSelect = (startDate: SimpleDateValue | null, endDate: SimpleDateValue | null) => {
        if (startDate && !endDate) {
            // 只有開始日期
            if (!startValidation.validateDateRange(startDate)) {
                return;
            }

            startDateTime.setInternalDateTime(startDate);

            ['startDate', 'date.year', 'date.month', 'date.day'].forEach(field => {
                startValidation.clearFieldErrors(field);
            });

            // 清除結束日期
            endDateTime.clearValues();
        } else if (startDate && endDate) {
            // 完整範圍
            if (!startValidation.validateDateRange(startDate) || !endValidation.validateDateRange(endDate)) {
                return;
            }

            startDateTime.setInternalDateTime(startDate);
            endDateTime.setInternalDateTime(endDate);

            // 如果沒有設定時間，使用默認時間
            if (showTime) {
                if (!startDateTime.inputTimeValue.value) {
                    startDateTime.inputTimeValue.value = '00:00:00';
                    startDateTime.updateFromInputs();
                }
                if (!endDateTime.inputTimeValue.value) {
                    endDateTime.inputTimeValue.value = '23:59:59';
                    endDateTime.updateFromInputs();
                }
            }

            ['startDate', 'endDate', 'range', 'date.year', 'date.month', 'date.day'].forEach(field => {
                startValidation.clearFieldErrors(field);
                endValidation.clearFieldErrors(field);
            });
        } else {
            // 清空選擇
            startDateTime.clearValues();
            endDateTime.clearValues();

            ['startDate', 'endDate', 'range'].forEach(field => {
                startValidation.clearFieldErrors(field);
                endValidation.clearFieldErrors(field);
            });
        }

        emitRangeEvents();
    };

    /**
     * 應用快捷選項
     */
    const applyShortcut = (shortcut: DateRangeShortcut) => {
        const range = shortcut.getValue();

        startDateTime.setInternalDateTime(range.start);
        endDateTime.setInternalDateTime(range.end);

        if (showTime) {
            if (!startDateTime.inputTimeValue.value) {
                startDateTime.inputTimeValue.value = '00:00:00';
                startDateTime.updateFromInputs();
            }
            if (!endDateTime.inputTimeValue.value) {
                endDateTime.inputTimeValue.value = '23:59:59';
                endDateTime.updateFromInputs();
            }
        }

        emitRangeEvents();
    };

    /**
     * 清除範圍
     */
    const clearRange = () => {
        startDateTime.clearValues();
        endDateTime.clearValues();
        startValidation.clearAllErrors();
        endValidation.clearAllErrors();
        emitRangeEvents();
    };

    /**
     * 確認範圍選擇
     */
    const confirmRange = () => {
        if (!isValidRange.value) return false;

        emitRangeEvents();
        calendarPopup.hideCalendar();
        return true;
    };

    /**
     * 設置範圍值
     */
    const setRange = (range: { start: DateTimeInput; end: DateTimeInput } | null) => {
        if (range) {
            startDateTime.setExternalValue(range.start);
            endDateTime.setExternalValue(range.end);
        } else {
            clearRange();
        }
        emitRangeEvents();
    };

    /**
     * 驗證當前範圍
     */
    const validate = () => {
        startDateInputRef.value?.validate();
        endDateInputRef.value?.validate();

        if (showTime) {
            startTimeInputRef.value?.validate();
            endTimeInputRef.value?.validate();
        }

        return isValidRange.value;
    };

    /**
     * 處理導航事件 - 從時間輸入回到日期輸入
     */
    const handleStartNavigateToDate = () => {
        startNavigation.handleNavigateToDate();
    };

    const handleEndNavigateToDate = () => {
        endNavigation.handleNavigateToDate();
    };

    /**
     * 容器點擊處理
     */
    const handleContainerClick = (event: MouseEvent) => {
        calendarPopup.handleContainerClick(event, () => {
            // 預設聚焦到開始日期輸入
            startNavigation.focusFirstInput();
        });
    };

    return {
        // 狀態
        isDisabled,

        // 驗證相關
        hasErrors,
        mergedErrors,
        mergedErrorParams,
        isValidRange,

        // 日期時間值
        startDateTime,
        endDateTime,

        // 顯示值
        displayStartDate,
        displayEndDate,
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

        // 導航事件處理
        handleStartNavigateToDate,
        handleEndNavigateToDate,

        // 容器事件處理
        handleContainerClick,
        handleContainerMouseDown: calendarPopup.handleContainerMouseDown,

        // 主要操作
        applyShortcut,
        clearRange,
        confirmRange,
        setRange,
        validate,

        // 導航方法（直接暴露）
        focusStartDate: startNavigation.focusFirstInput,
        focusEndDate: endNavigation.focusFirstInput,
    };
}
