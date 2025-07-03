# DatePicker

DatePicker is a feature-rich date-time picker component that supports multiple calendar systems, theme modes, and complete internationalization functionality.

## Main Features

### Date Selection and Input

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Basic Date Input</h4>
        <DatePicker v-model="dateOnly" :locale="locale" placeholder="Please enter date" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Format: YYYY-MM-DD, supports keyboard navigation and auto-completion</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Date with Time Input</h4>
        <DatePicker v-model="dateTime" :locale="locale" :showTime="true" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Automatically focuses on time field after date input completion</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Required Validation</h4>
        <DatePicker v-model="requiredDate" :locale="locale" required />
        <p class="text-sm text-gray-600 dark:text-gray-400">Real-time validation with error messages</p>
    </div>
</div>
:::

::: warning
Input functionality is only available when calendar is set to 'gregory'
:::

```vue
<template>
  <!-- Date only -->
  <DatePicker v-model="dateOnly" />

  <!-- With time -->
  <DatePicker v-model="dateTime" :showTime="true" />

  <!-- Required validation -->
  <DatePicker v-model="requiredDate" required />
</template>
```

### Custom Date Format and Order

The component automatically adjusts the input field order based on `dateFormat`, supporting various common date formats:

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Year-Month-Day (YYYY-MM-DD)</h4>
        <DatePicker v-model="formatYMD" :locale="locale" dateFormat="YYYY-MM-DD" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Input order: Year → Month → Day</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Day/Month/Year (DD/MM/YYYY)</h4>
        <DatePicker v-model="formatDMY" :locale="locale" dateFormat="DD/MM/YYYY" date-separator="/" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Input order: Day → Month → Year</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Month/Day/Year (MM/DD/YYYY)</h4>
        <DatePicker v-model="formatMDY" :locale="locale" dateFormat="MM/DD/YYYY"  date-separator="/" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Input order: Month → Day → Year</p>
    </div>
</div>
:::

```vue
<template>
  <!-- Year-Month-Day format -->
  <DatePicker v-model="date1" dateFormat="YYYY-MM-DD" />

  <!-- Day/Month/Year format -->
  <DatePicker v-model="date2" dateFormat="DD/MM/YYYY" date-separator="/" />

  <!-- Month/Day/Year format -->
  <DatePicker v-model="date3" dateFormat="MM/DD/YYYY" date-separator="/" />
</template>
```

### Date Range Constraints

::: raw

<div class="space-y-2">
  <h4 class="font-semibold">Date Range Constraints</h4>
  <DatePicker 
    v-model="constrainedDate" 
    :locale="locale"
    :minDate="minDate" 
    :maxDate="maxDate"
    required
  />
<p class="text-sm text-gray-600 dark:text-gray-400">Range limit: {{ minDate }} ~ {{ maxDate }}</p>
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

## Props

### Basic Properties

| Property          | Type            | Default | Description       |
| ----------------- | --------------- | ------- | ----------------- |
| `modelValue`      | `DateTimeInput` | `null`  | Bound date value  |
| `disabled`        | `boolean`       | `false` | Whether disabled  |
| `required`        | `boolean`       | `false` | Whether required  |
| `showClearButton` | `boolean`       | `true`  | Show clear button |

### Calendar System

| Property       | Type     | Default     | Description                        |
| -------------- | -------- | ----------- | ---------------------------------- |
| `calendar`     | `string` | `'gregory'` | Calendar system ('gregory', 'roc') |
| `locale`       | `string` | `'zh-TW'`   | Locale                             |
| `weekStartsOn` | `0-6`    | `0`         | Week start day (0=Sunday)          |

### Date Format

| Property        | Type         | Default        | Description       |
| --------------- | ------------ | -------------- | ----------------- |
| `dateFormat`    | `string`     | `'YYYY-MM-DD'` | Date format       |
| `dateSeparator` | `string`     | `'-'`          | Date separator    |
| `outputType`    | `OutputType` | `'iso'`        | Output type       |
| `useStrictISO`  | `boolean`    | `false`        | Strict ISO format |

### Time Options

| Property            | Type      | Default     | Description                                               |
| ------------------- | --------- | ----------- | --------------------------------------------------------- |
| `showTime`          | `boolean` | `false`     | Show time selection                                       |
| `timeFormat`        | `string`  | `undefined` | Time format (defaults based on enableSeconds & use24Hour) |
| `enableSeconds`     | `boolean` | `true`      | Enable seconds                                            |
| `use24Hour`         | `boolean` | `true`      | Use 24-hour format                                        |
| `customDefaultTime` | `string`  | `undefined` | Custom default time                                       |

### Theme Appearance

| Property | Type                          | Default    | Description |
| -------- | ----------------------------- | ---------- | ----------- |
| `mode`   | `'light' \| 'dark' \| 'auto'` | `'auto'`   | Theme mode  |
| `theme`  | `TailwindColor \| string`     | `'violet'` | Theme color |

### Internationalization & Error Handling

| Property               | Type                     | Default     | Description            |
| ---------------------- | ------------------------ | ----------- | ---------------------- |
| `customLocaleMessages` | `LocaleMessages`         | `undefined` | Custom locale messages |
| `customErrorMessages`  | `Record<string, string>` | `{}`        | Custom error messages  |
| `useI18n`              | `boolean`                | `true`      | Use built-in i18n      |
| `showErrorMessage`     | `boolean`                | `true`      | Show error messages    |

### Input Control

| Property                 | Type                   | Default | Description                      |
| ------------------------ | ---------------------- | ------- | -------------------------------- |
| `inputEnabled`           | `boolean`              | `true`  | Allow input field entry          |
| `placeholderOverrides`   | `PlaceholderOverrides` | `{}`    | Custom placeholders              |
| `autoFocusTimeAfterDate` | `boolean`              | `true`  | Auto focus time input after date |

PlaceholderOverrides interface:

```typescript
interface PlaceholderOverrides {
  selectDate?: string; // Date selection hint text
  year?: string; // Year input placeholder
  month?: string; // Month input placeholder
  day?: string; // Day input placeholder
  hour?: string; // Hour input placeholder
  minute?: string; // Minute input placeholder
  second?: string; // Second input placeholder
}
```

## Events

| Event Name          | Parameters                                                                                              | Description                       |
| ------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `update:modelValue` | `(value: DateTimeInput)`                                                                                | Triggered when value changes      |
| `change`            | `(value: DateTimeInput)`                                                                                | Triggered when user changes value |
| `validation`        | `(isValid: boolean, errors: Record<string, string>, errorParams?: Record<string, Record<string, any>>)` | Triggered when validation changes |

## Advanced Features

### Multiple Calendar Systems

::: raw

<div class="space-y-4">
<div class="space-y-2">
  <h4 class="font-semibold">Gregorian Calendar</h4>
  <DatePicker v-model="gregorianDate" :locale="locale" calendar="gregory" />
  </div>
  <div class="space-y-2">
  <h4 class="font-semibold">ROC Calendar</h4>
  <DatePicker v-model="rocDate" calendar="roc" :locale="locale" outputType="custom" />
  </div>
</div>
:::

```vue
<template>
  <!-- Gregorian Calendar -->
  <DatePicker v-model="gregorianDate" calendar="gregory" />

  <!-- ROC Calendar -->
  <DatePicker v-model="rocDate" calendar="roc" outputType="custom" />
</template>
```

::: tip
For more calendar systems, see [calendar](../calendars/basic.md)
:::

### Theme Modes

::: raw

<div class="space-y-4">
 <div class="space-y-2">
  <h4 class="font-semibold">Light Mode</h4>
  <DatePicker v-model="lightDate" :locale="locale" mode="light" theme="blue" />
  </div>
   <div class="space-y-2">
  <h4 class="font-semibold">Dark Mode</h4>
  <DatePicker v-model="darkDate" :locale="locale" mode="dark" theme="emerald" />
    </div>
</div>
:::

```vue
<template>
  <!-- Different theme modes -->
  <DatePicker v-model="date1" mode="light" theme="blue" />
  <DatePicker v-model="date2" mode="dark" theme="emerald" />
</template>
```

::: tip
For more theme options, see [theme](../customization/theming.md)
:::

### Time Configuration

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">24-Hour Format</h4>
        <DatePicker v-model="time24" :locale="locale" :showTime="true" :use24Hour="true" />
        <p class="text-sm">Output: {{ time24 }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">12-Hour Format</h4>
        <DatePicker v-model="time12" :locale="locale" :showTime="true" :use24Hour="false" />
        <p class="text-sm">Output: {{ time12 }}</p>
    </div>
        <div class="space-y-2">
        <h4 class="font-semibold">12-Hour Format Custom Output</h4>
        <DatePicker v-model="time12Custom" :locale="locale" :showTime="true" :use24Hour="false" 
                   outputType="custom" timeFormat="hh:mm:ss A" />
        <p class="text-sm">Output: {{ time12Custom }} </p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Without Seconds</h4>
        <DatePicker v-model="timeNoSeconds" :locale="locale" :showTime="true" :enableSeconds="false" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Custom Default Time</h4>
        <DatePicker v-model="customTime" :locale="locale" :showTime="true" customDefaultTime="15:30:00" />
    </div>
</div>
:::

```vue
<template>
  <!-- 24-hour format -->
  <DatePicker v-model="time24" :showTime="true" :use24Hour="true" />

  <!-- 12-hour format -->
  <DatePicker v-model="time12" :showTime="true" :use24Hour="false" />

  <!-- 12-hour format custom output -->
  <DatePicker
    v-model="time12Custom"
    :showTime="true"
    :use24Hour="false"
    outputType="custom"
    timeFormat="hh:mm:ss A"
  />

  <!-- Without seconds -->
  <DatePicker v-model="timeNoSeconds" :showTime="true" :enableSeconds="false" />

  <!-- Custom default time -->
  <DatePicker
    v-model="customTime"
    :showTime="true"
    customDefaultTime="15:30:00"
  />
</template>
```

::: tip Output Format Explanation

**ISO Mode (Default)**

- `outputType="iso"`: Outputs ISO 8601 standard format
- Time portion always uses 24-hour format (e.g., `2025-06-30 14:30:00`)
- `use24Hour` parameter only affects **input interface display**, not output format

**Custom Mode**

- `outputType="custom"`: Fully customizable output format
- Use `timeFormat` to control time output format
- Example: `use24Hour={false}` + `timeFormat="hh:mm:ss A"` → outputs `2025-06-30 02:30:00 PM`

**`use24Hour` Parameter Function**

- ✅ Controls whether time input interface shows AM/PM selector
- ✅ Affects output when `outputType="custom"` combined with `timeFormat`
- ❌ Does not change ISO format output (ISO standard is inherently 24-hour)

:::

### Output Formats

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">ISO Format Output</h4>
        <DatePicker v-model="isoDate" :locale="locale" outputType="iso" />
        <p class="text-sm">Output: {{ isoDate }}</p>
    </div>
        <div class="space-y-2">
        <h4 class="font-semibold">ISO Format Output (Strict Mode)</h4>
        <DatePicker v-model="isoStrictDate" :locale="locale" outputType="iso" :useStrictISO="true" :showTime="true" />
        <p class="text-sm">Output: {{ isoStrictDate }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">JavaScript Date Object Format</h4>
        <DatePicker v-model="jsDate" :locale="locale" outputType="date" />
        <p class="text-sm">Output: {{ jsDate }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Object Format</h4>
        <DatePicker v-model="objectDate" :locale="locale" outputType="object" />
        <p class="text-sm">Output: {{ objectDate }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Custom Format Output</h4>
        <DatePicker v-model="customDate" :locale="locale" outputType="custom" dateFormat="YY/MM/DD" />
        <p class="text-sm">Output: {{ customDate }}</p>
  </div>
</div>
:::

```vue
<template>
  <!-- ISO format -->
  <DatePicker v-model="isoDate" outputType="iso" />
  <!-- ISO format (strict mode) -->
  <DatePicker
    v-model="isoStrictDate"
    outputType="iso"
    :useStrictISO="true"
    :showTime="true"
  />

  <!-- Date object format -->
  <DatePicker v-model="jsDate" outputType="date" />

  <!-- Object format -->
  <DatePicker v-model="objectDate" outputType="object" />

  <!-- Custom format -->
  <DatePicker v-model="customDate" outputType="custom" dateFormat="YY/MM/DD" />
</template>
```

## Slots

DatePicker provides multiple slots to customize calendar display and error message handling.

### Calendar Related Slots

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Custom Year Display</h4>
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
        <h4 class="font-semibold">Custom Month Selector</h4>
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
  <!-- Custom year display -->
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

  <!-- Custom month selector -->
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

### Error Message Slot

DatePicker also supports custom error messages, see [Error Message Handling Documentation](../customization/error-message.md).

### Available Slots List

| Slot Name          | Description                                      | Slot Props                                              |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------- |
| `year-display`     | Custom year display                              | `{ yearData, isSelected }`                              |
| `month-selector`   | Custom month selector                            | `{ monthNames, selectedMonth, onMonthChange }`          |
| `year-selector`    | Custom year selector                             | `{ displayYear, toggleYearSelector, showYearSelector }` |
| `no-years-display` | Display when no years available in year selector | `{ calendarId, locale }`                                |
| `error`            | Custom error message display                     | `{ errors, errorParams, hasErrors }`                    |

::: warning Note
Slot availability may vary depending on calendar system and configuration. It's recommended to test related functionality before use.
:::

## Keyboard Navigation

DatePicker provides various smart input features to enhance user experience:

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Auto-padding and Jump</h4>
        <DatePicker v-model="autoCompleteDate" :locale="locale" />
        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• Month input "2" auto-pads to "02" and jumps to day</p>
            <p>• Day input "5" auto-pads to "05" and completes input</p>
            <p>• Year input completes after full 4 digits and jumps to month</p>
        </div>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Keyboard Navigation</h4>
        <DatePicker v-model="keyboardNavDate" :locale="locale" :showTime="true" />
        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• <kbd>→</kbd> / <kbd>←</kbd> Arrow keys to switch fields</p>
            <p>• <kbd>Backspace</kbd> in empty field returns to previous field</p>
            <p>• <kbd>Enter</kbd> completes input and validates</p>
            <p>• Auto focus to time field after date input completion</p>
        </div>
    </div>
</div>
:::

<script setup lang="ts">
import { ref, computed } from "vue";
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

// Basic examples
const basicDate = ref('');
const dateOnly = ref('');
const dateTime = ref('');
const requiredDate = ref('');

// Format examples
const formatYMD = ref('');
const formatDMY = ref('');
const formatMDY = ref('');

// Date range
const constrainedDate = ref('');
const minDate = '2025-01-01';
const maxDate = '2025-12-31';

// Calendar systems
const gregorianDate = ref('');
const rocDate = ref('');

// Theme modes
const lightDate = ref('');
const darkDate = ref('');

// Time configuration
const time24 = ref('');
const time12 = ref('');
const time12Custom = ref('');
const timeNoSeconds = ref('');
const customTime = ref('');

// Output formats
const isoDate = ref('');
const isoStrictDate = ref('');
const jsDate = ref('');
const objectDate = ref('');
const customDate = ref('');

// Error handling
const errorDate = ref('');
const fieldErrorDate = ref('');

// Slots
const slotDate = ref('');
const monthSelectorDate = ref('');

// Keyboard navigation
const autoCompleteDate = ref('');
const keyboardNavDate = ref('');
</script>
