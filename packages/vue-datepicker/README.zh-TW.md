# @tiaohsun/vue-datepicker

> 一個功能豐富的 Vue 3 日期選擇器組件，支援多日曆系統並使用 Tailwind CSS 進行樣式設計。

[![npm version](https://img.shields.io/npm/v/@tiaohsun/vue-datepicker.svg)](https://www.npmjs.com/package/@tiaohsun/vue-datepicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

中文 | [English](./README.md)

## ✨ 特色功能

- 🎯 **Vue 3 組合式 API** - 完全使用 Vue 3 Composition API 開發
- 📅 **多日曆系統支援** - 支援西曆（Gregory）、中華民國曆等
- 🎨 **Tailwind CSS 樣式** - 可完全自訂的現代化 UI
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

## 📚 完整文檔

詳細的 API 文檔、使用範例和配置選項請參考：

**[📖 查看完整文檔](https://vue-datepicker.pages.dev)**

- [快速開始](https://vue-datepicker.pages.dev/zh-tw/guide/installation)
- [使用範例](https://vue-datepicker.pages.dev/zh-tw/guide/basic-usage)
- [主題自訂](https://vue-datepicker.pages.dev/zh-tw/customization/theming)

## 🌍 支援的語言

繁體中文 • 簡體中文 • English • 日本語 • 한국어

## 🛠 開發環境

- Node.js >= 18
- Vue 3.4+
- TypeScript 5.x+
- Tailwind CSS 4.x+

## 📄 授權

本專案使用 [MIT](./LICENSE) 授權。

## 👨‍💻 作者

**tiaohsun** - [GitHub](https://github.com/Tiaohsun31)

## 📊 相關連結

- [📚 完整文檔](https://vue-datepicker.pages.dev)
- [🎮 在線演示](https://vue-datepicker.pages.dev/zh-tw/guide/basic-usage)
- [🐛 問題回報](https://github.com/Tiaohsun31/vue-datepicker/issues)
- [💬 討論區](https://github.com/Tiaohsun31/vue-datepicker/discussions)

---

如果這個專案對您有幫助，請給個 ⭐️ 支持一下！
