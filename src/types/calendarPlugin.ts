// types/calendarPlugin.ts
import { type SimpleDateValue } from '@/utils/dateUtils';

/**
 * 日曆配置介面
 */
export interface CalendarConfig {
    /** 日曆識別碼 */
    id: string;
    /** 日曆顯示名稱（多語言） */
    displayName: Record<string, string>;
    /** 年份範圍 */
    yearRange: { min: number; max: number };
    /** 輸入提示文字 */
    placeholders: Record<string, string>;
    /** 是否為預設支援 */
    isBuiltIn?: boolean;
}

/**
 * 日曆插件介面 - 統一的日曆系統 API
 */
export interface CalendarPlugin {
    /** 日曆識別碼 */
    readonly id: string;

    /** 日曆顯示名稱（多語言） */
    readonly displayName: Record<string, string>;

    /** 年份範圍 */
    readonly yearRange: { min: number; max: number };

    /** 輸入提示文字 */
    readonly placeholders: Record<string, string>;

    /**
     * 取得日曆配置
     */
    getConfig(): CalendarConfig;

    /**
     * 解析輸入 - 嘗試解析為西元曆
     * @param input 使用者輸入的日期字串
     * @returns 解析成功返回西元曆 SimpleDateValue，失敗返回 null
     */
    parseInput(input: string): SimpleDateValue | null;

    /**
     * 驗證日期 - 檢查日期在此日曆系統中是否有效
     * @param date 西元曆日期
     * @returns 是否有效
     */
    isValid(date: SimpleDateValue): boolean;

    /**
     * 格式化輸出 - 將西元曆轉換為此日曆系統的顯示格式
     * @param date 西元曆日期
     * @param format 格式字串
     * @param locale 語言設定
     * @returns 格式化後的字串
     */
    format(date: SimpleDateValue, format: string, locale: string): string;

    /**
     * 轉換為此日曆系統 - 將西元曆日期轉換為此日曆系統的年月日
     * @param gregorianDate 西元曆日期
     * @returns 此日曆系統的日期
     */
    fromGregorian(gregorianDate: SimpleDateValue): SimpleDateValue;

    /**
     * 轉換為西元曆 - 將此日曆系統的日期轉換為西元曆
     * @param calendarDate 此日曆系統的日期
     * @returns 西元曆日期
     */
    toGregorian(calendarDate: SimpleDateValue): SimpleDateValue;
}

/**
 * 日曆插件註冊器
 */
export interface CalendarRegistry {
    /** 註冊日曆插件 */
    register(plugin: CalendarPlugin): void;

    /** 取得日曆插件 */
    get(id: string): CalendarPlugin | null;

    /** 取得所有已註冊的日曆 */
    getAll(): CalendarPlugin[];

    /** 檢查是否支援指定日曆 */
    isSupported(id: string): boolean;

    /** 取得支援的日曆列表（用於 UI 選擇器） */
    getSupportedList(locale?: string): Array<{
        id: string;
        name: string;
        yearRange: { min: number; max: number };
    }>;
}

/**
 * 日曆工具類 - 統一的日曆操作入口
 */
export interface CalendarUtils {
    /**
     * 智能解析輸入 - 嘗試用指定日曆和西元曆解析
     * @param input 輸入字串
     * @param calendarId 日曆 ID
     * @returns 解析結果（西元曆格式）
     */
    parseInput(input: string, calendarId: string): {
        success: boolean;
        date: SimpleDateValue | null;
        source: 'gregorian' | string; // 解析成功的來源日曆
    };

    /**
     * 格式化輸出
     * @param date 西元曆日期
     * @param calendarId 目標日曆 ID
     * @param format 格式字串
     * @param locale 語言設定
     * @returns 格式化字串
     */
    formatOutput(
        date: SimpleDateValue,
        calendarId: string,
        format: string,
        locale: string
    ): string;

    /**
     * 驗證日期
     * @param date 西元曆日期
     * @param calendarId 日曆 ID
     * @returns 是否有效
     */
    validate(date: SimpleDateValue, calendarId: string): boolean;

    /**
     * 取得日曆配置
     * @param calendarId 日曆 ID
     * @returns 配置資訊
     */
    getConfig(calendarId: string): CalendarConfig | null;
}

/**
 * 支援的日曆類型（可擴展）
 */
export type CalendarType = 'gregory' | 'roc' | 'buddhist' | 'japanese' | 'islamic' | 'persian' | string;
