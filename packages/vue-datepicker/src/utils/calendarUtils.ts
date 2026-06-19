// utils/CalendarUtils.ts - 日曆轉換工具
import { getCalendarDescriptor, isCalendarRegistered } from '../plugins/calendars/registry';
import { warn, logError } from './logger';
import {
    CalendarDate,
    type Calendar,
    toCalendar,
    GregorianCalendar,
    getWeeksInMonth,
    startOfWeek,
    getDayOfWeek,
    DateFormatter,
    CalendarDateTime,
    type CalendarIdentifier
} from '@internationalized/date';

import type { SimpleDateValue } from './dateUtils';
import { isValidFormatForDayjs } from './dateUtils';
import dayjs from 'dayjs';

/**
 * 統一的日曆工具類 - 基於 @internationalized/date
 */
export class CalendarUtils {
    /**
     * 安全地創建日曆實例
     */
    static createSafeCalendar(calendarId: string): Calendar {
        const descriptor = getCalendarDescriptor(calendarId);
        if (!descriptor) {
            warn(`日曆 ${calendarId} 未註冊（是否忘了 registerCalendar？），回退到西元曆`);
            return new GregorianCalendar();
        }
        try {
            return descriptor.createCalendar();
        } catch (error) {
            warn(`無法創建日曆 ${calendarId}，回退到西元曆:`, error);
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
            warn('日曆轉換失敗，返回原始日期:', error);
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

        if (simpleDate.year <= 0 || simpleDate.month <= 0 || simpleDate.day <= 0 ||
            simpleDate.month > 12 || simpleDate.day > 31) {
            return null;
        }

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
            logError('轉換為 CalendarDate 失敗:', error);
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
            logError('轉換為 CalendarDateTime 失敗:', error);
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
            logError('轉換從 CalendarDate 失敗:', error);
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
            if (!this.isCalendarSupported(calendarId)) {
                warn(`不支持的日曆系統: ${calendarId}`);
                return [];
            }

            const calendar = this.createSafeCalendar(calendarId);
            const gregorianDate = new CalendarDate(year, month, 1);

            // 然後轉換為目標日曆
            const firstDayOfMonth = calendarId === 'gregory'
                ? gregorianDate
                : this.safeToCalendar(gregorianDate, calendar);

            const weeksInMonth = getWeeksInMonth(firstDayOfMonth, locale) ?? 6;

            const dayOfWeek = getDayOfWeek(firstDayOfMonth, locale);
            const daysToSubtract = (dayOfWeek - weekStartsOn + 7) % 7;
            const startDay = firstDayOfMonth.subtract({ days: daysToSubtract });

            const days: CalendarDate[] = [];
            let currentDate = startDay;

            const totalCells = weeksInMonth * 7;
            for (let i = 0; i < totalCells; i++) {
                days.push(currentDate);
                currentDate = currentDate.add({ days: 1 });
            }

            return days;
        } catch (error) {
            logError('生成日曆網格失敗:', error);
            return [];
        }
    }

    /**
     * 獲取日曆系統的有效年份範圍 (新版本)
     */
    static getCalendarRange(calendar: string): { min: number; max: number } {
        const currentYear = new Date().getFullYear();
        const descriptor = getCalendarDescriptor(calendar);
        return descriptor?.getYearRange(currentYear) ?? { min: 1, max: currentYear + 100 };
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

            const range = this.getCalendarRange(targetCalendarId);
            const isValid = gregorianYear >= range.min && gregorianYear <= range.max;

            return { localYear: localDate.year, isValid };
        } catch (error) {
            warn(`年份轉換失敗 ${gregorianYear} -> ${targetCalendarId}:`, error);
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
            warn(`年份轉換失敗 ${localYear} ${sourceCalendarId} -> Gregory:`, error);
            return localYear;
        }
    }

    /**
     * 獲取月份名稱
     */
    static getMonthNames(locale: string, calendarId: string = 'gregory'): string[] {
        try {
            // 對於大多數日曆系統，月份名稱相同
            const formatter = new Intl.DateTimeFormat(locale, { month: 'short' });

            return Array.from({ length: 12 }, (_, i) => {
                // 使用固定的西元年避免轉換問題
                const date = new Date(2000, i, 1);
                return formatter.format(date);
            });
        } catch (error) {
            warn(`獲取月份名稱失敗 ${calendarId}:`, error);
            // 基於語言的回退邏輯
            if (locale.startsWith('zh')) {
                return Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
            } else if (locale.startsWith('ja')) {
                return Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
            } else {
                // 英文回退 short 月份名稱
                const monthNames = [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ];
                return monthNames;
            }
        }
    }

    /**
     * 獲取日曆系統的顯示名稱
     */
    static getCalendarDisplayName(calendarId: string, locale: string = 'zh-TW'): string {
        const displayName = getCalendarDescriptor(calendarId)?.displayName;
        return displayName?.[locale] || displayName?.['en-US'] || calendarId;
    }


    // ==================================================================== //

    /**
     * 驗證日期在指定日曆系統中是否有效
     */
    static isValidDate(
        year: number,
        month: number,
        day: number,
        calendarId: string
    ): boolean {
        try {

            if (!this.isCalendarSupported(calendarId)) {
                warn(`不支持的日曆系統: ${calendarId}`);
                return false;
            }

            // 1. 基本日期格式驗證
            if (year <= 0 || month <= 0 || day <= 0 || month > 12 || day > 31) {
                return false;
            }

            // 2. 嘗試創建該日曆系統的日期來驗證實際有效性
            let testDate: CalendarDate;

            if (calendarId === 'gregory') {
                // 西元曆直接驗證
                testDate = new CalendarDate(year, month, day);
            } else {
                // 其他日曆系統：直接在該日曆系統中創建日期
                const targetCalendar = this.createSafeCalendar(calendarId);
                testDate = new CalendarDate(targetCalendar, year, month, day);
            }
            // 3. 驗證創建的日期是否與輸入一致（防止無效日期被自動調整）
            // 這會自動處理：
            // - 年份範圍（如果年份超出日曆系統範圍，創建時會失敗）
            // - 閏年規則（如 2023/2/29 會被調整為 2023/3/1）
            // - 月份天數（如 4/31 會被調整為 5/1）
            const isConsistent = testDate.year === year &&
                testDate.month === month &&
                testDate.day === day;

            return isConsistent;

        } catch (error) {
            // 4. 如果日期創建失敗（例如年份超出範圍），則返回 false
            warn(`日期驗證失敗 ${year}-${month}-${day} in ${calendarId}:`, error);
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
    //     if (result.success && result.date) {
    //         // 如果是非西元曆且解析結果是西元日期，需要進行轉換
    //         if (calendar !== 'gregory' && result.calendarSystem === 'gregory') {
    //             // 將西元日期轉換為目標日曆系統的日期
    //             const gregorianDate = new CalendarDate(result.date.year, result.date.month, result.date.day);
    //             const targetCalendar = this.createSafeCalendar(calendar);
    //             const localDate = this.safeToCalendar(gregorianDate, targetCalendar);
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

    static isCalendarSupported(calendar: string | CalendarIdentifier): boolean {
        return isCalendarRegistered(calendar);
    }

    /**
     * 格式化輸出 - 統一執行順序：插件 → @internationalized/date → dayjs → 基本回退
     * 格式化含日曆系統的格式，如民國XX年XX月XX日 XX時XX分XX秒
     */
    static formatOutput(date: SimpleDateValue,
        // format: string,
        dateFormat: string = 'YYYY-MM-DD',
        timeFormat?: string,
        includeTime: boolean = false,
        calendar: string = 'gregory',
        locale: string = 'zh-TW'): string {
        if (!date) return '';
        let format: string;
        if (includeTime && timeFormat) {
            format = `${dateFormat} ${timeFormat}`;
        } else if (includeTime) {
            // 如果需要時間但沒有提供時間格式，使用默認
            format = `${dateFormat} HH:mm:ss`;
        } else {
            format = dateFormat;
        }
        try {
            // 1. 西元曆：直接走 dayjs
            if (calendar === 'gregory') {
                // 使用 dateUtils 的格式驗證
                if (!isValidFormatForDayjs(dateFormat, timeFormat)) {
                    const hasTime = date.hour !== undefined || date.minute !== undefined || date.second !== undefined;
                    format = hasTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
                }
                const jsDate = new Date(date.year, date.month - 1, date.day,
                    date.hour || 0, date.minute || 0, date.second || 0);
                return dayjs(jsDate).format(format);
            }

            // 2. 該曆法若有自訂文字 plugin（如 ROC 民國年）且支援此格式 → 委派 plugin
            const plugin = getCalendarDescriptor(calendar)?.plugin;
            if (plugin?.supportsFormat(format)) {
                return plugin.format(date, format, locale);
            }

            // 3. 嘗試使用 @internationalized/date 的 DateFormatter
            // 註：非西元/非 plugin 曆法輸出走 Intl 長格式（含曆法年號/月名等標記），此格式可被對應
            //     plugin 或標記辨識而正確 round-trip。曾試以「該曆法數字填入 dateFormat」(§6.5) 改善，
            //     但會產生與西元年同形的純數字（如 ROC '115-06-19'、佛曆 '2566/...'），re-parse 時
            //     被當成西元年 → round-trip 損壞（民國前1797 等）。要正確支援需「曆法感知數字 parser」
            //     （且 2566 無法區分佛曆/西元，本質歧義），故回退此設計，留待 2.0 後評估。
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

            // 4. 回退到 dayjs 格式化
            const jsDate = new Date(date.year, date.month - 1, date.day,
                date.hour || 0, date.minute || 0, date.second || 0);
            return dayjs(jsDate).format(format);

        } catch (error) {
            warn('所有格式化方法都失敗，使用基本回退:', error);

            // 5. 最基本的回退格式
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
    getCalendarRange,
    // getCalendarYearRange,

    // 顯示相關
    getMonthNames,
    getCalendarDisplayName,

    // 日曆系統輸出輸入轉換
    // isValidDate,
    // parseInput,
    isCalendarSupported,
    formatOutput,
} = CalendarUtils;
