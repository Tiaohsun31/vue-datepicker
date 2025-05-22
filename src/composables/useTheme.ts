import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { themeManager, type ThemeMode, type ThemeConfig, type ThemeState } from '../utils/tailwind4ThemeManager';
import type { TailwindColor } from '../types/main';

export function useTheme(initialConfig?: Partial<ThemeConfig>) {
    const themeState = ref<ThemeState>(themeManager.getThemeState());
    let unsubscribe: (() => void) | null = null;

    // 響應式計算屬性
    const isDark = computed(() => themeState.value.currentMode === 'dark');
    const isLight = computed(() => themeState.value.currentMode === 'light');
    const isAuto = computed(() => themeState.value.userPreference === 'auto');
    const currentMode = computed(() => themeState.value.currentMode);
    const userPreference = computed(() => themeState.value.userPreference);
    const systemPreference = computed(() => themeState.value.systemPreference);
    const currentColor = computed(() => themeState.value.color);

    // 主題相關的 CSS 類別
    const themeClasses = computed(() => ({
        'dark': isDark.value,
        'light': isLight.value,
        [`theme-${currentColor.value}`]: true
    }));

    // 設置主題模式
    const setMode = (mode: ThemeMode): void => {
        themeManager.setThemeMode(mode);
    };

    // 設置主題顏色
    const setColor = (color: TailwindColor | string): void => {
        themeManager.setThemeColor(color);
    };

    // 設置完整主題配置
    const setTheme = (config: Partial<ThemeConfig>): void => {
        themeManager.setTheme(config);
    };

    // 切換主題（在 light 和 dark 之間）
    const toggle = (): void => {
        themeManager.toggleTheme();
    };

    // 重置到默認設置
    const reset = (): void => {
        themeManager.reset();
    };

    // 監聽主題變化
    const watchTheme = (callback: (state: ThemeState) => void, immediate = false) => {
        if (immediate) {
            callback(themeState.value);
        }

        return watch(themeState, callback, { deep: true });
    };

    // 獲取當前主題的 CSS 變數值
    const getCSSVariable = (variableName: string): string => {
        if (typeof getComputedStyle === 'undefined') return '';

        const value = getComputedStyle(document.documentElement)
            .getPropertyValue(variableName)
            .trim();

        return value;
    };

    // 獲取主題相關的 CSS 變數
    const getThemeVariables = () => ({
        bgPrimary: getCSSVariable('--vdt-bg-primary'),
        bgSecondary: getCSSVariable('--vdt-bg-secondary'),
        bgElevated: getCSSVariable('--vdt-bg-elevated'),
        textPrimary: getCSSVariable('--vdt-text-primary'),
        textSecondary: getCSSVariable('--vdt-text-secondary'),
        textMuted: getCSSVariable('--vdt-text-muted'),
        borderLight: getCSSVariable('--vdt-border-light'),
        borderMedium: getCSSVariable('--vdt-border-medium'),
        borderStrong: getCSSVariable('--vdt-border-strong'),
        themePrimary: getCSSVariable('--vdt-theme-500'),
    });

    // 組件掛載時初始化
    onMounted(() => {
        // 訂閱主題變化
        unsubscribe = themeManager.addListener((state) => {
            themeState.value = state;
        });

        // 如果提供了初始配置，應用它
        if (initialConfig) {
            themeManager.setTheme(initialConfig);
        }
    });

    // 組件卸載時清理
    onBeforeUnmount(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    return {
        // 狀態
        themeState: themeState,
        isDark,
        isLight,
        isAuto,
        currentMode,
        userPreference,
        systemPreference,
        currentColor,
        themeClasses,

        // 方法
        setMode,
        setColor,
        setTheme,
        toggle,
        reset,
        watchTheme,
        getCSSVariable,
        getThemeVariables,

        // 便利方法
        setLightMode: () => setMode('light'),
        setDarkMode: () => setMode('dark'),
        setAutoMode: () => setMode('auto'),
    };
}

// 創建一個可在多個組件間共享的全局主題狀態
export function createGlobalTheme(config?: Partial<ThemeConfig>) {
    if (config) {
        themeManager.setTheme(config);
    }

    return useTheme();
}

export default useTheme;
