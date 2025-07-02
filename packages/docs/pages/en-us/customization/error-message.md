# Error Message Handling

Vue-datepicker provides a comprehensive error message handling mechanism, including multi-language support and rich customization options. While it has built-in support for error messages in Chinese (Traditional/Simplified), English, Japanese, Korean, and other languages, you can easily customize error messages in any language or override default behaviors.

## Default Error Messages

The component has built-in error messages in multiple languages, which automatically display corresponding error text when validation fails:

::: raw
<ClientOnly>

<div class="space-y-4">
 <div>
    <h4 class="text-lg font-semibold">Chinese (Traditional)</h4>
    <DatePicker v-model="defaultError1" locale="zh-TW" required />
  </div>
  <div>
    <h4 class="text-lg font-semibold">English</h4>
    <DatePicker v-model="defaultError2" locale="en-US" required />
  </div>
</div>
</ClientOnly>
:::

Supported languages include:

- `zh-TW` - Traditional Chinese
- `zh-CN` - Simplified Chinese
- `en-US` - English
- `ja-JP` - Japanese
- `ko-KR` - Korean

## Custom Error Messages

### 1. Using customErrorMessages Property

The simplest way is to override specific error messages through the `customErrorMessages` property:

::: raw
<DatePicker v-model="customMessage1" :locale="locale" :customErrorMessages="customErrorMessages" required />
:::

::: details Code Example

```vue
<template>
  <DatePicker
    v-model="customMessage1"
    :customErrorMessages="customErrorMessages"
    required
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const customErrorMessages = {
  "year.required": "Year cannot be empty!",
  "month.required": "Don't forget the month",
  "day.required": "Day must be filled in",
  "date.required": "No date selected!",
  // Add more custom messages...
};
</script>
```

:::

### 2. Using Slot for Complete Error Display Customization

Through the `#error` slot, you can completely control how error messages are displayed:

::: raw

<div class="space-y-4">
  <DatePicker v-model="slotCustom1" :locale="locale" min-date="2025-06-01" required>
    <template #error="{ errors, errorParams }">
      <div v-if="Object.keys(errors).length > 0" class="mt-2 p-3 bg-red-100 border-l-4 border-red-500">
        <h4 class="font-bold text-red-800">Input Error:</h4>
        <ul class="list-disc list-inside text-red-700 text-sm">
          <li v-for="(error, field) in errors" :key="field">
            {{ getFieldName(field as string) }}: {{ error }}
            <span v-if="errorParams[field]">
                Parameters: {{ JSON.stringify(errorParams[field]) }}
            </span>
          </li>
        </ul>
      </div>
    </template>
  </DatePicker>
</div>
:::

::: details Code Example

```vue
<template>
  <DatePicker v-model="slotCustom1" min-date="2025-06-01" required>
    <template #error="{ errors, errorParams }">
      <div
        v-if="Object.keys(errors).length > 0"
        class="mt-2 p-3 bg-red-100 border-l-4 border-red-500"
      >
        <h4 class="font-bold text-red-800">Input Error:</h4>
        <ul class="list-disc list-inside text-red-700 text-sm">
          <li v-for="(error, field) in errors" :key="field">
            {{ getFieldName(field as string) }}: {{ error }}
            <span v-if="errorParams[field]">
              Parameters: {{ JSON.stringify(errorParams[field]) }}
            </span>
          </li>
        </ul>
      </div>
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { ref } from "vue";
const slotCustom1 = ref(null);
const fieldNames: Record<string, string> = {
  "date.year": "Year",
  "date.month": "Month",
  "date.day": "Day",
  "time.hour": "Hour",
  "time.minute": "Minute",
  "time.second": "Second",
};

function getFieldName(field: string): string {
  return fieldNames[field] || field;
}
</script>
```

:::

### 3. Field-Specific Error Customization

You can use dedicated slots for specific fields:

::: raw

<div class="space-y-4">
  <DatePicker v-model="fieldCustom1" :locale="locale" min-date="2025-06-01" required>
    <template #error-year="{ message, field, originalKey, errorParams }">
      <div class="custom-year-error text-orange-600 font-bold">
        🚨 Year Error: {{ message }}
      </div>
    </template>
    <template #error-month="{ message, field, fieldType, errorParams }">
      <div class="custom-month-error text-blue-600 italic">
        📅 Month Error: {{ message }}
      </div>
    </template>
    <template #error-day="{ message, field, errorParams }" >
      <div class="custom-day-error text-purple-600 underline">
        📆 Day Error: {{ message }}
        <small v-if="errorParams && errorParams.minDate">
            Min Date: {{ errorParams.minDate }}
        </small>
      </div>
    </template>
    <template #error-date="{ message, field }">
      <div class="custom-date-error text-pink-600">
        📅 Date Error: {{ message }}
      </div>
    </template>
  </DatePicker>
</div>
:::

::: details Code Example

```vue
<template>
  <DatePicker v-model="fieldCustom1" min-date="2025-06-01" required>
    <template #error-year="{ message, field, originalKey, errorParams }">
      <div class="custom-year-error text-orange-600 font-bold">
        🚨 Year Error: {{ message }}
      </div>
    </template>
    <template #error-month="{ message, field, fieldType, errorParams }">
      <div class="custom-month-error text-blue-600 italic">
        📅 Month Error: {{ message }}
      </div>
    </template>
    <template #error-day="{ message, field, errorParams }">
      <div class="custom-day-error text-purple-600 underline">
        📆 Day Error: {{ message }}
        <small v-if="errorParams && errorParams.minDate">
          Min Date: {{ errorParams.minDate }}
        </small>
      </div>
    </template>
    <template #error-date="{ message, field }">
      <div class="custom-date-error text-pink-600">
        📅 Date Error: {{ message }}
      </div>
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { ref } from "vue";
const fieldCustom1 = ref(null);
</script>
```

:::

### 4. Programmatic Error Handling

If you want to handle errors completely on your own, you can disable default error display and listen to the `validation` event:

::: raw

<div class="space-y-4">
  <DatePicker 
    v-model="programmaticError1" 
    :locale="locale" 
    :showErrorMessage="false"
    required 
    @validation="handleValidation" 
  />
  
  <!-- Custom error display area -->
  <div v-if="validationErrors.length > 0" class="mt-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
    <h4 class="text-yellow-800 font-semibold mb-2">⚠️ Please note the following issues:</h4>
    <ul class="text-yellow-700 space-y-1">
      <li v-for="(error, index) in validationErrors" :key="index" class="flex items-center">
        <span class="mr-2">•</span>
        {{ error }}
      </li>
    </ul>
  </div>
</div>
:::

::: details Code Example

```vue
<template>
  <DatePicker
    v-model="programmaticError1"
    :showErrorMessage="false"
    required
    @validation="handleValidation"
  />

  <!-- Custom error display area -->
  <div
    v-if="validationErrors.length > 0"
    class="mt-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
  >
    <h4 class="text-yellow-800 font-semibold mb-2">
      ⚠️ Please note the following issues:
    </h4>
    <ul class="text-yellow-700 space-y-1">
      <li
        v-for="(error, index) in validationErrors"
        :key="index"
        class="flex items-center"
      >
        <span class="mr-2">•</span>
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const programmaticError1 = ref(null);
const validationErrors = ref<string[]>([]);

function handleValidation(
  isValid: boolean,
  errors: Record<string, string>,
  errorParams?: Record<string, Record<string, any>>
) {
  console.log("Validation result:", { isValid, errors, errorParams });
  validationErrors.value = Object.values(errors);
  // Safe check errorParams
  if (errorParams) {
    console.log("Error parameters:", errorParams);

    // Safe use of parameters
    Object.entries(errors).forEach(([field, message]) => {
      const params = errorParams[field];
      if (params) {
        console.log(`Parameters for field ${field}:`, params);
      }
    });
  }
}
</script>
```

:::

```typescript
@validation="(isValid, errors, errorParams?) => {
  // isValid: boolean - Whether all validations passed
  // errors: Record<string, string> - Error messages, key is field name, value is error message
  // errorParams?: Record<string, Record<string, any>> - Error parameters (optional), providing dynamic values like date ranges
}"
```

## Error Message Internationalization

### Complete Language Pack Structure

Here's the complete language pack structure, which you can reference to create custom language packs:

::: details Code Example

```typescript
interface LocaleMessages {
  error: {
    calendar: {
      unsupported: string;
    };
    date: {
      required: string;
      invalid: string;
      outOfRange: string;
      beforeMin: string; // Supports {minDate} parameter
      afterMax: string; // Supports {maxDate} parameter
      unsupportedFormat: string; // Supports {formats} parameter
      parseError: string;
    };
    time: {
      required: string;
      invalid: string;
      hourOutOfRange: string; // Supports {min}, {max} parameters
      minuteOutOfRange: string;
      secondOutOfRange: string;
      hourRequired: string;
      minuteRequired: string;
      secondRequired: string;
      minuteStepInvalid: string; // Supports {step} parameter
    };
    year: {
      required: string;
      invalid: string;
      outOfRange: string; // Supports {min}, {max} parameters
      notLeapYear: string; // Supports {year} parameter
    };
    month: {
      required: string;
      invalid: string;
      outOfRange: string;
    };
    day: {
      required: string;
      invalid: string;
      outOfRange: string;
      notExistInMonth: string; // Supports {month}, {maxDays} parameters
    };
    range: {
      startRequired: string;
      endRequired: string;
      startAfterEnd: string;
      exceedsMaxRange: string; // Supports {maxRange} parameter
      belowMinRange: string; // Supports {minRange} parameter
    };
    format: {
      dateFormat: string; // Supports {original}, {fixed} parameters
      timeFormat: string; // Supports {original}, {fixed} parameters
    };
  };
  placeholder: {
    date: {
      year: string;
      month: string;
      day: string;
    };
    time: {
      hour: string;
      minute: string;
      second: string;
    };
    general: {
      selectDate: string;
      selectTime: string;
      clear: string;
      time: string;
    };
    range: {
      start: string;
      end: string;
    };
  };
  yearSelector: {
    jumpToYear: string;
    inputYearPlaceholder: string;
    yearRangeInfo: string; // Supports {calendar}, {min}, {max} parameters
    noYearsToDisplay: string;
    returnToValidRange: string;
  };
}
```

:::

### Adding Custom Language Packs

If you need to support other languages, you can pass a complete language pack through the `customLocaleMessages` property:

::: raw

<div class="space-y-4">
  <DatePicker
    v-model="customLocale1"
    locale="fr-FR"
    :customLocaleMessages="frFRLocaleMessages"
    required
  />
</div>
:::

::: details Code Example

```vue
<template>
  <DatePicker
    v-model="customLocale1"
    locale="fr-FR"
    :customLocaleMessages="frFRLocaleMessages"
    required
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { LocaleMessages } from "@tiaohsun/vue-datepicker";

const customLocale1 = ref(null);

const frFRLocaleMessages: LocaleMessages = {
  error: {
    calendar: {
      unsupported: "Calendrier non supporté",
    },
    date: {
      required: "Veuillez sélectionner une date",
      invalid: "Date invalide",
      outOfRange: "Date hors de la plage autorisée",
      beforeMin: "La date ne peut pas être antérieure à {minDate}",
      afterMax: "La date ne peut pas être postérieure à {maxDate}",
      unsupportedFormat:
        "Format de date non supporté, formats supportés: {formats}",
      parseError: "Échec de l'analyse de la date, veuillez vérifier le format",
    },
    time: {
      required: "Veuillez sélectionner une heure",
      invalid: "Heure invalide",
      hourOutOfRange: "L'heure doit être entre {min}-{max}",
      minuteOutOfRange: "Les minutes doivent être entre 0-59",
      secondOutOfRange: "Les secondes doivent être entre 0-59",
      hourRequired: "Veuillez entrer l'heure",
      minuteRequired: "Veuillez entrer les minutes",
      secondRequired: "Veuillez entrer les secondes",
      minuteStepInvalid: "Les minutes doivent être un multiple de {step}",
    },
    year: {
      required: "Veuillez entrer une année",
      invalid: "Format d'année invalide",
      outOfRange: "L'année doit être entre {min}-{max}",
      notLeapYear:
        "Le 29 février n'existe pas en {year}, ce n'est pas une année bissextile",
    },
    month: {
      required: "Veuillez entrer le mois",
      invalid: "Format de mois invalide",
      outOfRange: "Le mois doit être entre 1-12",
    },
    day: {
      required: "Veuillez entrer le jour",
      invalid: "Format de jour invalide",
      outOfRange: "Le jour doit être entre 1-31",
      notExistInMonth: "Le mois {month} a au maximum {maxDays} jours",
    },
    range: {
      startRequired: "Veuillez sélectionner la date de début",
      endRequired: "Veuillez sélectionner la date de fin",
      startAfterEnd:
        "La date de début ne peut pas être postérieure à la date de fin",
      exceedsMaxRange:
        "La plage de sélection ne peut pas dépasser {maxRange} jours",
      belowMinRange:
        "La plage de sélection ne peut pas être inférieure à {minRange} jours",
    },
    format: {
      dateFormat:
        'Format de date invalide: "{original}" automatiquement corrigé en "{fixed}"',
      timeFormat:
        'Format d\'heure invalide: "{original}" automatiquement corrigé en "{fixed}"',
    },
  },
  placeholder: {
    date: {
      year: "AAAA",
      month: "MM",
      day: "JJ",
    },
    time: {
      hour: "HH",
      minute: "mm",
      second: "ss",
    },
    general: {
      selectDate: "Sélectionnez une date",
      selectTime: "Sélectionnez une heure",
      clear: "Effacer",
      time: "Heure",
    },
    range: {
      start: "Date de début",
      end: "Date de fin",
    },
  },
  yearSelector: {
    jumpToYear: "Aller à l'année",
    inputYearPlaceholder: "Entrez l'année grégorienne...",
    yearRangeInfo: "Plage d'années {calendar}: {min} - {max}",
    noYearsToDisplay: "Aucune année à afficher",
    returnToValidRange: "Retour à la plage valide",
  },
};
</script>
```

:::

### Disabling Internationalization

If you want to completely control error messages on your own, you can disable the built-in internationalization feature:

::: raw

<div class="space-y-4">
  <DatePicker
    v-model="noI18n1"
    :useI18n="false"
    :customErrorMessages="rawErrorMessages"
    required
  />
</div>
:::

```vue
<template>
  <DatePicker
    v-model="noI18n1"
    :useI18n="false"
    :customErrorMessages="rawErrorMessages"
    required
  />
  <script setup lang="ts">
    const rawErrorMessages = {
      "year.required": "Please enter the year!",
      "month.required": "Please enter the month!",
      "day.required": "Please enter the day!",
    };
  </script>
</template>
```

## Advanced Error Handling

### Parameterized Error Messages

Some error messages support parameter substitution to make messages more specific:

```typescript
// Example: Date range error
"Year must be a number between {min}-{max}"; // Will automatically replace {min} and {max}
```

## Props Description

### Error Message Related Props

| Prop Name              | Type                     | Default     | Description                    |
| ---------------------- | ------------------------ | ----------- | ------------------------------ |
| `showErrorMessage`     | `boolean`                | `true`      | Whether to show error messages |
| `useI18n`              | `boolean`                | `true`      | Whether to use built-in i18n   |
| `customErrorMessages`  | `Record<string, string>` | `{}`        | Custom error message mapping   |
| `customLocaleMessages` | `LocaleMessages`         | `undefined` | Complete custom language pack  |
| `locale`               | `string`                 | `'zh-TW'`   | Language environment           |

### Usage Examples

```vue
<template>
  <!-- Basic usage: Show default error messages -->
  <DatePicker v-model="date1" required />

  <!-- Custom partial error messages -->
  <DatePicker
    v-model="date2"
    :customErrorMessages="{ 'year.required': 'Please enter year!' }"
    required
  />

  <!-- Use complete custom language pack -->
  <DatePicker
    v-model="date3"
    locale="fr-FR"
    :customLocaleMessages="frenchMessages"
    required
  />

  <!-- Disable error message display, use programmatic handling -->
  <DatePicker
    v-model="date4"
    :showErrorMessage="false"
    @validation="handleValidation"
    required
  />
</template>
```

## Slot Description

### Error Display Slots

| Slot Name       | Parameters                                                 | Description                          |
| --------------- | ---------------------------------------------------------- | ------------------------------------ |
| `error`         | `{ errors, errorParams?, hasErrors }`                      | Complete error object and parameters |
| `error-{field}` | `{ message, field, errorParams?, originalKey, fieldType }` | Specific field error information     |

**Parameter Details:**

- `errors`: `Record<string, string>` - All error messages
- `errorParams?`: `Record<string, Record<string, any>>` - Error parameters (optional)
- `hasErrors`: `boolean` - Whether there are errors
- `message`: `string` - Error message text
- `field`: `string` - Field name
- `originalKey`: `string` - Original error key
- `fieldType`: `string` - Field type (date/time/range)

<script setup lang="ts">
import { ref, onMounted, nextTick,watch,computed } from "vue";
import { useData } from 'vitepress'

const { lang } = useData()
const locale = computed(() => lang.value);

// Default error message examples
const defaultError1 = ref(null);
const defaultError2 = ref(null);

// Custom error message examples
const customMessage1 = ref(null);
const slotCustom1 = ref(null);
const fieldCustom1 = ref(null);
const programmaticError1 = ref(null);
const noI18n1 = ref(null);
const customLocale1 = ref(null);
// Validation error state
const validationErrors = ref<string[]>([]);

// Custom error messages
const customErrorMessages = {
    'year.required': 'Year cannot be empty!',
    'month.required': 'Don\'t forget the month',
    'day.required': 'Day must be filled in',
    "date.required": "No date selected!",
};

// Raw error messages (used when i18n is disabled)
const rawErrorMessages = {
  'year.required': 'Please enter the year!',
  'month.required': 'Please enter the month!',
  'day.required': 'Please enter the day!',
};

// Field name mapping
const fieldNames: Record<string, string> = {
    'date.year': 'Year',
    'date.month': 'Month',
    'date.day': 'Day',
    'time.hour': 'Hour',
    'time.minute': 'Minute',
    'time.second': 'Second',
};

function getFieldName(field: string): string {
    return fieldNames[field] || field;
}

function handleValidation(
    isValid: boolean,
    errors: Record<string, string>,
    errorParams?: Record<string, Record<string, any>>
) {
    validationErrors.value = Object.values(errors);
}

const triggerInitialValidation = (ref: any) => {
    if (ref?.validate) {
        ref.validate();
    }
};

onMounted(async () => {
    await nextTick();
    
    // Delayed trigger to ensure component is fully loaded
    setTimeout(() => {
        document.querySelectorAll('.date-picker-wrapper').forEach((element, index) => {
            const component = element.__vueParentComponent?.exposed;
            if (component?.validate) {
                component.validate();
            }
        });
    }, 200);
});

const frFRLocaleMessages: LocaleMessages = {
  error: {
    calendar: {
      unsupported: "Calendrier non supporté",
    },
    date: {
      required: "Veuillez sélectionner une date",
      invalid: "Date invalide",
      outOfRange: "Date hors de la plage autorisée",
      beforeMin: "La date ne peut pas être antérieure à {minDate}",
      afterMax: "La date ne peut pas être postérieure à {maxDate}",
      unsupportedFormat:
        "Format de date non supporté, formats supportés: {formats}",
      parseError: "Échec de l'analyse de la date, veuillez vérifier le format",
    },
    time: {
      required: "Veuillez sélectionner une heure",
      invalid: "Heure invalide",
      hourOutOfRange: "L'heure doit être entre {min}-{max}",
      minuteOutOfRange: "Les minutes doivent être entre 0-59",
      secondOutOfRange: "Les secondes doivent être entre 0-59",
      hourRequired: "Veuillez entrer l'heure",
      minuteRequired: "Veuillez entrer les minutes",
      secondRequired: "Veuillez entrer les secondes",
      minuteStepInvalid: "Les minutes doivent être un multiple de {step}",
    },
    year: {
      required: "Veuillez entrer une année",
      invalid: "Format d'année invalide",
      outOfRange: "L'année doit être entre {min}-{max}",
      notLeapYear:
        "Le 29 février n'existe pas en {year}, ce n'est pas une année bissextile",
    },
    month: {
      required: "Veuillez entrer le mois",
      invalid: "Format de mois invalide",
      outOfRange: "Le mois doit être entre 1-12",
    },
    day: {
      required: "Veuillez entrer le jour",
      invalid: "Format de jour invalide",
      outOfRange: "Le jour doit être entre 1-31",
      notExistInMonth: "Le mois {month} a au maximum {maxDays} jours",
    },
    range: {
      startRequired: "Veuillez sélectionner la date de début",
      endRequired: "Veuillez sélectionner la date de fin",
      startAfterEnd:
        "La date de début ne peut pas être postérieure à la date de fin",
      exceedsMaxRange:
        "La plage de sélection ne peut pas dépasser {maxRange} jours",
      belowMinRange:
        "La plage de sélection ne peut pas être inférieure à {minRange} jours",
    },
    format: {
      dateFormat:
        'Format de date invalide: "{original}" automatiquement corrigé en "{fixed}"',
      timeFormat:
        'Format d\'heure invalide: "{original}" automatiquement corrigé en "{fixed}"',
    },
  },
  placeholder: {
    date: {
      year: "AAAA",
      month: "MM",
      day: "JJ",
    },
    time: {
      hour: "HH",
      minute: "mm",
      second: "ss",
    },
    general: {
      selectDate: "Sélectionnez une date",
      selectTime: "Sélectionnez une heure",
      clear: "Effacer",
      time: "Heure",
    },
    range: {
      start: "Date de début",
      end: "Date de fin",
    },
  },
  yearSelector: {
    jumpToYear: "Aller à l'année",
    inputYearPlaceholder: "Entrez l'année grégorienne...",
    yearRangeInfo: "Plage d'années {calendar}: {min} - {max}",
    noYearsToDisplay: "Aucune année à afficher",
    returnToValidRange: "Retour à la plage valide",
  },
};
</script>
