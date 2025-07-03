# @tiaohsun/vue-datepicker

> A feature-rich Vue 3 date picker component with multiple calendar system support and Tailwind CSS styling.

[![npm version](https://img.shields.io/npm/v/@tiaohsun/vue-datepicker.svg)](https://www.npmjs.com/package/@tiaohsun/vue-datepicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

[中文](./README.zh-TW.md) | English

## ✨ Features

- 🎯 **Vue 3 Composition API** - Built entirely with Vue 3 Composition API
- 📅 **Multiple Calendar Systems** - Support for Gregorian, ROC (Taiwan), and other calendar systems
- 🎨 **Tailwind CSS Styling** - Fully customizable modern UI
- 🌍 **Internationalization** - Built-in multi-language support
- 📱 **Responsive Design** - Works perfectly on all screen sizes
- ⌨️ **Keyboard Navigation** - Complete accessibility support
- 🔧 **TypeScript** - Full type definitions included
- 📦 **Lightweight** - Tree-shakable, import only what you need
- 📝 **Formatting** - Support for multiple input/output formats
- 📚 **Complete API Documentation** - Detailed API docs, examples, and configuration options

## 📦 Installation

```bash
npm install @tiaohsun/vue-datepicker
```

```bash
pnpm add @tiaohsun/vue-datepicker
```

```bash
yarn add @tiaohsun/vue-datepicker
```

## 🚀 Basic Usage

```vue
<template>
  <DatePicker v-model="selectedDate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@tiaohsun/vue-datepicker'
import '@tiaohsun/vue-datepicker/style'

const selectedDate = ref<string>('')
</script>
```

## 📚 Documentation

For detailed API documentation, examples, and configuration options, please visit:

**[📖 View Full Documentation](https://vue-datepicker.tiaohsun.dev)**

- [Getting Started](https://vue-datepicker.tiaohsun.dev/guide/installation)
- [API Reference](https://vue-datepicker.tiaohsun.dev/api/datepicker)
- [Examples](https://vue-datepicker.tiaohsun.dev/examples)
- [Theme Customization](https://vue-datepicker.tiaohsun.dev/guide/theming)

## 🌍 Supported Languages

Traditional Chinese • Simplified Chinese • English • Japanese • Korean

## 🛠 Requirements

- Node.js >= 18
- Vue 3.4+
- TypeScript 5.x+
- Tailwind CSS 3.x+

## 📄 License

This project is licensed under the [MIT](./LICENSE) License.

## 👨‍💻 Author

**tiaohsun** - [GitHub](https://github.com/Tiaohsun31)

## 📊 Links

- [📚 Documentation](https://vue-datepicker.tiaohsun.dev)
- [🎮 Online Demo](https://vue-datepicker.tiaohsun.dev/demo)
- [🐛 Report Issues](https://github.com/Tiaohsun31/vue-datepicker/issues)
- [💬 Discussions](https://github.com/Tiaohsun31/vue-datepicker/discussions)

---

If this project helps you, please give it a ⭐️ star!
