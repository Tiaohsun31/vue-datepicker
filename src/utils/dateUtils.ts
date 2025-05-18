
// import { CalendarDate } from '@internationalized/date';
// export const ensureCalendarDate = (date: any): CalendarDate | null => {
//     if (!date) return null;
//     if (date instanceof CalendarDate) return date;
//     return new CalendarDate(date.year, date.month, date.day);
// };


import { CalendarDate, getLocalTimeZone, today as todayFunction } from '@internationalized/date';

/**
 * 獲取今天的日期，轉換為 CalendarDate 格式
 * @returns 今天的日期 (CalendarDate)
 */
export const getTodaysDate = (): CalendarDate => {
    const now = todayFunction(getLocalTimeZone());
    return new CalendarDate(now.year, now.month, now.day);
};

/**
 * 確保輸入值是 CalendarDate 類型，如果是 null 則返回 null
 * @param date 可能是 CalendarDate 或 null 的輸入
 * @returns CalendarDate 或 null
 */
export const ensureCalendarDate = (date: CalendarDate | null | unknown): CalendarDate | null => {
    if (!date) return null;

    if (date instanceof CalendarDate) {
        return date;
    }

    // 使用類型斷言
    const dateObj = date as { year: number; month: number; day: number };
    if (typeof dateObj === 'object' && 'year' in dateObj && 'month' in dateObj && 'day' in dateObj) {
        return new CalendarDate(dateObj.year, dateObj.month, dateObj.day);
    }

    return null;
};

/**
 * 將 CalendarDate 格式化為標準字符串 (YYYY-MM-DD)
 * @param date CalendarDate 對象或 null
 * @returns 格式化後的字符串，如果輸入為 null 則返回空字符串
 */
export const formatCalendarDateToString = (date: CalendarDate | null): string => {
    if (!date) return '';
    return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
};

/**
 * 獲取指定年月的天數
 * @param year 年份
 * @param month 月份 (1-12)
 * @returns 該月的天數
 */
export const getDaysInMonth = (year: number, month: number): number => {
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 檢查閏年 (2月為29天)
    if (month === 2) {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        return isLeapYear ? 29 : 28;
    }

    return daysInMonth[month];
};
