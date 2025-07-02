---
layout: home

hero:
  name: "Vue Datepicker"
  text: "Modern Date Picker"
  tagline: "A Vue 3 date picker component supporting multiple calendar systems, with complete TypeScript support and rich customization options"
  actions:
    - theme: brand
      text: Quick Start
      link: /en-us/guide/installation
    - theme: alt
      text: Try Online
      link: /en-us/guide/basic-usage
    - theme: alt
      text: GitHub
      link: https://github.com/Tiaohsun31/vue-datepicker

features:
  - icon: 🌍
    title: Multiple Calendar Systems Support
    details: Built-in support for Gregorian, Republic of China, Buddhist, Japanese, Islamic and other calendar systems to meet globalization needs

  - icon: 🎨
    title: Flexible Theme System
    details: Built-in multiple color themes with automatic dark/light mode switching and complete style customization

  - icon: 📘
    title: Native TypeScript Support
    details: Complete TypeScript type definitions providing excellent development experience and type safety

  - icon: 🌐
    title: Complete Internationalization
    details: Built-in multi-language support (Traditional Chinese, Simplified Chinese, English, Japanese, Korean) with customizable language packs

  - icon: ⚡
    title: High Performance & Accessibility
    details: Optimized rendering performance, complete keyboard navigation support, compliant with ARIA accessibility standards

  - icon: 🔧
    title: Highly Configurable
    details: Rich configuration options supporting date range selection, time selection, format customization and more

  - icon: 👀
    title: Customizable Error Messages
    details: Support for custom error messages with multiple error notification methods

  - icon: 📝
    title: Flexible Formatting
    details: Support for custom input/output formats and validation rules with multiple data output methods
---

## Quick Installation

::: code-group

```bash [pnpm]
pnpm add @tiaohsun/vue-datepicker
```

```bash [npm]
npm install @tiaohsun/vue-datepicker
```

```bash [yarn]
yarn add @tiaohsun/vue-datepicker
```

:::

## Simple Usage

```vue
<template>
  <div>
    <!-- Basic date picker -->
    <DatePicker v-model="selectedDate" />

    <!-- Date picker with time -->
    <DatePicker v-model="selectedDateTime" :showTime="true" theme="violet" />

    <!-- Republic of China calendar date picker -->
    <DatePicker v-model="rocDate" calendar="roc" locale="zh-TW" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "@tiaohsun/vue-datepicker";

const selectedDate = ref(null);
const selectedDateTime = ref(null);
const rocDate = ref(null);
</script>
```

## Key Features

### 🎯 Multiple Output Formats

Support for ISO strings, JavaScript Date objects, custom formats and other output methods.

### 🛡️ Powerful Validation Mechanism

Built-in date range validation, format validation, required validation with complete error handling.

### 🎪 Rich Customization Options

From basic date formats to complex calendar plugins, meeting various usage scenarios.

### 🚀 Modern Technology Stack

Vue 3 + TypeScript + Tailwind CSS + @internationalized/date + dayjs

## Browser Support

- **Chrome** >= 88
- **Firefox** >= 78
- **Safari** >= 14
- **Edge** >= 88

## Community & Support

<div class="flex gap-4">
  <a href="https://github.com/Tiaohsun31/vue-datepicker/issues" target="_blank">
    <span class="vpi-github"></span>
    Issue Reports
  </a>
  <a href="https://github.com/Tiaohsun31/vue-datepicker/discussions" target="_blank">
    <span class="vpi-comments"></span>
    Community Discussions
  </a>
</div>

---

<div class="hero-bottom">
  <p class="description">
    Start using Vue Datepicker to add powerful and elegant date selection functionality to your Vue 3 applications!
  </p>
</div>
