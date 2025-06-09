// utils/dateParsingUtils.ts - 主要的輸入解析工具（支援多日曆系統）
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createRocFormatPlugin } from '@/plugins/calendars/RocFormatPlugin';

dayjs.extend(customParseFormat);

const rocPlugin = createRocFormatPlugin();

export interface DateParseResult {
    success: boolean;
    date: { year: number; month: number; day: number } | null;
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
            console.warn('日期解析失敗:', error);
            return { success: false, date: null, format: null, confidence: 0 };
        }
    }

    private tryParseWithPlugins(input: string): DateParseResult {
        switch (this.calendar) {
            case 'roc':
                if (rocPlugin.canParseInput(input)) {
                    const result = rocPlugin.parseInput(input, this.locale);
                    if (result) {
                        return {
                            success: true, date: result, format: 'roc-plugin',
                            confidence: 0.95, calendarSystem: 'roc'
                        };
                    }
                }
                break;
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
                        day: parsed.date()
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
                        day: parsed.date()
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

// 全域解析器實例
const globalParser = new SmartDateParser();

/**
 * 便利函數：解析日期字符串
 */
export function parseUserDateInput(
    input: string,
    locale: string = 'zh-TW',
    calendar: string = 'gregory'
): DateParseResult {
    if (locale !== globalParser['locale']) {
        globalParser.setLocale(locale);
    }
    if (calendar !== globalParser['calendar']) {
        globalParser.setCalendar(calendar);
    }
    return globalParser.parse(input);
}
