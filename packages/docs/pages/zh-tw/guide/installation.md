# 安裝指南

## 系統需求

- Node.js 16.0 或更高版本
- Vue.js 3.0 或更高版本
- Tailwind CSS 4.0 或更高版本
- TypeScript 4.5+ (可選)

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

### Tailwind CSS 整合

Tailwind CSS，需要配置以載入組件樣式：

```css
/* 在您的主要 CSS 檔案中 */
@import "tailwindcss";

/* 掃描 vue-datepicker 組件以產生必要的樣式 */
@source "../../node_modules/@tiaohsun/vue-datepicker/dist/**/*.{js,vue}";
```

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
  RocFormatPlugin,
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

2. Tailwind CSS，確保配置正確：
   ```css
   @import "tailwindcss";
   @source "../../node_modules/@tiaohsun/vue-datepicker/dist/**/*.{js,vue}";
   ```

## 版本相容性

| Vue.js | Node.js | TypeScript | Tailwind |
| ------ | ------- | ---------- | -------- |
| 3.0+   | 16.0+   | 4.5+       | 4.0+     |

如果遇到其他問題，請到 [GitHub Issues](https://github.com/Tiaohsun31/vue-datepicker/issues) 回報。
