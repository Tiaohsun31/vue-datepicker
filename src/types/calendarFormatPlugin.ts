// types/calendarPlugin.ts - 專注於格式化功能
import { type SimpleDateValue } from '@/utils/dateUtils';

/**
 * 簡化的日曆格式化插件介面
 * 專注於提供 @internationalized/date 無法處理的自定義格式化功能
 */
export interface CalendarFormatPlugin {
    /** 日曆識別碼 */
    readonly id: string;

    /** 日曆顯示名稱（多語言） */
    readonly displayName: Record<string, string>;

    /** 年份範圍 */
    readonly yearRange: { min: number; max: number };

    /**
     * 自定義格式化 - 提供 @internationalized/date 無法處理的格式
     * @param date 西元曆日期
     * @param format 格式字串 (如 'ROC-YYYY年MM月DD日 A HH時mm分ss秒')
     * @param locale 語言設定
     * @returns 格式化後的字串
     */
    format(date: SimpleDateValue, format: string, locale: string): string;

    /**
     * 檢查輸入字串是否可以被解析
     * @param input 輸入字串
     * @returns 是否可以解析
     */
    canParseInput(input: string): boolean;

    /**
     * 解析輸入字串為 SimpleDateValue
     * @param input 輸入字串
     * @param locale 語言設定
     * @returns 解析後的日期值(西元曆)或 null
     */
    parseInput(input: string, locale: string): SimpleDateValue | null;

    /**
     * 檢查是否支援特定格式
     * @param format 格式字串
     * @returns 是否支援此格式
     */
    supportsFormat(format: string): boolean;
}

/**
 * 支援的日曆類型（用於格式化）
 */
export type SupportedCalendarForFormat = 'gregory' | 'roc' | 'buddhist' | 'japanese' | string;
