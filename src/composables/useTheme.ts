/**
 * useTheme.ts
 * 針對 DatePicker 公開專案的簡化主題 Composable
 * 配合 Tailwind CSS 4 使用
 */

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { themeManager, type ThemeMode, type ThemeState } from '../utils/tailwind4ThemeManager';
import type { TailwindColor } from '../types/main';

interface UseThemeOptions {
    defaultColor?: TailwindColor | string;
    defaultMode?: ThemeMode;
}

export function useTheme(options: UseThemeOptions = {}) {
    // 響應式狀態
    const themeState = ref<ThemeState>(themeManager.getState());
    let unsubscribe: (() => void) | null = null;

    // 響應式計算屬性
    const isDark = computed(() => themeState.value.currentMode === 'dark');
    const isLight = computed(() => themeState.value.currentMode === 'light');
    const isAuto = computed(() => themeState.value.userPreference === 'auto');
    const currentMode = computed(() => themeState.value.currentMode);
    const userPreference = computed(() => themeState.value.userPreference);
    const systemPreference = computed(() => themeState.value.systemPreference);
    const currentColor = computed(() => themeState.value.color);

    // 主題類別（用於組件根元素的 :class 綁定）
    const themeClasses = computed(() => themeManager.getThemeClasses());

    // 設置主題顏色
    const setColor = (color: TailwindColor | string): void => {
        themeManager.setColor(color);
    };

    // 設置主題模式
    const setMode = (mode: ThemeMode): void => {
        themeManager.setMode(mode);
    };

    // 切換深淺模式
    const toggle = (): void => {
        const newMode = currentMode.value === 'light' ? 'dark' : 'light';
        setMode(newMode);
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
    const getThemeVariables = () => {
        const variables: Record<string, string> = {};

        // 主題色變數
        const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
        shades.forEach(shade => {
            variables[`theme-${shade}`] = getCSSVariable(`--color-vdt-theme-${shade}`);
        });

        // 語義化變數
        variables['surface'] = getCSSVariable('--color-vdt-surface');
        variables['surface-secondary'] = getCSSVariable('--color-vdt-surface-secondary');
        variables['surface-elevated'] = getCSSVariable('--color-vdt-surface-elevated');
        variables['content'] = getCSSVariable('--color-vdt-content');
        variables['content-secondary'] = getCSSVariable('--color-vdt-content-secondary');
        variables['content-muted'] = getCSSVariable('--color-vdt-content-muted');
        variables['outline'] = getCSSVariable('--color-vdt-outline');
        variables['outline-strong'] = getCSSVariable('--color-vdt-outline-strong');
        variables['outline-stronger'] = getCSSVariable('--color-vdt-outline-stronger');
        variables['interactive-hover'] = getCSSVariable('--color-vdt-interactive-hover');
        variables['interactive-active'] = getCSSVariable('--color-vdt-interactive-active');
        variables['error'] = getCSSVariable('--color-vdt-error');
        variables['error-surface'] = getCSSVariable('--color-vdt-error-surface');
        variables['success'] = getCSSVariable('--color-vdt-success');
        variables['warning'] = getCSSVariable('--color-vdt-warning');

        return variables;
    };

    // 檢查瀏覽器是否支援顏色方案偵測
    const supportsColorScheme = computed(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches !== undefined;
    });

    // 組件掛載時初始化
    onMounted(() => {
        // 訂閱主題變化
        unsubscribe = themeManager.addListener((state) => {
            themeState.value = state;
        });

        // 應用初始設置
        if (options.defaultColor) {
            setColor(options.defaultColor);
        }

        if (options.defaultMode) {
            setMode(options.defaultMode);
        }
    });

    // 組件卸載時清理
    onBeforeUnmount(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    return {
        // 響應式狀態
        themeState,
        isDark,
        isLight,
        isAuto,
        currentMode,
        userPreference,
        systemPreference,
        currentColor,
        themeClasses,
        supportsColorScheme,

        // 主要方法
        setColor,
        setMode,
        toggle,

        // 便利方法 - 模式設置
        setLightMode: () => setMode('light'),
        setDarkMode: () => setMode('dark'),
        setAutoMode: () => setMode('auto'),

        // 便利方法 - 常用顏色設置
        setRedTheme: () => setColor('red'),
        setBlueTheme: () => setColor('blue'),
        setGreenTheme: () => setColor('green'),
        setVioletTheme: () => setColor('violet'),
        setPurpleTheme: () => setColor('purple'),
        setIndigoTheme: () => setColor('indigo'),
        setTealTheme: () => setColor('teal'),
        setCyanTheme: () => setColor('cyan'),
        setSkyTheme: () => setColor('sky'),
        setEmeraldTheme: () => setColor('emerald'),
        setLimeTheme: () => setColor('lime'),
        setYellowTheme: () => setColor('yellow'),
        setAmberTheme: () => setColor('amber'),
        setOrangeTheme: () => setColor('orange'),
        setPinkTheme: () => setColor('pink'),
        setRoseTheme: () => setColor('rose'),
        setFuchsiaTheme: () => setColor('fuchsia'),

        // 工具方法
        getCSSVariable,
        getThemeVariables,
    };
}

// 創建全局主題 Hook（用於跨組件共享主題狀態）
export function createGlobalTheme(config?: UseThemeOptions) {
    if (config) {
        if (config.defaultColor) {
            themeManager.setColor(config.defaultColor);
        }
        if (config.defaultMode) {
            themeManager.setMode(config.defaultMode);
        }
    }

    return useTheme();
}

// 用於組件外部使用的工具函數
export const useThemeUtils = () => ({
    setThemeMode: (mode: ThemeMode) => themeManager.setMode(mode),
    setThemeColor: (color: TailwindColor | string) => themeManager.setColor(color),
    toggleTheme: () => {
        const currentState = themeManager.getState();
        const newMode = currentState.currentMode === 'light' ? 'dark' : 'light';
        themeManager.setMode(newMode);
    },
    getThemeState: () => themeManager.getState(),
    getThemeClasses: () => themeManager.getThemeClasses(),
});

export default useTheme;
