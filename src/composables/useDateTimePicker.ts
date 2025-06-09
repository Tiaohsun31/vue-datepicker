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
import {
    parseInputToSimpleDate,
    formatSimpleDate,
    compareDates,
    // dayjsParseDate,
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
    outputFormat?: 'iso' | 'date' | 'simple';

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

interface UseDateTimePickerEmitters {
    update: (value: DateTimeInput) => void;
    change: (value: DateTimeInput) => void;
    validation: (isValid: boolean, errors: Record<string, string>) => void;
}

export function useDateTimePicker(
    options: DateTimePickerOptions = {},
    refs: DateTimePickerRefs,
    emitters?: UseDateTimePickerEmitters
) {
    const {
        modelValue = null,
        showTime = false,
        required = true,
        disabled = false,
        calendar = 'gregory',          // 日曆系統
        dateFormat = 'YYYY-MM-DD',
        timeFormat = 'HH:mm:ss',
        outputFormat = 'iso',
        customDefaultTime = '00:00:00',
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

    // 統一的格式化函數
    const formatDateTimeWithCalendar = (dateTime: SimpleDateValue, formatStr: string): string => {
        if (!dateTime) return '';
        // 使用 CalendarUtils 進行格式化
        return CalendarUtils.formatOutput(dateTime, formatStr, calendar, locale);
    };

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

    const wrappedEmitUpdate = async (dateTime = dateTimeValue.internalDateTime.value, source: string) => {
        console.debug(`發送更新事件，來源: ${source}`, dateTime);
        await emitEvents(dateTime);
    }

    /**
     * 發送更新事件
     */
    const emitEvents = async (dateTime = dateTimeValue.internalDateTime.value) => {
        let formattedOutput: DateTimeInput = null;
        console.log(dateTime, '發送更新事件:', dateTime);

        if (dateTime) {
            const outputFormatStr = showTime ? `${dateFormat} ${timeFormat}` : dateFormat;

            try {
                if (outputFormat === 'simple') {
                    formattedOutput = dateTime;
                } else if (outputFormat === 'date') {
                    const jsDate = new Date(
                        dateTime.year,
                        dateTime.month - 1,
                        dateTime.day,
                        dateTime.hour || 0,
                        dateTime.minute || 0,
                        dateTime.second || 0
                    );
                    formattedOutput = jsDate;
                } else {
                    // iso 格式 - 使用統一格式化函數
                    formattedOutput = formatDateTimeWithCalendar(dateTime, outputFormatStr);
                }

                console.log('格式化輸出:', { dateTime, formattedOutput, format: outputFormatStr });
            } catch (error) {
                console.warn('格式化輸出失敗:', error);
                formattedOutput = dateTimeValue.getFormattedOutput(dateTime);
            }
        }

        emitUpdate?.(formattedOutput);
        emitChange?.(formattedOutput);

        // 發送驗證狀態
        const isValid = !validation.hasErrors.value;
        emitValidation?.(isValid, validation.mergedErrors.value);
    };

    /**
     * 驗證日期區間
     */
    const validateDateRange = (parsedDate: SimpleDateValue): boolean => {
        if (!parsedDate) return false;

        // 檢查日期範圍
        if (minDate) {
            const minSimpleDate = parseInputToSimpleDate(minDate);
            if (minSimpleDate && compareDates(parsedDate, minSimpleDate) < 0) {
                validation.handleDateValidation(false, {
                    date: 'date.beforeMin'
                }, 'date', {
                    date: { minDate: formatSimpleDate(minSimpleDate, dateFormat) }
                });
                return false;
            }
        }

        if (maxDate) {
            const maxSimpleDate = parseInputToSimpleDate(maxDate);
            if (maxSimpleDate && compareDates(parsedDate, maxSimpleDate) > 0) {
                validation.handleDateValidation(false, {
                    date: 'date.afterMax'
                }, 'date', {
                    date: { maxDate: formatSimpleDate(maxSimpleDate, dateFormat) }
                });
                return false;
            }
        }

        return true;
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
        } else if (parsedDate && !validateDateRange(parsedDate)) {
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
        // const parsedDate = parseInputToSimpleDate(dateStr, locale);

        // if (!parsedDate) {
        //     validation.handleDateValidation(false, {
        //         date: 'date.invalid'
        //     }, 'date', {
        //         date: { original: dateStr, format: dateFormat }
        //     });
        //     emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
        //     return;
        // }

        // // 使用共用的區間驗證
        // if (!validateDateRange(parsedDate)) {
        //     emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
        //     return;
        // }
        const parsedDate = parseInputToSimpleDate(dateStr, locale);

        if (!parsedDate || !validateDateRange(parsedDate)) {
            return;
        }

        dateTimeValue.inputDateValue.value = dateStr;

        // 更新內部值
        const updatedDateTime = dateTimeValue.updateDateTime();
        emitEvents(updatedDateTime);

        // 清除相關驗證錯誤
        ['date', 'year', 'month', 'day'].forEach(field => {
            validation.clearFieldErrors(field);
        });

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
    const handleTimeComplete = async (timeStr: string) => {
        dateTimeValue.inputTimeValue.value = timeStr;
        const updatedDateTime = dateTimeValue.updateDateTime();
        emitEvents(updatedDateTime);

        // 清除時間相關驗證錯誤
        ['time', 'hour', 'minute', 'second'].forEach(field => {
            validation.clearFieldErrors(field);
        });
    };

    /**
     * 處理日曆選擇 - 使用 CalendarUtils
     */
    const handleCalendarSelect = async (date: SimpleDateValue, closeCalendar: boolean = true) => {
        try {
            dateTimeValue.inputDateValue.value = formatSimpleDate(date, dateFormat);

            ['date', 'year', 'month', 'day'].forEach(field => {
                validation.clearFieldErrors(field);
            });

            const updatedDateTime = dateTimeValue.updateDateTime();
            await wrappedEmitUpdate(updatedDateTime, 'handleCalendarSelect');

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
        console.log('處理時間選擇:', timeStr);

        if (dateTimeValue.internalDateTime.value) {
            const timeParts = timeStr.split(':').map(Number);
            const updatedDateTime: SimpleDateValue = {
                ...dateTimeValue.internalDateTime.value,
                hour: timeParts[0] || 0,
                minute: timeParts[1] || 0,
                second: timeParts[2] || 0
            };

            dateTimeValue.internalDateTime.value = updatedDateTime;
            dateTimeValue.inputTimeValue.value = timeStr;

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
    const validate = async () => {
        dateInputRef.value?.validate();
        if (showTime && timeInputRef.value) {
            timeInputRef.value.validate();
        }

        // 使用 CalendarUtils 進行日曆驗證
        if (dateTimeValue.internalDateTime.value) {
            const isCalendarValid = CalendarUtils.isValidDate(
                dateTimeValue.internalDateTime.value.year,
                dateTimeValue.internalDateTime.value.month,
                dateTimeValue.internalDateTime.value.day,
                calendar
            );
            if (!isCalendarValid) {
                return false;
            }
        }

        return validation.validateDateTime(
            dateTimeValue.inputDateValue.value,
            dateTimeValue.inputTimeValue.value
        );
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
            const dateStr = formatDateTimeWithCalendar(simpleDate, dateFormat);
            const timeStr = defaultTime.getCurrentTimeString();

            dateTimeValue.inputDateValue.value = dateStr;
            dateTimeValue.inputTimeValue.value = timeStr;

            const updatedDateTime = dateTimeValue.updateDateTime();
            await emitEvents(updatedDateTime);
        } catch (error) {
            console.warn('設置當前時間失敗:', error);
            // 回退到原有邏輯
            const dateStr = `${simpleDate.year}-${simpleDate.month.toString().padStart(2, '0')}-${simpleDate.day.toString().padStart(2, '0')}`;
            const timeStr = defaultTime.getCurrentTimeString();

            dateTimeValue.inputDateValue.value = dateStr;
            dateTimeValue.inputTimeValue.value = timeStr;

            const updatedDateTime = dateTimeValue.updateDateTime();
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
