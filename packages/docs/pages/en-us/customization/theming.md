# Theme & Mode

Vue DatePicker ships a **self-contained theme** — no Tailwind CSS required. Just import the stylesheet once and customize colors and light/dark mode declaratively through props or a small set of CSS variables.

```js
import "@tiaohsun/vue-datepicker/style";
```

::: tip No Tailwind needed
Since v2.0 the styles are fully self-contained, built on a private `--vdp-*` token namespace. You no longer need `@import "tailwindcss"` or an `@source` scan. If you _do_ use Tailwind and want its `dark:` variant to drive the picker, map it to the picker's mode attribute:

```css
@custom-variant dark (&:where([data-vdp-mode="dark"], [data-vdp-mode="dark"] *, .dark, .dark *));
```

:::

## Light / Dark Mode

### Default — Follow System Preference

By default, DatePicker follows the user's system preference (`prefers-color-scheme`) and switches between light and dark automatically. This is scoped to the component (it does not hijack a global `.dark` class) and is SSR-safe.

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

### Force Dark / Force Light

Use the `mode` prop to override the system preference for a single instance.

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

The `mode` prop accepts `'light'`, `'dark'`, or `'auto'` (default). Internally it sets `data-vdp-mode` on the component root.

### Mode Attributes

You can also switch mode with attributes instead of (or in addition to) the prop:

| Attribute        | Scope                                                          |
| ---------------- | ------------------------------------------------------------- |
| `data-vdp-mode`  | Per-instance (what the `mode` prop sets)                      |
| `data-tia-mode`  | The whole `@tiaohsun/vue-*` family (datepicker + datatable…)  |
| `.dark`          | A page-global dark class is also honored                      |

```html
<!-- switch the whole family at once -->
<body data-tia-mode="dark">
  …
</body>
```

> ⚠️ The old `data-vdt-mode` attribute was **removed** in v2.0.

## Theme Colors

The `theme` prop accepts one of 22 built-in color names, or any hex / rgb / oklch value. **Whatever you pass is used exactly** — there is no "snap to nearest color".

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
  <!-- Built-in color name -->
  <DatePicker v-model="date" theme="blue" />
  <!-- Hex -->
  <DatePicker v-model="date" theme="#ffaa00" />
  <!-- RGB -->
  <DatePicker v-model="date" theme="rgb(255, 0, 0)" />
  <!-- OKLCH -->
  <DatePicker v-model="date" theme="oklch(69.6% 0.17 162.48)" />
</template>
```

All state colors (hover, active, the subtle selection background, the focus ring, borders) are **derived automatically** from your one color using CSS `color-mix()` — you only provide the base.

::: tip Invalid colors
If you pass something that is neither a built-in color name nor a valid CSS color, it is ignored by the browser and a warning is logged in development.
:::

### Built-in Color Names

`slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo` (default), `violet`, `purple`, `fuchsia`, `pink`, `rose`

## CSS Variable Model

The theme uses a three-layer token model so a single package and the whole family stay in sync:

```css
:root {
  /* ① Family primitive — shared across @tiaohsun/vue-* siblings.
        Set this to recolor datepicker + datatable + … at once. */
  --tia-theme-primary: oklch(58.5% 0.233 277.117); /* default: indigo */

  /* ② Datepicker alias — references the family primitive, with a literal
        fallback so the package also works when installed alone. */
  --color-vdp-primary: var(--tia-theme-primary, oklch(58.5% 0.233 277.117));

  /* ③ Derived state colors (color-mix) — you don't set these; they follow
        --color-vdp-primary automatically. Listed here for reference only. */
  /* --color-vdp-primary-hover  : mix(primary, black 12%)            */
  /* --color-vdp-primary-strong : mix(primary, black 26%)            */
  /* --color-vdp-primary-subtle : mix(primary, surface 88%)          */
  /* --color-vdp-primary-border : mix(primary, surface 55%)          */
  /* --color-vdp-primary-ring   : mix(primary, transparent 50%)      */
}
```

### Recolor the Whole Family

Set `--tia-theme-primary` on `:root`:

```css
:root {
  --tia-theme-primary: #0ea5e9;
}
```

::: warning Set it at `:root`
`--color-vdp-primary` is resolved at `:root`, so its `var(--tia-theme-primary)` is substituted there and child layers only inherit the result. Overriding `--tia-theme-primary` on some mid-tree element will **not** propagate. To recolor a subtree, use the `theme` prop or override `--color-vdp-primary` directly (see below).
:::

### Recolor One Instance / Subtree

The `theme` prop sets `--color-vdp-primary` inline on that instance. Equivalently, override the variable on a wrapper:

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

### Semantic Neutral Colors

Surface, content, and outline colors have light and dark variants and switch with the active mode. Override the applied variables to customize them:

```css
:root {
  --color-vdp-surface: white; /* popup / input background */
  --color-vdp-surface-secondary: oklch(98.5% 0.002 247.839);
  --color-vdp-surface-elevated: white;
  --color-vdp-content: oklch(21% 0.034 264.665); /* primary text */
  --color-vdp-content-secondary: oklch(44.6% 0.03 256.802);
  --color-vdp-content-muted: oklch(70.7% 0.022 261.325); /* placeholder */
  --color-vdp-outline: oklch(92.8% 0.006 264.531); /* borders */
  --color-vdp-interactive-hover: oklch(96.7% 0.003 264.542);
  --color-vdp-interactive-active: oklch(87.2% 0.01 258.338);

  --color-vdp-error: oklch(63.7% 0.237 25.331); /* error state */
}
```

To override only the dark palette, scope it under a dark selector:

```css
[data-vdp-mode="dark"],
[data-tia-mode="dark"],
.dark {
  --color-vdp-surface: oklch(20% 0.034 264.665);
  --color-vdp-content: oklch(96.7% 0.003 264.542);
}
```

## Public Class Hooks

These class names are part of the public API and are safe to target for overrides. Structural `.vdp-*` classes also exist for fine-grained styling, but the marker classes below are the stable hooks:

| Class                              | Element                                   |
| ---------------------------------- | ----------------------------------------- |
| `.date-picker-wrapper`             | DatePicker root                           |
| `.date-range-wrapper`              | DateRange root                            |
| `.date-picker-container`           | Input container                           |
| `.date-picker-container.error`     | Input container, error state              |
| `.date-picker-icon`                | Calendar / clear icon buttons             |
| `.date-placeholder`                | Displayed value / placeholder text        |
| `.calendar-container`              | Calendar popup                            |

```css
/* Example: customize the calendar popup and error border */
.calendar-container {
  border-radius: 1rem;
}
.date-picker-container.error {
  border-color: crimson;
}
```

::: tip

- Prefer the `theme` / `mode` props for quick setup; reach for CSS variables for global theming.
- All marker classes use kebab-case with `date-picker-` / `date-range-` / `calendar-` prefixes to avoid clashes.
- Each component instance themes independently — they do not affect each other.
- Some overrides may need higher specificity (or `!important`) to win over the shipped rules.
  :::

<script setup lang="ts">
import { ref,computed } from "vue";
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

const date = ref(null);
</script>
