import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import TimeInput from '@/components/inputs/TimeInput.vue';

describe('TimeInput', () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const renderTimeInput = (props = {}) => {
        return render(TimeInput, {
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
        it('預設應該渲染小時和分鐘輸入框', () => {
            renderTimeInput();

            expect(screen.getByLabelText('hour')).toBeInTheDocument();
            expect(screen.getByLabelText('minute')).toBeInTheDocument();
        });

        it('啟用秒鐘時應該渲染秒鐘輸入框', () => {
            renderTimeInput({ enableSeconds: true });

            expect(screen.getByLabelText('second')).toBeInTheDocument();
        });

        it('未啟用秒鐘時不應該渲染秒鐘輸入框', () => {
            renderTimeInput({ enableSeconds: false });

            expect(screen.queryByLabelText('second')).not.toBeInTheDocument();
        });

        it('應該正確設置輸入框屬性', () => {
            renderTimeInput();

            const hourInput = screen.getByLabelText('hour');
            const minuteInput = screen.getByLabelText('minute');

            expect(hourInput).toHaveAttribute('type', 'text');
            expect(hourInput).toHaveAttribute('inputmode', 'numeric');
            expect(hourInput).toHaveAttribute('maxlength', '2');
            expect(minuteInput).toHaveAttribute('maxlength', '2');
        });

        it('應該顯示冒號分隔符', () => {
            renderTimeInput();

            const separators = screen.getAllByText(':');
            expect(separators.length).toBeGreaterThan(0);
        });

        it('錯誤狀態下應該設置正確的aria屬性', async () => {
            const { emitted } = renderTimeInput({ required: true });
            const hourInput = screen.getByLabelText('hour');

            await user.click(hourInput);
            await user.tab(); // 離開焦點觸發blur

            await waitFor(() => {
                expect(hourInput).toHaveAttribute('aria-invalid', 'true');
            });
        });
    });

    describe('輸入格式化測試', () => {
        it('應該正確處理小時輸入', async () => {
            renderTimeInput();
            const hourInput = screen.getByLabelText('hour');

            await user.type(hourInput, '5');

            expect(hourInput).toHaveValue('5');
        });

        it('分鐘輸入超過5時應該自動補零', async () => {
            renderTimeInput();
            const minuteInput = screen.getByLabelText('minute');

            await user.type(minuteInput, '7');

            await waitFor(() => {
                expect(minuteInput).toHaveValue('07');
            });
        });

        it('秒鐘輸入超過5時應該自動補零', async () => {
            renderTimeInput({ enableSeconds: true });
            const secondInput = screen.getByLabelText('second');

            await user.type(secondInput, '8');

            await waitFor(() => {
                expect(secondInput).toHaveValue('08');
            });
        });

        it('應該限制輸入只能為數字', async () => {
            renderTimeInput();
            const hourInput = screen.getByLabelText('hour');

            await user.type(hourInput, 'abc123');

            // 非數字字符應該被過濾
            expect(hourInput).toHaveValue('12'); // 只保留數字部分
        });
    });

    describe('自動跳轉功能測試', () => {
        it('小時輸入完成時應該跳轉到分鐘', async () => {
            renderTimeInput();
            const hourInput = screen.getByLabelText('hour');
            const minuteInput = screen.getByLabelText('minute');

            await user.type(hourInput, '23');

            await waitFor(() => {
                expect(minuteInput).toHaveFocus();
            });
        });

        it('分鐘輸入完成且未啟用秒鐘時應該完成輸入', async () => {
            const { emitted } = renderTimeInput({ enableSeconds: false });
            const hourInput = screen.getByLabelText('hour');
            const minuteInput = screen.getByLabelText('minute');

            await user.type(hourInput, '12');
            await user.type(minuteInput, '30');
            await user.tab(); // 觸發blur事件

            await waitFor(() => {
                expect(emitted()).toHaveProperty('complete');
            });
        });

        it('分鐘輸入完成且啟用秒鐘時應該跳轉到秒鐘', async () => {
            renderTimeInput({ enableSeconds: true });
            const minuteInput = screen.getByLabelText('minute');
            const secondInput = screen.getByLabelText('second');

            await user.type(minuteInput, '30');

            await waitFor(() => {
                expect(secondInput).toHaveFocus();
            });
        });

        it('秒鐘輸入完成時應該完成輸入', async () => {
            const { emitted } = renderTimeInput({ enableSeconds: true });
            const hourInput = screen.getByLabelText('hour');
            const minuteInput = screen.getByLabelText('minute');
            const secondInput = screen.getByLabelText('second');

            await user.type(hourInput, '12');
            await user.type(minuteInput, '30');
            await user.type(secondInput, '45');
            await user.tab(); // 觸發blur事件

            await waitFor(() => {
                expect(emitted()).toHaveProperty('complete');
            });
        });
    });

    describe('12小時制轉換測試', () => {
        it('應該顯示AM/PM選擇器', () => {
            renderTimeInput({ use24Hour: false });

            expect(screen.getByRole('button', { name: /AM|PM/ })).toBeInTheDocument();
        });

        it('應該正確處理午夜12點', () => {
            renderTimeInput({ modelValue: '00:30', use24Hour: false });

            const hourInput = screen.getByLabelText('hour');
            expect(hourInput).toHaveValue('12');
            expect(screen.getByText('AM')).toBeInTheDocument();
        });

        it('應該正確處理中午12點', () => {
            renderTimeInput({ modelValue: '12:30', use24Hour: false });

            const hourInput = screen.getByLabelText('hour');
            expect(hourInput).toHaveValue('12');
            expect(screen.getByText('PM')).toBeInTheDocument();
        });

        it('應該正確處理下午時間轉換', () => {
            renderTimeInput({ modelValue: '15:30', use24Hour: false });

            const hourInput = screen.getByLabelText('hour');
            expect(hourInput).toHaveValue('03');
            expect(screen.getByText('PM')).toBeInTheDocument();
        });

        it('點擊AM/PM按鈕應該切換時段', async () => {
            const { emitted } = renderTimeInput({ use24Hour: false });
            const periodButton = screen.getByRole('button', { name: /AM|PM/ });

            await user.click(periodButton);

            await waitFor(() => {
                expect(emitted()).toHaveProperty('update:modelValue');
            });
        });
    });

    describe('驗證錯誤測試', () => {
        it('空值且必填時應該顯示錯誤', async () => {
            const { emitted } = renderTimeInput({ required: true });
            const hourInput = screen.getByLabelText('hour');

            await user.click(hourInput);
            await user.tab(); // 觸發blur

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid, errors] = validationEvents![validationEvents!.length - 1] as [boolean, any];
                expect(isValid).toBe(false);
                expect(errors).toHaveProperty('hour');
            });
        });

        it('小時為0在12小時制下應該報錯', async () => {
            const { emitted } = renderTimeInput({ use24Hour: false });
            const hourInput = screen.getByLabelText('hour');

            await user.type(hourInput, '0');
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid, errors] = validationEvents![validationEvents!.length - 1] as [boolean, any];
                expect(isValid).toBe(false);
                expect(errors).toHaveProperty('hour');
            });
        });

        it('小時超過24應該報錯', async () => {
            const { emitted } = renderTimeInput();
            const hourInput = screen.getByLabelText('hour');

            await user.type(hourInput, '25');
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid, errors] = validationEvents![validationEvents!.length - 1] as [boolean, any];
                expect(isValid).toBe(false);
                expect(errors).toHaveProperty('hour');
            });
        });
    });

    describe('鍵盤導航測試', () => {
        it('在小時輸入框按左箭頭應該導航到日期輸入', async () => {
            const { emitted } = renderTimeInput();
            const hourInput = screen.getByLabelText('hour');

            await user.click(hourInput);
            await user.keyboard('{ArrowLeft}');

            await waitFor(() => {
                expect(emitted()).toHaveProperty('navigate-to-date');
            });
        });

        it('在分鐘輸入框為空時按退格鍵應該跳回小時', async () => {
            renderTimeInput();
            const hourInput = screen.getByLabelText('hour');
            const minuteInput = screen.getByLabelText('minute');

            await user.click(minuteInput);
            await user.keyboard('{Backspace}');

            await waitFor(() => {
                expect(hourInput).toHaveFocus();
            });
        });

        it('按Tab鍵應該依序移動焦點', async () => {
            renderTimeInput({ enableSeconds: true });
            const hourInput = screen.getByLabelText('hour');
            const minuteInput = screen.getByLabelText('minute');
            const secondInput = screen.getByLabelText('second');

            await user.click(hourInput);
            await user.tab();

            expect(minuteInput).toHaveFocus();

            await user.tab();
            expect(secondInput).toHaveFocus();
        });

        it('按Shift+Tab應該反向移動焦點', async () => {
            renderTimeInput({ enableSeconds: true });
            const minuteInput = screen.getByLabelText('minute');
            const hourInput = screen.getByLabelText('hour');

            await user.click(minuteInput);
            await user.keyboard('{Shift>}{Tab}{/Shift}');

            await waitFor(() => {
                expect(hourInput).toHaveFocus();
            });
        });
    });

    describe('modelValue 測試', () => {
        it('應該正確解析完整時間格式', () => {
            renderTimeInput({ modelValue: '15:30:45' });

            expect(screen.getByLabelText('hour')).toHaveValue('15');
            expect(screen.getByLabelText('minute')).toHaveValue('30');
        });

        it('應該正確解析沒有秒鐘的時間格式', () => {
            renderTimeInput({ modelValue: '15:30' });

            expect(screen.getByLabelText('hour')).toHaveValue('15');
            expect(screen.getByLabelText('minute')).toHaveValue('30');
        });

        it('modelValue變更時應該更新顯示值', async () => {
            const { rerender } = renderTimeInput({ modelValue: '12:30' });

            expect(screen.getByLabelText('hour')).toHaveValue('12');

            await rerender({ modelValue: '15:45' });

            expect(screen.getByLabelText('hour')).toHaveValue('15');
            expect(screen.getByLabelText('minute')).toHaveValue('45');
        });
    });

    describe('邊界值測試', () => {
        it('24小時制最大值測試', async () => {
            const { emitted } = renderTimeInput();
            const hourInput = screen.getByLabelText('hour');

            await user.type(hourInput, '23');
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid] = validationEvents![validationEvents!.length - 1] as [boolean];
                expect(isValid).toBe(true);
            });
        });

        it('12小時制最大值測試', async () => {
            const { emitted } = renderTimeInput({ use24Hour: false });
            const hourInput = screen.getByLabelText('hour');

            await user.type(hourInput, '12');
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid] = validationEvents![validationEvents!.length - 1] as [boolean];
                expect(isValid).toBe(true);
            });
        });

        it('分鐘最大值59測試', async () => {
            const { emitted } = renderTimeInput();
            const minuteInput = screen.getByLabelText('minute');

            await user.type(minuteInput, '59');
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid] = validationEvents![validationEvents!.length - 1] as [boolean];
                expect(isValid).toBe(true);
            });
        });

        it('最小值邊界測試', async () => {
            const { emitted } = renderTimeInput();
            const hourInput = screen.getByLabelText('hour');
            const minuteInput = screen.getByLabelText('minute');

            await user.type(hourInput, '0');
            await user.type(minuteInput, '0');
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid] = validationEvents![validationEvents!.length - 1] as [boolean];
                expect(isValid).toBe(true);
            });
        });
    });

    describe('可訪問性測試', () => {
        it('應該有正確的aria-label', () => {
            renderTimeInput();

            expect(screen.getByLabelText('hour')).toHaveAttribute('aria-label', 'hour');
            expect(screen.getByLabelText('minute')).toHaveAttribute('aria-label', 'minute');
        });

        it('錯誤狀態應該有aria-invalid屬性', async () => {
            renderTimeInput({ required: true });
            const hourInput = screen.getByLabelText('hour');

            await user.click(hourInput);
            await user.tab();

            await waitFor(() => {
                expect(hourInput).toHaveAttribute('aria-invalid', 'true');
            });
        });

        it('應該支援鍵盤導航', async () => {
            renderTimeInput();
            const hourInput = screen.getByLabelText('hour');

            hourInput.focus();
            expect(hourInput).toHaveFocus();

            await user.keyboard('{Tab}');
            expect(screen.getByLabelText('minute')).toHaveFocus();
        });
    });

    describe('事件發送測試', () => {
        it('輸入變更時應該發送update:modelValue事件', async () => {
            const { emitted } = renderTimeInput();
            const hourInput = screen.getByLabelText('hour');

            await user.type(hourInput, '12');

            await waitFor(() => {
                expect(emitted()).toHaveProperty('update:modelValue');
            });
        });

        it('完成輸入時應該發送complete事件', async () => {
            const { emitted } = renderTimeInput({ enableSeconds: false });
            const hourInput = screen.getByLabelText('hour');
            const minuteInput = screen.getByLabelText('minute');

            await user.type(hourInput, '12');
            await user.type(minuteInput, '30');
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('complete');
            });
        });

        it('驗證失敗時應該發送validation事件', async () => {
            const { emitted } = renderTimeInput();
            const hourInput = screen.getByLabelText('hour');

            await user.type(hourInput, '25'); // 無效小時
            await user.tab();

            await waitFor(() => {
                expect(emitted()).toHaveProperty('validation');
                const validationEvents = emitted().validation;
                const [isValid, errors] = validationEvents![validationEvents!.length - 1] as [boolean, any];
                expect(isValid).toBe(false);
                expect(errors).toHaveProperty('hour');
            });
        });
    });

    describe('特殊情況測試', () => {
        it('modelValue為空時應該清空所有輸入框', async () => {
            const { rerender } = renderTimeInput({ modelValue: '12:30' });

            expect(screen.getByLabelText('hour')).toHaveValue('12');

            await rerender({ modelValue: '' });

            expect(screen.getByLabelText('hour')).toHaveValue('');
            expect(screen.getByLabelText('minute')).toHaveValue('');
        });
    });
});
