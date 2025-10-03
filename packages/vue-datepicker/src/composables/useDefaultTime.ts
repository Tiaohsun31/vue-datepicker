/**
 * useDefaultTime.ts
 * 管理預設時間的驗證和格式化
 */

import { computed } from 'vue';

interface DefaultTimeOptions {
    customDefaultTime?: string;
    enableSeconds?: boolean;
}

export function useDefaultTime(options: DefaultTimeOptions = {}) {
    const {
        customDefaultTime = '00:00:00',
        enableSeconds = true,
    } = options;

    /**
     * 驗證時間字符串格式
     */
    const isValidTimeValue = (timeStr: string): boolean => {
        if (!timeStr) return false;

        // 檢查基本格式 HH:mm:ss 或 HH:mm
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])(?::([0-5]?[0-9]))?$/;
        if (!timeRegex.test(timeStr)) {
            console.warn(`時間格式不正確: ${timeStr}，應為 HH:mm:ss 或 HH:mm 格式`);
            return false;
        }

        const parts = timeStr.split(':');
        const hours = parseInt(parts[0] || '0');
        const minutes = parseInt(parts[1] || '0');
        const seconds = parts[2] ? parseInt(parts[2] || '0') : 0;

        // 驗證範圍
        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            console.warn(`時間值超出範圍: ${timeStr}`);
            return false;
        }

        return true;
    };

    /**
     * 格式化時間字符串，確保完整格式
     */
    const formatTimeString = (timeStr: string, needSeconds: boolean = enableSeconds): string => {
        const parts = timeStr.split(':');
        const hours = (parts[0] || '0').padStart(2, '0');
        const minutes = (parts[1] || '0').padStart(2, '0');
        const seconds = parts[2] ? parts[2].padStart(2, '0') : '00';

        if (needSeconds) {
            return `${hours}:${minutes}:${seconds}`;
        } else {
            return `${hours}:${minutes}`;
        }
    };

    /**
     * 獲取有效的預設時間
     */
    const getValidDefaultTime = computed(() => {
        // 優先使用自訂時間
        if (customDefaultTime && isValidTimeValue(customDefaultTime)) {
            return formatTimeString(customDefaultTime, enableSeconds);
        }

        // 如果都沒有，返回 undefined
        return undefined;
    });

    /**
     * 獲取當前時間字符串
     */
    const getCurrentTimeString = (): string => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        if (enableSeconds) {
            return `${hours}:${minutes}:${seconds}`;
        } else {
            return `${hours}:${minutes}`;
        }
    };

    /**
     * 解析時間字符串為組件
     */
    const parseTimeString = (timeStr: string) => {
        const parts = timeStr.split(':');
        return {
            hours: parseInt(parts[0] || '0') || 0,
            minutes: parseInt(parts[1] || '0') || 0,
            seconds: parseInt(parts[2] || '0') || 0,
        };
    };

    /**
     * 從組件構建時間字符串
     */
    const buildTimeString = (hours: number, minutes: number, seconds: number = 0) => {
        const h = hours.toString().padStart(2, '0');
        const m = minutes.toString().padStart(2, '0');
        const s = seconds.toString().padStart(2, '0');

        if (enableSeconds) {
            return `${h}:${m}:${s}`;
        } else {
            return `${h}:${m}`;
        }
    };

    return {
        // 計算屬性
        getValidDefaultTime,

        // 驗證方法
        isValidTimeValue,

        // 格式化方法
        formatTimeString,
        getCurrentTimeString,
        parseTimeString,
        buildTimeString,
    };
}
