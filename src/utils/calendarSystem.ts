// utils/calendarSystem.ts - 基於靜態導入的日曆系統
import {
    CalendarDate,
    createCalendar,
    toCalendar,
    parseDate,
    today,
    getLocalTimeZone,
    type Calendar
} from '@internationalized/date';
import type { SimpleDateValue } from './dateUtils';
import type { CalendarPlugin } from '@/types/calendarPlugin';

// === 靜態導入已批准的插件 ===
import { createRocCalendarPlugin } from '@/plugins/calendars/RocCalendarPlugin';
// import { createBuddhistCalendarPlugin } from '@/plugins/calendars/BuddhistCalendarPlugin';
// import { createJapaneseCalendarPlugin } from '@/plugins/calendars/JapaneseCalendarPlugin';
// 未來的插件在這裡添加...

export type SupportedCalendar = 'gregory' | string; // 開放給社群擴展

/**
 * 靜態插件註冊器 - 使用靜態導入避免路徑問題
 */
class StaticPluginRegistry {
    private plugins = new Map<string, CalendarPlugin>();
    private initialized = false;

    /**
     * 初始化已批准的插件（使用靜態導入）
     */
    async initializeApprovedPlugins(): Promise<void> {
        if (this.initialized) return;

        console.log('🔍 正在載入已批准的日曆插件...');

        // 已批准的插件列表 - 使用靜態導入
        const approvedPlugins: Array<{ id: string; factory: () => CalendarPlugin }> = [
            { id: 'roc', factory: createRocCalendarPlugin },
            // { id: 'buddhist', factory: createBuddhistCalendarPlugin },
            // { id: 'japanese', factory: createJapaneseCalendarPlugin },
            // 未來通過審核的插件在這裡添加
        ];

        // 同步載入所有插件
        for (const { id, factory } of approvedPlugins) {
            try {
                const plugin = factory();
                this.plugins.set(id, plugin);
                console.log(`✅ 載入插件: ${plugin.displayName['zh-TW'] || plugin.displayName['en-US'] || id}`);
            } catch (error) {
                console.warn(`❌ 載入插件失敗 ${id}:`, error);
            }
        }

        this.initialized = true;
        console.log(`🎉 日曆系統初始化完成，共載入 ${this.plugins.size} 個插件`);
    }

    /**
     * 獲取插件（同步）
     */
    get(id: string): CalendarPlugin | null {
        return this.plugins.get(id) || null;
    }

    /**
     * 檢查是否支援指定日曆
     */
    isSupported(id: string): boolean {
        return id === 'gregory' || this.plugins.has(id);
    }

    /**
     * 獲取所有可用的日曆
     */
    getSupportedCalendars(locale: string = 'zh-TW'): Array<{ id: string; name: string; yearRange: { min: number; max: number } }> {
        const calendars = [
            {
                id: 'gregory',
                name: locale.startsWith('zh') ? '西元曆' : 'Gregorian',
                yearRange: { min: 1900, max: 2100 }
            }
        ];

        // 添加所有已載入的插件
        for (const plugin of this.plugins.values()) {
            calendars.push({
                id: plugin.id,
                name: plugin.displayName[locale] || plugin.displayName['en-US'] || plugin.id,
                yearRange: plugin.yearRange
            });
        }

        return calendars;
    }

    /**
     * 手動註冊插件（供開發時使用）
     */
    register(plugin: CalendarPlugin): void {
        this.plugins.set(plugin.id, plugin);
        console.log(`📝 手動註冊插件: ${plugin.displayName['zh-TW'] || plugin.displayName['en-US'] || plugin.id}`);
    }

    /**
     * 獲取所有已載入的插件
     */
    getAllPlugins(): CalendarPlugin[] {
        return Array.from(this.plugins.values());
    }

    /**
     * 檢查是否已初始化
     */
    isInitialized(): boolean {
        return this.initialized;
    }
}

// 全域插件註冊器
const pluginRegistry = new StaticPluginRegistry();

/**
 * 統一的日曆系統 - 使用靜態插件架構
 */
export class UnifiedCalendarSystem {
    private calendar: Calendar;
    private calendarId: string;
    private plugin: CalendarPlugin | null = null;

    constructor(calendarId: string = 'gregory') {
        this.calendarId = calendarId;
        this.calendar = this.createInternationalizedCalendar(calendarId);
    }

    /**
     * 創建 @internationalized/date 的日曆實例
     */
    private createInternationalizedCalendar(calendarId: string): Calendar {
        try {
            return createCalendar(calendarId as any);
        } catch (error) {
            console.warn(`無法創建日曆 ${calendarId}，回退到西元曆`, error);
            this.calendarId = 'gregory';
            return createCalendar('gregory');
        }
    }

    /**
     * 初始化 - 尋找並載入對應的插件
     */
    async initialize(): Promise<void> {
        // 確保插件註冊器已初始化
        await pluginRegistry.initializeApprovedPlugins();

        if (this.calendarId !== 'gregory') {
            console.log(`🔍 正在尋找 ${this.calendarId} 日曆插件...`);

            this.plugin = pluginRegistry.get(this.calendarId);

            if (this.plugin) {
                console.log(`✅ 找到並載入了 ${this.calendarId} 插件`);
            } else {
                console.warn(`❌ 未找到 ${this.calendarId} 插件，將只支援西元曆格式輸入`);
            }
        }
    }

    /**
     * 智能解析輸入 - 優先嘗試插件，回退到西元曆
     */
    parseInput(input: string): {
        success: boolean;
        date: SimpleDateValue | null;
        source: 'gregorian' | 'plugin' | 'internationalized';
    } {
        if (!input?.trim()) {
            return { success: false, date: null, source: 'gregorian' };
        }

        // 1. 如果有對應的插件，優先使用插件解析本地格式
        if (this.plugin) {
            const pluginResult = this.plugin.parseInput(input);
            if (pluginResult) {
                console.debug(`✅ 使用 ${this.calendarId} 插件解析成功`);
                return { success: true, date: pluginResult, source: 'plugin' };
            }
        }

        // 2. 嘗試西元曆解析（所有日曆都支援西元曆輸入）
        const gregorianResult = this.parseGregorianInput(input);
        if (gregorianResult) {
            console.debug(`✅ 使用西元曆格式解析成功`);
            return { success: true, date: gregorianResult, source: 'gregorian' };
        }

        // 3. 最後嘗試用 @internationalized/date 解析
        try {
            const parsedDate = parseDate(input);
            const result = this.fromCalendarDate(parsedDate);
            if (result) {
                console.debug(`✅ 使用 @internationalized/date 解析成功`);
                return { success: true, date: result, source: 'internationalized' };
            }
        } catch {
            // 解析失敗，繼續
        }

        console.debug(`❌ 所有解析方式都失敗了`);
        return { success: false, date: null, source: 'gregorian' };
    }

    /**
     * 解析西元曆輸入（所有日曆的共同支援）
     */
    private parseGregorianInput(input: string): SimpleDateValue | null {
        const cleaned = input
            .replace(/^(西元|公元|AD\s*)/i, '')
            .trim();

        const patterns = [
            /^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/,    // YYYY-MM-DD
            /^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/,    // MM-DD-YYYY 或 DD-MM-YYYY
        ];

        for (const pattern of patterns) {
            const match = cleaned.match(pattern);
            if (match) {
                let year: number, month: number, day: number;

                if (pattern === patterns[0]) {
                    year = parseInt(match[1]);
                    month = parseInt(match[2]);
                    day = parseInt(match[3]);
                } else {
                    const part1 = parseInt(match[1]);
                    const part2 = parseInt(match[2]);
                    year = parseInt(match[3]);

                    if (part1 > 12) {
                        day = part1;
                        month = part2;
                    } else {
                        month = part1;
                        day = part2;
                    }
                }

                if (year >= 1900 && year <= 2100 &&
                    month >= 1 && month <= 12 &&
                    day >= 1 && day <= 31) {
                    return { year, month, day };
                }
            }
        }

        return null;
    }

    /**
     * 格式化輸出 - 優先使用插件，回退到西元曆
     */
    formatOutput(date: SimpleDateValue, format: string, locale: string = 'zh-TW'): string {
        if (!date) return '';

        // 如果有插件且不是明確的西元曆格式，使用插件格式化
        if (this.plugin && !format.startsWith('YYYY') && !format.includes('gregorian')) {
            try {
                return this.plugin.format(date, format, locale);
            } catch (error) {
                console.warn(`插件格式化失敗，回退到西元曆格式:`, error);
            }
        }

        // 使用西元曆格式化
        return this.formatGregorianDate(date, format);
    }

    /**
     * 格式化西元曆日期
     */
    private formatGregorianDate(date: SimpleDateValue, format: string): string {
        const { year, month, day } = date;

        return format
            .replace('YYYY', year.toString())
            .replace('YY', year.toString().slice(-2))
            .replace('MM', month.toString().padStart(2, '0'))
            .replace('M', month.toString())
            .replace('DD', day.toString().padStart(2, '0'))
            .replace('D', day.toString());
    }

    /**
     * 轉換為 CalendarDate（給 @internationalized/date 顯示用）
     */
    toCalendarDate(date: SimpleDateValue): CalendarDate | null {
        try {
            const gregorianDate = new CalendarDate(date.year, date.month, date.day);

            // 轉換到目標日曆系統顯示
            if (this.calendarId !== 'gregory') {
                return toCalendar(gregorianDate, this.calendar);
            }

            return gregorianDate;
        } catch (error) {
            console.error('無法創建 CalendarDate:', error);
            return null;
        }
    }

    /**
     * 從 CalendarDate 轉回 SimpleDateValue（內部統一西元曆）
     */
    fromCalendarDate(calendarDate: CalendarDate): SimpleDateValue | null {
        try {
            if (this.calendarId !== 'gregory') {
                const gregorianCalendar = createCalendar('gregory');
                const gregorianDate = toCalendar(calendarDate, gregorianCalendar);
                return {
                    year: gregorianDate.year,
                    month: gregorianDate.month,
                    day: gregorianDate.day
                };
            }

            return {
                year: calendarDate.year,
                month: calendarDate.month,
                day: calendarDate.day
            };
        } catch (error) {
            console.error('無法轉換 CalendarDate:', error);
            return null;
        }
    }

    /**
     * 獲取今天的日期
     */
    getToday(): CalendarDate {
        try {
            const todayDate = today(getLocalTimeZone());
            if (this.calendarId !== 'gregory') {
                return toCalendar(todayDate, this.calendar);
            }
            return todayDate;
        } catch (error) {
            console.error('無法獲取今天日期:', error);
            const now = new Date();
            return new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
        }
    }

    /**
     * 驗證日期
     */
    isValidDate(date: SimpleDateValue): boolean {
        try {
            const calendarDate = this.toCalendarDate(date);
            if (!calendarDate) return false;

            if (this.plugin) {
                return this.plugin.isValid(date);
            }

            return true;
        } catch {
            return false;
        }
    }

    /**
     * 獲取 placeholder 文字
     */
    getPlaceholders(locale: string = 'zh-TW'): { year: string; month: string; day: string } {
        if (this.plugin) {
            const yearPlaceholder = this.plugin.placeholders[locale] ||
                this.plugin.placeholders['zh-TW'] ||
                '年';
            return {
                year: yearPlaceholder,
                month: '月',
                day: '日'
            };
        }

        const defaults = {
            'zh-TW': { year: '西元年', month: '月', day: '日' },
            'zh-CN': { year: '西元年', month: '月', day: '日' },
            'en-US': { year: 'Year', month: 'Month', day: 'Day' },
            'ja-JP': { year: '西暦年', month: '月', day: '日' }
        };

        return defaults[locale as keyof typeof defaults] || defaults['zh-TW'];
    }

    /**
     * 切換日曆系統 - 同步操作
     */
    setCalendar(calendarId: string): boolean {
        console.log(`🔄 切換到日曆系統: ${calendarId}`);

        // 檢查是否支援
        if (!pluginRegistry.isSupported(calendarId) && calendarId !== 'gregory') {
            console.warn(`❌ 不支援的日曆系統: ${calendarId}`);
            return false;
        }

        try {
            const newCalendar = this.createInternationalizedCalendar(calendarId);
            this.calendarId = calendarId;
            this.calendar = newCalendar;

            // 載入對應的插件
            this.plugin = calendarId === 'gregory' ? null : pluginRegistry.get(calendarId);

            return true;
        } catch (error) {
            console.warn(`❌ 切換日曆失敗: ${calendarId}`, error);
            return false;
        }
    }

    /**
     * 獲取當前日曆 ID
     */
    getCurrentCalendar(): string {
        return this.calendarId;
    }

    /**
     * 獲取支援的格式範例
     */
    getSupportedFormats(): string[] {
        const formats = ['YYYY-MM-DD', 'YYYY/MM/DD']; // 西元曆格式

        if (this.plugin && 'getSupportedInputFormats' in this.plugin) {
            const pluginFormats = (this.plugin as any).getSupportedInputFormats?.();
            if (Array.isArray(pluginFormats)) {
                formats.push(...pluginFormats);
            }
        }

        return formats;
    }
}

/**
 * 工廠函數 - 創建日曆系統並自動載入插件
 */
export async function createCalendarSystem(calendarId: string = 'gregory'): Promise<UnifiedCalendarSystem> {
    const system = new UnifiedCalendarSystem(calendarId);
    await system.initialize();
    return system;
}

/**
 * 獲取所有支援的日曆
 */
export function getSupportedCalendars(locale: string = 'zh-TW') {
    return pluginRegistry.getSupportedCalendars(locale);
}

/**
 * 手動註冊插件（供開發時測試使用）
 */
export function registerCalendarPlugin(plugin: CalendarPlugin): void {
    pluginRegistry.register(plugin);
}

/**
 * 檢查是否支援指定日曆
 */
export function isCalendarSupported(calendarId: string): boolean {
    return pluginRegistry.isSupported(calendarId);
}

/**
 * 初始化日曆系統
 */
export async function initializeCalendarSystem(): Promise<void> {
    await pluginRegistry.initializeApprovedPlugins();
}
