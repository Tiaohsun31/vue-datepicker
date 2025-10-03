import { type TailwindColor, type OutputType } from './main';
import type { DateTimeInput } from '@/utils/dateUtils';
import type { LocaleMessages } from '@/types/locale';

interface BaseDatePickerProps {
    // 主題
    mode?: 'light' | 'dark' | 'auto';
    theme?: TailwindColor | string;

    // 日曆系統 ID，如 'gregory', 'roc', 'japanese'
    calendar?: string; // 日曆系統 預設為 'gregory'
    locale?: string; // 語言環境 預設為 'zh-TW'
    customLocaleMessages?: LocaleMessages; // 完整的自定義語言包
    outputType?: OutputType;  // 輸出格式 預設為 'iso'，如果設置了 outputFormat，則會忽略 dateFormat 和 timeFormat 的設置
    useStrictISO?: boolean; // 是否使用嚴格的 ISO 8601 格式輸出 預設為 false

    // 日期選項
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 一週的起始日 預設為 0 (星期日)
    minDate?: DateTimeInput; // 最小日期 預設為 null 限定輸入西元曆
    maxDate?: DateTimeInput; // 最大日期 預設為 null 限定輸入西元曆
    dateSeparator?: string; // 日期的分隔符 預設為 '-'
    dateFormat?: string; // 日期格式 預設為 'YYYY-MM-DD' 會依照日期格式輸出

    // 時間選項
    timeFormat?: string; // 時間格式，如果不提供會根據 enableSeconds 和 use24Hour 自動決定
    showTime?: boolean; // 是否顯示時間輸入選項 預設為 false
    enableSeconds?: boolean; // 是否啟用秒 選項 預設為 true
    use24Hour?: boolean; // 是否使用24小時制 預設為 true
    useLocalizedPeriod?: boolean; // 是否使用本地化的上午/下午格式，僅在使用12小時制啟用 預設為 false

    // 一般選項
    disabled?: boolean; // 是否禁用選擇器 預設為 false
    inputEnabled?: boolean;  // 是否允許使用輸入框 預設為 true(dateRange為false) 目前僅在 gregory 中使用
    required?: boolean; // 是否為必填 預設為 false
    showClearButton?: boolean; // 是否顯示清除按鈕 預設為 true

    // HTML Attributes
    id?: string; // 元素的 ID
    name?: string; // 表單元素的 name 屬性

    // 錯誤處理選項
    showErrorMessage?: boolean;  // 是否顯示錯誤訊息 預設為 true
    useI18n?: boolean;  // 是否使用內建i18n 預設為 true
    customErrorMessages?: Record<string, string>; // 自定義錯誤訊息
}

export interface DatePickerProps extends BaseDatePickerProps {
    modelValue?: DateTimeInput;

    customDefaultTime?: string; // 自定義預設時間 預設為 undefined
    autoFocusTimeAfterDate?: boolean; // 是否在選擇日期後自動聚焦時間輸入框 預設為 true

    // 輸入框佔位符 預設取locale中的Placeholder
    placeholderOverrides?: {
        selectDate?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
    };
}

export interface DateRangeProps extends BaseDatePickerProps {
    modelValue?: { start: DateTimeInput; end: DateTimeInput } | null;
    monthDisplayMode?: 'single' | 'dual'; // 單月或雙月顯示模式，依照視窗大小自動切換，預設為 'dual'

    // 輸入框佔位符 預設取locale中的Placeholder
    placeholderOverrides?: {
        start?: string;
        end?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
    };

    separator?: string; // 開始和結束日期之間的分隔符，預設為 '~'
    showShortcuts?: boolean; // 是否顯示快捷選項 (如今天、昨天、上週等) 預設為 false
    incomplete?: boolean; // 是否提示不完整的範圍選擇（例如只選擇開始日期而不選結束日期） 預設為 true

    // 範圍特定選項
    maxRange?: number; // 允許選擇的最大天數（例如設為 7，則只能選 7 天以內的區間）。
    minRange?: number; // 允許選擇的最小天數（例如設為 2，則至少要選 2 天以上的區間）。
}
