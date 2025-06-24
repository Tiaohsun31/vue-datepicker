import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDateTimePicker } from '@/composables/useDateTimePicker'
import { createSimpleDate } from '@/utils/dateUtils'
import { withSetup, cleanupSetup } from '../test-helpers'

describe('useDateTimePicker Integration Tests', () => {
    let wrapper: any
    let mockEmitters: any

    // 模擬 DOM 引用
    const createMockRefs = () => ({
        containerRef: ref(null),
        calendarRef: ref(null),
        dateInputRef: ref({
            validate: vi.fn().mockResolvedValue(true),
            focus: vi.fn(),
            focusLast: vi.fn(),
            setDate: vi.fn()
        }),
        timeInputRef: ref({
            validate: vi.fn().mockResolvedValue(true),
            focus: vi.fn(),
            setTime: vi.fn()
        })
    })

    beforeEach(() => {
        mockEmitters = {
            update: vi.fn(),
            change: vi.fn(),
            validation: vi.fn()
        }
    })

    afterEach(() => {
        if (wrapper) {
            cleanupSetup(wrapper)
            wrapper = null
        }
    })

    describe('初始化與基本功能', () => {
        it('應該正確初始化所有狀態', () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({}, refs)
            )
            wrapper = testWrapper

            expect(datePicker.internalDateTime.value).toBeNull()
            expect(datePicker.inputDateValue.value).toBeNull()
            expect(datePicker.inputTimeValue.value).toBeNull()
            expect(datePicker.hasErrors.value).toBe(false)
            expect(datePicker.showCalendar.value).toBe(false)
        })

        it('應該正確設置外部值', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    modelValue: '2024-06-15T14:30:00'
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)
            await nextTick()

            expect(datePicker.internalDateTime.value).toEqual({
                year: 2024,
                month: 6,
                day: 15,
                hour: 14,
                minute: 30,
                second: 0
            })
            expect(datePicker.inputDateValue.value).toBe('2024-06-15')
            expect(datePicker.inputTimeValue.value).toBe('14:30:00')
        })
    })

    describe('日期完成處理流程', () => {
        it('當日期輸入完成時，應該更新內部狀態並處理自動聚焦', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    showTime: true,
                    autoFocusTimeAfterDate: true
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)

            // 模擬日期輸入完成
            await datePicker.handleDateComplete('2024-06-15')

            // 驗證內部狀態更新
            expect(datePicker.internalDateTime.value).toMatchObject({
                year: 2024,
                month: 6,
                day: 15
            })

            // 驗證事件發送
            expect(mockEmitters.update).toHaveBeenCalled()
            expect(mockEmitters.change).toHaveBeenCalled()

            // 驗證自動聚焦到時間輸入
            await nextTick()
            expect(refs.timeInputRef.value.focus).toHaveBeenCalled()
        })

        it('當日期無效時，應該處理驗證錯誤', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    minDate: '2024-06-01',
                    maxDate: '2024-06-30'
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)

            // 嘗試設置超出範圍的日期
            await datePicker.handleDateComplete('2024-07-15')

            // 應該有驗證錯誤
            expect(datePicker.hasErrors.value).toBe(true)
        })

        it('在沒有時間模式下，日期完成後不應該自動聚焦時間', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    showTime: false
                }, refs)
            )
            wrapper = testWrapper

            await datePicker.handleDateComplete('2024-06-15')

            // 不應該嘗試聚焦時間輸入
            expect(refs.timeInputRef.value.focus).not.toHaveBeenCalled()
        })
    })

    describe('時間完成處理流程', () => {
        it('當時間輸入完成時，應該更新完整的日期時間', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    showTime: true,
                    modelValue: '2024-06-15' // 已有日期
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)
            await nextTick() // 等待初始值設置

            // 完成時間輸入
            await datePicker.handleTimeComplete('14:30:45')

            // 驗證完整的日期時間
            expect(datePicker.internalDateTime.value).toMatchObject({
                year: 2024,
                month: 6,
                day: 15,
                hour: 14,
                minute: 30,
                second: 45
            })

            // 驗證事件發送
            expect(mockEmitters.update).toHaveBeenCalled()
            expect(mockEmitters.change).toHaveBeenCalled()
        })
    })

    describe('日曆選擇處理', () => {
        it('當從日曆選擇日期時，應該正確更新並關閉日曆', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({}, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)

            // 先打開日曆
            datePicker.showCalendarPopup()
            expect(datePicker.showCalendar.value).toBe(true)

            // 從日曆選擇日期
            const selectedDate = createSimpleDate(2024, 6, 15)
            await datePicker.handleCalendarSelect(selectedDate, true)

            // 驗證日期更新
            expect(datePicker.internalDateTime.value).toEqual(selectedDate)

            // 驗證日曆關閉
            expect(datePicker.showCalendar.value).toBe(false)

            // 驗證事件發送
            expect(mockEmitters.update).toHaveBeenCalled()
        })

        it('當選擇超出範圍的日期時，應該拒絕並保持原狀', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    minDate: '2024-06-01',
                    maxDate: '2024-06-30'
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)

            // 嘗試選擇超出範圍的日期
            const invalidDate = createSimpleDate(2024, 7, 15)
            await datePicker.handleCalendarSelect(invalidDate)

            // 日期不應該更新
            expect(datePicker.internalDateTime.value).toBeNull()

            // 應該有驗證錯誤
            expect(datePicker.hasErrors.value).toBe(true)
        })
    })

    describe('驗證錯誤處理與合併', () => {
        it('應該正確合併來自日期和時間的驗證錯誤', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    showTime: true,
                    required: true
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)

            // 觸發日期驗證錯誤
            datePicker.validateDateInput(false, { date: 'date.required' })

            // 觸發時間驗證錯誤
            datePicker.validateTimeInput(false, { hour: 'time.hourRequired' })

            // 驗證錯誤被正確合併
            expect(datePicker.mergedErrors.value).toEqual({
                'date.date': 'date.required',
                'time.hour': 'time.hourRequired'
            })

            expect(datePicker.hasErrors.value).toBe(true)

            // 驗證事件發送
            expect(mockEmitters.validation).toHaveBeenCalledWith(false, expect.any(Object))
        })

        it('當錯誤被修正時，應該清除相關錯誤', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({}, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)

            // 先產生錯誤
            datePicker.validateDateInput(false, { date: 'date.required' })
            expect(datePicker.hasErrors.value).toBe(true)

            // 修正錯誤
            datePicker.validateDateInput(true, {})
            expect(datePicker.hasErrors.value).toBe(false)

            // 驗證事件發送
            expect(mockEmitters.validation).toHaveBeenLastCalledWith(true, {})
        })
    })

    describe('日曆系統支援', () => {
        it('應該正確處理民國曆日期轉換', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    calendar: 'roc',
                    locale: 'zh-TW'
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)

            // 設置民國113年的日期（對應西元2024年）
            const rocDate = createSimpleDate(2024, 6, 15) // 內部仍使用西元年
            await datePicker.handleCalendarSelect(rocDate)

            // 驗證日期正確設置
            expect(datePicker.internalDateTime.value).toMatchObject({
                year: 2024,
                month: 6,
                day: 15
            })

            // 驗證輸出格式正確（應該根據 outputType 決定）
            expect(mockEmitters.update).toHaveBeenCalled()
        })
    })

    describe('主要操作方法', () => {
        it('reset 方法應該清除所有狀態', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    modelValue: '2024-06-15T14:30:00'
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)
            await nextTick()

            // 確認有初始值
            expect(datePicker.internalDateTime.value).not.toBeNull()

            // 重置
            datePicker.reset()

            // 驗證所有狀態被清除
            expect(datePicker.internalDateTime.value).toBeNull()
            expect(datePicker.inputDateValue.value).toBeNull()
            expect(datePicker.inputTimeValue.value).toBeNull()
            expect(datePicker.hasErrors.value).toBe(false)

            // 驗證事件發送
            expect(mockEmitters.update).toHaveBeenCalledWith(null)
        })

        it('validate 方法應該觸發所有子組件驗證', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    showTime: true
                }, refs)
            )
            wrapper = testWrapper

            const result = await datePicker.validate()

            // 驗證所有相關組件的 validate 方法被調用
            expect(refs.dateInputRef.value.validate).toHaveBeenCalled()
            expect(refs.timeInputRef.value.validate).toHaveBeenCalled()

            expect(typeof result).toBe('boolean')
        })

        it('selectNow 應該設置當前日期時間', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    showTime: true
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)

            // 模擬當前時間
            const mockNow = new Date('2024-06-15T14:30:45')
            vi.setSystemTime(mockNow)

            await datePicker.selectNow()

            // 驗證設置了當前時間
            expect(datePicker.internalDateTime.value).toMatchObject({
                year: 2024,
                month: 6,
                day: 15,
                hour: 14,
                minute: 30,
                second: 45
            })

            // 驗證事件發送
            expect(mockEmitters.update).toHaveBeenCalled()

            vi.useRealTimers()
        })
    })

    describe('容器點擊處理', () => {
        it('應該正確處理容器點擊事件', () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({}, refs)
            )
            wrapper = testWrapper

            // 模擬點擊事件
            const mockEvent = {
                target: document.createElement('div'),
                preventDefault: vi.fn()
            } as any

            // 應該不會拋出錯誤
            expect(() => {
                datePicker.handleContainerClick(mockEvent)
            }).not.toThrow()
        })
    })

    describe('導航處理', () => {
        it('應該正確處理從時間輸入導航到日期輸入', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({}, refs)
            )
            wrapper = testWrapper

            datePicker.handleNavigateToDate()
            await nextTick()

            // 應該聚焦到日期輸入的最後一個欄位
            expect(refs.dateInputRef.value.focusLast).toHaveBeenCalled()
        })
    })

    describe('邊界條件與錯誤處理', () => {
        it('當 refs 不可用時不應該拋出錯誤', () => {
            const refs = {
                containerRef: ref(null),
                calendarRef: ref(null),
                dateInputRef: ref(null),
                timeInputRef: ref(null)
            }

            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({}, refs)
            )
            wrapper = testWrapper

            // 這些操作不應該拋出錯誤
            expect(() => {
                datePicker.focus()
                datePicker.handleNavigateToDate()
            }).not.toThrow()
        })

        it('當 modelValue 格式無效時應該正確處理', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    modelValue: 'invalid-date-format'
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)
            await nextTick()

            // 應該處理無效格式並設置為 null
            expect(datePicker.internalDateTime.value).toBeNull()

            // 應該有驗證錯誤
            expect(datePicker.hasErrors.value).toBe(true)
        })

        it('當同時有多種類型錯誤時應該正確處理', async () => {
            const refs = createMockRefs()
            const [datePicker, testWrapper] = withSetup(() =>
                useDateTimePicker({
                    showTime: true,
                    required: true,
                    minDate: '2024-06-01'
                }, refs)
            )
            wrapper = testWrapper

            datePicker.setEmitters(mockEmitters)

            // 設置多種錯誤
            datePicker.validateDateInput(false, {
                date: 'date.required',
                year: 'year.invalid'
            })
            datePicker.validateTimeInput(false, {
                hour: 'time.hourRequired'
            })

            // 驗證所有錯誤都被包含
            expect(Object.keys(datePicker.mergedErrors.value)).toHaveLength(3)
            expect(datePicker.hasErrors.value).toBe(true)
        })
    })
})
