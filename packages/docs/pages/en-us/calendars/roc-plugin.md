# ROC Formatting Plugin

While [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/Calendar.html) provides powerful calendar system support, it still has limitations for certain special formatting requirements. The ROC formatting plugin is specifically designed to handle custom formats for the Republic of China (Taiwan) calendar, particularly in time handling and Chinese formatting.

## Plugin Features

The ROC formatting plugin mainly provides the following features:

- 🎯 **Custom ROC Year Formats** - Support for multiple ROC year display formats
- ⏰ **Advanced Time Handling** - Support for Chinese time formats (hour/minute/second)
- 📝 **Smart Input Parsing** - Automatically recognize and parse ROC format inputs
- 🔄 **Bidirectional Conversion** - Automatic conversion between Gregorian and ROC years

## Comparison

::: raw

<div class="demo-container space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-2">
      <h4 class="font-medium">Standard Usage</h4>
      <DatePicker 
        v-model="rocDate1" 
        calendar="roc" 
        :locale="locale"
        output-type="custom"
        :show-time="true"
        customDefaultTime="00:00:00"
      />
      <div v-if="rocDate1" class="text-sm py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 ">
        v-model: {{ rocDate1 }}
      </div>
    </div>
    <div class="space-y-2">
      <h4 class="font-medium">With Plugin</h4>
      <DatePicker 
        v-model="rocDate2" 
        calendar="roc" 
        :locale="locale"
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

::: details Code Example

```vue
<template>
  <div class="demo-container space-y-4">
    <div class="space-y-2">
      <h4 class="font-medium">Standard Usage</h4>
      <DatePicker
        v-model="formatDate1"
        calendar="roc"
        output-type="custom"
        :show-time="true"
        customDefaultTime="00:00:00"
      />
    </div>
    <div class="space-y-2">
      <h4 class="font-medium">With Plugin</h4>
      <DatePicker
        v-model="formatDate2"
        calendar="roc"
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

::: tip How to Use

- Set `date-format` with `ROC` prefix formatting options, which will be automatically applied to date output
- For complete support, refer to the custom formatting options below
  :::

## Format Support

The ROC plugin supports multiple ROC calendar formats for **input parsing** and **output formatting**:

### Date Format Reference Table

| Format Code          | Output Example          | Description             |
| -------------------- | ----------------------- | ----------------------- |
| `ROC-YYYY`           | 民國 113 年             | Full ROC year           |
| `ROC-YYYY-MM-DD`     | 民國 113 年 12 月 25 日 | Full Chinese date       |
| `ROC-YYYY/MM/DD`     | 民國 113/12/25          | ROC year numeric format |
| `ROC-NUM-YYYY-MM-DD` | 113-12-25               | Pure numeric ROC format |
| `ROC-NUM-YYYY/MM/DD` | 113/12/25               | Pure numeric ROC format |

::: raw

<div class="demo-container space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Full Chinese Format</h4>
      <DatePicker 
        v-model="formatDate1" 
        calendar="roc" 
        :locale="locale"
        output-type="custom"
        date-format="ROC-YYYY-MM-DD"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400">{{ formatDate1 || 'Please select a date' }}</div>
    </div>
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Numeric Format</h4>
      <DatePicker 
        v-model="formatDate2" 
        calendar="roc" 
        :locale="locale"
        output-type="custom"
        date-format="ROC-NUM-YYYY-MM-DD"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400">{{ formatDate2 || 'Please select a date' }}</div>
    </div>
  </div>
</div>
:::

::: details Code Example

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Full Chinese Format</h4>
      <DatePicker
        v-model="formatDate1"
        calendar="roc"
        output-type="custom"
        date-format="ROC-YYYY-MM-DD"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400">
        {{ formatDate1 || "Please select a date" }}
      </div>
    </div>
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Numeric Format</h4>
      <DatePicker
        v-model="formatDate2"
        calendar="roc"
        output-type="custom"
        date-format="ROC-NUM-YYYY-MM-DD"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400">
        {{ formatDate2 || "Please select a date" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DatePicker } from "@tiaohsun/vue-datepicker";
import "@tiaohsun/vue-datepicker/style";

const formatDate1 = ref(null);
const formatDate2 = ref(null);
</script>
```

:::

### Time Format Reference Table

| Format Code      | Output Example         | Description            |
| ---------------- | ---------------------- | ---------------------- |
| `HH:mm:ss`       | 14:30:00               | 24-hour format         |
| `HH:mm`          | 12:30                  | 24-hour format         |
| `HH時mm分ss秒`   | 14 時 30 分 00 秒      | Chinese 24-hour format |
| `HH時mm分`       | 下午 02:30             | Chinese 24-hour format |
| `A HH時mm分ss秒` | 下午 02 時 30 分 00 秒 | Chinese 12-hour format |
| `A HH時mm分`     | 下午 02 時 30 分       | Chinese 12-hour format |
| `hh:mm:ss A`     | 02:30:00 下午          | English 12-hour format |
| `hh:mm A`        | 02:30 下午             | English 12-hour format |
| `h:mm A`         | 2:30 下午              | English 12-hour format |
| `A hh:mm:ss`     | 下午 02:30:00          | English 12-hour format |
| `A hh:mm`        | 下午 02:30             | English 12-hour format |

::: raw

<div class="demo-container space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Chinese 12-hour Format</h4>
      <DatePicker 
        v-model="timeFormat1" 
        calendar="roc" 
        :locale="locale"
        show-time
        :use24Hour="false"
        output-type="custom"
        date-format="ROC-YYYY-MM-DD"
        time-format="A HH時mm分ss秒"
        customDefaultTime="00:00:00"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400 break-all">{{ timeFormat1 || 'Please select date and time' }}</div>
    </div>
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Chinese 24-hour Format</h4>
      <DatePicker 
        v-model="timeFormat2" 
        calendar="roc" 
        :locale="locale"
        show-time
        output-type="custom"
        date-format="ROC-YYYY-MM-DD"
        time-format="HH時mm分ss秒"
        customDefaultTime="00:00:00"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400 break-all">{{ timeFormat2 || 'Please select date and time' }}</div>
    </div>
  </div>
</div>
:::

::: details Code Example

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Chinese 12-hour Format</h4>
      <DatePicker
        v-model="timeFormat1"
        calendar="roc"
        show-time
        :use24Hour="false"
        output-type="custom"
        date-format="ROC-YYYY-MM-DD"
        time-format="A HH時mm分ss秒"
        customDefaultTime="00:00:00"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400 break-all">
        {{ timeFormat1 || "Please select date and time" }}
      </div>
    </div>
    <div class="space-y-2">
      <h4 class="text-sm font-medium">Chinese 24-hour Format</h4>
      <DatePicker
        v-model="timeFormat2"
        calendar="roc"
        show-time
        output-type="custom"
        date-format="ROC-YYYY-MM-DD"
        time-format="HH時mm分ss秒"
        customDefaultTime="00:00:00"
      />
      <div class="text-xs text-gray-600 dark:text-gray-400 break-all">
        {{ timeFormat2 || "Please select date and time" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const date = ref("");
const timeFormat1 = ref("");
const timeFormat2 = ref("");
</script>
```

:::

### Input Parsing

The plugin can automatically recognize the following ROC date formats:

```typescript
// All these inputs will be correctly parsed
const inputs = [
  "民國113年12月25日", // Full Chinese format
  "民国113年12月25日", // Simplified Chinese
  "ROC 113年12月25日", // English prefix
  "民國113年12月25日 上午 09時30分", // With time
];
```

## Advanced Usage

### Programmatic Plugin Usage

You can also use the ROC plugin directly in your code:

```typescript
import { RocFormatPlugin } from "@tiaohsun/vue-datepicker";

const rocPlugin = new RocFormatPlugin();

// Check if input can be parsed
const canParse = rocPlugin.canParseInput("民國113年12月25日");
console.log(canParse); // true

// Parse input
const parsed = rocPlugin.parseInput("民國113年12月25日", "zh-TW");
console.log(parsed);
// { year: 2024, month: 12, day: 25 }

// Format output
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

### Custom Format Validation

```typescript
// Check if format is supported by the plugin
const isSupported = rocPlugin.supportsFormat("ROC-YYYY-MM-DD");
console.log(isSupported); // true

const isNotSupported = rocPlugin.supportsFormat("YYYY-MM-DD");
console.log(isNotSupported); // false
```

### Error Handling

The plugin provides comprehensive error handling mechanisms:

```typescript
// Invalid input handling
const invalidInput = rocPlugin.parseInput("Invalid date", "zh-TW");
console.log(invalidInput); // null

// Out of range year
const outOfRange = rocPlugin.parseInput("民國300年01月01日", "zh-TW");
console.log(outOfRange); // null

// Invalid date (e.g., February 30th)
const invalidDate = rocPlugin.parseInput("民國113年02月30日", "zh-TW");
console.log(invalidDate); // null
```

## Limitations and Notes

::: warning Usage Limitations

1. **Year Range**: Supports ROC years 1 to 200 (1912-2111 CE)
2. **Format Limitations**: Only supports predefined ROC format codes
3. **Language Support**: Primarily optimized for Chinese environments
4. **Compatibility**: Requires modern browser support
5. **Performance**: Plugin is only loaded and executed when needed
   :::

<script setup lang="ts">
import { ref,computed } from 'vue'

import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);
// Basic examples
const rocDateTime = ref('')

// Comparison examples
const rocDate1 = ref(null)
const rocDate2 = ref(null)

// Format examples
const formatDate1 = ref(null)
const formatDate2 = ref(null)

// Time format examples
const timeFormat1 = ref('')
const timeFormat2 = ref('')
</script>
