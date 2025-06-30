# 錯誤訊息處理

Vue-datepicker 提供了完整的錯誤訊息處理機制，包含多語言支援和豐富的客製化選項。雖然內建支援了中文（繁體/簡體）、英文、日文、韓文等語言的錯誤訊息，但您可以輕鬆地客製化任何語言的錯誤訊息或覆寫預設行為。

## 預設錯誤訊息

組件內建了多種語言的錯誤訊息，當驗證失敗時會自動顯示對應的錯誤文字：

::: raw
<ClientOnly>

<div class="space-y-4">
 <div>
    <h4 class="text-lg font-semibold">中文（繁體）</h4>
    <DatePicker v-model="defaultError1" locale="zh-TW" required />
  </div>
  <div>
    <h4 class="text-lg font-semibold">英文</h4>
    <DatePicker v-model="defaultError2" locale="en-US" required />
  </div>
</div>
</ClientOnly>
:::

支援的語言包括：

- `zh-TW` - 繁體中文
- `zh-CN` - 簡體中文
- `en-US` - 英文
- `ja-JP` - 日文
- `ko-KR` - 韓文

## 客製化錯誤訊息

### 1. 使用 customErrorMessages 屬性

最簡單的方式是透過 `customErrorMessages` 屬性來覆寫特定的錯誤訊息：

::: raw
<DatePicker v-model="customMessage1" :customErrorMessages="customErrorMessages" required />
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
  "year.required": "年份不能空白喔！",
  "month.required": "別忘了月份",
  "day.required": "日期也要填寫",
  "date.required": "沒有選擇日期哦！",
  // 可以添加更多自定義訊息...
};
</script>
```

:::

### 2. 使用 Slot 完全客製化錯誤顯示

透過 `#error` slot 可以完全控制錯誤訊息的顯示方式：

::: raw

<div class="space-y-4">
  <DatePicker v-model="slotCustom1" min-date="2025-06-01" required>
    <template #error="{ errors, errorParams }">
      <div v-if="Object.keys(errors).length > 0" class="mt-2 p-3 bg-red-100 border-l-4 border-red-500">
        <h4 class="font-bold text-red-800">輸入錯誤：</h4>
        <ul class="list-disc list-inside text-red-700 text-sm">
          <li v-for="(error, field) in errors" :key="field">
            {{ getFieldName(field as string) }}: {{ error }}
            <span v-if="errorParams[field]">
                參數: {{ JSON.stringify(errorParams[field]) }}
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
        <h4 class="font-bold text-red-800">輸入錯誤：</h4>
        <ul class="list-disc list-inside text-red-700 text-sm">
          <li v-for="(error, field) in errors" :key="field">
            {{ getFieldName(field as string) }}: {{ error }}
            <span v-if="errorParams[field]">
              參數: {{ JSON.stringify(errorParams[field]) }}
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
  "date.year": "年份",
  "date.month": "月份",
  "date.day": "日期",
  "time.hour": "小時",
  "time.minute": "分鐘",
  "time.second": "秒鐘",
};

function getFieldName(field: string): string {
  return fieldNames[field] || field;
}
</script>
```

:::

### 3. 針對特定欄位的錯誤客製化

您可以針對特定欄位使用專門的 slot：

::: raw

<div class="space-y-4">
  <DatePicker v-model="fieldCustom1" min-date="2025-06-01" required>
    <template #error-year="{ message, field, originalKey, errorParams }">
      <div class="custom-year-error text-orange-600 font-bold">
        🚨 年份錯誤: {{ message }}
      </div>
    </template>
    <template #error-month="{ message, field, fieldType, errorParams }">
      <div class="custom-month-error text-blue-600 italic">
        📅 月份錯誤: {{ message }}
      </div>
    </template>
    <template #error-day="{ message, field, errorParams }" >
      <div class="custom-day-error text-purple-600 underline">
        📆 日期錯誤: {{ message }}
        <small v-if="errorParams && errorParams.minDate">
            最小日期: {{ errorParams.minDate }}
        </small>
      </div>
    </template>
    <template #error-date="{ message, field }">
      <div class="custom-date-error text-pink-600">
        📅 日期錯誤: {{ message }}
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
        🚨 年份錯誤: {{ message }}
      </div>
    </template>
    <template #error-month="{ message, field, fieldType, errorParams }">
      <div class="custom-month-error text-blue-600 italic">
        📅 月份錯誤: {{ message }}
      </div>
    </template>
    <template #error-day="{ message, field, errorParams }">
      <div class="custom-day-error text-purple-600 underline">
        📆 日期錯誤: {{ message }}
        <small v-if="errorParams && errorParams.minDate">
          最小日期: {{ errorParams.minDate }}
        </small>
      </div>
    </template>
    <template #error-date="{ message, field }">
      <div class="custom-date-error text-pink-600">
        📅 日期錯誤: {{ message }}
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

### 4. 程式化處理錯誤

如果您想要完全自行處理錯誤，可以關閉預設錯誤顯示並監聽 `validation` 事件：

::: raw

<div class="space-y-4">
  <DatePicker 
    v-model="programmaticError1" 
    locale="zh-TW" 
    :showErrorMessage="false"
    required 
    @validation="handleValidation" 
  />
  
  <!-- 自定義錯誤顯示區域 -->
  <div v-if="validationErrors.length > 0" class="mt-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
    <h4 class="text-yellow-800 font-semibold mb-2">⚠️ 請注意以下問題：</h4>
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
    locale="zh-TW"
    :showErrorMessage="false"
    required
    @validation="handleValidation"
  />

  <!-- 自定義錯誤顯示區域 -->
  <div
    v-if="validationErrors.length > 0"
    class="mt-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
  >
    <h4 class="text-yellow-800 font-semibold mb-2">⚠️ 請注意以下問題:</h4>
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
  console.log("驗證結果:", { isValid, errors, errorParams });
  validationErrors.value = Object.values(errors);
  // 安全檢查 errorParams
  if (errorParams) {
    console.log("錯誤參數:", errorParams);

    // 安全使用參數
    Object.entries(errors).forEach(([field, message]) => {
      const params = errorParams[field];
      if (params) {
        console.log(`欄位 ${field} 的參數:`, params);
      }
    });
  }
}
</script>
```

:::

```typescript
@validation="(isValid, errors, errorParams?) => {
  // isValid: boolean - 是否通過所有驗證
  // errors: Record<string, string> - 錯誤訊息，鍵為欄位名，值為錯誤訊息
  // errorParams?: Record<string, Record<string, any>> - 錯誤參數（可選），提供動態數值如日期範圍等
}"
```

## 錯誤訊息的國際化

### 完整語言包結構

以下是完整的語言包結構，您可以參考這個結構來建立自定義語言包：
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
      beforeMin: string; // 支援 {minDate} 參數
      afterMax: string; // 支援 {maxDate} 參數
      unsupportedFormat: string; // 支援 {formats} 參數
      parseError: string;
    };
    time: {
      required: string;
      invalid: string;
      hourOutOfRange: string; // 支援 {min}, {max} 參數
      minuteOutOfRange: string;
      secondOutOfRange: string;
      hourRequired: string;
      minuteRequired: string;
      secondRequired: string;
      minuteStepInvalid: string; // 支援 {step} 參數
    };
    year: {
      required: string;
      invalid: string;
      outOfRange: string; // 支援 {min}, {max} 參數
      notLeapYear: string; // 支援 {year} 參數
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
      notExistInMonth: string; // 支援 {month}, {maxDays} 參數
    };
    range: {
      startRequired: string;
      endRequired: string;
      startAfterEnd: string;
      exceedsMaxRange: string; // 支援 {maxRange} 參數
      belowMinRange: string; // 支援 {minRange} 參數
    };
    format: {
      dateFormat: string; // 支援 {original}, {fixed} 參數
      timeFormat: string; // 支援 {original}, {fixed} 參數
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
    yearRangeInfo: string; // 支援 {calendar}, {min}, {max} 參數
    noYearsToDisplay: string;
    returnToValidRange: string;
  };
}
```

:::

### 新增自定義語言包

如果您需要支援其他語言，可以透過 `customLocaleMessages` 屬性傳入完整的語言包：

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

### 停用國際化

如果您想完全自行控制錯誤訊息，可以停用內建的國際化功能：

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

## 進階錯誤處理

### 參數化錯誤訊息

某些錯誤訊息支援參數替換，讓訊息更具體：

```typescript
// 例如：日期範圍錯誤
"年份必須是 {min}-{max} 之間的數字"; // 會自動替換 {min} 和 {max}
```

## Props 說明

### 錯誤訊息相關 Props

| Prop 名稱              | 類型                     | 預設值      | 說明               |
| ---------------------- | ------------------------ | ----------- | ------------------ |
| `showErrorMessage`     | `boolean`                | `true`      | 是否顯示錯誤訊息   |
| `useI18n`              | `boolean`                | `true`      | 是否使用內建國際化 |
| `customErrorMessages`  | `Record<string, string>` | `{}`        | 自定義錯誤訊息映射 |
| `customLocaleMessages` | `LocaleMessages`         | `undefined` | 完整的自定義語言包 |
| `locale`               | `string`                 | `'zh-TW'`   | 語言環境           |

### 使用範例

```vue
<template>
  <!-- 基本用法：顯示預設錯誤訊息 -->
  <DatePicker v-model="date1" required />

  <!-- 自定義部分錯誤訊息 -->
  <DatePicker
    v-model="date2"
    :customErrorMessages="{ 'year.required': '請輸入年份！' }"
    required
  />

  <!-- 使用完整自定義語言包 -->
  <DatePicker
    v-model="date3"
    locale="fr-FR"
    :customLocaleMessages="frenchMessages"
    required
  />

  <!-- 關閉錯誤訊息顯示，使用程式化處理 -->
  <DatePicker
    v-model="date4"
    :showErrorMessage="false"
    @validation="handleValidation"
    required
  />
</template>
```

## Slot 說明

### 錯誤顯示 Slot

| Slot 名稱       | 參數                                                       | 說明                 |
| --------------- | ---------------------------------------------------------- | -------------------- |
| `error`         | `{ errors, errorParams?, hasErrors }`                      | 完整的錯誤物件和參數 |
| `error-{field}` | `{ message, field, errorParams?, originalKey, fieldType }` | 特定欄位的錯誤資訊   |

**參數詳細說明：**

- `errors`: `Record<string, string>` - 所有錯誤訊息
- `errorParams?`: `Record<string, Record<string, any>>` - 錯誤參數（可選）
- `hasErrors`: `boolean` - 是否有錯誤
- `message`: `string` - 錯誤訊息文字
- `field`: `string` - 欄位名稱
- `originalKey`: `string` - 原始錯誤鍵值
- `fieldType`: `string` - 欄位類型（date/time/range）

<script setup lang="ts">
import { ref, onMounted, nextTick,watch } from "vue";

// 預設錯誤訊息範例
const defaultError1 = ref(null);
const defaultError2 = ref(null);

// 客製化錯誤訊息範例
const customMessage1 = ref(null);
const slotCustom1 = ref(null);
const fieldCustom1 = ref(null);
const programmaticError1 = ref(null);
const noI18n1 = ref(null);
const customLocale1 = ref(null);
// 驗證錯誤狀態
const validationErrors = ref<string[]>([]);

// 自定義錯誤訊息
const customErrorMessages = {
    'year.required': '年份不能空白喔！',
    'month.required': '別忘了月份',
    'day.required': '日期也要填寫',
    "date.required": "沒有選擇日期哦！",
};

// 原始錯誤訊息（停用i18n時使用）
const rawErrorMessages = {
  'year.required': 'Please enter the year!',
  'month.required': 'Please enter the month!',
  'day.required': 'Please enter the day!',
};

// 欄位名稱映射
const fieldNames: Record<string, string> = {
    'date.year': '年份',
    'date.month': '月份',
    'date.day': '日期',
    'time.hour': '小時',
    'time.minute': '分鐘',
    'time.second': '秒鐘',
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
    
    // 延遲觸發以確保組件完全載入
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
