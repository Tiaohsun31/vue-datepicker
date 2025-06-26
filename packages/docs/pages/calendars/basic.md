# 日曆系統 (Calendar Systems)

Vue DatePicker 支援多種日曆系統，基於強大的 [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/Calendar.html) 套件實現國際化日期處理。

## 支援的日曆系統

目前支援以下日曆系統：

| 日曆系統   | 識別碼     | 說明                       |
| ---------- | ---------- | -------------------------- |
| 西元曆     | `gregory`  | 國際通用的公曆系統（預設） |
| 中華民國曆 | `roc`      | 民國紀年系統               |
| 佛曆       | `buddhist` | 佛教紀年系統               |
| 和曆       | `japanese` | 日本年號系統               |
| 伊斯蘭曆   | `islamic`  | 伊斯蘭紀年系統             |
| 波斯曆     | `persian`  | 波斯紀年系統               |
| 希伯來曆   | `hebrew`   | 希伯來紀年系統             |

## 基本使用

::: raw

<div class="space-y-4">
    <div class="flex justify-end gap-2">
        <div class="flex-1">
            <select v-model="selectedLocale" name="locale" id="locale"
                class="w-full rounded bg-white py-1 px-2 text-base border border-gray-200 dark:bg-slate-900 dark:border-gray-700">
                <option value="zh-TW"> 繁體中文 </option>
                <option value="en-US"> English </option>
                <option value="ja-JP"> 日本語 </option>
                <option value="zh-CN"> 简体中文 </option>
                <option value="ko-KR"> 한국어 </option>
            </select>
        </div>
        <div class="flex-1">
            <select v-model="selectedCalendar" name="calendar" id="calendar"
                class="w-full rounded bg-white py-1 px-2 text-base border border-gray-200 dark:bg-slate-900 dark:border-gray-700">
                <option value="gregory"> Gregorian </option>
                <option value="roc"> Taiwan </option>
                <option value="buddhist"> Buddhist </option>
                <option value="ethiopic"> Ethiopic </option>
                <option value="ethioaa"> Ethiopic(Amete Alem) </option>
                <option value="coptic"> Coptic </option>
                <option value="hebrew"> Hebrew </option>
                <option value="indian"> Indian </option>
                <option value="islamic-civil"> Islamic Civil </option>
                <option value="islamic-tbla"> Islamic Tbla </option>
                <option value="islamic-umalqura"> Islamic Umalqura </option>
                <option value="japanese"> Japanese</option>
                <option value="persian"> Persian </option>
            </select>
        </div>
        <div class="flex-1">
          <select v-model="selectedOutputType" name="outputType" id="outputType"
              class="w-full rounded bg-white py-1 px-2 text-base border border-gray-200 dark:bg-slate-900 dark:border-gray-700">
              <option value="iso"> ISO 8601 </option>
              <option value="custom"> Custom </option>
          </select>
        </div>
    </div>
    <div class="space-y-2">
        <DatePicker v-model="date" :calendar="selectedCalendar" :locale="selectedLocale" :output-type="selectedOutputType"  />
        <div class="py-1 px-2 bg-gray-100 rounded dark:bg-gray-800">
            v-model: {{ date }}
        </div>
    </div>
</div>
:::
::: info

- 日期及時間輸入僅支援`gregory`日曆系統
- outputType 預設為 `iso`，在地化訊息請使用`custom`
  :::

## 配置選項

### 基本配置

```vue
<template>
  <DatePicker
    v-model="date"
    :calendar="selectedCalendar"
    :locale="selectedLocale"
    :output-type="outputType"
  />
</template>

<script setup>
import { ref } from "vue";

const date = ref("");
const selectedCalendar = ref("gregory");
const selectedLocale = ref("zh-TW");
const outputType = ref("iso");
</script>
```

### 輸出格式控制

不同的 `outputType` 會影響 `v-model` 的輸出格式：

```vue
<template>
  <!-- ISO 字串輸出 (預設) -->
  <DatePicker v-model="isoDate" calendar="roc" output-type="iso" />

  <!-- 自訂格式輸出 -->
  <DatePicker
    v-model="customDate"
    calendar="roc"
    output-type="custom"
    date-format="ROC-YYYY年MM月DD日"
  />

  <!-- Date 物件輸出 -->
  <DatePicker v-model="dateObject" calendar="roc" output-type="date" />

  <!-- 原始物件輸出 -->
  <DatePicker v-model="objectDate" calendar="roc" output-type="object" />
</template>
```

## 語言本地化

不同日曆系統的顯示會根據 `locale` 自動調整：

::: raw

<div class="demo-container space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <h4 class="text-sm font-medium mb-2">中文環境</h4>
      <DatePicker v-model="localeDate1" calendar="roc" locale="zh-TW" />
    </div>
    <div>
      <h4 class="text-sm font-medium mb-2">英文環境</h4>
      <DatePicker v-model="localeDate2" calendar="roc" locale="en-US" />
    </div>
  </div>
</div>
:::

```vue
<template>
  <!-- 繁體中文顯示 -->
  <DatePicker v-model="date1" calendar="roc" locale="zh-TW" />

  <!-- 英文顯示 -->
  <DatePicker v-model="date2" calendar="roc" locale="en-US" />

  <!-- 日文顯示 -->
  <DatePicker v-model="date3" calendar="japanese" locale="ja-JP" />
</template>
```

## 日曆系統比較

::: raw

<div class="demo-container space-y-4">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">西元曆 (Gregory)</h4>
      <DatePicker v-model="compareDate1" calendar="gregory" locale="zh-TW" />
      <div class="text-xs text-gray-600 dark:text-gray-400">{{ compareDate1 || '請選擇日期' }}</div>
    </div>
    <div class="space-y-2">
      <h4 class="text-sm font-medium">民國曆 (ROC)</h4>
      <DatePicker v-model="compareDate2" calendar="roc" locale="zh-TW" />
      <div class="text-xs text-gray-600 dark:text-gray-400">{{ compareDate2 || '請選擇日期' }}</div>
    </div>
    <div class="space-y-2">
      <h4 class="text-sm font-medium">佛曆 (Buddhist)</h4>
      <DatePicker v-model="compareDate3" calendar="buddhist" locale="zh-TW" />
      <div class="text-xs text-gray-600 dark:text-gray-400">{{ compareDate3 || '請選擇日期' }}</div>
    </div>
  </div>
</div>
:::

## 年份範圍限制

不同日曆系統有各自的有效年份範圍：

| 日曆系統 | 最小年份 | 最大年份    | 說明                     |
| -------- | -------- | ----------- | ------------------------ |
| Gregory  | 1        | 當前年+100  | 西元紀年                 |
| ROC      | 1912     | 当前年+100  | 民國元年對應西元 1912 年 |
| Buddhist | 544      | 當前年+643  | 佛曆紀年比西元早 543 年  |
| Japanese | 1868     | 當前年+100  | 明治維新開始             |
| Islamic  | 622      | 當前年+100  | 伊斯蘭紀年               |
| Persian  | 622      | 當前年+100  | 波斯紀年                 |
| Hebrew   | 1        | 當前年+3860 | 希伯來紀年               |

## 注意事項

::: warning 相容性

- 並非所有瀏覽器都完全支援所有日曆系統
- 在不支援的環境中會自動回退到西元曆
- 建議在生產環境中測試目標瀏覽器的相容性
  :::

::: tip 效能考量

- 日曆轉換需要額外的計算資源
- 建議根據實際需求選擇適當的日曆系統
- 可以使用 `output-type="object"` 獲得最佳效能
  :::

## API 參考

### Calendar 相關屬性

| 屬性          | 類型                                      | 預設值      | 說明           |
| ------------- | ----------------------------------------- | ----------- | -------------- |
| `calendar`    | `string`                                  | `'gregory'` | 日曆系統識別碼 |
| `locale`      | `string`                                  | `'zh-TW'`   | 語言本地化設定 |
| `output-type` | `'iso' \| 'date' \| 'object' \| 'custom'` | `'iso'`     | 輸出格式類型   |

### 日曆工具函數

```typescript
import { CalendarUtils } from "@tiaohsun/vue-datepicker";

// 檢查日曆系統是否支援
CalendarUtils.isCalendarSupported("roc"); // true

// 獲取日曆系統顯示名稱
CalendarUtils.getCalendarDisplayName("roc", "zh-TW"); // '民國'

// 獲取年份範圍
CalendarUtils.getCalendarRange("roc"); // { min: 1912, max: 2124 }

// 年份轉換
CalendarUtils.convertGregorianYear(2024, "roc"); // { localYear: 113, isValid: true }
```

<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker, type OutputType } from '@tiaohsun/vue-datepicker';
import '@tiaohsun/vue-datepicker/style';

const date = ref('')
const selectedCalendar = ref('gregory')
const selectedLocale = ref('zh-TW')
const selectedOutputType = ref<OutputType>('iso')

// 基本示例
const gregorianDate = ref('')
const rocDate = ref('')
const buddhistDate = ref('')
const japaneseDate = ref('')

// 本地化示例
const localeDate1 = ref('')
const localeDate2 = ref('')

// 比較示例
const compareDate1 = ref('')
const compareDate2 = ref('')
const compareDate3 = ref('')
</script>
