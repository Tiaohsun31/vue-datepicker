/**
 * ThemeManager.ts - Tailwind 4 版本
 * 只需要動態更新主題色的 CSS 變數，不需要手動生成工具類別
 */

import type { TailwindColor } from '../types/main';
import { findClosestTailwindColor, getColorShades } from './colorUtils';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeState {
    currentMode: 'light' | 'dark';
    userPreference: ThemeMode;
    systemPreference: 'light' | 'dark';
    color: TailwindColor;
}

class ThemeManager {
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
        this.detectInitialMode();
    }

    private initializeSystemPreference(): void {
        if (typeof window !== 'undefined' && window.matchMedia) {
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.state.systemPreference = this.mediaQuery.matches ? 'dark' : 'light';
            this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
        }
    }

    private handleSystemThemeChange(event: MediaQueryListEvent): void {
        this.state.systemPreference = event.matches ? 'dark' : 'light';
        if (this.state.userPreference === 'auto') {
            this.updateCurrentMode();
        }
    }

    private detectInitialMode(): void {
        this.state.userPreference = 'auto';
        this.updateCurrentMode();
    }

    private updateCurrentMode(): void {
        const previousMode = this.state.currentMode;

        if (this.state.userPreference === 'auto') {
            this.state.currentMode = this.state.systemPreference;
        } else {
            this.state.currentMode = this.state.userPreference;
        }

        if (previousMode !== this.state.currentMode) {
            this.applyModeToDOM();
            this.notifyListeners();
        }
    }

    private applyModeToDOM(): void {
        if (typeof document === 'undefined') return;

        const root = document.documentElement;
        root.classList.remove('light', 'dark');

        if (this.state.currentMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.add('light');
        }
    }

    /**
     * 動態更新主題色 CSS 變數
     * Tailwind 4 會自動使用這些變數生成對應的工具類別
     */
    private applyColorToDOM(): void {
        if (typeof document === 'undefined') return;

        const root = document.documentElement;
        const colorShades = getColorShades(this.state.color);

        // 動態更新主題色變數
        Object.entries(colorShades).forEach(([shade, value]) => {
            root.style.setProperty(`--color-vdt-theme-${shade}`, value);
        });
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener({ ...this.state }));
    }

    /**
     * 設置主題模式
     */
    setMode(mode: ThemeMode): void {
        this.state.userPreference = mode;
        this.updateCurrentMode();
    }

    /**
     * 設置主題顏色
     */
    setColor(color: TailwindColor | string): void {
        const resolvedColor = findClosestTailwindColor(color as string);
        this.state.color = resolvedColor;
        this.applyColorToDOM();
        this.notifyListeners();
    }

    /**
     * 獲取當前狀態
     */
    getState(): ThemeState {
        return { ...this.state };
    }

    /**
     * 獲取主題類別（用於組件根元素）
     */
    getThemeClasses(): Record<string, boolean> {
        return {
            'dark': this.state.currentMode === 'dark',
            'light': this.state.currentMode === 'light',
        };
    }

    addListener(listener: (state: ThemeState) => void): () => void {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    destroy(): void {
        if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
        }
        this.listeners = [];
    }
}

export const themeManager = new ThemeManager();
export default themeManager;
