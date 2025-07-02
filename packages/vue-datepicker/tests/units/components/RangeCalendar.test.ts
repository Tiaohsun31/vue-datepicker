import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RangeCalendar from '@/components/calendar/RangeCalendar.vue'
import { createSimpleDate, getTodaysDate } from '@/utils/dateUtils'

describe('RangeCalendar.vue', () => {
    const createWrapper = (props = {}) => {
        return mount(RangeCalendar, {
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
                        props: ['rangeStart', 'rangeEnd', 'year', 'month', 'selectionMode', 'locale', 'weekStartsOn', 'timeValue', 'enableSeconds', 'use24Hour', 'timeTarget'],
                    }
                }
            }
        })
    }

    describe('組件渲染', () => {
        it('應該在單月模式渲染一個 CalendarGrid 組件', () => {
            const wrapper = createWrapper({ monthDisplayMode: 'single' })
            const calendarGrids = wrapper.findAllComponents('[data-testid="calendar-grid"]')

            expect(calendarGrids).toHaveLength(1)
            expect(wrapper.classes()).toContain('single-month')
        })

        it('應該在雙月模式渲染兩個 CalendarGrid 組件', () => {
            const wrapper = createWrapper({ monthDisplayMode: 'dual' })
            const calendarGrids = wrapper.findAllComponents('[data-testid="calendar-grid"]')

            expect(calendarGrids).toHaveLength(2)
            expect(wrapper.classes()).toContain('dual-month')
        })

        it('應該預設為雙月模式', () => {
            const wrapper = createWrapper()
            const calendarGrids = wrapper.findAllComponents('[data-testid="calendar-grid"]')

            expect(calendarGrids).toHaveLength(2)
            expect(wrapper.classes()).toContain('dual-month')
        })

        it('應該正確設置容器樣式類別', () => {
            const wrapper = createWrapper({ monthDisplayMode: 'dual' })
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

            expect(vm.primaryYear).toBe(2025)
            expect(vm.primaryMonth).toBe(8)
        })

        it('應該從 rangeStart 提取初始月份', () => {
            const rangeStart = createSimpleDate(2024, 6, 15)
            const wrapper = createWrapper({ rangeStart })
            const vm = wrapper.vm as any

            expect(vm.primaryYear).toBe(2024)
            expect(vm.primaryMonth).toBe(6)
        })

        it('應該使用今天日期作為預設值', () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any
            const today = getTodaysDate()

            expect(vm.primaryYear).toBe(today.year)
            expect(vm.primaryMonth).toBe(today.month)
        })

        it('rangeStart 優先級應該高於 initialYear/Month', () => {
            const wrapper = createWrapper({
                initialYear: 2025,
                initialMonth: 8,
                rangeStart: createSimpleDate(2024, 6, 15)
            })
            const vm = wrapper.vm as any

            expect(vm.primaryYear).toBe(2024)
            expect(vm.primaryMonth).toBe(6)
        })
    })

    describe('次要月份計算（雙月模式）', () => {
        it('應該顯示主要月份的下一個月', () => {
            const wrapper = createWrapper({
                monthDisplayMode: 'dual',
                initialYear: 2024,
                initialMonth: 6
            })
            const vm = wrapper.vm as any

            expect(vm.secondaryYear).toBe(2024)
            expect(vm.secondaryMonth).toBe(7)
        })

        it('應該正確處理跨年情況（12月 -> 1月）', () => {
            const wrapper = createWrapper({
                monthDisplayMode: 'dual',
                initialYear: 2024,
                initialMonth: 12
            })
            const vm = wrapper.vm as any

            expect(vm.secondaryYear).toBe(2025)
            expect(vm.secondaryMonth).toBe(1)
        })
    })

    describe('範圍選擇狀態管理', () => {
        it('應該初始化範圍選擇狀態', () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            expect(vm.rangeSelectionState.isSelecting).toBe(false)
            expect(vm.rangeSelectionState.tempStart).toBeNull()
            expect(vm.rangeSelectionState.activeTimeTarget).toBe('start')
        })

        it('單月模式：應該在有 rangeStart 但無 rangeEnd 時設置正確狀態', async () => {
            const rangeStart = createSimpleDate(2024, 6, 15)
            const wrapper = createWrapper({
                monthDisplayMode: 'single',
                rangeStart
            })
            await wrapper.vm.$nextTick()
            const vm = wrapper.vm as any

            expect(vm.rangeSelectionState.activeTimeTarget).toBe('end')
        })

        it('雙月模式：應該在有 rangeStart 但無 rangeEnd 時設置 tempStart', async () => {
            const rangeStart = createSimpleDate(2024, 6, 15)
            const wrapper = createWrapper({
                monthDisplayMode: 'dual',
                rangeStart
            })
            await wrapper.vm.$nextTick()
            const vm = wrapper.vm as any

            expect(vm.rangeSelectionState.tempStart).toEqual(rangeStart)
        })

        it('應該在有完整範圍時重置選擇狀態', async () => {
            const wrapper = createWrapper({
                rangeStart: createSimpleDate(2024, 6, 15),
                rangeEnd: createSimpleDate(2024, 6, 20)
            })
            await wrapper.vm.$nextTick()
            const vm = wrapper.vm as any

            expect(vm.rangeSelectionState.tempStart).toBeNull()
        })
    })

    describe('時間值計算', () => {
        it('單月模式：應該根據 activeTimeTarget 顯示對應時間', () => {
            const wrapper = createWrapper({
                monthDisplayMode: 'single',
                startTimeValue: '09:00',
                endTimeValue: '17:00'
            })
            const vm = wrapper.vm as any

            // 預設 activeTimeTarget 為 'start'
            expect(vm.primaryTimeValue).toBe('09:00')
            expect(vm.primaryTimeTarget).toBe('start')

            // 模擬切換到 'end'
            vm.rangeSelectionState.activeTimeTarget = 'end'
            expect(vm.primaryTimeValue).toBe('17:00')
            expect(vm.primaryTimeTarget).toBe('end')
        })

        it('雙月模式：主要月份應該顯示開始時間，次要月份顯示結束時間', () => {
            const wrapper = createWrapper({
                monthDisplayMode: 'dual',
                startTimeValue: '09:00',
                endTimeValue: '17:00'
            })
            const vm = wrapper.vm as any

            expect(vm.primaryTimeValue).toBe('09:00')
            expect(vm.secondaryTimeValue).toBe('17:00')
            expect(vm.primaryTimeTarget).toBe('start')
        })
    })

    describe('範圍選擇邏輯', () => {
        it('應該處理第一次點擊（設置開始日期）', async () => {
            const wrapper = createWrapper()
            const startDate = createSimpleDate(2024, 6, 15)

            await wrapper.vm.handleRangeSelect(startDate, null)

            expect(wrapper.emitted('range-select')).toBeTruthy()
            expect(wrapper.emitted('range-select')?.[0]).toEqual([startDate, null])
        })

        it('應該處理清空選擇', async () => {
            const wrapper = createWrapper()

            await wrapper.vm.handleRangeSelect(null, null)

            const vm = wrapper.vm as any
            expect(vm.rangeSelectionState.isSelecting).toBe(false)
            expect(vm.rangeSelectionState.tempStart).toBeNull()
            expect(wrapper.emitted('range-select')).toBeTruthy()
            expect(wrapper.emitted('range-select')?.[0]).toEqual([null, null])
        })
    })

    describe('月份導航', () => {
        let wrapper: any
        let vm: any

        beforeEach(() => {
            wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 6
            })
            vm = wrapper.vm as any
        })

        it('previousMonth 應該正確導航到上個月', () => {
            wrapper.vm.previousMonth()
            expect(vm.primaryYear).toBe(2024)
            expect(vm.primaryMonth).toBe(5)
        })

        it('previousMonth 應該正確處理跨年情況', () => {
            vm.primaryMonth = 1
            wrapper.vm.previousMonth()
            expect(vm.primaryYear).toBe(2023)
            expect(vm.primaryMonth).toBe(12)
        })

        it('nextMonth 應該正確導航到下個月', () => {
            wrapper.vm.nextMonth()
            expect(vm.primaryYear).toBe(2024)
            expect(vm.primaryMonth).toBe(7)
        })

        it('nextMonth 應該正確處理跨年情況', () => {
            vm.primaryMonth = 12
            wrapper.vm.nextMonth()
            expect(vm.primaryYear).toBe(2025)
            expect(vm.primaryMonth).toBe(1)
        })
    })

    describe('暴露的方法', () => {
        let wrapper: any
        let vm: any

        beforeEach(() => {
            wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 6
            })
            vm = wrapper.vm as any
        })

        it('getCurrentDisplay 應該返回當前顯示的月份', () => {
            const display = wrapper.vm.getCurrentDisplay()
            expect(display).toEqual({ left: { year: 2024, month: 6 }, right: { year: 2024, month: 7 } });
        })

        it('setDisplayMonth 應該設置顯示月份', () => {
            wrapper.vm.setDisplayMonth(2025, 8)
            expect(vm.primaryYear).toBe(2025)
            expect(vm.primaryMonth).toBe(8)
        })

        it('resetRangeSelection 應該重置選擇狀態', () => {
            vm.rangeSelectionState.isSelecting = true
            vm.rangeSelectionState.tempStart = createSimpleDate(2024, 6, 15)

            wrapper.vm.resetRangeSelection()

            expect(vm.rangeSelectionState.isSelecting).toBe(false)
            expect(vm.rangeSelectionState.tempStart).toBeNull()
            expect(vm.rangeSelectionState.activeTimeTarget).toBe('start')
        })

        it('getSelectionState 應該返回當前選擇狀態', () => {
            vm.rangeSelectionState.activeTimeTarget = 'end'

            const state = wrapper.vm.getSelectionState()
            expect(state.activeTimeTarget).toBe('end')
        })
    })

    describe('Props 驗證', () => {
        it('應該正確處理所有預設 props', () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            expect(vm.$props.locale).toBe('zh-TW')
            expect(vm.$props.weekStartsOn).toBe(0)
            expect(vm.$props.calendar).toBe('gregory')
            expect(vm.$props.monthDisplayMode).toBe('dual')
            expect(vm.$props.showTimeSelector).toBe(false)
            expect(vm.$props.enableSeconds).toBe(true)
            expect(vm.$props.use24Hour).toBe(true)
        })

        it('應該正確覆蓋預設 props', () => {
            const wrapper = createWrapper({
                locale: 'en-US',
                weekStartsOn: 1,
                monthDisplayMode: 'single',
                showTimeSelector: true,
                enableSeconds: false,
                use24Hour: false
            })
            const vm = wrapper.vm as any

            expect(vm.$props.locale).toBe('en-US')
            expect(vm.$props.weekStartsOn).toBe(1)
            expect(vm.$props.monthDisplayMode).toBe('single')
            expect(vm.$props.showTimeSelector).toBe(true)
            expect(vm.$props.enableSeconds).toBe(false)
            expect(vm.$props.use24Hour).toBe(false)
        })
    })

    describe('邊界條件', () => {
        it('應該處理 null/undefined props', () => {
            const wrapper = createWrapper({
                rangeStart: null,
                rangeEnd: null,
                minDate: null,
                maxDate: null,
                startTimeValue: null,
                endTimeValue: null
            })

            expect(wrapper.vm).toBeTruthy()
            expect(() => wrapper.vm.handleRangeSelect(null, null)).not.toThrow()
        })

        it('應該處理無效的日期範圍', async () => {
            const wrapper = createWrapper()
            const invalidDate = null

            await wrapper.vm.handleRangeSelect(invalidDate, null)
            expect(wrapper.emitted('range-select')).toBeTruthy()
        })

        it('應該正確處理月份邊界（1月和12月）', () => {
            const wrapper = createWrapper({
                initialYear: 2024,
                initialMonth: 1
            })
            const vm = wrapper.vm as any

            // 測試1月的上一月
            wrapper.vm.previousMonth()
            expect(vm.primaryYear).toBe(2023)
            expect(vm.primaryMonth).toBe(12)

            // 重置並測試12月的下一月
            vm.primaryYear = 2024
            vm.primaryMonth = 12
            wrapper.vm.nextMonth()
            expect(vm.primaryYear).toBe(2025)
            expect(vm.primaryMonth).toBe(1)
        })
    })

    describe('時間選擇器集成', () => {

        it('應該在單月模式正確切換時間目標', () => {
            const wrapper = createWrapper({
                monthDisplayMode: 'single',
                startTimeValue: '09:00',
                endTimeValue: '17:00'
            })
            const vm = wrapper.vm as any

            // 預設為 start
            expect(vm.primaryTimeTarget).toBe('start')
            expect(vm.primaryTimeValue).toBe('09:00')

            // 切換到 end
            vm.rangeSelectionState.activeTimeTarget = 'end'
            expect(vm.primaryTimeTarget).toBe('end')
            expect(vm.primaryTimeValue).toBe('17:00')
        })
    })
})
