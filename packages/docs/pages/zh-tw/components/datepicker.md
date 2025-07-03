# DatePicker

DatePicker 是一個功能豐富的日期時間選擇器組件，支援多種日曆系統、主題模式和完整的國際化功能。

## 主要功能

### 日期選擇與輸入

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">基本日期輸入</h4>
        <DatePicker v-model="dateOnly" :locale="locale" placeholder="請輸入日期" />
        <p class="text-sm text-gray-600 dark:text-gray-400">格式: YYYY-MM-DD，支援鍵盤導航和自動完成</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">包含時間輸入</h4>
        <DatePicker v-model="dateTime" :locale="locale" :showTime="true" />
        <p class="text-sm text-gray-600 dark:text-gray-400">日期輸入完成後自動聚焦到時間欄位</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">必填驗證</h4>
        <DatePicker v-model="requiredDate" :locale="locale" required />
        <p class="text-sm text-gray-600 dark:text-gray-400">即時驗證並顯示錯誤訊息</p>
    </div>
</div>
:::

::: warning
輸入功能僅限於 calendar 為 gregory 的情況下

:::

```vue
<template>
  <!-- 僅日期 -->
  <DatePicker v-model="dateOnly" />

  <!-- 包含時間 -->
  <DatePicker v-model="dateTime" :showTime="true" />

  <!-- 必填驗證 -->
  <DatePicker v-model="requiredDate" required />
</template>
```

### 自定義日期格式與順序

組件會根據 `dateFormat` 自動調整輸入欄位的順序，支援多種常見的日期格式：

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">年-月-日 (YYYY-MM-DD)</h4>
        <DatePicker v-model="formatYMD" :locale="locale" dateFormat="YYYY-MM-DD" />
        <p class="text-sm text-gray-600 dark:text-gray-400">輸入順序: 年份 → 月份 → 日期</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">日/月/年 (DD/MM/YYYY)</h4>
        <DatePicker v-model="formatDMY" :locale="locale" dateFormat="DD/MM/YYYY" date-separator="/" />
        <p class="text-sm text-gray-600 dark:text-gray-400">輸入順序: 日期 → 月份 → 年份</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">月/日/年 (MM/DD/YYYY)</h4>
        <DatePicker v-model="formatMDY" :locale="locale" dateFormat="MM/DD/YYYY"  date-separator="/" />
        <p class="text-sm text-gray-600 dark:text-gray-400">輸入順序: 月份 → 日期 → 年份</p>
    </div>
</div>
:::

```vue
<template>
  <!-- 年-月-日格式 -->
  <DatePicker v-model="date1" dateFormat="YYYY-MM-DD" />

  <!-- 日/月/年格式 -->
  <DatePicker v-model="date2" dateFormat="DD/MM/YYYY" date-separator="/" />

  <!-- 月/日/年格式 -->
  <DatePicker v-model="date3" dateFormat="MM/DD/YYYY" date-separator="/" />
</template>
```

### 日期範圍限制

::: raw

<div class="space-y-2">
  <h4 class="font-semibold">日期範圍限制</h4>
  <DatePicker 
    v-model="constrainedDate" 
    :locale="locale"
    :minDate="minDate" 
    :maxDate="maxDate"
    required
  />
<p class="text-sm text-gray-600 dark:text-gray-400">限制範圍: {{ minDate }} ~ {{ maxDate }}</p>
  </div>
:::

```vue
<template>
  <DatePicker
    v-model="constrainedDate"
    minDate="2025-01-01"
    maxDate="2025-12-31"
  />
</template>
```

## Props 參數

### 基本屬性

| 屬性              | 類型            | 預設值  | 說明             |
| ----------------- | --------------- | ------- | ---------------- |
| `modelValue`      | `DateTimeInput` | `null`  | 綁定的日期值     |
| `disabled`        | `boolean`       | `false` | 是否禁用         |
| `required`        | `boolean`       | `false` | 是否必填         |
| `showClearButton` | `boolean`       | `true`  | 是否顯示清除按鈕 |

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

| 屬性                | 類型      | 預設值      | 說明                                           |
| ------------------- | --------- | ----------- | ---------------------------------------------- |
| `showTime`          | `boolean` | `false`     | 是否顯示時間選擇                               |
| `timeFormat`        | `string`  | `undefined` | 時間格式(依照 enableSeconds 及 use24Hour 預設) |
| `enableSeconds`     | `boolean` | `true`      | 是否啟用秒                                     |
| `use24Hour`         | `boolean` | `true`      | 是否使用 24 小時制                             |
| `customDefaultTime` | `string`  | `undefined` | 自定義預設時間                                 |

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

| 屬性                     | 類型                   | 預設值 | 說明                     |
| ------------------------ | ---------------------- | ------ | ------------------------ |
| `inputEnabled`           | `boolean`              | `true` | 是否允許輸入框輸入       |
| `placeholderOverrides`   | `PlaceholderOverrides` | `{}`   | 自定義佔位符             |
| `autoFocusTimeAfterDate` | `boolean`              | `true` | 是否自動聚焦到時間輸入框 |

PlaceholderOverrides 介面：

```typescript
interface PlaceholderOverrides {
  selectDate?: string; // 選擇日期的提示文字
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
| `update:modelValue` | `(value: DateTimeInput)`                                                                                | 值變化時觸發           |
| `change`            | `(value: DateTimeInput)`                                                                                | 使用者操作改變值時觸發 |
| `validation`        | `(isValid: boolean, errors: Record<string, string>, errorParams?: Record<string, Record<string, any>>)` | 驗證狀態變化時觸發     |

## 高級功能

### 多種日曆系統

::: raw

<div class="space-y-4">
<div class="space-y-2">
  <h4 class="font-semibold">西元曆 (Gregorian)</h4>
  <DatePicker v-model="gregorianDate" :locale="locale" calendar="gregory" />
  </div>
  <div class="space-y-2">
  <h4 class="font-semibold">民國曆 (ROC)</h4>
  <DatePicker v-model="rocDate" calendar="roc" :locale="locale" outputType="custom" />
  </div>
</div>
:::

```vue
<template>
  <!-- 西元曆 -->
  <DatePicker v-model="gregorianDate" calendar="gregory" />

  <!-- 民國曆 -->
  <DatePicker v-model="rocDate" calendar="roc" outputType="custom" />
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
  <DatePicker v-model="lightDate" :locale="locale" mode="light" theme="blue" />
  </div>
   <div class="space-y-2">
  <h4 class="font-semibold">深色模式</h4>
  <DatePicker v-model="darkDate" :locale="locale" mode="dark" theme="emerald" />
    </div>
</div>
:::

```vue
<template>
  <!-- 不同主題模式 -->
  <DatePicker v-model="date1" mode="light" theme="blue" />
  <DatePicker v-model="date2" mode="dark" theme="emerald" />
</template>
```

::: tip
更多主題相關請參考 [theme](../customization/theming.md)
:::

### 時間配置

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">24小時制</h4>
        <DatePicker v-model="time24" :locale="locale" :showTime="true" :use24Hour="true" />
        <p class="text-sm">輸出: {{ time24 }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">12小時制</h4>
        <DatePicker v-model="time12" :locale="locale" :showTime="true" :use24Hour="false" />
        <p class="text-sm">輸出: {{ time12 }}</p>
    </div>
        <div class="space-y-2">
        <h4 class="font-semibold">12小時制自定義輸出</h4>
        <DatePicker v-model="time12Custom" :locale="locale" :showTime="true" :use24Hour="false" 
                   outputType="custom" timeFormat="hh:mm:ss A" />
        <p class="text-sm">輸出: {{ time12Custom }} </p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">無秒數</h4>
        <DatePicker v-model="timeNoSeconds" :locale="locale" :showTime="true" :enableSeconds="false" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">自定義預設時間</h4>
        <DatePicker v-model="customTime" :locale="locale" :showTime="true" customDefaultTime="15:30:00" />
    </div>
</div>
:::

```vue
<template>
  <!-- 24小時制 -->
  <DatePicker v-model="time24" :showTime="true" :use24Hour="true" />

  <!-- 12小時制 -->
  <DatePicker v-model="time12" :showTime="true" :use24Hour="false" />

  <!-- 12小時制自定義輸出 -->
  <DatePicker
    v-model="time12Custom"
    :showTime="true"
    :use24Hour="false"
    outputType="custom"
    timeFormat="hh:mm:ss A"
  />

  <!-- 不顯示秒數 -->
  <DatePicker v-model="timeNoSeconds" :showTime="true" :enableSeconds="false" />

  <!-- 自定義預設時間 -->
  <DatePicker
    v-model="customTime"
    :showTime="true"
    customDefaultTime="15:30:00"
  />
</template>
```

::: tip 輸出格式說明

**ISO 模式（預設）**

- `outputType="iso"`：輸出符合 ISO 8601 標準的格式
- 時間部分固定使用 24 小時制（如：`2025-06-30 14:30:00`）
- `use24Hour` 參數僅影響**輸入界面的顯示**，不會改變輸出格式

**自定義模式**

- `outputType="custom"`：完全自定義輸出格式
- 可通過 `timeFormat` 控制輸出的時間格式
- 範例：`use24Hour={false}` + `timeFormat="hh:mm:ss A"` → 輸出 `2025-06-30 02:30:00 PM`

**`use24Hour` 參數的作用**

- ✅ 控制時間輸入界面是否顯示 AM/PM 選擇器
- ✅ 在 `outputType="custom"` 時配合 `timeFormat` 影響輸出
- ❌ 不會改變 ISO 格式的輸出（ISO 標準本身就是 24 小時制）

:::

### 輸出格式

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">ISO 格式輸出</h4>
        <DatePicker v-model="isoDate" :locale="locale" outputType="iso" />
        <p class="text-sm">輸出: {{ isoDate }}</p>
    </div>
        <div class="space-y-2">
        <h4 class="font-semibold">ISO 格式輸出(嚴格模式)</h4>
        <DatePicker v-model="isoStrictDate" :locale="locale" outputType="iso" :useStrictISO="true" :showTime="true" />
        <p class="text-sm">輸出: {{ isoStrictDate }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Javascript Date物件格式</h4>
        <DatePicker v-model="jsDate" :locale="locale" outputType="date" />
        <p class="text-sm">輸出: {{ jsDate }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">物件格式</h4>
        <DatePicker v-model="objectDate" :locale="locale" outputType="object" />
        <p class="text-sm">輸出: {{ objectDate }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">自定義格式輸出</h4>
        <DatePicker v-model="customDate" :locale="locale" outputType="custom" dateFormat="YY/MM/DD" />
        <p class="text-sm">輸出: {{ customDate }}</p>
  </div>
</div>
:::

```vue
<template>
  <!-- ISO 格式 -->
  <DatePicker v-model="isoDate" outputType="iso" />
  <!-- ISO 格式(嚴格模式) -->
  <DatePicker
    v-model="isoStrictDate"
    outputType="iso"
    :useStrictISO="true"
    :showTime="true"
  />

  <!-- Date物件格式 -->
  <DatePicker v-model="jsDate" outputType="date" />

  <!-- 物件格式 -->
  <DatePicker v-model="objectDate" outputType="object" />

  <!-- 自定義格式 -->
  <DatePicker v-model="customDate" outputType="custom" dateFormat="YY/MM/DD" />
</template>
```

## Slots 插槽

DatePicker 提供多個插槽來自定義日曆顯示和錯誤訊息處理。

### 日曆相關插槽

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">年份顯示自定義</h4>
        <DatePicker v-model="slotDate" calendar="roc" :locale="locale">
            <template #year-display="{ yearData, isSelected }">
                <div class="custom-year-display">
                    <div :class="['font-bold', isSelected ? 'text-white' : 'text-blue-600']">
                        {{ yearData.displayYear }}
                    </div>
                    <div v-if="yearData.showReference" class="text-xs opacity-70">
                        ({{ yearData.referenceYear }})
                    </div>
                </div>
            </template>
        </DatePicker>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">月份選擇器自定義</h4>
        <DatePicker v-model="monthSelectorDate" :locale="locale">
            <template #month-selector="{ monthNames, selectedMonth, onMonthChange }">
            <div class="grid grid-cols-3 gap-1 p-2 bg-gray-50 rounded-lg">
                <button
                v-for="(month, index) in monthNames"
                :key="index"
                @click="onMonthChange(index + 1)"
                class="px-2 py-1 text-xs rounded transition-all duration-200 transform hover:scale-105"
                :class="{
                    'bg-blue-500 text-white shadow-lg': selectedMonth === index + 1,
                    'bg-white text-gray-600 dark:text-gray-400 hover:bg-blue-100': selectedMonth !== index + 1
                }"
                >
                {{ month.slice(0, 3) }}
                </button>
            </div>
            </template>
        </DatePicker>
    </div>
</div>
:::

::: details Code Example

```vue
<template>
  <!-- 年份顯示自定義 -->
  <DatePicker v-model="date" calendar="roc">
    <template #year-display="{ yearData, isSelected }">
      <div class="custom-year-display">
        <div
          :class="['font-bold', isSelected ? 'text-white' : 'text-blue-600']"
        >
          {{ yearData.displayYear }}
        </div>
        <div v-if="yearData.showReference" class="text-xs opacity-70">
          ({{ yearData.referenceYear }})
        </div>
      </div>
    </template>
  </DatePicker>

  <!-- 月份選擇器自定義 -->
  <DatePicker v-model="date">
    <template #month-selector="{ monthNames, selectedMonth, onMonthChange }">
      <div class="grid grid-cols-3 gap-1 p-2 bg-gray-50 rounded-lg">
        <button
          v-for="(month, index) in monthNames"
          :key="index"
          @click="onMonthChange(index + 1)"
          class="px-2 py-1 text-xs rounded transition-all duration-200 transform hover:scale-105"
          :class="{
            'bg-blue-500 text-white shadow-lg': selectedMonth === index + 1,
            'bg-white text-gray-600 dark:text-gray-400 hover:bg-blue-100':
              selectedMonth !== index + 1,
          }"
        >
          {{ month.slice(0, 3) }}
        </button>
      </div>
    </template>
  </DatePicker>
</template>
```

:::

### 錯誤訊息插槽

DatePicker 也支援客製化錯誤訊息，詳見 [錯誤訊息處理文檔](../customization/error-message.md)。

### 可用插槽列表

| 插槽名稱           | 說明                         | Slot Props                                              |
| ------------------ | ---------------------------- | ------------------------------------------------------- |
| `year-display`     | 自定義年份顯示               | `{ yearData, isSelected }`                              |
| `month-selector`   | 自定義月份選擇器             | `{ monthNames, selectedMonth, onMonthChange }`          |
| `year-selector`    | 自定義年份選擇器             | `{ displayYear, toggleYearSelector, showYearSelector }` |
| `no-years-display` | 年份選擇器無可用年份時的顯示 | `{ calendarId, locale }`                                |
| `error`            | 自定義錯誤訊息顯示           | `{ errors, errorParams, hasErrors }`                    |

::: warning 注意事項
插槽的可用性可能因日曆系統和配置而異，建議在使用前先測試相關功能。
:::

## 鍵盤導覽

DatePicker 提供多種智能輸入功能，提升使用者體驗：
::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">自動補零與跳轉</h4>
        <DatePicker v-model="autoCompleteDate" :locale="locale" />
        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• 月份輸入 "2" 自動補零為 "02" 並跳到日期</p>
            <p>• 日期輸入 "5" 自動補零為 "05" 並完成輸入</p>
            <p>• 年份輸入完整4位數後自動跳到月份</p>
        </div>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">鍵盤導航</h4>
        <DatePicker v-model="keyboardNavDate" :locale="locale" :showTime="true" />
        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• <kbd>→</kbd> / <kbd>←</kbd> 左右箭頭切換欄位</p>
            <p>• <kbd>Backspace</kbd> 在空欄位時回到上一個欄位</p>
            <p>• <kbd>Enter</kbd> 完成輸入並驗證</p>
            <p>• 完成日期輸入後自動聚焦到時間欄位</p>
        </div>
    </div>
</div>
:::

<script setup lang="ts">
import { ref, computed } from "vue";
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

// 基本範例
const basicDate = ref('');
const dateOnly = ref('');
const dateTime = ref('');
const requiredDate = ref('');

// 格式範例
const formatYMD = ref('');
const formatDMY = ref('');
const formatMDY = ref('');

// 日期範圍
const constrainedDate = ref('');
const minDate = '2025-01-01';
const maxDate = '2025-12-31';

// 日曆系統
const gregorianDate = ref('');
const rocDate = ref('');

// 主題模式
const lightDate = ref('');
const darkDate = ref('');

// 時間配置
const time24 = ref('');
const time12 = ref('');
const time12Custom = ref('');
const timeNoSeconds = ref('');
const customTime = ref('');

// 輸出格式
const isoDate = ref('');
const isoStrictDate = ref('');
const jsDate = ref('');
const objectDate = ref('');
const customDate = ref('');

// 錯誤處理
const errorDate = ref('');
const fieldErrorDate = ref('');

// Slot
const slotDate = ref('');
const monthSelectorDate = ref('');
</script>
