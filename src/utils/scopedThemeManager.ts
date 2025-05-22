/**
 * scopedThemeManager.ts
 * 局部作用域的主題管理器，只影響特定組件，不影響全域網頁
 */

import type { TailwindColor } from '../types/main';
import { findClosestTailwindColor, getColorShades } from './colorUtils';

export type ScopedThemeMode = 'light' | 'dark' | 'auto';

export interface ScopedThemeState {
    // 當前實際應用的模式
    currentMode: 'light' | 'dark';
    // 用戶設定的偏好（auto = 跟隨系統）
    userPreference: ScopedThemeMode;
    // 系統偏好
    systemPreference: 'light' | 'dark';
    // 主題顏色
    color: TailwindColor;
    // 組件實例 ID（用於區分不同的 DatePicker 實例）
    instanceId: string;
}

class ScopedThemeManager {
    private instances: Map<string, ScopedThemeState> = new Map();
    private mediaQuery: MediaQueryList | null = null;
    private listeners: Map<string, Array<(state: ScopedThemeState) => void>> = new Map();

    constructor() {
        this.initializeSystemPreference();
    }

    /**
     * 初始化系統偏好檢測
     */
    private initializeSystemPreference(): void {
        if (typeof window !== 'undefined' && window.matchMedia) {
            this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
        }
    }

    /**
     * 處理系統主題變化
     */
    private handleSystemThemeChange(event: MediaQueryListEvent): void {
        const systemPreference = event.matches ? 'dark' : 'light';

        // 更新所有實例的系統偏好
        this.instances.forEach((state, instanceId) => {
            state.systemPreference = systemPreference;

            // 如果是 auto 模式，更新當前模式
            if (state.userPreference === 'auto') {
                this.updateCurrentMode(instanceId);
            }
        });
    }

    /**
     * 獲取當前系統偏好
     */
    private getSystemPreference(): 'light' | 'dark' {
        if (this.mediaQuery) {
            return this.mediaQuery.matches ? 'dark' : 'light';
        }
        return 'light';
    }

    /**
     * 創建新的主題實例
     */
    createInstance(instanceId?: string): string {
        const id = instanceId || this.generateInstanceId();

        const initialState: ScopedThemeState = {
            currentMode: 'light',
            userPreference: 'auto',
            systemPreference: this.getSystemPreference(),
            color: 'violet',
            instanceId: id
        };

        this.instances.set(id, initialState);
        this.listeners.set(id, []);

        // 初始化當前模式
        this.updateCurrentMode(id);

        return id;
    }

    /**
     * 銷毀主題實例
     */
    destroyInstance(instanceId: string): void {
        this.instances.delete(instanceId);
        this.listeners.delete(instanceId);
    }

    /**
     * 生成實例 ID
     */
    private generateInstanceId(): string {
        return `vdt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 更新當前模式
     */
    private updateCurrentMode(instanceId: string): void {
        const state = this.instances.get(instanceId);
        if (!state) return;

        const previousMode = state.currentMode;

        if (state.userPreference === 'auto') {
            state.currentMode = state.systemPreference;
        } else {
            state.currentMode = state.userPreference;
        }

        // 如果模式發生變化，應用到 DOM 並通知監聽器
        if (previousMode !== state.currentMode) {
            this.applyModeToDOM(instanceId);
            this.notifyListeners(instanceId);
        }
    }

    /**
     * 應用模式到特定的 DOM 元素
     */
    private applyModeToDOM(instanceId: string): void {
        if (typeof document === 'undefined') return;

        const state = this.instances.get(instanceId);
        console.log('applyModeToDOM', state);
        if (!state) return;

        // 找到對應的組件容器
        const container = document.querySelector(`[data-vdt-instance="${instanceId}"]`);
        if (!container) return;

        // 設置局部的 data-vdt-mode 屬性
        if (state.userPreference === 'auto') {
            // auto 模式時移除屬性，讓它跟隨系統偏好
            container.removeAttribute('data-vdt-mode');
        } else {
            // 明確設定模式時設置屬性
            container.setAttribute('data-vdt-mode', state.currentMode);
        }
    }

    /**
     * 應用顏色到特定的 DOM 元素
     */
    private applyColorToDOM(instanceId: string): void {
        if (typeof document === 'undefined') return;

        const state = this.instances.get(instanceId);
        if (!state) return;

        const container = document.querySelector(`[data-vdt-instance="${instanceId}"]`) as HTMLElement;
        if (!container) return;

        // 動態更新主題色變數（僅在該容器內）
        const colorShades = getColorShades(state.color);
        Object.entries(colorShades).forEach(([shade, value]) => {
            container.style.setProperty(`--color-vdt-theme-${shade}`, value);
        });
    }

    /**
     * 通知監聽器
     */
    private notifyListeners(instanceId: string): void {
        const state = this.instances.get(instanceId);
        const listeners = this.listeners.get(instanceId);

        if (state && listeners) {
            listeners.forEach(listener => listener({ ...state }));
        }
    }

    /**
     * 設置主題模式
     */
    setMode(instanceId: string, mode: ScopedThemeMode): void {
        const state = this.instances.get(instanceId);
        if (!state) return;

        state.userPreference = mode;
        this.updateCurrentMode(instanceId);
    }

    /**
     * 設置主題顏色
     */
    setColor(instanceId: string, color: TailwindColor | string): void {
        const state = this.instances.get(instanceId);
        if (!state) return;

        const resolvedColor = findClosestTailwindColor(color as string);
        state.color = resolvedColor;
        this.applyColorToDOM(instanceId);
        this.notifyListeners(instanceId);
    }

    /**
     * 獲取實例狀態
     */
    getState(instanceId: string): ScopedThemeState | null {
        const state = this.instances.get(instanceId);
        return state ? { ...state } : null;
    }

    /**
     * 獲取主題類別（用於組件）
     */
    getThemeClasses(instanceId: string): Record<string, boolean> {
        const state = this.instances.get(instanceId);
        if (!state) return {};

        return {
            // 添加實例標識
            [`vdt-instance-${instanceId}`]: true,
        };
    }

    /**
     * 獲取容器屬性
     */
    getContainerAttributes(instanceId: string): Record<string, string> {
        const state = this.instances.get(instanceId);
        if (!state) return {};

        const attributes: Record<string, string> = {
            'data-vdt-instance': instanceId,
        };

        // 只有在非 auto 模式時才設置 data-vdt-mode
        if (state.userPreference !== 'auto') {
            attributes['data-vdt-mode'] = state.currentMode;
        }

        return attributes;
    }

    /**
     * 添加監聽器
     */
    addListener(instanceId: string, listener: (state: ScopedThemeState) => void): () => void {
        const listeners = this.listeners.get(instanceId);
        if (!listeners) return () => { };

        listeners.push(listener);

        return () => {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }

    /**
     * 銷毀管理器
     */
    destroy(): void {
        if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange.bind(this));
        }
        this.instances.clear();
        this.listeners.clear();
    }
}

// 創建全局實例
export const scopedThemeManager = new ScopedThemeManager();
export default scopedThemeManager;
