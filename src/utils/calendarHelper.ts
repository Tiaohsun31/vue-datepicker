// utils/calendarHelper.ts
import {
    CalendarDate,
    createCalendar,
    toCalendar,
    parseDate,
    today,
    getLocalTimeZone,
    type Calendar
} from '@internationalized/date';
import dayjs from 'dayjs';
import { type SimpleDateValue } from './dateUtils';

export type SupportedCalendar = 'gregory' | 'roc' | 'buddhist' | 'japanese' | 'persian' | 'islamic' | 'hebrew' | 'indian' | 'chinese';

/**
 * 簡化的日曆輔助類 - 基於 @internationalized/date
 * 負責日曆轉換、輸入解析、輸出格式化
 */
export class SimpleCalendarHelper {
    private calendar: Calendar;
    private calendarId: SupportedCalendar;

    constructor(calendarId: SupportedCalendar = 'gregory') {
        this.calendarId = calendarId;
        try {
            this.calendar = createCalendar(calendarId);
        } catch (error) {
            console.warn(`Failed to create calendar: ${calendarId}, falling back to gregory`);
            this.calendarId = 'gregory';
            this.calendar = createCalendar('gregory');
        }
    }

    /**
     * 將 SimpleDateValue 轉換為 @internationalized/date 的 CalendarDate
     */
    toCalendarDate(date: SimpleDateValue): CalendarDate | null {
        try {
            // 先創建西元曆日期
            const gregorianDate = new CalendarDate(date.year, date.month, date.day);

            // 如果不是西元曆，轉換到目標日曆
            if (this.calendarId !== 'gregory') {
                return toCalendar(gregorianDate, this.calendar);
            }

            return gregorianDate;
        } catch (error) {
            console.error('Failed to create CalendarDate:', error);
            return null;
        }
    }

    /**
     * 從 @internationalized/date 的 CalendarDate 轉回 SimpleDateValue（西元曆）
     */
    fromCalendarDate(calendarDate: CalendarDate): SimpleDateValue {
        try {
            // 如果不是西元曆，先轉換為西元曆
            if (this.calendarId !== 'gregory') {
                const gregorianCalendar = createCalendar('gregory');
                const gregorianDate = toCalendar(calendarDate, gregorianCalendar);
                return {
                    year: gregorianDate.year,
                    month: gregorianDate.month,
                    day: gregorianDate.day
                };
            }

            return {
                year: calendarDate.year,
                month: calendarDate.month,
                day: calendarDate.day
            };
        } catch (error) {
            console.error('Failed to convert CalendarDate:', error);
            return {
                year: calendarDate.year,
                month: calendarDate.month,
                day: calendarDate.day
            };
        }
    }

    /**
     * 解析輸入 - 支援本土化格式和西元曆格式
     */
    parseInput(input: string): SimpleDateValue | null {
        if (!input || typeof input !== 'string') return null;

        const trimmedInput = input.trim();

        // 1. 處理民國年格式
        if (this.calendarId === 'roc' || trimmedInput.includes('民國')) {
            const result = this.parseRocInput(trimmedInput);
            if (result) return result;
        }

        // 2. 處理佛曆年格式
        if (this.calendarId === 'buddhist' || trimmedInput.includes('佛曆') || trimmedInput.includes('BE')) {
            const result = this.parseBuddhistInput(trimmedInput);
            if (result) return result;
        }

        // 3. 嘗試標準 ISO 格式解析
        const isoResult = this.parseIsoInput(trimmedInput);
        if (isoResult) return isoResult;

        // 4. 使用 dayjs 作為最後的回退
        return this.parseDayjsInput(trimmedInput);
    }

    /**
     * 解析民國年輸入
     */
    private parseRocInput(input: string): SimpleDateValue | null {
        // 支援格式：
        // "民國113年5月20日", "民國113-05-20", "113/05/20", "113-5-20"
        const patterns = [
            /(?:民國|ROC\.?\s*)?(\d{1,3})年\s*(\d{1,2})月\s*(\d{1,2})日/,
            /(?:民國|ROC\.?\s*)?(\d{1,3})[年\-\/](\d{1,2})[月\-\/](\d{1,2})日?/,
            /^(\d{1,3})[\/\-](\d{1,2})[\/\-](\d{1,2})$/
        ];

        for (const pattern of patterns) {
            const match = input.match(pattern);
            if (match) {
                const rocYear = parseInt(match[1]);
                const month = parseInt(match[2]);
                const day = parseInt(match[3]);

                // 驗證範圍
                if (rocYear >= 1 && rocYear <= 200 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                    return {
                        year: rocYear + 1911, // 轉換為西元年
                        month,
                        day
                    };
                }
            }
        }
        return null;
    }

    /**
     * 解析佛曆年輸入
     */
    private parseBuddhistInput(input: string): SimpleDateValue | null {
        // 支援格式：
        // "佛曆2567年5月20日", "BE 2567-05-20", "2567/05/20"
        const patterns = [
            /(?:佛曆|BE\.?\s*)?(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日/,
            /(?:佛曆|BE\.?\s*)?(\d{4})[年\-\/](\d{1,2})[月\-\/](\d{1,2})日?/,
        ];

        for (const pattern of patterns) {
            const match = input.match(pattern);
            if (match) {
                const buddhistYear = parseInt(match[1]);
                const month = parseInt(match[2]) || 1;
                const day = parseInt(match[3]) || 1;

                // 驗證範圍（佛曆年約 2400-2700）
                if (buddhistYear >= 2400 && buddhistYear <= 2700 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                    return {
                        year: buddhistYear - 543, // 轉換為西元年
                        month,
                        day
                    };
                }
            }
        }
        return null;
    }

    /**
     * 解析 ISO 格式輸入
     */
    private parseIsoInput(input: string): SimpleDateValue | null {
        try {
            const parsedDate = parseDate(input);
            return this.fromCalendarDate(parsedDate);
        } catch {
            return null;
        }
    }

    /**
     * 使用 dayjs 解析輸入
     */
    private parseDayjsInput(input: string): SimpleDateValue | null {
        try {
            const date = dayjs(input);
            if (date.isValid()) {
                return {
                    year: date.year(),
                    month: date.month() + 1,
                    day: date.date()
                };
            }
        } catch {
            // 忽略錯誤
        }
        return null;
    }

    /**
     * 格式化輸出 - 支援本土化顯示
     */
    formatOutput(date: SimpleDateValue, format: string = 'YYYY-MM-DD', locale: string = 'zh-TW'): string {
        try {
            // 根據日曆類型進行特殊格式化
            if (this.calendarId === 'roc') {
                return this.formatRocOutput(date, format);
            }

            if (this.calendarId === 'buddhist') {
                return this.formatBuddhistOutput(date, format);
            }

            if (this.calendarId === 'japanese') {
                return this.formatJapaneseOutput(date, format);
            }

            // 其他日曆使用 @internationalized/date 的能力
            const calendarDate = this.toCalendarDate(date);
            if (calendarDate) {
                // 如果是特殊格式，使用 @internationalized/date 的 toString()
                if (format === 'YYYY-MM-DD') {
                    return calendarDate.toString();
                }
            }

            // 預設使用 dayjs 格式化西元曆日期
            const jsDate = new Date(date.year, date.month - 1, date.day);
            return dayjs(jsDate).format(format);
        } catch (error) {
            console.error('Failed to format output:', error);
            // 回退到基本格式
            return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
        }
    }

    /**
     * 格式化民國年輸出
     */
    private formatRocOutput(date: SimpleDateValue, format: string): string {
        const rocYear = date.year - 1911;

        // 特殊的民國年格式
        const rocFormats: Record<string, string> = {
            'ROC-YYYY': `民國${rocYear}年`,
            'ROC-YY': `民國${rocYear.toString().slice(-2)}年`,
            'ROC-YYYY-MM-DD': `民國${rocYear}年${date.month}月${date.day}日`,
            'ROC-YYYY/MM/DD': `民國${rocYear}/${date.month.toString().padStart(2, '0')}/${date.day.toString().padStart(2, '0')}`,
            'ROC-YY-MM-DD': `${rocYear.toString().slice(-2)}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`
        };

        if (rocFormats[format]) {
            return rocFormats[format];
        }

        // 標準格式，替換年份
        if (format.includes('YYYY')) {
            return `民國${rocYear}年${date.month}月${date.day}日`;
        }

        return `民國${rocYear}年`;
    }

    /**
     * 格式化佛曆年輸出
     */
    private formatBuddhistOutput(date: SimpleDateValue, format: string): string {
        const buddhistYear = date.year + 543;

        // 特殊的佛曆格式
        const buddhistFormats: Record<string, string> = {
            'BUDDHIST-YYYY': `佛曆${buddhistYear}年`,
            'BE-YYYY': `BE ${buddhistYear}`,
            'BUDDHIST-YYYY-MM-DD': `佛曆${buddhistYear}年${date.month}月${date.day}日`,
            'BE-YYYY-MM-DD': `BE ${buddhistYear}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`
        };

        if (buddhistFormats[format]) {
            return buddhistFormats[format];
        }

        if (format.includes('YYYY')) {
            return `佛曆${buddhistYear}年${date.month}月${date.day}日`;
        }

        return `佛曆${buddhistYear}年`;
    }

    /**
     * 格式化日本年號輸出（簡化版）
     */
    private formatJapaneseOutput(date: SimpleDateValue, format: string): string {
        try {
            const calendarDate = this.toCalendarDate(date);
            if (calendarDate) {
                // 日本年號比較複雜，直接使用 @internationalized/date 的能力
                return calendarDate.toString();
            }
        } catch {
            // 回退到西元年
        }

        return `${date.year}年${date.month}月${date.day}日`;
    }

    /**
     * 取得今天的日期（在當前日曆系統中）
     */
    getToday(): CalendarDate {
        try {
            const todayDate = today(getLocalTimeZone());
            if (this.calendarId !== 'gregory') {
                return toCalendar(todayDate, this.calendar);
            }
            return todayDate;
        } catch (error) {
            console.error('Failed to get today:', error);
            // 回退到基本的今天
            const now = new Date();
            return new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
        }
    }

    /**
     * 切換日曆系統
     */
    setCalendar(calendarId: SupportedCalendar): boolean {
        try {
            const newCalendar = createCalendar(calendarId);
            this.calendarId = calendarId;
            this.calendar = newCalendar;
            return true;
        } catch (error) {
            console.warn(`Failed to set calendar: ${calendarId}`, error);
            return false;
        }
    }

    /**
     * 取得當前日曆 ID
     */
    getCurrentCalendar(): SupportedCalendar {
        return this.calendarId;
    }

    /**
     * 取得支援的日曆列表（根據地區過濾）
     */
    static getSupportedCalendars(locale: string = 'zh-TW'): Array<{ id: SupportedCalendar; name: string }> {
        const allCalendars = [
            { id: 'gregory' as const, name: '西元曆' },
            { id: 'roc' as const, name: '民國曆' },
            { id: 'buddhist' as const, name: '佛曆' },
            { id: 'japanese' as const, name: '日本年號' },
            { id: 'persian' as const, name: '波斯曆' },
            { id: 'islamic' as const, name: '伊斯蘭曆' },
            { id: 'hebrew' as const, name: '希伯來曆' },
            { id: 'indian' as const, name: '印度曆' },
            { id: 'chinese' as const, name: '中國農曆' }
        ];

        // 根據地區過濾常用的日曆
        if (locale.startsWith('zh-TW')) {
            return allCalendars.filter(cal => ['gregory', 'roc', 'buddhist', 'chinese'].includes(cal.id));
        } else if (locale.startsWith('zh-CN')) {
            return allCalendars.filter(cal => ['gregory', 'chinese'].includes(cal.id));
        } else if (locale.startsWith('ja')) {
            return allCalendars.filter(cal => ['gregory', 'japanese'].includes(cal.id));
        } else if (locale.startsWith('th')) {
            return allCalendars.filter(cal => ['gregory', 'buddhist'].includes(cal.id));
        } else if (locale.startsWith('fa') || locale.startsWith('ir')) {
            return allCalendars.filter(cal => ['gregory', 'persian'].includes(cal.id));
        } else if (locale.startsWith('ar') || locale.startsWith('ur')) {
            return allCalendars.filter(cal => ['gregory', 'islamic'].includes(cal.id));
        } else if (locale.startsWith('he')) {
            return allCalendars.filter(cal => ['gregory', 'hebrew'].includes(cal.id));
        }

        // 預設返回常用的幾種
        return allCalendars.filter(cal => ['gregory', 'roc', 'buddhist', 'islamic'].includes(cal.id));
    }

    /**
     * 驗證日期在當前日曆系統中是否有效
     */
    isValidDate(date: SimpleDateValue): boolean {
        try {
            const calendarDate = this.toCalendarDate(date);
            return calendarDate !== null;
        } catch {
            return false;
        }
    }
}
