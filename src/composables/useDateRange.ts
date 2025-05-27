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
    parseToSimpleDate,
    formatSimpleDate,
    ensureSimpleDate,
    formatOutput,
    getNow,
    createSimpleDate,
    toCalendarDate,
    fromCalendarDate,
    compareDates,
    addDays,
    type SimpleDateValue,
    type DateTimeValue,
    type OutputFormat
} from '../utils/dateUtils';

interface DateRangeOptions {
    // 基本配置
    modelValue?: { start: DateTimeValue; end: DateTimeValue } | null;
    showTime?: boolean;
    required?: boolean;
    disabled?: boolean;

    // 格式配置
    dateFormat?: string;
    timeFormat?: string;
    outputFormat?: OutputFormat;

    // 時間配置
    enableSeconds?: boolean;

    // 限制配置
    minDate?: DateTimeValue;
    maxDate?: DateTimeValue;
    maxRange?: number; // 最大天數限制
    minRange?: number; // 最小天數限制
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
        modelValue = null,
        showTime = false,
        required = false,
        disabled = false,
        dateFormat = 'YYYY-MM-DD',
        timeFormat = 'HH:mm:ss',
        outputFormat = 'iso',
        enableSeconds = false,
        minDate,
        maxDate,
        maxRange,
        minRange
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
    const validation = useDateTimeValidation({
        required,
        showTime
    });

    // 開始日期時間值管理
    const startDateTime = useDateTimeValue({
        showTime,
        dateFormat,
        timeFormat,
        outputFormat,
        defaultTime: '00:00:00',
        enableSeconds
    });

    // 結束日期時間值管理
    const endDateTime = useDateTimeValue({
        showTime,
        dateFormat,
        timeFormat,
        outputFormat,
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
    let emitUpdate: ((range: { start: DateTimeValue; end: DateTimeValue } | null) => void) | null = null;
    let emitChange: ((range: { start: DateTimeValue; end: DateTimeValue } | null) => void) | null = null;
    let emitValidation: ((isValid: boolean, errors: Record<string, string>) => void) | null = null;

    /**
     * 設置事件發射器
     */
    const setEmitters = (emitters: {
        update?: (range: { start: DateTimeValue; end: DateTimeValue } | null) => void;
        change?: (range: { start: DateTimeValue; end: DateTimeValue } | null) => void;
        validation?: (isValid: boolean, errors: Record<string, string>) => void;
    }) => {
        emitUpdate = emitters.update || null;
        emitChange = emitters.change || null;
        emitValidation = emitters.validation || null;
    };

    // 計算屬性
    const calendarStartDate = computed(() => {
        if (!startDateTime.internalDateTime.value) return null;
        return toCalendarDate(startDateTime.internalDateTime.value);
    });

    const calendarEndDate = computed(() => {
        if (!endDateTime.internalDateTime.value) return null;
        return toCalendarDate(endDateTime.internalDateTime.value);
    });

    const calendarMinDate = computed(() => {
        const minDateValue = ensureSimpleDate(minDate);
        return minDateValue ? toCalendarDate(minDateValue) : null;
    });

    const calendarMaxDate = computed(() => {
        const maxDateValue = ensureSimpleDate(maxDate);
        return maxDateValue ? toCalendarDate(maxDateValue) : null;
    });

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

        return Object.keys(validation.errors.value).length === 0;
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
            label: '昨天',
            getValue: () => {
                const yesterday = addDays(getNow(), -1);
                return { start: yesterday, end: yesterday };
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
            start: formatOutput(startDateTime.internalDateTime.value, outputFormat),
            end: formatOutput(endDateTime.internalDateTime.value, outputFormat)
        };

        emitUpdate?.(range);
        emitChange?.(range);

        // 發送驗證狀態
        const isValid = isValidRange.value && !validation.hasErrors.value;
        emitValidation?.(isValid, validation.mergedErrors.value);
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
        validation.handleDateValidation(isValid, validationErrors, 'startDate');
        emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
    };

    /**
     * 處理結束日期驗證
     */
    const handleEndDateValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        validation.handleDateValidation(isValid, validationErrors, 'endDate');
        emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
    };

    /**
     * 處理開始時間驗證
     */
    const handleStartTimeValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        validation.handleTimeValidation(isValid, validationErrors, 'startTime');
        emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
    };

    /**
     * 處理結束時間驗證
     */
    const handleEndTimeValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        validation.handleTimeValidation(isValid, validationErrors, 'endTime');
        emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
    };

    /**
     * 處理開始日期完成
     */
    const handleStartDateComplete = (dateStr: string) => {
        startDateTime.inputDateValue.value = dateStr;

        // 如果啟用時間且沒有時間值，應用默認時間
        if (showTime && !startDateTime.inputTimeValue.value) {
            startDateTime.inputTimeValue.value = '00:00:00';
        }

        startDateTime.updateDateTime();
        emitRangeEvents();

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

        // 如果啟用時間且沒有時間值，應用默認時間
        if (showTime && !endDateTime.inputTimeValue.value) {
            endDateTime.inputTimeValue.value = '23:59:59';
        }

        endDateTime.updateDateTime();
        emitRangeEvents();

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
        startDateTime.updateDateTime();
        emitRangeEvents();
    };

    /**
     * 處理結束時間完成
     */
    const handleEndTimeComplete = (timeStr: string) => {
        endDateTime.inputTimeValue.value = timeStr;
        endDateTime.updateDateTime();
        emitRangeEvents();
    };

    /**
     * 處理日曆範圍選擇
     */
    const handleCalendarRangeSelect = (startDate: any, endDate: any) => {
        if (startDate && !endDate) {
            // 只有開始日期
            const simpleStart = fromCalendarDate(startDate);
            startDateTime.inputDateValue.value = formatSimpleDate(simpleStart, dateFormat);
            startDateTime.updateDateTime();

            // 清除結束日期
            endDateTime.clearValues();
        } else if (startDate && endDate) {
            // 完整範圍
            const simpleStart = fromCalendarDate(startDate);
            const simpleEnd = fromCalendarDate(endDate);

            startDateTime.inputDateValue.value = formatSimpleDate(simpleStart, dateFormat);
            endDateTime.inputDateValue.value = formatSimpleDate(simpleEnd, dateFormat);

            // 如果沒有設定時間，使用默認時間
            if (showTime) {
                if (!startDateTime.inputTimeValue.value) {
                    startDateTime.inputTimeValue.value = '00:00:00';
                }
                if (!endDateTime.inputTimeValue.value) {
                    endDateTime.inputTimeValue.value = '23:59:59';
                }
            }

            startDateTime.updateDateTime();
            endDateTime.updateDateTime();
        } else {
            // 清空選擇
            startDateTime.clearValues();
            endDateTime.clearValues();
        }

        emitRangeEvents();
    };

    /**
     * 應用快捷選項
     */
    const applyShortcut = (shortcut: DateRangeShortcut) => {
        const range = shortcut.getValue();

        startDateTime.setExternalValue(range.start);
        endDateTime.setExternalValue(range.end);

        if (showTime) {
            startDateTime.inputTimeValue.value = startDateTime.getTimeFromDateTime(range.start);
            endDateTime.inputTimeValue.value = endDateTime.getTimeFromDateTime(range.end);
        }

        emitRangeEvents();
    };

    /**
     * 清除範圍
     */
    const clearRange = () => {
        startDateTime.clearValues();
        endDateTime.clearValues();
        validation.clearAllErrors();
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
    const setRange = (range: { start: DateTimeValue; end: DateTimeValue } | null) => {
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
        ...validation,
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
        calendarStartDate,
        calendarEndDate,
        calendarMinDate,
        calendarMaxDate,

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
