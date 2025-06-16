/**
 * useTheme.ts
 * 針對 DatePicker 公開專案的簡化主題 Composable
 * 配合 Tailwind CSS 4 使用
 */

import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { themeManager, type ThemeMode, type ThemeState } from '../utils/themeManager';
import type { TailwindColor } from '../types/main';

interface UseThemeOptions {
    defaultColor?: TailwindColor | string;
    defaultMode?: ThemeMode;
    instanceId?: string;
}

export function useTheme(options: UseThemeOptions = {}) {
    // 立即創建主題實例，並傳入默認選項
    const instanceId = ref<string>(
        themeManager.createInstance(options.instanceId, {
            defaultColor: options.defaultColor,
            defaultMode: options.defaultMode
        })
    );

    const themeState = ref<ThemeState | null>(
        themeManager.getState(instanceId.value)
    );

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
        return themeManager.getThemeClasses(instanceId.value);
    });

    // 容器屬性（用於組件根元素）
    const containerAttributes = computed(() => {
        if (!instanceId.value) return {};
        return themeManager.getContainerAttributes(instanceId.value);
    });

    // 設置主題顏色
    const setColor = (color: TailwindColor | string): void => {
        if (instanceId.value) {
            themeManager.setColor(instanceId.value, color);
        }
    };

    // 設置主題模式
    const setMode = (mode: ThemeMode): void => {
        if (instanceId.value) {
            themeManager.setMode(instanceId.value, mode);
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

    // 組件掛載時設置監聽器
    onMounted(async () => {
        // 等待 DOM 更新
        await nextTick();

        // 獲取最新狀態
        themeState.value = themeManager.getState(instanceId.value);

        // 訂閱主題變化
        unsubscribe = themeManager.addListener(instanceId.value, (state) => {
            themeState.value = state;
        });

        // 強制重新應用主題（確保 DOM 元素存在後再應用）
        setTimeout(() => {
            themeManager.reapplyTheme(instanceId.value);
        }, 10);
    });

    // 組件卸載時清理
    onBeforeUnmount(() => {
        if (unsubscribe) {
            unsubscribe();
        }

        if (instanceId.value) {
            themeManager.destroyInstance(instanceId.value);
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

export default useTheme;
