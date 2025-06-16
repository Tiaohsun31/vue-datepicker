// locale/index.ts
import { zhTWLocaleMessages as zhTW } from './zh-TW';
import { zhCNLocaleMessages as zhCN } from './zh-CN';
import { enUSLocaleMessages as enUS } from './en-US';
import { jaJPLocaleMessages as jaJP } from './ja-JP';
import { koKRLocaleMessages as koKR } from './ko-KR';
import type { ErrorMessages, LocaleMessages } from '@/types/locale';

export type LocaleKey = 'zh-TW' | 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR';

export const localeMessages: Record<LocaleKey, LocaleMessages> = {
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP,
    'ko-KR': koKR,
};

// 訊息插值函數
export function interpolateMessage(template: string, variables: Record<string, any>): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        return variables[key]?.toString() || match;
    });
}

// 語言包管理器
export class LocaleManager {
    private currentLocale: LocaleKey = 'zh-TW';

    setLocale(locale: LocaleKey): void {
        this.currentLocale = locale;
    }

    getCurrentLocale(): LocaleKey {
        return this.currentLocale;
    }

    getMessage(path: string, variables?: Record<string, any>): string {
        const keys = path.split('.');
        let message: any = localeMessages[this.currentLocale];

        for (const key of keys) {
            message = message?.[key];
        }

        if (typeof message !== 'string') {
            console.warn(`Missing translation for path: ${path} in locale: ${this.currentLocale}`);
            return path;
        }

        return variables ? interpolateMessage(message, variables) : message;
    }

    getErrorMessage(path: string, variables?: Record<string, any>): string {
        return this.getMessage(`error.${path}`, variables);
    }

    getPlaceholderMessage(path: string, variables?: Record<string, any>): string {
        return this.getMessage(`placeholder.${path}`, variables);
    }

    // 支援自定義語言包
    addCustomMessages(locale: LocaleKey, messages: Partial<ErrorMessages>): void {
        localeMessages[locale] = {
            ...localeMessages[locale],
            ...this.deepMerge(localeMessages[locale], messages)
        };
    }

    /**
     * 獲取參數化錯誤訊息
     */
    getParameterizedErrorMessage(key: string, params: Record<string, any> = {}): string {
        const message = this.getErrorMessage(key);
        return this.interpolateParameters(message, params);
    }

    /**
     * 參數插值
     */
    interpolateParameters(template: string, variables: Record<string, any> = {}): string {
        if (!variables || Object.keys(variables).length === 0) {
            return template;
        }

        return template.replace(/\{(\w+)\}/g, (match, key) => {
            const value = variables[key];

            // 處理 undefined 或 null 值
            if (value === undefined || value === null) {
                console.warn(`Missing variable '${key}' for template: "${template}"`);
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
    params: Record<string, any> = {},
    fallback?: string
): string {
    try {
        const message = localeManager.getParameterizedErrorMessage(key, params);
        return message !== key ? message : (fallback || key);
    } catch (error) {
        console.warn(`翻譯失敗: ${key}`, error);
        return fallback || key;
    }
}
