import { ref, computed } from 'vue';
import { LocaleManager, interpolateMessage } from '@/locale/index';
import type { LocaleMessages } from '@/types/locale';

export function useLocale(
    initialLocale: string = 'en-US',
    customLocaleMessages?: LocaleMessages
) {
    // 為每個 DatePicker 實例創建獨立的 LocaleManager
    const localeManager = new LocaleManager();
    const currentLocale = ref(initialLocale);

    // 如果有自定義語言包，註冊它
    if (customLocaleMessages && initialLocale) {
        localeManager.registerLocale(initialLocale, customLocaleMessages);
    }

    localeManager.setLocale(initialLocale);

    const setLocale = (locale: string, customMessages?: LocaleMessages) => {
        currentLocale.value = locale;

        // 如果提供了自定義訊息，先註冊
        if (customMessages) {
            localeManager.registerLocale(locale, customMessages);
        }

        localeManager.setLocale(locale);
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

    // 新增：註冊自定義語言包的方法
    const registerCustomLocale = (locale: string, messages: LocaleMessages) => {
        localeManager.registerLocale(locale, messages);
    };

    // 新增：檢查語言包是否存在
    const hasLocale = (locale: string) => {
        return localeManager.hasLocale(locale);
    };

    return {
        currentLocale: computed(() => currentLocale.value),
        setLocale,
        getMessage,
        getErrorMessage,
        getPlaceholderMessage,
        formatText,
        registerCustomLocale,
        hasLocale
    };
}
