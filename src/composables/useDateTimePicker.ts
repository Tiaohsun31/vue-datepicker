/**
 * useDateTimePicker.ts
 */

import { ref, computed, watch, type Ref } from 'vue';
import { useInputNavigation } from './useInputNavigation';
import { useDateTimeValidation } from './useDateTimeValidation';
import { useDateTimeValue } from './useDateTimeValue';
import { useCalendarPopup } from './useCalendarPopup';
import { useDefaultTime } from './useDefaultTime';
import { CalendarUtils } from '../utils/calendarUtils';
import type { OutputType } from '@/types/main';
import {
    parseInputToSimpleDate,
    formatOutput,
    type DateTimeInput,
    type SimpleDateValue
} from '../utils/dateUtils';

interface DateTimePickerOptions {
    // 基本配置
    modelValue?: DateTimeInput;
    showTime?: boolean;
    required?: boolean;
    disabled?: boolean;

    // 日曆系統支援
    calendar?: string;              // 日曆系統 ID

    // 格式配置
    dateFormat?: string;
    timeFormat?: string;
    outputType?: OutputType;
    useStrictISO?: boolean;

    // 時間配置
    customDefaultTime?: string;
    enableSeconds?: boolean;
    autoFocusTimeAfterDate?: boolean;

    // 限制配置
    minDate?: DateTimeInput;
    maxDate?: DateTimeInput;

    // 自動聚焦
    autoFocus?: boolean;
    locale?: string;
}

interface DateTimePickerRefs {
    containerRef: Ref<HTMLElement | null>;
    calendarRef: Ref<HTMLElement | null>;
    dateInputRef: Ref<any>;
    timeInputRef: Ref<any>;
}

export function useDateTimePicker(
    options: DateTimePickerOptions = {},
    refs: DateTimePickerRefs,
) {
    const {
        modelValue = null,
        showTime = false,
        required = true,
        disabled = false,
        calendar = 'gregory',          // 日曆系統
        dateFormat = 'YYYY-MM-DD',
        timeFormat = 'HH:mm:ss',
        outputType = 'iso',
        useStrictISO = false,
        customDefaultTime,
        enableSeconds = true,
        autoFocusTimeAfterDate = true,
        minDate,
        maxDate,
        locale = 'zh-TW'
    } = options;

    const { containerRef, calendarRef, dateInputRef, timeInputRef } = refs;

    // 創建禁用狀態的響應式引用
    const isDisabled = ref(disabled);

    // 初始化各個 composables
    const validation = useDateTimeValidation({
        required,
        showTime,
        minDate,
        maxDate,
        dateFormat
    });

    const dateTimeValue = useDateTimeValue({
        showTime,
        dateFormat,
        timeFormat,
        outputType,
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
        enableSeconds
    });

    // 轉換為 SimpleDateValue
    const calendarMinDate = computed(() => {
        const minDateValue = parseInputToSimpleDate(minDate, locale);
        if (!minDateValue) return null;

        return minDateValue;
    });

    //  SimpleDateValue
    const calendarMaxDate = computed(() => {
        const maxDateValue = parseInputToSimpleDate(maxDate, locale);
        if (!maxDateValue) return null;

        return maxDateValue;
    });

    // 事件發射器
    let emitUpdate: ((value: DateTimeInput) => void) | null = null;
    let emitChange: ((value: DateTimeInput) => void) | null = null;
    let emitValidation: ((isValid: boolean, errors: Record<string, string>) => void) | null = null;

    /**
     * 設置事件發射器
     */
    const setEmitters = (emitters: {
        update?: (value: DateTimeInput) => void;
        change?: (value: DateTimeInput) => void;
        validation?: (isValid: boolean, errors: Record<string, string>) => void;
    }) => {
        emitUpdate = emitters.update || null;
        emitChange = emitters.change || null;
        emitValidation = emitters.validation || null;
    };

    /**
     * 發送更新事件
     */
    const emitEvents = async (dateTime = dateTimeValue.internalDateTime.value) => {
        let formattedOutput: DateTimeInput = null;

        if (dateTime) {
            const customFormat = showTime ? `${dateFormat} ${timeFormat}` : dateFormat;
            formattedOutput = formatOutput(dateTime, outputType, customFormat, showTime, calendar, locale, useStrictISO);
        }

        emitUpdate?.(formattedOutput);
        emitChange?.(formattedOutput);

        // 發送驗證狀態
        const isValid = !validation.hasErrors.value;
        emitValidation?.(isValid, validation.mergedErrors.value);
    };

    /**
     * 監聽外部值變化 一律嘗試轉換成 SimpleDateValue
     */
    watch(() => modelValue, (newValue) => {
        const parsedDate = parseInputToSimpleDate(newValue, locale, calendar);

        if (newValue && !parsedDate) {
            // 有輸入但解析失敗
            validation.handleDateValidation(false, { date: '無效的日期格式' });
            dateTimeValue.setExternalValue(null);
        } else if (parsedDate && !validation.validateDateRange(parsedDate)) {
            // 解析成功但超出範圍
            dateTimeValue.setExternalValue(null);
        } else {
            // 解析成功且在範圍內，或沒有輸入
            validation.clearFieldErrors('date');
            validation.clearFieldErrors('invalidInput');
            dateTimeValue.setExternalValue(parsedDate);
        }
    }, { immediate: true });

    /**
     * 處理日期輸入驗證
     */
    const validateDateInput = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        errorParams: Record<string, Record<string, any>> = {}
    ) => {
        validation.handleDateValidation(isValid, validationErrors, 'date', errorParams);
        emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
    };

    /**
     * 處理時間輸入驗證
     */
    const validateTimeInput = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        errorParams: Record<string, Record<string, any>> = {}
    ) => {
        validation.handleTimeValidation(isValid, validationErrors, 'time', errorParams);
        emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
    };

    /**
     * 處理日期輸入完成
     */
    const handleDateComplete = async (dateStr: string) => {
        dateTimeValue.inputDateValue.value = dateStr;

        // 更新內部值
        const updatedDateTime = dateTimeValue.updateFromInputs();

        if (!updatedDateTime) {
            validation.handleDateValidation(false, { date: 'date.invalid' });
            return;
        }

        // 範圍驗證
        if (!validation.validateDateRange(updatedDateTime)) {
            return;
        }

        await emitEvents(updatedDateTime);

        // 清除相關驗證錯誤
        ['date', 'year', 'month', 'day'].forEach(field => {
            validation.clearFieldErrors(field);
        });

        // 自動聚焦到時間輸入
        navigation.autoFocusTimeAfterDateComplete(
            dateTimeValue,
            customDefaultTime ? defaultTime.getValidDefaultTime.value : undefined
        );
    };

    /**
     * 處理時間輸入完成
     */
    const handleTimeComplete = async (timeStr: string) => {
        dateTimeValue.inputTimeValue.value = timeStr;
        const updatedDateTime = dateTimeValue.updateFromInputs();
        await emitEvents(updatedDateTime);

        // 清除時間相關驗證錯誤
        ['time', 'hour', 'minute', 'second'].forEach(field => {
            validation.clearFieldErrors(field);
        });
    };

    /**
     * 處理日曆選擇
     */
    const handleCalendarSelect = async (date: SimpleDateValue, closeCalendar: boolean = true) => {
        try {
            if (!validation.validateDateRange(date)) {
                return;
            }

            dateTimeValue.setInternalDateTime(date);
            await emitEvents(date);

            ['date', 'year', 'month', 'day'].forEach(field => {
                validation.clearFieldErrors(field);
            });

            if (closeCalendar) {
                calendarPopup.hideCalendar();
            }
        } catch (error) {
            console.error('處理日曆選擇失敗:', error);
        }
    };

    /**
     * 處理時間選擇（來自日曆的時間選擇器）
     */
    const handleTimeSelect = async (timeStr: string) => {
        const updatedDateTime = dateTimeValue.updateTimeOnly(timeStr);

        if (updatedDateTime) {
            await emitEvents(updatedDateTime);
        }

        ['time', 'hour', 'minute', 'second'].forEach(field => {
            validation.clearFieldErrors(field);
        });
    };

    /**
     * 容器點擊處理
     */
    const handleContainerClick = (event: MouseEvent) => {
        calendarPopup.handleContainerClick(event, () => {
            navigation.focusFirstInput();
        });
        calendarPopup.toggleCalendar();
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
     * 驗證當前值 提供表單驗證 const isValid = await datePickerRef.value?.validate();
     */
    const validate = async (): Promise<boolean> => {
        // 1. 觸發子組件驗證
        const dateValid = await dateInputRef.value?.validate();
        const timeValid = showTime ? await timeInputRef.value?.validate() : true;


        // 2. 西元曆系統驗證（只驗證西元曆）
        let calendarValid = true;
        if (dateTimeValue.internalDateTime.value) {
            calendarValid = CalendarUtils.isValidDate(
                dateTimeValue.internalDateTime.value.year,
                dateTimeValue.internalDateTime.value.month,
                dateTimeValue.internalDateTime.value.day,
                'gregory'  // 固定使用西元曆驗證
            );

            if (!calendarValid) {
                validation.handleDateValidation(false, {
                    date: 'date.invalid'  // 簡化錯誤信息
                });
            }
        }

        // 3. 整體驗證
        const overallValid = validation.validateDateTime(
            dateTimeValue.inputDateValue.value,
            dateTimeValue.inputTimeValue.value
        );

        const allValid = dateValid && timeValid && calendarValid && overallValid;

        // 4. 發送驗證結果
        emitValidation?.(allValid, validation.mergedErrors.value);

        return allValid;
    };

    /**
     * 設置當前時間
     */
    const selectNow = async () => {
        const now = new Date();
        const simpleDate: SimpleDateValue = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds()
        };

        try {
            // 直接設置內部日期時間值
            dateTimeValue.setInternalDateTime(simpleDate);

            // 發送更新事件
            await emitEvents(simpleDate);

            // 清除所有驗證錯誤
            ['date', 'year', 'month', 'day', 'time', 'hour', 'minute', 'second'].forEach(field => {
                validation.clearFieldErrors(field);
            });
        } catch (error) {
            console.warn('設置當前時間失敗:', error);

            // 回退邏輯：手動設置輸入值然後更新
            const dateStr = `${simpleDate.year}-${simpleDate.month.toString().padStart(2, '0')}-${simpleDate.day.toString().padStart(2, '0')}`;
            const timeStr = showTime ? `${(simpleDate.hour || 0).toString().padStart(2, '0')}:${(simpleDate.minute || 0).toString().padStart(2, '0')}:${(simpleDate.second || 0).toString().padStart(2, '0')}` : null;

            dateTimeValue.inputDateValue.value = dateStr;
            if (showTime && timeStr) {
                dateTimeValue.inputTimeValue.value = timeStr;
            }

            const updatedDateTime = dateTimeValue.updateFromInputs();
            await emitEvents(updatedDateTime);
        }
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

        // 日曆系統相關
        calendar: ref(calendar),

        // 從各個 composables 暴露的狀態
        ...validation,
        ...dateTimeValue,
        ...calendarPopup,

        // 計算屬性
        calendarMinDate,
        calendarMaxDate,

        // 預設時間相關
        getValidDefaultTime: defaultTime.getValidDefaultTime,

        // 事件處理方法
        setEmitters,
        validateDateInput,
        validateTimeInput,
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
