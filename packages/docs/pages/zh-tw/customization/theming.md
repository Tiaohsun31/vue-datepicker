# Theme & Mode

Vue DatePicker 自帶**自包含主題**——免裝 Tailwind CSS。只需匯入一次樣式，即可透過 props 或少量 CSS 變數宣告式地自訂顏色與深淺模式。

```js
import "@tiaohsun/vue-datepicker/style";
```

::: tip 免裝 Tailwind
自 v2.0 起樣式完全自包含，以私有 `--vdp-*` token 命名空間撰寫。不再需要 `@import "tailwindcss"` 或 `@source` 掃描。若您*有*使用 Tailwind 並想讓其 `dark:` variant 驅動本元件，可將它映射到本元件的 mode 屬性：

```css
@custom-variant dark (&:where([data-vdp-mode="dark"], [data-vdp-mode="dark"] *, .dark, .dark *));
```

:::

## 深淺模式

### 預設——跟隨系統偏好

預設情況下，DatePicker 會跟隨使用者的系統偏好（`prefers-color-scheme`）自動在淺色與深色間切換。此行為範圍限定於元件本身（不會劫持全域 `.dark`），且 SSR 安全。

::: raw

<div class="demo-container">
    <DatePicker v-model="date" :locale="locale" />
</div>
:::

```vue
<template>
  <DatePicker v-model="date" />
</template>
```

### 強制深色 / 強制淺色

以 `mode` prop 對單一實例覆蓋系統偏好。

::: raw

<div class="demo-container space-y-2">
  <DatePicker v-model="date" :locale="locale" mode="dark" />
  <DatePicker v-model="date" :locale="locale" mode="light" />
</div>
:::

```vue
<template>
  <DatePicker v-model="date" mode="dark" />
  <DatePicker v-model="date" mode="light" />
</template>
```

`mode` prop 接受 `'light'`、`'dark'` 或 `'auto'`（預設）。內部會在元件根設定 `data-vdp-mode`。

### 模式屬性

除了 prop，也可用屬性切換模式：

| 屬性            | 範圍                                                   |
| --------------- | ------------------------------------------------------ |
| `data-vdp-mode` | 單一實例（即 `mode` prop 所設）                        |
| `data-tia-mode` | 整個 `@tiaohsun/vue-*` 家族（datepicker + datatable…） |
| `.dark`         | 也支援頁面全域 dark class                              |

```html
<!-- 一次切換整個家族 -->
<body data-tia-mode="dark">
  …
</body>
```

> ⚠️ 舊的 `data-vdt-mode` 屬性已於 v2.0 **移除**。

## 主題顏色

`theme` prop 接受 26 個內建色名，或任意 hex / rgb / oklch 值。**傳什麼色就用什麼色**——不會「吸附最近的顏色」。

::: raw

<div class="demo-container space-y-2">
  <DatePicker v-model="date" :locale="locale" theme="blue" />
  <DatePicker v-model="date" :locale="locale" theme="#ffaa00" />
  <DatePicker v-model="date" :locale="locale" theme="rgb(255, 0, 0)" />
  <DatePicker v-model="date" :locale="locale" theme="oklch(69.6% 0.17 162.48)" />
</div>
:::

```vue
<template>
  <!-- 內建色名 -->
  <DatePicker v-model="date" theme="blue" />
  <!-- Hex -->
  <DatePicker v-model="date" theme="#ffaa00" />
  <!-- RGB -->
  <DatePicker v-model="date" theme="rgb(255, 0, 0)" />
  <!-- OKLCH -->
  <DatePicker v-model="date" theme="oklch(69.6% 0.17 162.48)" />
</template>
```

所有狀態色（hover、active、選取的淡色背景、focus ring、邊框）都由你提供的單一主色透過 CSS `color-mix()` **自動衍生**——你只需提供基準色。

::: tip 非法顏色
若傳入的既非內建色名也非合法 CSS 顏色，瀏覽器會忽略它，並於開發模式記錄警告。
:::

### 內建色名

`slate`、`gray`、`zinc`、`neutral`、`stone`、`red`、`orange`、`amber`、`yellow`、`lime`、`green`、`emerald`、`teal`、`cyan`、`sky`、`blue`、`indigo`（預設）、`violet`、`purple`、`fuchsia`、`pink`、`rose`、`taupe`, `mauve`, `mist`, and `olive`

## CSS 變數模型

主題採三層 token 模型，讓單一套件與整個家族保持同步：

```css
:root {
  /* ① 家族基元——與 @tiaohsun/vue-* 家族共用。
        設定它即可一次替 datepicker + datatable + … 換色。 */
  --tia-theme-primary: oklch(58.5% 0.233 277.117); /* 預設：indigo */

  /* ② datepicker 別名——引用家族基元，附字面 fallback，
        讓套件單獨安裝也能運作。 */
  --color-vdp-primary: var(--tia-theme-primary, oklch(58.5% 0.233 277.117));

  /* ③ 衍生狀態色（color-mix）——你不需設定，會自動跟隨
        --color-vdp-primary。此處僅供參考。 */
  /* --color-vdp-primary-hover  : mix(primary, black 12%)            */
  /* --color-vdp-primary-strong : mix(primary, black 26%)            */
  /* --color-vdp-primary-subtle : mix(primary, surface 88%)          */
  /* --color-vdp-primary-border : mix(primary, surface 55%)          */
  /* --color-vdp-primary-ring   : mix(primary, transparent 50%)      */
}
```

### 替整個家族換色

在 `:root` 設定 `--tia-theme-primary`：

```css
:root {
  --tia-theme-primary: #0ea5e9;
}
```

::: warning 請在 `:root` 設定
`--color-vdp-primary` 在 `:root` 解析，其 `var(--tia-theme-primary)` 於 `:root` 即代換完成，子層僅繼承結果。在中間層某元素覆寫 `--tia-theme-primary` **不會**傳播。要替子樹換色請改用 `theme` prop 或直接覆寫 `--color-vdp-primary`（見下）。
:::

### 替單一實例 / 子樹換色

`theme` prop 會在該實例 inline 設定 `--color-vdp-primary`。等效地，也可在 wrapper 覆寫此變數：

```vue
<template>
  <div class="brand-datepicker">
    <DatePicker v-model="date" />
  </div>
</template>

<style scoped>
.brand-datepicker {
  --color-vdp-primary: #1e40af;
}
</style>
```

### 中性語義色

surface、content、outline 等顏色有淺色與深色兩套，並隨當前模式切換。覆寫已套用的變數即可自訂：

```css
:root {
  --color-vdp-surface: white; /* 彈窗 / 輸入框背景 */
  --color-vdp-surface-secondary: oklch(98.5% 0.002 247.839);
  --color-vdp-surface-elevated: white;
  --color-vdp-content: oklch(21% 0.034 264.665); /* 主要文字 */
  --color-vdp-content-secondary: oklch(44.6% 0.03 256.802);
  --color-vdp-content-muted: oklch(70.7% 0.022 261.325); /* 佔位文字 */
  --color-vdp-outline: oklch(92.8% 0.006 264.531); /* 邊框 */
  --color-vdp-interactive-hover: oklch(96.7% 0.003 264.542);
  --color-vdp-interactive-active: oklch(87.2% 0.01 258.338);

  --color-vdp-error: oklch(63.7% 0.237 25.331); /* 錯誤狀態 */
}
```

只想覆寫深色調色盤時，將其放在 dark 選擇器下：

```css
[data-vdp-mode="dark"],
[data-tia-mode="dark"],
.dark {
  --color-vdp-surface: oklch(20% 0.034 264.665);
  --color-vdp-content: oklch(96.7% 0.003 264.542);
}
```

## 公開 class hook

下列 class 名稱屬公開 API，可安全用於覆寫樣式。另有結構性 `.vdp-*` class 供細粒度調整，但下列標記 class 是穩定 hook：

| Class                          | 元素                  |
| ------------------------------ | --------------------- |
| `.date-picker-wrapper`         | DatePicker 根         |
| `.date-range-wrapper`          | DateRange 根          |
| `.date-picker-container`       | 輸入框容器            |
| `.date-picker-container.error` | 輸入框容器，錯誤狀態  |
| `.date-picker-icon`            | 日曆 / 清除 icon 按鈕 |
| `.date-placeholder`            | 顯示值 / 佔位文字     |
| `.calendar-container`          | 日曆彈窗              |

```css
/* 範例：自訂日曆彈窗與錯誤邊框 */
.calendar-container {
  border-radius: 1rem;
}
.date-picker-container.error {
  border-color: crimson;
}
```

::: tip

- 快速設定優先用 `theme` / `mode` props；全域主題用 CSS 變數。
- 所有標記 class 採 kebab-case 並帶 `date-picker-` / `date-range-` / `calendar-` 前綴，避免衝突。
- 每個元件實例獨立套用主題，彼此不影響。
- 部分覆寫可能需要更高的 specificity（或 `!important`）才能替換預設樣式。
  :::

<script setup lang="ts">
import { ref,computed } from "vue";
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

const date = ref(null);
</script>
