import { type TailwindColor } from './main';
import type { DateTimeValue, OutputFormat } from '@/utils/dateUtils';
import type { CalendarIdentifier } from '@internationalized/date';
export interface DatePickerProps {
    modelValue?: DateTimeValue;
    mode?: 'light' | 'dark' | 'auto';
    theme?: TailwindColor | string;

    // 日曆系統 ID，如 'gregory', 'roc', 'japanese'
    calendar?: string | CalendarIdentifier; // 日曆系統 預設為 'gregory'
    locale?: string; // 語言環境 預設為 'zh-TW'
    outputFormat?: OutputFormat;  // 輸出格式 iso、date、simple 預設為 'iso'

    // 日期選項
    minDate?: DateTimeValue; // 最小日期 預設為 null TODO:目前對calendar無效
    maxDate?: DateTimeValue; // 最大日期 預設為 null TODO:目前對calendar無效
    dateSeparator?: string; // 日期的分隔符 預設為 '-'
    dateFormat?: string; // 日期格式 預設為 'YYYY-MM-DD' 會依照日期格式輸出

    // 時間選項
    timeFormat?: string; // 時間格式 預設為 'HH:mm:ss'
    showTime?: boolean; // 是否顯示時間輸入選項 預設為 false
    enableSeconds?: boolean; // 是否啟用秒 選項 預設為 true
    use24Hour?: boolean; // 是否使用24小時制 預設為 true
    minuteStep?: number; // 分鐘步進值 預設為 1
    useLocalizedPeriod?: boolean; // 是否使用本地化的上午/下午格式 預設為 false
    customDefaultTime?: string; // 自定義預設時間 預設為 '00:00:00'
    autoFocusTimeAfterDate?: boolean; // 是否在選擇日期後自動聚焦時間輸入框 預設為 false

    // 一般選項
    disabled?: boolean; // 是否禁用選擇器 預設為 false
    inputEnabled?: boolean;  // 是否允許使用輸入框 預測為 true
    required?: boolean; // 是否為必填 預設為 false
    showClearButton?: boolean; // 是否顯示清除按鈕 預設為 true

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

    // 錯誤處理選項
    showErrorMessage?: boolean;  // 是否顯示錯誤訊息 預設為 true
    useI18n?: boolean;  // 是否使用內建i18n 預設為 true
    customErrorMessages?: Record<string, string>; // 自定義錯誤訊息 TODO: 確認使用方式
}
