
// import { CalendarDate } from '@internationalized/date';
// export const ensureCalendarDate = (date: any): CalendarDate | null => {
//     if (!date) return null;
//     if (date instanceof CalendarDate) return date;
//     return new CalendarDate(date.year, date.month, date.day);
// };


// import { CalendarDate, getLocalTimeZone, today as todayFunction } from '@internationalized/date';

// /**
//  * 獲取今天的日期，轉換為 CalendarDate 格式
//  * @returns 今天的日期 (CalendarDate)
//  */
// export const getTodaysDate = (): CalendarDate => {
//     const now = todayFunction(getLocalTimeZone());
//     return new CalendarDate(now.year, now.month, now.day);
// };

// /**
//  * 確保輸入值是 CalendarDate 類型，如果是 null 則返回 null
//  * @param date 可能是 CalendarDate 或 null 的輸入
//  * @returns CalendarDate 或 null
//  */
// export const ensureCalendarDate = (date: CalendarDate | null | unknown): CalendarDate | null => {
//     if (!date) return null;

//     if (date instanceof CalendarDate) {
//         return date;
//     }

//     // 使用類型斷言
//     const dateObj = date as { year: number; month: number; day: number };
//     if (typeof dateObj === 'object' && 'year' in dateObj && 'month' in dateObj && 'day' in dateObj) {
//         return new CalendarDate(dateObj.year, dateObj.month, dateObj.day);
//     }

//     return null;
// };

// /**
//  * 將 CalendarDate 格式化為標準字符串 (YYYY-MM-DD)
//  * @param date CalendarDate 對象或 null
//  * @returns 格式化後的字符串，如果輸入為 null 則返回空字符串
//  */
// export const formatCalendarDateToString = (date: CalendarDate | null): string => {
//     if (!date) return '';
//     return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
// };

// /**
//  * 獲取指定年月的天數
//  * @param year 年份
//  * @param month 月份 (1-12)
//  * @returns 該月的天數
//  */
// export const getDaysInMonth = (year: number, month: number): number => {
//     const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//     // 檢查閏年 (2月為29天)
//     if (month === 2) {
//         const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
//         return isLeapYear ? 29 : 28;
//     }

//     return daysInMonth[month];
// };
import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import dayjs from 'dayjs';

/**
 * 確保輸入值是 CalendarDate 類型
 */
// export function ensureCalendarDate(date: CalendarDate | CalendarDateTime | null): CalendarDate | null {
//     if (!date) return null;


//     // 如果是 CalendarDateTime，轉換為 CalendarDate
//     if ('hour' in date) {
//         return new CalendarDate(date.year, date.month, date.day);
//     }

//     return date;
// }
export const ensureCalendarDate = (date: CalendarDate | CalendarDateTime | null | unknown): CalendarDate | null => {
    if (!date) return null;

    if (date instanceof CalendarDate) {
        return date;
    }

    // 如果是 CalendarDateTime，轉換為 CalendarDate
    if (date instanceof CalendarDateTime) {
        return new CalendarDate(date.year, date.month, date.day);
    }

    // 使用類型斷言
    const dateObj = date as { year: number; month: number; day: number };
    if (typeof dateObj === 'object' && 'year' in dateObj && 'month' in dateObj && 'day' in dateObj) {
        return new CalendarDate(dateObj.year, dateObj.month, dateObj.day);
    }

    return null;
};

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
 * 將 CalendarDate 格式化為字符串
 */
export function formatCalendarDateToString(date: CalendarDate | CalendarDateTime): string {
    // 確保是 CalendarDate
    const calendarDate = ensureCalendarDate(date);
    if (!calendarDate) return '';

    return dayjs(new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day))
        .format('YYYY-MM-DD');
}

/**
 * 將 CalendarDateTime 格式化為完整日期時間字符串
 */
export function formatCalendarDateTimeToString(dateTime: CalendarDateTime, timeFormat: string = 'HH:mm:ss'): string {
    const dateStr = formatCalendarDateToString(dateTime);

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
export function parseStringToCalendarDateTime(dateTimeStr: string): CalendarDateTime | null {
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
