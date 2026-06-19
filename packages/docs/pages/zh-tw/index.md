---
layout: home

hero:
  name: "Vue Datepicker"
  text: "現代化日期選擇器"
  tagline: "支援多種日曆系統的 Vue 3 日期選擇元件，提供完整 TypeScript 支援與豐富自訂選項"
  actions:
    - theme: brand
      text: 快速開始
      link: /zh-tw/guide/installation
    - theme: alt
      text: 在線試用
      link: /zh-tw/guide/basic-usage
    - theme: alt
      text: GitHub
      link: https://github.com/Tiaohsun31/vue-datepicker

features:
  - icon: 🌍
    title: 多日曆系統支援
    details: 內建西曆、民國曆、佛曆、日本曆、伊斯蘭曆等多種日曆系統，滿足全球化需求

  - icon: 🎨
    title: 靈活主題系統
    details: 內建多種色彩主題，支援深色/淺色模式自動切換，可完全自訂樣式與外觀

  - icon: 📘
    title: TypeScript 原生支援
    details: 完整的 TypeScript 型別定義，提供優秀的開發體驗和型別安全保障

  - icon: 🌐
    title: 完整國際化
    details: 內建多語言支援（繁中、簡中、英文、日文、韓文），可自訂語言包

  - icon: ⚡
    title: 高效能與無障礙
    details: 優化的渲染效能，完整的鍵盤導航支援，符合 ARIA 無障礙標準

  - icon: 🔧
    title: 高度可配置
    details: 豐富的配置選項，支援日期範圍選擇、時間選擇、格式自訂等功能

  - icon: 👀
    title: 可自訂錯誤訊息
    details: 支援自訂錯誤訊息，提供多種錯誤提示方式

  - icon: 📝
    title: 進階格式化
    details: 支援自訂輸入輸出格式、驗證規則，提供多種資料輸出方式
---

## 快速安裝

::: code-group

```bash [pnpm]
pnpm add vue-datepicker
```

```bash [npm]
npm install vue-datepicker
```

```bash [yarn]
yarn add vue-datepicker
```

:::

## 簡單使用

```vue
<template>
  <div>
    <!-- 基本日期選擇器 -->
    <DatePicker v-model="selectedDate" />

    <!-- 帶時間的日期選擇器 -->
    <DatePicker v-model="selectedDateTime" :showTime="true" theme="violet" />

    <!-- 民國曆日期選擇器 -->
    <DatePicker v-model="rocDate" calendar="roc" locale="zh-TW" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "vue-datepicker";

const selectedDate = ref(null);
const selectedDateTime = ref(null);
const rocDate = ref(null);
</script>
```

## 核心特色

### 🎯 多種輸出格式

支援 ISO 字串、JavaScript Date 物件、自訂格式等多種輸出方式。

### 🛡️ 強大驗證機制

內建日期範圍驗證、格式驗證、必填驗證，提供完整錯誤處理。

### 🎪 豐富自訂選項

從基本日期格式到複雜的日曆外掛，滿足各種使用情境。

### 🚀 現代技術棧

Vue 3 + TypeScript + 自包含 CSS（免裝 Tailwind）+ @internationalized/date + dayjs

## 瀏覽器支援

- **Chrome** >= 88
- **Firefox** >= 78
- **Safari** >= 14
- **Edge** >= 88

## 社群與支援

<div class="flex gap-4">
  <a href="https://github.com/Tiaohsun31/vue-datepicker/issues" target="_blank">
    <span class="vpi-github"></span>
    問題回報
  </a>
  <a href="https://github.com/Tiaohsun31/vue-datepicker/discussions" target="_blank">
    <span class="vpi-comments"></span>
    社群討論
  </a>
</div>

---

<div class="hero-bottom">
  <p class="description">
    開始使用 Vue Datepicker，為您的 Vue 3 應用添加強大而優雅的日期選擇功能！
  </p>
</div>
