// plugins/calendars/RocFormatPlugin.ts  ROC 格式化插件
import { type CalendarPlugin } from '@/types/calendarPlugin';
import { type SimpleDateValue } from '@/utils/dateUtils';
import dayjs from 'dayjs';

/**
 * 民國曆格式化插件 - 專注於自定義格式輸出
 * 只處理 @internationalized/date 無法處理的特殊格式
 */
class RocFormatPlugin implements CalendarPlugin {
    readonly id = 'roc';

    readonly yearRange = {
        min: 1,    // 民國1年 (1912年)
        max: 200   // 民國200年 (2111年)
    };

    readonly displayName = {
        'zh-TW': '民國曆',
        'zh-CN': '民国历',
        'en-US': 'ROC Calendar',
        'ja-JP': '中華民国暦',
        'ko-KR': '중화민국력'
    };

    private readonly YEAR_OFFSET = 1911;

    parseInput(input: string, locale: string): SimpleDateValue | null {
        if (!input || typeof input !== 'string') return null;

        const trimmed = input.trim();

        // 移除常見的前綴後綴，但保留時間相關字元
        const cleaned = trimmed
            .replace(/^(民國|民国|ROC\s*)/i, '')
            .trim();

        // 檢查是否包含時間部分
        const hasTime = /[上下]午|時|分|秒|\d{1,2}:\d{2}/.test(cleaned);

        if (hasTime) {
            return this.parseDateTime(cleaned);
        } else {
            // 當沒有時間時，直接嘗試解析日期部分
            // 首先檢查是否為中文日期格式（如：114年06月18日）
            if (/\d+年\d+月\d+日/.test(cleaned)) {
                return this.parseDatePart(cleaned);
            }

            // 如果不是中文格式，嘗試用分隔符解析
            const dateOnly = cleaned.replace(/[年月日時分秒]/g, '');
            const separators = ['-', '/', '.', ' '];
            for (const sep of separators) {
                const result = this.tryParseWithSeparator(dateOnly, sep);
                if (result) return result;
            }
        }

        return null;
    }

    /**
     * 解析包含日期和時間的字串
     */
    private parseDateTime(input: string): SimpleDateValue | null {
        // 分割日期和時間部分
        // 處理格式如: "114年06月18日 上午 12時00分"
        const dateTimeMatch = input.match(/^(\d+年\d+月\d+日)\s*(.*)$/);
        if (!dateTimeMatch) return null;

        const [, datePart, timePart] = dateTimeMatch;

        // 解析日期部分
        const dateResult = this.parseDatePart(datePart);
        if (!dateResult) return null;

        // 解析時間部分
        const timeResult = this.parseTimePart(timePart);
        if (!timeResult) return dateResult; // 如果時間解析失敗，至少返回日期

        // 合併日期和時間
        return {
            ...dateResult,
            ...timeResult
        };
    }

    /**
     * 解析日期部分 (如: "114年06月18日")
     * 統一轉換為公元曆
     */
    private parseDatePart(datePart: string): SimpleDateValue | null {
        const dateMatch = datePart.match(/(\d+)年(\d+)月(\d+)日/);
        if (!dateMatch) return null;

        const [, yearStr, monthStr, dayStr] = dateMatch;
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        const day = parseInt(dayStr);

        if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

        // 驗證 ROC 年份範圍
        if (year < this.yearRange.min || year > this.yearRange.max) return null;

        // 轉換為西元年
        const gregorianYear = year + this.YEAR_OFFSET;

        // 基本驗證
        if (month < 1 || month > 12 || day < 1 || day > 31) return null;

        // 使用 dayjs 驗證日期有效性
        const jsDate = dayjs(`${gregorianYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        if (!jsDate.isValid()) return null;

        return {
            year: gregorianYear,
            month,
            day
        };
    }

    /**
     * 解析時間部分 (如: "上午 12時00分")
     */
    private parseTimePart(timePart: string): Partial<SimpleDateValue> | null {
        if (!timePart) return null;

        const trimmedTime = timePart.trim();

        // 處理中文時間格式: "上午 12時00分" 或 "下午 12時00分"
        const chineseTimeMatch = trimmedTime.match(/(上午|下午)\s*(\d{1,2})時(\d{2})分(?:(\d{2})秒)?/);
        if (chineseTimeMatch) {
            const [, period, hourStr, minuteStr, secondStr] = chineseTimeMatch;
            let hour = parseInt(hourStr);
            const minute = parseInt(minuteStr);
            const second = secondStr ? parseInt(secondStr) : 0;

            // 轉換 12 小時制到 24 小時制
            if (period === '下午' && hour !== 12) {
                hour += 12;
            } else if (period === '上午' && hour === 12) {
                hour = 0;
            }

            // 驗證時間範圍
            if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
                return null;
            }
            return { hour, minute, second };
        }

        // 處理 24 小時制格式: "14:30:00" 或 "14:30"
        const standardTimeMatch = trimmedTime.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
        if (standardTimeMatch) {
            const [, hourStr, minuteStr, secondStr] = standardTimeMatch;
            const hour = parseInt(hourStr);
            const minute = parseInt(minuteStr);
            const second = secondStr ? parseInt(secondStr) : 0;

            // 驗證時間範圍
            if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
                return null;
            }

            return { hour, minute, second };
        }

        return null;
    }

    canParseInput(input: string): boolean {
        // 檢查是否包含民國相關關鍵字
        return /^(民國|民国|ROC\s*)/i.test(input.trim());
    }

    /**
     * 使用指定分隔符解析
     */
    private tryParseWithSeparator(input: string, separator: string): SimpleDateValue | null {
        const parts = input.split(separator).map(p => p.trim()).filter(Boolean);
        console.log('使用分隔符解析:', { input, separator, parts });

        if (parts.length < 3) return null;

        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);

        console.log('解析日期部分:', { year, month, day });

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
     * 檢查是否支援特定格式
     */
    supportsFormat(format: string): boolean {
        // 支援包含 ROC- 前綴的格式
        return format.includes('ROC-') || format.includes('民國');
    }

    /**
     * 自定義格式化 - 專注於民國年的特殊格式
     */
    format(date: SimpleDateValue, format: string, locale: string): string {
        if (!this.supportsFormat(format)) {
            throw new Error(`RocFormatPlugin 不支援格式: ${format}`);
        }
        // 檢查是否為複合格式（包含時間部分）
        const parts = format.split(' ');
        const dateFormatPart = parts[0];
        const timeFormatPart = parts.slice(1).join(' ');

        // 處理日期部分的 ROC 格式
        const formattedDate = this.formatDatePart(date, dateFormatPart, locale);

        // 如果有時間部分，處理時間格式
        if (timeFormatPart) {
            // 透過 format 字串判斷是否使用 24 小時制
            const use24Hour = this.detectTimeFormat(timeFormatPart);
            const formattedTime = this.formatTimePart(date, timeFormatPart, use24Hour);
            return `${formattedDate} ${formattedTime}`;
        }

        return formattedDate;
    }

    /**
     * 透過格式字串偵測時間制式
     */
    private detectTimeFormat(timeFormat: string): boolean {
        return !timeFormat.includes('A') && !timeFormat.includes('a') && !timeFormat.includes('hh');
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
        return formatted;
    }

    /**
     * 格式化 ROC 時間
     */
    private formatTimePart(date: SimpleDateValue, format: string, use24Hour: boolean): string {
        if (!date) return '';

        const hour = date.hour || 0;
        const minute = date.minute || 0;
        const second = date.second || 0;

        // 統一的格式化邏輯
        const formatResult = this.getFormattedTime(hour, minute, second, format, use24Hour);
        if (formatResult) return formatResult;

        // 回退到 dayjs 處理
        return this.fallbackToDateJs(date, format, use24Hour);
    }

    /**
     * 統一的時間格式化處理
     */
    private getFormattedTime(hour: number, minute: number, second: number, format: string, use24Hour: boolean): string | null {
        // 24小時制格式
        if (use24Hour) {
            const formats24: Record<string, () => string> = {
                'HH:mm:ss': () => this.formatBasicTime(hour, minute, second, true),
                'HH:mm': () => this.formatBasicTime(hour, minute, 0, false),
                'HH時mm分ss秒': () => this.formatChineseTime(hour, minute, second, true),
                'HH時mm分': () => this.formatChineseTime(hour, minute, 0, false),
            };

            if (formats24[format]) {
                return formats24[format]();
            }
        } else {
            // 12小時制格式
            const formats12: Record<string, () => string> = {
                'hh:mm:ss A': () => this.format12HourTime(hour, minute, second, true, 'suffix'),
                'hh:mm A': () => this.format12HourTime(hour, minute, 0, false, 'suffix'),
                'h:mm A': () => this.format12HourTime(hour, minute, 0, false, 'suffix', false),
                'A hh:mm:ss': () => this.format12HourTime(hour, minute, second, true, 'prefix'),
                'A hh:mm': () => this.format12HourTime(hour, minute, 0, false, 'prefix'),
                'A HH時mm分ss秒': () => this.format12HourTime(hour, minute, second, true, 'chinese'),
                'A HH時mm分': () => this.format12HourTime(hour, minute, 0, false, 'chinese'),
            };

            if (formats12[format]) {
                return formats12[format]();
            }
        }

        return null;
    }

    /**
     * 基本時間格式化（24小時制）
     */
    private formatBasicTime(hour: number, minute: number, second: number, showSeconds: boolean): string {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');

        if (showSeconds) {
            const secondStr = second.toString().padStart(2, '0');
            return `${hourStr}:${minuteStr}:${secondStr}`;
        }

        return `${hourStr}:${minuteStr}`;
    }

    /**
     * 中文時間格式化（24小時制）
     */
    private formatChineseTime(hour: number, minute: number, second: number, showSeconds: boolean): string {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');

        if (showSeconds) {
            const secondStr = second.toString().padStart(2, '0');
            return `${hourStr}時${minuteStr}分${secondStr}秒`;
        }

        return `${hourStr}時${minuteStr}分`;
    }

    /**
     * 12小時制時間格式化（統一處理）
     */
    private format12HourTime(
        hour: number,
        minute: number,
        second: number,
        showSeconds: boolean,
        style: 'suffix' | 'prefix' | 'chinese',
        padHour: boolean = true
    ): string {
        const period = hour < 12 ? '上午' : '下午';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const hourStr = padHour ? displayHour.toString().padStart(2, '0') : displayHour.toString();
        const minuteStr = minute.toString().padStart(2, '0');
        const secondStr = showSeconds ? second.toString().padStart(2, '0') : '';

        switch (style) {
            case 'suffix':
                return showSeconds
                    ? `${hourStr}:${minuteStr}:${secondStr} ${period}`
                    : `${hourStr}:${minuteStr} ${period}`;

            case 'prefix':
                return showSeconds
                    ? `${period} ${hourStr}:${minuteStr}:${secondStr}`
                    : `${period} ${hourStr}:${minuteStr}`;

            case 'chinese':
                return showSeconds
                    ? `${period} ${hourStr}時${minuteStr}分${secondStr}秒`
                    : `${period} ${hourStr}時${minuteStr}分`;

            default:
                return '';
        }
    }

    /**
    * 回退到 dayjs 處理
    */
    private fallbackToDateJs(date: SimpleDateValue, format: string, use24Hour: boolean): string {
        const jsDate = new Date(
            date.year,
            date.month - 1,
            date.day,
            date.hour || 0,
            date.minute || 0,
            date.second || 0
        );

        if (!jsDate || isNaN(jsDate.getTime())) return '';

        let formatted = dayjs(jsDate).format(format);

        // 本地化 AM/PM
        if (!use24Hour && (format.includes('A') || format.includes('a'))) {
            formatted = formatted.replace(/AM/g, '上午').replace(/PM/g, '下午');
            formatted = formatted.replace(/am/g, '上午').replace(/pm/g, '下午');
        }

        return formatted;
    }
}

// // 建立插件實例並導出
// const rocFormatPlugin = new RocFormatPlugin();

// // 導出函數版本
// export function createRocFormatPlugin(): CalendarPlugin {
//     return rocFormatPlugin;
// }

// 同時導出類別，以防需要創建多個實例
export { RocFormatPlugin };
