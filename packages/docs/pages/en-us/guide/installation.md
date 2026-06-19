# Installation Guide

## System Requirements

- Node.js 18.0 or higher
- Vue.js 3.4 or higher
- TypeScript 5.0+ (optional)
- A browser supporting CSS `color-mix()` (all modern evergreen browsers)

::: tip No Tailwind required
Since v2.0 the component ships fully self-contained CSS. You do **not** need Tailwind CSS or any `@source` configuration — just import the stylesheet.
:::

## Installation

::: code-group

```bash [NPM]
npm install @tiaohsun/vue-datepicker
```

```bash [Yarn]
yarn add @tiaohsun/vue-datepicker
```

```bash [PNPM]
pnpm add @tiaohsun/vue-datepicker
```

:::

## Usage

Import the stylesheet once, anywhere in your app entry (e.g. `main.ts`):

```js
import "@tiaohsun/vue-datepicker/style";
```

That's it — the styles are self-contained, no Tailwind setup needed.

### Method 1: Global Registration

In your `main.js` or `main.ts`:

```javascript
import { createApp } from "vue";
import VueDatepicker from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const app = createApp(App);
app.use(VueDatepicker);
app.mount("#app");
```

After global registration, you can use it directly in any component:

```vue
<template>
  <div>
    <!-- Single date picker -->
    <DatePicker v-model="date" />

    <!-- Date range picker -->
    <DateRange v-model="dateRange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const date = ref(new Date());
const dateRange = ref({
  start: "2025-06-24",
  end: "2025-07-01", // 7 days later
});
</script>
```

### Method 2: Local Import

#### Single Date Picker

```vue
<template>
  <div>
    <DatePicker v-model="date" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const date = ref(new Date());
</script>
```

#### Date Range Picker

```vue
<template>
  <div>
    <DateRange v-model="dateRange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DateRange } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const dateRange = ref({
  start: "2025-06-24",
  end: "2025-07-01", // 7 days later
});
</script>
```

#### Using Multiple Components

```vue
<template>
  <div>
    <DatePicker v-model="singleDate" />
    <DateRange v-model="dateRange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker, DateRange } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const singleDate = ref(new Date());
const dateRange = ref({
  start: "2025-06-24",
  end: "2025-07-01", // 7 days later
});
</script>
```

## CDN Usage

If you're not using a build tool, you can include it directly via CDN:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Vue.js -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

    <!-- Vue Datepicker CSS -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/@tiaohsun/vue-datepicker/dist/style.css"
    />

    <!-- Vue Datepicker JS -->
    <script src="https://unpkg.com/@tiaohsun/vue-datepicker/dist/vue-datepicker.umd.js"></script>
  </head>
  <body>
    <div id="app">
      <date-picker v-model="date"></date-picker>
    </div>

    <script>
      const { createApp } = Vue;
      const { VueDatepicker } = window["vue-datepicker"];

      createApp({
        data() {
          return {
            date: new Date(),
          };
        },
      })
        .use(VueDatepicker)
        .mount("#app");
    </script>
  </body>
</html>
```

## TypeScript Support

This package fully supports TypeScript with complete type definitions:

```typescript
import { DatePicker, DateRange } from "@tiaohsun/vue-datepicker";
import type {
  DatePickerProps,
  DateRangeProps,
  TailwindColor,
  OutputType,
  LocaleMessages,
  CalendarDescriptor,
} from "@tiaohsun/vue-datepicker";

// Using types
const datePickerProps: DatePickerProps = {
  modelValue: new Date(),
  theme: "blue",
  showTime: true,
};
```

## Troubleshooting

### Component Not Displaying Correctly

**Issue**: Component appears blank or shows "Component is missing template" error

**Solution**:

1. Ensure you're importing the component correctly:

   ```javascript
   import { DatePicker } from "@tiaohsun/vue-datepicker";
   ```

2. Check if you're importing styles correctly:
   ```javascript
   import "@tiaohsun/vue-datepicker/style";
   ```

### Styles Not Loading Correctly

**Issue**: Component functions properly but styles are missing

**Solution**:

1. Make sure you've imported the CSS file:

   ```javascript
   import "@tiaohsun/vue-datepicker/style";
   ```

2. The CSS is self-contained — no Tailwind configuration is required. If styles are still missing, confirm the import path resolves and that your bundler isn't tree-shaking the side-effect CSS import.

### A Non-Gregorian Calendar Shows Gregorian Dates

**Issue**: Setting `calendar="roc"` (or another non-Gregorian calendar) still renders Gregorian dates, with a console warning in development.

**Solution**: Non-Gregorian calendars are opt-in since v2.0. Register the calendar once at app startup:

```ts
import { registerCalendar, rocCalendar } from "@tiaohsun/vue-datepicker";

registerCalendar(rocCalendar);
```

See [Calendar Systems](../calendars/basic.md) for the full list of built-in descriptors.

## Version Compatibility

| Vue.js | Node.js | TypeScript |
| ------ | ------- | ---------- |
| 3.4+   | 18.0+   | 5.0+       |

Tailwind CSS is **not** required.

If you encounter other issues, please report them at [GitHub Issues](https://github.com/Tiaohsun31/vue-datepicker/issues).
