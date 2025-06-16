# @tiaohsun/vue-datepicker

一個功能豐富的 Vue 3 日期選擇器組件，支援多日曆系統並使用 Tailwind CSS 進行樣式設計。

## ✨ 特色功能

- 🎯 **Vue 3 組合式 API** - 完全使用 Vue 3 Composition API 開發
- 📅 **多日曆系統支援** - 支援西曆（Gregory）、中華民國曆等
- 🎨 **Tailwind CSS 樣式** - 可完全自訂的現代化 UI
- 🌍 **國際化支援** - 內建多語言支援
- 📱 **響應式設計** - 支援各種螢幕尺寸
- ⌨️ **鍵盤導航** - 完整的無障礙支援
- 🔧 **TypeScript** - 完整的類型定義
- 📦 **輕量化** - 樹搖優化，按需載入

## 📦 安裝

```bash
npm install @tiaohsun/vue-datepicker
# 或
pnpm add @tiaohsun/vue-datepicker
# 或
yarn add @tiaohsun/vue-datepicker
```

## 🚀 快速開始

### 基本使用

```vue
<template>
  <DatePicker v-model="selectedDate" />
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from '@tiaohsun/vue-datepicker'
import '@tiaohsun/vue-datepicker/style'

const selectedDate = ref('')
</script>
```

### 作為插件使用

```javascript
// main.js
import { createApp } from 'vue'
import VueDatePicker from '@tiaohsun/vue-datepicker'
import '@tiaohsun/vue-datepicker/style'

const app = createApp(App)
app.use(VueDatePicker)
app.mount('#app')
```

```vue
<template>
  <DatePicker v-model="selectedDate" />
  <DateRange v-model:start="startDate" v-model:end="endDate" />
</template>
```

## 🎯 組件 API

### DatePicker 屬性

| 屬性          | 類型             | 預設值         | 說明         |
| ------------- | ---------------- | -------------- | ------------ |
| `modelValue`  | `string \| null` | `null`         | 選中的日期值 |
| `dateFormat`  | `string`         | `'YYYY-MM-DD'` | 日期格式     |
| `locale`      | `string`         | `'en-US'`      | 語言設定     |
| `calendar`    | `string`         | `'gregory'`    | 日曆系統     |
| `minDate`     | `string \| null` | `null`         | 最小日期     |
| `maxDate`     | `string \| null` | `null`         | 最大日期     |
| `placeholder` | `string`         | `undefined`    | 輸入框佔位符 |
| `disabled`    | `boolean`        | `false`        | 是否禁用     |
| `readonly`    | `boolean`        | `false`        | 是否唯讀     |

### DateRange 屬性

| 屬性         | 類型             | 預設值         | 說明     |
| ------------ | ---------------- | -------------- | -------- |
| `start`      | `string \| null` | `null`         | 開始日期 |
| `end`        | `string \| null` | `null`         | 結束日期 |
| `dateFormat` | `string`         | `'YYYY-MM-DD'` | 日期格式 |
| `locale`     | `string`         | `'en-US'`      | 語言設定 |
| `calendar`   | `string`         | `'gregory'`    | 日曆系統 |

### 事件

| 事件名              | 參數                                               | 說明               |
| ------------------- | -------------------------------------------------- | ------------------ |
| `update:modelValue` | `date: string \| null`                             | 日期值變更時觸發   |
| `validation`        | `isValid: boolean, errors: Record<string, string>` | 驗證狀態變更時觸發 |

## 🌍 支援的語言

- 繁體中文 (`zh-TW`)
- 簡體中文 (`zh-CN`)
- 英文 (`en-US`)
- 日文 (`ja-JP`)
- 韓文 (`ko-KR`)

## 📚 進階使用

### 多日曆系統

```vue
<template>
  <!-- 西曆 -->
  <DatePicker v-model="gregorianDate" calendar="gregory" />

  <!-- 中華民國曆 -->
  <DatePicker v-model="rocDate" calendar="roc" />
</template>
```

### 自訂樣式

```vue
<template>
  <DatePicker
    v-model="selectedDate"
    :custom-classes="{
      input: 'border-blue-500 focus:border-blue-700',
      calendar: 'shadow-xl border-gray-200',
    }"
  />
</template>
```

### 驗證支援

```vue
<template>
  <DatePicker
    v-model="selectedDate"
    :min-date="minDate"
    :max-date="maxDate"
    @validation="onValidation"
  />
</template>

<script setup>
const onValidation = (isValid, errors) => {
  console.log('驗證結果:', isValid, errors)
}
</script>
```

## 🛠 開發

### 環境要求

- Node.js >= 18
- Vue 3.4+
- Tailwind CSS 4.1+

### 本地開發

```bash
# 克隆專案
git clone https://github.com/Tiaohsun31/vue-datepicker.git
cd vue-datepicker

# 安裝依賴
pnpm install

# 啟動開發服務器
pnpm dev

# 執行測試
pnpm test:unit

# 代碼檢查
pnpm lint

# 構建
pnpm build
```

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

1. Fork 這個專案
2. 建立您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 📄 授權

本專案使用 [MIT](./LICENSE) 授權。

## 👨‍💻 作者

**tiaohsun** - [GitHub](https://github.com/Tiaohsun31)

## 🙏 致謝

- [Vue 3](https://vuejs.org/) - 漸進式 JavaScript 框架
- [Tailwind CSS](https://tailwindcss.com/) - 工具優先的 CSS 框架
- [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/) - 國際化日期處理庫
- [Day.js](https://dayjs.gitee.io/) - 輕量級日期處理庫

---

如果這個專案對您有幫助，請給個 ⭐️ 支持一下！
