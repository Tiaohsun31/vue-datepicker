# DateRange

DateRange is a feature-rich date range picker component that supports dual calendar display, shortcuts, range constraints, and complete internationalization functionality.

## Main Features

### Date Range Selection and Input

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Basic Date Range Selection</h4>
        <DateRange v-model="basicRange" :locale="locale" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Click to select start and end dates, supports dual calendar display</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Date Range with Time</h4>
        <DateRange v-model="timeRange" :locale="locale" :showTime="true" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Set start and end times after selecting dates</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Required Validation</h4>
        <DateRange v-model="requiredRange" :locale="locale" required />
        <p class="text-sm text-gray-600 dark:text-gray-400">Real-time validation with error messages</p>
    </div>
</div>
:::

```vue
<template>
  <!-- Basic range selection -->
  <DateRange v-model="basicRange" />

  <!-- Date range with time -->
  <DateRange v-model="timeRange" :showTime="true" />

  <!-- Required validation -->
  <DateRange v-model="requiredRange" required />
</template>
```

### Direct Input Field Entry

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Input Field Entry</h4>
        <DateRange v-model="inputRange" :locale="locale" :inputEnabled="true" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Use input fields directly within the calendar to enter date ranges</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Calendar Only Selection</h4>
        <DateRange v-model="calendarOnlyRange" :locale="locale" :inputEnabled="false" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Hide input fields, use calendar selection only</p>
    </div>
</div>
:::

```vue
<template>
  <!-- Enable input fields -->
  <DateRange v-model="inputRange" :inputEnabled="true" />

  <!-- Calendar only selection -->
  <DateRange v-model="calendarOnlyRange" :inputEnabled="false" />
</template>
```

::: warning
Input functionality is only available when displayMode is set to 'dual'
:::

### Calendar Display Mode

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Dual Month Display Mode</h4>
        <DateRange v-model="dualModeRange" :locale="locale" monthDisplayMode="dual" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Display two consecutive month calendars simultaneously for easy cross-month range selection</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Single Month Display Mode</h4>
        <DateRange v-model="singleModeRange" :locale="locale" monthDisplayMode="single" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Display only a single month calendar to save display space</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Auto Mode (Default)</h4>
        <DateRange v-model="autoModeRange" :locale="locale" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Automatically switch based on screen width: dual month on desktop, single month on mobile</p>
    </div>
</div>
:::

```vue
<template>
  <!-- Force dual month display -->
  <DateRange v-model="dualModeRange" monthDisplayMode="dual" />

  <!-- Force single month display -->
  <DateRange v-model="singleModeRange" monthDisplayMode="single" />

  <!-- Auto adaptive (default behavior) -->
  <DateRange v-model="autoModeRange" />
</template>
```

### Shortcuts

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Built-in Shortcuts</h4>
        <DateRange v-model="shortcutRange" :locale="locale" :showShortcuts="true" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Provides shortcuts like Today, Last 7 days, Last 30 days, This month, etc.</p>
    </div>
</div>
:::

```vue
<template>
  <!-- Show shortcuts -->
  <DateRange v-model="shortcutRange" :showShortcuts="true" />
</template>
```

### Range Constraints

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Maximum Range Limit</h4>
        <DateRange v-model="maxRangeLimit" :locale="locale" :maxRange="7" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Can only select a range of up to 7 days</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Minimum Range Limit</h4>
        <DateRange v-model="minRangeLimit" :locale="locale" :minRange="3" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Must select at least a 3-day range</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Date Range Constraints</h4>
        <DateRange v-model="dateConstrainedRange" :locale="locale" :minDate="minDate" :maxDate="maxDate" />
        <p class="text-sm text-gray-600 dark:text-gray-400">Constrain selectable date range: {{ minDate }} ~ {{ maxDate }}</p>
    </div>
</div>
:::

```vue
<template>
  <!-- Maximum range limit -->
  <DateRange v-model="maxRangeLimit" :maxRange="7" />

  <!-- Minimum range limit -->
  <DateRange v-model="minRangeLimit" :minRange="3" />

  <!-- Date range constraints -->
  <DateRange
    v-model="dateConstrainedRange"
    :minDate="minDate"
    :maxDate="maxDate"
  />
</template>
```

## Props

### Basic Properties

| Property          | Type                                                   | Default | Description                           |
| ----------------- | ------------------------------------------------------ | ------- | ------------------------------------- |
| `modelValue`      | `{ start: DateTimeInput; end: DateTimeInput } \| null` | `null`  | Bound date range value                |
| `disabled`        | `boolean`                                              | `false` | Whether disabled                      |
| `required`        | `boolean`                                              | `false` | Whether required                      |
| `showClearButton` | `boolean`                                              | `true`  | Show clear button                     |
| `separator`       | `string`                                               | `' ~ '` | Separator between start and end dates |

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

| Property        | Type      | Default     | Description                                               |
| --------------- | --------- | ----------- | --------------------------------------------------------- |
| `showTime`      | `boolean` | `false`     | Show time selection                                       |
| `timeFormat`    | `string`  | `undefined` | Time format (defaults based on enableSeconds & use24Hour) |
| `enableSeconds` | `boolean` | `true`      | Enable seconds                                            |
| `use24Hour`     | `boolean` | `true`      | Use 24-hour format                                        |

### Range-Specific Options

| Property           | Type                 | Default     | Description                                                    |
| ------------------ | -------------------- | ----------- | -------------------------------------------------------------- |
| `monthDisplayMode` | `'single' \| 'dual'` | `undefined` | Calendar display mode, auto-switches by window size when unset |
| `showShortcuts`    | `boolean`            | `false`     | Show shortcuts                                                 |
| `incomplete`       | `boolean`            | `true`      | Show incomplete range selection                                |
| `maxRange`         | `number`             | `undefined` | Maximum selectable days                                        |
| `minRange`         | `number`             | `undefined` | Minimum selectable days                                        |
| `minDate`          | `string`             | `undefined` | Minimum selectable date                                        |
| `maxDate`          | `string`             | `undefined` | Maximum selectable date                                        |

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
| `inputEnabled`           | `boolean`              | `false` | Allow input field entry          |
| `placeholderOverrides`   | `PlaceholderOverrides` | `{}`    | Custom placeholders              |
| `autoFocusTimeAfterDate` | `boolean`              | `true`  | Auto focus time input after date |

PlaceholderOverrides interface:

```typescript
interface PlaceholderOverrides {
  start?: string; // Start date hint text
  end?: string; // End date hint text
  year?: string; // Year input placeholder
  month?: string; // Month input placeholder
  day?: string; // Day input placeholder
  hour?: string; // Hour input placeholder
  minute?: string; // Minute input placeholder
  second?: string; // Second input placeholder
}
```

## Events

| Event Name          | Parameters                                                                                              | Description                        |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `update:modelValue` | `(range: { start: DateTimeInput; end: DateTimeInput } \| null)`                                         | Triggered when range value changes |
| `change`            | `(range: { start: DateTimeInput; end: DateTimeInput } \| null)`                                         | Triggered when user changes value  |
| `validation`        | `(isValid: boolean, errors: Record<string, string>, errorParams?: Record<string, Record<string, any>>)` | Triggered when validation changes  |

## Advanced Features

### Multiple Calendar Systems

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Gregorian Calendar</h4>
        <DateRange v-model="gregorianRange" :locale="locale" calendar="gregory" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">ROC Calendar</h4>
        <DateRange v-model="rocRange"  calendar="roc" :locale="locale" outputType="custom"  />
    </div>
</div>
:::

```vue
<template>
  <!-- Gregorian Calendar -->
  <DateRange v-model="gregorianRange" calendar="gregory" />

  <!-- ROC Calendar -->
  <DateRange v-model="rocRange" calendar="roc" outputType="custom" />
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
        <DateRange v-model="lightRange" :locale="locale" mode="light" theme="blue" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Dark Mode</h4>
        <DateRange v-model="darkRange" :locale="locale" mode="dark" theme="emerald" />
    </div>
</div>
:::

```vue
<template>
  <!-- Different theme modes -->
  <DateRange v-model="lightRange" mode="light" theme="blue" />
  <DateRange v-model="darkRange" mode="dark" theme="emerald" />
</template>
```

::: tip
For more theme options, see [theme](../customization/theming.md)
:::

### Time Configuration

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">24-Hour Time Range</h4>
        <DateRange v-model="time24Range" :locale="locale" :showTime="true" :use24Hour="true" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">12-Hour Time Range</h4>
        <DateRange v-model="time12Range" :locale="locale" :showTime="true" :use24Hour="false" />
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Time Range without Seconds</h4>
        <DateRange v-model="timeNoSecondsRange" :locale="locale" :showTime="true" :enableSeconds="false" />
    </div>
</div>
:::

```vue
<template>
  <!-- 24-hour format -->
  <DateRange v-model="time24Range" :showTime="true" :use24Hour="true" />

  <!-- 12-hour format -->
  <DateRange v-model="time12Range" :showTime="true" :use24Hour="false" />

  <!-- Without seconds -->
  <DateRange
    v-model="timeNoSecondsRange"
    :showTime="true"
    :enableSeconds="false"
  />
</template>
```

### Output Formats

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">ISO Format Output</h4>
        <DateRange v-model="isoRange" :locale="locale" outputType="iso" />
        <p class="text-sm">Output: {{ isoRange }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">ISO Format Output (Strict Mode)</h4>
        <DateRange v-model="isoStrictRange" :locale="locale" outputType="iso" :useStrictISO="true" :showTime="true" />
        <p class="text-sm">Output: {{ isoStrictRange }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">JavaScript Date Object Format</h4>
        <DateRange v-model="jsDateRange" :locale="locale" outputType="date" />
        <p class="text-sm">Output: {{ jsDateRange }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Object Format</h4>
        <DateRange v-model="objectRange" :locale="locale" outputType="object" />
        <p class="text-sm">Output: {{ objectRange }}</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Custom Format Output</h4>
        <DateRange v-model="customFormatRange" :locale="locale" outputType="custom" dateFormat="YY/MM/DD" />
        <p class="text-sm">Output: {{ customFormatRange }}</p>
    </div>
</div>
:::

```vue
<template>
  <!-- ISO format -->
  <DateRange v-model="isoRange" outputType="iso" />

  <!-- ISO format (strict mode) -->
  <DateRange
    v-model="isoStrictRange"
    outputType="iso"
    :useStrictISO="true"
    :showTime="true"
  />

  <!-- Date object format -->
  <DateRange v-model="jsDateRange" outputType="date" />

  <!-- Object format -->
  <DateRange v-model="objectRange" outputType="object" />

  <!-- Custom format -->
  <DateRange
    v-model="customFormatRange"
    outputType="custom"
    dateFormat="YY/MM/DD"
  />
</template>
```

## Slots

DateRange provides multiple slots to customize shortcuts and error message handling.

### Shortcuts Slot

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Custom Shortcuts</h4>
        <DateRange v-model="customShortcutRange" :locale="locale" :showShortcuts="true">
            <template #shortcuts="{ applyShortcut }">
                <button 
                    @click="applyShortcut({ 
                        label: 'This Quarter', 
                        getValue: () => getCurrentQuarterRange() 
                    })"
                    class="px-3 py-1 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-sm transition-colors"
                >
                    This Quarter
                </button>
                <button 
                    @click="applyShortcut({ 
                        label: 'Same Period Last Year', 
                        getValue: () => getLastYearSamePeriod() 
                    })"
                    class="px-3 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded-sm transition-colors"
                >
                    Same Period Last Year
                </button>
            </template>
        </DateRange>
        <p class="text-sm text-gray-600 dark:text-gray-400">Add custom shortcut buttons</p>
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
            label: 'This Quarter',
            getValue: () => getCurrentQuarterRange(),
          })
        "
        class="px-3 py-1 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-sm transition-colors"
      >
        This Quarter
      </button>
      <button
        @click="
          applyShortcut({
            label: 'Same Period Last Year',
            getValue: () => getLastYearSamePeriod(),
          })
        "
        class="px-3 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded-sm transition-colors"
      >
        Same Period Last Year
      </button>
    </template>
  </DateRange>

  <script setup lang="ts">
    // Custom shortcut functions
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

### Calendar Related Slots

DateRange also supports calendar customization, see [DatePicker Slots](/pages/components/datepicker.html#slots).

### Error Message Slot

DateRange also supports custom error messages, see [Error Message Handling Documentation](/pages/customization/error-message).

### Available Slots List

| Slot Name   | Description                  | Slot Props                                   |
| ----------- | ---------------------------- | -------------------------------------------- |
| `shortcuts` | Custom shortcuts             | `{ applyShortcut, shortcuts, currentRange }` |
| `error`     | Custom error message display | `{ errors, errorParams, hasErrors }`         |

## Keyboard Navigation

DateRange provides complete keyboard navigation functionality:

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Smart Input and Navigation</h4>
        <DateRange v-model="keyboardNavRange" :locale="locale" :inputEnabled="true" :showTime="true" />
        <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>• <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> switch between start and end dates</p>
            <p>• <kbd>→</kbd> / <kbd>←</kbd> switch between date fields</p>
            <p>• <kbd>Backspace</kbd> in empty field returns to previous field</p>
            <p>• <kbd>Enter</kbd> completes input and validates</p>
            <p>• Auto focus to end date after completing start date</p>
            <p>• Auto focus to time field after completing date input</p>
        </div>
    </div>
</div>
:::

## Range Validation

DateRange provides multiple range validation features:

::: raw

<div class="space-y-4">
    <div class="space-y-2">
        <h4 class="font-semibold">Invalid Range Handling</h4>
        <DateRange v-model="invalidRange" :locale="locale" :maxRange="5" required />
        <p class="text-sm text-gray-600 dark:text-gray-400">Try selecting a range longer than 5 days or empty range to see error messages</p>
    </div>
    <div class="space-y-2">
        <h4 class="font-semibold">Auto-correct Range Order</h4>
        <DateRange v-model="autoCorrectRange" :locale="locale" />
        <p class="text-sm text-gray-600 dark:text-gray-400">If end date is earlier than start date, the system will automatically swap them</p>
    </div>
</div>
:::

Common validation rules:

- End date must be later than or equal to start date
- Range days must comply with `minRange` and `maxRange` limits
- Dates must be within `minDate` and `maxDate` range
- Both dates cannot be empty

<script setup lang="ts">
import { ref,computed } from "vue";
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

// Basic examples
const basicRange = ref({ start: '', end: '' });
const timeRange = ref({ start: '', end: '' });
const requiredRange = ref({ start: '', end: '' });

// Input modes
const inputRange = ref({ start: '', end: '' });
const calendarOnlyRange = ref({ start: '', end: '' });

// Calendar display modes
const dualModeRange = ref({ start: '', end: '' });
const singleModeRange = ref({ start: '', end: '' });
const autoModeRange = ref({ start: '', end: '' });

// Shortcuts
const shortcutRange = ref({ start: '', end: '' });

// Range constraints
const maxRangeLimit = ref({ start: '', end: '' });
const minRangeLimit = ref({ start: '', end: '' });
const dateConstrainedRange = ref({ start: '', end: '' });
const minDate = '2025-01-01';
const maxDate = '2025-12-31';

// Calendar systems
const gregorianRange = ref({ start: '', end: '' });
const rocRange = ref({ start: '', end: '' });

// Theme modes
const lightRange = ref({ start: '', end: '' });
const darkRange = ref({ start: '', end: '' });

// Time configuration
const time24Range = ref({ start: '', end: '' });
const time12Range = ref({ start: '', end: '' });
const timeNoSecondsRange = ref({ start: '', end: '' });

// Output formats
const isoRange = ref({ start: '', end: '' });
const isoStrictRange = ref({ start: '', end: '' });
const jsDateRange = ref({ start: '', end: '' });
const objectRange = ref({ start: '', end: '' });
const customFormatRange = ref({ start: '', end: '' });

// Slot examples
const customShortcutRange = ref({ start: '', end: '' });

// Keyboard navigation
const keyboardNavRange = ref({ start: '', end: '' });

// Validation examples
const invalidRange = ref({ start: '', end: '' });
const autoCorrectRange = ref({ start: '', end: '' });

// Custom shortcut functions
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
