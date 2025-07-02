# Theme & Mode

Vue DatePicker provides a flexible theming system that supports multiple customization methods to meet different design requirements. You can customize color themes and light/dark modes in various ways.

::: warning Tailwind CSS 4 Configuration
If you are using Tailwind CSS 4, you need to add the following configuration to your CSS file to support the `mode` functionality:

```css
@import "tailwindcss";
/* Support Vue DatePicker's dark mode */
@custom-variant dark (&:where([data-vdt-mode="dark"], [data-vdt-mode="dark"] *, .dark, .dark *));
```

:::

## Default - Follow System Preference

By default, DatePicker automatically follows the user's system preference (`prefers-color-scheme`), switching automatically between light and dark themes.

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

## Dark Mode - Force Dark

You can force dark mode regardless of the user's system settings.

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

## Light Mode - Force Light

Similarly, you can also force light mode.

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

## Theme Colors

Supports Tailwind color names, hexadecimal, RGB, or OKLCH formats:

::: raw

<div class="demo-container space-y-2">
  <DatePicker v-model="date" :locale="locale" theme="blue" />
  <DatePicker v-model="date" :locale="locale" theme="#ffff00" />
  <DatePicker v-model="date" :locale="locale" theme="rgb(255, 0, 0)" />
  <DatePicker v-model="date" :locale="locale" theme="oklch(69.6% 0.17 162.48)" />
</div>
:::

```vue
<template>
  <!-- Using Tailwind color names -->
  <DatePicker v-model="date" theme="blue" />

  <!-- Using hexadecimal colors -->
  <DatePicker v-model="date" theme="#ffff00" />

  <!-- Using RGB colors -->
  <DatePicker v-model="date" theme="rgb(255, 0, 0)" />

  <!-- Using OKLCH colors -->
  <DatePicker v-model="date" theme="oklch(69.6% 0.17 162.48)" />
</template>
```

::: warning Color Conversion Note
The input color values will automatically find the closest Tailwind color name, so there may be slight color differences. For exact colors, use `:root` variables instead.
:::

### Supported Tailwind Colors

`slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

Refer to [Tailwind CSS](https://tailwindcss.com/docs/customizing-colors#default-color-palette).

## CSS Customization

### Using CSS Variables

You can globally set theme colors through CSS Variables. From 50 to 950, there are 11 color scales (with 500 being the primary variable):

```css
:root {
  --color-vdt-theme-50: #f0f9ff;
  --color-vdt-theme-100: #e0f2fe;
  --color-vdt-theme-200: #bae6fd;
  --color-vdt-theme-300: #7dd3fc;
  --color-vdt-theme-400: #38bdf8;
  --color-vdt-theme-500: #0ea5e9; /* Primary variable */
  --color-vdt-theme-600: #0284c7;
  --color-vdt-theme-700: #0369a1;
  --color-vdt-theme-800: #075985;
  --color-vdt-theme-900: #0c4a6e;
  --color-vdt-theme-950: #082f49;
}
```

### Custom Semantic Colors

You can also customize semantic color variables:

```css
:root {
  /* Light mode */
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

  /* Dark mode */
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

  /* Currently used colors (automatically switch based on mode) */
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

  /* Status colors */
  --color-vdt-error: oklch(63.7% 0.237 25.331);
}
```

### Compound Selectors - Precise Control

Using CSS selector combinations allows for precise control over specific modes and themes:

```css
/* Dark mode + violet theme */
[data-vdt-mode="dark"][data-vdt-theme="violet"] {
  --color-vdt-theme-500: oklch(60.6% 0.25 292.717);
  --color-vdt-theme-600: oklch(54.1% 0.281 293.009);
}

/* Light mode + blue theme */
[data-vdt-mode="light"][data-vdt-theme="blue"] {
  --color-vdt-theme-500: oklch(62.3% 0.214 259.815);
  --color-vdt-theme-600: oklch(54.6% 0.245 262.881);
}
```

### Using Class Selectors

Vue Datepicker also supports using class selectors for more precise style control.

```css
/* Main elements */
.date-picker-wrapper {
  /* Main container */
}
.date-picker-container {
  /* Input container */
}
.calendar-container {
  /* Calendar popup */
}

/* Calendar elements */
.calendar-cell {
  /* Date cell */
}
.calendar-cell-button {
  /* Date button */
}
.calendar-cell-button[aria-selected="true"] {
  /* Selected date */
}
.calendar-cell-button[aria-current="date"] {
  /* Today's date */
}

/* Practical example */
.my-custom-picker .calendar-cell-button:hover {
  background: var(--color-vdt-theme-100);
  transform: scale(1.05);
}
```

### Using Components to Customize Themes

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

- It's recommended to use the `theme` prop for quick setup
- All classes use kebab-case naming with `date-picker-` or `calendar-` prefixes to avoid conflicts with other CSS frameworks
- Some styles may need `!important` to forcefully override existing styles for visual consistency
- To view all available class names, refer to the component's HTML structure or use [Developer Tools](https://developer.chrome.com/docs/devtools/) to inspect elements
- Each DatePicker component has independent theme settings and won't affect each other
  :::

<script setup lang="ts">
import { ref,computed } from "vue";
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

const date = ref(null);
</script>
