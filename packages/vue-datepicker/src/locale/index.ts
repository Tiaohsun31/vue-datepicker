// locale/index.ts
import { zhTWLocaleMessages as zhTW } from './zh-TW';
import { warn } from '../utils/logger';
import { zhCNLocaleMessages as zhCN } from './zh-CN';
import { enUSLocaleMessages as enUS } from './en-US';
import { jaJPLocaleMessages as jaJP } from './ja-JP';
import { koKRLocaleMessages as koKR } from './ko-KR';
import type { ErrorMessages, LocaleMessages } from '../types/locale';
import type { MessageParams } from '../types/internal';

export type SupportedLocale = 'zh-TW' | 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR';
export type LocaleKey = SupportedLocale | string;

export const localeMessages: Record<string, LocaleMessages> = {
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP,
    'ko-KR': koKR,
};

// 訊息插值函數
export function interpolateMessage(template: string, variables: MessageParams): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        return variables[key]?.toString() || match;
    });
}

// 語言包管理器
//
// 內建語系 `localeMessages` 為 module-level 唯讀共享資料；
// 自訂語系（registerLocale / addCustomMessages）一律寫入「每實例」的 customLocales 覆蓋層，
// 不再就地改寫共享的 localeMessages，避免自訂語系跨 DatePicker 實例洩漏 / 污染內建語系（§5.7）。
export class LocaleManager {
    private currentLocale: LocaleKey = 'zh-TW';
    // 每實例的自訂語系覆蓋層（不污染共享的內建 localeMessages）
    private customLocales: Record<string, LocaleMessages> = {};

    private resolveLocale(locale: string): LocaleMessages | undefined {
        return this.customLocales[locale] ?? localeMessages[locale];
    }

    setLocale(locale: string): void {
        if (!this.resolveLocale(locale)) {
            warn(`Locale '${locale}' not found, falling back to 'zh-TW'`);
            this.currentLocale = 'zh-TW';
            return;
        }
        this.currentLocale = locale;
    }

    // 註冊自定義語言包（僅作用於此實例）
    registerLocale(locale: string, messages: LocaleMessages): void {
        this.customLocales[locale] = messages;
    }

    // 檢查語言包是否存在（含此實例的自訂語系）
    hasLocale(locale: string): boolean {
        return !!this.customLocales[locale] || !!localeMessages[locale];
    }

    // 獲取所有可用語言（內建 + 此實例自訂）
    getAvailableLocales(): string[] {
        return Array.from(new Set([...Object.keys(localeMessages), ...Object.keys(this.customLocales)]));
    }

    getCurrentLocale(): LocaleKey {
        return this.currentLocale;
    }

    private lookupPath(tree: LocaleMessages | undefined, keys: string[]): unknown {
        let message: any = tree;
        for (const key of keys) {
            message = message?.[key];
        }
        return message;
    }

    getMessage(path: string, variables?: MessageParams): string {
        const keys = path.split('.');
        // 先查此實例的自訂語系，缺鍵再回退內建（支援部分覆寫）
        let message = this.lookupPath(this.customLocales[this.currentLocale], keys);
        if (typeof message !== 'string') {
            message = this.lookupPath(localeMessages[this.currentLocale], keys);
        }

        if (typeof message !== 'string') {
            warn(`Missing translation for path: ${path} in locale: ${this.currentLocale}`);
            return path;
        }

        return variables ? interpolateMessage(message, variables) : message;
    }

    getErrorMessage(path: string, variables?: MessageParams): string {
        return this.getMessage(`error.${path}`, variables);
    }

    getPlaceholderMessage(path: string, variables?: MessageParams): string {
        return this.getMessage(`placeholder.${path}`, variables);
    }

    // 支援自定義語言包（合併進此實例的覆蓋層，不污染共享的內建 localeMessages）
    addCustomMessages(locale: string, messages: Partial<LocaleMessages>): void {
        const base = this.resolveLocale(locale);
        if (!base) {
            warn(`Locale '${locale}' not found. Please register it first using registerLocale().`);
            return;
        }

        this.customLocales[locale] = this.deepMerge(base, messages);
    }

    // addCustomMessages(locale: LocaleKey, messages: Partial<ErrorMessages>): void {
    //     localeMessages[locale] = {
    //         ...localeMessages[locale],
    //         ...this.deepMerge(localeMessages[locale], messages)
    //     };
    // }

    /**
     * 獲取參數化錯誤訊息
     */
    getParameterizedErrorMessage(key: string, params: MessageParams = {}): string {
        const message = this.getErrorMessage(key);
        return this.interpolateParameters(message, params);
    }

    /**
     * 參數插值
     */
    interpolateParameters(template: string, variables: MessageParams = {}): string {
        if (!variables || Object.keys(variables).length === 0) {
            return template;
        }

        return template.replace(/\{(\w+)\}/g, (match, key) => {
            const value = variables[key];

            // 處理 undefined 或 null 值
            if (value === undefined || value === null) {
                warn(`Missing variable '${key}' for template: "${template}"`);
                return match; // 保持原始佔位符
            }

            return String(value);
        });
    }

    private deepMerge(target: any, source: any): any {
        const result = { ...target };

        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }

        return result;
    }
}

// 全域實例
export const localeManager = new LocaleManager();

// 使用範例：
// safeGetParameterizedMessage(localeManager, 'year.outOfRange', { min: 1, max: 2075 });
export function safeGetParameterizedMessage(
    localeManager: LocaleManager,
    key: string,
    params: MessageParams = {},
    fallback?: string
): string {
    try {
        const message = localeManager.getParameterizedErrorMessage(key, params);
        return message !== key ? message : (fallback || key);
    } catch (error) {
        warn(`翻譯失敗: ${key}`, error);
        return fallback || key;
    }
}
