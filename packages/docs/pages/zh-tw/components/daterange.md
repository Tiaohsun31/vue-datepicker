# DateRange

DateRange 是一個功能豐富的日期範圍選擇器組件，支援雙日曆顯示、快捷選項、範圍限制和完整的國際化功能。

## 主要功能

### 日期範圍選擇與輸入

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">基本日期範圍選擇</h4>
        <DateRange v-model="basicRange" :locale="locale" />
        <p class="text-sm text-gray-600 dark:text-gray-400">點擊選擇開始和結束日期，支援雙日曆顯示</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">包含時間範圍</h4>
        <DateRange v-model="timeRange" :locale="locale" :showTime="true" />
        <p class="text-sm text-gray-600 dark:text-gray-400">選擇日期後可設定開始和結束時間</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">必填驗證</h4>
        <DateRange v-model="requiredRange" :locale="locale" required />
        <p class="text-sm text-gray-600 dark:text-gray-400">即時驗證並顯示錯誤訊息</p>
    </div>
</div>
:::

```vue
<template>
  <!-- 基本範圍選擇 -->
  <DateRange v-model="basicRange" />

  <!-- 包含時間範圍 -->
  <DateRange v-model="timeRange" :showTime="true" />

  <!-- 必填驗證 -->
  <DateRange v-model="requiredRange" required />
</template>
```

### 輸入框直接輸入

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">輸入框輸入</h4>
        <DateRange v-model="inputRange" :locale="locale" :inputEnabled="true" />
        <p class="text-sm text-gray-600 dark:text-gray-400">可在日曆中直接使用輸入框輸入日期範圍</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">僅日曆選擇</h4>
        <DateRange v-model="calendarOnlyRange" :locale="locale" :inputEnabled="false" />
        <p class="text-sm text-gray-600 dark:text-gray-400">隱藏輸入框，僅使用日曆進行選擇</p>
    </div>
</div>
:::

```vue
<template>
  <!-- 啟用輸入框 -->
  <DateRange v-model="inputRange" :inputEnabled="true" />

  <!-- 僅日曆選擇 -->
  <DateRange v-model="calendarOnlyRange" :inputEnabled="false" />
</template>
```

::: warning
輸入功能僅限於 monthDisplayMode 為 dual 的情況下
:::

### 日曆顯示模式

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">雙月顯示模式</h4>
        <DateRange v-model="dualModeRange" :locale="locale" monthDisplayMode="dual" />
        <p class="text-sm text-gray-600 dark:text-gray-400">同時顯示兩個連續月份的日曆，方便選擇跨月範圍</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">單月顯示模式</h4>
        <DateRange v-model="singleModeRange" :locale="locale" monthDisplayMode="single" />
        <p class="text-sm text-gray-600 dark:text-gray-400">僅顯示單個月份日曆，節省顯示空間</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">自動模式（預設）</h4>
        <DateRange v-model="autoModeRange" :locale="locale" />
        <p class="text-sm text-gray-600 dark:text-gray-400">根據螢幕寬度自動切換：桌面版顯示雙月，行動版顯示單月</p>
    </div>
</div>
:::

```vue
<template>
  <!-- 強制雙月顯示 -->
  <DateRange v-model="dualModeRange" monthDisplayMode="dual" />

  <!-- 強制單月顯示 -->
  <DateRange v-model="singleModeRange" monthDisplayMode="single" />

  <!-- 自動適應（預設行為） -->
  <DateRange v-model="autoModeRange" />
</template>
```

### 快捷選項

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">內建快捷選項</h4>
        <DateRange v-model="shortcutRange" :locale="locale" :showShortcuts="true" />
        <p class="text-sm text-gray-600 dark:text-gray-400">提供今天、最近7天、最近30天、本月等快捷選項</p>
    </div>
</div>
:::

```vue
<template>
  <!-- 顯示快捷選項 -->
  <DateRange v-model="shortcutRange" :showShortcuts="true" />
</template>
```

### 範圍限制

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">最大範圍限制</h4>
        <DateRange v-model="maxRangeLimit" :locale="locale" :maxRange="7" />
        <p class="text-sm text-gray-600 dark:text-gray-400">最多只能選擇 7 天的範圍</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">最小範圍限制</h4>
        <DateRange v-model="minRangeLimit" :locale="locale" :minRange="3" />
        <p class="text-sm text-gray-600 dark:text-gray-400">至少要選擇 3 天的範圍</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">日期範圍限制</h4>
        <DateRange v-model="dateConstrainedRange" :locale="locale" :minDate="minDate" :maxDate="maxDate" />
        <p class="text-sm text-gray-600 dark:text-gray-400">限制可選日期範圍: {{ minDate }} ~ {{ maxDate }}</p>
    </div>
</div>
:::

```vue
<template>
  <!-- 最大範圍限制 -->
  <DateRange v-model="maxRangeLimit" :maxRange="7" />

  <!-- 最小範圍限制 -->
  <DateRange v-model="minRangeLimit" :minRange="3" />

  <!-- 日期範圍限制 -->
  <DateRange
    v-model="dateConstrainedRange"
    :minDate="minDate"
    :maxDate="maxDate"
  />
</template>
```

## Props 參數

### 基本屬性

| 屬性              | 類型                                                   | 預設值  | 說明                   |
| ----------------- | ------------------------------------------------------ | ------- | ---------------------- |
| `modelValue`      | `{ start: DateTimeInput; end: DateTimeInput } \| null` | `null`  | 綁定的日期範圍值       |
| `disabled`        | `boolean`                                              | `false` | 是否禁用               |
| `required`        | `boolean`                                              | `false` | 是否必填               |
| `showClearButton` | `boolean`                                              | `true`  | 是否顯示清除按鈕       |
| `separator`       | `string`                                               | `' ~ '` | 開始和結束日期間分隔符 |

### 日曆系統

| 屬性           | 類型     | 預設值      | 說明                        |
| -------------- | -------- | ----------- | --------------------------- |
| `calendar`     | `string` | `'gregory'` | 日曆系統 ('gregory', 'roc') |
| `locale`       | `string` | `'zh-TW'`   | 語言環境                    |
| `weekStartsOn` | `0-6`    | `0`         | 一週起始日 (0=週日)         |

### 日期格式

| 屬性            | 類型         | 預設值         | 說明          |
| --------------- | ------------ | -------------- | ------------- |
| `dateFormat`    | `string`     | `'YYYY-MM-DD'` | 日期格式      |
| `dateSeparator` | `string`     | `'-'`          | 日期分隔符    |
| `outputType`    | `OutputType` | `'iso'`        | 輸出格式類型  |
| `useStrictISO`  | `boolean`    | `false`        | 嚴格 ISO 格式 |

### 時間選項

| 屬性            | 類型      | 預設值      | 說明                                           |
| --------------- | --------- | ----------- | ---------------------------------------------- |
| `showTime`      | `boolean` | `false`     | 是否顯示時間選擇                               |
| `timeFormat`    | `string`  | `undefined` | 時間格式(依照 enableSeconds 及 use24Hour 預設) |
| `enableSeconds` | `boolean` | `true`      | 是否啟用秒                                     |
| `use24Hour`     | `boolean` | `true`      | 是否使用 24 小時制                             |

### 範圍特定選項

| 屬性               | 類型                 | 預設值      | 說明                                       |
| ------------------ | -------------------- | ----------- | ------------------------------------------ |
| `monthDisplayMode` | `'single' \| 'dual'` | `undefined` | 日曆顯示模式，未設定時依照視窗大小自動切換 |
| `showShortcuts`    | `boolean`            | `false`     | 是否顯示快捷選項                           |
| `incomplete`       | `boolean`            | `true`      | 是否提示不完整的範圍選擇                   |
| `maxRange`         | `number`             | `undefined` | 允許選擇的最大天數                         |
| `minRange`         | `number`             | `undefined` | 允許選擇的最小天數                         |
| `minDate`          | `string`             | `undefined` | 最小可選日期                               |
| `maxDate`          | `string`             | `undefined` | 最大可選日期                               |

### 主題外觀

| 屬性    | 類型                          | 預設值     | 說明     |
| ------- | ----------------------------- | ---------- | -------- |
| `mode`  | `'light' \| 'dark' \| 'auto'` | `'auto'`   | 主題模式 |
| `theme` | `TailwindColor \| string`     | `'violet'` | 主題顏色 |

### 國際化與錯誤處理

| 屬性                   | 類型                     | 預設值      | 說明               |
| ---------------------- | ------------------------ | ----------- | ------------------ |
| `customLocaleMessages` | `LocaleMessages`         | `undefined` | 自定義語言包       |
| `customErrorMessages`  | `Record<string, string>` | `{}`        | 自定義錯誤訊息     |
| `useI18n`              | `boolean`                | `true`      | 是否使用內建國際化 |
| `showErrorMessage`     | `boolean`                | `true`      | 是否顯示錯誤訊息   |

### 輸入控制

| 屬性                     | 類型                   | 預設值  | 說明                     |
| ------------------------ | ---------------------- | ------- | ------------------------ |
| `inputEnabled`           | `boolean`              | `false` | 是否允許輸入框輸入       |
| `placeholderOverrides`   | `PlaceholderOverrides` | `{}`    | 自定義佔位符             |
| `autoFocusTimeAfterDate` | `boolean`              | `true`  | 是否自動聚焦到時間輸入框 |

PlaceholderOverrides 介面：

```typescript
interface PlaceholderOverrides {
  start?: string; // 開始日期的提示文字
  end?: string; // 結束日期的提示文字
  year?: string; // 年份輸入框佔位符
  month?: string; // 月份輸入框佔位符
  day?: string; // 日期輸入框佔位符
  hour?: string; // 小時輸入框佔位符
  minute?: string; // 分鐘輸入框佔位符
  second?: string; // 秒數輸入框佔位符
}
```

## Events 事件

| 事件名稱            | 參數                                                                                                    | 說明                   |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------- |
| `update:modelValue` | `(range: { start: DateTimeInput; end: DateTimeInput } \| null)`                                         | 範圍值變化時觸發       |
| `change`            | `(range: { start: DateTimeInput; end: DateTimeInput } \| null)`                                         | 使用者操作改變值時觸發 |
| `validation`        | `(isValid: boolean, errors: Record<string, string>, errorParams?: Record<string, Record<string, any>>)` | 驗證狀態變化時觸發     |

## 高級功能

### 多種日曆系統

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">西元曆 (Gregorian)</h4>
        <DateRange v-model="gregorianRange" :locale="locale" calendar="gregory" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">民國曆 (ROC)</h4>
        <DateRange v-model="rocRange"  calendar="roc" :locale="locale" outputType="custom"  />
    </div>
</div>
:::

```vue
<template>
  <!-- 西元曆 -->
  <DateRange v-model="gregorianRange" calendar="gregory" />

  <!-- 民國曆 -->
  <DateRange v-model="rocRange" calendar="roc" outputType="custom" />
</template>
```

::: tip
更多日曆系統請參考 [calendar](../calendars/basic.md)
:::

### 主題模式

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">淺色模式</h4>
        <DateRange v-model="lightRange" :locale="locale" mode="light" theme="blue" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">深色模式</h4>
        <DateRange v-model="darkRange" :locale="locale" mode="dark" theme="emerald" />
    </div>
</div>
:::

```vue
<template>
  <!-- 不同主題模式 -->
  <DateRange v-model="lightRange" mode="light" theme="blue" />
  <DateRange v-model="darkRange" mode="dark" theme="emerald" />
</template>
```

::: tip
更多主題相關請參考 [theme](../customization/theming.md)
:::

### 時間配置

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">24小時制時間範圍</h4>
        <DateRange v-model="time24Range" :locale="locale" :showTime="true" :use24Hour="true" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">12小時制時間範圍</h4>
        <DateRange v-model="time12Range" :locale="locale" :showTime="true" :use24Hour="false" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">無秒數時間範圍</h4>
        <DateRange v-model="timeNoSecondsRange" :locale="locale" :showTime="true" :enableSeconds="false" />
    </div>
</div>
:::

```vue
<template>
  <!-- 24小時制 -->
  <DateRange v-model="time24Range" :showTime="true" :use24Hour="true" />

  <!-- 12小時制 -->
  <DateRange v-model="time12Range" :showTime="true" :use24Hour="false" />

  <!-- 不顯示秒數 -->
  <DateRange
    v-model="timeNoSecondsRange"
    :showTime="true"
    :enableSeconds="false"
  />
</template>
```

### 輸出格式

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">ISO 格式輸出</h4>
        <DateRange v-model="isoRange" :locale="locale" outputType="iso" />
        <p class="text-sm">輸出: {{ isoRange }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">ISO 格式輸出(嚴格模式)</h4>
        <DateRange v-model="isoStrictRange" :locale="locale" outputType="iso" :useStrictISO="true" :showTime="true" />
        <p class="text-sm">輸出: {{ isoStrictRange }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Javascript Date物件格式</h4>
        <DateRange v-model="jsDateRange" :locale="locale" outputType="date" />
        <p class="text-sm">輸出: {{ jsDateRange }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">物件格式</h4>
        <DateRange v-model="objectRange" :locale="locale" outputType="object" />
        <p class="text-sm">輸出: {{ objectRange }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">自定義格式輸出</h4>
        <DateRange v-model="customFormatRange" :locale="locale" outputType="custom" dateFormat="YY/MM/DD" />
        <p class="text-sm">輸出: {{ customFormatRange }}</p>
    </div>
</div>
:::

```vue
<template>
  <!-- ISO 格式 -->
  <DateRange v-model="isoRange" outputType="iso" />

  <!-- ISO 格式(嚴格模式) -->
  <DateRange
    v-model="isoStrictRange"
    outputType="iso"
    :useStrictISO="true"
    :showTime="true"
  />

  <!-- Date物件格式 -->
  <DateRange v-model="jsDateRange" outputType="date" />

  <!-- 物件格式 -->
  <DateRange v-model="objectRange" outputType="object" />

  <!-- 自定義格式 -->
  <DateRange
    v-model="customFormatRange"
    outputType="custom"
    dateFormat="YY/MM/DD"
  />
</template>
```

## Slots 插槽

DateRange 提供多個插槽來自定義快捷選項和錯誤訊息處理。

### 快捷選項插槽

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">自定義快捷選項</h4>
        <DateRange v-model="customShortcutRange" :locale="locale" :showShortcuts="true">
            <template #shortcuts="{ applyShortcut }">
                <button 
                    @click="applyShortcut({ 
                        label: '本季', 
                        getValue: () => getCurrentQuarterRange() 
                    })"
                    class="px-3 py-1 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-sm transition-colors"
                >
                    本季
                </button>
                <button 
                    @click="applyShortcut({ 
                        label: '去年同期', 
                        getValue: () => getLastYearSamePeriod() 
                    })"
                    class="px-3 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded-sm transition-colors"
                >
                    去年同期
                </button>
            </template>
        </DateRange>
        <p class="text-sm text-gray-600 dark:text-gray-400">添加自定義的快捷選項按鈕</p>
    </div>
</div>
:::

::: details Code Example

```vue
<template>
  <DateRange v-model="range" :showShortcuts="true">
    <template #shortcuts="{ applyShortcut }">
      <button
        @click="
          applyShortcut({
            label: '本季',
            getValue: () => getCurrentQuarterRange(),
          })
        "
        class="px-3 py-1 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-sm transition-colors"
      >
        本季
      </button>
      <button
        @click="
          applyShortcut({
            label: '去年同期',
            getValue: () => getLastYearSamePeriod(),
          })
        "
        class="px-3 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded-sm transition-colors"
      >
        去年同期
      </button>
    </template>
  </DateRange>

  <script setup lang="ts">
    // 自定義快捷選項功能
    const getCurrentQuarterRange = () => {
      const now = new Date();
      const quarter = Math.floor(now.getMonth() / 3);
      const startMonth = quarter * 3;
      const start = new Date(now.getFullYear(), startMonth, 1);
      const end = new Date(now.getFullYear(), startMonth + 3, 0);

      return {
        start: {
          year: start.getFullYear(),
          month: start.getMonth() + 1,
          day: start.getDate(),
        },
        end: {
          year: end.getFullYear(),
          month: end.getMonth() + 1,
          day: end.getDate(),
        },
      };
    };

    const getLastYearSamePeriod = () => {
      const now = new Date();
      const lastYear = now.getFullYear() - 1;

      return {
        start: {
          year: lastYear,
          month: now.getMonth() + 1,
          day: 1,
        },
        end: {
          year: lastYear,
          month: now.getMonth() + 1,
          day: now.getDate(),
        },
      };
    };
  </script>
</template>
```

:::

### 日曆相關插槽

DateRange 也支援客製化日曆，詳見 [DatePicker Slots](/pages/components/datepicker.html#slots-插槽)。

### 錯誤訊息插槽

DateRange 也支援客製化錯誤訊息，詳見 [錯誤訊息處理文檔](/pages/customization/error-message)。

### 可用插槽列表

| 插槽名稱    | 說明               | Slot Props                                   |
| ----------- | ------------------ | -------------------------------------------- |
| `shortcuts` | 自定義快捷選項     | `{ applyShortcut, shortcuts, currentRange }` |
| `error`     | 自定義錯誤訊息顯示 | `{ errors, errorParams, hasErrors }`         |

## 鍵盤導覽

DateRange 提供完整的鍵盤導航功能：

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">智能輸入與導航</h4>
        <DateRange v-model="keyboardNavRange" :locale="locale" :inputEnabled="true" :showTime="true" />
        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> 在開始和結束日期間切換</p>
            <p>• <kbd>→</kbd> / <kbd>←</kbd> 在日期欄位間切換</p>
            <p>• <kbd>Backspace</kbd> 在空欄位時回到上一個欄位</p>
            <p>• <kbd>Enter</kbd> 完成輸入並驗證</p>
            <p>• 完成開始日期後自動聚焦到結束日期</p>
            <p>• 完成日期輸入後自動聚焦到時間欄位</p>
        </div>
    </div>
</div>
:::

## 範圍驗證

DateRange 提供多種範圍驗證功能：

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">無效範圍處理</h4>
        <DateRange v-model="invalidRange" :locale="locale" :maxRange="5" required />
        <p class="text-sm text-gray-600 dark:text-gray-400">嘗試選擇超過5天的範圍或空範圍查看錯誤提示</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">自動修正範圍順序</h4>
        <DateRange v-model="autoCorrectRange" :locale="locale" />
        <p class="text-sm text-gray-600 dark:text-gray-400">如果結束日期早於開始日期，系統會自動交換</p>
    </div>
</div>
:::

常見驗證規則：

- 結束日期必須晚於或等於開始日期
- 範圍天數必須符合 `minRange` 和 `maxRange` 限制
- 日期必須在 `minDate` 和 `maxDate` 範圍內
- 兩個日期都不能為空

<script setup lang="ts">
import { ref,computed } from "vue";
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

// 基本範例
const basicRange = ref({ start: '', end: '' });
const timeRange = ref({ start: '', end: '' });
const requiredRange = ref({ start: '', end: '' });

// 輸入模式
const inputRange = ref({ start: '', end: '' });
const calendarOnlyRange = ref({ start: '', end: '' });

// 日曆顯示模式
const dualModeRange = ref({ start: '', end: '' });
const singleModeRange = ref({ start: '', end: '' });
const autoModeRange = ref({ start: '', end: '' });

// 快捷選項
const shortcutRange = ref({ start: '', end: '' });

// 範圍限制
const maxRangeLimit = ref({ start: '', end: '' });
const minRangeLimit = ref({ start: '', end: '' });
const dateConstrainedRange = ref({ start: '', end: '' });
const minDate = '2025-01-01';
const maxDate = '2025-12-31';

// 日曆系統
const gregorianRange = ref({ start: '', end: '' });
const rocRange = ref({ start: '', end: '' });

// 主題模式
const lightRange = ref({ start: '', end: '' });
const darkRange = ref({ start: '', end: '' });

// 時間配置
const time24Range = ref({ start: '', end: '' });
const time12Range = ref({ start: '', end: '' });
const timeNoSecondsRange = ref({ start: '', end: '' });

// 輸出格式
const isoRange = ref({ start: '', end: '' });
const isoStrictRange = ref({ start: '', end: '' });
const jsDateRange = ref({ start: '', end: '' });
const objectRange = ref({ start: '', end: '' });
const customFormatRange = ref({ start: '', end: '' });

// 插槽範例
const customShortcutRange = ref({ start: '', end: '' });

// 鍵盤導航
const keyboardNavRange = ref({ start: '', end: '' });

// 驗證範例
const invalidRange = ref({ start: '', end: '' });
const autoCorrectRange = ref({ start: '', end: '' });

// 自定義快捷選項功能
const getCurrentQuarterRange = () => {
  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3);
  const startMonth = quarter * 3;
  const start = new Date(now.getFullYear(), startMonth, 1);
  const end = new Date(now.getFullYear(), startMonth + 3, 0);
  
  return {
    start: { 
      year: start.getFullYear(), 
      month: start.getMonth() + 1, 
      day: start.getDate() 
    },
    end: { 
      year: end.getFullYear(), 
      month: end.getMonth() + 1, 
      day: end.getDate() 
    }
  };
};

const getLastYearSamePeriod = () => {
  const now = new Date();
  const lastYear = now.getFullYear() - 1;
  
  return {
    start: { 
      year: lastYear, 
      month: now.getMonth() + 1, 
      day: 1 
    },
    end: { 
      year: lastYear, 
      month: now.getMonth() + 1, 
      day: now.getDate() 
    }
  };
};
</script>
