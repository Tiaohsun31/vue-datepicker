# Theme & Mode

Vue DatePicker 提供了靈活的主題系統，支援多種自訂方式來滿足不同的設計需求。您可以透過多種方式來自訂顏色主題和明暗模式。

::: warning Tailwind CSS 4 配置
如果您使用 Tailwind CSS 4，需要在您的 CSS 文件中添加以下配置以支援 `mode` 功能：

```css
@import "tailwindcss";
/* 支援 Vue DatePicker 的 dark mode */
@custom-variant dark (&:where([data-vdt-mode="dark"], [data-vdt-mode="dark"] *, .dark, .dark *));
```

:::

## Default 跟隨系統偏好

預設情況下，DatePicker 會自動跟隨使用者的系統偏好設定（`prefers-color-scheme`），在淺色和深色主題之間自動切換。

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

## Dark Mode 強制深色

您可以強制使用深色模式，無論使用者的系統設定為何。

::: raw

<div class="demo-container">
  <DatePicker v-model="date" :locale="locale" mode="dark" />
</div>
:::

```vue
<template>
  <DatePicker v-model="date" mode="dark" />
</template>
```

## Light Mode 強制淺色

同樣地，您也可以強制使用淺色模式。

::: raw

<div class="demo-container">
  <DatePicker v-model="date" :locale="locale" mode="light" />
</div>
:::

```vue
<template>
  <DatePicker v-model="date" mode="light" />
</template>
```

## 主題顏色

支援 Tailwind 顏色名稱、十六進制、RGB 或 OKLCH 格式：

::: raw

<div class="demo-container space-y-2">
  <DatePicker v-model="date"  :locale="locale" theme="blue" />
  <DatePicker v-model="date"  :locale="locale" theme="#ffff00" />
  <DatePicker v-model="date"  :locale="locale" theme="rgb(255, 0, 0)" />
  <DatePicker v-model="date"  :locale="locale" theme="oklch(69.6% 0.17 162.48)" />
</div>
:::

```vue
<template>
  <!-- 使用 Tailwind 顏色名稱 -->
  <DatePicker v-model="date" theme="blue" />

  <!-- 使用十六進制顏色 -->
  <DatePicker v-model="date" theme="#ffff00" />

  <!-- 使用 RGB 顏色 -->
  <DatePicker v-model="date" theme="rgb(255, 0, 0)" />

  <!-- 使用 OKLCH 顏色 -->
  <DatePicker v-model="date" theme="oklch(69.6% 0.17 162.48)" />
</template>
```

::: warning 顏色轉換說明
傳入的顏色值會自動尋找最相近的 Tailwind 顏色名稱，所以顏色會有些微差異。如果要完全相同的顏色，請使用 `:root` 變數取代。
:::

### 支援的 Tailwind 顏色

`slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

請參考 [Tailwind CSS](https://tailwindcss.com/docs/customizing-colors#default-color-palette)。

## CSS 自訂

### 使用 CSS 變數

您可以透過 CSS 屬性（CSS Variables）來全域設置主題色彩。從 50 到 950 共 11 個色階(其中 500 為主要變數)：

```css
:root {
  --color-vdt-theme-50: #f0f9ff;
  --color-vdt-theme-100: #e0f2fe;
  --color-vdt-theme-200: #bae6fd;
  --color-vdt-theme-300: #7dd3fc;
  --color-vdt-theme-400: #38bdf8;
  --color-vdt-theme-500: #0ea5e9; /* 主要變數 */
  --color-vdt-theme-600: #0284c7;
  --color-vdt-theme-700: #0369a1;
  --color-vdt-theme-800: #075985;
  --color-vdt-theme-900: #0c4a6e;
  --color-vdt-theme-950: #082f49;
}
```

### 自訂語義化顏色

您也可以自訂語義化的顏色變數：

```css
:root {
  /* 淺色模式 */
  --color-vdt-light-surface: white;
  --color-vdt-light-surface-secondary: oklch(98.5% 0.002 247.839);
  --color-vdt-light-surface-elevated: white;
  --color-vdt-light-content: oklch(21% 0.034 264.665);
  --color-vdt-light-content-secondary: oklch(44.6% 0.03 256.802);
  --color-vdt-light-content-muted: oklch(70.7% 0.022 261.325);
  --color-vdt-light-outline: oklch(92.8% 0.006 264.531);
  --color-vdt-light-outline-strong: oklch(75.2% 0.01 258.338);
  --color-vdt-light-outline-stronger: oklch(65.7% 0.022 261.325);
  --color-vdt-light-interactive-hover: oklch(92.8% 0.006 264.531);
  --color-vdt-light-interactive-active: oklch(87.2% 0.01 258.338);

  /* 深色模式 */
  --color-vdt-dark-surface: oklch(20% 0.034 264.665);
  --color-vdt-dark-surface-secondary: oklch(25% 0.033 256.848);
  --color-vdt-dark-surface-elevated: oklch(32% 0.033 256.848);
  --color-vdt-dark-content: oklch(96.7% 0.003 264.542);
  --color-vdt-dark-content-secondary: oklch(87.2% 0.01 258.338);
  --color-vdt-dark-content-muted: oklch(70.7% 0.022 261.325);
  --color-vdt-dark-outline: oklch(40.3% 0.034 259.733);
  --color-vdt-dark-outline-strong: oklch(52.6% 0.03 256.802);
  --color-vdt-dark-outline-stronger: oklch(66.1% 0.027 264.364);
  --color-vdt-dark-interactive-hover: oklch(39.3% 0.034 259.733);
  --color-vdt-dark-interactive-active: oklch(44.6% 0.03 256.802);

  /* 當前使用的顏色（會根據模式自動切換） */
  --color-vdt-surface: var(--color-vdt-light-surface);
  --color-vdt-surface-secondary: var(--color-vdt-light-surface-secondary);
  --color-vdt-surface-elevated: var(--color-vdt-light-surface-elevated);
  --color-vdt-content: var(--color-vdt-light-content);
  --color-vdt-content-secondary: var(--color-vdt-light-content-secondary);
  --color-vdt-content-muted: var(--color-vdt-light-content-muted);
  --color-vdt-outline: var(--color-vdt-light-outline);
  --color-vdt-outline-strong: var(--color-vdt-light-outline-strong);
  --color-vdt-outline-stronger: var(--color-vdt-light-outline-stronger);
  --color-vdt-interactive-hover: var(--color-vdt-light-interactive-hover);
  --color-vdt-interactive-active: var(--color-vdt-light-interactive-active);

  /* 狀態顏色 */
  --color-vdt-error: oklch(63.7% 0.237 25.331);
}
```

### 複合選擇器 精確控制

使用 CSS 選擇器組合可以針對特定的模式和主題進行精確控制：

```css
/* 深色模式 + violet 主題 */
[data-vdt-mode="dark"][data-vdt-theme="violet"] {
  --color-vdt-theme-500: oklch(60.6% 0.25 292.717);
  --color-vdt-theme-600: oklch(54.1% 0.281 293.009);
}

/* 淺色模式 + blue 主題 */
[data-vdt-mode="light"][data-vdt-theme="blue"] {
  --color-vdt-theme-500: oklch(62.3% 0.214 259.815);
  --color-vdt-theme-600: oklch(54.6% 0.245 262.881);
}
```

### 使用 Class 選擇器

Vue Datepicker 也支援使用 Class 選擇器來進行更精確的樣式控制。

```css
/* 主要元素 */
.date-picker-wrapper {
  /* 主容器 */
}
.date-picker-container {
  /* 輸入框容器 */
}
.calendar-container {
  /* 日曆彈窗 */
}

/* 日曆元素 */
.calendar-cell {
  /* 日期單元格 */
}
.calendar-cell-button {
  /* 日期按鈕 */
}
.calendar-cell-button[aria-selected="true"] {
  /* 選中日期 */
}
.calendar-cell-button[aria-current="date"] {
  /* 今天日期 */
}

/* 實用範例 */
.my-custom-picker .calendar-cell-button:hover {
  background: var(--color-vdt-theme-100);
  transform: scale(1.05);
}
```

### 使用組件來自定義主題

```vue
<template>
  <div class="brand-datepicker">
    <DatePicker v-model="date" theme="blue" />
  </div>
</template>

<style scoped>
.brand-datepicker {
  --color-vdt-theme-500: #1e40af;
  --color-vdt-theme-600: #1d4ed8;
}
</style>
```

::: tip

- 建議優先使用 `theme` prop 進行快速設定
- 所有的 class 都使用 kebab-case 命名，以 `date-picker-` 或 `calendar-` 為前綴，避免與其他 CSS 框架衝突。
- 部分樣式可能需要使用 `!important` 來強制覆蓋原有樣式，以確保網頁的美觀性。
- 如需查看所有可用的 class 名稱，請參考組件的 HTML 結構或 [開發者工具](https://developer.chrome.com/docs/devtools/) 檢視元素。
- 每個 DatePicker 組件都有獨立的主題設置，不會互相影響
  :::

<script setup lang="ts">
import { ref,computed } from "vue";
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

const date = ref(null);
</script>
