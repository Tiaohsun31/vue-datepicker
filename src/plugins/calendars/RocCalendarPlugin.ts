// plugins/calendars/RocCalendarPlugin.ts - ROC 日曆插件
import { type CalendarPlugin, type CalendarConfig } from '@/types/calendarPlugin';
import { type SimpleDateValue } from '@/utils/dateUtils';
import { isLeapYear } from '@/utils/validationUtils';
import dayjs from 'dayjs';

/**
 * ROC（民國）日曆插件
 * 民國年 = 西元年 - 1911
 */
export class RocCalendarPlugin implements CalendarPlugin {
    readonly id = 'roc';

    readonly displayName = {
        'zh-TW': '民國曆',
        'zh-CN': '民国历',
        'en-US': 'ROC Calendar',
        'ja-JP': '中華民国暦'
    };

    readonly yearRange = {
        min: 1,    // 民國1年 (1912年)
        max: 200   // 民國200年 (2111年)
    };

    readonly placeholders = {
        'zh-TW': '民國年',
        'zh-CN': '民国年',
        'en-US': 'ROC Year',
        'ja-JP': '民国年'
    };

    private readonly YEAR_OFFSET = 1911;

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
     * 解析 ROC 日期字串
     * 支援格式：
     * - "113-05-20", "113/05/20", "113.05.20"
     * - "民國113年05月20日", "民國113-05-20"
     * - "ROC 113-05-20"
     */
    parseInput(input: string): SimpleDateValue | null {
        if (!input || typeof input !== 'string') return null;

        const trimmed = input.trim();

        // 移除常見的前綴
        const cleaned = trimmed
            .replace(/^(民國|民国|ROC\s*)/i, '')
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

        // 驗證 ROC 年份範圍
        if (year < this.yearRange.min || year > this.yearRange.max) return null;

        // 轉換為西元年
        const gregorianYear = year + this.YEAR_OFFSET;

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
     * 驗證西元曆日期在 ROC 系統中是否有效
     */
    isValid(date: SimpleDateValue): boolean {
        if (!date) return false;

        // 轉換為 ROC 年
        const rocYear = date.year - this.YEAR_OFFSET;

        // 檢查 ROC 年份範圍
        if (rocYear < this.yearRange.min || rocYear > this.yearRange.max) {
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
     * 格式化 ROC 日期
     */
    format(date: SimpleDateValue, format: string, locale: string): string {


        console.log('RocCalendarPlugin.format 被調用:', { date, format, locale });

        // 檢查是否為複合格式（包含時間部分）
        const parts = format.split(' ');
        const dateFormatPart = parts[0];
        const timeFormatPart = parts.slice(1).join(' ');

        console.log('格式分析:', { dateFormatPart, timeFormatPart });

        // 處理日期部分的 ROC 格式
        const formattedDate = this.formatDatePart(date, dateFormatPart, locale);

        // 如果有時間部分，處理時間格式
        if (timeFormatPart) {
            const formattedTime = this.formatTimePart(date, timeFormatPart);
            return `${formattedDate} ${formattedTime}`;
        }

        return formattedDate;
    }
    /**
     * 格式化日期部分
     */
    private formatDatePart(date: SimpleDateValue, format: string, locale: string): string {
        const rocYear = date.year - this.YEAR_OFFSET;
        const month = date.month;
        const day = date.day;

        // ROC 特定格式
        const rocFormats: Record<string, string> = {
            'ROC-YYYY': `民國${rocYear}年`,
            'ROC-YY': `民國${rocYear.toString().slice(-2)}年`,
            'ROC-YYYY-MM-DD': `民國${rocYear}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日`,
            'ROC-YY-MM-DD': `民國${rocYear.toString().slice(-2)}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日`,
            'ROC-NUM-YYYY-MM-DD': `${rocYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
            'ROC-NUM-YY-MM-DD': `${rocYear.toString().slice(-2)}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
            'ROC-YYYY/MM/DD': `民國${rocYear}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`,
        };

        if (rocFormats[format]) {
            console.log(`使用 ROC 格式 ${format}:`, rocFormats[format]);
            return rocFormats[format];
        }

        // 標準格式，替換年份
        const jsDate = new Date(date.year, date.month - 1, date.day);
        let formatted = dayjs(jsDate).format(format);

        // 將西元年替換為民國年
        if (format.includes('YYYY')) {
            formatted = formatted.replace(date.year.toString(), rocYear.toString());
        } else if (format.includes('YY')) {
            const shortYear = date.year.toString().slice(-2);
            const rocShortYear = rocYear.toString().slice(-2);
            formatted = formatted.replace(shortYear, rocShortYear);
        }

        console.log(`標準格式 ${format} 轉換結果:`, formatted);
        return formatted;
    }

    /**
     * 格式化時間部分
     */
    private formatTimePart(date: SimpleDateValue, timeFormat: string): string {
        const hour = date.hour || 0;
        const minute = date.minute || 0;
        const second = date.second || 0;

        // 使用 dayjs 格式化時間
        const jsDate = new Date(date.year, date.month - 1, date.day, hour, minute, second);
        return dayjs(jsDate).format(timeFormat);
    }
    /**
     * 西元曆轉 ROC 日曆
     */
    fromGregorian(gregorianDate: SimpleDateValue): SimpleDateValue {
        return {
            ...gregorianDate,
            year: gregorianDate.year - this.YEAR_OFFSET
        };
    }

    /**
     * ROC 日曆轉西元曆
     */
    toGregorian(rocDate: SimpleDateValue): SimpleDateValue {
        return {
            ...rocDate,
            year: rocDate.year + this.YEAR_OFFSET
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
 * 建立 ROC 日曆插件實例
 */
export function createRocCalendarPlugin(): CalendarPlugin {
    return new RocCalendarPlugin();
}
