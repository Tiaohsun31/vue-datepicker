import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import TimeInput from '@/components/inputs/TimeInput.vue';

describe('TimeInput', () => {
    let wrapper: any;

    const createWrapper = (props = {}) => {
        return mount(TimeInput, {
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

    beforeEach(() => {
        wrapper = createWrapper();
    });

    describe('基本渲染測試', () => {
        it('預設應該渲染小時和分鐘輸入框', () => {
            expect(wrapper.find('input[aria-label="hour"]').exists()).toBe(true);
            expect(wrapper.find('input[aria-label="minute"]').exists()).toBe(true);
        });

        it('啟用秒鐘時應該渲染秒鐘輸入框', () => {
            wrapper = createWrapper({ enableSeconds: true });
            expect(wrapper.find('input[aria-label="second"]').exists()).toBe(true);
        });

        it('應該正確設置輸入框屬性', () => {
            const hourInput = wrapper.find('input[aria-label="hour"]');
            const minuteInput = wrapper.find('input[aria-label="minute"]');

            expect(hourInput.attributes('type')).toBe('text');
            expect(hourInput.attributes('inputmode')).toBe('numeric');
            expect(hourInput.attributes('maxlength')).toBe('2');
            expect(minuteInput.attributes('maxlength')).toBe('2');
        });

        it('應該顯示冒號分隔符', () => {
            const separators = wrapper.findAll('span.text-gray-400');
            expect(separators.length).toBeGreaterThan(0);
            expect(separators[0].text()).toBe(':');
        });

        it('錯誤狀態下應該設置正確的aria屬性', async () => {
            wrapper = createWrapper({ required: true });
            const hourInput = wrapper.find('input[aria-label="hour"]');

            await hourInput.trigger('blur');
            await nextTick();

            expect(hourInput.attributes('aria-invalid')).toBe('true');
        });
    });

    describe('輸入格式化測試', () => {
        it('應該正確處理前導零', async () => {
            const hourInput = wrapper.find('input[aria-label="hour"]');

            await hourInput.setValue('5');
            await hourInput.trigger('input');

            // 小時不會自動補零，分鐘才會
            expect(hourInput.element.value).toBe('5');
        });

        it('分鐘輸入超過5時應該自動補零', async () => {
            const minuteInput = wrapper.find('input[aria-label="minute"]');

            await minuteInput.setValue('7');
            await minuteInput.trigger('input');

            expect(minuteInput.element.value).toBe('07');
        });

        it('秒鐘輸入超過5時應該自動補零', async () => {
            wrapper = createWrapper({ enableSeconds: true });
            const secondInput = wrapper.find('input[aria-label="second"]');

            await secondInput.setValue('8');
            await secondInput.trigger('input');

            expect(secondInput.element.value).toBe('08');
        });
    });

    describe('自動跳轉功能測試', () => {
        it('小時輸入完成時應該跳轉到分鐘', async () => {
            const hourInput = wrapper.find('input[aria-label="hour"]');
            const minuteInput = wrapper.find('input[aria-label="minute"]');
            const focusSpy = vi.spyOn(minuteInput.element, 'focus');

            await hourInput.setValue('23');
            await hourInput.trigger('input');

            expect(focusSpy).toHaveBeenCalled();
        });

        it('分鐘輸入完成且未啟用秒鐘時應該完成輸入', async () => {
            wrapper = createWrapper({ enableSeconds: false });
            const minuteInput = wrapper.find('input[aria-label="minute"]');

            await wrapper.find('input[aria-label="hour"]').setValue('12');
            await minuteInput.setValue('30');
            await minuteInput.trigger('input');
            await minuteInput.trigger('blur');
            await nextTick();

            expect(wrapper.emitted('complete')).toBeTruthy();
        });

        it('分鐘輸入完成且啟用秒鐘時應該跳轉到秒鐘', async () => {
            wrapper = createWrapper({ enableSeconds: true });
            const minuteInput = wrapper.find('input[aria-label="minute"]');
            const secondInput = wrapper.find('input[aria-label="second"]');
            const focusSpy = vi.spyOn(secondInput.element, 'focus');

            await minuteInput.setValue('30');
            await minuteInput.trigger('input');

            expect(focusSpy).toHaveBeenCalled();
        });
    });

    describe('12小時制轉換測試', () => {
        beforeEach(() => {
            wrapper = createWrapper({ use24Hour: false });
        });

        it('應該正確處理午夜12點', async () => {
            wrapper = createWrapper({ modelValue: '00:30', use24Hour: false });
            await nextTick();

            expect(wrapper.find('input[aria-label="hour"]').element.value).toBe('12');
            expect(wrapper.vm.periodValue).toBe('AM');
        });

        it('應該正確處理中午12點', async () => {
            wrapper = createWrapper({ modelValue: '12:30', use24Hour: false });
            await nextTick();

            expect(wrapper.find('input[aria-label="hour"]').element.value).toBe('12');
            expect(wrapper.vm.periodValue).toBe('PM');
        });
    });

    describe('驗證錯誤詳細測試', () => {
        it('小時為0在12小時制下應該報錯', async () => {
            wrapper = createWrapper({ use24Hour: false });
            const hourInput = wrapper.find('input[aria-label="hour"]');

            await hourInput.setValue('0');
            await hourInput.trigger('blur');

            expect(wrapper.emitted('validation')).toBeTruthy();
            const [isValid, errors] = wrapper.emitted('validation')[0];
            expect(isValid).toBe(false);
            expect(errors.hour).toBeDefined();
        });
    });

    describe('無效輸入處理', () => {
        it('modelValue 包含小數點應該被過濾', async () => {
            wrapper = createWrapper({ modelValue: '12:30.5:45.7' });
            await nextTick();

            expect(wrapper.vm.minuteValue).toBe('305');
            expect(wrapper.vm.secondValue).toBe('457');
        });

        it('modelValue 包含其他非數字字符應該被過濾', async () => {
            wrapper = createWrapper({ modelValue: '12:3a0b:4c5d' });
            await nextTick();

            expect(wrapper.vm.minuteValue).toBe('30');
            expect(wrapper.vm.secondValue).toBe('45');
        });
    });

    describe('鍵盤導航進階測試', () => {
        it('在小時輸入框按左箭頭應該導航到日期輸入', async () => {
            const hourInput = wrapper.find('input[aria-label="hour"]');

            await hourInput.trigger('keydown', { key: 'ArrowLeft' });

            expect(wrapper.emitted('navigate-to-date')).toBeTruthy();
        });

        it('在分鐘輸入框為空時按退格鍵應該跳回小時', async () => {
            const minuteInput = wrapper.find('input[aria-label="minute"]');
            const hourInput = wrapper.find('input[aria-label="hour"]');
            const focusSpy = vi.spyOn(hourInput.element, 'focus');

            await minuteInput.trigger('keydown', { key: 'Backspace' });

            expect(focusSpy).toHaveBeenCalled();
        });

        it('Tab鍵應該正常執行預設行為', async () => {
            const hourInput = wrapper.find('input[aria-label="hour"]');
            const preventDefaultSpy = vi.fn();

            // 方法2：使用 trigger 的事件監聽方式
            await hourInput.trigger('keydown', {
                key: 'Tab',
                preventDefault: preventDefaultSpy
            });

            expect(preventDefaultSpy).not.toHaveBeenCalled();
        });
    });

    describe('邊界值測試', () => {
        it('24小時制最大值測試', async () => {
            const hourInput = wrapper.find('input[aria-label="hour"]');

            await hourInput.setValue('23');
            await hourInput.trigger('blur');

            expect(wrapper.emitted('validation')).toBeTruthy();
            const [isValid] = wrapper.emitted('validation')[0];
            expect(isValid).toBe(true);
        });

        it('12小時制最大值測試', async () => {
            wrapper = createWrapper({ use24Hour: false });
            const hourInput = wrapper.find('input[aria-label="hour"]');

            await hourInput.setValue('12');
            await hourInput.trigger('blur');

            expect(wrapper.emitted('validation')).toBeTruthy();
            const [isValid] = wrapper.emitted('validation')[0];
            expect(isValid).toBe(true);
        });

        it('分鐘最大值59測試', async () => {
            const minuteInput = wrapper.find('input[aria-label="minute"]');

            await minuteInput.setValue('59');
            await minuteInput.trigger('blur');

            expect(wrapper.emitted('validation')).toBeTruthy();
            const [isValid] = wrapper.emitted('validation')[0];
            expect(isValid).toBe(true);
        });
    });

    describe('本地化進階測試', () => {
        it('應該處理不同地區的AM/PM格式', () => {
            wrapper = createWrapper({
                use24Hour: false,
                useLocalizedPeriod: true,
                locale: 'ja-JP'
            });

            expect(wrapper.vm.localizedPeriod).toBeDefined();
            expect(typeof wrapper.vm.localizedPeriod).toBe('string');
        });

        it('本地化失敗時應該回退到預設值', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            wrapper = createWrapper({
                use24Hour: false,
                useLocalizedPeriod: true,
                locale: 'invalid-locale-string'
            });

            expect(wrapper.vm.displayPeriod).toBe('上午');
            consoleSpy.mockRestore();
        });
    });

    describe('minuteStep 屬性測試', () => {
        it('應該接受 minuteStep 屬性', () => {
            wrapper = createWrapper({ minuteStep: 5 });
            expect(wrapper.props('minuteStep')).toBe(5);
        });

        it('預設 minuteStep 應該為1', () => {
            expect(wrapper.props('minuteStep')).toBe(1);
        });
    });

    describe('組件狀態管理測試', () => {
        it('初始化前不應該發送事件', () => {
            wrapper = createWrapper();

            // 在初始化完成前，不應該有事件發送
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });

        it('重置後所有值應該清空', () => {
            wrapper.vm.setTime('15:30:45');
            wrapper.vm.reset();

            expect(wrapper.vm.hourValue).toBe('');
            expect(wrapper.vm.minuteValue).toBe('');
            expect(wrapper.vm.secondValue).toBe('');
            expect(wrapper.vm.periodValue).toBe('AM');
        });

        it('focusLast 方法應該正確聚焦最後一個欄位', () => {
            wrapper = createWrapper({ enableSeconds: true });
            const secondInput = wrapper.find('input[aria-label="second"]');
            const setSelectionRangeSpy = vi.spyOn(secondInput.element, 'setSelectionRange');

            wrapper.vm.focusLast();

            expect(setSelectionRangeSpy).toHaveBeenCalledWith(0, 0);
        });

        it('未啟用秒鐘時 focusLast 應該聚焦分鐘欄位', () => {
            wrapper = createWrapper({ enableSeconds: false });
            const minuteInput = wrapper.find('input[aria-label="minute"]');
            const setSelectionRangeSpy = vi.spyOn(minuteInput.element, 'setSelectionRange');

            wrapper.vm.focusLast();

            expect(setSelectionRangeSpy).toHaveBeenCalledWith(0, 0);
        });
    });
});
