# 日曆系統 (Calendar Systems)

Vue DatePicker 支援多種日曆系統，基於強大的 [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/Calendar.html) 套件實現國際化日期處理。

## 支援的日曆系統

| 日曆系統   | 識別碼                  | 適用地區/用途    |
| ---------- | ----------------------- | ---------------- |
| 西元曆     | `gregory`               | 國際通用（預設） |
| 中華民國曆 | `roc`                   | 台灣地區         |
| 佛曆       | `buddhist`              | 佛教國家         |
| 和曆       | `japanese`              | 日本             |
| 伊斯蘭曆   | `islamic-civil`         | 伊斯蘭國家       |
| 波斯曆     | `persian`               | 伊朗             |
| 希伯來曆   | `hebrew`                | 以色列           |
| 印度曆     | `indian`                | 印度             |
| 其他       | `ethiopic`, `coptic` 等 | 特定地區         |

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
              <option value="date"> Date </option>
              <option value="object"> Object </option>
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

```vue
<template>
  <DatePicker
    v-model="date"
    calendar="roc"
    locale="zh-TW"
    output-type="custom"
  />
</template>

<script setup>
import { ref } from "vue";
import { DatePicker } from "@tiaohsun/vue-datepicker";

const date = ref("");
</script>
```

使用上方的互動式範例可以直接體驗不同日曆系統和語言的顯示效果。

::: info 重要提醒

- 日期時間輸入功能僅支援 `gregory` 日曆系統
- 輸出格式預設為 `iso`，如需本地化格式請使用 `custom`
- 進階民國曆格式請參考 [ROC 格式化插件](./roc-plugin.md)
  :::

## 年份範圍限制

不同日曆系統有各自的有效年份範圍：

| 日曆系統 | 最小年份   | 最大年份    | 說明                              |
| -------- | ---------- | ----------- | --------------------------------- |
| Gregory  | 1          | 當前年+100  | 西元紀年                          |
| ROC      | 1912       | 當前年+100  | 民國元年對應西元 1912 年          |
| Buddhist | 544        | 當前年+643  | 佛曆紀年比西元早 543 年           |
| Japanese | 1868       | 當前年+100  | 明治維新開始                      |
| Islamic  | 622        | 當前年+100  | 伊斯蘭紀年                        |
| Persian  | 622        | 當前年+100  | 波斯紀年                          |
| Hebrew   | 1          | 當前年+3860 | 希伯來紀年                        |
| 其他系統 | 依系統而定 |             | 詳見 @internationalized/date 文件 |

::: warning 注意

- 超出範圍的日期可能導致不可預期的行為
- 並非所有瀏覽器都完全支援所有日曆系統
- 建議在生產環境中測試目標瀏覽器的相容性
- 在不支援的環境中會自動回退到西元曆
  :::

## API 參考

### Calendar 相關屬性

| 屬性          | 類型                                      | 預設值      | 說明           |
| ------------- | ----------------------------------------- | ----------- | -------------- |
| `calendar`    | `string`                                  | `'gregory'` | 日曆系統識別碼 |
| `locale`      | `string`                                  | `'zh-TW'`   | 語言本地化設定 |
| `output-type` | `'iso' \| 'date' \| 'object' \| 'custom'` | `'iso'`     | 輸出格式類型   |

<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker, type OutputType } from '@tiaohsun/vue-datepicker';
import '@tiaohsun/vue-datepicker/style';

const date = ref('')
const selectedCalendar = ref('gregory')
const selectedLocale = ref('zh-TW')
const selectedOutputType = ref<OutputType>('custom')
</script>
