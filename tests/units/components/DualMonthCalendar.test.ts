import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import DualMonthCalendar from '@/components/calendar/DualMonthCalendar.vue'
import { createSimpleDate } from '@/utils/dateUtils'

describe('DualMonthCalendar.vue', () => {
    const createWrapper = (props = {}) => {
        return mount(DualMonthCalendar, {
            props: {
                locale: 'zh-TW',
                calendar: 'gregory',
                weekStartsOn: 0,
                ...props
            },
            global: {
                stubs: {
                    CalendarGrid: {
                        template: '<div data-testid="calendar-grid" />',
                        emits: ['range-select', 'time-select'],
                        props: ['rangeStart', 'rangeEnd', 'year', 'month', 'selectionMode', 'locale', 'weekStartsOn', 'timeValue', 'enableSeconds', 'use24Hour'],
                    }
                }
            }
        })
    }

    describe('組件渲染', () => {
        it('應該渲染兩個 CalendarGrid 組件', () => {
            const wrapper = createWrapper()
            const calendarGrids = wrapper.findAllComponents('[data-testid="calendar-grid"]')

            expect(calendarGrids).toHaveLength(2)
        })

        it('應該正確設置左右月份容器的樣式', () => {
            const wrapper = createWrapper()
            const containers = wrapper.findAll('.calendar-container')

            expect(containers).toHaveLength(2)
            expect(containers[0].classes()).toContain('flex-1')
            expect(containers[1].classes()).toContain('flex-1')
        })
    })

    describe('初始月份計算', () => {
        it('應該使用 initialYear 和 initialMonth 作為初始值', () => {
            const wrapper = createWrapper({
                initialYear: 2025,
                initialMonth: 8
            })
            const vm = wrapper.vm as any

            expect(vm.leftYear).toBe(2025)
            expect(vm.leftMonth).toBe(8)
            expect(vm.rightYear).toBe(2025)
            expect(vm.rightMonth).toBe(9)
        })

        it('應該從 rangeStart 提取初始月份', () => {
            const rangeStart = createSimpleDate(2024, 6, 15)
            const wrapper = createWrapper({ rangeStart, initialYear: null, initialMonth: null })
            const vm = wrapper.vm as any

            expect(vm.leftYear).toBe(2024)
            expect(vm.leftMonth).toBe(6)
        })

        it('應該使用今天日期作為預設值', () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any
            const today = new Date()

            expect(vm.leftYear).toBe(today.getFullYear())
            expect(vm.leftMonth).toBe(today.getMonth() + 1)
        })

        it('rangeStart優先級 應該高於 props ', () => {
            const wrapper = createWrapper({
                initialYear: 2025,
                initialMonth: 8,
                rangeStart: createSimpleDate(2024, 6, 15)
            })
            const vm = wrapper.vm as any

            expect(vm.leftYear).toBe(2024)
            expect(vm.leftMonth).toBe(6)
        })
    })

    describe('右側月份計算', () => {
        it('應該顯示左側月份的下一個月', () => {
            const wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 6
            })
            const vm = wrapper.vm as any

            expect(vm.rightYear).toBe(2024)
            expect(vm.rightMonth).toBe(7)
        })

        it('應該正確處理跨年情況（12月 -> 1月）', () => {
            const wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 12
            })
            const vm = wrapper.vm as any

            expect(vm.rightYear).toBe(2025)
            expect(vm.rightMonth).toBe(1)
        })
    })

    describe('範圍選擇狀態管理', () => {
        it('應該初始化範圍選擇狀態', () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            expect(vm.rangeSelectionState.isSelecting).toBe(false)
            expect(vm.rangeSelectionState.tempStart).toBeNull()
        })

        it('應該在有 rangeStart 但無 rangeEnd 時進入選擇狀態', async () => {
            const rangeStart = createSimpleDate(2024, 6, 15)
            const wrapper = createWrapper({ rangeStart })
            const vm = wrapper.vm as any

            expect(vm.rangeSelectionState.isSelecting).toBe(true)
            expect(vm.rangeSelectionState.tempStart).toEqual(rangeStart)
        })

        it('應該在有完整範圍時重置選擇狀態', async () => {
            const wrapper = createWrapper({
                rangeStart: createSimpleDate(2024, 6, 15),
                rangeEnd: createSimpleDate(2024, 6, 20)
            })
            const vm = wrapper.vm as any

            expect(vm.rangeSelectionState.isSelecting).toBe(false)
            expect(vm.rangeSelectionState.tempStart).toBeNull()
        })

        it('不應該在有 initialYear/Month 時調整顯示月份', async () => {
            const wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 12
            })
            const vm = wrapper.vm as any

            // 設置新的範圍開始日期
            await wrapper.setProps({ rangeStart: createSimpleDate(2025, 8, 10) })

            // 不應該改變，因為有 initialYear/Month
            expect(vm.leftYear).toBe(2024)
            expect(vm.leftMonth).toBe(12)
        })
    })

    describe('範圍選擇邏輯', () => {
        it('應該處理第一次點擊（設置開始日期）', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            const startDate = createSimpleDate(2024, 6, 15)
            await vm.handleRangeSelect(startDate, null)

            expect(vm.rangeSelectionState.isSelecting).toBe(true)
            expect(vm.rangeSelectionState.tempStart).toEqual(startDate)
            expect(wrapper.emitted('range-select')).toBeTruthy()
            expect(wrapper.emitted('range-select')![0]).toEqual([startDate, null])
        })

        it('應該處理第二次點擊（完成範圍選擇）', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            const startDate = createSimpleDate(2024, 6, 15)
            const endDate = createSimpleDate(2024, 6, 20)

            // 第一次點擊
            await vm.handleRangeSelect(startDate, null)
            // 第二次點擊
            await vm.handleRangeSelect(endDate, null)

            expect(vm.rangeSelectionState.isSelecting).toBe(false)
            expect(vm.rangeSelectionState.tempStart).toBeNull()
            expect(wrapper.emitted('range-select')).toHaveLength(2)
            expect(wrapper.emitted('range-select')![1]).toEqual([startDate, endDate])
        })

        it('應該自動排序確保 start <= end', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            const laterDate = createSimpleDate(2024, 6, 20)
            const earlierDate = createSimpleDate(2024, 6, 15)

            // 先點擊較晚的日期
            await vm.handleRangeSelect(laterDate, null)
            // 再點擊較早的日期
            await vm.handleRangeSelect(earlierDate, null)

            expect(wrapper.emitted('range-select')![1]).toEqual([earlierDate, laterDate])
        })

        it('應該處理點擊相同日期（重新開始選擇）', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            const sameDate = createSimpleDate(2024, 6, 15)

            // 第一次點擊
            await vm.handleRangeSelect(sameDate, null)
            // 再次點擊相同日期
            await vm.handleRangeSelect(sameDate, null)

            expect(vm.rangeSelectionState.isSelecting).toBe(true)
            expect(vm.rangeSelectionState.tempStart).toEqual(sameDate)
            expect(wrapper.emitted('range-select')).toHaveLength(2)
            expect(wrapper.emitted('range-select')![1]).toEqual([sameDate, null])
        })

        it('應該處理清空選擇', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            await vm.handleRangeSelect(null, null)

            expect(vm.rangeSelectionState.isSelecting).toBe(false)
            expect(vm.rangeSelectionState.tempStart).toBeNull()
            expect(wrapper.emitted('range-select')![0]).toEqual([null, null])
        })
    })

    describe('時間選擇處理', () => {
        it('應該處理開始時間選擇', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            await vm.handleTimeSelect('14:30:00', 'start')

            expect(wrapper.emitted('time-select')).toBeTruthy()
            expect(wrapper.emitted('time-select')![0]).toEqual(['14:30:00', 'start'])
        })

        it('應該處理結束時間選擇', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            await vm.handleTimeSelect('16:45:30', 'end')

            expect(wrapper.emitted('time-select')).toBeTruthy()
            expect(wrapper.emitted('time-select')![0]).toEqual(['16:45:30', 'end'])
        })
    })

    describe('月份導航', () => {
        it('previousMonth 應該正確導航到上個月', () => {
            const wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 6
            })
            const vm = wrapper.vm as any

            vm.previousMonth()

            expect(vm.leftYear).toBe(2024)
            expect(vm.leftMonth).toBe(5)
            expect(vm.rightYear).toBe(2024)
            expect(vm.rightMonth).toBe(6)
        })

        it('previousMonth 應該正確處理跨年情況', () => {
            const wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 1
            })
            const vm = wrapper.vm as any

            vm.previousMonth()

            expect(vm.leftYear).toBe(2023)
            expect(vm.leftMonth).toBe(12)
            expect(vm.rightYear).toBe(2024)
            expect(vm.rightMonth).toBe(1)
        })

        it('nextMonth 應該正確導航到下個月', () => {
            const wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 6
            })
            const vm = wrapper.vm as any

            vm.nextMonth()

            expect(vm.leftYear).toBe(2024)
            expect(vm.leftMonth).toBe(7)
            expect(vm.rightYear).toBe(2024)
            expect(vm.rightMonth).toBe(8)
        })

        it('nextMonth 應該正確處理跨年情況', () => {
            const wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 12
            })
            const vm = wrapper.vm as any

            vm.nextMonth()

            expect(vm.leftYear).toBe(2025)
            expect(vm.leftMonth).toBe(1)
            expect(vm.rightYear).toBe(2025)
            expect(vm.rightMonth).toBe(2)
        })
    })

    describe('暴露的方法', () => {
        let wrapper: any
        let vm: any

        beforeEach(() => {
            wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 6,
                rangeStart: createSimpleDate(2024, 6, 15),
                rangeEnd: createSimpleDate(2024, 6, 20)
            })
            vm = wrapper.vm as any
        })

        it('getCurrentDisplay 應該返回當前顯示的月份', () => {
            const display = vm.getCurrentDisplay()

            expect(display.left).toEqual({ year: 2024, month: 6 })
            expect(display.right).toEqual({ year: 2024, month: 7 })
        })

        it('setDisplayMonth 應該設置顯示月份', () => {
            vm.setDisplayMonth(2025, 12)

            expect(vm.leftYear).toBe(2025)
            expect(vm.leftMonth).toBe(12)
            expect(vm.rightYear).toBe(2026)
            expect(vm.rightMonth).toBe(1)
        })

        it('resetRangeSelection 應該重置選擇狀態', () => {
            // 先設置選擇狀態
            vm.rangeSelectionState.isSelecting = true
            vm.rangeSelectionState.tempStart = createSimpleDate(2024, 6, 15)

            vm.resetRangeSelection()

            expect(vm.rangeSelectionState.isSelecting).toBe(false)
            expect(vm.rangeSelectionState.tempStart).toBeNull()
        })

        it('getSelectionState 應該返回當前選擇狀態', () => {
            vm.rangeSelectionState.isSelecting = true
            vm.rangeSelectionState.tempStart = createSimpleDate(2024, 6, 15)

            const state = vm.getSelectionState()

            expect(state.isSelecting).toBe(true)
            expect(state.tempStart).toEqual(createSimpleDate(2024, 6, 15))
        })
    })

    describe('Props 傳遞驗證', () => {
        it('應該正確傳遞 props 給 CalendarGrid 組件', async () => {
            const wrapper = createWrapper({
                rangeStart: createSimpleDate(2024, 6, 15),
                rangeEnd: createSimpleDate(2024, 6, 20),
                minDate: createSimpleDate(2024, 1, 1),
                maxDate: createSimpleDate(2024, 12, 31),
                locale: 'zh-TW',
                weekStartsOn: 1,
                calendar: 'islamic',
                showTimeSelector: true,
                startTimeValue: '10:30:00',
                endTimeValue: '14:45:00',
                enableSeconds: false,
                use24Hour: false,
                defaultTime: '12:00:00'
            })

            const calendarGrids = wrapper.findAllComponents('[data-testid="calendar-grid"]')
            const leftGrid = calendarGrids[0] as any
            const rightGrid = calendarGrids[1] as any
            // 檢查左側 CalendarGrid 的 props
            expect(leftGrid.props('rangeStart')).toEqual(createSimpleDate(2024, 6, 15))
            expect(leftGrid.props('rangeEnd')).toEqual(createSimpleDate(2024, 6, 20))
            expect(leftGrid.props('selectionMode')).toBe('range')
            expect(leftGrid.props('locale')).toBe('zh-TW')

            // 檢查右側 CalendarGrid 的 props
            expect(rightGrid.props('rangeStart')).toEqual(createSimpleDate(2024, 6, 15))
            expect(rightGrid.props('rangeEnd')).toEqual(createSimpleDate(2024, 6, 20))
            expect(rightGrid.props('selectionMode')).toBe('range')
        })
    })

    describe('邊界條件', () => {
        it('應該處理 null props', () => {
            const wrapper = createWrapper({
                rangeStart: null,
                rangeEnd: null,
                minDate: null,
                maxDate: null,
                startTimeValue: null,
                endTimeValue: null
            })
            const vm = wrapper.vm as any

            expect(vm.rangeSelectionState.isSelecting).toBe(false)
            expect(vm.rangeSelectionState.tempStart).toBeNull()
        })

        it('應該處理複雜的日期比較（跨月、跨年）', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            const startDate = createSimpleDate(2024, 12, 25)
            const endDate = createSimpleDate(2025, 1, 5)

            await vm.handleRangeSelect(startDate, null)
            await vm.handleRangeSelect(endDate, null)

            expect(wrapper.emitted('range-select')![1]).toEqual([startDate, endDate])
        })

        it('應該處理反向選擇（跨月、跨年）', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            const laterDate = createSimpleDate(2025, 1, 5)
            const earlierDate = createSimpleDate(2024, 12, 25)

            await vm.handleRangeSelect(laterDate, null)
            await vm.handleRangeSelect(earlierDate, null)

            expect(wrapper.emitted('range-select')![1]).toEqual([earlierDate, laterDate])
        })
    })

    describe('時間選擇器集成', () => {
        it('應該正確處理開始和結束時間的不同值', async () => {
            const wrapper = createWrapper({
                showTimeSelector: true,
                startTimeValue: '09:00:00',
                endTimeValue: '17:30:00'
            })

            const calendarGrids = wrapper.findAllComponents('[data-testid="calendar-grid"]')

            // 驗證時間值正確傳遞給對應的 CalendarGrid
            expect((calendarGrids[0] as any).props('timeValue')).toBe('09:00:00')
            expect((calendarGrids[1] as any).props('timeValue')).toBe('17:30:00')
        })
    })
})
