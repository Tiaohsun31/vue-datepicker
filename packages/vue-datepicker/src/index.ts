// src/index.ts
import './styles/theme.css';
import type { App } from 'vue';
import DatePicker from './DatePicker.vue';
import DateRange from './DateRange.vue';

// 個別組件導出
export { DatePicker, DateRange };

// 曆法 registry（公開 opt-in 擴展 API）
export { registerCalendar, getCalendarDescriptor, isCalendarRegistered } from './plugins/calendars/registry';

// 內建曆法描述子：使用者按需 import 後 registerCalendar() 才生效（未 import 者會被 tree-shake）
export { rocCalendar } from './plugins/calendars/roc';
export {
    buddhistCalendar,
    japaneseCalendar,
    persianCalendar,
    hebrewCalendar,
    indianCalendar,
    copticCalendar,
    ethiopicCalendar,
    ethioaaCalendar,
    islamicCivilCalendar,
    islamicTabularCalendar,
    islamicUmalquraCalendar,
} from './plugins/calendars/builtins';

// 類型導出
export type { DatePickerProps, DateRangeProps } from './types/datePickerProps';
export type { TailwindColor, OutputType } from './types/public';
export type { LocaleMessages, ErrorMessages } from './types/locale';
export type { CalendarDescriptor, CalendarPlugin } from './types/calendarPlugin';

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
