import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'
import {
    DatePicker,
    DateRange,
    registerCalendar,
    rocCalendar,
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
} from '@tiaohsun/vue-datepicker';
import '@tiaohsun/vue-datepicker/style'

// 文件站示範用到所有曆法 → 全部註冊（v2 起非西元曆改為按需註冊）
;[
    rocCalendar,
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
].forEach(registerCalendar)

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('DatePicker', DatePicker)
        app.component('DateRange', DateRange)
    }
} satisfies Theme
