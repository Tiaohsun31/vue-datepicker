// 目前暫時沒用到
import { useAttrs, computed } from 'vue'

export function useTestId() {
    const attrs = useAttrs()

    const baseTestId = computed(() => {
        if (import.meta.env.NODE_ENV === 'production') return null
        return attrs['data-testid'] || null
    })

    const getTestId = (suffix?: string) => {
        if (!baseTestId.value) return undefined
        return suffix ? `${baseTestId.value}-${suffix}` : baseTestId.value
    }

    // 預定義常用的測試元素
    const testIds = computed(() => {
        if (!baseTestId.value) return {}

        return {
            container: baseTestId.value,
            button: `${baseTestId.value}-button`,
            input: `${baseTestId.value}-input`,
            dialog: `${baseTestId.value}-dialog`,
            yearInput: `${baseTestId.value}-year-input`,
            monthInput: `${baseTestId.value}-month-input`,
            dayInput: `${baseTestId.value}-day-input`,
            clearButton: `${baseTestId.value}-clear-button`,
            calendarButton: `${baseTestId.value}-calendar-button`,
        }
    })

    return {
        getTestId,
        testIds: testIds.value,
        hasTestId: !!baseTestId.value
    }
}
