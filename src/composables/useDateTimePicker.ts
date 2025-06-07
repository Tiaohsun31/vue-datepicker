/**
 * useDateTimePicker.ts - 重構版本
 * 移除 calendarSystem 依賴，改用 @internationalized/date + calendarUtils
 */

import { ref, computed, watch, type Ref } from 'vue';
import { useInputNavigation } from './useInputNavigation';
import { useDateTimeValidation } from './useDateTimeValidation';
import { useDateTimeValue } from './useDateTimeValue';
import { useCalendarPopup } from './useCalendarPopup';
import { useDefaultTime } from './useDefaultTime';
import { CalendarUtils } from '../utils/calendarUtils';
import {
    ensureSimpleDateWithLocale,
    formatSimpleDate,
    compareDates,
    ensureSimpleDate,
    dayjsParseDate,
    type DateTimeValue,
    type SimpleDateValue
} from '../utils/dateUtils';
import { CalendarDate } from '@internationalized/date';

interface DateTimePickerOptions {
    // 基本配置
    modelValue?: DateTimeValue;
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
    minDate?: DateTimeValue;
    maxDate?: DateTimeValue;

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
    update: (value: DateTimeValue) => void;
    change: (value: DateTimeValue) => void;
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

    // 計算屬性 - 轉換為 CalendarDate 格式（供日曆組件使用）// 不在使用，傳入的日曆一律使用SimpleDateValue
    const calendarDateForGrid = computed(() => {
        if (!dateTimeValue.internalDateTime.value) return null;

        try {
            // 對於非西元曆，需要使用對應的日曆系統創建 CalendarDate
            const gregorianDate = new CalendarDate(
                dateTimeValue.internalDateTime.value.year,
                dateTimeValue.internalDateTime.value.month,
                dateTimeValue.internalDateTime.value.day
            );

            // return gregorianDate;

            // 如果是西元曆，直接返回
            if (calendar === 'gregory') {
                return gregorianDate;
            }

            console.log('轉換為非西元曆日曆:', calendar);

            // 否則轉換為目標日曆
            const calendarInstance = CalendarUtils.createSafeCalendar(calendar);
            console.log('創建日曆實例:', calendarInstance);
            return CalendarUtils.safeToCalendar(gregorianDate, calendarInstance);
        } catch (error) {
            console.error('創建 CalendarDate 失敗:', error);
            return null;
        }
    });

    const calendarMinDate = computed(() => {
        const minDateValue = ensureSimpleDateWithLocale(minDate, locale);
        if (!minDateValue) return null;

        try {
            const calendarInstance = CalendarUtils.createSafeCalendar(calendar);
            return new CalendarDate(calendarInstance, minDateValue.year, minDateValue.month, minDateValue.day);
        } catch (error) {
            console.error('創建最小日期失敗:', error);
            return null;
        }
    });

    const calendarMaxDate = computed(() => {
        const maxDateValue = ensureSimpleDateWithLocale(maxDate, locale);
        if (!maxDateValue) return null;

        try {
            const calendarInstance = CalendarUtils.createSafeCalendar(calendar);
            return new CalendarDate(calendarInstance, maxDateValue.year, maxDateValue.month, maxDateValue.day);
        } catch (error) {
            console.error('創建最大日期失敗:', error);
            return null;
        }
    });

    // 事件發射器
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

    const wrappedEmitUpdate = async (dateTime = dateTimeValue.internalDateTime.value, source: string) => {
        console.debug(`發送更新事件，來源: ${source}`, dateTime);
        await emitEvents(dateTime);
    }

    /**
     * 發送更新事件
     */
    const emitEvents = async (dateTime = dateTimeValue.internalDateTime.value) => {
        let formattedOutput: DateTimeValue = null;
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
     * 驗證日期輸入
     */
    const validateAndUpdateDate = (dateStr: string): boolean => {
        const date = dayjsParseDate(dateStr, dateFormat);

        if (!date.isValid()) {
            validation.handleDateValidation(false, {
                date: 'date.invalid'
            }, 'date', {
                date: { original: dateStr, format: dateFormat }
            });
            return false;
        }

        // 檢查日期範圍
        if (minDate || maxDate) {
            const simpleDate = {
                year: date.year(),
                month: date.month() + 1,
                day: date.date()
            };

            if (minDate) {
                const minSimpleDate = ensureSimpleDate(minDate);
                if (minSimpleDate && compareDates(simpleDate, minSimpleDate) < 0) {
                    validation.handleDateValidation(false, {
                        date: 'date.beforeMin'
                    }, 'date', {
                        date: { minDate: formatSimpleDate(minSimpleDate, dateFormat) }
                    });
                    return false;
                }
            }

            if (maxDate) {
                const maxSimpleDate = ensureSimpleDate(maxDate);
                if (maxSimpleDate && compareDates(simpleDate, maxSimpleDate) > 0) {
                    validation.handleDateValidation(false, {
                        date: 'date.afterMax'
                    }, 'date', {
                        date: { maxDate: formatSimpleDate(maxSimpleDate, dateFormat) }
                    });
                    return false;
                }
            }
        }

        return true;
    };

    /**
     * 監聽外部值變化 一律嘗試轉換成 SimpleDateValue
     */
    watch(() => modelValue, (newValue) => {
        if (newValue && typeof newValue === 'string') {
            const parsedDate = CalendarUtils.parseInput(newValue, calendar, locale);
            console.log('解析後的日期:', parsedDate);
            if (parsedDate) {
                dateTimeValue.setExternalValue(parsedDate);
                validation.clearFieldErrors('invalidInput');
                return;
            }
            const date = dayjsParseDate(newValue, dateFormat);
            if (!date.isValid()) {
                console.warn('無效的日期格式:', newValue);
                dateTimeValue.setExternalValue(null);
                validation.handleDateValidation(false, { date: '無效的日期格式' });
                emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
                return;
            } else {
                validation.clearFieldErrors('invalidInput');
            }
        }
        dateTimeValue.setExternalValue(newValue);
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
        if (!validateAndUpdateDate(dateStr)) {
            emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
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
    const handleCalendarSelect = async (date: CalendarDate, closeCalendar: boolean = true) => {
        console.log('處理日曆選擇:', date);

        try {
            // 不需要轉換，因為 CalendarUtils.generateCalendarDays 已經生成了正確的日期
            // 直接從 CalendarDate 提取日期資訊
            let simpleDate: SimpleDateValue;

            if (calendar === 'gregory') {
                // 西元曆直接使用
                simpleDate = {
                    year: date.year,
                    month: date.month,
                    day: date.day
                };
            } else {
                // 非西元曆需要轉換為西元曆
                const gregorianCalendar = CalendarUtils.createSafeCalendar('gregory');
                const gregorianDate = CalendarUtils.safeToCalendar(date, gregorianCalendar);

                simpleDate = {
                    year: gregorianDate.year,
                    month: gregorianDate.month,
                    day: gregorianDate.day
                };
            }

            console.log('3. simpleDate:', simpleDate);
            dateTimeValue.inputDateValue.value = formatSimpleDate(simpleDate, dateFormat);

            console.log('4. 更新日期輸入值:', dateTimeValue.inputDateValue.value);

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
        calendarDateForGrid,
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
