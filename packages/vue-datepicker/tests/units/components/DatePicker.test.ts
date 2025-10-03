import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import DatePicker from '@/DatePicker.vue';

describe('DatePicker', () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const renderDatePicker = (props = {}) => {
        return render(DatePicker, {
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

    describe('基本渲染測試', () => {
        it('應該正確渲染預設元件', () => {
            renderDatePicker();

            expect(screen.getByLabelText('year')).toBeInTheDocument();
            expect(screen.getByLabelText('month')).toBeInTheDocument();
            expect(screen.getByLabelText('day')).toBeInTheDocument();
        });

        it('啟用時間輸入時應該顯示時間欄位', () => {
            renderDatePicker({ showTime: true });

            expect(screen.getByLabelText('hour')).toBeInTheDocument();
            expect(screen.getByLabelText('minute')).toBeInTheDocument();
        });

        it('未啟用時間輸入時不應該顯示時間欄位', () => {
            renderDatePicker({ showTime: false });

            expect(screen.queryByLabelText('hour')).not.toBeInTheDocument();
            expect(screen.queryByLabelText('minute')).not.toBeInTheDocument();
        });

        it('啟用秒數時應該顯示秒數欄位', () => {
            renderDatePicker({ showTime: true, enableSeconds: true });

            expect(screen.getByLabelText('second')).toBeInTheDocument();
        });

        it('應該顯示日曆圖標', () => {
            renderDatePicker();

            const calendarButton = screen.getByLabelText('開啟日曆');
            expect(calendarButton).toBeInTheDocument();
        });

        it('有值且顯示清除按鈕時應該顯示清除按鈕', () => {
            renderDatePicker({
                modelValue: '2023-12-01',
                showClearButton: true
            });

            const clearButton = screen.getByLabelText('清除日期');
            expect(clearButton).toBeInTheDocument();
        });
    });

    describe('主題和樣式測試', () => {
        it('應該套用預設主題類別', async () => {
            const { container } = renderDatePicker({
                theme: 'red',
                mode: 'dark'
            });
            const inputContainer = container.querySelector('.date-picker-wrapper');

            // 檢查是否有主題類別
            expect(inputContainer).toHaveClass('vdt-theme-red');
            expect(inputContainer).toHaveClass('vdt-mode-dark');
            // 或者檢查是否包含基本的主題結構
            expect(inputContainer).toHaveClass('vdt-datepicker');
            expect(inputContainer).toHaveClass('vdt-themed');
        });

        it('應該根據時間顯示設定最小寬度', () => {
            const { container: withTime } = renderDatePicker({ showTime: true });
            const { container: withoutTime } = renderDatePicker({ showTime: false });

            const withTimeWrapper = withTime.querySelector('.date-picker-wrapper');
            const withoutTimeWrapper = withoutTime.querySelector('.date-picker-wrapper');

            expect(withTimeWrapper).toHaveClass('min-w-[300px]');
            expect(withoutTimeWrapper).toHaveClass('min-w-[150px]');
        });

        it('錯誤狀態下應該顯示錯誤樣式', async () => {
            const { container } = renderDatePicker({ required: true });
            const yearInput = screen.getByLabelText('year');

            await user.click(yearInput);
            await user.tab();

            await waitFor(() => {
                const inputContainer = container.querySelector('.date-picker-container');
                expect(inputContainer).toHaveClass('border-red-500');
            });
        });
    });

    describe('輸入功能測試', () => {
        it('應該允許輸入完整日期', async () => {
            const { emitted } = renderDatePicker();
            const yearInput = screen.getByLabelText('year');
            const monthInput = screen.getByLabelText('month');
            const dayInput = screen.getByLabelText('day');

            await user.type(yearInput, '2023');
            await user.type(monthInput, '12');
            await user.type(dayInput, '01');

            await waitFor(() => {
                expect(emitted()).toHaveProperty('update:modelValue');
            });
        });

        it('應該允許輸入時間', async () => {
            const { emitted } = renderDatePicker({ showTime: true });
            const yearInput = screen.getByLabelText('year');
            const monthInput = screen.getByLabelText('month');
            const dayInput = screen.getByLabelText('day');
            const hourInput = screen.getByLabelText('hour');
            const minuteInput = screen.getByLabelText('minute');

            await user.type(yearInput, '2023');
            await user.type(monthInput, '12');
            await user.type(dayInput, '01');
            await user.type(hourInput, '14');
            await user.type(minuteInput, '30');

            await waitFor(() => {
                expect(emitted()).toHaveProperty('update:modelValue');
            });
        });

        it('應該正確處理12小時制時間格式', async () => {
            renderDatePicker({
                showTime: true,
                use24Hour: false,
                modelValue: '2023-12-01T15:30:00'
            });

            const hourInput = screen.getByLabelText('hour');
            expect(hourInput).toHaveValue('03');
            expect(screen.getByText('PM')).toBeInTheDocument();
        });
    });

    describe('日曆彈出層測試', () => {
        it('多個日曆實例應該獨立運作', async () => {
            const { container: container1 } = render(DatePicker, {
                props: { modelValue: '2023-01-01' },
            });

            const { container: container2 } = render(DatePicker, {
                props: { modelValue: '2024-01-01' },
            });

            const calendarButton = screen.findAllByLabelText('開啟日曆');
            expect((await calendarButton).length).toBe(2);
        });

        // it('日曆位置應該根據可用空間調整', async () => {
        //     // 模擬視窗底部位置
        //     Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
        //         configurable: true,
        //         value: vi.fn().mockReturnValue({
        //             bottom: window.innerHeight - 50,
        //             height: 40,
        //             left: 0,
        //             right: 200,
        //             top: window.innerHeight - 90,
        //             width: 200,
        //         }),
        //     });

        //     renderDatePicker();
        //     const calendarButton = screen.getByLabelText('開啟日曆');

        //     await user.click(calendarButton);

        //     await waitFor(() => {
        //         const dialog = screen.getByRole('dialog');
        //         expect(dialog).toBeVisible();
        //         // 檢查是否有向上顯示的類別
        //         expect(dialog).toHaveClass('bottom-full');
        //     });
        // });
    });

    describe('modelValue 處理測試', () => {
        it('應該正確顯示初始值', () => {
            renderDatePicker({ modelValue: '2023-12-01' });

            expect(screen.getByLabelText('year')).toHaveValue('2023');
            expect(screen.getByLabelText('month')).toHaveValue('12');
            expect(screen.getByLabelText('day')).toHaveValue('01');
        });

        it('應該正確顯示日期時間初始值', () => {
            renderDatePicker({
                modelValue: '2023-12-01T15:30:45',
                use24Hour: true,
                showTime: true
            });

            expect(screen.getByLabelText('year')).toHaveValue('2023');
            expect(screen.getByLabelText('hour')).toHaveValue('15');
            expect(screen.getByLabelText('minute')).toHaveValue('30');
            expect(screen.getByLabelText('second')).toHaveValue('45');
        });
    });

    describe('清除功能測試', () => {
        it('點擊清除按鈕應該清空值', async () => {
            const { emitted } = renderDatePicker({
                modelValue: '2023-12-01',
                showClearButton: true
            });

            const clearButton = screen.getByLabelText('清除日期');

            await user.click(clearButton);

            await waitFor(() => {
                expect(emitted()).toHaveProperty('update:modelValue');
                const events = emitted()['update:modelValue'];
                expect(events).toBeDefined();
                expect((events as unknown[][])[events!.length - 1]![0]).toBeNull();
            });
        });
    });

    describe('鍵盤導航測試', () => {
        it('應該支援 Tab 鍵依序移動焦點', async () => {
            renderDatePicker({ showTime: true });

            const yearInput = screen.getByLabelText('year');
            const monthInput = screen.getByLabelText('month');
            const dayInput = screen.getByLabelText('day');
            const hourInput = screen.getByLabelText('hour');

            yearInput.focus();
            expect(yearInput).toHaveFocus();

            await user.tab();
            expect(monthInput).toHaveFocus();

            await user.tab();
            expect(dayInput).toHaveFocus();

            await user.tab();
            expect(hourInput).toHaveFocus();
        });

        it('應該支援 Enter 鍵開啟日曆', async () => {
            renderDatePicker({ inputEnabled: false });

            const container = screen.getByRole('button', { name: /選擇日期/ });
            container.focus();

            await user.keyboard('{Enter}');

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeVisible();
            });
        });

        it('應該支援 Space 鍵開啟日曆', async () => {
            renderDatePicker({ inputEnabled: false });

            const container = screen.getByRole('button', { name: /選擇日期/ });
            container.focus();

            await user.keyboard(' ');

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toBeVisible();
            });
        });
    });

    describe('佔位符和本地化測試', () => {
        it('應該顯示預設佔位符', () => {
            renderDatePicker();

            expect(screen.getByPlaceholderText(/年/)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/月/)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/日/)).toBeInTheDocument();
        });

        it('應該支援自訂佔位符', () => {
            renderDatePicker({
                placeholderOverrides: {
                    year: '西元年',
                    month: '月份',
                    day: '日期'
                }
            });

            expect(screen.getByPlaceholderText('西元年')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('月份')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('日期')).toBeInTheDocument();
        });

        it('應該支援時間佔位符', () => {
            renderDatePicker({
                showTime: true,
                placeholderOverrides: {
                    hour: '小時',
                    minute: '分鐘',
                    second: '秒鐘'
                }
            });

            expect(screen.getByPlaceholderText('小時')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('分鐘')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('秒鐘')).toBeInTheDocument();
        });
    });

    describe('錯誤訊息顯示測試', () => {
        it('啟用錯誤訊息時應該顯示錯誤', async () => {
            renderDatePicker({
                required: true,
                showErrorMessage: true,
            });

            const yearInput = screen.getByLabelText('year');
            await user.click(yearInput);
            await user.tab();

            await waitFor(() => {
                const errorMessage = screen.queryByText(/請輸入年份/);
                expect(errorMessage).toBeInTheDocument();
            });
        });

        it('關閉錯誤訊息時不應該顯示錯誤', async () => {
            renderDatePicker({
                required: true,
                showErrorMessage: false
            });

            const yearInput = screen.getByLabelText('year');
            await user.click(yearInput);
            await user.tab();

            await waitFor(() => {
                const errorMessage = screen.queryByText(/請輸入年份/);
                expect(errorMessage).not.toBeInTheDocument();
            });
        });
    });

    describe('非西曆系統測試', () => {
        it('非西曆系統應該使用按鈕模式', () => {
            renderDatePicker({ calendar: 'chinese' });

            const button = screen.getByRole('button', { name: /選擇日期/ });
            expect(button).toBeInTheDocument();
            expect(screen.queryByLabelText('year')).not.toBeInTheDocument();
        });

        it('禁用輸入時應該使用按鈕模式', () => {
            renderDatePicker({ inputEnabled: false });

            const button = screen.getByRole('button', { name: /選擇日期/ });
            expect(button).toBeInTheDocument();
            expect(screen.queryByLabelText('year')).not.toBeInTheDocument();
        });
    });

    describe('邊界值和特殊情況測試', () => {
        it('應該處理閏年日期', async () => {
            const { emitted } = renderDatePicker();
            const yearInput = screen.getByLabelText('year');
            const monthInput = screen.getByLabelText('month');
            const dayInput = screen.getByLabelText('day');

            await user.type(yearInput, '2024');
            await user.type(monthInput, '02');
            await user.type(dayInput, '29');

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid] = validationEvents![validationEvents!.length - 1] as [boolean];
                expect(isValid).toBe(true);
            });
        });

        it('應該拒絕非閏年的2月29日', async () => {
            const { emitted } = renderDatePicker();
            const yearInput = screen.getByLabelText('year');
            const monthInput = screen.getByLabelText('month');
            const dayInput = screen.getByLabelText('day');

            await user.type(yearInput, '2023');
            await user.type(monthInput, '02');
            await user.type(dayInput, '29');
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid] = validationEvents![validationEvents!.length - 1] as [boolean];
                expect(isValid).toBe(false);
            });
        });

        it('應該處理月末日期變化', async () => {
            const { emitted } = renderDatePicker({ modelValue: '2023-01-31' });

            const monthInput = screen.getByLabelText('month');

            await user.clear(monthInput);
            await user.type(monthInput, '02');

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid] = validationEvents![validationEvents!.length - 1] as [boolean];
                expect(isValid).toBe(false);
            });
        });
    });

    describe('可訪問性測試', () => {

        it('錯誤狀態下應該有 aria-invalid 屬性', async () => {
            renderDatePicker({ required: true });
            const yearInput = screen.getByLabelText('year');

            await user.click(yearInput);
            await user.tab();

            await waitFor(() => {
                expect(yearInput).toHaveAttribute('aria-invalid', 'true');
            });
        });

        it('應該有適當的標籤和描述', () => {
            renderDatePicker();

            expect(screen.getByLabelText('year')).toBeInTheDocument();
            expect(screen.getByLabelText('month')).toBeInTheDocument();
            expect(screen.getByLabelText('day')).toBeInTheDocument();
        });
    });

    describe('事件處理測試', () => {
        it('完成日期輸入時應該發送 change 事件', async () => {
            const { emitted } = renderDatePicker();
            const yearInput = screen.getByLabelText('year');
            const monthInput = screen.getByLabelText('month');
            const dayInput = screen.getByLabelText('day');

            await user.type(yearInput, '2023');
            await user.type(monthInput, '12');
            await user.type(dayInput, '01');
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('change');
            });
        });

        it('驗證失敗時應該發送 validation 事件', async () => {
            const { emitted } = renderDatePicker({ required: true });
            const yearInput = screen.getByLabelText('year');

            await user.click(yearInput);
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid, errors] = validationEvents![validationEvents!.length - 1] as [boolean, string[]];
                expect(isValid).toBe(false);
                expect(errors).toBeDefined();
            });
        });
    });
});

