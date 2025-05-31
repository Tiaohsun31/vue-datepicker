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
import { toCalendarDate, ensureSimpleDate, type DateTimeValue, type SimpleDateValue } from '../utils/dateUtils';

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

    // 計算屬性 - 轉換為 CalendarDate 格式（供日曆組件使用）
    const calendarDateForGrid = computed(() => {
        if (!dateTimeValue.internalDateTime.value || !calendarSystem.value) return null;
        return calendarSystem.value.toCalendarDate(dateTimeValue.internalDateTime.value);
    });

    const calendarMinDate = computed(() => {
        const minDateValue = ensureSimpleDate(minDate);
        if (!minDateValue || !calendarSystem.value) return null;
        return calendarSystem.value.toCalendarDate(minDateValue);
    });

    const calendarMaxDate = computed(() => {
        const maxDateValue = ensureSimpleDate(maxDate);
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

    /**
     * 發送更新事件
     */
    const emitEvents = async (dateTime = dateTimeValue.internalDateTime.value) => {
        let formattedOutput: DateTimeValue = null;

        if (dateTime && calendarSystem.value) {
            // 使用日曆系統格式化輸出
            try {
                const outputFormatStr = showTime
                    ? `${dateFormat} ${timeFormat}`
                    : dateFormat;

                // 根據 outputFormat 決定輸出格式
                if (outputFormat === 'simple') {
                    formattedOutput = dateTime;
                } else if (outputFormat === 'date') {
                    const jsDate = new Date(dateTime.year, dateTime.month - 1, dateTime.day,
                        dateTime.hour || 0, dateTime.minute || 0, dateTime.second || 0);
                    formattedOutput = jsDate;
                } else {
                    // iso 格式，使用日曆系統格式化
                    formattedOutput = calendarSystem.value.formatOutput(dateTime, outputFormatStr, locale);
                }
            } catch (error) {
                console.warn('格式化輸出失敗:', error);
                formattedOutput = dateTimeValue.getFormattedOutput(dateTime);
            }
        } else {
            formattedOutput = dateTimeValue.getFormattedOutput(dateTime);
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
     * 處理日期輸入驗證 - 整合日曆系統（同步）
     */
    const handleDateValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
        // 如果基本驗證失敗，直接設置錯誤
        if (!isValid) {
            validation.handleDateValidation(isValid, validationErrors);
            emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
            return;
        }

        // 如果有日期值且日曆系統已初始化，進行日曆特定驗證
        if (dateTimeValue.inputDateValue.value && calendarSystem.value) {
            try {
                const parsedDate = parseInputWithCalendar(dateTimeValue.inputDateValue.value);
                if (parsedDate) {
                    const isCalendarValid = calendarSystem.value.isValidDate(parsedDate);
                    if (!isCalendarValid) {
                        const supportedFormats = calendarSystem.value.getSupportedFormats();
                        validation.handleDateValidation(false, {
                            calendar: `不支援的日期格式，支援格式: ${supportedFormats.join(', ')}`
                        });
                        emitValidation?.(!validation.hasErrors.value, validation.mergedErrors.value);
                        return;
                    }
                }
            } catch (error) {
                console.warn('日曆驗證失敗:', error);
            }
        }

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
     * 處理日期輸入完成 - 整合日曆系統解析（同步）
     */
    const handleDateComplete = async (dateStr: string) => {
        dateTimeValue.inputDateValue.value = dateStr;

        // 使用日曆系統解析日期
        if (calendarSystem.value) {
            try {
                const parsedDate = parseInputWithCalendar(dateStr);
                if (parsedDate) {
                    // 更新內部日期時間
                    dateTimeValue.internalDateTime.value = {
                        ...parsedDate,
                        hour: dateTimeValue.internalDateTime.value?.hour,
                        minute: dateTimeValue.internalDateTime.value?.minute,
                        second: dateTimeValue.internalDateTime.value?.second
                    };
                }
            } catch (error) {
                console.warn('日曆解析日期失敗:', error);
            }
        }

        // 如果啟用時間且沒有時間值，應用默認時間
        if (showTime && !dateTimeValue.inputTimeValue.value) {
            dateTimeValue.inputTimeValue.value = defaultTime.getValidDefaultTime.value;
        }

        // 更新內部值並發送事件
        const updatedDateTime = dateTimeValue.updateDateTime();
        await emitEvents(updatedDateTime);

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
        await emitEvents(updatedDateTime);
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
                // 格式化為字符串
                const dateStr = calendarSystem.value.formatOutput(simpleDate, dateFormat, locale);
                dateTimeValue.inputDateValue.value = dateStr;

                // 保留現有的時間，如果有的話
                const existingTime = dateTimeValue.internalDateTime.value;
                const updatedDateTime = {
                    ...simpleDate,
                    hour: existingTime?.hour || (showTime ? 9 : 0),  // 如果顯示時間，預設 9 點
                    minute: existingTime?.minute || 0,
                    second: existingTime?.second || 0
                };

                // 直接設置內部日期時間
                dateTimeValue.setInternalDateTime(updatedDateTime);

                // 清除日期相關錯誤
                ['date', 'year', 'month', 'day'].forEach(field => {
                    validation.clearFieldErrors(field);
                });

                // 確保有有效的日期時間才發送事件
                if (updatedDateTime && updatedDateTime.year && updatedDateTime.month && updatedDateTime.day) {
                    await emitEvents(updatedDateTime);
                }

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
        console.log('當前內部日期時間:', dateTimeValue.internalDateTime.value);

        // 設置時間值
        dateTimeValue.inputTimeValue.value = timeStr;

        // 清除時間相關錯誤
        ['time', 'hour', 'minute', 'second'].forEach(field => {
            validation.clearFieldErrors(field);
        });

        // 確保有日期數據才更新
        if (dateTimeValue.internalDateTime.value) {
            const updatedDateTime = dateTimeValue.updateDateTime();
            console.log('時間選擇後的日期時間:', updatedDateTime);

            // 只有在有效日期時間時才發送事件
            if (updatedDateTime && updatedDateTime.year && updatedDateTime.month && updatedDateTime.day) {
                await emitEvents(updatedDateTime);
            } else {
                console.warn('時間選擇後沒有有效的日期時間，跳過事件發送');
            }
        } else {
            console.warn('沒有日期數據，無法設置時間');
            // 可以選擇是否要顯示錯誤提示
            validation.handleTimeValidation(false, {
                time: '請先選擇日期'
            });
        }
    };

    /**
     * 容器點擊處理
     */
    const handleContainerClick = (event: MouseEvent) => {
        navigation.focusFirstInput();
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

        // === 新增：日曆系統方法 ===
        parseInputWithCalendar,
        updatePlaceholders
    };
}
