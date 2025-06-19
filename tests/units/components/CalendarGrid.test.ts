import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CalendarDate } from '@internationalized/date'
import CalendarGrid from '@/components/calendar/CalendarGrid.vue'
import { createSimpleDate } from '@/utils/dateUtils'

describe('CalendarGrid.vue', () => {
    const createWrapper = (props = {}) => {
        return mount(CalendarGrid, {
            props: {
                locale: 'zh-TW',
                calendar: 'gregory',
                weekStartsOn: 0,
                selectionMode: 'single',
                ...props
            },
            global: {
                stubs: {
                    CalendarHeader: {
                        template: '<div data-testid="calendar-header" />'
                    },
                    WeekdayHeader: {
                        template: '<div data-testid="weekday-header" />'
                    },
                    DateGridView: {
                        template: '<div data-testid="date-grid-view" />',
                        emits: ['select', 'range-select']
                    },
                    TimeSelector: {
                        template: '<div data-testid="time-selector" />',
                        emits: ['time-change', 'today-click']
                    }
                }
            }
        })
    }

    describe('組件組合與渲染', () => {
        it('應該正確渲染所有子組件', () => {
            const wrapper = createWrapper()

            expect(wrapper.find('[data-testid="calendar-header"]').exists()).toBe(true)
            expect(wrapper.find('[data-testid="weekday-header"]').exists()).toBe(true)
            expect(wrapper.find('[data-testid="date-grid-view"]').exists()).toBe(true)
        })
    })

    describe('Props 數據轉換', () => {
        it('應該正確轉換 selectedDate 為 CalendarDate', () => {
            const selectedDate = createSimpleDate(2024, 6, 15)
            const wrapper = createWrapper({
                value: selectedDate,
                calendar: 'gregory'
            })

            const vm = wrapper.vm as any
            expect(vm.selectedCalendarDate).not.toBeNull()
            expect(vm.selectedCalendarDate.year).toBe(2024)
            expect(vm.selectedCalendarDate.month).toBe(6)
            expect(vm.selectedCalendarDate.day).toBe(15)
        })

        it('應該正確轉換範圍選擇的日期', () => {
            const rangeStart = createSimpleDate(2024, 6, 10)
            const rangeEnd = createSimpleDate(2024, 6, 20)

            const wrapper = createWrapper({
                rangeStart,
                rangeEnd,
                selectionMode: 'range',
                calendar: 'gregory'
            })

            const vm = wrapper.vm as any
            expect(vm.rangeStartCalendarDate).not.toBeNull()
            expect(vm.rangeEndCalendarDate).not.toBeNull()
            expect(vm.rangeStartCalendarDate.day).toBe(10)
            expect(vm.rangeEndCalendarDate.day).toBe(20)
        })

        it('應該正確轉換 minDate 和 maxDate', () => {
            const minDate = createSimpleDate(2024, 6, 1)
            const maxDate = createSimpleDate(2024, 6, 30)

            const wrapper = createWrapper({
                minDate,
                maxDate,
                calendar: 'gregory'
            })

            const vm = wrapper.vm as any
            expect(vm.minCalendarDate).not.toBeNull()
            expect(vm.maxCalendarDate).not.toBeNull()
            expect(vm.minCalendarDate.day).toBe(1)
            expect(vm.maxCalendarDate.day).toBe(30)
        })

        it('應該處理 null 值的轉換', () => {
            const wrapper = createWrapper({
                value: null,
                rangeStart: null,
                rangeEnd: null,
                minDate: null,
                maxDate: null
            })

            const vm = wrapper.vm as any
            expect(vm.selectedCalendarDate).toBeNull()
            expect(vm.rangeStartCalendarDate).toBeNull()
            expect(vm.rangeEndCalendarDate).toBeNull()
            expect(vm.minCalendarDate).toBeNull()
            expect(vm.maxCalendarDate).toBeNull()
        })
    })

    describe('年月狀態管理', () => {
        it('應該使用 props 提供的年月作為初始值', () => {
            const wrapper = createWrapper({
                year: 2025,
                month: 8
            })

            const vm = wrapper.vm as any
            expect(vm.currentYear).toBe(2025)
            expect(vm.currentMonth).toBe(8)
        })

        it('應該從 value 中提取年月作為初始值', () => {
            const value = createSimpleDate(2025, 8, 15)
            const wrapper = createWrapper({ value })

            const vm = wrapper.vm as any
            expect(vm.currentYear).toBe(2025)
            expect(vm.currentMonth).toBe(8)
        })

        it('應該從 rangeStart 中提取年月（範圍模式）', () => {
            const rangeStart = createSimpleDate(2025, 8, 15)
            const wrapper = createWrapper({
                rangeStart,
                selectionMode: 'range'
            })

            const vm = wrapper.vm as any
            expect(vm.currentYear).toBe(2025)
            expect(vm.currentMonth).toBe(8)
        })

        it('應該使用今天日期作為預設值', () => {
            const wrapper = createWrapper({})

            const today = new Date()
            const vm = wrapper.vm as any
            expect(vm.currentYear).toBe(today.getFullYear())
            expect(vm.currentMonth).toBe(today.getMonth() + 1)
        })

        it('應該監聽 displayYearMonth 變化並更新', async () => {
            const wrapper = createWrapper({ year: 2024, month: 6 })
            const vm = wrapper.vm as any
            expect(vm.currentYear).toBe(2024)
            expect(vm.currentMonth).toBe(6)

            // 更改 props
            await wrapper.setProps({ year: 2025, month: 8 })

            expect(vm.currentYear).toBe(2025)
            expect(vm.currentMonth).toBe(8)
        })
    })

    describe('事件處理', () => {
        it('應該處理單一日期選擇事件', async () => {
            const wrapper = createWrapper({ selectionMode: 'single' })
            const vm = wrapper.vm as any

            // 直接調用組件的事件處理方法
            const mockCalendarDate = new CalendarDate(2024, 6, 15)
            await vm.handleSelect(mockCalendarDate)

            expect(wrapper.emitted('select')).toBeTruthy()
            expect(wrapper.emitted('select')).toHaveLength(1)

            const selectEvent = wrapper.emitted('select')![0]
            expect(selectEvent[0]).toMatchObject({
                year: 2024,
                month: 6,
                day: 15
            })
            expect(selectEvent[1]).toBe(true) // closeCalendar 參數
        })

        it('應該處理範圍選擇事件', async () => {
            const wrapper = createWrapper({ selectionMode: 'range' })
            const vm = wrapper.vm as any

            const startDate = new CalendarDate(2024, 6, 10)
            const endDate = new CalendarDate(2024, 6, 20)
            await vm.handleRangeSelect(startDate, endDate)

            expect(wrapper.emitted('range-select')).toBeTruthy()
            expect(wrapper.emitted('range-select')).toHaveLength(1)

            const rangeEvent = wrapper.emitted('range-select')![0]
            expect(rangeEvent[0]).toMatchObject({
                year: 2024,
                month: 6,
                day: 10
            })
            expect(rangeEvent[1]).toMatchObject({
                year: 2024,
                month: 6,
                day: 20
            })
        })

        it('應該處理時間選擇事件', async () => {
            const wrapper = createWrapper({
                showTimeSelector: true,
                timeValue: '10:30:00'
            })
            const vm = wrapper.vm as any

            await vm.emitTimeSelect('14:30:00')

            expect(wrapper.emitted('time-select')).toBeTruthy()
            expect(wrapper.emitted('time-select')![0][0]).toBe('14:30:00')
        })

        it('單一選擇模式下，日期選擇時應該同時發送時間事件', async () => {
            const wrapper = createWrapper({
                selectionMode: 'single',
                showTimeSelector: true,
                timeValue: '15:45:30'
            })
            const vm = wrapper.vm as any

            const mockCalendarDate = new CalendarDate(2024, 6, 15)
            await vm.handleSelect(mockCalendarDate)

            // 檢查兩個事件都被觸發
            expect(wrapper.emitted('select')).toHaveLength(1)
            expect(wrapper.emitted('time-select')).toHaveLength(1)
            expect(wrapper.emitted('time-select')![0][0]).toBe('15:45:30')
        })
    })

    describe('時間值同步', () => {
        it('應該監聽外部 timeValue 變化', async () => {
            const wrapper = createWrapper({ timeValue: '10:00:00' })
            const vm = wrapper.vm as any

            expect(vm.timeValue).toBe('10:00:00')

            await wrapper.setProps({ timeValue: '14:30:00' })
            expect(vm.timeValue).toBe('14:30:00')
        })

        it('應該在時間選擇時更新內部值', async () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            await vm.emitTimeSelect('16:45:30')

            expect(vm.timeValue).toBe('16:45:30')
            expect(wrapper.emitted('time-select')).toBeTruthy()
        })
    })

    describe('Today 按鈕功能', () => {
        it('單一模式下應該設置今天的日期', async () => {
            // 模擬特定日期
            const mockToday = new Date('2024-06-15')
            vi.setSystemTime(mockToday)

            const wrapper = createWrapper({ selectionMode: 'single' })
            const vm = wrapper.vm as any

            await vm.setTodaysDate()

            expect(wrapper.emitted('select')).toBeTruthy()
            const selectEvent = wrapper.emitted('select')![0]
            expect(selectEvent[0]).toMatchObject({
                year: 2024,
                month: 6,
                day: 15
            })
            expect(selectEvent[1]).toBe(false) // 不關閉日曆

            vi.useRealTimers()
        })

        it('範圍模式下不應該響應 Today 按鈕', async () => {
            const wrapper = createWrapper({ selectionMode: 'range' })
            const vm = wrapper.vm as any

            await vm.setTodaysDate()

            // 驗證事件未被觸發
            expect(wrapper.emitted('select')).toBeFalsy()
        })
    })

    describe('暴露的方法', () => {
        let wrapper: any
        let vm: any

        beforeEach(() => {
            wrapper = createWrapper({
                value: createSimpleDate(2024, 6, 15),
                rangeStart: createSimpleDate(2024, 6, 10),
                rangeEnd: createSimpleDate(2024, 6, 20),
                selectionMode: 'single'
            })
            vm = wrapper.vm as any
        })

        it('getSelectedDate 應該返回當前選中日期', () => {
            const selectedDate = vm.getSelectedDate()
            expect(selectedDate).toMatchObject({
                year: 2024,
                month: 6,
                day: 15
            })
        })

        it('getSelectedRange 應該返回當前範圍', () => {
            const range = vm.getSelectedRange()
            expect(range.start).toMatchObject({
                year: 2024,
                month: 6,
                day: 10
            })
            expect(range.end).toMatchObject({
                year: 2024,
                month: 6,
                day: 20
            })
        })

        it('setDisplayMonth 應該設置顯示月份', () => {
            vm.setDisplayMonth(2025, 12)
            expect(vm.currentYear).toBe(2025)
            expect(vm.currentMonth).toBe(12)
        })

        it('previousMonth 應該正確導航到上個月', () => {
            vm.setDisplayMonth(2024, 6)
            vm.previousMonth()
            expect(vm.currentYear).toBe(2024)
            expect(vm.currentMonth).toBe(5)
        })

        it('previousMonth 應該正確處理跨年情況', () => {
            vm.setDisplayMonth(2024, 1)
            vm.previousMonth()
            expect(vm.currentYear).toBe(2023)
            expect(vm.currentMonth).toBe(12)
        })

        it('nextMonth 應該正確導航到下個月', () => {
            vm.setDisplayMonth(2024, 6)
            vm.nextMonth()
            expect(vm.currentYear).toBe(2024)
            expect(vm.currentMonth).toBe(7)
        })

        it('nextMonth 應該正確處理跨年情況', () => {
            vm.setDisplayMonth(2024, 12)
            vm.nextMonth()
            expect(vm.currentYear).toBe(2025)
            expect(vm.currentMonth).toBe(1)
        })
    })

    describe('年份範圍計算', () => {
        it('應該根據 minDate/maxDate 計算年份範圍', () => {
            const wrapper = createWrapper({
                minDate: createSimpleDate(2020, 1, 1),
                maxDate: createSimpleDate(2030, 12, 31)
            })
            const vm = wrapper.vm as any

            expect(vm.minYear).toBe(2020)
            expect(vm.maxYear).toBe(2030)
        })

        it('應該使用預設年份範圍', () => {
            const wrapper = createWrapper()
            const vm = wrapper.vm as any

            expect(vm.minYear).toBe(1900)
            expect(vm.maxYear).toBe(2100)
        })
    })

    describe('邊界條件', () => {
        it('應該處理無效的 props 值', () => {
            const wrapper = createWrapper({
                value: null,
                rangeStart: null,
                rangeEnd: null,
                minDate: null,
                maxDate: null
            })
            const vm = wrapper.vm as any

            expect(vm.selectedCalendarDate).toBeNull()
            expect(vm.rangeStartCalendarDate).toBeNull()
            expect(vm.rangeEndCalendarDate).toBeNull()
            expect(vm.minCalendarDate).toBeNull()
            expect(vm.maxCalendarDate).toBeNull()
        })

        it('應該處理未知的日曆系統', () => {
            // 這個測試可能需要根據 CalendarUtils 的實際行為來調整
            const wrapper = createWrapper({
                value: createSimpleDate(2024, 6, 15),
                calendar: 'unknown-calendar'
            })
            const vm = wrapper.vm as any

            // 根據實際情況調整預期行為
            expect(() => vm.selectedCalendarDate).not.toThrow()
        })
    })
})
