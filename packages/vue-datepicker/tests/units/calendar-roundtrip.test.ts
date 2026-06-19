// tests/units/calendar-roundtrip.test.ts
//
// Phase 6 動工前的安全網（§6「先補曆法 round-trip 測試再重構」）。
// registry / 統一描述子 / globalParser 去單例 / formatOutput 收斂 等重構會大幅搬動
// calendarUtils、dateParsingUtils、RocFormatPlugin 的接線；此檔鎖住「行為不變式」：
//   1. 西元 ⇄ 各曆法 ⇄ 西元 的日期轉換 round-trip 必須是 identity。
//   2. offset 型曆法（gregory/roc/buddhist，年初皆對齊 1/1）年份轉換 round-trip 為 identity；
//      非對齊曆法（persian/hebrew/japanese）年份-only 轉換本質有損 —— 以現狀記錄鎖住，避免重構誤判。
//   3. ROC 格式化 ⇄ 解析 round-trip（日期 / 24h / 中文 12h）為 identity。
//   4. §5.5#9 / Phase 6.8：ROC 無前綴數字輸入目前被誤判為西元年（it.fails 編碼期望，修好自動轉綠）。
//
// 重構後這些測試必須持續通過；第 4 區塊的 it.fails 在 6.8 修好後會轉綠 → 屆時移除 .fails 並改為正式斷言。

import { describe, it, expect } from 'vitest'
import { CalendarUtils } from '@/utils/calendarUtils'
import { parseUserDateInput } from '@/utils/dateParsingUtils'
import { RocFormatPlugin } from '@/plugins/calendars/RocFormatPlugin'
import { formatOutput } from '@/utils/dateUtils'
import type { SimpleDateValue } from '@/utils/dateUtils'

// 取樣西元日期（含閏年 2/29、年初、年末）
const GREGORIAN_SAMPLES: SimpleDateValue[] = [
    { year: 2024, month: 6, day: 15 },
    { year: 2023, month: 12, day: 25 },
    { year: 2000, month: 2, day: 29 }, // 閏年
    { year: 2025, month: 1, day: 1 },
]

// 已驗證可由 @internationalized/date 正確轉換的曆法（刻意排除裸 'islamic'，
// 其在 createCalendar 下會退回 gregory，見 calendarUtils.test.ts 既有註記）
const ROUNDTRIP_CALENDARS = ['gregory', 'roc', 'buddhist', 'japanese', 'persian', 'hebrew'] as const

describe('多曆法日期轉換 round-trip（西元 ⇄ 各曆法 ⇄ 西元）', () => {
    for (const calendar of ROUNDTRIP_CALENDARS) {
        describe(`calendar=${calendar}`, () => {
            for (const date of GREGORIAN_SAMPLES) {
                const label = `${date.year}-${date.month}-${date.day}`
                it(`${label} 轉成 ${calendar} 再轉回西元應為原值`, () => {
                    const inCalendar = CalendarUtils.convertToCalendarDate(date, calendar)
                    expect(inCalendar).not.toBeNull()

                    const backToGregorian = CalendarUtils.convertFromCalendarDate(inCalendar, calendar)
                    expect(backToGregorian).toEqual(date)
                })
            }
        })
    }

    it('convertToCalendarDate 應標記正確的目標曆法 identifier', () => {
        const d = { year: 2024, month: 6, day: 15 }
        expect(CalendarUtils.convertToCalendarDate(d, 'gregory')?.calendar.identifier).toBe('gregory')
        expect(CalendarUtils.convertToCalendarDate(d, 'roc')?.calendar.identifier).toBe('roc')
        expect(CalendarUtils.convertToCalendarDate(d, 'buddhist')?.calendar.identifier).toBe('buddhist')
    })
})

describe('年份轉換 round-trip', () => {
    describe('offset 型曆法（年初對齊 1/1，年份-only 轉換無損）', () => {
        const cases: Array<{ calendar: string; gregorianYear: number; localYear: number }> = [
            { calendar: 'gregory', gregorianYear: 2024, localYear: 2024 },
            { calendar: 'roc', gregorianYear: 2024, localYear: 113 },
            { calendar: 'buddhist', gregorianYear: 2024, localYear: 2567 },
        ]

        for (const { calendar, gregorianYear, localYear } of cases) {
            it(`${calendar}: 西元 ${gregorianYear} → 本地 ${localYear} → 西元 ${gregorianYear}`, () => {
                const toLocal = CalendarUtils.convertGregorianYear(gregorianYear, calendar)
                expect(toLocal.localYear).toBe(localYear)
                expect(toLocal.isValid).toBe(true)

                expect(CalendarUtils.convertToGregorianYear(localYear, calendar)).toBe(gregorianYear)
            })
        }
    })

    // 現狀記錄（非 bug）：波斯/希伯來等曆法年初不在 1/1，
    // 以 (localYear, 1, 1) 做「年份-only」反轉會落到該曆法年初（早於來源年），故 round-trip 有 -1 偏移。
    // 鎖住此確定性行為，避免 6.4 metadata 收斂時誤把它當成 identity。
    describe('[現狀記錄] 非對齊曆法年份-only 轉換有損', () => {
        it('persian: 西元 2024 → localYear → 反轉回 2023（年初偏移）', () => {
            const localYear = CalendarUtils.convertGregorianYear(2024, 'persian').localYear
            expect(CalendarUtils.convertToGregorianYear(localYear, 'persian')).toBe(2023)
        })
    })
})

describe('RocFormatPlugin 格式化 ⇄ 解析 round-trip', () => {
    const plugin = new RocFormatPlugin()
    const locale = 'zh-TW'

    it('日期（ROC-YYYY-MM-DD）', () => {
        const date: SimpleDateValue = { year: 2025, month: 6, day: 18 }
        const formatted = plugin.format(date, 'ROC-YYYY-MM-DD', locale)
        expect(formatted).toBe('民國114年06月18日')
        expect(plugin.parseInput(formatted, locale)).toEqual(date)
    })

    it('日期+24小時時間（ROC-YYYY-MM-DD HH:mm:ss）', () => {
        const date: SimpleDateValue = { year: 2025, month: 6, day: 18, hour: 14, minute: 30, second: 45 }
        const formatted = plugin.format(date, 'ROC-YYYY-MM-DD HH:mm:ss', locale)
        expect(formatted).toBe('民國114年06月18日 14:30:45')
        expect(plugin.parseInput(formatted, locale)).toEqual(date)
    })

    it('日期+中文12小時時間（ROC-YYYY-MM-DD A HH時mm分ss秒）', () => {
        const date: SimpleDateValue = { year: 2025, month: 6, day: 18, hour: 14, minute: 30, second: 45 }
        const formatted = plugin.format(date, 'ROC-YYYY-MM-DD A HH時mm分ss秒', locale)
        expect(formatted).toBe('民國114年06月18日 下午 02時30分45秒')
        expect(plugin.parseInput(formatted, locale)).toEqual(date)
    })
})

describe('§5.5#9 / Phase 6.8 — ROC 無前綴數字輸入（Session B 已修）', () => {
    // 診斷：RocFormatPlugin 本身一向能解析無前綴數字（114-06-18 → 民國114 = 西元2025）。
    it('plugin.parseInput 直接解析無前綴數字應為民國年（2025）', () => {
        const plugin = new RocFormatPlugin()
        expect(plugin.parseInput('114-06-18', 'zh-TW')).toEqual({ year: 2025, month: 6, day: 18 })
        expect(plugin.parseInput('114/06/18', 'zh-TW')).toEqual({ year: 2025, month: 6, day: 18 })
    })

    // 修正後：calendar='roc' 下，dispatch 直接委派 plugin.parseInput（不再以 canParseInput 前綴 gate），
    // 故無前綴 '114-06-18' 正確解析為民國年 → 西元 2025、calendarSystem=roc。
    it('calendar=roc 無前綴輸入應解析為民國年（西元 2025、calendarSystem=roc）', () => {
        const result = parseUserDateInput('114-06-18', 'zh-TW', 'roc')
        expect(result.success).toBe(true)
        expect(result.calendarSystem).toBe('roc')
        expect(result.date).toMatchObject({ year: 2025, month: 6, day: 18 })
    })

    // 回歸保護：ROC 模式打「西元式」年份（超出民國 1–200 範圍）時 plugin 回傳 null，回退一般（西元）解析。
    it('calendar=roc 下超出民國範圍的數字（2023-12-25）回退西元解析', () => {
        const result = parseUserDateInput('2023-12-25', 'zh-TW', 'roc')
        expect(result.success).toBe(true)
        expect(result.calendarSystem).toBe('gregory')
        expect(result.date).toMatchObject({ year: 2023, month: 12, day: 25 })
    })
})

// 回歸鎖：ROC「自訂輸出 → 再解析」必須 round-trip 回同一西元日期。
// （曾因 §6.5 讓 ROC 自訂輸出變成純數字 '115-06-19'，re-parse 被當成西元 115 → 民國前1797；已回退。）
describe('ROC 自訂輸出 round-trip（§6.5 回退回歸鎖）', () => {
    it('outputType=custom、預設 dateFormat、含時間：輸出再解析回同一西元日期', () => {
        const date: SimpleDateValue = { year: 2026, month: 6, day: 19, hour: 0, minute: 0, second: 0 }
        // 元件實際輸出路徑：dateUtils.formatOutput(outputType='custom')
        const out = formatOutput(date, 'custom', 'YYYY-MM-DD', 'HH:mm:ss', true, 'roc', 'zh-TW')
        expect(typeof out).toBe('string')
        // 不應是會被當成西元年的純數字（不得以 '115' 起頭的純數字日期）
        expect(out).not.toMatch(/^\d{1,3}[-/]/)

        // 再解析（ROC 模式）→ 日期須回到西元 2026-06-19（年份為本次回歸重點）
        const parsed = parseUserDateInput(out as string, 'zh-TW', 'roc')
        expect(parsed.success).toBe(true)
        expect(parsed.date).toMatchObject({ year: 2026, month: 6, day: 19 })
    })
})
