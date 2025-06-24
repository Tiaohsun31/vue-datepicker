import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import DateInput from '@/components/inputs/DateInput.vue'

describe('DateInput', () => {
    let user: ReturnType<typeof userEvent.setup>

    beforeEach(() => {
        user = userEvent.setup()
    })

    describe('基本渲染', () => {
        it('應該正確渲染所有輸入框', () => {
            render(DateInput, {
                props: {
                    yearPlaceholder: 'YYYY',
                    monthPlaceholder: 'MM',
                    dayPlaceholder: 'DD'
                }
            })

            expect(screen.getByLabelText('year')).toBeInTheDocument()
            expect(screen.getByLabelText('month')).toBeInTheDocument()
            expect(screen.getByLabelText('day')).toBeInTheDocument()
        })

        it('應該根據 dateFormat 調整欄位順序', () => {
            render(DateInput, {
                props: {
                    dateFormat: 'DD-MM-YYYY',
                    separator: '-'
                }
            })

            const inputs = screen.getAllByRole('textbox')
            expect(inputs[0]).toHaveAttribute('aria-label', 'day')
            expect(inputs[1]).toHaveAttribute('aria-label', 'month')
            expect(inputs[2]).toHaveAttribute('aria-label', 'year')
        })

        it('應該顯示自定義分隔符', () => {
            render(DateInput, {
                props: {
                    separator: '/'
                }
            })

            expect(screen.getAllByText('/')).toHaveLength(2)
        })
    })

    describe('用戶輸入處理', () => {
        it('應該正確處理完整日期輸入', async () => {
            const onComplete = vi.fn()
            const onUpdateModelValue = vi.fn()

            render(DateInput, {
                props: {
                    'onUpdate:modelValue': onUpdateModelValue,
                    onComplete: onComplete
                }
            })

            const yearInput = screen.getByLabelText('year')
            const monthInput = screen.getByLabelText('month')
            const dayInput = screen.getByLabelText('day')

            await user.type(yearInput, '2024')
            await user.type(monthInput, '06')
            await user.type(dayInput, '15')

            await waitFor(() => {
                expect(onUpdateModelValue).toHaveBeenCalledWith('2024-06-15')
                expect(onComplete).toHaveBeenCalledWith('2024-06-15')
            })
        })

        it('應該自動補零小於10的月份和日期', async () => {
            render(DateInput)

            const monthInput = screen.getByLabelText('month')
            const dayInput = screen.getByLabelText('day')

            await user.type(monthInput, '6')
            await user.type(dayInput, '5')

            expect(monthInput).toHaveValue('06')
            expect(dayInput).toHaveValue('05')
        })

        it('應該過濾非數字字符', async () => {
            render(DateInput)

            const yearInput = screen.getByLabelText('year')
            await user.type(yearInput, '2o2a4')

            expect(yearInput).toHaveValue('224')
        })

        // 實際上並沒有輸入長度，因為達到一定位數後自動跳轉到下一個欄位
        it('應該限制輸入長度', async () => {
            render(DateInput)

            const yearInput = screen.getByLabelText('year')
            const monthInput = screen.getByLabelText('month')
            const dayInput = screen.getByLabelText('day')

            await user.type(yearInput, '20241') // 輸入20241，實際1會跳到下一個欄位
            await user.type(monthInput, '123') // 輸入123，實際因為加上開頭的1，會變成11，而23會跳到下一個欄位
            await user.type(dayInput, '456') // 此時456並沒有輸入效果，因為2024-11-23是有效日期

            expect(yearInput).toHaveValue('2024')
            expect(monthInput).toHaveValue('11')
            expect(dayInput).toHaveValue('23')
        })
    })

    describe('鍵盤導航', () => {
        it('應該在輸入完成後自動跳轉到下一個欄位', async () => {
            render(DateInput)

            const yearInput = screen.getByLabelText('year')
            const monthInput = screen.getByLabelText('month')
            const dayInput = screen.getByLabelText('day')

            await user.click(yearInput)
            await user.type(yearInput, '2024')

            await waitFor(() => {
                expect(monthInput).toHaveFocus()
            })

            await user.type(monthInput, '06')

            await waitFor(() => {
                expect(dayInput).toHaveFocus()
            })
        })

        it('應該支援方向鍵導航', async () => {
            render(DateInput)

            const yearInput = screen.getByLabelText('year')
            const monthInput = screen.getByLabelText('month')

            await user.click(monthInput)
            await user.keyboard('{ArrowLeft}')

            await waitFor(() => {
                expect(yearInput).toHaveFocus()
            })

            await user.keyboard('{ArrowRight}')

            await waitFor(() => {
                expect(monthInput).toHaveFocus()
            })
        })

        it('應該支援退格鍵導航', async () => {
            render(DateInput)

            const yearInput = screen.getByLabelText('year')
            const monthInput = screen.getByLabelText('month')

            await user.click(monthInput)
            await user.keyboard('{Backspace}')

            await waitFor(() => {
                expect(yearInput).toHaveFocus()
            })
        })
    })

    describe('表單驗證', () => {
        it('應該驗證必填欄位', async () => {
            const onValidation = vi.fn()

            render(DateInput, {
                props: {
                    required: true,
                    onValidation: onValidation
                }
            })

            const yearInput = screen.getByLabelText('year')
            await user.click(yearInput)
            await user.tab() // 離開焦點觸發驗證

            await waitFor(() => {
                expect(onValidation).toHaveBeenCalledWith(
                    false,
                    expect.objectContaining({
                        year: 'year.required'
                    }),
                    expect.any(Object)
                )
            })
        })

        it('應該驗證日期範圍', async () => {
            const onValidation = vi.fn()

            render(DateInput, {
                props: {
                    minDate: '2024-01-01',
                    maxDate: '2024-12-31',
                    onValidation: onValidation
                }
            })

            const yearInput = screen.getByLabelText('year')
            const monthInput = screen.getByLabelText('month')
            const dayInput = screen.getByLabelText('day')

            await user.type(yearInput, '2023')
            await user.type(monthInput, '12')
            await user.type(dayInput, '31')

            await waitFor(() => {
                expect(onValidation).toHaveBeenCalledWith(
                    false,
                    expect.objectContaining({
                        year: 'year.outOfRange'
                    }),
                    expect.any(Object)
                )
            })
        })

        it('應該驗證閏年', async () => {
            const onValidation = vi.fn()

            render(DateInput, {
                props: {
                    onValidation: onValidation
                }
            })

            const yearInput = screen.getByLabelText('year')
            const monthInput = screen.getByLabelText('month')
            const dayInput = screen.getByLabelText('day')

            await user.type(yearInput, '2023')
            await user.type(monthInput, '02')
            await user.type(dayInput, '29')

            await waitFor(() => {
                expect(onValidation).toHaveBeenCalledWith(
                    false,
                    expect.objectContaining({
                        year: 'year.notLeapYear'
                    }),
                    expect.any(Object)
                )
            })
        })

        it('應該驗證每月天數', async () => {
            const onValidation = vi.fn()

            render(DateInput, {
                props: {
                    onValidation: onValidation
                }
            })

            const yearInput = screen.getByLabelText('year')
            const monthInput = screen.getByLabelText('month')
            const dayInput = screen.getByLabelText('day')

            await user.type(yearInput, '2024')
            await user.type(monthInput, '04')
            await user.type(dayInput, '31')

            await waitFor(() => {
                expect(onValidation).toHaveBeenCalledWith(
                    false,
                    expect.objectContaining({
                        day: 'day.notExistInMonth'
                    }),
                    expect.any(Object)
                )
            })
        })
    })

    describe('Props 和 ModelValue', () => {
        it('應該正確處理 modelValue 變化', async () => {
            const { rerender } = render(DateInput, {
                props: {
                    modelValue: '2024-06-15'
                }
            })

            expect(screen.getByLabelText('year')).toHaveValue('2024')
            expect(screen.getByLabelText('month')).toHaveValue('06')
            expect(screen.getByLabelText('day')).toHaveValue('15')

            await rerender({
                modelValue: '2025-12-25'
            })

            expect(screen.getByLabelText('year')).toHaveValue('2025')
            expect(screen.getByLabelText('month')).toHaveValue('12')
            expect(screen.getByLabelText('day')).toHaveValue('25')
        })

        it('應該正確處理 null modelValue', async () => {
            const { rerender } = render(DateInput, {
                props: {
                    modelValue: '2024-06-15'
                }
            })

            await rerender({
                modelValue: null
            })

            expect(screen.getByLabelText('year')).toHaveValue('')
            expect(screen.getByLabelText('month')).toHaveValue('')
            expect(screen.getByLabelText('day')).toHaveValue('')
        })

        it('應該正確處理不同的 dateFormat', async () => {
            const onUpdateModelValue = vi.fn()

            render(DateInput, {
                props: {
                    dateFormat: 'DD/MM/YYYY',
                    separator: '/',
                    'onUpdate:modelValue': onUpdateModelValue
                }
            })

            const dayInput = screen.getByLabelText('day')
            const monthInput = screen.getByLabelText('month')
            const yearInput = screen.getByLabelText('year')

            await user.type(dayInput, '15')
            await user.type(monthInput, '06')
            await user.type(yearInput, '2024')

            await waitFor(() => {
                expect(onUpdateModelValue).toHaveBeenCalledWith('15/06/2024')
            })
        })
    })

    describe('暴露的方法', () => {
        it('應該提供 validate 方法', async () => {
            const { container } = render(DateInput)
            const component = container.querySelector('[data-testid="date-input"]')

            // 注意：這需要您在組件中添加 data-testid
            // 或者使用其他方式訪問組件實例
        })

        it('應該提供 reset 方法', async () => {
            const onUpdateModelValue = vi.fn()

            render(DateInput, {
                props: {
                    modelValue: '2024-06-15',
                    'onUpdate:modelValue': onUpdateModelValue
                }
            })

            // 這裡需要通過某種方式調用 reset 方法
            // 例如通過 ref 或 expose 的方式
        })
    })

    describe('可訪問性', () => {
        it('應該設置正確的 ARIA 屬性', () => {
            render(DateInput)

            const yearInput = screen.getByLabelText('year')
            const monthInput = screen.getByLabelText('month')
            const dayInput = screen.getByLabelText('day')

            expect(yearInput).toHaveAttribute('aria-label', 'year')
            expect(monthInput).toHaveAttribute('aria-label', 'month')
            expect(dayInput).toHaveAttribute('aria-label', 'day')
        })

        it('應該在有錯誤時設置 aria-invalid', async () => {
            render(DateInput, {
                props: {
                    required: true
                }
            })

            const yearInput = screen.getByLabelText('year')
            await user.click(yearInput)
            await user.tab()

            await waitFor(() => {
                expect(yearInput).toHaveAttribute('aria-invalid', 'true')
            })
        })
    })
})
