// utils/calendarRegistry.ts - 更新後的日曆註冊系統
import type { CalendarPlugin, CalendarRegistry, CalendarUtils, CalendarConfig } from '@/types/calendarPlugin';
import type { SimpleDateValue } from './dateUtils';
import dayjs from 'dayjs';

/**
 * 日曆註冊系統實作
 */
class CalendarRegistryImpl implements CalendarRegistry {
    private plugins = new Map<string, CalendarPlugin>();

    register(plugin: CalendarPlugin): void {
        this.plugins.set(plugin.id, plugin);
        console.log(`已註冊日曆插件: ${plugin.displayName['zh-TW'] || plugin.displayName['en-US'] || plugin.id}`);
    }

    get(id: string): CalendarPlugin | null {
        return this.plugins.get(id) || null;
    }

    getAll(): CalendarPlugin[] {
        return Array.from(this.plugins.values());
    }

    isSupported(id: string): boolean {
        return id === 'gregory' || this.plugins.has(id);
    }

    getSupportedList(locale: string = 'zh-TW') {
        return Array.from(this.plugins.values()).map(plugin => ({
            id: plugin.id,
            name: plugin.displayName[locale] || plugin.displayName['en-US'] || plugin.id,
            yearRange: plugin.yearRange
        }));
    }
}

/**
 * 日曆工具類實作
 */
class CalendarUtilsImpl implements CalendarUtils {
    constructor(private registry: CalendarRegistry) { }

    /**
     * 智能解析輸入 - 先嘗試指定日曆，再嘗試西元曆
     */
    parseInput(input: string, calendarId: string): {
        success: boolean;
        date: SimpleDateValue | null;
        source: 'gregorian' | string;
    } {
        if (!input || typeof input !== 'string') {
            return { success: false, date: null, source: 'gregorian' };
        }

        // 1. 先嘗試用指定的日曆解析
        if (calendarId !== 'gregory') {
            const plugin = this.registry.get(calendarId);
            if (plugin) {
                const result = plugin.parseInput(input);
                if (result) {
                    return { success: true, date: result, source: calendarId };
                }
            }
        }

        // 2. 嘗試用西元曆解析
        const gregorianResult = this.parseGregorianInput(input);
        if (gregorianResult) {
            return { success: true, date: gregorianResult, source: 'gregorian' };
        }

        return { success: false, date: null, source: 'gregorian' };
    }

    /**
     * 解析西元曆輸入
     */
    private parseGregorianInput(input: string): SimpleDateValue | null {
        // 移除常見的前綴和後綴
        const cleaned = input
            .replace(/^(西元|公元|AD\s*)/i, '')
            .replace(/[年月日]/g, '')
            .trim();

        // 使用 dayjs 嘗試解析
        const parsed = dayjs(cleaned);
        if (!parsed.isValid()) return null;

        return {
            year: parsed.year(),
            month: parsed.month() + 1,
            day: parsed.date(),
            hour: parsed.hour(),
            minute: parsed.minute(),
            second: parsed.second()
        };
    }

    /**
     * 格式化輸出
     */
    formatOutput(
        date: SimpleDateValue,
        calendarId: string,
        format: string,
        locale: string
    ): string {
        if (!date) return '';

        // 如果是西元曆，直接用 dayjs 格式化
        if (calendarId === 'gregory') {
            const jsDate = new Date(date.year, date.month - 1, date.day,
                date.hour || 0, date.minute || 0, date.second || 0);
            return dayjs(jsDate).format(format);
        }

        // 使用對應的日曆插件格式化
        const plugin = this.registry.get(calendarId);
        if (!plugin) {
            console.warn(`找不到日曆插件: ${calendarId}，回退到西元曆`);
            const jsDate = new Date(date.year, date.month - 1, date.day);
            return dayjs(jsDate).format(format);
        }

        return plugin.format(date, format, locale);
    }

    /**
     * 驗證日期
     */
    validate(date: SimpleDateValue, calendarId: string): boolean {
        if (!date) return false;

        // 西元曆驗證
        if (calendarId === 'gregory') {
            const jsDate = dayjs(`${date.year}-${date.month}-${date.day}`);
            return jsDate.isValid();
        }

        // 使用對應的日曆插件驗證
        const plugin = this.registry.get(calendarId);
        if (!plugin) return false;

        return plugin.isValid(date);
    }

    /**
     * 取得日曆配置
     */
    getConfig(calendarId: string): CalendarConfig | null {
        // 西元曆的預設配置
        if (calendarId === 'gregory') {
            return {
                id: 'gregory',
                placeholders: {
                    'zh-TW': '西元年',
                    'zh-CN': '西元年',
                    'en-US': 'Year',
                    'ja-JP': '西暦年'
                },
                yearRange: { min: 1900, max: 2100 },
                displayName: {
                    'zh-TW': '西元曆',
                    'zh-CN': '西元历',
                    'en-US': 'Gregorian Calendar',
                    'ja-JP': '西暦'
                },
                isBuiltIn: true
            };
        }

        // 使用插件配置
        const plugin = this.registry.get(calendarId);
        if (!plugin) return null;

        return plugin.getConfig();
    }
}

// 全域實例
export const calendarRegistry = new CalendarRegistryImpl();
export const calendarUtils = new CalendarUtilsImpl(calendarRegistry);

// 預設註冊西元曆（虛擬插件，實際由現有邏輯處理）
console.log('✅ 已註冊日曆插件: 西元曆 (內建)');

// 自動註冊可用的日曆插件
export async function registerDefaultCalendars() {
    try {
        // 註冊 ROC 日曆
        const { createRocCalendarPlugin } = await import('../plugins/calendars/RocCalendarPlugin');
        calendarRegistry.register(createRocCalendarPlugin());

        // 註冊 Buddhist 日曆
        const { createBuddhistCalendarPlugin } = await import('../plugins/calendars/BuddhistCalendarPlugin');
        calendarRegistry.register(createBuddhistCalendarPlugin());

    } catch (error) {
        console.warn('載入日曆插件時發生錯誤:', error);
    }
}

/**
 * 日曆輔助函數 - 提供給組件使用的簡化 API
 */
export class CalendarHelper {
    /**
     * 解析使用者輸入（包含智能雙向解析）
     */
    static parseUserInput(input: string, calendar: string): SimpleDateValue | null {
        const result = calendarUtils.parseInput(input, calendar);
        return result.success ? result.date : null;
    }

    /**
     * 格式化使用者輸出
     */
    static formatUserOutput(
        date: SimpleDateValue,
        calendar: string,
        format: string,
        locale: string = 'zh-TW'
    ): string {
        return calendarUtils.formatOutput(date, calendar, format, locale);
    }

    /**
     * 取得日曆的 placeholder 文字
     */
    static getPlaceholders(calendar: string, locale: string = 'zh-TW'): {
        year: string;
        month: string;
        day: string;
    } {
        const config = calendarUtils.getConfig(calendar);
        if (!config) {
            return { year: '年', month: '月', day: '日' };
        }

        const yearPlaceholder = config.placeholders[locale] || config.placeholders['zh-TW'] || '年';

        return {
            year: yearPlaceholder,
            month: '月',
            day: '日'
        };
    }

    /**
     * 取得年份範圍
     */
    static getYearRange(calendar: string): { min: number; max: number } {
        const config = calendarUtils.getConfig(calendar);
        return config?.yearRange || { min: 1900, max: 2100 };
    }

    /**
     * 驗證日期
     */
    static validateDate(date: SimpleDateValue, calendar: string): boolean {
        return calendarUtils.validate(date, calendar);
    }

    /**
     * 取得支援的日曆列表（用於 UI 選擇器）
     */
    static getSupportedCalendars(locale: string = 'zh-TW') {
        return [
            { id: 'gregory', name: '西元曆', yearRange: { min: 1900, max: 2100 } },
            ...calendarRegistry.getSupportedList(locale)
        ];
    }

    /**
     * 檢查是否支援指定日曆
     */
    static isSupported(calendar: string): boolean {
        return calendarRegistry.isSupported(calendar);
    }

    /**
     * 取得日曆配置
     */
    static getConfig(calendar: string): CalendarConfig | null {
        return calendarUtils.getConfig(calendar);
    }
}

/**
 * 註冊函數
 */
export function registerCalendarPlugin(plugin: CalendarPlugin): void {
    calendarRegistry.register(plugin);
}

/**
 * 初始化日曆系統
 */
export function initializeCalendarSystem(): Promise<void> {
    return registerDefaultCalendars();
}
