/**
 * Tailwind CSS 4 主題管理器
 * 適配 Tailwind 4 的新特性和 CSS 層級系統
 */

import type { TailwindColor } from '../types/main';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
    mode: ThemeMode;
    color: TailwindColor | string;
}

export interface ThemeState {
    currentMode: 'light' | 'dark';
    userPreference: ThemeMode;
    systemPreference: 'light' | 'dark';
    color: TailwindColor | string;
}

class Tailwind4ThemeManager {
    private state: ThemeState = {
        currentMode: 'light',
        userPreference: 'auto',
        systemPreference: 'light',
        color: 'violet'
    };

    private mediaQuery: MediaQueryList | null = null;
    private listeners: Array<(state: ThemeState) => void> = [];

    constructor() {
        this.initializeSystemPreference();
        this.detectInitialTheme();
    }

    /**
     * 初始化系統偏好檢測
     */
    private initializeSystemPreference(): void {
        if (typeof window !== 'undefined' && window.matchMedia) {
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.state.systemPreference = this.mediaQuery.matches ? 'dark' : 'light';

            // 監聽系統主題變化
            this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
        }
    }

    /**
     * 處理系統主題變化
     */
    private handleSystemThemeChange(event: MediaQueryListEvent): void {
        this.state.systemPreference = event.matches ? 'dark' : 'light';

        // 如果用戶設置為自動模式，更新當前主題
        if (this.state.userPreference === 'auto') {
            this.updateCurrentTheme();
        }
    }

    /**
     * 檢測初始主題
     */
    private detectInitialTheme(): void {
        if (typeof document !== 'undefined') {
            const root = document.documentElement;

            // 檢查是否有已設置的主題類別
            const hasLightClass = root.classList.contains('light');
            const hasDarkClass = root.classList.contains('dark');

            if (hasLightClass) {
                this.state.userPreference = 'light';
                this.state.currentMode = 'light';
            } else if (hasDarkClass) {
                this.state.userPreference = 'dark';
                this.state.currentMode = 'dark';
            } else {
                // 沒有明確設置，使用系統偏好
                this.state.userPreference = 'auto';
                this.updateCurrentTheme();
            }

            // 檢測顏色主題
            const dataTheme = root.getAttribute('data-theme');
            if (dataTheme) {
                this.state.color = dataTheme;
            }
        }
    }

    /**
     * 更新當前主題
     */
    private updateCurrentTheme(): void {
        const previousMode = this.state.currentMode;

        if (this.state.userPreference === 'auto') {
            this.state.currentMode = this.state.systemPreference;
        } else {
            this.state.currentMode = this.state.userPreference;
        }

        // 如果主題發生變化，應用到 DOM
        if (previousMode !== this.state.currentMode) {
            this.applyThemeToDOM();
            this.notifyListeners();
        }
    }

    /**
     * 應用主題到 DOM（適配 Tailwind 4）
     */
    private applyThemeToDOM(): void {
        if (typeof document === 'undefined') return;

        const root = document.documentElement;

        // 設置明暗模式類別（Tailwind 4 仍然使用 class 策略）
        root.classList.remove('light', 'dark');

        if (this.state.currentMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.add('light');
        }

        // 設置顏色主題（使用 data-theme 屬性）
        root.setAttribute('data-theme', this.state.color as string);
    }

    /**
     * 通知監聽器
     */
    private notifyListeners(): void {
        this.listeners.forEach(listener => listener({ ...this.state }));
    }

    /**
     * 設置主題模式
     */
    setThemeMode(mode: ThemeMode): void {
        this.state.userPreference = mode;
        this.updateCurrentTheme();

        // 保存到 localStorage
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('vdt-theme-mode', mode);
        }
    }

    /**
     * 設置主題顏色
     */
    setThemeColor(color: TailwindColor | string): void {
        this.state.color = color;

        // 直接應用到 DOM（Tailwind 4 方式）
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', color as string);
        }

        this.notifyListeners();

        // 保存到 localStorage
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('vdt-theme-color', color as string);
        }
    }

    /**
     * 設置完整主題配置
     */
    setTheme(config: Partial<ThemeConfig>): void {
        if (config.color) {
            this.state.color = config.color;
        }

        if (config.mode) {
            this.state.userPreference = config.mode;
        }

        this.updateCurrentTheme();

        // 保存到 localStorage
        if (typeof localStorage !== 'undefined') {
            if (config.mode) {
                localStorage.setItem('vdt-theme-mode', config.mode);
            }
            if (config.color) {
                localStorage.setItem('vdt-theme-color', config.color as string);
            }
        }
    }

    /**
     * 從 localStorage 載入主題設置
     */
    loadFromStorage(): void {
        if (typeof localStorage === 'undefined') return;

        const savedMode = localStorage.getItem('vdt-theme-mode') as ThemeMode;
        const savedColor = localStorage.getItem('vdt-theme-color');

        if (savedMode && ['light', 'dark', 'auto'].includes(savedMode)) {
            this.state.userPreference = savedMode;
        }

        if (savedColor) {
            this.state.color = savedColor;
        }

        this.updateCurrentTheme();
    }

    /**
     * 切換主題模式（在 light 和 dark 之間）
     */
    toggleTheme(): void {
        const newMode = this.state.currentMode === 'light' ? 'dark' : 'light';
        this.setThemeMode(newMode);
    }

    /**
     * 獲取當前主題狀態
     */
    getThemeState(): ThemeState {
        return { ...this.state };
    }

    /**
     * 檢查當前是否為深色模式
     */
    isDarkMode(): boolean {
        return this.state.currentMode === 'dark';
    }

    /**
     * 檢查當前是否為淺色模式
     */
    isLightMode(): boolean {
        return this.state.currentMode === 'light';
    }

    /**
     * 檢查是否正在使用系統偏好
     */
    isAutoMode(): boolean {
        return this.state.userPreference === 'auto';
    }

    /**
     * 添加主題變化監聽器
     */
    addListener(listener: (state: ThemeState) => void): () => void {
        this.listeners.push(listener);

        // 返回移除監聽器的函數
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    /**
     * 移除所有監聽器
     */
    removeAllListeners(): void {
        this.listeners = [];
    }

    /**
     * 獲取系統偏好的主題
     */
    getSystemPreference(): 'light' | 'dark' {
        return this.state.systemPreference;
    }

    /**
     * 重置主題到默認設置
     */
    reset(): void {
        this.state = {
            currentMode: 'light',
            userPreference: 'auto',
            systemPreference: this.state.systemPreference,
            color: 'violet'
        };

        this.updateCurrentTheme();

        // 清除 localStorage
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('vdt-theme-mode');
            localStorage.removeItem('vdt-theme-color');
        }
    }

    /**
     * 銷毀主題管理器
     */
    destroy(): void {
        if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
        }
        this.removeAllListeners();
    }
}

// 創建全局主題管理器實例
export const themeManager = new Tailwind4ThemeManager();

// 導出便利函數
export const setTheme = (config: Partial<ThemeConfig>) => themeManager.setTheme(config);
export const setThemeMode = (mode: ThemeMode) => themeManager.setThemeMode(mode);
export const setThemeColor = (color: TailwindColor | string) => themeManager.setThemeColor(color);
export const toggleTheme = () => themeManager.toggleTheme();
export const getThemeState = () => themeManager.getThemeState();
export const isDarkMode = () => themeManager.isDarkMode();
export const isLightMode = () => themeManager.isLightMode();
export const loadThemeFromStorage = () => themeManager.loadFromStorage();

// 自動初始化（在瀏覽器環境中）
if (typeof window !== 'undefined') {
    // 載入儲存的設置
    themeManager.loadFromStorage();
}

export default themeManager;
