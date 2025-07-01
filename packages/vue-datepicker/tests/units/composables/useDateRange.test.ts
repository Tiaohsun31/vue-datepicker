// tests/composables/useDateRange.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDateRange } from '@/composables/useDateRange'
import { createSimpleDate } from '@/utils/dateUtils'
import { withSetup, cleanupSetup } from '../test-helpers'

describe('useDateRange Integration Tests', () => {
    let wrapper: any
    let mockEmitters: any
    // 模擬 DOM 引用
    const createMockRefs = () => ({
        containerRef: ref(null),
        calendarRef: ref(null),
        startDateInputRef: ref({
            validate: vi.fn().mockResolvedValue(true),
            focus: vi.fn(),
            setDate: vi.fn(),
            focusLast: vi.fn()
        }),
        endDateInputRef: ref({
            validate: vi.fn().mockResolvedValue(true),
            focus: vi.fn(),
            setDate: vi.fn(),
            focusLast: vi.fn()
        }),
        startTimeInputRef: ref({
            validate: vi.fn().mockResolvedValue(true),
            focus: vi.fn(),
            setTime: vi.fn()
        }),
        endTimeInputRef: ref({
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
        it('應該正確初始化範圍選擇狀態', () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            expect(dateRange.startDateTime.internalDateTime.value).toBeNull()
            expect(dateRange.endDateTime.internalDateTime.value).toBeNull()
            expect(dateRange.hasRangeValue.value).toBe(false)
            expect(dateRange.hasErrors.value).toBe(false)
            expect(dateRange.isValidRange.value).toBe(false)
        })

        it('應該正確設置外部範圍值', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    modelValue: {
                        start: '2024-06-10T09:00:00',
                        end: '2024-06-20T17:00:00'
                    }
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)
            await nextTick()

            expect(dateRange.startDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 10, hour: 9, minute: 0, second: 0
            })
            expect(dateRange.endDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 20, hour: 17, minute: 0, second: 0
            })
            expect(dateRange.hasRangeValue.value).toBe(true)
            expect(dateRange.isValidRange.value).toBe(true)
        })

        it('當初始範圍順序錯誤時應該自動交換', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    modelValue: {
                        start: '2024-06-20', // 較晚的日期
                        end: '2024-06-10'    // 較早的日期
                    }
                }, refs)
            )
            wrapper = testWrapper
            dateRange.setEmitters(mockEmitters)
            await new Promise(resolve => setTimeout(resolve, 10))

            // 應該自動交換
            expect(dateRange.startDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 10
            })
            expect(dateRange.endDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 20
            })
            // 應該發送修正後的值
            expect(mockEmitters.update).toHaveBeenCalled()
        })
    })

    describe('範圍選擇流程', () => {
        it('第一次點擊應該設置開始日期', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)
            const startDate = createSimpleDate(2024, 6, 10)
            dateRange.handleCalendarRangeSelect(startDate, null)

            // 應該設置開始日期
            expect(dateRange.startDateTime.internalDateTime.value).toEqual(startDate)
            expect(dateRange.endDateTime.internalDateTime.value).toBeNull()
        })

        it('第二次點擊應該完成範圍選擇', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            const startDate = createSimpleDate(2024, 6, 10)
            const endDate = createSimpleDate(2024, 6, 20)

            // 完整範圍選擇
            await dateRange.handleCalendarRangeSelect(startDate, endDate)

            expect(dateRange.startDateTime.internalDateTime.value).toEqual(startDate)
            expect(dateRange.endDateTime.internalDateTime.value).toEqual(endDate)
            expect(dateRange.isValidRange.value).toBe(true)

            // 應該發送完整範圍事件
            expect(mockEmitters.update).toHaveBeenCalledWith({
                start: expect.any(String),
                end: expect.any(String)
            })
        })
    })

    describe('日期約束處理', () => {
        it('應該動態計算開始日期的最大值約束', () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    maxDate: '2024-12-31'
                }, refs)
            )
            wrapper = testWrapper

            // 設置結束日期
            dateRange.endDateTime.setInternalDateTime(createSimpleDate(2024, 6, 20))

            // 開始日期的最大值應該是結束日期
            expect(dateRange.startDateConstraints.value.maxDate).toEqual(
                createSimpleDate(2024, 6, 20)
            )
        })

        it('應該動態計算結束日期的最小值約束', () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    minDate: '2024-01-01'
                }, refs)
            )
            wrapper = testWrapper

            // 設置開始日期
            dateRange.startDateTime.setInternalDateTime(createSimpleDate(2024, 6, 10))

            // 結束日期的最小值應該是開始日期
            expect(dateRange.endDateConstraints.value.minDate).toEqual(
                createSimpleDate(2024, 6, 10)
            )
        })
    })

    describe('範圍限制驗證', () => {
        it('當範圍超過最大限制時應該顯示錯誤', () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    maxRange: 7 // 最多7天
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            const startDate = createSimpleDate(2024, 6, 1)
            const endDate = createSimpleDate(2024, 6, 10) // 9天，超過限制

            dateRange.handleCalendarRangeSelect(startDate, endDate)

            // 應該有範圍錯誤
            expect(dateRange.hasErrors.value).toBe(true)
            expect(dateRange.mergedErrors.value).toMatchObject({
                'endDate.range': 'range.exceedsMaxRange'
            })
        })

        it('當範圍低於最小限制時應該顯示錯誤', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    minRange: 3 // 最少3天
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            const startDate = createSimpleDate(2024, 6, 10)
            const endDate = createSimpleDate(2024, 6, 11) // 1天，低於限制

            await dateRange.handleCalendarRangeSelect(startDate, endDate)

            // 應該有範圍錯誤
            expect(dateRange.hasErrors.value).toBe(true)
            expect(dateRange.mergedErrors.value).toMatchObject({
                'endDate.range': 'range.belowMinRange'
            })
        })

        it('當範圍在限制內時應該通過驗證', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    minRange: 2,
                    maxRange: 10
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            const startDate = createSimpleDate(2024, 6, 10)
            const endDate = createSimpleDate(2024, 6, 15) // 5天，在限制內

            await dateRange.handleCalendarRangeSelect(startDate, endDate)

            // 不應該有範圍錯誤
            expect(dateRange.isValidRange.value).toBe(true)
            expect(dateRange.hasErrors.value).toBe(false)
        })
    })

    describe('日期輸入完成處理', () => {
        it('開始日期完成時應該聚焦到結束日期', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    showTime: false
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            dateRange.handleStartDateComplete('2024-06-10')

            // 應該設置開始日期
            expect(dateRange.startDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 10
            })

            await nextTick()

            // 在非時間模式下，應該聚焦到結束日期輸入
            expect(refs.endDateInputRef.value.focus).toHaveBeenCalled()
        })

        it('結束日期完成時應該應用預設時間', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    showTime: true
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            // 先設置開始日期
            await dateRange.handleStartDateComplete('2024-06-10')

            // 再設置結束日期
            await dateRange.handleEndDateComplete('2024-06-20')

            // 應該應用預設時間
            expect(dateRange.endDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 20,
                hour: 23, minute: 59, second: 59 // DEFAULT_END_TIME
            })
        })
    })

    describe('時間選擇處理', () => {
        it('應該正確處理開始時間選擇', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    showTime: true,
                    modelValue: {
                        start: '2024-06-10',
                        end: '2024-06-20'
                    }
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)
            await nextTick()

            await dateRange.handleTimeSelect('09:30:00', 'start')

            // 應該更新開始時間
            expect(dateRange.startDateTime.internalDateTime.value).toMatchObject({
                hour: 9, minute: 30, second: 0
            })

            // 應該發送更新事件
            expect(mockEmitters.update).toHaveBeenCalled()
        })

        it('應該正確處理結束時間選擇', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    showTime: true,
                    modelValue: {
                        start: '2024-06-10',
                        end: '2024-06-20'
                    }
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)
            await nextTick()

            await dateRange.handleTimeSelect('17:30:00', 'end')

            // 應該更新結束時間
            expect(dateRange.endDateTime.internalDateTime.value).toMatchObject({
                hour: 17, minute: 30, second: 0
            })

            // 應該發送更新事件
            expect(mockEmitters.update).toHaveBeenCalled()
        })
    })

    describe('快捷選項功能', () => {
        it('應該提供預設快捷選項', () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            expect(dateRange.shortcuts.value).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ label: '今天' }),
                    expect.objectContaining({ label: '最近7天' }),
                    expect.objectContaining({ label: '最近30天' }),
                    expect.objectContaining({ label: '本月' })
                ])
            )
        })

        it('應該正確應用"今天"快捷選項', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            // 模擬今天的日期
            const mockToday = new Date('2024-06-15')
            vi.setSystemTime(mockToday)

            const todayShortcut = dateRange.shortcuts.value.find(s => s.label === '今天')
            dateRange.applyShortcut(todayShortcut!)

            // 應該設置今天作為開始和結束日期
            expect(dateRange.startDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 15
            })
            expect(dateRange.endDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 15
            })

            vi.useRealTimers()
        })

        it('應該正確應用"最近7天"快捷選項', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            // 模擬今天的日期
            const mockToday = new Date('2024-06-15')
            vi.setSystemTime(mockToday)

            const sevenDaysShortcut = dateRange.shortcuts.value.find(s => s.label === '最近7天')
            await dateRange.applyShortcut(sevenDaysShortcut!)

            // 應該設置7天前到今天的範圍
            expect(dateRange.startDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 9 // 6天前（包含今天共7天）
            })
            expect(dateRange.endDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 15
            })

            vi.useRealTimers()
        })

        it('快捷選項應該應用預設時間', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    showTime: true
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            const todayShortcut = dateRange.shortcuts.value.find(s => s.label === '今天')
            dateRange.applyShortcut(todayShortcut!)

            // 應該應用預設時間
            expect(dateRange.startDateTime.internalDateTime.value).toMatchObject({
                hour: 0, minute: 0, second: 0 // DEFAULT_START_TIME
            })
            expect(dateRange.endDateTime.internalDateTime.value).toMatchObject({
                hour: 23, minute: 59, second: 59 // DEFAULT_END_TIME
            })
        })
    })

    describe('驗證錯誤處理', () => {
        it('應該正確合併開始和結束日期的驗證錯誤', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    required: true
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            // 觸發開始日期錯誤
            dateRange.handleStartDateValidation(false, { date: 'date.required' })

            // 觸發結束日期錯誤
            dateRange.handleEndDateValidation(false, { date: 'date.required' })

            // 驗證錯誤被正確合併
            expect(dateRange.mergedErrors.value).toEqual({
                'startDate.date': 'date.required',
                'endDate.date': 'date.required'
            })

            expect(dateRange.hasErrors.value).toBe(true)
        })

        it('當incomplete為true時，只有開始日期應該顯示提示', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    incomplete: true
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            // 只設置開始日期
            const startDate = createSimpleDate(2024, 6, 10)
            dateRange.startDateTime.setInternalDateTime(startDate)

            // 應該有不完整範圍的提示
            expect(dateRange.mergedErrors.value).toMatchObject({
                'range.endRequired': 'range.endRequired'
            })
        })
    })

    describe('主要操作方法', () => {
        it('clearRange 應該清除所有範圍狀態', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    modelValue: {
                        start: '2024-06-10',
                        end: '2024-06-20'
                    }
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)
            await nextTick()

            // 確認有初始值
            expect(dateRange.hasRangeValue.value).toBe(true)

            // 清除範圍
            dateRange.clearRange()

            // 驗證所有狀態被清除
            expect(dateRange.startDateTime.internalDateTime.value).toBeNull()
            expect(dateRange.endDateTime.internalDateTime.value).toBeNull()
            expect(dateRange.hasRangeValue.value).toBe(false)
            expect(dateRange.hasErrors.value).toBe(false)

            // 驗證事件發送
            expect(mockEmitters.update).toHaveBeenCalledWith(null)
        })

        it('setRange 應該設置新的範圍值', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            const newRange = {
                start: '2024-06-10T09:00:00',
                end: '2024-06-20T17:00:00'
            }

            dateRange.setRange(newRange)

            // 驗證範圍被設置
            expect(dateRange.startDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 10, hour: 9
            })
            expect(dateRange.endDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 20, hour: 17
            })

            // 驗證事件發送
            expect(mockEmitters.update).toHaveBeenCalled()
        })

        it('validate 應該觸發所有相關組件驗證', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    showTime: true
                }, refs)
            )
            wrapper = testWrapper

            const result = dateRange.validate()

            // 驗證所有組件的 validate 方法被調用
            expect(refs.startDateInputRef.value.validate).toHaveBeenCalled()
            expect(refs.endDateInputRef.value.validate).toHaveBeenCalled()
            expect(refs.startTimeInputRef.value.validate).toHaveBeenCalled()
            expect(refs.endTimeInputRef.value.validate).toHaveBeenCalled()

            expect(typeof result).toBe('boolean')
        })
    })

    describe('聚焦管理', () => {
        it('focusStartDate 應該聚焦到開始日期輸入', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            // 模擬點擊事件
            const mockEvent = {
                target: document.createElement('div'),
                preventDefault: vi.fn()
            } as any

            dateRange.focusStartDate(mockEvent)
            await nextTick()
            // 應該聚焦到開始日期輸入
            expect(refs.startDateInputRef.value.focus).toHaveBeenCalled()
        })

        it('focusEndDate 應該聚焦到結束日期輸入', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            // 模擬點擊事件
            const mockEvent = {
                target: document.createElement('div'),
                preventDefault: vi.fn()
            } as any

            dateRange.focusEndDate(mockEvent)
            await nextTick()
            // 應該聚焦到結束日期輸入
            expect(refs.endDateInputRef.value.focus).toHaveBeenCalled()
        })
    })

    describe('邊界條件與錯誤處理', () => {
        it('當範圍選擇超出日期限制時應該被拒絕', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    minDate: '2024-06-01',
                    maxDate: '2024-06-30'
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            // 嘗試選擇超出限制的範圍
            const validStart = createSimpleDate(2024, 6, 15)
            const invalidEnd = createSimpleDate(2024, 7, 15) // 超出 maxDate

            await dateRange.handleCalendarRangeSelect(validStart, invalidEnd)

            // 範圍不應該被設置
            expect(dateRange.isValidRange.value).toBe(false)
            expect(dateRange.hasErrors.value).toBe(true)
        })

        it('當 refs 不可用時應該拋出錯誤', () => {
            const refs = {
                containerRef: ref(null),
                calendarRef: ref(null),
                startDateInputRef: ref(null),
                endDateInputRef: ref(null),
                startTimeInputRef: ref(null),
                endTimeInputRef: ref(null)
            }

            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            expect(() => {
                dateRange.focusStartDate({} as any)
                dateRange.focusEndDate({} as any)
                dateRange.validate()
            }).toThrow()
        })

        it('當範圍值部分無效時應該正確處理', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    modelValue: {
                        start: 'invalid-start-date',
                        end: '2024-06-20'
                    }
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)
            await nextTick()

            // 無效的開始日期應該被設為 null
            expect(dateRange.startDateTime.internalDateTime.value).toBeNull()

            // 有效的結束日期應該被正確設置
            expect(dateRange.endDateTime.internalDateTime.value).toMatchObject({
                year: 2024, month: 6, day: 20
            })

            // 應該有驗證錯誤
            expect(dateRange.hasErrors.value).toBe(true)
        })

        it('當 modelValue 完全無效時應該清空所有值', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    modelValue: {
                        start: 'invalid-start',
                        end: 'invalid-end'
                    }
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)
            await nextTick()

            expect(dateRange.startDateTime.internalDateTime.value).toBeNull()
            expect(dateRange.endDateTime.internalDateTime.value).toBeNull()
            expect(dateRange.hasErrors.value).toBe(true)
        })

        it('當同時設置範圍限制和日期限制時應該正確驗證', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    minDate: '2024-06-01',
                    maxDate: '2024-06-30',
                    maxRange: 7
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            // 日期在限制內但範圍超過限制
            const startDate = createSimpleDate(2024, 6, 10)
            const endDate = createSimpleDate(2024, 6, 20) // 10天，超過 maxRange

            await dateRange.handleCalendarRangeSelect(startDate, endDate)

            // 應該有範圍錯誤
            expect(dateRange.hasErrors.value).toBe(true)
            expect(dateRange.mergedErrors.value).toMatchObject({
                'endDate.range': 'range.exceedsMaxRange'
            })
        })
    })

    describe('導航處理', () => {
        it('應該正確處理從時間輸入導航回日期輸入', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({}, refs)
            )
            wrapper = testWrapper

            // 從開始時間導航回開始日期
            dateRange.handleStartNavigateToDate()
            await nextTick()
            expect(refs.startDateInputRef.value.focusLast).toHaveBeenCalled()

            // 從結束時間導航回結束日期
            dateRange.handleEndNavigateToDate()
            await nextTick()
            expect(refs.endDateInputRef.value.focusLast).toHaveBeenCalled()
        })
    })

    describe('輸出格式處理', () => {
        it('應該根據 outputType 產生正確格式的輸出', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    outputType: 'iso',
                    showTime: true,
                    enableSeconds: true
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            const startDate = createSimpleDate(2024, 6, 10, 9, 0, 0)
            const endDate = createSimpleDate(2024, 6, 20, 17, 0, 0)

            await dateRange.handleCalendarRangeSelect(startDate, endDate)

            // 驗證輸出格式
            const updateCall = mockEmitters.update.mock.calls[0][0]
            expect(updateCall.start).toBe('2024-06-10 09:00:00')
            expect(updateCall.end).toBe('2024-06-20 17:00:00')
        })

        it('應該在 object 輸出類型下返回 SimpleDateValue', async () => {
            const refs = createMockRefs()
            const [dateRange, testWrapper] = withSetup(() =>
                useDateRange({
                    outputType: 'object'
                }, refs)
            )
            wrapper = testWrapper

            dateRange.setEmitters(mockEmitters)

            const startDate = createSimpleDate(2024, 6, 10)
            const endDate = createSimpleDate(2024, 6, 20)

            dateRange.handleCalendarRangeSelect(startDate, endDate)

            // 驗證返回對象格式
            const updateCall = mockEmitters.update.mock.calls[0][0]
            expect(updateCall.start).toEqual(startDate)
            expect(updateCall.end).toEqual(endDate)
        })
    })
})
