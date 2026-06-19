# Changelog

## [2.0.0] - 2026-06-19

A major rewrite focused on a **self-contained theme** (no Tailwind required), a declarative theming model, and an opt-in calendar registry. / 以**自包含主題**（免裝 Tailwind）、宣告式主題模型、按需註冊的曆法 registry 為核心的重大改版。

> See the [Migration Guide](#migration-from-1x-to-2x) below for upgrade steps. / 升級步驟見下方[遷移指南](#migration-from-1x-to-2x)。

### ⚠️ Breaking Changes / 破壞性變更

- 💥 **Tailwind CSS is no longer required.** `tailwindcss` was removed as a `peerDependency`; the shipped CSS is fully self-contained (built on a private `--vdp-*` token namespace, with `--tw-` / preflight / Tailwind theme vars all `0`). Just `import '@tiaohsun/vue-datepicker/style'`. The old `@source` Tailwind scanning step is no longer needed. / **不再需要 Tailwind CSS。** 已移除 `tailwindcss` peerDependency；出貨 CSS 完全自包含（以私有 `--vdp-*` token 命名空間撰寫，`--tw-`/preflight/Tailwind 變數皆為 0）。只需 `import '@tiaohsun/vue-datepicker/style'`，不再需要 `@source` 掃描設定。
- 💥 **CSS variable namespace `--color-vdt-*` → `--color-vdp-*`.** Consumers who overrode the old `vdt` variables must rename them. / **CSS 變數命名空間 `--color-vdt-*` → `--color-vdp-*`。** 曾覆寫舊 `vdt` 變數的消費者需改名。
- 💥 **Removed the 11-step color scale `--color-vdt-theme-50…950`.** The theme color is now a single input `--color-vdp-primary`; all state colors (`-hover` / `-strong` / `-subtle` / `-border` / `-ring`) are derived automatically via CSS `color-mix()`. / **移除 11 階色票 `--color-vdt-theme-50…950`。** 主題色改為單一輸入 `--color-vdp-primary`，狀態色（`-hover`/`-strong`/`-subtle`/`-border`/`-ring`）由 CSS `color-mix()` 自動衍生。
- 💥 **The `theme` prop no longer snaps to the nearest Tailwind color.** Whatever color you pass (hex / rgb / oklch / one of 22 built-in color names) is used exactly. Invalid values are warned in dev. / **`theme` prop 不再吸附最近的 Tailwind 色。** 傳什麼色就用什麼色（hex / rgb / oklch / 22 個內建色名）；非法值於 dev 模式 warn。
- 💥 **Default primary color changed `violet` → `indigo`.** The `theme` prop now defaults to `undefined` (follows the family `--tia-theme-primary` = indigo). Pass `theme="violet"` explicitly to keep the old look. / **預設主色 `violet` → `indigo`。** `theme` prop 預設改為 `undefined`（跟隨家族 `--tia-theme-primary` = indigo）；要保留舊外觀請顯式 `theme="violet"`。
- 💥 **Removed the imperative theme API.** `ref.setTheme` / `setDarkMode` / `setLightMode` / `setAutoMode` / `getCurrentMode` / `isDarkMode` / `isLightMode` are all gone — use the declarative `theme` / `mode` props instead. / **移除命令式主題 API。** `setTheme`/`setDarkMode`/`setLightMode`/`setAutoMode`/`getCurrentMode`/`isDarkMode`/`isLightMode` 全數移除，改用宣告式 `theme`/`mode` props。
- 💥 **Dark-mode attribute changed.** `data-vdt-mode` was removed. Per-instance mode is now `data-vdp-mode`; the family-wide switch (datepicker + datatable together) is `data-tia-mode`. The global `.dark` class is still honored. / **深淺模式屬性變更。** 移除 `data-vdt-mode`；per-instance 改 `data-vdp-mode`，家族層（datepicker + datatable 一起切）用 `data-tia-mode`；全域 `.dark` 仍支援。
- 💥 **Non-Gregorian calendars are now opt-in.** To keep the bundle tree-shakeable, only the Gregorian calendar is built in. Other calendars must be registered explicitly: `import { registerCalendar, rocCalendar } from '@tiaohsun/vue-datepicker'; registerCalendar(rocCalendar)`. Using an unregistered calendar falls back to Gregorian with a dev warning. / **非西元曆改為按需註冊。** 為使 bundle 可 tree-shake，僅西元曆內建；其餘曆法須顯式註冊：`import { registerCalendar, rocCalendar } from '@tiaohsun/vue-datepicker'; registerCalendar(rocCalendar)`。使用未註冊曆法會回退西元曆並於 dev 警告。
- 💥 **`RocFormatPlugin` is no longer exported directly.** It is now packaged inside the `rocCalendar` descriptor. Register it via `registerCalendar(rocCalendar)`. / **不再直接匯出 `RocFormatPlugin`。** 已包進 `rocCalendar` 描述子，改用 `registerCalendar(rocCalendar)` 註冊。

### ✨ Added / 新增

- 🎨 **Three-layer theme token model**: shared family primitives (`--tia-*`, shared with `@tiaohsun/vue-*` siblings) → datepicker aliases (`--color-vdp-*` / `--vdp-*`, with literal fallbacks) → `color-mix()`-derived state colors. Set `--tia-theme-primary` on `:root` to recolor the whole family at once. / **三層主題 token 模型**：家族共用基元（`--tia-*`，與 `@tiaohsun/vue-*` 家族共用）→ datepicker 別名（`--color-vdp-*`/`--vdp-*`，含字面 fallback）→ `color-mix()` 衍生狀態色。在 `:root` 設 `--tia-theme-primary` 即可一次替整個家族換色。
- 🧩 **Public calendar registry API**: `registerCalendar()`, `getCalendarDescriptor()`, `isCalendarRegistered()`, the `CalendarDescriptor` / `CalendarPlugin` types, and built-in descriptors (`rocCalendar`, `buddhistCalendar`, `japaneseCalendar`, `persianCalendar`, `hebrewCalendar`, `indianCalendar`, `copticCalendar`, `ethiopicCalendar`, `ethioaaCalendar`, `islamicCivilCalendar`, `islamicTabularCalendar`, `islamicUmalquraCalendar`). Third parties can register their own custom-text calendars through the same API. / **公開曆法 registry API**：`registerCalendar()`/`getCalendarDescriptor()`/`isCalendarRegistered()`、`CalendarDescriptor`/`CalendarPlugin` 型別，及內建描述子（roc/buddhist/japanese/persian/hebrew/indian/coptic/ethiopic/ethioaa/islamic-civil/-tbla/-umalqura）。第三方可透過同一 API 註冊自訂文字曆法。
- 🌗 **Self-contained light/dark surfaces** with `prefers-color-scheme` auto mode scoped to the component root (SSR-safe, no global `.dark` hijacking). / **自包含淺/深色 surface**，`prefers-color-scheme` 自動模式範圍限定到元件根（SSR 安全，不劫持全域 `.dark`）。

### ♻️ Changed / 變更

- 🏗️ All 13 shipped components migrated from Tailwind utility classes to literal `.vdp-*` CSS (shared rules in `components.css`, component-specific in scoped `<style>`). / 全部 13 個出貨元件由 Tailwind utility 改為字面 `.vdp-*` CSS（共用放 `components.css`、元件內部放 scoped `<style>`）。
- 🧰 Theme engine rewritten to be declarative (`:style` / `v-bind`); removed the global singleton, `setTimeout` retries, `querySelector` / `getComputedStyle` detection, and the hand-rolled hex→OKLCH color approximation (~700 lines removed). / 主題引擎改寫為宣告式（`:style`/`v-bind`）；移除全域單例、`setTimeout` 重試、`querySelector`/`getComputedStyle` 偵測與手刻 hex→OKLCH 近似（移除約 700 行）。
- 📦 `.d.ts` generation is now plugin-less (`vue-tsc -p tsconfig.build.json`, no `vite-plugin-dts`); public types resolve cleanly (no `@/` alias leakage). / `.d.ts` 改 plugin-less 產生（`vue-tsc -p tsconfig.build.json`，移除 `vite-plugin-dts`）；公開型別可乾淨解析（無 `@/` alias 殘留）。
- 🔤 The error state is unified under the `.date-picker-container.error` hook (was hard-coded `border-red-500`). / 錯誤狀態統一走 `.date-picker-container.error` hook（原硬寫 `border-red-500`）。

### 🐛 Fixed / 修復

- 🐛 Controlled `v-model` updates now propagate after mount (`modelValue` is tracked reactively instead of snapshotted). / 受控 `v-model` 更新在掛載後可正確傳播（`modelValue` 改為響應式追蹤，不再快照）。
- 🐛 Derived state colors (`-hover`/`-subtle`/`-ring`…) now follow the per-instance `theme` prop. / 衍生狀態色（`-hover`/`-subtle`/`-ring`…）現會跟隨 per-instance `theme` prop。
- 🐛 ROC numeric input without a prefix (e.g. `114-06-18`) is now parsed as an ROC year instead of being mistaken for a Gregorian year. / ROC 無前綴數字輸入（如 `114-06-18`）現正確解析為民國年，不再被誤判為西元年。
- 🐛 The `mode` prop's dark theme no longer silently fails (the emitted attribute and CSS selector are now consistent). / `mode` prop 深色不再靜默失效（emit 屬性與 CSS 選擇器已一致）。
- 🐛 `globalParser` is no longer a shared mutable singleton, eliminating cross-instance locale/calendar races. / `globalParser` 不再是共享可變單例，消除跨實例 locale/calendar 競態。

### Migration from 1.x to 2.x

**1. Remove Tailwind setup (optional).** Delete the `@source ".../@tiaohsun/vue-datepicker/dist/**"` line — it is no longer needed. Keep only the style import:

```js
import '@tiaohsun/vue-datepicker/style'
```

**2. Rename CSS variable overrides.**

| 1.x                                                | 2.x                                                |
| -------------------------------------------------- | -------------------------------------------------- |
| `--color-vdt-theme-500`                            | `--color-vdp-primary`                              |
| `--color-vdt-theme-600` (hover)                    | derived `--color-vdp-primary-hover` (auto)         |
| `--color-vdt-theme-700` (active)                   | derived `--color-vdp-primary-strong` (auto)        |
| `--color-vdt-theme-100/200` (subtle)               | derived `--color-vdp-primary-subtle` (auto)        |
| `--color-vdt-theme-300` (border)                   | derived `--color-vdp-primary-border` (auto)        |
| `--color-vdt-theme-400` (ring)                     | derived `--color-vdp-primary-ring` (auto)          |
| `--color-vdt-surface` / `-content` / `-outline` /… | `--color-vdp-surface` / `-content` / `-outline` /… |
| `--color-vdt-error`                                | `--color-vdp-error`                                |

In most cases you only need to set `--color-vdp-primary` (or `--tia-theme-primary` for the whole family); the rest are derived.

**3. Replace the imperative theme API with props.**

```diff
- const picker = ref();
- picker.value.setTheme('blue');
- picker.value.setDarkMode();
+ <DatePicker theme="blue" mode="dark" />
```

**4. Update the dark-mode attribute.** Replace any `data-vdt-mode` with `data-vdp-mode` (per-instance) or `data-tia-mode` (family-wide). The global `.dark` class still works.

**5. Register non-Gregorian calendars.**

```diff
+ import { registerCalendar, rocCalendar } from '@tiaohsun/vue-datepicker';
+ registerCalendar(rocCalendar); // once, at app startup

  <DatePicker calendar="roc" />
```

**6. Replace direct `RocFormatPlugin` usage** with `registerCalendar(rocCalendar)` (the plugin is now bundled in the descriptor).

## [1.0.5] - 2026-05-07

### Changed

- ♻️ Replaced all internal `@layer components` custom utility classes with Tailwind CSS arbitrary value syntax (`bg-[var(--color-vdt-*)]`) across all components / 將所有元件內部的 `@layer components` 自訂工具類別替換為 Tailwind CSS 任意值語法
- ♻️ Removed the entire `@layer components` block (~400 lines) from `theme.css`, reducing bundle size / 移除 `theme.css` 中整個 `@layer components` 區塊（約 400 行），縮減打包體積
- ♻️ Replaced Tailwind-dependent `var(--color-gray-*)` / `var(--color-slate-*)` references in `theme.css` with standalone oklch values to ensure compatibility without Tailwind / 將 `theme.css` 中依賴 Tailwind 的 `var(--color-gray-*)` 參照替換為獨立的 oklch 色值，確保不使用 Tailwind 的消費者也能正常顯示
- ♻️ Removed unused CSS custom properties `--color-vdt-outline-strong` and `--color-vdt-outline-stronger` / 移除未使用的 CSS 自訂屬性

### Fixed

- 🐛 Fixed broken CSS selector in `CalendarCell` scoped styles: changed class-based selector to semantic `[aria-selected="true"]` attribute selector / 修復 `CalendarCell` scoped 樣式中失效的 CSS 選擇器，改為語意化的 `[aria-selected]` 屬性選擇器
- 🐛 Fixed invalid `var(--color-vdt-primary-400)` reference in `.date-picker-container:focus-within` (variable did not exist) / 修復 `.date-picker-container:focus-within` 中使用不存在變數的問題

## [1.0.4] - 2025-10-30

### Fixed

- 🐛 In the Disabled state, DateInput and TimeInput were not passed correctly. / Disabled狀態下，未正確傳入 DateInput 及 TimeInput

### Added

- 🔧 The default date icon position has been changed to the front, and a new `showCalendarIcon` attribute has been added, allowing users to choose whether to display it. / 預設日期圖標位置改為前面，並新增`showCalendarIcon`屬性，可自行選擇是否顯示。

## [1.0.3] - 2025-10-03

### Fixed

- 🐛 Fixed Disabled only working after initialization / 修復 Disabled 只有在初始化才有作用

### Added

- 🆔 Added support for id and name for label matching / 新增支援id與name，以與label進行搭配
- 🔧 Fixed many type defaults issues / 處理大量型別預設問題

## [1.0.2] - 2025-08-28

### Fixed

- 🐛 Fixed the issue where the input box and date picker displayed abnormally in the Grid / 修復在 Grid 的情況下，輸入框與日期選擇器顯示異常

## [1.0.0] - 2025-07-03

### Added

- 🎉 Initial release of @tiaohsun/vue-datepicker / @tiaohsun/vue-datepicker 首次發布
- 📅 Vue 3 datepicker component with multi-calendar support / Vue 3 日期選擇器組件，支援多月曆顯示
- 🎨 Styled with Tailwind CSS for modern design / 使用 Tailwind CSS 設計現代化樣式
- 🌍 Internationalization (i18n) support / 國際化（i18n）支援
- 📱 Responsive design for mobile and desktop / 響應式設計，支援手機和桌面
- 🔧 TypeScript support with full type definitions / TypeScript 支援與完整型別定義
- 📝 Comprehensive documentation website / 完整的文件網站
- 🧪 Unit tests with Vitest / Vitest 單元測試
- 🎭 E2E tests with Playwright / Playwright E2E 測試
- 📦 Multiple export formats (ES modules, UMD, TypeScript definitions) / 多種匯出格式支援
- 🎯 Date range selection support / 日期範圍選擇支援
- 📚 Integration with @internationalized/date and dayjs / 整合 @internationalized/date 和 dayjs
- 🎪 Interactive demo and examples / 互動式示例和範例

### Features / 功能特色

- Single date selection / 單一日期選擇
- Date range selection / 日期範圍選擇
- Multiple calendar views / 多月曆檢視
- Customizable styling / 可自訂樣式
- Keyboard navigation / 鍵盤導航
- Accessibility support / 無障礙支援
- Locale-specific formatting / 地區特定格式化
- Disabled dates configuration / 停用日期設定
- Custom date validation / 自訂日期驗證
- Flexible positioning options / 靈活的定位選項

[2.0.0]: https://github.com/Tiaohsun31/vue-datepicker/releases/tag/v2.0.0
[1.0.0]: https://github.com/Tiaohsun31/vue-datepicker/releases/tag/v1.0.0
