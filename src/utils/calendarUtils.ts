// utils/CalendarUtils.ts - 統一的日曆工具類
import {
    CalendarDate,
    type Calendar,
    createCalendar,
    toCalendar,
    GregorianCalendar,
    getWeeksInMonth,
    startOfWeek,
    getDayOfWeek,
} from '@internationalized/date';

import type { SimpleDateValue } from './dateUtils';
import { createRocFormatPlugin } from '@/plugins/calendars/RocFormatPlugin';
import dayjs from 'dayjs';

const rocPlugin = createRocFormatPlugin();
/**
 * 統一的日曆工具類 - 基於 @internationalized/date
 */
export class CalendarUtils {
    /**
     * 安全地創建日曆實例
     */
    static createSafeCalendar(calendarId: string): Calendar {
        try {
            return createCalendar(calendarId as any);
        } catch (error) {
            console.warn(`無法創建日曆 ${calendarId}，回退到西元曆:`, error);
            return new GregorianCalendar();
        }
    }

    /**
     * 安全地進行日曆轉換
     */
    static safeToCalendar(date: CalendarDate, targetCalendar: Calendar): CalendarDate {
        try {
            return toCalendar(date, targetCalendar);
        } catch (error) {
            console.warn('日曆轉換失敗，返回原始日期:', error);
            return date;
        }
    }

    /**
     * 獲取日曆系統的有效年份範圍
     */
    static getCalendarYearRange(calendarId: string): { min: number; max: number } {
        // 基於實際使用情況的合理範圍
        const ranges: Record<string, { min: number; max: number }> = {
            'gregory': { min: 1, max: 9999 },        // 西元曆
            'roc': { min: 1, max: 500 },             // 民國 1年(1912) 到 500年(2411) - 擴大範圍
            'buddhist': { min: 1000, max: 3500 },    // 佛曆實際使用範圍
            'japanese': { min: 1, max: 200 },        // 日本年號範圍
            'islamic': { min: 1, max: 2000 },        // 伊斯蘭曆
            'persian': { min: 1, max: 2000 },        // 波斯曆
            'hebrew': { min: 1, max: 8000 },         // 希伯來曆
            'indian': { min: 1, max: 2000 },         // 印度曆
        };

        return ranges[calendarId] || { min: 1, max: 9999 };
    }

    /**
     * 轉換西元年到目標日曆系統年份
     */
    static convertGregorianYear(gregorianYear: number, targetCalendarId: string): {
        localYear: number;
        isValid: boolean;
    } {
        if (targetCalendarId === 'gregory') {
            return { localYear: gregorianYear, isValid: true };
        }

        try {
            const gregorianDate = new CalendarDate(gregorianYear, 1, 1);
            const targetCalendar = this.createSafeCalendar(targetCalendarId);
            const localDate = this.safeToCalendar(gregorianDate, targetCalendar);

            const range = this.getCalendarYearRange(targetCalendarId);
            const isValid = localDate.year >= range.min && localDate.year <= range.max;

            return { localYear: localDate.year, isValid };
        } catch (error) {
            console.warn(`年份轉換失敗 ${gregorianYear} -> ${targetCalendarId}:`, error);
            return { localYear: gregorianYear, isValid: false };
        }
    }

    /**
     * 轉換目標日曆年份到西元年
     */
    static convertToGregorianYear(localYear: number, sourceCalendarId: string): number {
        if (sourceCalendarId === 'gregory') {
            return localYear;
        }

        try {
            const sourceCalendar = this.createSafeCalendar(sourceCalendarId);
            const localDate = new CalendarDate(sourceCalendar, localYear, 1, 1);
            const gregorianDate = this.safeToCalendar(localDate, new GregorianCalendar());
            return gregorianDate.year;
        } catch (error) {
            console.warn(`年份轉換失敗 ${localYear} ${sourceCalendarId} -> Gregory:`, error);
            return localYear;
        }
    }

    /**
     * 獲取月份名稱 - 簡化版本
     */
    static getMonthNames(locale: string, calendarId: string = 'gregory'): string[] {
        try {
            // 對於大多數日曆系統，月份名稱相同
            const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });

            return Array.from({ length: 12 }, (_, i) => {
                // 使用固定的西元年避免轉換問題
                const date = new Date(2000, i, 1);
                return formatter.format(date);
            });
        } catch (error) {
            console.warn(`獲取月份名稱失敗 ${calendarId}:`, error);
            // 基於語言的回退邏輯
            if (locale.startsWith('zh')) {
                return Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
            } else if (locale.startsWith('ja')) {
                return Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
            } else {
                // 英文回退
                const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                return monthNames;
            }
        }
    }

    /**
     * 安全地生成日曆網格
     */
    static generateCalendarDays(
        year: number,
        month: number,
        calendarId: string,
        locale: string,
        weekStartsOn: number = 0
    ): CalendarDate[] {
        try {
            // const calendar = this.createSafeCalendar(calendarId);
            // const firstDayOfMonth = new CalendarDate(calendar, year, month, 1);
            const calendar = this.createSafeCalendar(calendarId);
            const gregorianDate = new CalendarDate(year, month, 1);

            // 然後轉換為目標日曆
            const firstDayOfMonth = calendarId === 'gregory'
                ? gregorianDate
                : this.safeToCalendar(gregorianDate, calendar);
            console.log('生成日曆網格 - 首日:', firstDayOfMonth.toString());

            const weeksInMonth = getWeeksInMonth(firstDayOfMonth, locale) ?? 6;

            let startDay: CalendarDate;
            try {
                startDay = startOfWeek(firstDayOfMonth, locale);
            } catch (error) {
                // 手動計算週的開始
                const dayOfWeek = getDayOfWeek(firstDayOfMonth, locale);
                const daysToSubtract = (dayOfWeek - weekStartsOn + 7) % 7;
                startDay = firstDayOfMonth.subtract({ days: daysToSubtract });
            }

            const days: CalendarDate[] = [];
            let currentDate = startDay;

            const totalCells = weeksInMonth * 7;
            for (let i = 0; i < totalCells; i++) {
                days.push(currentDate);
                currentDate = currentDate.add({ days: 1 });
            }

            return days;
        } catch (error) {
            console.error('生成日曆網格失敗:', error);
            return [];
        }
    }


    /**
     * 獲取日曆系統的顯示名稱
     */
    static getCalendarDisplayName(calendarId: string, locale: string = 'zh-TW'): string {
        const names: Record<string, Record<string, string>> = {
            'gregory': {
                'zh-TW': '西元',
                'zh-CN': '西元',
                'en-US': 'Gregorian',
                'ja-JP': '西暦',
                'ko-KR': '서력'
            },
            'roc': {
                'zh-TW': '民國',
                'zh-CN': '民国',
                'en-US': 'ROC',
                'ja-JP': '中華民国',
                'ko-KR': '중화민국'
            },
            'buddhist': {
                'zh-TW': '佛曆',
                'zh-CN': '佛历',
                'en-US': 'Buddhist',
                'ja-JP': '仏暦',
                'ko-KR': '불력'
            },
            'japanese': {
                'zh-TW': '和曆',
                'zh-CN': '和历',
                'en-US': 'Japanese',
                'ja-JP': '和暦',
                'ko-KR': '일본력'
            },
            'islamic': {
                'zh-TW': '伊斯蘭曆',
                'zh-CN': '伊斯兰历',
                'en-US': 'Islamic',
                'ja-JP': 'イスラム暦',
                'ko-KR': '이슬람력'
            },
            'persian': {
                'zh-TW': '波斯曆',
                'zh-CN': '波斯历',
                'en-US': 'Persian',
                'ja-JP': 'ペルシア暦',
                'ko-KR': '페르시아력'
            },
            'hebrew': {
                'zh-TW': '希伯來曆',
                'zh-CN': '希伯来历',
                'en-US': 'Hebrew',
                'ja-JP': 'ヘブライ暦',
                'ko-KR': '히브리력'
            }
        };

        return names[calendarId]?.[locale] || names[calendarId]?.['en-US'] || calendarId;
    }

    /**
     * 驗證日期在指定日曆系統中是否有效
     */
    static isValidDate(
        gregorianYear: number,
        gregorianMonth: number,
        gregorianDay: number,
        calendarId: string
    ): boolean {
        try {
            const gregorianDate = new CalendarDate(gregorianYear, gregorianMonth, gregorianDay);

            if (calendarId === 'gregory') return true;

            const targetCalendar = this.createSafeCalendar(calendarId);
            const localDate = this.safeToCalendar(gregorianDate, targetCalendar);

            const range = this.getCalendarYearRange(calendarId);
            return localDate.year >= range.min && localDate.year <= range.max;
        } catch (error) {
            console.warn('日期驗證失敗:', error);
            return false;
        }
    }

    /**
     * 解析輸入字串為 SimpleDateValue
     * 優先使用插件解析，回退到 dayjs 和 @internationalized/date
     */
    static parseInput(input: string, calendar: string = 'gregory', locale: string = 'zh-TW'): SimpleDateValue | null {
        if (!input) return null;

        // 1. 優先嘗試專用插件解析
        try {
            switch (calendar) {
                case 'gregory':
                    // 西元曆直接使用 dayjs 解析
                    const date = dayjs(input);
                    if (date.isValid()) {
                        return {
                            year: date.year(),
                            month: date.month() + 1,
                            day: date.date(),
                            hour: date.hour() || 0,
                            minute: date.minute() || 0,
                            second: date.second() || 0
                        };
                    }
                    break;
                case 'roc':
                    if (rocPlugin.canParseInput(input)) {
                        return rocPlugin.parseInput(input, locale);
                    }
                    break;


                // 其他日曆...
            }
        } catch (error) {
            console.warn(`插件解析失敗 (${calendar}):`, error);
        }

        // 2. 回退到 dayjs 解析
        try {
            const date = dayjs(input);
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
        } catch (error) {
            console.warn('dayjs 解析失敗:', error);
        }

        // 3. 嘗試 @internationalized/date 解析
        // try {
        //     // 使用 Intl.DateTimeFormat 的逆向操作
        //     // 這部分比較複雜，可能需要額外處理
        // } catch (error) {
        //     console.warn('@internationalized/date 解析失敗:', error);
        // }

        return null;
    }

    /**
     * 格式化輸出 - 優先使用插件，回退到西元曆
     */
    static formatOutput(date: SimpleDateValue, format: string, calendar: string = 'gregory', locale: string = 'zh-TW'): string {
        if (!date) return '';

        try {
            switch (calendar) {
                case 'gregory':
                    return dayjs(new Date(date.year, date.month - 1, date.day,
                        date.hour || 0, date.minute || 0, date.second || 0)).format(format);
                case 'roc':
                    if (rocPlugin.supportsFormat(format)) {
                        return rocPlugin.format(date, format, locale);
                    }
                case 'buddhist':
                case 'japanese':
                case 'islamic':
                case 'persian':
                case 'hebrew':
                default:
                    // 其他日曆系統使用西元曆格式化
                    console.warn(`日曆 ${calendar} 尚未實現格式化，使用西元曆格式化`);
                    return dayjs(new Date(date.year, date.month - 1, date.day,
                        date.hour || 0, date.minute || 0, date.second || 0)).format(format);
            }
        } catch (error) {
            console.warn('日期格式化失敗:', error);
        }

        try {
            const calendarInstance = this.createSafeCalendar(calendar);
            const calendarDate = new CalendarDate(calendarInstance, date.year, date.month, date.day);
            return calendarDate.toLocaleString();
        } catch (error) {
            console.warn(`@internationalized/date 格式化失敗:`, error);
        }

        try {
            const jsDate = new Date(date.year, date.month - 1, date.day,
                date.hour || 0, date.minute || 0, date.second || 0);
            return dayjs(jsDate).format(format);
        } catch (error) {
            console.error('所有格式化方法都失敗:', error);
            return date.year + '-' + date.month + '-' + date.day; // 最基本的回退
        }
    }
}

// 導出便利函數
export const {
    createSafeCalendar,
    safeToCalendar,
    getCalendarYearRange,
    convertGregorianYear,
    convertToGregorianYear,
    getMonthNames,
    generateCalendarDays,
    getCalendarDisplayName,
    isValidDate,
    formatOutput,
} = CalendarUtils;
