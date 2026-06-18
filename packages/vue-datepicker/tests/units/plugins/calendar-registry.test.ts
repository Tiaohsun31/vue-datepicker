// tests/units/plugins/calendar-registry.test.ts
// Phase 6：曆法 registry + 統一描述子（公開 opt-in API）。
// 註：tests/units/setup.ts 已全域註冊所有內建曆法，故這裡 isCalendarRegistered('roc') 等為 true。
import { describe, it, expect } from 'vitest'
import {
    registerCalendar,
    getCalendarDescriptor,
    isCalendarRegistered,
} from '@/plugins/calendars/registry'
import { rocCalendar } from '@/plugins/calendars/roc'
import { buddhistCalendar, hebrewCalendar } from '@/plugins/calendars/builtins'
import type { CalendarDescriptor } from '@/types/calendarPlugin'

describe('曆法 registry', () => {
    it('西元曆永遠內建、免註冊', () => {
        expect(isCalendarRegistered('gregory')).toBe(true)
        const g = getCalendarDescriptor('gregory')
        expect(g?.id).toBe('gregory')
        expect(g?.createCalendar().identifier).toBe('gregory')
    })

    it('未註冊的曆法 → 查無描述子', () => {
        expect(isCalendarRegistered('totally-not-a-calendar')).toBe(false)
        expect(getCalendarDescriptor('totally-not-a-calendar')).toBeUndefined()
    })

    it('registerCalendar 可註冊自訂描述子並查得', () => {
        const custom: CalendarDescriptor = {
            id: 'test-custom',
            displayName: { 'en-US': 'Custom' },
            getYearRange: () => ({ min: 1, max: 3000 }),
            createCalendar: () => buddhistCalendar.createCalendar(),
        }
        expect(isCalendarRegistered('test-custom')).toBe(false)
        registerCalendar(custom)
        expect(isCalendarRegistered('test-custom')).toBe(true)
        expect(getCalendarDescriptor('test-custom')).toBe(custom)
    })
})

describe('內建描述子 metadata（Phase 6.6：metadata 收斂到描述子）', () => {
    it('rocCalendar：id/顯示名/年範圍/曆法類別/plugin', () => {
        expect(rocCalendar.id).toBe('roc')
        expect(rocCalendar.displayName['zh-TW']).toBe('民國')
        expect(rocCalendar.displayName['en-US']).toBe('ROC')
        // 與 RocFormatPlugin 民國 1–200 對齊（1912–2111）
        expect(rocCalendar.getYearRange(2026)).toEqual({ min: 1912, max: 2111 })
        expect(rocCalendar.createCalendar().identifier).toBe('roc')
        expect(rocCalendar.plugin).toBeDefined()
    })

    it('buddhistCalendar：Intl 原生、無 plugin、年範圍依當前年計算', () => {
        expect(buddhistCalendar.id).toBe('buddhist')
        expect(buddhistCalendar.plugin).toBeUndefined()
        expect(buddhistCalendar.createCalendar().identifier).toBe('buddhist')
        expect(buddhistCalendar.getYearRange(2026)).toEqual({ min: 544, max: 2669 })
    })

    it('hebrewCalendar：identifier 與年範圍', () => {
        expect(hebrewCalendar.createCalendar().identifier).toBe('hebrew')
        expect(hebrewCalendar.getYearRange(2026)).toEqual({ min: 1, max: 5886 })
    })
})
