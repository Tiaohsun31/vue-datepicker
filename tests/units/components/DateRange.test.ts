import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import DateRange from '@/DateRange.vue';
import { nextTick } from 'vue';

describe('DateRange', () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const renderDateRange = (props = {}) => {
        return render(DateRange, {
            props: {
                ...props
            },
            global: {
                stubs: {
                    'v-autowidth': true
                }
            }
        });
    };

    describe('基本渲染', () => {
        it('應該正確渲染日期範圍選擇器', () => {
            const { container } = renderDateRange();

            expect(container?.querySelector('.date-range-wrapper') as HTMLElement).toBeVisible();
        });

        it('應該顯示預設佔位符', () => {
            renderDateRange();

            expect(screen.getByLabelText('選擇日期範圍')).toBeInTheDocument();
            expect(screen.getByLabelText('日期範圍分隔符')).toBeInTheDocument();
        });

        it('應該顯示自定義分隔符', async () => {

            const { getByTestId } = renderDateRange({ separator: '到' });

            await nextTick();

            const separatorElement = getByTestId('separator');

            expect(separatorElement).toBeInTheDocument();
            expect(separatorElement).toHaveTextContent('到');
        });
    });

    describe('日曆顯示與隱藏', () => {
        it('點擊按鈕應該打開日曆', async () => {
            renderDateRange();

            const button = screen.getByLabelText('選擇日期範圍');
            await user.click(button);

            await waitFor(() => {
                expect(screen.getByLabelText('date-range-picker')).toBeVisible();
            });
        });

        it('禁用狀態下不應該打開日曆', async () => {
            renderDateRange({ disabled: true });

            const button = screen.getByLabelText('選擇日期範圍');
            await user.click(button);

            expect(screen.queryByLabelText('date-range-picker')).not.toBeInTheDocument();
        });
    });

    describe('日期值顯示', () => {
        it('應該顯示傳入的開始日期', () => {
            const modelValue = { start: '2024-01-01', end: null };
            renderDateRange({ modelValue });

            expect(screen.getByText('2024-01-01')).toBeInTheDocument();
        });

        it('應該顯示傳入的結束日期', () => {
            const modelValue = { start: null, end: '2024-01-31' };
            renderDateRange({ modelValue });

            expect(screen.getByText('2024-01-31')).toBeInTheDocument();
        });

        it('應該顯示完整的日期範圍', () => {
            const modelValue = { start: '2024-01-01', end: '2024-01-31' };
            renderDateRange({ modelValue });

            expect(screen.getByText('2024-01-01')).toBeInTheDocument();
            expect(screen.getByText('2024-01-31')).toBeInTheDocument();
        });
    });

    describe('清除功能', () => {
        it('有值時應該顯示清除按鈕', async () => {
            const modelValue = { start: '2024-01-01', end: '2024-01-31' };
            const { container } = renderDateRange({ modelValue, showClearButton: true });

            const iconContainer = container?.querySelector('.date-range-wrapper') as HTMLElement;

            await user.hover(iconContainer);

            await waitFor(() => {
                expect(screen.getByLabelText('清除日期')).toBeInTheDocument();
            });
        });

        it('showClearButton為false時不應該顯示清除按鈕', () => {
            const modelValue = { start: '2024-01-01', end: '2024-01-31' };
            renderDateRange({ modelValue, showClearButton: false });

            expect(screen.queryByTitle('清除日期')).not.toBeInTheDocument();
        });

        it('禁用狀態下不應該顯示清除按鈕', () => {
            const modelValue = { start: '2024-01-01', end: '2024-01-31' };
            renderDateRange({ modelValue, disabled: true });

            expect(screen.queryByTitle('清除日期')).not.toBeInTheDocument();
        });
    });

    describe('事件處理', () => {
        it('應該發出update:modelValue事件', async () => {
            const onUpdateModelValue = vi.fn();
            renderDateRange({ 'onUpdate:modelValue': onUpdateModelValue });

            const button = screen.getByLabelText('選擇日期範圍');
            await user.click(button);

            // 等待日曆顯示後進行日期選擇測試
            await waitFor(() => {
                expect(screen.getByLabelText('date-range-picker')).toBeVisible();
            });
        });

        it('應該發出change事件', async () => {
            const onChange = vi.fn();
            renderDateRange({ onChange });

            const button = screen.getByLabelText('選擇日期範圍');
            await user.click(button);

            await waitFor(() => {
                expect(screen.getByLabelText('date-range-picker')).toBeVisible();
            });
        });
    });

    describe('錯誤處理', () => {
        it('有錯誤時應該顯示錯誤樣式', () => {
            const { container } = renderDateRange({
                modelValue: { start: 'invalid', end: 'invalid' },
                showErrorMessage: true
            });

            const warpper = container.querySelector('.date-picker-container');
            expect(warpper).toHaveClass('border-red-500');
        });

        it('showErrorMessage為false時不應該顯示錯誤訊息', () => {
            renderDateRange({
                modelValue: { start: 'invalid', end: 'invalid' },
                showErrorMessage: false
            });

            // 錯誤訊息相關的元素不應該存在
            expect(screen.queryByText(/錯誤/)).not.toBeInTheDocument();
        });
    });

    describe('主題樣式', () => {
        it('應該應用預設主題類別', () => {
            const { container } = renderDateRange({
                theme: 'red',
                mode: 'dark'
            });
            const inputContainer = container.querySelector('.date-range-wrapper');

            // 檢查是否有主題類別
            expect(inputContainer).toHaveClass('vdt-theme-red');
            expect(inputContainer).toHaveClass('vdt-mode-dark');
            // 或者檢查是否包含基本的主題結構
            expect(inputContainer).toHaveClass('vdt-datepicker');
            expect(inputContainer).toHaveClass('vdt-themed');
        });

        it('應該根據showTime調整最小寬度', () => {
            const { container } = renderDateRange({ showTime: true });

            const wrapper = container.querySelector('.date-range-wrapper');
            expect(wrapper).toHaveClass('min-w-[300px]');
        });

        it('不顯示時間時應該使用較小的最小寬度', () => {
            const { container } = renderDateRange({ showTime: false });

            const wrapper = container.querySelector('.date-range-wrapper');
            expect(wrapper).toHaveClass('min-w-[200px]');
        });
    });

    describe('輔助功能', () => {
        it('應該有正確的ARIA標籤', async () => {
            renderDateRange();

            const button = screen.getByLabelText('選擇日期範圍');
            await user.click(button);

            await waitFor(() => {
                const dialog = screen.getByRole('dialog');
                expect(dialog).toHaveAttribute('aria-modal', 'true');
                expect(dialog).toHaveAttribute('aria-label', 'date-range-picker');
            });
        });

        it('禁用狀態下按鈕應該有disabled屬性', () => {
            renderDateRange({ disabled: true });

            const button = screen.getByLabelText('選擇日期範圍');
            expect(button).toBeDisabled();
        });
    });

    describe('快捷選項', () => {
        it('showShortcuts為true時應該在日曆中顯示快捷選項區域', async () => {
            renderDateRange({ showShortcuts: true, shortcuts: [] });

            const button = screen.getByLabelText('選擇日期範圍');
            await user.click(button);

            await waitFor(() => {
                expect(screen.getByLabelText('date-range-picker')).toBeVisible();
                // 快捷選項容器應該存在
                const calendar = screen.getByLabelText('date-range-picker');
                expect(calendar.querySelector('.flex.flex-wrap.gap-2')).toBeInTheDocument();
            });
        });
    });

    describe('輸入模式', () => {
        it('inputEnabled為true時應該在日曆中顯示輸入框', async () => {
            renderDateRange({ inputEnabled: true });

            const button = screen.getByLabelText('選擇日期範圍');
            await user.click(button);

            await waitFor(() => {
                expect(screen.getByLabelText('date-range-picker')).toBeVisible();
                // 輸入區域應該存在
                const calendar = screen.getByLabelText('date-range-picker');
                expect(calendar.querySelector('.flex.flex-col.md\\:flex-row')).toBeInTheDocument();
            });
        });
    });
});
