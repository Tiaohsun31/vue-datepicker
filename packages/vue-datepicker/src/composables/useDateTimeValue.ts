/**
 * useDateTimeValue.ts
 * 管理日期時間值的轉換和格式化
 */

import { ref, computed } from 'vue';
import {
    parseInputToSimpleDate,
    formatSimpleDate,
    formatOutput,
    createSimpleDate,
    type SimpleDateValue,
    type DateTimeInput,
} from '../utils/dateUtils';
import type { OutputType } from '../types/main';

interface DateTimeValueOptions {
    showTime?: boolean;
    dateFormat?: string;
    timeFormat?: string;
    outputType?: OutputType;
    defaultTime?: string;
    enableSeconds?: boolean;
}

export function useDateTimeValue(
    options: DateTimeValueOptions = {}
) {
    const {
        showTime = false,
        dateFormat = 'YYYY-MM-DD',
        timeFormat = 'HH:mm:ss',
        outputType = 'iso',
        defaultTime,
        enableSeconds = true
    } = options;

    // 內部狀態
    // internalDateTime 統一使用西元曆，所有的日期計算、範圍驗證都基於西元曆，轉換當地日曆交由CalendarGrid處理
    const internalDateTime = ref<SimpleDateValue | null>(null);
    const inputDateValue = ref<string | null>(null);
    const inputTimeValue = ref<string | null>(null);

    //從 SimpleDateValue 獲取時間部分字符串
    const getTimeFromDateTime = (dateTime: SimpleDateValue | null): string | null => {
        if (!dateTime || dateTime.hour === undefined) return null;

        const hour = dateTime.hour.toString().padStart(2, '0');
        const minute = (dateTime.minute || 0).toString().padStart(2, '0');

        if (enableSeconds) {
            const second = (dateTime.second || 0).toString().padStart(2, '0');
            return `${hour}:${minute}:${second}`;
        } else {
            return `${hour}:${minute}`;
        }
    };

    // 從日期和時間字符串創建 SimpleDateValue
    const createDateTimeFromInputs = (
        dateStr: string | null,
        timeStr: string | null
    ): SimpleDateValue | null => {
        if (!dateStr) return null;

        const parsedDate = parseInputToSimpleDate(dateStr);
        if (!parsedDate) return null;

        if (!timeStr && !showTime) {
            // 如果不需要時間，只返回日期部分
            return createSimpleDate(parsedDate.year, parsedDate.month, parsedDate.day);
        } else if (!timeStr) {
            // 如果需要時間但未提供時間字符串
            if (defaultTime) {
                // 有設定預設時間才使用
                const timeParts = defaultTime.split(':').map(Number);
                const hour = timeParts[0] || 0;
                const minute = timeParts[1] || 0;
                const second = timeParts[2] || 0;

                return createSimpleDate(
                    parsedDate.year,
                    parsedDate.month,
                    parsedDate.day,
                    hour,
                    minute,
                    second
                );
            } else {
                // 沒有預設時間，只返回日期部分（不包含時間）
                return createSimpleDate(parsedDate.year, parsedDate.month, parsedDate.day);
            }
        }

        // 有提供時間字符串
        const timeParts = timeStr.split(':').map(Number);
        const hour = timeParts[0] || 0;
        const minute = timeParts[1] || 0;
        const second = timeParts[2] || 0;

        return createSimpleDate(
            parsedDate.year,
            parsedDate.month,
            parsedDate.day,
            hour,
            minute,
            second
        );
    };

    // 設置外部值
    const setExternalValue = (value: DateTimeInput) => {
        const dateTime = parseInputToSimpleDate(value);
        internalDateTime.value = dateTime;

        if (dateTime) {
            inputDateValue.value = formatSimpleDate(dateTime, dateFormat);
            inputTimeValue.value = getTimeFromDateTime(dateTime);
        } else {
            inputDateValue.value = null;
            inputTimeValue.value = null;
        }
    };

    // 輸入解析（適用於 DateInput/TimeInput）
    const updateFromInputs = (dateStr?: string, timeStr?: string) => {
        const finalDateStr = dateStr !== undefined ? dateStr : inputDateValue.value;
        const finalTimeStr = timeStr !== undefined ? timeStr : inputTimeValue.value;

        const dateTime = createDateTimeFromInputs(finalDateStr, finalTimeStr);
        internalDateTime.value = dateTime;
        return dateTime;
    };

    // 直接設置內部值（適用於 Calendar/TimeSelector）
    const setInternalDateTime = (dateTime: SimpleDateValue | null) => {
        if (!dateTime) {
            internalDateTime.value = null;
            inputDateValue.value = null;
            inputTimeValue.value = null;
            return;
        }
        // 如果需要顯示時間且有預設時間，且傳入的日期沒有時間信息
        if (showTime && defaultTime &&
            (dateTime.hour === undefined || dateTime.hour === null) &&
            !inputTimeValue.value) {

            // 解析預設時間
            const timeParts = defaultTime.split(':').map(Number);
            const hour = timeParts[0] || 0;
            const minute = timeParts[1] || 0;
            const second = timeParts[2] || 0;

            // 創建包含預設時間的新日期時間對象
            const dateTimeWithDefaultTime = createSimpleDate(
                dateTime.year,
                dateTime.month,
                dateTime.day,
                hour,
                minute,
                second
            );

            internalDateTime.value = dateTimeWithDefaultTime;
            inputTimeValue.value = defaultTime;
        } else {
            internalDateTime.value = dateTime;
            inputTimeValue.value = getTimeFromDateTime(dateTime);
        }

        // 同步更新顯示值（西元格式）
        if (internalDateTime.value) {
            inputDateValue.value = formatSimpleDate(internalDateTime.value);
        }
        // internalDateTime.value = dateTime;

        // console.log('setInternalDateTime', dateTime);

        // // 同步更新顯示值（西元格式）
        // if (dateTime) {
        //     inputDateValue.value = formatSimpleDate(dateTime, dateFormat);
        //     inputTimeValue.value = getTimeFromDateTime(dateTime);
        // } else {
        //     inputDateValue.value = null;
        //     inputTimeValue.value = null;
        // }
    };

    // 只更新時間部分（適用於 TimeSelector）
    const updateTimeOnly = (timeStr: string) => {
        if (!internalDateTime.value) return null;

        const timeParts = timeStr.split(':').map(Number);
        const updatedDateTime: SimpleDateValue = {
            ...internalDateTime.value,
            hour: timeParts[0] || 0,
            minute: timeParts[1] || 0,
            second: timeParts[2] || 0
        };

        internalDateTime.value = updatedDateTime;
        inputTimeValue.value = timeStr;
        return updatedDateTime;
    };

    /**
     * 獲取格式化的輸出值
     */
    const getFormattedOutput = (dateTime?: SimpleDateValue | null) => {
        const targetDateTime = dateTime !== undefined ? dateTime : internalDateTime.value;

        const customFormat = showTime
            ? `${dateFormat} ${timeFormat}`
            : dateFormat;

        return formatOutput(targetDateTime, outputType, customFormat);
    };

    /**
     * 清除所有值
     */
    const clearValues = () => {
        internalDateTime.value = null;
        inputDateValue.value = null;
        inputTimeValue.value = null;
    };

    /**
     * 檢查是否有任何值
     */
    const hasValue = computed(() => {
        return !!(inputDateValue.value || inputTimeValue.value || internalDateTime.value);
    });

    /**
     * 設置默認時間
     */
    const applyDefaultTime = () => {
        if (showTime && !inputTimeValue.value && defaultTime) {
            inputTimeValue.value = defaultTime;
            return true;
        }
        return false;
    };

    // 計算屬性
    const hasDateValue = computed(() => !!inputDateValue.value);
    const hasTimeValue = computed(() => !!inputTimeValue.value);
    const hasCompleteValue = computed(() => {
        if (!showTime) return hasDateValue.value;
        return hasDateValue.value && hasTimeValue.value;
    });

    return {
        // 響應式狀態
        internalDateTime,
        inputDateValue,
        inputTimeValue,

        // 計算屬性
        hasDateValue,
        hasTimeValue,
        hasCompleteValue,
        hasValue,

        // 主要方法
        updateFromInputs,
        setInternalDateTime,
        updateTimeOnly,
        setExternalValue,
        // updateDateTime,
        getFormattedOutput,
        clearValues,
        applyDefaultTime,

        // 輔助方法
        getTimeFromDateTime,
        createDateTimeFromInputs,
    };
}
