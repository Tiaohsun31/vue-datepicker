// utils/dateParsingUtils.ts - 專門處理日期解析的工具（支援多日曆系統）

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
    CalendarDate,
    GregorianCalendar,
    createCalendar,
    toCalendar
} from '@internationalized/date';
import { CalendarUtils } from './calendarUtils';
import { createRocFormatPlugin } from '@/plugins/calendars/RocFormatPlugin';

dayjs.extend(customParseFormat);

const rocPlugin = createRocFormatPlugin();

export interface DateParseResult {
    success: boolean;
    date: { year: number; month: number; day: number } | null;
    format: string | null;
    confidence: number; // 0-1，解析可信度
    calendarSystem?: string; // 檢測到的日曆系統
}

/**
 * 基於地區的日期格式優先級
 */
const LOCALE_FORMAT_PRIORITY: Record<string, string[]> = {
    // 美國：月/日/年
    'en-US': [
        'MM/DD/YYYY', 'M/D/YYYY', 'MM-DD-YYYY', 'M-D-YYYY',
        'MM/DD/YY', 'M/D/YY', 'MM-DD-YY', 'M-D-YY'
    ],

    // 英國和歐洲：日/月/年
    'en-GB': [
        'DD/MM/YYYY', 'D/M/YYYY', 'DD-MM-YYYY', 'D-M-YYYY',
        'DD/MM/YY', 'D/M/YY', 'DD-MM-YY', 'D-M-YY'
    ],
    'en-AU': [
        'DD/MM/YYYY', 'D/M/YYYY', 'DD-MM-YYYY', 'D-M-YYYY',
        'DD/MM/YY', 'D/M/YY', 'DD-MM-YY', 'D-M-YY'
    ],

    // 亞洲：年-月-日
    'zh-TW': [
        'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD',
        'YY-MM-DD', 'YY/MM/DD', 'DD/MM/YYYY', 'D/M/YYYY'
    ],
    'zh-CN': [
        'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD',
        'YY-MM-DD', 'YY/MM/DD', 'DD/MM/YYYY', 'D/M/YYYY'
    ],
    'ja-JP': [
        'YYYY-MM-DD', 'YYYY/MM/DD', 'DD/MM/YYYY', 'D/M/YYYY'
    ],
    'ko-KR': [
        'YYYY-MM-DD', 'YYYY/MM/DD', 'DD/MM/YYYY', 'D/M/YYYY'
    ]
};

/**
 * 通用格式（作為後備）
 */
const UNIVERSAL_FORMATS = [
    'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD',
    'DD/MM/YYYY', 'DD-MM-YYYY', 'DD.MM.YYYY',
    'MM/DD/YYYY', 'MM-DD-YYYY', 'MM.DD.YYYY',
    'D/M/YYYY', 'D-M-YYYY', 'M/D/YYYY', 'M-D-YYYY',
    'YY-MM-DD', 'YY/MM/DD', 'DD/MM/YY', 'MM/DD/YY'
];

/**
 * 智能日期解析器 - 支援多種日曆系統
 */
export class SmartDateParser {
    private locale: string;
    private preferredFormats: string[];
    private calendar: string;

    constructor(locale: string = 'zh-TW', calendar: string = 'gregory') {
        this.locale = locale;
        this.calendar = calendar;
        this.preferredFormats = this.getFormatsForLocale(locale);
    }

    /**
     * 根據地區獲取格式優先級
     */
    private getFormatsForLocale(locale: string): string[] {
        const formats = LOCALE_FORMAT_PRIORITY[locale];
        if (formats) {
            return [...formats, ...UNIVERSAL_FORMATS];
        }

        // 根據語言系列推斷
        if (locale.startsWith('en-')) {
            if (locale === 'en-US') {
                return [...LOCALE_FORMAT_PRIORITY['en-US'], ...UNIVERSAL_FORMATS];
            } else {
                return [...LOCALE_FORMAT_PRIORITY['en-GB'], ...UNIVERSAL_FORMATS];
            }
        }

        if (locale.startsWith('zh-')) {
            return [...LOCALE_FORMAT_PRIORITY['zh-TW'], ...UNIVERSAL_FORMATS];
        }

        // 預設使用通用格式
        return UNIVERSAL_FORMATS;
    }

    /**
     * 解析日期字符串 - 增強版，支援多日曆系統
     */
    parse(input: string): DateParseResult {
        if (!input || typeof input !== 'string') {
            return { success: false, date: null, format: null, confidence: 0 };
        }

        const trimmed = input.trim();

        try {
            // 1. 優先嘗試專用插件解析
            const pluginResult = this.tryParseWithPlugins(trimmed);
            if (pluginResult.success) {
                return pluginResult;
            }

            // 2. 嘗試使用 @internationalized/date 解析
            const intlResult = this.tryParseWithInternationalizedDate(trimmed);
            if (intlResult.success) {
                return intlResult;
            }

            // 3. 先嘗試優先格式
            for (const format of this.preferredFormats) {
                const result = this.tryParseWithFormat(trimmed, format);
                if (result.success) {
                    return {
                        ...result,
                        confidence: this.calculateConfidence(trimmed, format, true)
                    };
                }
            }

            // 4. 嘗試 dayjs 的自動解析作為後備
            const fallbackResult = this.fallbackParse(trimmed);
            if (fallbackResult.success) {
                return {
                    ...fallbackResult,
                    confidence: 0.5 // 較低的可信度
                };
            }

            return { success: false, date: null, format: null, confidence: 0 };

        } catch (error) {
            console.warn('日期解析失敗:', error);
            return { success: false, date: null, format: null, confidence: 0 };
        }
    }

    /**
     * 嘗試使用專用插件解析
     */
    private tryParseWithPlugins(input: string): DateParseResult {
        try {
            switch (this.calendar) {
                case 'roc':
                    if (rocPlugin.canParseInput(input)) {
                        const result = rocPlugin.parseInput(input, this.locale);
                        if (result) {
                            return {
                                success: true,
                                date: result,
                                format: 'roc-plugin',
                                confidence: 0.95,
                                calendarSystem: 'roc'
                            };
                        }
                    }
                    break;
                // 其他日曆插件可以在這裡添加
            }

            return { success: false, date: null, format: null, confidence: 0 };
        } catch (error) {
            return { success: false, date: null, format: null, confidence: 0 };
        }
    }

    /**
     * 使用 @internationalized/date 解析不同日曆系統的日期
     */
    private tryParseWithInternationalizedDate(input: string): DateParseResult {
        try {
            // 1. 首先嘗試標準的日期格式模式
            const datePatterns = [
                // 年-月-日 格式
                /^(\d{1,4})[年\-\/](\d{1,2})[月\-\/](\d{1,2})[日]?$/,
                // 年/月/日 格式
                /^(\d{1,4})\/(\d{1,2})\/(\d{1,2})$/,
                // 年-月-日 格式
                /^(\d{1,4})-(\d{1,2})-(\d{1,2})$/,
                // 月/日/年 格式（美式）
                /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
                // 日/月/年 格式（歐式）
                /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
            ];

            for (const pattern of datePatterns) {
                const match = input.match(pattern);
                if (match) {
                    let year: number, month: number, day: number;

                    // 根據不同的模式解析
                    if (pattern.source.includes('年') || pattern.source.includes('-') || pattern.source === datePatterns[1].source) {
                        // 年-月-日 或 年/月/日 格式
                        year = parseInt(match[1]);
                        month = parseInt(match[2]);
                        day = parseInt(match[3]);
                    } else if (this.locale.startsWith('en')) {
                        // 美式格式 月/日/年
                        month = parseInt(match[1]);
                        day = parseInt(match[2]);
                        year = parseInt(match[3]);
                    } else {
                        // 歐式格式 日/月/年
                        day = parseInt(match[1]);
                        month = parseInt(match[2]);
                        year = parseInt(match[3]);
                    }

                    // 驗證解析出的數值
                    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                        // 如果是非西元曆，需要進行日曆轉換
                        if (this.calendar !== 'gregory') {
                            try {
                                // 假設輸入是目標日曆系統的日期，轉換為西元日期
                                const targetCalendar = CalendarUtils.createSafeCalendar(this.calendar);
                                const localDate = new CalendarDate(targetCalendar, year, month, day);
                                const gregorianDate = CalendarUtils.safeToCalendar(localDate, new GregorianCalendar());

                                return {
                                    success: true,
                                    date: {
                                        year: gregorianDate.year,
                                        month: gregorianDate.month,
                                        day: gregorianDate.day
                                    },
                                    format: `internationalized-${this.calendar}`,
                                    confidence: 0.9,
                                    calendarSystem: this.calendar
                                };
                            } catch (error) {
                                // 如果轉換失敗，嘗試將其作為西元日期處理
                                return {
                                    success: true,
                                    date: { year, month, day },
                                    format: 'internationalized-fallback',
                                    confidence: 0.7,
                                    calendarSystem: 'gregory'
                                };
                            }
                        } else {
                            return {
                                success: true,
                                date: { year, month, day },
                                format: 'internationalized-gregory',
                                confidence: 0.9,
                                calendarSystem: 'gregory'
                            };
                        }
                    }
                }
            }

            // 2. 嘗試使用 Intl.DateTimeFormat 的相對解析
            return this.parseWithIntlFormatter(input);

        } catch (error) {
            console.warn('@internationalized/date 解析失敗:', error);
            return { success: false, date: null, format: null, confidence: 0 };
        }
    }

    /**
     * 使用 Intl.DateTimeFormat 進行解析（實驗性）
     */
    private parseWithIntlFormatter(input: string): DateParseResult {
        try {
            // 創建一個已知日期的格式器來了解格式模式
            const testDate = new Date(2023, 0, 15); // 2023年1月15日
            const formatter = new Intl.DateTimeFormat(this.locale, {
                calendar: this.calendar,
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const formattedTest = formatter.format(testDate);

            // 嘗試從格式化的測試字符串中提取模式
            const yearMatch = formattedTest.match(/2023|112/); // 西元2023或民國112
            const monthMatch = formattedTest.match(/1月|January|1/);
            const dayMatch = formattedTest.match(/15/);

            if (yearMatch && monthMatch && dayMatch) {
                // 基於模式嘗試解析輸入
                return this.parseBasedOnPattern(input, formattedTest);
            }

            return { success: false, date: null, format: null, confidence: 0 };
        } catch (error) {
            console.warn('Intl.DateTimeFormat 解析失敗:', error);
            return { success: false, date: null, format: null, confidence: 0 };
        }
    }

    /**
     * 基於模式解析日期
     */
    private parseBasedOnPattern(input: string, pattern: string): DateParseResult {
        try {
            // 提取數字
            const numbers = input.match(/\d+/g);
            if (numbers && numbers.length >= 3) {
                const nums = numbers.map(n => parseInt(n));

                // 簡單的啟發式規則
                const year = nums.find(n => n > 31) || nums[0]; // 找到最可能是年份的數字
                const month = nums.find(n => n >= 1 && n <= 12) || nums[1];
                const day = nums.find(n => n >= 1 && n <= 31 && n !== year && n !== month) || nums[2];

                if (year && month && day) {
                    return {
                        success: true,
                        date: { year, month, day },
                        format: 'pattern-based',
                        confidence: 0.6,
                        calendarSystem: this.calendar
                    };
                }
            }
            return { success: false, date: null, format: null, confidence: 0 };
        } catch (error) {
            return { success: false, date: null, format: null, confidence: 0 };
        }
    }

    /**
     * 使用指定格式解析
     */
    private tryParseWithFormat(input: string, format: string): DateParseResult {
        try {
            const parsed = dayjs(input, format, true); // 嚴格解析

            if (parsed.isValid()) {
                const year = parsed.year();
                const month = parsed.month() + 1;
                const day = parsed.date();

                // 基本合理性檢查
                if (this.isDateReasonable(year, month, day)) {
                    return {
                        success: true,
                        date: { year, month, day },
                        format,
                        confidence: 1.0,
                        calendarSystem: 'gregory'
                    };
                }
            }
        } catch (error) {
            // 解析失敗
        }

        return { success: false, date: null, format: null, confidence: 0 };
    }

    /**
     * 後備解析方法
     */
    private fallbackParse(input: string): DateParseResult {
        try {
            const parsed = dayjs(input);

            if (parsed.isValid()) {
                const year = parsed.year();
                const month = parsed.month() + 1;
                const day = parsed.date();

                if (this.isDateReasonable(year, month, day)) {
                    return {
                        success: true,
                        date: { year, month, day },
                        format: 'auto-detected',
                        confidence: 0.6,
                        calendarSystem: 'gregory'
                    };
                }
            }
        } catch (error) {
            // 完全解析失敗
        }

        return { success: false, date: null, format: null, confidence: 0 };
    }

    /**
     * 檢查日期是否合理
     */
    private isDateReasonable(year: number, month: number, day: number): boolean {
        return year >= 1900 && year <= 2100 &&
            month >= 1 && month <= 12 &&
            day >= 1 && day <= 31;
    }

    /**
     * 計算解析可信度
     */
    private calculateConfidence(input: string, format: string, isExactMatch: boolean): number {
        let confidence = isExactMatch ? 1.0 : 0.6;

        // 如果是地區偏好格式，增加可信度
        const localeFormats = LOCALE_FORMAT_PRIORITY[this.locale] || [];
        const formatIndex = localeFormats.indexOf(format);

        if (formatIndex !== -1) {
            // 格式越靠前，可信度越高
            confidence = Math.max(confidence, 1.0 - (formatIndex * 0.1));
        }

        return Math.max(0.1, Math.min(1.0, confidence));
    }

    /**
     * 檢測可能的模糊格式
     */
    detectAmbiguity(input: string): Array<{
        interpretation: string;
        date: { year: number; month: number; day: number };
        format: string;
        confidence: number;
        calendarSystem: string;
    }> {
        const interpretations = [];

        // 檢查是否可能是 MM/DD/YYYY 或 DD/MM/YYYY
        const slashPattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        const match = input.match(slashPattern);

        if (match) {
            const [, first, second, year] = match;
            const firstNum = parseInt(first);
            const secondNum = parseInt(second);

            // 如果兩個數字都可能是月份或日期（1-12），則存在模糊性
            if (firstNum <= 12 && secondNum <= 12 && firstNum !== secondNum) {
                // MM/DD/YYYY 解釋
                const mmddResult = this.tryParseWithFormat(input, 'MM/DD/YYYY');
                if (mmddResult.success) {
                    interpretations.push({
                        interpretation: `${firstNum}月${secondNum}日 (MM/DD/YYYY)`,
                        date: mmddResult.date!,
                        format: 'MM/DD/YYYY',
                        confidence: mmddResult.confidence!,
                        calendarSystem: mmddResult.calendarSystem || 'gregory'
                    });
                }

                // DD/MM/YYYY 解釋
                const ddmmResult = this.tryParseWithFormat(input, 'DD/MM/YYYY');
                if (ddmmResult.success) {
                    interpretations.push({
                        interpretation: `${secondNum}月${firstNum}日 (DD/MM/YYYY)`,
                        date: ddmmResult.date!,
                        format: 'DD/MM/YYYY',
                        confidence: ddmmResult.confidence!,
                        calendarSystem: ddmmResult.calendarSystem || 'gregory'
                    });
                }
            }
        }

        return interpretations;
    }

    /**
     * 設置新的地區和日曆系統
     */
    setLocale(locale: string): void {
        this.locale = locale;
        this.preferredFormats = this.getFormatsForLocale(locale);
    }

    /**
     * 設置日曆系統
     */
    setCalendar(calendar: string): void {
        this.calendar = calendar;
    }

    /**
     * 獲取建議格式
     */
    getSuggestedFormats(): string[] {
        return this.preferredFormats.slice(0, 5);
    }
}

// 創建全域解析器實例
const globalParser = new SmartDateParser();

/**
 * 便利函數：解析日期字符串（支援多日曆系統）
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

/**
 * 便利函數：檢測模糊日期
 */
export function detectDateAmbiguity(
    input: string,
    locale: string = 'zh-TW',
    calendar: string = 'gregory'
) {
    if (locale !== globalParser['locale']) {
        globalParser.setLocale(locale);
    }
    if (calendar !== globalParser['calendar']) {
        globalParser.setCalendar(calendar);
    }

    return globalParser.detectAmbiguity(input);
}
