// types/calendarPlugin.ts - 專注於格式化功能
import { type SimpleDateValue } from '../utils/dateUtils';
import { type Calendar } from '@internationalized/date';

/**
 * 日曆描述子 - 註冊到 registry 的單一單位
 *
 * 設計重點（Phase 6）：
 * - 西元曆以外的曆法一律「opt-in 註冊」（`registerCalendar(descriptor)`），不預設註冊。
 * - 每個描述子**自帶**對應的 `@internationalized/date` 曆法類別（透過 `createCalendar()`），
 *   取代動態 `createCalendar(id)` 大 switch → 未註冊的曆法可被 tree-shake 掉。
 * - `plugin` 為選用：只有 Intl 做不到的自訂文字（如民國年）才需要；
 *   佛/和/波斯… 無 plugin，格式化交給 `@internationalized/date` 的 `DateFormatter`。
 * - 描述子同時是曆法 metadata（displayName / yearRange）的單一事實來源。
 */
export interface CalendarDescriptor {
    /** 日曆識別碼，須與 @internationalized/date 的 calendar identifier 一致（如 'roc'、'buddhist'） */
    readonly id: string;

    /** 多語言顯示名稱（locale → 名稱） */
    readonly displayName: Record<string, string>;

    /**
     * 取得有效的「西元年」範圍上下限（依當前西元年動態計算）
     * @param currentGregorianYear 當前西元年
     */
    getYearRange(currentGregorianYear: number): { min: number; max: number };

    /** 建立對應的 @internationalized/date 曆法實例（自帶類別，利於 tree-shaking） */
    createCalendar(): Calendar;

    /** 選用：Intl 無法處理的自訂文字格式化 / 解析（如 ROC 民國年） */
    readonly plugin?: CalendarPlugin;
}

/**
 * 日曆格式化/解析插件介面（行為層）
 *
 * 只負責「@internationalized/date 無法處理的自訂文字」格式化與解析（如 ROC 民國年）。
 * 曆法 metadata（id / displayName / yearRange）已收斂到 {@link CalendarDescriptor}，
 * 不再放在 plugin（Phase 6.6：避免與描述子重複）。
 */
export interface CalendarPlugin {
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
