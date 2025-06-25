import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'
import { DatePicker, DateRange } from '@tiaohsun/vue-datepicker';
import '@tiaohsun/vue-datepicker/style'

// import { DatePicker, DateRange } from '@tiaohsun/vue-datepicker';
// // import '@tiaohsun/vue-datepicker/style'
// import '@tiaohsun/vue-datepicker/style'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('DatePicker', DatePicker)
        app.component('DateRange', DateRange)
    }
} satisfies Theme
