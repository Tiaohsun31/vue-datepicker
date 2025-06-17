// tests/composables/useDateTimeValue.test.ts
import { describe, it, expect } from 'vitest'
import { useDateTimeValue } from '@/composables/useDateTimeValue'
import { createSimpleDate } from '@/utils/dateUtils'

describe('useDateTimeValue', () => {
    it('應該正確初始化', () => {
        const { internalDateTime, inputDateValue, inputTimeValue } = useDateTimeValue()

        expect(internalDateTime.value).toBeNull()
        expect(inputDateValue.value).toBeNull()
        expect(inputTimeValue.value).toBeNull()
    })

    it('應該正確設置外部值', () => {
        const { setExternalValue, internalDateTime, inputDateValue } = useDateTimeValue({
            dateFormat: 'YYYY-MM-DD'
        })

        const testDate = createSimpleDate(2024, 6, 15)
        setExternalValue(testDate)

        expect(internalDateTime.value).toEqual(testDate)
        expect(inputDateValue.value).toBe('2024-06-15')
    })

    it('應該正確處理時間值', () => {
        const { setExternalValue, inputTimeValue } = useDateTimeValue({
            showTime: true,
            enableSeconds: true
        })

        const testDateTime = createSimpleDate(2024, 6, 15, 14, 30, 45)
        setExternalValue(testDateTime)

        expect(inputTimeValue.value).toBe('14:30:45')
    })

    it('應該正確清除值', () => {
        const { setExternalValue, clearValues, internalDateTime, inputDateValue } = useDateTimeValue()

        const testDate = createSimpleDate(2024, 6, 15)
        setExternalValue(testDate)

        expect(internalDateTime.value).not.toBeNull()

        clearValues()

        expect(internalDateTime.value).toBeNull()
        expect(inputDateValue.value).toBeNull()
    })
})
