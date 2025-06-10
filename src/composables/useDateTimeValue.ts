/**
 * useDateTimeValue.ts
 * 管理日期時間值的轉換和格式化
 */

import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
// import { dayjsParseDate } from '../utils/dateUtils';
import {
    parseInputToSimpleDate,
    formatSimpleDate,
    formatOutput,
    createSimpleDate,
    type SimpleDateValue,
    type DateTimeInput,
    type OutputFormat
} from '../utils/dateUtils';

interface DateTimeValueOptions {
    showTime?: boolean;
    dateFormat?: string;
    timeFormat?: string;
    outputFormat?: OutputFormat;
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
        outputFormat = 'iso',
        defaultTime = '00:00:00',
        enableSeconds = true
    } = options;

    // 內部狀態
    const internalDateTime = ref<SimpleDateValue | null>(null);
    const inputDateValue = ref<string | null>(null);
    const inputTimeValue = ref<string | null>(null);

    /**
     * 從 SimpleDateValue 獲取時間部分字符串
     */
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

    /**
     * 從日期和時間字符串創建 SimpleDateValue
     */
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
            // 如果需要時間但未提供，使用默認時間
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
        }

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

    /**
     * 設置外部值
     */
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

    /**
     * 更新日期時間值
     */
    // const updateDateTime = (dateStr?: string | null, timeStr?: string | null) => {
    //     const finalDateStr = dateStr !== undefined ? dateStr : inputDateValue.value;
    //     let finalTimeStr = timeStr !== undefined ? timeStr : inputTimeValue.value;

    //     // 統一在這裡處理默認時間
    //     if (showTime && finalDateStr && !finalTimeStr) {
    //         finalTimeStr = defaultTime;
    //         inputTimeValue.value = finalTimeStr;
    //     }

    //     const dateTime = createDateTimeFromInputs(finalDateStr, finalTimeStr);
    //     internalDateTime.value = dateTime;

    //     return dateTime;
    // };

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
        internalDateTime.value = dateTime;

        // 同步更新顯示值（西元格式）
        if (dateTime) {
            inputDateValue.value = formatSimpleDate(dateTime, dateFormat);
            inputTimeValue.value = getTimeFromDateTime(dateTime);
        } else {
            inputDateValue.value = null;
            inputTimeValue.value = null;
        }
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

        return formatOutput(targetDateTime, outputFormat, customFormat);
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
        if (showTime && !inputTimeValue.value) {
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
