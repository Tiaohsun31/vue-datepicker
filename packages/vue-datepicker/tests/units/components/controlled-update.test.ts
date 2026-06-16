/**
 * 受控更新（controlled v-model）測試 — 對應 RefactorPlan §5.1。
 *
 * 原 bug：useDateTimePicker / useDateRange 以「純值快照」解構 options，
 * `watch(() => modelValue)` 監聽常數，掛載後外部 v-model 更新不傳播。
 *
 * Phase 4 修復：options.modelValue 改為 MaybeRefOrGetter，呼叫端傳 getter
 * （`() => props.modelValue`），composable 內以 `watch(() => toValue(...))` 監聽 →
 * 掛載後外部更新可正確傳播。以下為修復後的正式回歸測試。
 */
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import DatePicker from '@/DatePicker.vue';
import DateRange from '@/DateRange.vue';

const yearValue = (w: ReturnType<typeof mount>) => {
    const el = w.find('input[aria-label="year"]');
    return el.exists() ? (el.element as HTMLInputElement).value : null;
};

describe('受控更新（§5.1，已修復）', () => {
    describe('DatePicker', () => {
        it('初始 modelValue 應正確顯示', () => {
            const w = mount(DatePicker, { props: { modelValue: '2023-12-01' } });
            expect(yearValue(w)).toBe('2023');
        });

        it('掛載後更新 modelValue 應同步到輸入框顯示', async () => {
            const w = mount(DatePicker, { props: { modelValue: '2023-12-01' } });
            await w.setProps({ modelValue: '2025-06-16' });
            await nextTick();
            expect(yearValue(w)).toBe('2025');
        });

        it('清空 modelValue（設為 null）應清掉輸入框', async () => {
            const w = mount(DatePicker, { props: { modelValue: '2023-12-01' } });
            await w.setProps({ modelValue: null });
            await nextTick();
            expect(yearValue(w)).toBe('');
        });

        it('連續多次外部更新都應同步', async () => {
            const w = mount(DatePicker, { props: { modelValue: '2023-12-01' } });
            await w.setProps({ modelValue: '2024-01-15' });
            await nextTick();
            expect(yearValue(w)).toBe('2024');
            await w.setProps({ modelValue: '2030-11-30' });
            await nextTick();
            expect(yearValue(w)).toBe('2030');
        });
    });

    describe('DateRange', () => {
        // DateRange 顯示區綁 prop；修復後內部 useDateRange 狀態也會隨外部更新同步
        // （影響日曆預選/範圍驗證）。顯示層與內部現為一致來源。
        it('掛載後更新 modelValue 應同步顯示新範圍', async () => {
            const w = mount(DateRange, {
                props: { modelValue: { start: '2023-01-01', end: '2023-01-10' } },
            });
            expect(w.text()).toContain('2023-01-01');
            await w.setProps({ modelValue: { start: '2025-06-01', end: '2025-06-20' } });
            await nextTick();
            expect(w.text()).toContain('2025-06-01');
            expect(w.text()).toContain('2025-06-20');
        });
    });
});
