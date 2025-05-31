// composables/useCalendar.ts - 日曆系統 Composable
import { ref, computed, watch, onMounted } from 'vue';
import { CalendarHelper, initializeCalendarSystem } from '@/utils/calendarRegistry';
import type { SimpleDateValue } from '@/utils/dateUtils';

interface UseCalendarOptions {
    calendar?: string;
    locale?: string;
    outputFormat?: string;
    onError?: (error: string) => void;
}

/**
 * 日曆系統 Composable
 * 提供日曆解析、格式化、驗證等功能
 */
export function useCalendar(options: UseCalendarOptions = {}) {
    const {
        calendar = 'gregory',
        locale = 'zh-TW',
        outputFormat = 'YYYY-MM-DD',
        onError = console.warn
    } = options;

    // 內部狀態
    const currentCalendar = ref(calendar);
    const isInitialized = ref(false);
    const initError = ref<string | null>(null);

    // 初始化日曆系統
    const initialize = async () => {
        try {
            await initializeCalendarSystem();
            isInitialized.value = true;
            initError.value = null;
        } catch (error) {
            initError.value = `日曆系統初始化失敗: ${error}`;
            onError(initError.value);
        }
    };

    // 在組件掛載時初始化
    onMounted(initialize);

    // 計算屬性
    const calendarConfig = computed(() => {
        if (!isInitialized.value) return null;
        return CalendarHelper.getConfig(currentCalendar.value);
    });

    const placeholders = computed(() => {
        if (!isInitialized.value) {
            return { year: '年', month: '月', day: '日' };
        }
        return CalendarHelper.getPlaceholders(currentCalendar.value, locale);
    });

    const yearRange = computed(() => {
        if (!isInitialized.value) {
            return { min: 1900, max: 2100 };
        }
        return CalendarHelper.getYearRange(currentCalendar.value);
    });

    const supportedCalendars = computed(() => {
        if (!isInitialized.value) return [];
        return CalendarHelper.getSupportedCalendars(locale);
    });

    const isSupported = computed(() => {
        if (!isInitialized.value) return false;
        return CalendarHelper.isSupported(currentCalendar.value);
    });

    // 核心功能函數

    /**
     * 智能解析使用者輸入
     * 會嘗試當前日曆格式和西元曆格式
     */
    const parseInput = (input: string): SimpleDateValue | null => {
        if (!isInitialized.value || !input) return null;

        try {
            return CalendarHelper.parseUserInput(input, currentCalendar.value);
        } catch (error) {
            onError(`解析輸入失敗: ${error}`);
            return null;
        }
    };

    /**
     * 格式化輸出
     * 將西元曆日期格式化為當前日曆系統的格式
     */
    const formatOutput = (date: SimpleDateValue): string => {
        if (!isInitialized.value || !date) return '';

        try {
            return CalendarHelper.formatUserOutput(
                date,
                currentCalendar.value,
                outputFormat,
                locale
            );
        } catch (error) {
            onError(`格式化輸出失敗: ${error}`);
            return '';
        }
    };

    /**
     * 驗證日期
     */
    const validateDate = (date: SimpleDateValue): boolean => {
        if (!isInitialized.value || !date) return false;

        try {
            return CalendarHelper.validateDate(date, currentCalendar.value);
        } catch (error) {
            onError(`驗證日期失敗: ${error}`);
            return false;
        }
    };

    /**
     * 切換日曆系統
     */
    const setCalendar = (newCalendar: string) => {
        if (!isInitialized.value) {
            onError('日曆系統尚未初始化');
            return false;
        }

        if (!CalendarHelper.isSupported(newCalendar)) {
            onError(`不支援的日曆系統: ${newCalendar}`);
            return false;
        }

        currentCalendar.value = newCalendar;
        return true;
    };

    /**
     * 取得日曆顯示名稱
     */
    const getDisplayName = (calendarId?: string): string => {
        const targetCalendar = calendarId || currentCalendar.value;

        if (targetCalendar === 'gregory') {
            return '西元曆';
        }

        const config = CalendarHelper.getConfig(targetCalendar);
        const displayName = config?.displayName;

        if (typeof displayName === 'string') {
            return displayName;
        } else if (typeof displayName === 'object' && displayName !== null) {
            return displayName[locale] || displayName['zh-TW'] || displayName[Object.keys(displayName)[0]] || targetCalendar;
        }

        return targetCalendar;
    };

    // 監聽日曆變化
    watch(() => currentCalendar.value, (newCalendar) => {
        if (isInitialized.value && !CalendarHelper.isSupported(newCalendar)) {
            onError(`切換到不支援的日曆: ${newCalendar}，回退到西元曆`);
            currentCalendar.value = 'gregory';
        }
    });

    return {
        // 狀態
        currentCalendar: computed(() => currentCalendar.value),
        isInitialized: computed(() => isInitialized.value),
        initError: computed(() => initError.value),
        calendarConfig,
        placeholders,
        yearRange,
        supportedCalendars,
        isSupported,

        // 方法
        parseInput,
        formatOutput,
        validateDate,
        setCalendar,
        getDisplayName,
        initialize,

        // 工具方法
        isCalendarSupported: (calendarId: string) => CalendarHelper.isSupported(calendarId),
        getAllSupportedCalendars: () => CalendarHelper.getSupportedCalendars(locale)
    };
}
