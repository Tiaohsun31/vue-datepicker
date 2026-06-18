import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Phase 6：非西元曆改為 opt-in 註冊。playground 展示多種曆法，故在進入點註冊全部內建曆法。
import { registerCalendar } from '@/plugins/calendars/registry'
import { rocCalendar } from '@/plugins/calendars/roc'
import {
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
} from '@/plugins/calendars/builtins'

for (const descriptor of [
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
]) {
    registerCalendar(descriptor)
}

const app = createApp(App)

app.mount('#app')
