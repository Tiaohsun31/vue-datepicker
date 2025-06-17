
// tests/utils/calendarUtils.test.ts
import { describe, it, expect } from 'vitest'
import { CalendarUtils } from '@/utils/calendarUtils'

describe('CalendarUtils', () => {
    describe('convertToCalendarDate', () => {
        it('應該正確轉換西元曆日期', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result?.year).toBe(2024)
            expect(result?.month).toBe(6)
            expect(result?.day).toBe(15)
        })

        it('應該正確轉換民國曆日期', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'roc')

            expect(result).not.toBeNull()
            // 民國113年應該對應西元2024年
            expect(result?.year).toBe(113)
        })

        it('應該返回 null 對於無效輸入', () => {
            expect(CalendarUtils.convertToCalendarDate(null, 'gregory')).toBeNull()
        })

        it('應該處理轉換錯誤並返回 null', () => {
            const invalidDate = { year: 0, month: 0, day: 0 }
            const result = CalendarUtils.convertToCalendarDate(invalidDate, 'gregory')
            expect(result).toBeNull()
        })
    })

    describe('convertToCalendarDateTime', () => {
        it('應該正確轉換西元曆日期時間', () => {
            const simpleDate = { year: 2024, month: 6, day: 15, hour: 14, minute: 30, second: 45 }
            const result = CalendarUtils.convertToCalendarDateTime(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result?.year).toBe(2024)
            expect(result?.month).toBe(6)
            expect(result?.day).toBe(15)
            expect(result?.hour).toBe(14)
            expect(result?.minute).toBe(30)
            expect(result?.second).toBe(45)
        })

        it('應該使用預設值補齊缺失的時間', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.convertToCalendarDateTime(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result?.hour).toBe(0)
            expect(result?.minute).toBe(0)
            expect(result?.second).toBe(0)
        })

        it('應該返回 null 對於無效輸入', () => {
            expect(CalendarUtils.convertToCalendarDateTime(null, 'gregory')).toBeNull()
        })
    })

    describe('convertToCalendarDateSmart', () => {
        it('應該自動選擇 CalendarDate 對於無時間資訊', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.convertToCalendarDateSmart(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result).toHaveProperty('year', 2024)
            expect(result).not.toHaveProperty('hour')
        })

        it('應該自動選擇 CalendarDateTime 對於有時間資訊', () => {
            const simpleDate = { year: 2024, month: 6, day: 15, hour: 14 }
            const result = CalendarUtils.convertToCalendarDateSmart(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result).toHaveProperty('hour', 14)
        })
    })

    describe('convertFromCalendarDate', () => {
        it('應該正確轉換西元曆日期回 SimpleDateValue', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const calendarDate = CalendarUtils.convertToCalendarDate(simpleDate, 'gregory')
            const result = CalendarUtils.convertFromCalendarDate(calendarDate, 'gregory')

            expect(result).toEqual(simpleDate)
        })

        it('應該返回 null 對於無效輸入', () => {
            expect(CalendarUtils.convertFromCalendarDate(null, 'gregory')).toBeNull()
        })
    })

    describe('createSafeCalendar', () => {
        it('應該成功創建西元曆', () => {
            const calendar = CalendarUtils.createSafeCalendar('gregory')
            expect(calendar).toBeDefined()
            expect(calendar.identifier).toBe('gregory')
        })

        it('應該回退到西元曆對於無效日曆ID', () => {
            const calendar = CalendarUtils.createSafeCalendar('invalid-calendar')
            expect(calendar).toBeDefined()
            expect(calendar.identifier).toBe('gregory')
        })
    })

    describe('convertGregorianYear', () => {
        it('應該正確轉換西元年到民國年', () => {
            const result = CalendarUtils.convertGregorianYear(2024, 'roc')
            expect(result.localYear).toBe(113)
            expect(result.isValid).toBe(true)
        })

        it('應該對西元曆返回相同年份', () => {
            const result = CalendarUtils.convertGregorianYear(2024, 'gregory')
            expect(result.localYear).toBe(2024)
            expect(result.isValid).toBe(true)
        })

        it('應該處理無效年份', () => {
            const result = CalendarUtils.convertGregorianYear(0, 'roc')
            expect(result.isValid).toBe(false)
        })
    })

    describe('convertToGregorianYear', () => {
        it('應該正確轉換民國年到西元年', () => {
            const result = CalendarUtils.convertToGregorianYear(113, 'roc')
            expect(result).toBe(2024)
        })

        it('應該對西元曆返回相同年份', () => {
            const result = CalendarUtils.convertToGregorianYear(2024, 'gregory')
            expect(result).toBe(2024)
        })
    })

    describe('getCalendarDisplayName', () => {
        it('應該返回正確的日曆顯示名稱', () => {
            expect(CalendarUtils.getCalendarDisplayName('gregory', 'zh-TW')).toBe('西元')
            expect(CalendarUtils.getCalendarDisplayName('roc', 'zh-TW')).toBe('民國')
            expect(CalendarUtils.getCalendarDisplayName('gregory', 'en-US')).toBe('Gregorian')
        })

        it('應該回退到英文名稱對於不支援的語言', () => {
            expect(CalendarUtils.getCalendarDisplayName('gregory', 'fr-FR')).toBe('Gregorian')
        })

        it('應該回退到日曆ID對於未知日曆', () => {
            expect(CalendarUtils.getCalendarDisplayName('unknown', 'zh-TW')).toBe('unknown')
        })
    })

    describe('getCalendarRange', () => {
        it('應該返回正確的年份範圍', () => {
            const gregorianRange = CalendarUtils.getCalendarRange('gregory')
            expect(gregorianRange.min).toBe(1)
            expect(gregorianRange.max).toBeGreaterThan(2024)

            const rocRange = CalendarUtils.getCalendarRange('roc')
            expect(rocRange.min).toBe(1912)
        })

        it('應該對未知日曆返回預設範圍', () => {
            const unknownRange = CalendarUtils.getCalendarRange('unknown')
            expect(unknownRange.min).toBe(1)
            expect(unknownRange.max).toBeGreaterThan(2024)
        })
    })

    describe('getMonthNames', () => {
        it('應該返回12個月份名稱', () => {
            const months = CalendarUtils.getMonthNames('zh-TW')
            expect(months).toHaveLength(12)
            expect(months[0]).toBe('1月')
        })

        it('應該處理英文語言', () => {
            const months = CalendarUtils.getMonthNames('en-US')
            expect(months).toHaveLength(12)
            expect(months[0]).toBe('Jan')
        })
    })

    describe('generateCalendarDays', () => {
        it('應該生成日曆網格', () => {
            const days = CalendarUtils.generateCalendarDays(2024, 6, 'gregory', 'zh-TW')
            expect(days.length).toBeGreaterThan(28)
            expect(days.length).toBeLessThanOrEqual(42)
        })

        it('應該處理錯誤並返回空陣列', () => {
            const days = CalendarUtils.generateCalendarDays(0, 0, 'invalid', 'zh-TW')
            console.log(days)
            expect(days).toEqual([])
        })
    })

    describe('formatOutput', () => {
        it('應該格式化西元曆日期', () => {
            const date = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.formatOutput(date, 'YYYY-MM-DD', 'gregory')
            expect(result).toBe('2024-06-15')
        })

        it('應該處理帶時間的日期', () => {
            const date = { year: 2024, month: 6, day: 15, hour: 14, minute: 30 }
            const result = CalendarUtils.formatOutput(date, 'YYYY-MM-DD HH:mm:ss', 'gregory')
            expect(result).toBe('2024-06-15 14:30:00')
        })

        it('應該對空輸入返回空字串', () => {
            const result = CalendarUtils.formatOutput(null as any, 'YYYY-MM-DD')
            expect(result).toBe('')
        })

        it('應該使用回退格式對於格式化錯誤', () => {
            const date = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.formatOutput(date, 'invalid-format', 'gregory')
            expect(result).toContain('2024')
            expect(result).toContain('06')
            expect(result).toContain('15')
        })
    })
    describe('convertToCalendarDate - Additional Tests', () => {
        it('應該正確轉換佛曆日期', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'buddhist')

            expect(result).not.toBeNull()
            // 佛曆2567年應該對應西元2024年
            expect(result?.year).toBe(2567)
            expect(result?.month).toBe(6)
            expect(result?.day).toBe(15)
        })

        it('應該正確轉換日本曆日期', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'japanese')

            expect(result).not.toBeNull()
            // 應該轉換為令和年號
            expect(result?.year).toBeGreaterThan(0)
            expect(result?.month).toBe(6)
            expect(result?.day).toBe(15)
        })

        it('應該處理邊界日期 - 年初', () => {
            const simpleDate = { year: 2024, month: 1, day: 1 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result?.year).toBe(2024)
            expect(result?.month).toBe(1)
            expect(result?.day).toBe(1)
        })

        it('應該處理邊界日期 - 年末', () => {
            const simpleDate = { year: 2024, month: 12, day: 31 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result?.year).toBe(2024)
            expect(result?.month).toBe(12)
            expect(result?.day).toBe(31)
        })

        it('應該處理閏年日期', () => {
            const simpleDate = { year: 2024, month: 2, day: 29 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result?.year).toBe(2024)
            expect(result?.month).toBe(2)
            expect(result?.day).toBe(29)
        })

        it('應該處理非閏年的2月28日', () => {
            const simpleDate = { year: 2023, month: 2, day: 28 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result?.year).toBe(2023)
            expect(result?.month).toBe(2)
            expect(result?.day).toBe(28)
        })

        it('應該正確轉換希伯來曆日期', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'hebrew')
            expect(result).not.toBeNull()
            expect(result?.year).toBe(5784)
            expect(result?.month).toBe(10)
            expect(result?.day).toBe(9)
        })

        // BUG: 暫時不進行伊斯蘭曆驗證，因為@internationalized/date中的createCalendar會變成gregory
        // it('應該正確轉換伊斯蘭曆日期', () => {
        //     const simpleDate = { year: 2024, month: 6, day: 15 }
        //     const result = CalendarUtils.convertToCalendarDate(simpleDate, 'islamic')

        //     expect(result).not.toBeNull()
        //     // 伊斯蘭曆年份應該小於西元年份
        //     expect(result?.year).toBeLessThan(2024)
        //     expect(result?.month).toBeDefined()
        //     expect(result?.day).toBeDefined()
        // })

        it('應該正確轉換波斯曆日期', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'persian')
            expect(result).not.toBeNull()
            // 波斯曆年份應該小於西元年份
            expect(result?.year).toBeLessThan(2024)
            expect(result?.month).toBeDefined()
            expect(result?.day).toBeDefined()
        })

        it('應該處理無效日曆ID並回退到西元曆', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'invalid-calendar')

            expect(result).not.toBeNull()
            // 應該回退到西元曆
            expect(result?.year).toBe(2024)
            expect(result?.month).toBe(6)
            expect(result?.day).toBe(15)
        })

        it('應該處理極小年份', () => {
            const simpleDate = { year: 1, month: 1, day: 1 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result?.year).toBe(1)
            expect(result?.month).toBe(1)
            expect(result?.day).toBe(1)
        })

        it('應該處理大年份', () => {
            const simpleDate = { year: 9999, month: 12, day: 31 }
            const result = CalendarUtils.convertToCalendarDate(simpleDate, 'gregory')

            expect(result).not.toBeNull()
            expect(result?.year).toBe(9999)
            expect(result?.month).toBe(12)
            expect(result?.day).toBe(31)
        })

        it('應該正確設置轉換後的日曆標識符', () => {
            const simpleDate = { year: 2024, month: 6, day: 15 }

            const gregorianResult = CalendarUtils.convertToCalendarDate(simpleDate, 'gregory')
            expect(gregorianResult?.calendar.identifier).toBe('gregory')

            const rocResult = CalendarUtils.convertToCalendarDate(simpleDate, 'roc')
            expect(rocResult?.calendar.identifier).toBe('roc')

            const buddhistResult = CalendarUtils.convertToCalendarDate(simpleDate, 'buddhist')
            expect(buddhistResult?.calendar.identifier).toBe('buddhist')
        })

        // it('應該處理catch區塊的錯誤情況', () => {
        //     // 使用spy來模擬createSafeCalendar拋出錯誤
        //     const originalCreateSafeCalendar = CalendarUtils.createSafeCalendar
        //     const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        //     CalendarUtils.createSafeCalendar = vi.fn().mockImplementation(() => {
        //         throw new Error('模擬錯誤')
        //     })

        //     const simpleDate = { year: 2024, month: 6, day: 15 }
        //     const result = CalendarUtils.convertToCalendarDate(simpleDate, 'roc')

        //     expect(result).toBeNull()
        //     expect(consoleErrorSpy).toHaveBeenCalledWith('轉換為 CalendarDate 失敗:', expect.any(Error))

        //     // 恢復原始函數
        //     CalendarUtils.createSafeCalendar = originalCreateSafeCalendar
        //     consoleErrorSpy.mockRestore()
        // })
    })
})
