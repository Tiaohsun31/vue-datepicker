/**
 * useTheme.ts
 * 以 Vue 響應式方式把主題綁定到元件根元素：
 *  - 主色：解析後輸出單一 CSS 變數 `--color-vdp-primary`，其餘狀態色由 CSS 的 color-mix() 衍生。
 *  - 深淺模式：輸出 `data-vdp-mode` 屬性（per-instance）；未指定 / auto 時不設，
 *    交由 CSS 的 prefers-color-scheme 跟隨系統。家族層另以 `data-tia-mode` 一起切（見 theme.css）。
 * 不再使用全域單例 / setTimeout / querySelector / getComputedStyle / 色階吸附。
 */
import { computed, type Ref } from 'vue';
import type { TailwindColor } from '../types/public';
import { tailwindBaseColors, isTailwindColorName } from '../utils/tailwind4-color';
import { warn } from '../utils/logger';

export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * 將使用者傳入的主色解析為可用的 CSS 顏色字串。
 * 色名 → 查表取基準色；hex / rgb / oklch / 任意合法 CSS 顏色 → 原樣採用。
 */
export function resolvePrimaryColor(input?: TailwindColor | string): string {
    if (!input) return tailwindBaseColors.indigo;
    if (isTailwindColorName(input)) return tailwindBaseColors[input];
    // 既非內建色名、也非合法 CSS 顏色 → 會被瀏覽器忽略而靜默失效，dev 模式提醒。
    if (
        typeof CSS !== 'undefined' &&
        typeof CSS.supports === 'function' &&
        !CSS.supports('color', input)
    ) {
        warn(
            `theme="${input}" 既非內建色名（22 色）也非合法 CSS 顏色，` +
            `將被瀏覽器忽略。請改傳 hex / rgb / oklch 或內建色名。`,
        );
    }
    return input;
}

export function useTheme(
    theme: Ref<TailwindColor | string | undefined>,
    mode: Ref<ThemeMode | undefined>,
) {
    // 只有指定 theme prop 時才以 inline 覆蓋 --color-vdp-primary；
    // 未指定則交由 :root 的 --color-vdp-primary（引用家族共用基元 --tia-theme-primary）決定，
    // 讓家族層級換色能生效、亦尊重消費者全域覆寫。
    const themeStyle = computed<Record<string, string>>(() => {
        const style: Record<string, string> = {};
        if (theme.value) style['--color-vdp-primary'] = resolvePrimaryColor(theme.value);
        return style;
    });

    // 明確指定 light / dark 時設 data-vdp-mode（per-instance）；未指定或 auto 則不設，跟隨系統偏好。
    const themeAttrs = computed<Record<string, string>>(() => {
        const attrs: Record<string, string> = {};
        if (mode.value && mode.value !== 'auto') attrs['data-vdp-mode'] = mode.value;
        return attrs;
    });

    return {
        themeStyle,
        themeAttrs,
    };
}

export default useTheme;
