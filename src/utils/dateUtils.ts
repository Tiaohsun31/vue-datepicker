// dateUtils.ts
import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// 擴展 dayjs 功能
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

/**
 * 支持的日期時間格式
 */
export type DateTimeValue =
    | string          // ISO 字符串: '2025-05-22', '2025-05-22T09:23:20', '2025-05-22T09:23:20Z'
    | Date            // JavaScript Date
    | CalendarDate    // @internationalized/date CalendarDate
    | CalendarDateTime // @internationalized/date CalendarDateTime
    | null;

/**
 * CalendarDateTime 對象的格式化選項
 */
export type OutputFormat = 'iso' | 'date' | 'calendar';

/**
 * 獲取今天的日期（CalendarDate對象）
 */
export function getTodaysDate(): CalendarDate {
    const today = new Date();
    return new CalendarDate(
        today.getFullYear(),
        today.getMonth() + 1, // JavaScript 月份從 0 開始
        today.getDate()
    );
}

/**
 * 將日期字符串或 Date 對象轉換為 CalendarDateTime 對象
 * 支持多種常見日期時間格式
 */
export function parseToCalendarDateTime(
    value: DateTimeValue | undefined
): CalendarDateTime | null {
    if (!value) return null;

    try {
        // 已經是 CalendarDateTime 對象
        if (value instanceof CalendarDateTime) {
            return value;
        }

        // 是 CalendarDate 對象
        if (value instanceof CalendarDate) {
            return new CalendarDateTime(value.year, value.month, value.day, 0, 0, 0);
        }

        // 是 Date 對象
        if (value instanceof Date) {
            return new CalendarDateTime(
                value.getFullYear(),
                value.getMonth() + 1,
                value.getDate(),
                value.getHours(),
                value.getMinutes(),
                value.getSeconds()
            );
        }

        // 是字符串
        const date = dayjs(value);
        if (date.isValid()) {
            return new CalendarDateTime(
                date.year(),
                date.month() + 1,
                date.date(),
                date.hour(),
                date.minute(),
                date.second()
            );
        }

        console.warn(`無法解析日期時間: ${value}`);
        return null;
    } catch (error) {
        console.error('轉換日期時間出錯:', error);
        return null;
    }
}

/**
 * 確保值是 CalendarDate 對象
 */
export function ensureCalendarDate(
    value: DateTimeValue | undefined
): CalendarDate | null {
    if (!value) return null;

    try {
        // 已經是 CalendarDate 對象
        if (value instanceof CalendarDate) {
            return value;
        }

        // 是 CalendarDateTime 對象
        if (value instanceof CalendarDateTime) {
            return new CalendarDate(value.year, value.month, value.day);
        }

        // 處理「看起來像 CalendarDate」的對象 (duck typing)
        if (typeof value === 'object' && value !== null &&
            'year' in value && 'month' in value && 'day' in value &&
            typeof value.year === 'number' &&
            typeof value.month === 'number' &&
            typeof value.day === 'number') {
            return new CalendarDate(value.year, value.month, value.day);
        }

        // 使用 parseToCalendarDateTime 函數處理字符串和 Date 對象
        const dateTime = parseToCalendarDateTime(value);
        if (dateTime) {
            return new CalendarDate(dateTime.year, dateTime.month, dateTime.day);
        }

        return null;
    } catch (error) {
        console.error('確保 CalendarDate 出錯:', error);
        return null;
    }
}

/**
 * 將 CalendarDate 對象轉換為字符串
 */
export function formatCalendarDateToString(
    date: CalendarDate | CalendarDateTime | null | undefined,
    format: string = 'YYYY-MM-DD'
): string | null {
    if (!date) return null;

    try {
        // 使用 dayjs 處理格式化
        const dayjsDate = dayjs(`${date.year}-${date.month}-${date.day}`);
        return dayjsDate.format(format);
    } catch (error) {
        console.error('格式化日期出錯:', error);
        return null;
    }
}

/**
 * 將 CalendarDateTime 對象轉換為指定格式的字符串
 */
export function formatFromCalendarDateTime(
    dateTime: CalendarDateTime | null | undefined,
    format: string = 'YYYY-MM-DD HH:mm:ss'
): string | null {
    if (!dateTime) return null;

    try {
        const date = new Date(
            dateTime.year,
            dateTime.month - 1,
            dateTime.day,
            dateTime.hour,
            dateTime.minute,
            dateTime.second
        );

        return dayjs(date).format(format);
    } catch (error) {
        console.error('格式化日期時間出錯:', error);
        return null;
    }
}

/**
 * 將 CalendarDateTime 格式化為完整日期時間字符串
 */
export function formatCalendarDateTimeToString(
    dateTime: CalendarDateTime | null | undefined,
    timeFormat: string = 'HH:mm:ss'
): string | null {
    if (!dateTime) return null;
    const dateStr = formatCalendarDateToString(dateTime);
    if (!dateStr) return null;

    const hour = dateTime.hour.toString().padStart(2, '0');
    const minute = dateTime.minute.toString().padStart(2, '0');
    const second = dateTime.second.toString().padStart(2, '0');

    // 根據指定的時間格式
    const timeStr = timeFormat
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second);

    return `${dateStr} ${timeStr}`;
}

/**
 * 將標準字符串格式轉換為 CalendarDateTime
 * 支援 ISO 日期時間格式 (YYYY-MM-DDTHH:mm:ss)
 */
export function parseStringToCalendarDateTime(
    dateTimeStr: string | null | undefined
): CalendarDateTime | null {
    if (!dateTimeStr) return null;
    try {
        const date = dayjs(dateTimeStr);
        if (!date.isValid()) return null;

        return new CalendarDateTime(
            date.year(),
            date.month() + 1,
            date.date(),
            date.hour(),
            date.minute(),
            date.second()
        );
    } catch (e) {
        console.error('Error parsing date time string:', e);
        return null;
    }
}

/**
 * 檢查日期是否在指定範圍內
 */
export function isDateInRange(
    date: CalendarDate,
    minDate?: CalendarDate | null,
    maxDate?: CalendarDate | null
): boolean {
    if (minDate && date.compare(minDate) < 0) return false;
    if (maxDate && date.compare(maxDate) > 0) return false;
    return true;
}

/**
 * 將 CalendarDateTime 格式化為指定的輸出格式
 * @param dateTime CalendarDateTime 對象
 * @param outputFormat 輸出格式 ('iso', 'date', 'calendar')
 * @param dateFormat 日期格式 (預設為 'YYYY-MM-DD HH:mm:ss')
 * @returns 格式化後的日期時間值
 */
export function formatOutput(
    dateTime: CalendarDateTime | null,
    outputFormat: OutputFormat = 'iso',
    dateFormat: string = 'YYYY-MM-DD HH:mm:ss'
): DateTimeValue {
    if (!dateTime) return null;

    switch (outputFormat) {
        case 'iso':
            return formatFromCalendarDateTime(dateTime, dateFormat);

        case 'date':
            return new Date(
                dateTime.year,
                dateTime.month - 1,
                dateTime.day,
                dateTime.hour,
                dateTime.minute,
                dateTime.second
            );

        case 'calendar':
            return dateTime;

        default:
            return formatFromCalendarDateTime(dateTime, dateFormat);
    }
}

/**
 * 獲取當前時間的 CalendarDateTime 對象
 * @returns 當前時間的 CalendarDateTime 對象
 */
export const getNow = (): CalendarDateTime => {
    const now = new Date();
    return new CalendarDateTime(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    );
};

/**
 * 檢查日期格式是否有效
 * @param format 日期格式字符串
 * @returns 是否有效
 */
export function isValidDateFormat(format: string): boolean {
    const validTokens = ['YYYY', 'YY', 'MM', 'M', 'DD', 'D'];
    const formatClean = format.replace(/[^\w]/g, ' ');

    // 檢查最基本的要求：年、月、日必須都存在 (考慮區分大小寫)
    const hasYear = formatClean.includes('YYYY') || formatClean.includes('YY');
    const hasMonth = formatClean.includes('MM') || formatClean.includes('M');
    const hasDay = formatClean.includes('DD') || formatClean.includes('D');

    // 檢查是否包含無效的格式標記 (例如小寫的 yyyy 或 mm)
    const tokens = formatClean.split(/\s+/).filter(Boolean);
    const hasInvalidToken = tokens.some(token => {
        // 檢查是否有類似但不完全符合的標記 (如 yyyy, mm, dd)
        if (/^[yY]{1,4}$/.test(token) && !validTokens.includes(token)) return true;
        if (/^[mM]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        if (/^[dD]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        return false;
    });

    return hasYear && hasMonth && hasDay && !hasInvalidToken;
}

/**
 * 檢查時間格式是否有效
 * @param format 時間格式字符串
 * @returns 是否有效
 */
export function isValidTimeFormat(format: string): boolean {
    const validTokens = ['HH', 'H', 'mm', 'm', 'ss', 's', 'a', 'A'];
    const formatClean = format.replace(/[^\w]/g, ' ');

    // 檢查最基本的要求：小時、分鐘至少要存在
    const hasHour = formatClean.includes('HH') || formatClean.includes('H');
    const hasMinute = formatClean.includes('mm') || formatClean.includes('m');

    // 檢查是否包含無效的格式標記
    const tokens = formatClean.split(/\s+/).filter(Boolean);
    const hasInvalidToken = tokens.some(token => {
        if (/^[hH]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        if (/^[mM]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        if (/^[sS]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        return false;
    });

    return hasHour && hasMinute && !hasInvalidToken;
}

/**
 * 修正日期格式字符串中的常見錯誤
 * @param format 日期格式字符串
 * @returns 修正後的日期格式字符串
 */
export const fixDateFormat = (format: string): string => {
    // 替換常見的小寫錯誤
    let fixed = format;
    fixed = fixed.replace(/yyyy/g, 'YYYY');
    fixed = fixed.replace(/yy/g, 'YY');
    fixed = fixed.replace(/mm/g, 'MM');
    fixed = fixed.replace(/dd/g, 'DD');

    return fixed;
};

/**
 * 修正時間格式字符串中的常見錯誤
 * @param format 時間格式字符串
 * @returns 修正後的時間格式字符串
 */
export const fixTimeFormat = (format: string): string => {
    // 替換常見的小寫錯誤
    let fixed = format;
    fixed = fixed.replace(/hh/g, 'HH');
    fixed = fixed.replace(/mm/g, 'mm'); // 分鐘小寫保持不變
    fixed = fixed.replace(/ss/g, 'ss'); // 秒數小寫保持不變

    return fixed;
};
