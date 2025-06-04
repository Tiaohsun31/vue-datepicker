/**
 * useDateTimePicker.ts - 整合日曆系統支援
 */

import { ref, computed, watch, type Ref } from 'vue';
import { useInputNavigation } from './useInputNavigation';
import { useDateTimeValidation } from './useDateTimeValidation';
import { useDateTimeValue } from './useDateTimeValue';
import { useCalendarPopup } from './useCalendarPopup';
import { useDefaultTime } from './useDefaultTime';
import { createCalendarSystem, type UnifiedCalendarSystem } from '../utils/calendarSystem';
import { toCalendarDate, ensureSimpleDateWithLocale, formatSimpleDate, type DateTimeValue, type SimpleDateValue, dayjsParseDate } from '../utils/dateUtils';
import { localeManager } from '@/locale/index';
import dayjs from 'dayjs';

interface DateTimePickerOptions {
    // 基本配置
    modelValue?: DateTimeValue;
    showTime?: boolean;
    required?: boolean;
    disabled?: boolean;

    // === 新增：日曆系統支援 ===
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
        calendar = 'gregory',          // 新增：日曆系統
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

    // === 新增：日曆系統 ===
    const calendarSystem = ref<UnifiedCalendarSystem | null>(null);
    const calendarInitialized = ref(false);

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

    // === 新增：初始化日曆系統 ===
    const initializeCalendarSystem = async () => {
        try {
            calendarSystem.value = await createCalendarSystem(calendar);
            calendarInitialized.value = true;
            console.log(`📅 日曆系統初始化完成: ${calendar}`);
        } catch (error) {
            console.error('日曆系統初始化失敗:', error);
            // 回退到西元曆
            calendarSystem.value = await createCalendarSystem('gregory');
            calendarInitialized.value = true;
        }
    };

    /**
     * 監聽日期變化
     */
    watch(() => calendar, (newCalendar) => {
        if (newCalendar && calendarSystem.value) {
            const success = calendarSystem.value.setCalendar(newCalendar);
            if (!success) {
                console.warn(`切換到日曆 ${newCalendar} 失敗，保持原有日曆`);
            } else {
                // 成功切換後更新 placeholder
                updatePlaceholders();
            }
        }
    });

    // === 新增：動態 placeholder ===
    const dynamicPlaceholders = ref<{ year: string; month: string; day: string }>({
        year: '年',
        month: '月',
        day: '日'
    });

    // 獲取動態 placeholder（同步）
    const updatePlaceholders = () => {
        if (calendarSystem.value) {
            try {
                dynamicPlaceholders.value = calendarSystem.value.getPlaceholders(locale);
            } catch (error) {
                console.warn('獲取 placeholder 失敗:', error);
            }
        }
    };

    // 統一的格式化函數
    const formatDateTimeWithCalendar = (dateTime: SimpleDateValue, formatStr: string): string => {
        if (!dateTime) return '';
        console.log('格式化日期:', dateTime, formatStr);
        // 如果是西元曆，使用 dayjs 格式化
        if (!calendarSystem.value || calendar === 'gregory') {
            const jsDate = new Date(
                dateTime.year,
                dateTime.month - 1,
                dateTime.day,
                dateTime.hour || 0,
                dateTime.minute || 0,
                dateTime.second || 0
            );
            return dayjs(jsDate).format(formatStr);
        }

        // 非西元曆，使用日曆系統格式化
        try {
            return calendarSystem.value.formatOutput(dateTime, formatStr, locale);
        } catch (error) {
            console.warn('日曆系統格式化失敗:', error);
            // 回退到西元曆格式化
            const jsDate = new Date(
                dateTime.year,
                dateTime.month - 1,
                dateTime.day,
                dateTime.hour || 0,
                dateTime.minute || 0,
                dateTime.second || 0
            );
            return dayjs(jsDate).format(formatStr);
        }
    };

    // 計算屬性 - 轉換為 CalendarDate 格式（供日曆組件使用）
    const calendarDateForGrid = computed(() => {
        if (!dateTimeValue.internalDateTime.value || !calendarSystem.value) return null;
        return calendarSystem.value.toCalendarDate(dateTimeValue.internalDateTime.value);
    });

    const calendarMinDate = computed(() => {
        const minDateValue = ensureSimpleDateWithLocale(minDate, locale);
        if (!minDateValue || !calendarSystem.value) return null;
        return calendarSystem.value.toCalendarDate(minDateValue);
    });

    const calendarMaxDate = computed(() => {
        const maxDateValue = ensureSimpleDateWithLocale(maxDate, locale);
        if (!maxDateValue || !calendarSystem.value) return null;
        return calendarSystem.value.toCalendarDate(maxDateValue);
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
     * 監聽外部值變化
     */
    watch(() => modelValue, (newValue) => {
        if (newValue && typeof newValue === 'string') {
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
     * === 修改：使用日曆系統解析輸入（同步） ===
     */
    const parseInputWithCalendar = (input: string): SimpleDateValue | null => {
        if (!calendarSystem.value || !input) return null;

        try {
            const result = calendarSystem.value.parseInput(input);
            if (result.success) {
                console.debug(`日曆解析成功，來源: ${result.source}`);
                return result.date;
            }
        } catch (error) {
            console.warn('日曆解析失敗:', error);
        }

        return null;
    };

    /**
     * 處理日期輸入驗證
     */
    const validateDateInput = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        errorParams: Record<string, Record<string, any>> = {}
    ) => {
        console.log('處理日期驗證:', isValid, validationErrors, errorParams);

        // 直接使用通用驗證處理器
        validation.handleDateValidation(isValid, validationErrors, 'date', errorParams);
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
    const handleDateComplete = async (dateStr: string) => {
        const date = dayjsParseDate(dateStr, dateFormat);
        if (!date.isValid()) {
            console.warn('無效的日期格式:', dateStr);
            validation.handleDateValidation(false, { date: 'date.invalid' });
            emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
            return;
        }

        dateTimeValue.inputDateValue.value = date.format('YYYY-MM-DD');


        // 如果啟用時間且沒有時間值，應用默認時間
        if (showTime && !dateTimeValue.inputTimeValue.value) {
            dateTimeValue.inputTimeValue.value = defaultTime.getValidDefaultTime.value;
        }

        // 更新內部值
        const updatedDateTime = dateTimeValue.updateDateTime();
        await wrappedEmitUpdate(updatedDateTime, 'handleDateComplete');

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
        await wrappedEmitUpdate(updatedDateTime, 'handleTimeComplete');
    };

    /**
     * 處理日曆選擇 - 使用日曆系統轉換（同步）
     */
    const handleCalendarSelect = async (date: any, closeCalendar: boolean = true) => {
        if (!calendarSystem.value) return;

        try {
            // 將選擇的日期轉回西元曆格式
            const simpleDate = calendarSystem.value.fromCalendarDate(date);
            if (simpleDate) {
                dateTimeValue.inputDateValue.value = new Date(simpleDate.year, simpleDate.month - 1, simpleDate.day).toLocaleDateString(locale);

                ['date', 'year', 'month', 'day'].forEach(field => {
                    validation.clearFieldErrors(field);
                });

                const updatedDateTime = dateTimeValue.updateDateTime();
                await wrappedEmitUpdate(updatedDateTime, 'handleCalendarSelect');

                if (closeCalendar) {
                    calendarPopup.hideCalendar();
                }
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

        // 額外的日曆驗證
        if (calendarSystem.value && dateTimeValue.internalDateTime.value) {
            const isCalendarValid = calendarSystem.value.isValidDate(dateTimeValue.internalDateTime.value);
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

        if (calendarSystem.value) {
            try {
                const dateStr = calendarSystem.value.formatOutput(simpleDate, dateFormat, locale);
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
        }
    };

    /**
     * 聚焦到第一個輸入框
     */
    const focus = () => {
        navigation.focusFirstInput();
    };

    // === 初始化日曆系統 ===
    initializeCalendarSystem().then(() => {
        updatePlaceholders();
    });

    return {
        // 狀態
        isDisabled,
        calendarInitialized,

        // === 新增：日曆系統相關 ===
        calendarSystem,
        dynamicPlaceholders,

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

        // === 新增：日曆系統方法 ===
        parseInputWithCalendar,
        updatePlaceholders
    };
}
