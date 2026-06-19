# @tiaohsun/vue-datepicker

> A feature-rich Vue 3 date picker component with multiple calendar system support and a self-contained theme — **no Tailwind required**.

[![npm version](https://img.shields.io/npm/v/@tiaohsun/vue-datepicker.svg)](https://www.npmjs.com/package/@tiaohsun/vue-datepicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

[中文](./README.zh-TW.md) | English

## ✨ Features

- 🎯 **Vue 3 Composition API** - Built entirely with Vue 3 Composition API
- 📅 **Multiple Calendar Systems** - Gregorian built in; ROC (Taiwan), Buddhist, Japanese, Persian, Hebrew, Islamic and more via an opt-in registry
- 🎨 **Self-contained Theme** - Ships its own CSS, **no Tailwind required**; recolor with a single `--color-vdp-primary` variable or the `theme` prop
- 🌗 **Light / Dark Modes** - Follows `prefers-color-scheme` by default, or force per-instance with the `mode` prop
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

> Import the stylesheet once (e.g. in `main.ts`). The CSS is fully self-contained — you do **not** need Tailwind CSS or any `@source` configuration.

## 🎨 Theming

Recolor via the `theme` prop (a hex / rgb / oklch value or one of 26 built-in color names — used exactly, no snapping):

```vue
<DatePicker v-model="date" theme="#0ea5e9" mode="dark" />
```

Or set CSS variables. A single variable drives the whole palette; state colors are derived with `color-mix()`:

```css
:root {
  --color-vdp-primary: #0ea5e9; /* this picker */
  --tia-theme-primary: #0ea5e9; /* the whole @tiaohsun/vue-* family */
}
```

See the [Theme & Mode guide](https://vue-datepicker.tiaohsun.dev/en-us/customization/theming) for the full token model and dark-mode attributes.

## 📅 Calendar Systems

Only the Gregorian calendar is built in. Register any other calendar once (keeps the bundle tree-shakeable):

```ts
import { registerCalendar, rocCalendar } from '@tiaohsun/vue-datepicker'

registerCalendar(rocCalendar)
```

```vue
<DatePicker v-model="date" calendar="roc" />
```

Built-in descriptors: `rocCalendar`, `buddhistCalendar`, `japaneseCalendar`, `persianCalendar`, `hebrewCalendar`, `indianCalendar`, `copticCalendar`, `ethiopicCalendar`, `ethioaaCalendar`, `islamicCivilCalendar`, `islamicTabularCalendar`, `islamicUmalquraCalendar`.

> ⬆️ **Upgrading from 1.x?** See the [CHANGELOG migration guide](./CHANGELOG.md#migration-from-1x-to-2x) for the 2.0 breaking changes.

## 📚 Documentation

For detailed API documentation, examples, and configuration options, please visit:

**[📖 View Full Documentation](https://vue-datepicker.tiaohsun.dev)**

- [Getting Started](https://vue-datepicker.tiaohsun.dev/en-us/guide/installation)
- [Examples](https://vue-datepicker.tiaohsun.dev/en-us/guide/basic-usage)
- [Theme Customization](https://vue-datepicker.tiaohsun.dev/en-us/customization/theming)

## 🌍 Supported Languages

Traditional Chinese • Simplified Chinese • English • Japanese • Korean

## 🛠 Requirements

- Node.js >= 18
- Vue 3.4+
- TypeScript 5.x+ (optional)
- A browser that supports CSS `color-mix()` (all modern evergreen browsers)

> Tailwind CSS is **not** required.

## 📄 License

This project is licensed under the [MIT](./LICENSE) License.

## 👨‍💻 Author

**tiaohsun** - [GitHub](https://github.com/Tiaohsun31)

## 📊 Links

- [📚 Documentation](https://vue-datepicker.tiaohsun.dev)
- [🎮 Online Demo](https://vue-datepicker.tiaohsun.dev/en-us/guide/basic-usage)
- [🐛 Report Issues](https://github.com/Tiaohsun31/vue-datepicker/issues)
- [💬 Discussions](https://github.com/Tiaohsun31/vue-datepicker/discussions)

---

If this project helps you, please give it a ⭐️ star!
