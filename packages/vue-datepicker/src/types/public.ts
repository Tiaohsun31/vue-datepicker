import { type SimpleDateValue } from '../utils/dateUtils';

// TailwindColor 的單一事實來源在 utils/tailwind4-color.ts（由 tailwindBaseColors 的鍵衍生）。
export type { TailwindColor } from '../utils/tailwind4-color';

/**
 * 輸出資料類型
 * - 'iso': 標準 ISO 8601 字符串 2024-06-18T14:30:00
 * - 'date': JavaScript Date 對象 new Date(...)
 * - 'object': 結構化日期對象 { year: 2024, month: 6, day: 18 }
 * - 'custom': 自定義格式字符串 (使用 dateFormat 和 timeFormat) 2024年06月18日 下午2時30分 或 民國113年06月18日
 */
export type OutputType = 'iso' | 'date' | 'object' | 'custom';

// 快捷日期範圍選擇器類型
export interface DateRangeShortcut {
    label: string;
    getValue: () => { start: SimpleDateValue; end: SimpleDateValue };
}
