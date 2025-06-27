# ROC 格式化插件

雖然 [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/Calendar.html) 提供了強大的日曆系統支援，但在某些特殊格式化需求上仍有限制。ROC 格式化插件專門用來處理中華民國曆的自訂格式，特別是在時間處理和中文格式化方面。

## 插件功能

ROC 格式化插件主要提供以下功能：

- 🎯 **自訂民國年格式** - 支援多種民國年顯示格式
- ⏰ **進階時間處理** - 支援中文時間格式（上午/下午）
- 📝 **智能輸入解析** - 自動識別並解析民國格式輸入
- 🔄 **雙向轉換** - 西元年與民國年的自動轉換

## 差異比較

::: raw

<div class="demo-container space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-2">
      <h4 class="font-medium">一般使用</h4>
      <DatePicker 
        v-model="rocDate1" 
        calendar="roc" 
        locale="zh-TW"
        output-type="custom"
        :show-time="true"
        customDefaultTime="00:00:00"
      />
      <div v-if="rocDate1" class="text-sm py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 ">
        v-model: {{ rocDate1 }}
      </div>
    </div>
    <div class="space-y-2">
      <h4 class="font-medium">使用插件</h4>
      <DatePicker 
        v-model="rocDate2" 
        calendar="roc" 
        locale="zh-TW"
        output-type="custom"
        :show-time="true"
        date-format="ROC-YYYY-MM-DD" time-format="A HH時mm分ss秒"
        customDefaultTime="00:00:00"
      />
        <div v-if="rocDate2" class="text-sm py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 ">
          v-model: {{ rocDate2 }}
        </div>
    </div>
  </div>
</div>
:::

::: details

```vue
<template>
  <div class="demo-container space-y-4">
    <div class="space-y-2">
      <h4 class="font-medium">一般使用</h4>
      <DatePicker
        v-model="formatDate1"
        calendar="roc"
        locale="zh-TW"
        output-type="custom"
        :show-time="true"
        customDefaultTime="00:00:00"
      />
    </div>
    <div class="space-y-2">
      <h4 class="font-medium">使用插件</h4>
      <DatePicker
        v-model="formatDate2"
        calendar="roc"
        locale="zh-TW"
        output-type="custom"
        :show-time="true"
        date-format="ROC-YYYY-MM-DD"
        time-format="A HH時mm分"
        customDefaultTime="00:00:00"
      />
    </div>
  </div>
</template>
```

:::
::: tip 如何使用?

- `date-format` 設定`ROC`開頭的日期格式化選項，將自動套用到日期輸出上
- 完整支援，請參考下列自訂格式化選項
  :::

## 格式支援

ROC 插件支援多種民國曆格式**輸入解析**和**輸出格式化**：

### 日期格式對照表

| 格式代碼             | 輸出示例                | 說明           |
| -------------------- | ----------------------- | -------------- |
| `ROC-YYYY`           | 民國 113 年             | 完整民國年     |
| `ROC-YYYY-MM-DD`     | 民國 113 年 12 月 25 日 | 完整中文日期   |
| `ROC-YYYY/MM/DD`     | 民國 113/12/25          | 民國年數字格式 |
| `ROC-NUM-YYYY-MM-DD` | 113-12-25               | 純數字民國格式 |
| `ROC-NUM-YYYY/MM/DD` | 113/12/25               | 純數字民國格式 |

::: raw

<div class="demo-container space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">完整中文格式</h4>
      <DatePicker 
        v-model="formatDate1" 
        calendar="roc" 
        locale="zh-TW"
        output-type="custom"
        date-format="ROC-YYYY-MM-DD"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400">{{ formatDate1 || '請選擇日期' }}</div>
    </div>
    <div class="space-y-2">
      <h4 class="text-sm font-medium">數字格式</h4>
      <DatePicker 
        v-model="formatDate2" 
        calendar="roc" 
        locale="zh-TW"
        output-type="custom"
        date-format="ROC-NUM-YYYY-MM-DD"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400">{{ formatDate2 || '請選擇日期' }}</div>
    </div>
  </div>
</div>
:::

### 時間格式對照表

| 格式代碼         | 輸出示例               | 說明           |
| ---------------- | ---------------------- | -------------- |
| `HH:mm:ss`       | 14:30:00               | 24 小時制      |
| `HH:mm`          | 12:30                  | 24 小時制      |
| `HH時mm分ss秒`   | 14 時 30 分 00 秒      | 中文 24 小時制 |
| `HH時mm分`       | 下午 02:30             | 中文 24 小時制 |
| `A HH時mm分ss秒` | 下午 02 時 30 分 00 秒 | 中文 12 小時制 |
| `A HH時mm分`     | 下午 02 時 30 分       | 中文 12 小時制 |
| `hh:mm:ss A`     | 02:30:00 下午          | 英文 12 小時制 |
| `hh:mm A`        | 02:30 下午             | 英文 12 小時制 |
| `h:mm A`         | 2:30 下午              | 英文 12 小時制 |
| `A hh:mm:ss`     | 下午 02:30:00          | 英文 12 小時制 |
| `A hh:mm`        | 下午 02:30             | 英文 12 小時制 |

::: raw

<div class="demo-container space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">中文12小時制</h4>
      <DatePicker 
        v-model="timeFormat1" 
        calendar="roc" 
        locale="zh-TW"
        show-time
        :use24Hour="false"
        output-type="custom"
        date-format="ROC-YYYY-MM-DD"
        time-format="A HH時mm分ss秒"
        customDefaultTime="00:00:00"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400 break-all">{{ timeFormat1 || '請選擇日期時間' }}</div>
    </div>
    <div class="space-y-2">
      <h4 class="text-sm font-medium">中文24小時制</h4>
      <DatePicker 
        v-model="timeFormat2" 
        calendar="roc" 
        locale="zh-TW"
        show-time
        output-type="custom"
        date-format="ROC-YYYY-MM-DD"
        time-format="HH時mm分ss秒"
        customDefaultTime="00:00:00"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400 break-all">{{ timeFormat2 || '請選擇日期時間' }}</div>
    </div>
  </div>
</div>
:::

### 輸入解析

插件能自動識別以下民國日期格式:

```typescript
// 這些輸入都會被正確解析
const inputs = [
  "民國113年12月25日", // 完整中文格式
  "民国113年12月25日", // 簡體中文
  "ROC 113年12月25日", // 英文前綴
  "民國113年12月25日 上午 09時30分", // 含時間
];
```

## 進階用法

### 程式化使用插件

您也可以直接在程式中使用 ROC 插件：

```typescript
import { RocFormatPlugin } from "@tiaohsun/vue-datepicker";

const rocPlugin = new RocFormatPlugin();

// 檢查是否可以解析輸入
const canParse = rocPlugin.canParseInput("民國113年12月25日");
console.log(canParse); // true

// 解析輸入
const parsed = rocPlugin.parseInput("民國113年12月25日", "zh-TW");
console.log(parsed);
// { year: 2024, month: 12, day: 25 }

// 格式化輸出
const date = {
  year: 2024,
  month: 12,
  day: 25,
  hour: 14,
  minute: 30,
  second: 0,
};
const formatted = rocPlugin.format(
  date,
  "ROC-YYYY-MM-DD HH時mm分ss秒",
  "zh-TW"
);
console.log(formatted);
// 民國113年12月25日 14時30分00秒
```

### 自訂格式驗證

```typescript
// 檢查格式是否被插件支援
const isSupported = rocPlugin.supportsFormat("ROC-YYYY-MM-DD");
console.log(isSupported); // true

const isNotSupported = rocPlugin.supportsFormat("YYYY-MM-DD");
console.log(isNotSupported); // false
```

### 錯誤處理

插件提供完善的錯誤處理機制：

```typescript
// 無效輸入處理
const invalidInput = rocPlugin.parseInput("無效日期", "zh-TW");
console.log(invalidInput); // null

// 超出範圍的年份
const outOfRange = rocPlugin.parseInput("民國300年01月01日", "zh-TW");
console.log(outOfRange); // null

// 無效日期（如2月30日）
const invalidDate = rocPlugin.parseInput("民國113年02月30日", "zh-TW");
console.log(invalidDate); // null
```

## 限制與注意事項

::: warning 使用限制

1. **年份範圍**：支援民國 1 年至 200 年（西元 1912-2111）
2. **格式限制**：僅支援預定義的 ROC 格式代碼
3. **語言支援**：主要針對中文環境優化
4. **相容性**：需要現代瀏覽器支援
5. **性能**：插件只在需要時才會被載入和執行
   :::

<script setup lang="ts">
import { ref } from 'vue'
// 基本示例
const rocDateTime = ref('')

// 差異示例
const rocDate1 = ref(null)
const rocDate2 = ref(null)

// 格式化示例
const formatDate1 = ref(null)
const formatDate2 = ref(null)

// 時間格式示例
const timeFormat1 = ref('')
const timeFormat2 = ref('')
</script>
