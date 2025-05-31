// plugins/calendars/BuddhistCalendarPlugin.ts - Buddhist 日曆插件
import { type CalendarPlugin, type CalendarConfig } from '@/types/calendarPlugin';
import { type SimpleDateValue } from '@/utils/dateUtils';
import { isLeapYear } from '@/utils/validationUtils';
import dayjs from 'dayjs';

/**
 * Buddhist（佛曆）日曆插件
 * 佛曆年 = 西元年 + 543
 */
export class BuddhistCalendarPlugin implements CalendarPlugin {
    readonly id = 'buddhist';

    readonly displayName = {
        'zh-TW': '佛曆',
        'zh-CN': '佛历',
        'en-US': 'Buddhist Calendar',
        'ja-JP': '仏暦',
        'th-TH': 'พุทธศักราช'
    };

    readonly yearRange = {
        min: 2400,  // 對應西元 1857年
        max: 2700   // 對應西元 2157年
    };

    readonly placeholders = {
        'zh-TW': '佛曆年',
        'zh-CN': '佛历年',
        'en-US': 'Buddhist Year',
        'ja-JP': '仏暦年',
        'th-TH': 'ปีพุทธศักราช'
    };

    private readonly YEAR_OFFSET = 543;

    /**
     * 取得日曆配置
     */
    getConfig(): CalendarConfig {
        return {
            id: this.id,
            displayName: this.displayName,
            yearRange: this.yearRange,
            placeholders: this.placeholders,
            isBuiltIn: false
        };
    }

    /**
     * 解析 Buddhist 日期字串
     * 支援格式：
     * - "2567-05-20", "2567/05/20", "2567.05.20"
     * - "佛曆2567年05月20日", "佛曆2567-05-20"
     * - "BE 2567-05-20", "B.E. 2567-05-20"
     * - "พ.ศ. 2567-05-20"
     */
    parseInput(input: string): SimpleDateValue | null {
        if (!input || typeof input !== 'string') return null;

        const trimmed = input.trim();

        // 移除常見的前綴
        const cleaned = trimmed
            .replace(/^(佛曆|佛历|BE\.?\s*|B\.E\.\s*|พ\.ศ\.\s*)/i, '')
            .replace(/[年月日]/g, '')
            .trim();

        // 嘗試各種分隔符
        const separators = ['-', '/', '.', ' '];
        for (const sep of separators) {
            const result = this.tryParseWithSeparator(cleaned, sep);
            if (result) return result;
        }

        return null;
    }

    /**
     * 使用指定分隔符解析
     */
    private tryParseWithSeparator(input: string, separator: string): SimpleDateValue | null {
        const parts = input.split(separator).map(p => p.trim()).filter(Boolean);

        if (parts.length < 3) return null;

        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

        // 驗證佛曆年份範圍
        if (year < this.yearRange.min || year > this.yearRange.max) return null;

        // 轉換為西元年
        const gregorianYear = year - this.YEAR_OFFSET;

        // 基本驗證
        if (month < 1 || month > 12 || day < 1 || day > 31) return null;

        // 建立西元曆日期進行進一步驗證
        const gregorianDate: SimpleDateValue = {
            year: gregorianYear,
            month,
            day
        };

        // 使用 dayjs 驗證日期有效性
        const jsDate = dayjs(`${gregorianYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        if (!jsDate.isValid()) return null;

        return gregorianDate;
    }

    /**
     * 驗證西元曆日期在 Buddhist 系統中是否有效
     */
    isValid(date: SimpleDateValue): boolean {
        if (!date) return false;

        // 轉換為佛曆年
        const buddhistYear = date.year + this.YEAR_OFFSET;

        // 檢查佛曆年份範圍
        if (buddhistYear < this.yearRange.min || buddhistYear > this.yearRange.max) {
            return false;
        }

        // 檢查月份
        if (date.month < 1 || date.month > 12) return false;

        // 檢查日期
        if (date.day < 1 || date.day > 31) return false;

        // 檢查該月實際天數
        const daysInMonth = this.getDaysInMonth(date.year, date.month);
        if (date.day > daysInMonth) return false;

        return true;
    }

    /**
     * 格式化 Buddhist 日期
     */
    format(date: SimpleDateValue, format: string, locale: string): string {
        const buddhistDate = this.fromGregorian(date);

        // Buddhist 特有格式
        const buddhistFormats: Record<string, string> = {
            'BUDDHIST-YYYY': `佛曆${buddhistDate.year}年`,
            'BE-YYYY': `BE ${buddhistDate.year}`,
            'B.E.-YYYY': `B.E. ${buddhistDate.year}`,
            'BUDDHIST-YYYY-MM-DD': `佛曆${buddhistDate.year}年${buddhistDate.month.toString().padStart(2, '0')}月${buddhistDate.day.toString().padStart(2, '0')}日`,
            'BE-YYYY-MM-DD': `BE ${buddhistDate.year}-${buddhistDate.month.toString().padStart(2, '0')}-${buddhistDate.day.toString().padStart(2, '0')}`,
            'TH-YYYY-MM-DD': `พ.ศ. ${buddhistDate.year}-${buddhistDate.month.toString().padStart(2, '0')}-${buddhistDate.day.toString().padStart(2, '0')}`,
        };

        if (buddhistFormats[format]) {
            return buddhistFormats[format];
        }

        // 根據 locale 選擇適當的格式
        if (locale.startsWith('th')) {
            // 泰語格式
            return `พ.ศ. ${buddhistDate.year}-${buddhistDate.month.toString().padStart(2, '0')}-${buddhistDate.day.toString().padStart(2, '0')}`;
        }

        // 標準格式，替換年份
        const jsDate = new Date(date.year, date.month - 1, date.day);
        let formatted = dayjs(jsDate).format(format);

        // 將西元年替換為佛曆年
        if (format.includes('YYYY')) {
            formatted = formatted.replace(date.year.toString(), buddhistDate.year.toString());
        } else if (format.includes('YY')) {
            const gregorianYearShort = date.year.toString().slice(-2);
            const buddhistYearShort = buddhistDate.year.toString().slice(-2);
            formatted = formatted.replace(gregorianYearShort, buddhistYearShort);
        }

        return formatted;
    }

    /**
     * 西元曆轉佛曆
     */
    fromGregorian(gregorianDate: SimpleDateValue): SimpleDateValue {
        return {
            ...gregorianDate,
            year: gregorianDate.year + this.YEAR_OFFSET
        };
    }

    /**
     * 佛曆轉西元曆
     */
    toGregorian(buddhistDate: SimpleDateValue): SimpleDateValue {
        return {
            ...buddhistDate,
            year: buddhistDate.year - this.YEAR_OFFSET
        };
    }

    /**
     * 取得指定年月的天數
     */
    private getDaysInMonth(gregorianYear: number, month: number): number {
        const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (month === 2) {
            return isLeapYear(gregorianYear) ? 29 : 28;
        }

        return daysInMonth[month];
    }
}

/**
 * 建立 Buddhist 日曆插件實例
 */
export function createBuddhistCalendarPlugin(): CalendarPlugin {
    return new BuddhistCalendarPlugin();
}
