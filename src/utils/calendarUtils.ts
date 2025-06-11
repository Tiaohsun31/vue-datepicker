// utils/CalendarUtils.ts - 日曆轉換工具
import {
    CalendarDate,
    type Calendar,
    createCalendar,
    toCalendar,
    GregorianCalendar,
    getWeeksInMonth,
    startOfWeek,
    getDayOfWeek,
    DateFormatter,
    CalendarDateTime
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
     * 智能轉換：根據是否有時間資訊自動選擇類型
     */
    static convertToCalendarDateSmart = (simpleDate: SimpleDateValue | null, calendar: string): CalendarDate | CalendarDateTime | null => {
        if (!simpleDate) return null;

        // 檢查是否包含時間資訊
        const hasTime = simpleDate.hour !== undefined || simpleDate.minute !== undefined || simpleDate.second !== undefined;

        return hasTime
            ? this.convertToCalendarDateTime(simpleDate, calendar)
            : this.convertToCalendarDate(simpleDate, calendar);
    };

    /**
     * 統一的轉換函數：SimpleDateValue → CalendarDate
     */
    static convertToCalendarDate = (simpleDate: SimpleDateValue | null, calendar: string): CalendarDate | null => {
        if (!simpleDate) return null;

        try {
            if (calendar === 'gregory') {
                // 西元曆直接創建
                return new CalendarDate(simpleDate.year, simpleDate.month, simpleDate.day);
            } else {
                // 其他日曆系統：西元曆 → 目標日曆
                const calendarInstance = this.createSafeCalendar(calendar);
                const gregorianDate = new CalendarDate(simpleDate.year, simpleDate.month, simpleDate.day);
                return this.safeToCalendar(gregorianDate, calendarInstance);
            }
        } catch (error) {
            console.error('轉換為 CalendarDate 失敗:', error);
            return null;
        }
    };

    /**
     * 統一的轉換函數：SimpleDateValue → CalendarDateTime (日期+時間)
     */
    static convertToCalendarDateTime = (simpleDate: SimpleDateValue | null, calendar: string): CalendarDateTime | null => {
        if (!simpleDate) return null;

        try {
            if (calendar === 'gregory') {
                return new CalendarDateTime(
                    simpleDate.year,
                    simpleDate.month,
                    simpleDate.day,
                    simpleDate.hour || 0,
                    simpleDate.minute || 0,
                    simpleDate.second || 0
                );
            } else {
                const calendarInstance = this.createSafeCalendar(calendar);
                const gregorianDateTime = new CalendarDateTime(
                    simpleDate.year,
                    simpleDate.month,
                    simpleDate.day,
                    simpleDate.hour || 0,
                    simpleDate.minute || 0,
                    simpleDate.second || 0
                );
                return toCalendar(gregorianDateTime, calendarInstance);
            }
        } catch (error) {
            console.error('轉換為 CalendarDateTime 失敗:', error);
            return null;
        }
    };

    /**
     * 統一的轉換函數：CalendarDate → SimpleDateValue
     */
    static convertFromCalendarDate = (calendarDate: CalendarDate | null, calendar: string): SimpleDateValue | null => {
        if (!calendarDate) return null;

        try {
            // 檢查 CalendarDate 的實際日曆系統
            if (calendarDate.calendar.identifier === 'gregory' || calendar === 'gregory') {
                // 西元曆直接提取
                return {
                    year: calendarDate.year,
                    month: calendarDate.month,
                    day: calendarDate.day
                };
            } else {
                // 目標日曆 → 西元曆
                const gregorianCalendar = this.createSafeCalendar('gregory');
                const gregorianDate = this.safeToCalendar(calendarDate, gregorianCalendar);
                return {
                    year: gregorianDate.year,
                    month: gregorianDate.month,
                    day: gregorianDate.day
                };
            }
        } catch (error) {
            console.error('轉換從 CalendarDate 失敗:', error);
            return null;
        }
    };

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
            const calendar = this.createSafeCalendar(calendarId);
            const gregorianDate = new CalendarDate(year, month, 1);

            // 然後轉換為目標日曆
            const firstDayOfMonth = calendarId === 'gregory'
                ? gregorianDate
                : this.safeToCalendar(gregorianDate, calendar);

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
     * 獲取月份名稱
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

    // ==================================================================== //

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
     * 解析含日曆系統的格式，如民國XX年XX月XX日 XX時XX分XX秒
     * 執行順序：插件翻譯 → @internationalized/date → dayjs → 回退
     * 使用 dateParsingUtils.parseUserDateInput
     */
    // static parseInput(input: string, calendar: string = 'gregory', locale: string = 'zh-TW'): SimpleDateValue | null {
    //     if (!input) return null;

    //     const result = parseUserDateInput(input, locale, calendar);
    //     console.log(`解析輸入 "${input}" 為 ${calendar} 日曆系統:`, result);
    //     if (result.success && result.date) {
    //         // 如果是非西元曆且解析結果是西元日期，需要進行轉換
    //         if (calendar !== 'gregory' && result.calendarSystem === 'gregory') {
    //             // 將西元日期轉換為目標日曆系統的日期
    //             const gregorianDate = new CalendarDate(result.date.year, result.date.month, result.date.day);
    //             const targetCalendar = this.createSafeCalendar(calendar);
    //             const localDate = this.safeToCalendar(gregorianDate, targetCalendar);
    //             console.log(`轉換日期 ${result.date.year}-${result.date.month}-${result.date.day} 從西元曆到 ${calendar} 成功:`, localDate);
    //             return {
    //                 year: localDate.year,
    //                 month: localDate.month,
    //                 day: localDate.day
    //             };
    //         }

    //         return result.date;
    //     }

    //     return null;
    // }


    /**
     * 格式化輸出 - 統一執行順序：插件 → @internationalized/date → dayjs → 基本回退
     * 格式化含日曆系統的格式，如民國XX年XX月XX日 XX時XX分XX秒
     */
    static formatOutput(date: SimpleDateValue, format: string, calendar: string = 'gregory', locale: string = 'zh-TW'): string {
        if (!date) return '';

        try {
            // 1. 優先嘗試專用插件解析
            switch (calendar) {
                case 'gregory':
                    // 西元曆直接使用 dayjs
                    return dayjs(new Date(date.year, date.month - 1, date.day,
                        date.hour || 0, date.minute || 0, date.second || 0)).format(format);
                case 'roc':
                    if (rocPlugin.supportsFormat(format) && rocPlugin.canParseInput(format)) {
                        return rocPlugin.format(date, format, locale);
                    }
                    break;
                // 其他日曆插件可以在這裡添加
                case 'buddhist':
                case 'japanese':
                case 'islamic':
                case 'persian':
                case 'hebrew':
                    // 目前這些日曆還沒有專用插件，跳到下一步
                    break;
            }

            // 2. 嘗試使用 @internationalized/date 的 DateFormatter
            const calendarDate = this.convertToCalendarDateSmart(date, calendar);
            if (calendarDate) {
                const hasTime = date.hour !== undefined || date.minute !== undefined || date.second !== undefined;
                const formatterOptions: Intl.DateTimeFormatOptions = {
                    calendar: calendar,
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                if (hasTime) {
                    formatterOptions.hour = 'numeric';
                    formatterOptions.minute = 'numeric';
                    if (date.second !== undefined) {
                        formatterOptions.second = 'numeric';
                    }
                }
                const formatter = new DateFormatter(locale, formatterOptions);
                return formatter.format(calendarDate.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone));
            }

            // 3. 回退到 dayjs 格式化
            const jsDate = new Date(date.year, date.month - 1, date.day,
                date.hour || 0, date.minute || 0, date.second || 0);
            return dayjs(jsDate).format(format);

        } catch (error) {
            console.warn('所有格式化方法都失敗，使用基本回退:', error);

            // 4. 最基本的回退格式
            let result = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;

            if (date.hour !== undefined || date.minute !== undefined || date.second !== undefined) {
                result += ` ${(date.hour || 0).toString().padStart(2, '0')}:${(date.minute || 0).toString().padStart(2, '0')}`;
                if (date.second !== undefined) {
                    result += `:${date.second.toString().padStart(2, '0')}`;
                }
            }

            return result;
        }
    }
}

// 導出便利函數
export const {
    // 轉換核心
    convertToCalendarDate,
    convertFromCalendarDate,

    // 日曆基礎
    createSafeCalendar,
    safeToCalendar,
    generateCalendarDays,

    // 年份轉換 (YearSelector)
    convertGregorianYear,
    convertToGregorianYear,
    getCalendarYearRange,

    // 顯示相關
    getMonthNames,
    getCalendarDisplayName,

    // 日曆系統輸出輸入轉換
    isValidDate,
    // parseInput,
    formatOutput,
} = CalendarUtils;
