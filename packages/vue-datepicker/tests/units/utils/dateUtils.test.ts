// tests/units/utils/dateUtils.test.ts
import { describe, it, expect } from 'vitest'
import {
    parseInputToSimpleDate,
    formatSimpleDate,
    formatOutput,
    compareDates,
    addDays,
    calculateDaysDifference,
    getTodaysDate,
    createSimpleDate,
    getNow,
    isDateInRange,
    getCurrentMonthRange,
    isValidDateFormat,
    isValidTimeFormatPattern,
    fixDateFormat,
    fixTimeFormat,
    isSimpleDateValue
} from '@/utils/dateUtils'

describe('dateUtils', () => {
    describe('parseInputToSimpleDate', () => {
        it('應該正確解析 ISO 日期字符串', () => {
            const result = parseInputToSimpleDate('2024-06-15')
            expect(result).toEqual({
                year: 2024,
                month: 6,
                day: 15,
                hour: 0,
                minute: 0,
                second: 0
            })
        })

        it('應該正確解析 Date 對象', () => {
            const date = new Date(2024, 5, 15)
            const result = parseInputToSimpleDate(date)
            expect(result).toEqual({
                year: 2024,
                month: 6,
                day: 15,
                hour: expect.any(Number),
                minute: expect.any(Number),
                second: expect.any(Number)
            })
        })

        it('應該正確解析 SimpleDateValue 對象', () => {
            const simpleDate = { year: 2024, month: 6, day: 15, hour: 10, minute: 30, second: 45 }
            const result = parseInputToSimpleDate(simpleDate)
            expect(result).toEqual(simpleDate)
        })

        it('應該返回 null 對於無效輸入', () => {
            expect(parseInputToSimpleDate('')).toBeNull()
            expect(parseInputToSimpleDate(null)).toBeNull()
            expect(parseInputToSimpleDate(undefined)).toBeNull()
            expect(parseInputToSimpleDate('invalid-date')).toBeNull()
        })

        it('應該正確處理不同的日曆系統', () => {
            const rocResult = parseInputToSimpleDate('民國113年6月15日', 'zh-TW', 'roc')
            expect(rocResult).toEqual({
                year: 2024,
                month: 6,
                day: 15
            })
        })

        it('應該正確處理無效的 Date 對象', () => {
            const invalidDate = new Date('invalid')
            const result = parseInputToSimpleDate(invalidDate)
            expect(result).toBeNull()
        })
    })

    describe('formatSimpleDate', () => {
        const testDate = createSimpleDate(2024, 6, 15, 14, 30, 45)

        it('應該正確格式化為 YYYY-MM-DD', () => {
            const result = formatSimpleDate(testDate, 'YYYY-MM-DD')
            expect(result).toBe('2024-06-15')
        })

        it('應該正確格式化包含時間', () => {
            const result = formatSimpleDate(testDate, 'YYYY-MM-DD HH:mm:ss')
            expect(result).toBe('2024-06-15 14:30:45')
        })

        it('應該返回 null 對於無效輸入', () => {
            expect(formatSimpleDate(null)).toBeNull()
            expect(formatSimpleDate(undefined)).toBeNull()
        })

        it('應該使用默認格式 YYYY-MM-DD', () => {
            const result = formatSimpleDate(testDate)
            expect(result).toBe('2024-06-15')
        })

        it('應該正確處理沒有時間的日期', () => {
            const dateOnly = createSimpleDate(2024, 6, 15)
            const result = formatSimpleDate(dateOnly, 'YYYY-MM-DD HH:mm:ss')
            expect(result).toBe('2024-06-15 00:00:00')
        })
    })

    describe('formatOutput', () => {
        const testDate = createSimpleDate(2024, 6, 15, 14, 30, 45)

        it('應該正確格式化為 ISO 格式', () => {
            const result = formatOutput(testDate, 'iso')
            expect(result).toBe('2024-06-15')
        })

        it('應該正確格式化為 ISO 格式包含時間', () => {
            const result = formatOutput(testDate, 'iso', undefined, undefined, true)
            expect(result).toBe('2024-06-15 14:30:45')
        })

        it('應該正確格式化為 Date 對象', () => {
            const result = formatOutput(testDate, 'date')
            expect(result).toBeInstanceOf(Date)
            expect(result).toEqual(new Date(2024, 5, 15, 14, 30, 45))
        })

        it('應該返回原始對象', () => {
            const result = formatOutput(testDate, 'object')
            expect(result).toEqual(testDate)
        })

        it('應該使用自定義格式', () => {
            const result = formatOutput(testDate, 'custom', 'DD/MM/YYYY')
            expect(typeof result).toBe('string')
        })

        it('應該處理 null 輸入', () => {
            const result = formatOutput(null)
            expect(result).toBeNull()
        })

        it('應該回退到默認格式當輸出類型不支持時', () => {
            const result = formatOutput(testDate, 'unsupported' as any)
            expect(result).toBe('2024-06-15')
        })
    })

    describe('compareDates', () => {
        const date1 = createSimpleDate(2024, 6, 15)
        const date2 = createSimpleDate(2024, 6, 16)
        const date3 = createSimpleDate(2024, 6, 15)

        it('應該正確比較日期', () => {
            expect(compareDates(date1, date2)).toBe(-1)
            expect(compareDates(date2, date1)).toBe(1)
            expect(compareDates(date1, date3)).toBe(0)
        })

        it('應該正確比較不同年份', () => {
            const date2023 = createSimpleDate(2023, 6, 15)
            const date2024 = createSimpleDate(2024, 6, 15)
            expect(compareDates(date2023, date2024)).toBe(-1)
            expect(compareDates(date2024, date2023)).toBe(1)
        })

        it('應該正確比較不同月份', () => {
            const dateJune = createSimpleDate(2024, 6, 15)
            const dateJuly = createSimpleDate(2024, 7, 15)
            expect(compareDates(dateJune, dateJuly)).toBe(-1)
            expect(compareDates(dateJuly, dateJune)).toBe(1)
        })
    })

    describe('addDays', () => {
        it('應該正確增加天數', () => {
            const date = createSimpleDate(2024, 6, 15)
            const result = addDays(date, 5)
            expect(result).toEqual({
                year: 2024,
                month: 6,
                day: 20,
                hour: undefined,
                minute: undefined,
                second: undefined
            })
        })

        it('應該正確處理跨月的情況', () => {
            const date = createSimpleDate(2024, 6, 29)
            const result = addDays(date, 5)
            expect(result.month).toBe(7)
            expect(result.day).toBe(4)
        })

        it('應該正確處理負數天數', () => {
            const date = createSimpleDate(2024, 6, 15)
            const result = addDays(date, -5)
            expect(result.day).toBe(10)
        })

        it('應該正確處理跨年的情況', () => {
            const date = createSimpleDate(2024, 12, 30)
            const result = addDays(date, 5)
            expect(result.year).toBe(2025)
            expect(result.month).toBe(1)
            expect(result.day).toBe(4)
        })

        it('應該保留時間信息', () => {
            const date = createSimpleDate(2024, 6, 15, 14, 30, 45)
            const result = addDays(date, 1)
            expect(result.hour).toBe(14)
            expect(result.minute).toBe(30)
            expect(result.second).toBe(45)
        })
    })

    describe('calculateDaysDifference', () => {
        it('應該正確計算天數差異', () => {
            const start = createSimpleDate(2024, 6, 15)
            const end = createSimpleDate(2024, 6, 20)
            expect(calculateDaysDifference(start, end)).toBe(5)
        })

        it('應該正確計算負數天數差異', () => {
            const start = createSimpleDate(2024, 6, 20)
            const end = createSimpleDate(2024, 6, 15)
            expect(calculateDaysDifference(start, end)).toBe(-5)
        })

        it('應該正確計算跨月的天數差異', () => {
            const start = createSimpleDate(2024, 6, 29)
            const end = createSimpleDate(2024, 7, 4)
            expect(calculateDaysDifference(start, end)).toBe(5)
        })

        it('應該正確計算相同日期的差異', () => {
            const date = createSimpleDate(2024, 6, 15)
            expect(calculateDaysDifference(date, date)).toBe(0)
        })
    })

    describe('getTodaysDate', () => {
        it('應該返回今天的日期', () => {
            const today = getTodaysDate()
            const now = new Date()
            expect(today.year).toBe(now.getFullYear())
            expect(today.month).toBe(now.getMonth() + 1)
            expect(today.day).toBe(now.getDate())
            expect(today.hour).toBeUndefined()
            expect(today.minute).toBeUndefined()
            expect(today.second).toBeUndefined()
        })
    })

    describe('getNow', () => {
        it('應該返回當前時間', () => {
            const now = getNow()
            const currentTime = new Date()
            expect(now.year).toBe(currentTime.getFullYear())
            expect(now.month).toBe(currentTime.getMonth() + 1)
            expect(now.day).toBe(currentTime.getDate())
            expect(now.hour).toBeDefined()
            expect(now.minute).toBeDefined()
            expect(now.second).toBeDefined()
        })
    })

    describe('createSimpleDate', () => {
        it('應該創建只包含日期的對象', () => {
            const result = createSimpleDate(2024, 6, 15)
            expect(result).toEqual({
                year: 2024,
                month: 6,
                day: 15
            })
        })

        it('應該創建包含時間的對象', () => {
            const result = createSimpleDate(2024, 6, 15, 14, 30, 45)
            expect(result).toEqual({
                year: 2024,
                month: 6,
                day: 15,
                hour: 14,
                minute: 30,
                second: 45
            })
        })

        it('應該創建部分時間的對象', () => {
            const result = createSimpleDate(2024, 6, 15, 14, 30)
            expect(result).toEqual({
                year: 2024,
                month: 6,
                day: 15,
                hour: 14,
                minute: 30
            })
        })
    })

    describe('isDateInRange', () => {
        it('應該返回 true 當日期在範圍內', () => {
            const date = createSimpleDate(2024, 6, 15)
            const minDate = createSimpleDate(2024, 6, 10)
            const maxDate = createSimpleDate(2024, 6, 20)
            expect(isDateInRange(date, minDate, maxDate)).toBe(true)
        })

        it('應該返回 false 當日期小於最小值', () => {
            const date = createSimpleDate(2024, 6, 5)
            const minDate = createSimpleDate(2024, 6, 10)
            const maxDate = createSimpleDate(2024, 6, 20)
            expect(isDateInRange(date, minDate, maxDate)).toBe(false)
        })

        it('應該返回 false 當日期大於最大值', () => {
            const date = createSimpleDate(2024, 6, 25)
            const minDate = createSimpleDate(2024, 6, 10)
            const maxDate = createSimpleDate(2024, 6, 20)
            expect(isDateInRange(date, minDate, maxDate)).toBe(false)
        })

        it('應該返回 true 當只設置最小值且日期有效', () => {
            const date = createSimpleDate(2024, 6, 15)
            const minDate = createSimpleDate(2024, 6, 10)
            expect(isDateInRange(date, minDate)).toBe(true)
        })

        it('應該返回 true 當只設置最大值且日期有效', () => {
            const date = createSimpleDate(2024, 6, 15)
            const maxDate = createSimpleDate(2024, 6, 20)
            expect(isDateInRange(date, null, maxDate)).toBe(true)
        })

        it('應該返回 false 當日期為 null', () => {
            const minDate = createSimpleDate(2024, 6, 10)
            const maxDate = createSimpleDate(2024, 6, 20)
            expect(isDateInRange(null as any, minDate, maxDate)).toBe(false)
        })
    })

    describe('getCurrentMonthRange', () => {
        it('應該返回當前月份的範圍', () => {
            const range = getCurrentMonthRange()
            const now = new Date()

            expect(range.start.year).toBe(now.getFullYear())
            expect(range.start.month).toBe(now.getMonth() + 1)
            expect(range.start.day).toBe(1)
            expect(range.start.hour).toBe(0)
            expect(range.start.minute).toBe(0)
            expect(range.start.second).toBe(0)

            expect(range.end.year).toBeDefined()
            expect(range.end.month).toBeDefined()
            expect(range.end.day).toBeDefined()
        })
    })

    describe('isValidDateFormat', () => {
        it('應該返回 true 對於有效的日期格式', () => {
            expect(isValidDateFormat('YYYY-MM-DD')).toBe(true)
            expect(isValidDateFormat('DD/MM/YYYY')).toBe(true)
            expect(isValidDateFormat('MM-DD-YY')).toBe(true)
        })

        it('應該返回 false 對於無效的日期格式', () => {
            expect(isValidDateFormat('YYYY-MM')).toBe(false)
            expect(isValidDateFormat('MM-DD')).toBe(false)
            expect(isValidDateFormat('YYYY')).toBe(false)
            expect(isValidDateFormat('')).toBe(false)
        })

        it('應該返回 false 對於包含無效標記的格式', () => {
            expect(isValidDateFormat('YYYY-MM-DD-XXX')).toBe(false)
        })
    })

    describe('isValidTimeFormatPattern', () => {
        it('應該返回 true 對於有效的時間格式', () => {
            expect(isValidTimeFormatPattern('HH:mm')).toBe(true)
            expect(isValidTimeFormatPattern('HH:mm:ss')).toBe(true)
            expect(isValidTimeFormatPattern('H:m:s')).toBe(true)
        })

        it('應該返回 false 對於無效的時間格式', () => {
            expect(isValidTimeFormatPattern('HH')).toBe(false)
            expect(isValidTimeFormatPattern('mm')).toBe(false)
            expect(isValidTimeFormatPattern('')).toBe(false)
        })
    })

    describe('fixDateFormat', () => {
        it('應該修正小寫的日期格式', () => {
            expect(fixDateFormat('yyyy-mm-dd')).toBe('YYYY-MM-DD')
            expect(fixDateFormat('dd/mm/yyyy')).toBe('DD/MM/YYYY')
            expect(fixDateFormat('yy-mm-dd')).toBe('YY-MM-DD')
        })

        it('應該保持正確的格式不變', () => {
            expect(fixDateFormat('YYYY-MM-DD')).toBe('YYYY-MM-DD')
        })
    })

    describe('fixTimeFormat', () => {
        it('應該支援小寫的時間格式', () => {
            expect(fixTimeFormat('hh:mm:ss A')).toBe('hh:mm:ss A')
        })

        it('應該保持正確的格式不變', () => {
            expect(fixTimeFormat('HH:mm:ss')).toBe('HH:mm:ss')
        })
    })

    describe('isSimpleDateValue', () => {
        it('應該返回 true 對於有效的 SimpleDateValue', () => {
            const validDate = { year: 2024, month: 6, day: 15 }
            expect(isSimpleDateValue(validDate)).toBe(true)
        })

        it('應該返回 true 對於包含時間的 SimpleDateValue', () => {
            const validDate = { year: 2024, month: 6, day: 15, hour: 14, minute: 30, second: 45 }
            expect(isSimpleDateValue(validDate)).toBe(true)
        })

        it('應該返回 false 對於無效的對象', () => {
            expect(isSimpleDateValue(null)).toBe(false)
            expect(isSimpleDateValue(undefined)).toBe(false)
            expect(isSimpleDateValue({})).toBe(false)
            expect(isSimpleDateValue({ year: 2024 })).toBe(false)
            expect(isSimpleDateValue({ year: 2024, month: 6 })).toBe(false)
            expect(isSimpleDateValue({ year: '2024', month: 6, day: 15 })).toBe(false)
        })
    })
})
expect(parseInputToSimpleDate(null)).toBeNull()
expect(parseInputToSimpleDate(undefined)).toBeNull()
expect(parseInputToSimpleDate('invalid-date')).toBeNull()
