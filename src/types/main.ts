export type TailwindColor =
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';

/**
 * 輸出資料類型
 * - 'iso': 標準 ISO 8601 字符串 2024-06-18T14:30:00
 * - 'date': JavaScript Date 對象 new Date(...)
 * - 'object': 結構化日期對象 { year: 2024, month: 6, day: 18 }
 * - 'custom': 自定義格式字符串 (使用 dateFormat 和 timeFormat) 2024年06月18日 下午2時30分 或 民國113年06月18日
 */
export type OutputType = 'iso' | 'date' | 'object' | 'custom';
