// utils/dateParsingUtils.ts - 專門處理日期解析的工具

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export interface DateParseResult {
    success: boolean;
    date: { year: number; month: number; day: number } | null;
    format: string | null;
    confidence: number; // 0-1，解析可信度
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
 * 智能日期解析器
 */
export class SmartDateParser {
    private locale: string;
    private preferredFormats: string[];

    constructor(locale: string = 'zh-TW') {
        this.locale = locale;
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
     * 解析日期字符串
     */
    parse(input: string): DateParseResult {
        if (!input || typeof input !== 'string') {
            return { success: false, date: null, format: null, confidence: 0 };
        }

        const trimmed = input.trim();

        // 先嘗試優先格式
        for (const format of this.preferredFormats) {
            const result = this.tryParseWithFormat(trimmed, format);
            if (result.success) {
                return {
                    ...result,
                    confidence: this.calculateConfidence(trimmed, format, true)
                };
            }
        }

        // 嘗試 dayjs 的自動解析作為後備
        const fallbackResult = this.fallbackParse(trimmed);
        if (fallbackResult.success) {
            return {
                ...fallbackResult,
                confidence: 0.5 // 較低的可信度
            };
        }

        return { success: false, date: null, format: null, confidence: 0 };
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
                        confidence: 1.0
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
                        confidence: 0.6
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
                        confidence: mmddResult.confidence
                    });
                }

                // DD/MM/YYYY 解釋
                const ddmmResult = this.tryParseWithFormat(input, 'DD/MM/YYYY');
                if (ddmmResult.success) {
                    interpretations.push({
                        interpretation: `${secondNum}月${firstNum}日 (DD/MM/YYYY)`,
                        date: ddmmResult.date!,
                        format: 'DD/MM/YYYY',
                        confidence: ddmmResult.confidence
                    });
                }
            }
        }

        return interpretations;
    }

    /**
     * 設置新的地區
     */
    setLocale(locale: string): void {
        this.locale = locale;
        this.preferredFormats = this.getFormatsForLocale(locale);
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
 * 便利函數：解析日期字符串
 */
export function parseUserDateInput(
    input: string,
    locale: string = 'zh-TW'
): DateParseResult {
    if (locale !== globalParser['locale']) {
        globalParser.setLocale(locale);
    }

    return globalParser.parse(input);
}

/**
 * 便利函數：檢測模糊日期
 */
export function detectDateAmbiguity(
    input: string,
    locale: string = 'zh-TW'
) {
    if (locale !== globalParser['locale']) {
        globalParser.setLocale(locale);
    }

    return globalParser.detectAmbiguity(input);
}
