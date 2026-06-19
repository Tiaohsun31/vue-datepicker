# 安裝指南

## 系統需求

- Node.js 18.0 或更高版本
- Vue.js 3.4 或更高版本
- TypeScript 5.0+ (可選)
- 支援 CSS `color-mix()` 的瀏覽器（所有現代瀏覽器）

::: tip 免裝 Tailwind
自 v2.0 起元件出貨完全自包含的 CSS，**不需要** Tailwind CSS 或任何 `@source` 設定——只要匯入樣式即可。
:::

## 安裝

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

## 使用方式

在應用程式入口（例如 `main.ts`）匯入一次樣式：

```js
import "@tiaohsun/vue-datepicker/style";
```

如此即可——樣式自包含，不需任何 Tailwind 設定。

### 方法一：全域註冊

在您的 `main.js` 或 `main.ts` 中：

```javascript
import { createApp } from "vue";
import VueDatepicker from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const app = createApp(App);
app.use(VueDatepicker);
app.mount("#app");
```

全域註冊後，您可以在任何組件中直接使用：

```vue
<template>
  <div>
    <!-- 單一日期選擇器 -->
    <DatePicker v-model="date" />

    <!-- 日期範圍選擇器 -->
    <DateRange v-model="dateRange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const date = ref(new Date());
const dateRange = ref({
  start: "2025-06-24",
  end: "2025-07-01", // 7天後
});
</script>
```

### 方法二：區域導入

#### 單一日期選擇器

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

#### 日期範圍選擇器

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
  end: "2025-07-01", // 7天後
});
</script>
```

#### 同時使用多個組件

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
  end: "2025-07-01", // 7天後
});
</script>
```

## CDN 使用

如果您不使用構建工具，可以直接通過 CDN 引入：

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

## TypeScript 支援

本套件完全支援 TypeScript，包含完整的型別定義：

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

// 使用型別
const datePickerProps: DatePickerProps = {
  modelValue: new Date(),
  theme: "blue",
  showTime: true,
};
```

## 疑難排解

### 組件未正確顯示

**問題**：組件顯示為空白或出現 "Component is missing template" 錯誤

**解決方案**：

1. 確保正確導入組件：

   ```javascript
   import { DatePicker } from "@tiaohsun/vue-datepicker";
   ```

2. 檢查是否正確導入樣式：
   ```javascript
   import "@tiaohsun/vue-datepicker/style";
   ```

### 樣式未正確載入

**問題**：組件功能正常但樣式缺失

**解決方案**：

1. 確保導入了 CSS 檔案：

   ```javascript
   import "@tiaohsun/vue-datepicker/style";
   ```

2. CSS 自包含，不需任何 Tailwind 設定。若樣式仍缺失，請確認匯入路徑可解析，且打包工具沒有把這個 side-effect CSS 匯入 tree-shake 掉。

### 非西元曆顯示為西元日期

**問題**：設定 `calendar="roc"`（或其他非西元曆）仍顯示西元日期，且開發模式有 console 警告。

**解決方案**：自 v2.0 起非西元曆改為按需註冊。在應用程式啟動時註冊一次：

```ts
import { registerCalendar, rocCalendar } from "@tiaohsun/vue-datepicker";

registerCalendar(rocCalendar);
```

完整內建描述子清單見[日曆系統](../calendars/basic.md)。

## 版本相容性

| Vue.js | Node.js | TypeScript |
| ------ | ------- | ---------- |
| 3.4+   | 18.0+   | 5.0+       |

不需要 Tailwind CSS。

如果遇到其他問題，請到 [GitHub Issues](https://github.com/Tiaohsun31/vue-datepicker/issues) 回報。
