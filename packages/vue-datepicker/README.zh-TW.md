# @tiaohsun/vue-datepicker

> 一個功能豐富的 Vue 3 日期選擇器組件，支援多日曆系統，並採用自包含主題——**免裝 Tailwind**。

[![npm version](https://img.shields.io/npm/v/@tiaohsun/vue-datepicker.svg)](https://www.npmjs.com/package/@tiaohsun/vue-datepicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

中文 | [English](./README.md)

## ✨ 特色功能

- 🎯 **Vue 3 組合式 API** - 完全使用 Vue 3 Composition API 開發
- 📅 **多日曆系統支援** - 內建西曆（Gregory）；民國（roc）、佛曆、和曆、波斯、希伯來、伊斯蘭等透過按需註冊 registry 支援
- 🎨 **自包含主題** - 自帶 CSS、**免裝 Tailwind**；以單一 `--color-vdp-primary` 變數或 `theme` prop 換色
- 🌗 **深淺模式** - 預設跟隨 `prefers-color-scheme`，或以 `mode` prop 對單一實例強制切換
- 🌍 **國際化支援** - 內建多語言支援
- 📱 **響應式設計** - 支援各種螢幕尺寸
- ⌨️ **鍵盤導航** - 完整的無障礙支援
- 🔧 **TypeScript** - 完整的類型定義
- 📦 **輕量化** - 樹搖優化，按需載入
- 📝 **格式化** - 支援多種資料輸入、輸出
- 📚 **完整 API 文檔** - 詳細的 API 文檔、使用範例和配置選項

## 📦 快速安裝

```bash
npm install @tiaohsun/vue-datepicker
```

```bash
pnpm add @tiaohsun/vue-datepicker
```

```bash
yarn add @tiaohsun/vue-datepicker
```

## 🚀 基本使用

```vue
<template>
  <DatePicker v-model="selectedDate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@tiaohsun/vue-datepicker'
import '@tiaohsun/vue-datepicker/style'

const selectedDate = ref('')
</script>
```

> 樣式只需匯入一次（例如在 `main.ts`）。CSS 完全自包含——**不需要** Tailwind CSS，也不需要 `@source` 設定。

## 🎨 主題

以 `theme` prop 換色（hex / rgb / oklch 或 26 個內建色名，傳什麼用什麼、不吸附）：

```vue
<DatePicker v-model="date" theme="#0ea5e9" mode="dark" />
```

或設定 CSS 變數。單一變數驅動整組調色盤，狀態色以 `color-mix()` 衍生：

```css
:root {
  --color-vdp-primary: #0ea5e9; /* 此元件 */
  --tia-theme-primary: #0ea5e9; /* 整個 @tiaohsun/vue-* 家族 */
}
```

完整 token 模型與深淺模式屬性見[主題與模式說明](https://vue-datepicker.tiaohsun.dev/zh-tw/customization/theming)。

## 📅 日曆系統

僅西元曆內建。其餘曆法需先註冊一次（讓 bundle 可 tree-shake）：

```ts
import { registerCalendar, rocCalendar } from '@tiaohsun/vue-datepicker'

registerCalendar(rocCalendar)
```

```vue
<DatePicker v-model="date" calendar="roc" />
```

內建描述子：`rocCalendar`、`buddhistCalendar`、`japaneseCalendar`、`persianCalendar`、`hebrewCalendar`、`indianCalendar`、`copticCalendar`、`ethiopicCalendar`、`ethioaaCalendar`、`islamicCivilCalendar`、`islamicTabularCalendar`、`islamicUmalquraCalendar`。

> ⬆️ **從 1.x 升級？** 2.0 破壞性變更請見 [CHANGELOG 遷移指南](./CHANGELOG.md#migration-from-1x-to-2x)。

## 📚 完整文檔

詳細的 API 文檔、使用範例和配置選項請參考：

**[📖 查看完整文檔](https://vue-datepicker.tiaohsun.dev)**

- [快速開始](https://vue-datepicker.tiaohsun.dev/zh-tw/guide/installation)
- [使用範例](https://vue-datepicker.tiaohsun.dev/zh-tw/guide/basic-usage)
- [主題自訂](https://vue-datepicker.tiaohsun.dev/zh-tw/customization/theming)

## 🌍 支援的語言

繁體中文 • 簡體中文 • English • 日本語 • 한국어

## 🛠 開發環境

- Node.js >= 18
- Vue 3.4+
- TypeScript 5.x+（選用）
- 支援 CSS `color-mix()` 的瀏覽器（所有現代瀏覽器）

> **不需要** Tailwind CSS。

## 📄 授權

本專案使用 [MIT](./LICENSE) 授權。

## 👨‍💻 作者

**tiaohsun** - [GitHub](https://github.com/Tiaohsun31)

## 📊 相關連結

- [📚 完整文檔](https://vue-datepicker.tiaohsun.dev)
- [🎮 在線演示](https://vue-datepicker.tiaohsun.dev/zh-tw/guide/basic-usage)
- [🐛 問題回報](https://github.com/Tiaohsun31/vue-datepicker/issues)
- [💬 討論區](https://github.com/Tiaohsun31/vue-datepicker/discussions)

---

如果這個專案對您有幫助，請給個 ⭐️ 支持一下！
