import { ref, computed } from 'vue';
import { LocaleManager, interpolateMessage, type LocaleKey } from '@/locale/index';

export function useLocale(initialLocale: string = 'en-US') {
    const localeManager = new LocaleManager();
    const supportedLocales: LocaleKey[] = ['zh-TW', 'zh-CN', 'en-US', 'ja-JP', 'ko-KR'];

    // 驗證並轉換 locale
    const validateLocale = (locale: string): LocaleKey => {
        if (supportedLocales.includes(locale as LocaleKey)) {
            return locale as LocaleKey;
        }
        console.warn(`Locale "${locale}" is not supported. Defaulting to "en-US".`);
        return 'en-US';
    };

    const validatedLocale = validateLocale(initialLocale);
    const currentLocale = ref<LocaleKey>(validatedLocale);

    localeManager.setLocale(validatedLocale);

    const setLocale = (locale: string) => {
        currentLocale.value = validateLocale(locale);
        localeManager.setLocale(currentLocale.value);
    };

    const getMessage = (path: string, variables?: Record<string, any>) => {
        return localeManager.getMessage(path, variables);
    };

    const getErrorMessage = (path: string, variables?: Record<string, any>) => {
        return localeManager.getErrorMessage(path, variables);
    };

    const getPlaceholderMessage = (path: string, variables?: Record<string, any>) => {
        return localeManager.getPlaceholderMessage(path, variables);
    };

    const formatText = (template: string, params: Record<string, string | number>) => {
        return interpolateMessage(template, params);
    };

    return {
        currentLocale: computed(() => currentLocale.value),
        setLocale,
        getMessage,
        getErrorMessage,
        getPlaceholderMessage,
        formatText
    };
}
