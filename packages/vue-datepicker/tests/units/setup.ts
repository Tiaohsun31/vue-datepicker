// tests/units/setup.ts
import '@testing-library/jest-dom'

// Phase 6：非西元曆改為 opt-in 註冊。測試廣泛使用 roc/buddhist/japanese/persian/hebrew…，
// 故在此統一註冊全部內建曆法，避免「未註冊→回退西元曆」造成大量測試噪音。
// （registry 為 module 單例，重複註冊為冪等。）
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
