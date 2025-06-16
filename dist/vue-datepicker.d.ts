import { App } from 'vue';
import { CalendarIdentifier } from '@internationalized/date';
import { default as DatePicker } from './DatePicker.vue';
import { default as DateRange } from './DateRange.vue';

declare interface BaseDatePickerProps {
    mode?: 'light' | 'dark' | 'auto';
    theme?: TailwindColor | string;
    calendar?: CalendarIdentifier;
    locale?: string;
    outputType?: OutputType;
    useStrictISO?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    minDate?: DateTimeInput;
    maxDate?: DateTimeInput;
    dateSeparator?: string;
    dateFormat?: string;
    timeFormat?: string;
    showTime?: boolean;
    enableSeconds?: boolean;
    use24Hour?: boolean;
    useLocalizedPeriod?: boolean;
    disabled?: boolean;
    inputEnabled?: boolean;
    required?: boolean;
    showClearButton?: boolean;
    showErrorMessage?: boolean;
    useI18n?: boolean;
    customErrorMessages?: Record<string, string>;
}

export { DatePicker }

export declare interface DatePickerProps extends BaseDatePickerProps {
    modelValue?: DateTimeInput;
    customDefaultTime?: string;
    autoFocusTimeAfterDate?: boolean;
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

export { DateRange }

export declare interface DateRangeProps extends BaseDatePickerProps {
    modelValue?: {
        start: DateTimeInput;
        end: DateTimeInput;
    } | null;
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
    separator?: string;
    showShortcuts?: boolean;
    incomplete?: boolean;
    maxRange?: number;
    minRange?: number;
}

/**
 * 支持的日期時間格式 - 限縮 @internationalized/date 的使用
 */
declare type DateTimeInput = string | Date | SimpleDateValue | null;

/**
 * 將 SimpleDateValue 轉換為字符串
 * 返回西元曆格式
 */
export declare function formatSimpleDate(date: SimpleDateValue | null | undefined, format?: string): string | null;

/**
 * 輸出資料類型
 * - 'iso': 標準 ISO 8601 字符串 2024-06-18T14:30:00
 * - 'date': JavaScript Date 對象 new Date(...)
 * - 'object': 結構化日期對象 { year: 2024, month: 6, day: 18 }
 * - 'custom': 自定義格式字符串 (使用 dateFormat 和 timeFormat) 2024年06月18日 下午2時30分 或 民國113年06月18日
 */
export declare type OutputType = 'iso' | 'date' | 'object' | 'custom';

/**
 * 統一的日期解析函數 - 主要返回 SimpleDateValue
 * 返回西元曆格式
 */
export declare function parseInputToSimpleDate(input: DateTimeInput | undefined, locale?: string, calendar?: string): SimpleDateValue | null;

/**
 * 內部使用的簡單日期介面(西元曆)，避免 @internationalized/date 的型別問題
 */
declare interface SimpleDateValue {
    year: number;
    month: number;
    day: number;
    hour?: number;
    minute?: number;
    second?: number;
}

export declare type TailwindColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

declare const VueDatePickerTailwind: {
    install(app: App): void;
};
export { VueDatePickerTailwind }
export default VueDatePickerTailwind;

export { }
