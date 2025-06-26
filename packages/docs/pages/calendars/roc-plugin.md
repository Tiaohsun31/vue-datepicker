# ROC 格式化插件

雖然 [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/) 提供了強大的日曆系統支援，但在某些特殊格式化需求上仍有限制。ROC 格式化插件專門用來處理中華民國曆的自訂格式，特別是在時間處理和中文格式化方面。

## 插件功能

ROC 格式化插件主要提供以下功能：

- 🎯 **自訂民國年格式** - 支援多種民國年顯示格式
- ⏰ **進階時間處理** - 支援中文時間格式（上午/下午）
- 📝 **智能輸入解析** - 自動識別並解析民國格式輸入
- 🔄 **雙向轉換** - 西元年與民國年的自動轉換
- 🌏 **多語言支援** - 支援繁體中文、簡體中文、英文等

## 支援的輸入格式

### 日期格式

插件能自動識別以下民國日期格式：

::: raw

<div class="demo-container space-y-2">
  <div class="space-y-1">
    <div class="text-sm font-medium">支援的輸入格式：</div>
    <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
      <div>• 民國113年12月25日</div>
      <div>• 民国113年12月25日</div>
      <div>• ROC 113年12月25日</div>
      <div>• 113/12/25</div>
      <div>• 113-12-25</div>
    </div>
  </div>
</div>
:::

```typescript
// 插件會自動解析這些格式
const inputs = [
  "民國113年12月25日",
  "民国113年12月25日",
  "ROC 113年12月25日",
  "113/12/25",
  "113-12-25",
  "113.12.25",
];
```

### 日期時間格式

插件特別強化了中文時間格式的支援：

::: raw

<div class="demo-container space-y-2">
  <DatePicker 
    v-model="rocDateTime" 
    calendar="roc" 
    locale="zh-TW" 
    show-time
    date-format="ROC-YYYY年MM月DD日"
    time-format="A HH時mm分ss秒"
  />
  <div v-if="rocDateTime" class="py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 text-xs">
    輸出: {{ rocDateTime }}
  </div>
</div>
:::

```vue
<template>
  <DatePicker
    v-model="dateTime"
    calendar="roc"
    show-time
    date-format="ROC-YYYY年MM月DD日"
    time-format="A HH時mm分ss秒"
    output-type="custom"
  />
</template>
```

支援的時間輸入格式：

- `民國113年12月25日 上午 09時30分00秒`
- `民國113年12月25日 下午 02時15分30秒`
- `113年12月25日 14:30:00`
- `113年12月25日 2:30 PM`

## 自訂格式化選項

### 日期格式化

ROC 插件提供多種專用的日期格式化選項：

| 格式代碼             | 輸出示例                | 說明           |
| -------------------- | ----------------------- | -------------- |
| `ROC-YYYY`           | 民國 113 年             | 完整民國年     |
| `ROC-YY`             | 民國 13 年              | 短民國年       |
| `ROC-YYYY年MM月DD日` | 民國 113 年 12 月 25 日 | 完整中文日期   |
| `ROC-YYYY/MM/DD`     | 民國 113/12/25          | 民國年數字格式 |
| `ROC-NUM-YYYY-MM-DD` | 113-12-25               | 純數字民國格式 |

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
        date-format="ROC-YYYY年MM月DD日"
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

### 時間格式化

插件提供豐富的時間格式化選項：

| 格式代碼         | 輸出示例               | 說明           |
| ---------------- | ---------------------- | -------------- |
| `HH:mm:ss`       | 14:30:00               | 24 小時制      |
| `HH時mm分ss秒`   | 14 時 30 分 00 秒      | 中文 24 小時制 |
| `A HH時mm分ss秒` | 下午 02 時 30 分 00 秒 | 中文 12 小時制 |
| `hh:mm:ss A`     | 02:30:00 下午          | 英文 12 小時制 |

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
        output-type="custom"
        date-format="ROC-YYYY年MM月DD日"
        time-format="A HH時mm分ss秒"
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
        date-format="ROC-YYYY年MM月DD日"
        time-format="HH時mm分ss秒"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400 break-all">{{ timeFormat2 || '請選擇日期時間' }}</div>
    </div>
  </div>
</div>
:::

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
  "ROC-YYYY年MM月DD日 HH時mm分ss秒",
  "zh-TW"
);
console.log(formatted);
// 民國113年12月25日 14時30分00秒
```

### 自訂格式驗證

```typescript
// 檢查格式是否被插件支援
const isSupported = rocPlugin.supportsFormat("ROC-YYYY年MM月DD日");
console.log(isSupported); // true

const isNotSupported = rocPlugin.supportsFormat("YYYY-MM-DD");
console.log(isNotSupported); // false
```

## 與標準格式的配合

ROC 插件與標準的 dayjs 格式可以無縫配合使用：

```vue
<template>
  <!-- 組合使用不同格式 -->
  <div class="space-y-2">
    <!-- ROC 插件格式 -->
    <DatePicker
      v-model="date1"
      calendar="roc"
      output-type="custom"
      date-format="ROC-YYYY年MM月DD日"
    />

    <!-- 標準格式 -->
    <DatePicker
      v-model="date2"
      calendar="roc"
      output-type="custom"
      date-format="YYYY-MM-DD"
    />
  </div>
</template>
```

## 錯誤處理

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

## 效能考量

::: tip 效能提示

- ROC 插件只在需要時才會被載入和執行
- 插件會快取解析結果以提升效能
- 建議在大量資料處理時使用批次操作
  :::

## 限制與注意事項

::: warning 使用限制

1. **年份範圍**：支援民國 1 年至 200 年（西元 1912-2111）
2. **格式限制**：僅支援預定義的 ROC 格式代碼
3. **語言支援**：主要針對中文環境優化
4. **相容性**：需要現代瀏覽器支援
   :::

## 最佳實踐

1. **格式選擇**：根據使用者習慣選擇合適的格式
2. **輸入驗證**：始終驗證使用者輸入的有效性
3. **回退機制**：為不支援的環境提供回退選項
4. **效能優化**：避免頻繁的格式轉換操作

```vue
<template>
  <!-- 推薦的配置 -->
  <DatePicker
    v-model="date"
    calendar="roc"
    locale="zh-TW"
    output-type="custom"
    date-format="ROC-YYYY年MM月DD日"
    :show-error-message="true"
    @validation="handleValidation"
  />
</template>

<script setup>
const handleValidation = (isValid, errors) => {
  if (!isValid) {
    console.warn("日期驗證失敗:", errors);
  }
};
</script>
```

<script setup>
import { ref } from 'vue'

// 基本示例
const rocDateTime = ref('')

// 格式化示例
const formatDate1 = ref('')
const formatDate2 = ref('')

// 時間格式示例
const timeFormat1 = ref('')
const timeFormat2 = ref('')
</script>
