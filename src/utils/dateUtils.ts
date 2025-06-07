// dateUtils.ts - 簡化版，限縮 @internationalized/date 使用範圍
import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import localeData from 'dayjs/plugin/localeData';
import { parseUserDateInput } from './dateParsingUtils';

// 擴展 dayjs 功能
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);

/**
 * 內部使用的簡單日期介面，避免 @internationalized/date 的型別問題
 */
export interface SimpleDateValue {
    year: number;
    month: number;
    day: number;
    hour?: number;
    minute?: number;
    second?: number;
}

/**
 * 支持的日期時間格式 - 限縮 @internationalized/date 的使用
 */
export type DateTimeValue =
    | string          // ISO 字符串
    | Date            // JavaScript Date
    | SimpleDateValue // 簡單物件（主要使用）
    | CalendarDate    // 只在必要時使用
    | CalendarDateTime // 只在必要時使用
    | null;

/**
 * TODO: 確認日曆系統是否有使用該值、以及該值是否有效
 * 輸出格式選項
 * ISO 格式 - 用於 API 或顯示 "2024-06-01 14:30:25"
 * date 格式 - 用於 JavaScript Date 物件
 * simple 格式 - 用於簡單日期物件 { year: 2024, month: 6, day: 1, hour: 14, minute: 30, second: 25 }
 */
export type OutputFormat = 'iso' | 'date' | 'simple';

/**
 * 獲取今天的日期（SimpleDateValue）
 */
export function getTodaysDate(): SimpleDateValue {
    const today = new Date();
    return {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    };
}

/**
 * 獲取當前時間（SimpleDateValue with time）
 */
export function getNow(): SimpleDateValue {
    const now = new Date();
    return {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
    };
}

/**
 * 創建簡單日期物件
 */
export function createSimpleDate(
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number,
    second?: number
): SimpleDateValue {
    const result: SimpleDateValue = { year, month, day };
    if (hour !== undefined) result.hour = hour;
    if (minute !== undefined) result.minute = minute;
    if (second !== undefined) result.second = second;
    return result;
}

/**
 * 型別守衛：檢查是否為 SimpleDateValue
 */
export function isSimpleDateValue(value: any): value is SimpleDateValue {
    return value &&
        typeof value === 'object' &&
        typeof value.year === 'number' &&
        typeof value.month === 'number' &&
        typeof value.day === 'number';
}

/**
 * 型別守衛：檢查是否為 CalendarDate
 */
export function isCalendarDate(value: any): value is CalendarDate {
    return value instanceof CalendarDate;
}

/**
 * 型別守衛：檢查是否為 CalendarDateTime
 */
export function isCalendarDateTime(value: any): value is CalendarDateTime {
    return value instanceof CalendarDateTime;
}

/**
 * 安全地將 SimpleDateValue 轉換為 CalendarDate（只在必要時使用）
 */
export function toCalendarDate(value: SimpleDateValue): CalendarDate | null {
    try {
        return new CalendarDate(value.year, value.month, value.day);
    } catch (error) {
        console.error('Failed to create CalendarDate:', error);
        return null;
    }
}

/**
 * 安全地將 SimpleDateValue 轉換為 CalendarDateTime（只在必要時使用）
 */
export function toCalendarDateTime(value: SimpleDateValue): CalendarDateTime | null {
    try {
        return new CalendarDateTime(
            value.year,
            value.month,
            value.day,
            value.hour || 0,
            value.minute || 0,
            value.second || 0
        );
    } catch (error) {
        console.error('Failed to create CalendarDateTime:', error);
        return null;
    }
}

/**
 * 從 CalendarDate 轉換為 SimpleDateValue
 */
export function fromCalendarDate(date: CalendarDate): SimpleDateValue {
    return {
        year: date.year,
        month: date.month,
        day: date.day
    };
}

/**
 * 從 CalendarDateTime 轉換為 SimpleDateValue
 */
export function fromCalendarDateTime(dateTime: CalendarDateTime): SimpleDateValue {
    return {
        year: dateTime.year,
        month: dateTime.month,
        day: dateTime.day,
        hour: dateTime.hour,
        minute: dateTime.minute,
        second: dateTime.second
    };
}

/**
 * 統一的日期解析函數 - 主要返回 SimpleDateValue
 */
export function parseToSimpleDate(value: DateTimeValue | undefined): SimpleDateValue | null {
    if (!value) return null;
    console.log('parseToSimpleDate: 開始解析', value);

    try {
        // 已經是 SimpleDateValue
        if (isSimpleDateValue(value)) {
            console.log('parseToSimpleDate: 已經是 SimpleDateValue，直接返回');
            return value;
        }

        // 是 CalendarDate
        if (isCalendarDate(value)) {
            return fromCalendarDate(value);
        }

        // 是 CalendarDateTime
        if (isCalendarDateTime(value)) {
            return fromCalendarDateTime(value);
        }

        // 是 Date 對象
        if (value instanceof Date) {
            return {
                year: value.getFullYear(),
                month: value.getMonth() + 1,
                day: value.getDate(),
                hour: value.getHours(),
                minute: value.getMinutes(),
                second: value.getSeconds()
            };
        }

        // 是字符串
        if (typeof value === 'string') {
            const date = dayjs(value);
            if (date.isValid()) {
                return {
                    year: date.year(),
                    month: date.month() + 1,
                    day: date.date(),
                    hour: date.hour(),
                    minute: date.minute(),
                    second: date.second()
                };
            }
        }

        return null;
    } catch (error) {
        console.error('Failed to parse date:', error);
        return null;
    }
}

/**
 * 確保值是 SimpleDateValue（只包含日期部分）
 */
export function ensureSimpleDate(value: DateTimeValue | undefined): SimpleDateValue | null {
    const parsed = parseToSimpleDate(value);
    if (!parsed) return null;

    // 只返回日期部分
    return {
        year: parsed.year,
        month: parsed.month,
        day: parsed.day
    };
}

/*
* 確保值是 SimpleDateValue，並使用指定的語言環境進行解析
*/
export function ensureSimpleDateWithLocale(
    value: DateTimeValue | undefined,
    locale: string = 'zh-TW'
): SimpleDateValue | null {
    if (!value) return null;

    // 如果是字符串，直接使用增強解析
    if (typeof value === 'string') {
        return enhancedParseToSimpleDate(value, locale);
    }

    // 其他類型使用原有邏輯
    return ensureSimpleDate(value);
}

/**
 * 將 SimpleDateValue 轉換為字符串
 */
export function formatSimpleDate(
    date: SimpleDateValue | null | undefined,
    format: string = 'YYYY-MM-DD'
): string | null {
    if (!date) return null;

    try {

        const dayjsDate = dayjs('2000-01-01 00:00:00')
            .year(date.year)
            .month(date.month - 1)
            .date(date.day)
            .hour(date.hour || 0)
            .minute(date.minute || 0)
            .second(date.second || 0);

        return dayjsDate.format(format);
    } catch (error) {
        console.error('Failed to format date:', error);
        return null;
    }
}

/**
 * 將 SimpleDateValue 轉換為指定的輸出格式
 */
export function formatOutput(
    date: SimpleDateValue | null,
    outputFormat: OutputFormat = 'iso',
    customFormat?: string
): DateTimeValue {
    if (!date) return null;

    switch (outputFormat) {
        case 'iso':
            const format = customFormat || (
                date.hour !== undefined ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
            );
            return formatSimpleDate(date, format);

        case 'date':
            const jsDate = new Date(
                date.year,
                date.month - 1,
                date.day,
                date.hour || 0,
                date.minute || 0,
                date.second || 0
            );
            return jsDate;

        case 'simple':
            return date;

        default:
            return formatSimpleDate(date, customFormat || 'YYYY-MM-DD HH:mm:ss');
    }
}

/**
 * 檢查日期是否在指定範圍內
 */
export function isDateInRange(
    date: SimpleDateValue,
    minDate?: SimpleDateValue | null,
    maxDate?: SimpleDateValue | null
): boolean {
    if (!date) return false;

    const dateNum = date.year * 10000 + date.month * 100 + date.day;

    if (minDate) {
        const minNum = minDate.year * 10000 + minDate.month * 100 + minDate.day;
        if (dateNum < minNum) return false;
    }

    if (maxDate) {
        const maxNum = maxDate.year * 10000 + maxDate.month * 100 + maxDate.day;
        if (dateNum > maxNum) return false;
    }

    return true;
}

/**
 * 比較兩個日期
 * @returns -1 if a < b, 0 if a === b, 1 if a > b
 */
export function compareDates(a: SimpleDateValue, b: SimpleDateValue): number {
    const aNum = a.year * 10000 + a.month * 100 + a.day;
    const bNum = b.year * 10000 + b.month * 100 + b.day;

    if (aNum < bNum) return -1;
    if (aNum > bNum) return 1;
    return 0;
}

/**
 * 添加天數
 */
export function addDays(date: SimpleDateValue, days: number): SimpleDateValue {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    jsDate.setDate(jsDate.getDate() + days);

    return {
        year: jsDate.getFullYear(),
        month: jsDate.getMonth() + 1,
        day: jsDate.getDate(),
        hour: date.hour,
        minute: date.minute,
        second: date.second
    };
}

/**
 * 驗證日期格式
 */
export function isValidDateFormat(format: string): boolean {
    const validTokens = ['YYYY', 'YY', 'MM', 'M', 'DD', 'D'];
    const formatClean = format.replace(/[^\w]/g, ' ');

    const hasYear = formatClean.includes('YYYY') || formatClean.includes('YY');
    const hasMonth = formatClean.includes('MM') || formatClean.includes('M');
    const hasDay = formatClean.includes('DD') || formatClean.includes('D');

    const tokens = formatClean.split(/\s+/).filter(Boolean);
    const hasInvalidToken = tokens.some(token => {
        if (/^[yY]{1,4}$/.test(token) && !validTokens.includes(token)) return true;
        if (/^[mM]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        if (/^[dD]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        return false;
    });

    return hasYear && hasMonth && hasDay && !hasInvalidToken;
}

/**
 * 驗證時間格式
 */
export function isValidTimeFormat(format: string): boolean {
    const validTokens = ['HH', 'H', 'mm', 'm', 'ss', 's', 'a', 'A'];
    const formatClean = format.replace(/[^\w]/g, ' ');

    const hasHour = formatClean.includes('HH') || formatClean.includes('H');
    const hasMinute = formatClean.includes('mm') || formatClean.includes('m');

    const tokens = formatClean.split(/\s+/).filter(Boolean);
    const hasInvalidToken = tokens.some(token => {
        if (/^[hH]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        if (/^[mM]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        if (/^[sS]{1,2}$/.test(token) && !validTokens.includes(token)) return true;
        return false;
    });

    return hasHour && hasMinute && !hasInvalidToken;
}

export function enhancedParseToSimpleDate(
    value: any,
    locale: string = 'zh-TW'
): { year: number; month: number; day: number } | null {
    if (!value) return null;

    // 如果已經是正確的物件格式
    if (typeof value === 'object' && value.year && value.month && value.day) {
        return value;
    }

    // 如果是字符串，使用智能解析
    if (typeof value === 'string') {
        const result = parseUserDateInput(value, locale);
        return result.success ? result.date : null;
    }

    // 如果是 Date 物件
    if (value instanceof Date && !isNaN(value.getTime())) {
        return {
            year: value.getFullYear(),
            month: value.getMonth() + 1,
            day: value.getDate()
        };
    }

    // 其他情況回到原有邏輯...
    return null;
}

/**
 * 修正日期格式
 */
export function fixDateFormat(format: string): string {
    let fixed = format;
    fixed = fixed.replace(/yyyy/g, 'YYYY');
    fixed = fixed.replace(/yy/g, 'YY');
    fixed = fixed.replace(/mm/g, 'MM');
    fixed = fixed.replace(/dd/g, 'DD');
    return fixed;
}

/**
 * 修正時間格式
 */
export function fixTimeFormat(format: string): string {
    let fixed = format;
    fixed = fixed.replace(/hh/g, 'HH');
    fixed = fixed.replace(/mm/g, 'mm');
    fixed = fixed.replace(/ss/g, 'ss');
    return fixed;
}

/**
 * 智能日期解析函數
 * 優先使用指定格式，回退到常見格式，最後自動解析
 */
export const dayjsParseDate = (dateStr: string, dateFormat?: string): dayjs.Dayjs => {
    if (!dateStr || typeof dateStr !== 'string') {
        return dayjs(''); // 返回無效日期
    }

    const trimmedStr = dateStr.trim();

    // 1. 如果指定了格式，優先嘗試
    if (dateFormat) {
        const date = dayjs(trimmedStr, dateFormat, true); // strict mode
        if (date.isValid()) {
            return date;
        }
    }

    // 2. 嘗試常見格式（按使用頻率排序）
    const commonFormats = [
        'YYYY-MM-DD',    // ISO 標準格式
        'DD/MM/YYYY',    // 歐洲格式
        'MM/DD/YYYY',    // 美國格式
        'DD-MM-YYYY',    // 替代分隔符
        'MM-DD-YYYY',
        'DD.MM.YYYY',    // 德國格式
        'MM.DD.YYYY',
        'YYYY/MM/DD',    // 亞洲格式
        'YYYY.MM.DD',
        'DD MMM YYYY',   // 月份縮寫
        'MMM DD, YYYY',  // 美式月份縮寫
    ];

    for (const format of commonFormats) {
        const date = dayjs(trimmedStr, format, true);
        if (date.isValid()) {
            return date;
        }
    }

    // 3. 最後嘗試自動解析（寬鬆模式）
    const autoDate = dayjs(trimmedStr);
    return autoDate; // 即使無效也返回，讓調用方檢查 isValid()
};

/**
 * 格式化日期為指定格式
 * 提供安全的格式化，避免無效日期
 */
export const dayjsFormatDate = (date: dayjs.Dayjs, format: string): string | null => {
    if (!date || !date.isValid()) {
        return null;
    }

    try {
        return date.format(format);
    } catch (error) {
        console.warn('日期格式化失敗:', error);
        return null;
    }
};

/**
 * 驗證日期字符串是否符合指定格式
 */
export const isDateStringValid = (dateStr: string, format: string): boolean => {
    if (!dateStr || !format) return false;
    const parsed = dayjs(dateStr, format, true);
    return parsed.isValid() && parsed.format(format) === dateStr;
};

// 為了向後兼容，保留一些舊的函數名稱
export { parseToSimpleDate as parseToCalendarDateTime };
export { ensureSimpleDate as ensureCalendarDate };
export { formatSimpleDate as formatCalendarDateToString };
