/**
 * useScopedTheme.ts
 * 局部作用域的主題 Composable，不影響全域網頁
 */

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { scopedThemeManager, type ScopedThemeMode, type ScopedThemeState } from '../utils/scopedThemeManager';
import type { TailwindColor } from '../types/main';

interface UseScopedThemeOptions {
    defaultColor?: TailwindColor | string;
    defaultMode?: ScopedThemeMode;
    instanceId?: string;
}

export function useScopedTheme(options: UseScopedThemeOptions = {}) {
    // 創建主題實例
    const instanceId = ref<string>('');
    const themeState = ref<ScopedThemeState | null>(null);
    let unsubscribe: (() => void) | null = null;

    // 響應式計算屬性
    const isDark = computed(() => themeState.value?.currentMode === 'dark');
    const isLight = computed(() => themeState.value?.currentMode === 'light');
    const isAuto = computed(() => themeState.value?.userPreference === 'auto');
    const currentMode = computed(() => themeState.value?.currentMode || 'light');
    const userPreference = computed(() => themeState.value?.userPreference || 'auto');
    const systemPreference = computed(() => themeState.value?.systemPreference || 'light');
    const currentColor = computed(() => themeState.value?.color || 'violet');

    // 主題類別（用於組件根元素的 :class 綁定）
    const themeClasses = computed(() => {
        if (!instanceId.value) return {};
        return scopedThemeManager.getThemeClasses(instanceId.value);
    });

    // 容器屬性（用於組件根元素）
    const containerAttributes = computed(() => {
        if (!instanceId.value) return {};
        return scopedThemeManager.getContainerAttributes(instanceId.value);
    });

    // 設置主題顏色
    const setColor = (color: TailwindColor | string): void => {
        if (instanceId.value) {
            scopedThemeManager.setColor(instanceId.value, color);
        }
    };

    // 設置主題模式
    const setMode = (mode: ScopedThemeMode): void => {
        if (instanceId.value) {
            scopedThemeManager.setMode(instanceId.value, mode);
        }
    };

    // 切換深淺模式
    const toggle = (): void => {
        if (!themeState.value) return;

        // 如果當前是 auto 模式，先切換到相反的固定模式
        if (themeState.value.userPreference === 'auto') {
            const newMode = themeState.value.currentMode === 'light' ? 'dark' : 'light';
            setMode(newMode);
        } else {
            // 如果已經是固定模式，切換到相反模式
            const newMode = themeState.value.currentMode === 'light' ? 'dark' : 'light';
            setMode(newMode);
        }
    };

    // 檢查瀏覽器是否支援顏色方案偵測
    const supportsColorScheme = computed(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches !== undefined;
    });

    // 組件掛載時初始化
    onMounted(() => {
        // 創建主題實例
        instanceId.value = scopedThemeManager.createInstance(options.instanceId);

        // 獲取初始狀態
        themeState.value = scopedThemeManager.getState(instanceId.value);

        // 訂閱主題變化
        unsubscribe = scopedThemeManager.addListener(instanceId.value, (state) => {
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

        if (instanceId.value) {
            scopedThemeManager.destroyInstance(instanceId.value);
        }
    });

    return {
        // 響應式狀態
        instanceId,
        themeState,
        isDark,
        isLight,
        isAuto,
        currentMode,
        userPreference,
        systemPreference,
        currentColor,
        themeClasses,
        containerAttributes,
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
    };
}

export default useScopedTheme;
