// src/index.ts
import type { App } from 'vue';
import DatePicker from './DatePicker.vue';
import DateRange from './DateRange.vue';

// 個別組件導出
export { DatePicker, DateRange };

import './styles/theme.css';

// 類型導出
export type { DatePickerProps, DateRangeProps } from './types/datePickerProps';
export type { TailwindColor, OutputType } from './types/main';

// 工具函數導出
export { parseInputToSimpleDate, formatSimpleDate } from './utils/dateUtils';

// 插件安裝函數
export const VueDatePickerTailwind = {
    install(app: App) {
        app.component('DatePicker', DatePicker);
        app.component('DateRange', DateRange);
    }
};

// 默認導出插件
export default VueDatePickerTailwind;


// // 方式 1: 全局註冊
// import { createApp } from 'vue';
// import VueDatePickerTailwind from 'vue-datepicker-tailwind';

// const app = createApp(App);
// app.use(VueDatePickerTailwind);

// // 方式 2: 個別導入
// import { DatePicker, DateRange } from 'vue-datepicker-tailwind';
