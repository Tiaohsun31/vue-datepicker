// tests/units/composables/useTheme.test.ts
import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useTheme, resolvePrimaryColor, type ThemeMode } from '@/composables/useTheme';
import { tailwindBaseColors } from '@/utils/tailwind4-color';

describe('resolvePrimaryColor', () => {
    it('色名 → 查表基準色', () => {
        expect(resolvePrimaryColor('violet')).toBe(tailwindBaseColors.violet);
        expect(resolvePrimaryColor('red')).toBe(tailwindBaseColors.red);
        expect(resolvePrimaryColor('indigo')).toBe(tailwindBaseColors.indigo);
    });

    it('未提供 → indigo 家族預設', () => {
        expect(resolvePrimaryColor()).toBe(tailwindBaseColors.indigo);
        expect(resolvePrimaryColor(undefined)).toBe(tailwindBaseColors.indigo);
    });

    it('hex / rgb / oklch / 任意合法 CSS 色 → 原樣採用（不吸附）', () => {
        expect(resolvePrimaryColor('#ff0000')).toBe('#ff0000');
        expect(resolvePrimaryColor('rgb(0, 0, 255)')).toBe('rgb(0, 0, 255)');
        expect(resolvePrimaryColor('oklch(60% 0.2 30)')).toBe('oklch(60% 0.2 30)');
    });
});

describe('useTheme', () => {
    it('themeStyle：指定 theme 才 inline --color-vdp-primary', () => {
        const { themeStyle } = useTheme(ref<string | undefined>('red'), ref<ThemeMode | undefined>('auto'));
        expect(themeStyle.value['--color-vdp-primary']).toBe(tailwindBaseColors.red);
    });

    it('themeStyle：未指定 theme → 空物件（交給 :root 的家族層）', () => {
        const { themeStyle } = useTheme(ref<string | undefined>(undefined), ref<ThemeMode | undefined>('auto'));
        expect(themeStyle.value['--color-vdp-primary']).toBeUndefined();
        expect(Object.keys(themeStyle.value)).toHaveLength(0);
    });

    it('themeStyle：theme 變更時響應式更新', () => {
        const theme = ref<string | undefined>('red');
        const { themeStyle } = useTheme(theme, ref<ThemeMode | undefined>('auto'));
        expect(themeStyle.value['--color-vdp-primary']).toBe(tailwindBaseColors.red);
        theme.value = 'blue';
        expect(themeStyle.value['--color-vdp-primary']).toBe(tailwindBaseColors.blue);
    });

    it('themeAttrs：light/dark 設 data-vdt-mode；auto/未指定 不設', () => {
        expect(useTheme(ref(undefined), ref<ThemeMode | undefined>('dark')).themeAttrs.value['data-vdt-mode']).toBe('dark');
        expect(useTheme(ref(undefined), ref<ThemeMode | undefined>('light')).themeAttrs.value['data-vdt-mode']).toBe('light');
        expect(useTheme(ref(undefined), ref<ThemeMode | undefined>('auto')).themeAttrs.value['data-vdt-mode']).toBeUndefined();
        expect(useTheme(ref(undefined), ref<ThemeMode | undefined>(undefined)).themeAttrs.value['data-vdt-mode']).toBeUndefined();
    });

    it('themeAttrs：mode 變更時響應式更新', () => {
        const mode = ref<ThemeMode | undefined>('light');
        const { themeAttrs } = useTheme(ref(undefined), mode);
        expect(themeAttrs.value['data-vdt-mode']).toBe('light');
        mode.value = 'dark';
        expect(themeAttrs.value['data-vdt-mode']).toBe('dark');
        mode.value = 'auto';
        expect(themeAttrs.value['data-vdt-mode']).toBeUndefined();
    });
});
