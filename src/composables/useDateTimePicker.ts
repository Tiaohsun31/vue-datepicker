/**
 * useDateTimePicker.ts
 * 整合所有 DateTimePicker 相關功能的主要 Composable
 */

import { ref, computed, watch, type Ref } from 'vue';
import { useInputNavigation } from './useInputNavigation';
import { useDateTimeValidation } from './useDateTimeValidation';
import { useDateTimeValue } from './useDateTimeValue';
import { useCalendarPopup } from './useCalendarPopup';
import { useDefaultTime } from './useDefaultTime';
import { toCalendarDate, ensureSimpleDate, type DateTimeValue } from '../utils/dateUtils';

interface DateTimePickerOptions {
    // 基本配置
    modelValue?: DateTimeValue;
    showTime?: boolean;
    required?: boolean;
    disabled?: boolean;

    // 格式配置
    dateFormat?: string;
    timeFormat?: string;
    outputFormat?: 'iso' | 'date' | 'simple';

    // 時間配置
    customDefaultTime?: string;
    enableSeconds?: boolean;
    autoFocusTimeAfterDate?: boolean;

    // 限制配置
    minDate?: DateTimeValue;
    maxDate?: DateTimeValue;

    // 自動聚焦
    autoFocus?: boolean;
}

interface DateTimePickerRefs {
    containerRef: Ref<HTMLElement | null>;
    calendarRef: Ref<HTMLElement | null>;
    dateInputRef: Ref<any>;
    timeInputRef: Ref<any>;
}

export function useDateTimePicker(
    options: DateTimePickerOptions = {},
    refs: DateTimePickerRefs
) {
    const {
        modelValue = null,
        showTime = false,
        required = true,
        disabled = false,
        dateFormat = 'YYYY-MM-DD',
        timeFormat = 'HH:mm:ss',
        outputFormat = 'iso',
        customDefaultTime = '00:00:00',
        enableSeconds = true,
        autoFocusTimeAfterDate = true,
        minDate,
        maxDate,
        autoFocus = false
    } = options;

    const { containerRef, calendarRef, dateInputRef, timeInputRef } = refs;

    // 創建禁用狀態的響應式引用
    const isDisabled = ref(disabled);

    // 初始化各個 composables
    const validation = useDateTimeValidation({
        required,
        showTime
    });

    const dateTimeValue = useDateTimeValue({
        showTime,
        dateFormat,
        timeFormat,
        outputFormat,
        defaultTime: customDefaultTime,
        enableSeconds
    });

    const navigation = useInputNavigation(
        { dateInputRef, timeInputRef },
        { showTime, autoFocusTimeAfterDate }
    );

    const calendarPopup = useCalendarPopup(
        containerRef,
        calendarRef,
        {
            disabled: isDisabled,
            onOutsideClick: () => {
                // 可以在這裡添加額外的處理邏輯
            }
        }
    );

    const defaultTime = useDefaultTime({
        customDefaultTime,
        enableSeconds,
        fallbackTime: '00:00:00'
    });

    // 計算屬性 - 轉換為 CalendarDate 格式（供日曆組件使用）
    const calendarDateForGrid = computed(() => {
        if (!dateTimeValue.internalDateTime.value) return null;
        return toCalendarDate(dateTimeValue.internalDateTime.value);
    });

    const calendarMinDate = computed(() => {
        const minDateValue = ensureSimpleDate(minDate);
        return minDateValue ? toCalendarDate(minDateValue) : null;
    });

    const calendarMaxDate = computed(() => {
        const maxDateValue = ensureSimpleDate(maxDate);
        return maxDateValue ? toCalendarDate(maxDateValue) : null;
    });

    // 事件發射器（需要由調用方提供）
    let emitUpdate: ((value: DateTimeValue) => void) | null = null;
    let emitChange: ((value: DateTimeValue) => void) | null = null;
    let emitValidation: ((isValid: boolean, errors: Record<string, string>) => void) | null = null;

    /**
     * 設置事件發射器
     */
    const setEmitters = (emitters: {
        update?: (value: DateTimeValue) => void;
        change?: (value: DateTimeValue) => void;
        validation?: (isValid: boolean, errors: Record<string, string>) => void;
    }) => {
        emitUpdate = emitters.update || null;
        emitChange = emitters.change || null;
        emitValidation = emitters.validation || null;
    };

    /**
     * 發送更新事件
     */
    const emitEvents = (dateTime = dateTimeValue.internalDateTime.value) => {
        const formattedOutput = dateTimeValue.getFormattedOutput(dateTime);

        emitUpdate?.(formattedOutput);
        emitChange?.(formattedOutput);

        // 發送驗證狀態
        const isValid = !validation.hasErrors.value;
        emitValidation?.(isValid, validation.mergedErrors.value);
    };

    /**
     * 監聽外部值變化
     */
    watch(() => modelValue, (newValue) => {
        dateTimeValue.setExternalValue(newValue);
    }, { immediate: true });

    /**
     * 處理日期輸入驗證
     */
    const handleDateValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        validation.handleDateValidation(isValid, validationErrors);
        emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
    };

    /**
     * 處理時間輸入驗證
     */
    const handleTimeValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        validation.handleTimeValidation(isValid, validationErrors);
        emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
    };

    /**
     * 處理日期輸入完成
     */
    const handleDateComplete = (dateStr: string) => {
        dateTimeValue.inputDateValue.value = dateStr;

        // 如果啟用時間且沒有時間值，應用默認時間
        if (showTime && !dateTimeValue.inputTimeValue.value) {
            dateTimeValue.inputTimeValue.value = defaultTime.getValidDefaultTime.value;
        }

        // 更新內部值
        const updatedDateTime = dateTimeValue.updateDateTime();
        emitEvents(updatedDateTime);

        // 自動聚焦到時間輸入
        if (showTime && autoFocusTimeAfterDate) {
            navigation.autoFocusTimeAfterDateComplete(
                !!dateTimeValue.inputTimeValue.value,
                defaultTime.getValidDefaultTime.value
            );
        }
    };

    /**
     * 處理時間輸入完成
     */
    const handleTimeComplete = (timeStr: string) => {
        dateTimeValue.inputTimeValue.value = timeStr;
        const updatedDateTime = dateTimeValue.updateDateTime();
        emitEvents(updatedDateTime);
    };

    /**
     * 處理日曆選擇
     */
    const handleCalendarSelect = (date: any, closeCalendar: boolean = true) => {
        // 這裡需要根據實際的日曆組件返回的格式進行處理
        // 假設返回的是 CalendarDate 格式
        const simpleDate = {
            year: date.year,
            month: date.month,
            day: date.day
        };

        dateTimeValue.inputDateValue.value =
            new Date(simpleDate.year, simpleDate.month - 1, simpleDate.day)
                .toLocaleDateString('zh-TW'); // ISO format YYYY-MM-DD

        const updatedDateTime = dateTimeValue.updateDateTime();
        emitEvents(updatedDateTime);

        if (closeCalendar) {
            calendarPopup.hideCalendar();
        }
    };

    /**
     * 處理時間選擇（來自日曆的時間選擇器）
     */
    const handleTimeSelect = (timeStr: string) => {
        dateTimeValue.inputTimeValue.value = timeStr;
        const updatedDateTime = dateTimeValue.updateDateTime();
        emitEvents(updatedDateTime);
    };

    /**
     * 容器點擊處理
     */
    const handleContainerClick = (event: MouseEvent) => {
        calendarPopup.handleContainerClick(event, () => {
            navigation.focusFirstInput();
        });
    };

    /**
     * 重置所有值
     */
    const reset = () => {
        dateTimeValue.clearValues();
        validation.clearAllErrors();
        emitEvents(null);
    };

    /**
     * 驗證當前值
     */
    const validate = () => {
        dateInputRef.value?.validate();
        if (showTime && timeInputRef.value) {
            timeInputRef.value.validate();
        }

        return validation.validateDateTime(
            dateTimeValue.inputDateValue.value,
            dateTimeValue.inputTimeValue.value
        );
    };

    /**
     * 設置當前時間
     */
    const selectNow = () => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('zh-TW'); // ISO format
        const timeStr = defaultTime.getCurrentTimeString();

        dateTimeValue.inputDateValue.value = dateStr;
        dateTimeValue.inputTimeValue.value = timeStr;

        const updatedDateTime = dateTimeValue.updateDateTime();
        emitEvents(updatedDateTime);
    };

    /**
     * 聚焦到第一個輸入框
     */
    const focus = () => {
        navigation.focusFirstInput();
    };

    return {
        // 狀態
        isDisabled,

        // 從各個 composables 暴露的狀態
        ...validation,
        ...dateTimeValue,
        ...calendarPopup,

        // 計算屬性
        calendarDateForGrid,
        calendarMinDate,
        calendarMaxDate,

        // 預設時間相關
        getValidDefaultTime: defaultTime.getValidDefaultTime,

        // 事件處理方法
        setEmitters,
        handleDateValidation,
        handleTimeValidation,
        handleDateComplete,
        handleTimeComplete,
        handleCalendarSelect,
        handleTimeSelect,
        handleContainerClick,
        handleContainerMouseDown: calendarPopup.handleContainerMouseDown,

        // 導航方法
        handleNavigateToDate: navigation.handleNavigateToDate,
        handleNavigateToTime: navigation.handleNavigateToTime,

        // 主要操作方法
        reset,
        validate,
        selectNow,
        focus,

        // 直接暴露導航方法（用於 defineExpose）
        focusFirstInput: navigation.focusFirstInput,
        focusLastInput: navigation.focusLastInput,
    };
}
