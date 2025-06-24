// tests/units/composables/useDateTimeValidation.test.ts
import { describe, it, expect } from 'vitest'
import { useDateTimeValidation } from '@/composables/useDateTimeValidation'
import { createSimpleDate } from '@/utils/dateUtils'

describe('useDateTimeValidation', () => {
    it('應該正確驗證必填字段', () => {
        const { validateDateTime, hasErrors, errors } = useDateTimeValidation({
            required: true
        })

        // 沒有輸入時應該有錯誤
        const result = validateDateTime(null, null)
        expect(result).toBe(false)
        expect(hasErrors.value).toBe(true)
        expect(errors.value).toHaveProperty('date')
    })

    it('應該正確驗證日期範圍', () => {
        const minDate = '2024-01-01'
        const maxDate = '2024-12-31'

        const { validateDateRange } = useDateTimeValidation({
            minDate,
            maxDate
        })

        const validDate = createSimpleDate(2024, 6, 15)
        const tooEarlyDate = createSimpleDate(2023, 12, 31)
        const tooLateDate = createSimpleDate(2025, 1, 1)

        expect(validateDateRange(validDate)).toBe(true)
        expect(validateDateRange(tooEarlyDate)).toBe(false)
        expect(validateDateRange(tooLateDate)).toBe(false)
    })

    it('應該正確清除錯誤', () => {
        const { handleDateValidation, clearAllErrors, hasErrors } = useDateTimeValidation()

        // 添加錯誤
        handleDateValidation(false, { date: 'date.required' })
        expect(hasErrors.value).toBe(true)

        // 清除錯誤
        clearAllErrors()
        expect(hasErrors.value).toBe(false)
    })
})
