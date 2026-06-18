// utils/dateParsingUtils.ts - 主要的輸入解析工具（支援多日曆系統）
import { getCalendarDescriptor } from '../plugins/calendars/registry';
import { warn } from './logger';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { SimpleDateValue } from './dateUtils';

dayjs.extend(customParseFormat);

export interface DateParseResult {
    success: boolean;
    date: SimpleDateValue | null;
    format: string | null;
    confidence: number;
    calendarSystem?: string;
}

/**
 * 簡化的格式優先級（只保留主要地區）
 */
const LOCALE_FORMATS: Record<string, string[]> = {
    'en-US': ['MM/DD/YYYY', 'M/D/YYYY'],
    'en-GB': ['DD/MM/YYYY', 'D/M/YYYY'],
    'zh-TW': ['YYYY-MM-DD', 'YYYY/MM/DD'],
    'zh-CN': ['YYYY-MM-DD', 'YYYY/MM/DD'],
};

const UNIVERSAL_FORMATS = [
    'YYYY-MM-DD', 'YYYY/MM/DD', 'DD/MM/YYYY', 'MM/DD/YYYY',
    'DD-MM-YYYY', 'MM-DD-YYYY', 'YY-MM-DD', 'YY/MM/DD'
];

/**
 * 智能日期解析器
 */
export class SmartDateParser {
    private locale: string;
    private calendar: string;
    private preferredFormats: string[];

    constructor(locale: string = 'zh-TW', calendar: string = 'gregory') {
        this.locale = locale;
        this.calendar = calendar;
        this.preferredFormats = [
            ...(LOCALE_FORMATS[locale] || []),
            ...UNIVERSAL_FORMATS
        ];
    }

    parse(input: string): DateParseResult {
        if (!input || typeof input !== 'string') {
            return { success: false, date: null, format: null, confidence: 0 };
        }

        const trimmed = input.trim();

        try {
            // 1. 嘗試專用插件
            const pluginResult = this.tryParseWithPlugins(trimmed);
            if (pluginResult.success) return pluginResult;

            // 2. 嘗試優先格式
            for (const format of this.preferredFormats) {
                const result = this.tryParseWithFormat(trimmed, format);
                if (result.success) {
                    return { ...result, confidence: 0.9 };
                }
            }

            // 3. 後備解析
            return this.fallbackParse(trimmed);

        } catch (error) {
            warn('日期解析失敗:', error);
            return { success: false, date: null, format: null, confidence: 0 };
        }
    }

    private tryParseWithPlugins(input: string): DateParseResult {
        // 查 registry：當前曆法若有自訂文字 plugin（如 ROC 民國年）就委派解析。
        // 注意：使用者已「明確」選定此曆法（calendar prop），故直接呼叫 plugin.parseInput，
        // 不再以 canParseInput（要求民國/ROC 前綴）當 gate —— 這正是 §5.5#9 / Phase 6.8 的修正：
        // ROC 模式下無前綴的純數字（如 '114-06-18'）也應被當成民國年解析。
        // 非該曆法格式的輸入（如 ROC 模式打 '2023-12-25'）plugin 會回傳 null，再回退一般解析。
        const plugin = getCalendarDescriptor(this.calendar)?.plugin;
        if (plugin) {
            const result = plugin.parseInput(input, this.locale);
            if (result) {
                return {
                    success: true, date: result, format: `${this.calendar}-plugin`,
                    confidence: 0.95, calendarSystem: this.calendar
                };
            }
        }
        return { success: false, date: null, format: null, confidence: 0 };
    }

    private tryParseWithFormat(input: string, format: string): DateParseResult {
        try {
            const parsed = dayjs(input, format, true);
            if (parsed.isValid()) {
                return {
                    success: true,
                    date: {
                        year: parsed.year(),
                        month: parsed.month() + 1,
                        day: parsed.date(),
                        hour: parsed.hour() || 0,
                        minute: parsed.minute() || 0,
                        second: parsed.second() || 0
                    },
                    format,
                    confidence: 1.0,
                    calendarSystem: 'gregory'
                };
            }
        } catch (error) {
            // 解析失敗
        }
        return { success: false, date: null, format: null, confidence: 0 };
    }

    private fallbackParse(input: string): DateParseResult {
        try {
            const parsed = dayjs(input);
            if (parsed.isValid()) {
                return {
                    success: true,
                    date: {
                        year: parsed.year(),
                        month: parsed.month() + 1,
                        day: parsed.date(),
                        hour: parsed.hour() || 0,
                        minute: parsed.minute() || 0,
                        second: parsed.second() || 0
                    },
                    format: 'auto-detected',
                    confidence: 0.6,
                    calendarSystem: 'gregory'
                };
            }
        } catch (error) {
            // 完全解析失敗
        }
        return { success: false, date: null, format: null, confidence: 0 };
    }

    setLocale(locale: string): void {
        this.locale = locale;
        this.preferredFormats = [
            ...(LOCALE_FORMATS[locale] || []),
            ...UNIVERSAL_FORMATS
        ];
    }

    setCalendar(calendar: string): void {
        this.calendar = calendar;
    }
}

/**
 * 便利函數：解析日期字符串
 *
 * 無狀態：每次以指定 locale/calendar 建立一個 SmartDateParser 解析，
 * 避免先前「全域單例 + setLocale/setCalendar 就地改狀態」在多實例/不同 locale 下的競態（Phase 6.2）。
 * SmartDateParser 建構成本極低（僅組合 preferredFormats 陣列）。
 */
export function parseUserDateInput(
    input: string,
    locale: string = 'zh-TW',
    calendar: string = 'gregory'
): DateParseResult {
    return new SmartDateParser(locale, calendar).parse(input);
}
