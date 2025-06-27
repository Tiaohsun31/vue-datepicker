// src/index.ts
import './styles/theme.css';
import type { App } from 'vue';
import DatePicker from './DatePicker.vue';
import DateRange from './DateRange.vue';

// 格式化插件
import { RocFormatPlugin } from './plugins/calendars/RocFormatPlugin';

// 個別組件導出
export { DatePicker, DateRange, RocFormatPlugin };

// 類型導出
export type { DatePickerProps, DateRangeProps } from './types/datePickerProps';
export type { TailwindColor, OutputType } from './types/main';

// 插件安裝函數
export const VueDatepicker = {
    install(app: App) {
        app.component('VueDatepicker', DatePicker);
        app.component('DatePicker', DatePicker);
        app.component('DateRange', DateRange);
    }
};

// 默認導出插件
export default VueDatepicker;
