// composables/useErrorHandling.ts
import { ref, computed, readonly } from 'vue';
import { localeManager, type LocaleKey } from '@/locale/index';

interface ErrorHandlingOptions {
    locale?: LocaleKey;
    useI18n?: boolean;
    customMessages?: Record<string, string>;
    logErrors?: boolean;
}

export function useErrorHandling(options: ErrorHandlingOptions = {}) {
    const {
        locale = 'zh-TW',
        useI18n = true,
        customMessages = {},
        logErrors = false
    } = options;

    // 錯誤狀態
    const errors = ref<Record<string, string>>({});

    // 設置當前語言
    if (useI18n) {
        localeManager.setLocale(locale);
    }

    // 計算屬性
    const hasErrors = computed(() => Object.keys(errors.value).length > 0);
    const errorCount = computed(() => Object.keys(errors.value).length);
    const errorFields = computed(() => Object.keys(errors.value));

    /**
     * 設置錯誤
     */
    function setError(field: string, message: string): void {
        const translatedMessage = useI18n ? translateError(message, field) : message;
        errors.value[field] = translatedMessage;

        if (logErrors) {
            console.warn(`Error in field "${field}":`, translatedMessage);
        }
    }

    /**
     * 批量設置錯誤
     */
    function setErrors(newErrors: Record<string, string>): void {
        Object.entries(newErrors).forEach(([field, message]) => {
            setError(field, message);
        });
    }

    /**
     * 清除特定欄位的錯誤
     */
    function clearError(field: string): void {
        delete errors.value[field];
    }

    /**
     * 清除所有錯誤
     */
    function clearAllErrors(): void {
        errors.value = {};
    }

    /**
     * 檢查特定欄位是否有錯誤
     */
    function hasError(field: string): boolean {
        return field in errors.value;
    }

    /**
     * 獲取特定欄位的錯誤訊息
     */
    function getError(field: string): string | undefined {
        return errors.value[field];
    }

    /**
     * 翻譯錯誤訊息
     */
    function translateError(message: string, field?: string): string {
        // 1. 優先使用自定義訊息
        if (customMessages[message]) {
            return customMessages[message];
        }

        // 2. 如果關閉i18n，直接返回
        if (!useI18n) {
            return message;
        }

        // 3. 嘗試智能翻譯
        return smartTranslate(message, field);
    }

    /**
     * 智能翻譯函數
     */
    function smartTranslate(message: string, field?: string): string {
        // 這裡可以實現更複雜的翻譯邏輯
        // 例如使用正則表達式匹配常見錯誤模式

        // 簡化版的智能翻譯
        const patterns = [
            {
                pattern: /請輸入(.+)/,
                i18nKey: (field || 'date') + '.required'
            },
            {
                pattern: /(.+)必須是\s*(\d+)-(\d+)\s*之間的數字/,
                i18nKey: (field || 'date') + '.outOfRange'
            },
            {
                pattern: /無效的(.+)/,
                i18nKey: (field || 'date') + '.invalid'
            }
        ];

        for (const { pattern, i18nKey } of patterns) {
            if (pattern.test(message)) {
                const translated = localeManager.getMessage(i18nKey);
                if (translated !== i18nKey) {
                    return translated;
                }
            }
        }

        return message;
    }

    /**
     * 驗證函數工廠
     */
    function createValidator(field: string) {
        return {
            required: (value: any, message?: string) => {
                if (!value || (typeof value === 'string' && !value.trim())) {
                    setError(field, message || localeManager.getMessage(`${field}.required`));
                    return false;
                }
                clearError(field);
                return true;
            },

            pattern: (value: string, pattern: RegExp, message?: string) => {
                if (value && !pattern.test(value)) {
                    setError(field, message || localeManager.getMessage(`${field}.invalid`));
                    return false;
                }
                clearError(field);
                return true;
            },

            range: (value: number, min: number, max: number, message?: string) => {
                if (value !== undefined && (value < min || value > max)) {
                    setError(field, message || localeManager.getMessage(`${field}.outOfRange`, { min, max }));
                    return false;
                }
                clearError(field);
                return true;
            },

            custom: (value: any, validator: (val: any) => boolean | string) => {
                const result = validator(value);
                if (typeof result === 'string') {
                    setError(field, result);
                    return false;
                } else if (!result) {
                    setError(field, localeManager.getMessage(`${field}.invalid`));
                    return false;
                }
                clearError(field);
                return true;
            }
        };
    }

    /**
     * 批量驗證
     */
    function validate(validations: Record<string, () => boolean>): boolean {
        let isValid = true;

        Object.entries(validations).forEach(([field, validationFn]) => {
            if (!validationFn()) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * 更新語言
     */
    function setLocale(newLocale: LocaleKey) {
        localeManager.setLocale(newLocale);
    }

    return {
        // 狀態
        errors: readonly(errors),

        // 計算屬性
        hasErrors,
        errorCount,
        errorFields,

        // 主要方法
        setError,
        setErrors,
        clearError,
        clearAllErrors,
        hasError,
        getError,

        // 驗證方法
        createValidator,
        validate,

        // 翻譯方法
        translateError,
        setLocale,
    };
}

// 預設實例（可選）
export const globalErrorHandler = useErrorHandling({
    useI18n: true,
    logErrors: process.env.NODE_ENV === 'development'
});

