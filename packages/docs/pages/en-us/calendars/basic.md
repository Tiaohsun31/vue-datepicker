# Calendar Systems

Vue DatePicker supports multiple calendar systems, powered by the robust [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/Calendar.html) package for internationalized date handling.

## Supported Calendar Systems

| Calendar System   | Identifier               | Region/Usage            |
| ----------------- | ------------------------ | ----------------------- |
| Gregorian         | `gregory`                | International (Default) |
| Republic of China | `roc`                    | Taiwan                  |
| Buddhist          | `buddhist`               | Buddhist Countries      |
| Japanese          | `japanese`               | Japan                   |
| Islamic           | `islamic-civil`          | Islamic Countries       |
| Persian           | `persian`                | Iran                    |
| Hebrew            | `hebrew`                 | Israel                  |
| Indian            | `indian`                 | India                   |
| Others            | `ethiopic`, `coptic` etc | Specific Regions        |

## Registering Calendars

Since v2.0, only the **Gregorian** calendar is built in. Every other calendar is **opt-in** — register it once at app startup so unused calendars can be tree-shaken out of your bundle.

```ts
// main.ts
import {
  registerCalendar,
  rocCalendar,
  buddhistCalendar,
  japaneseCalendar,
} from "@tiaohsun/vue-datepicker";

registerCalendar(rocCalendar);
registerCalendar(buddhistCalendar);
registerCalendar(japaneseCalendar);
```

```vue
<DatePicker v-model="date" calendar="roc" />
```

Using a calendar that hasn't been registered falls back to the Gregorian calendar and logs a warning in development.

### Built-in Descriptors

| Import                     | `calendar` id        |
| -------------------------- | -------------------- |
| `rocCalendar`              | `roc`                |
| `buddhistCalendar`         | `buddhist`           |
| `japaneseCalendar`         | `japanese`           |
| `persianCalendar`          | `persian`            |
| `hebrewCalendar`           | `hebrew`             |
| `indianCalendar`           | `indian`             |
| `copticCalendar`           | `coptic`             |
| `ethiopicCalendar`         | `ethiopic`           |
| `ethioaaCalendar`          | `ethioaa`            |
| `islamicCivilCalendar`     | `islamic-civil`      |
| `islamicTabularCalendar`   | `islamic-tbla`       |
| `islamicUmalquraCalendar`  | `islamic-umalqura`   |

### Helpers

```ts
import {
  isCalendarRegistered,
  getCalendarDescriptor,
} from "@tiaohsun/vue-datepicker";

isCalendarRegistered("roc"); // boolean
getCalendarDescriptor("roc"); // CalendarDescriptor | undefined
```

## Basic Usage

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
        <div class="py-1 px-2 bg-gray-100 rounded dark:bg-gray-800 text-sm">
            v-model: {{ date }}
        </div>
    </div>
</div>
:::

Use the interactive example above to experience the display effects of different calendar systems and languages.

::: info Important Notes

- Date and time input functionality only supports the `gregory` calendar system
- Output format defaults to `iso`, use `custom` for localized formats
- For advanced ROC formatting, see [ROC Formatting Plugin](./roc-plugin.md)
  :::

## Year Range Limitations

Different calendar systems have their own valid year ranges:

| Calendar | Min Year         | Max Year     | Description                                                                                               |
| -------- | ---------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| Gregory  | 1                | Current+100  | Gregorian era                                                                                             |
| ROC      | 1912             | Current+100  | ROC Year 1 corresponds to 1912 CE                                                                         |
| Buddhist | 544              | Current+643  | Buddhist era is 543 years earlier than Gregorian                                                          |
| Japanese | 1868             | Current+100  | Starting from Meiji Restoration                                                                           |
| Islamic  | 622              | Current+100  | Islamic era                                                                                               |
| Persian  | 622              | Current+100  | Persian era                                                                                               |
| Hebrew   | 1                | Current+3860 | Hebrew era                                                                                                |
| Others   | System dependent |              | See [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/Calendar.html) docs |

::: warning Notice

- Dates outside the valid range may cause unpredictable behavior
- Not all browsers fully support all calendar systems
- It's recommended to test compatibility with target browsers in production
- Unsupported environments will automatically fallback to Gregorian calendar
  :::

## API Reference

### Calendar Related Properties

| Property      | Type                                      | Default     | Description                   |
| ------------- | ----------------------------------------- | ----------- | ----------------------------- |
| `calendar`    | `string`                                  | `'gregory'` | Calendar system identifier    |
| `locale`      | `string`                                  | `'zh-TW'`   | Language localization setting |
| `output-type` | `'iso' \| 'date' \| 'object' \| 'custom'` | `'iso'`     | Output format type            |

<script setup lang="ts">
import { ref, computed } from 'vue';
import type OutputType  from '@tiaohsun/vue-datepicker';
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value === 'en-US' ? 'en-US' : 'zh-TW');

const date = ref('')
const selectedCalendar = ref('gregory')
const selectedLocale = ref(locale.value)
const selectedOutputType = ref<OutputType>('custom')
</script>
