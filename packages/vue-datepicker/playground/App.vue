<template>
    <div>
        <h3>E2E Test區域</h3>
        <div class="space-y-4">
            <!-- 基本日期選擇器 -->
            <DatePicker v-model="dateTime" mode="dark" :required="true" :showTime="true"></DatePicker>

            <!-- 使用 disabled 來禁用日期選擇器 -->
            <DatePicker data-testid="disabled-date-picker" v-model="dateTime2" calendar="japanese" mode="dark"
                :disabled="true" :showTime="true"></DatePicker>

            <!-- 使用roc日期選擇器 -->
            <DatePicker data-testid="roc-date-picker" v-model="rocDate" calendar="roc" locale="zh-TW"
                date-format="ROC-YYYY-MM-DD" time-format="A HH時mm分" />

            <!-- 使用roc日期選擇器並啟用時間 但不使用插件 -->
            <DatePicker v-model="rocDate1" calendar="roc" locale="zh-TW" :showTime="true" output-type="custom"
                customDefaultTime="00:00:00" />

            {{ dateTime }}
            <DatePicker v-model="dateTime" :showTime="true" :use24Hour="false" output-type="custom" />

            <!-- 自定義格式 -->
            {{ dateTime }}
            <DatePicker v-model="dateTime" date-format="DD/MM/YYYY" output-type="custom"></DatePicker>

            <!-- 基本日期範圍選擇器 -->
            <div class="p-4 max-w-3xl">
                <DateRange v-model="selectedDate" />
            </div>

            <!-- 帶快捷選項的日期範圍選擇器 -->
            <DateRange data-testid="date-range-with-shortcuts" v-model="selectedDateWithShortcuts" :showShortcuts="true"
                :showTime="true" />

            <!-- 禁用的日期範圍選擇器 -->
            <DateRange data-testid="disabled-date-range" v-model="disabledSelectedDate" :disabled="true" />

            <!-- 有日期限制的日期範圍選擇器 -->
            <DateRange data-testid="constrained-date-range" v-model="constrainedSelectedDate"
                :minDate="new Date('2025-06-01')" :maxDate="new Date('2025-06-30')" />

            <!-- 民國曆日期範圍選擇器 -->
            <DateRange data-testid="roc-date-range" v-model="rocSelectedDate" calendar="roc" locale="zh-TW" />

            <!-- 深色主題日期範圍選擇器 -->
            <DateRange data-testid="dark-date-range" v-model="darkSelectedDate" mode="dark" theme="blue" />
        </div>
    </div>

    <!-- 使用十六進制顏色 -->
    <DatePicker v-model="dateTime" theme="#ff0000" />

    <!-- 使用 RGB 顏色 -->
    <DatePicker v-model="dateTime" theme="rgb(255, 0, 0)" />

    <!-- 使用 OKLCH 顏色 -->
    <DatePicker v-model="dateTime" theme="oklch(63.7% 0.237 25.331)" />

    <!-- 切換日曆系統 -->
    <div class="space-y-4">
        <div class="flex justify-end gap-2">
            <div class="flex-1">
                <select v-model="locale" name="locale" id="locale"
                    class="w-full rounded bg-white py-1 px-2 text-base border border-gray-200 dark:bg-slate-900 dark:border-gray-700">
                    <option value="zh-TW"> 繁體中文 </option>
                    <option value="en-US"> English </option>
                    <option value="ja-JP"> 日本語 </option>
                    <option value="zh-CN"> 简体中文 </option>
                    <option value="ko-KR"> 한국어 </option>
                </select>
            </div>
            <div class="flex-1">
                <select v-model="calendar" name="calendar" id="calendar"
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
                <select v-model="outputType" name="outputType" id="outputType"
                    class="w-full rounded bg-white py-1 px-2 text-base border border-gray-200 dark:bg-slate-900 dark:border-gray-700">
                    <option value="iso"> ISO 8601 </option>
                    <option value="custom"> Custom </option>
                </select>
            </div>
        </div>
        <div>
            <DatePicker v-model="dateTime" :calendar="calendar" :locale="locale" :outputType="outputType" />
            {{ dateTime }}
        </div>
        <div>
            <DatePicker v-model="dateTime" locale="fr-FR" min-date="2025-06-01"
                :customLocaleMessages="frFRLocaleMessages" required>
            </DatePicker>
        </div>
        <div>
            <DatePicker v-model="dateTime" locale="zh-TW" min-date="2025-06-01" required @validation="handleValidation">
            </DatePicker>
        </div>

        <div class="space-y-2">
            <h4 class="font-semibold">24小時制時間範圍</h4>
            <DateRange v-model="time24Range" :showTime="true" :use24Hour="true" />
        </div>
        <div class="space-y-2">
            <h4 class="font-semibold">12小時制時間範圍</h4>
            <DateRange v-model="time12Range" :showTime="true" :use24Hour="false" :enableSeconds="false" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DatePicker from '@/DatePicker.vue';
import DateRange from '@/DateRange.vue';
import type { OutputType } from '@/types/main';
import { RocFormatPlugin, type LocaleMessages } from '@tiaohsun/vue-datepicker';

// 民國113年6月15日
const rocDate = ref(null);
const rocDate1 = ref(null);
const dateTime = ref('2025-05-22'); // ISO 8601 格式
const dateTime2 = ref('2025-05-22 06:22:12');

// 新增 DateRange 測試變數
const selectedDate = ref({
    start: '',
    end: '',
});

const selectedDateWithShortcuts = ref({
    start: '',
    end: '',
});

const disabledSelectedDate = ref({
    start: '',
    end: '',
});

const constrainedSelectedDate = ref({
    start: '',
    end: '',
});

const rocSelectedDate = ref({
    start: '',
    end: '',
});

const darkSelectedDate = ref({
    start: '',
    end: '',
});

const locale = ref('zh-TW');
const calendar = ref('gregory');
const outputType = ref<OutputType>('iso');



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

const isSupported = rocPlugin.supportsFormat("ROC-YYYY-MM-DD");
console.log(isSupported); // true

const isNotSupported = rocPlugin.supportsFormat("YYYY-MM-DD");
console.log(isNotSupported); // false

// 無效輸入處理
const invalidInput = rocPlugin.parseInput("無效日期", "zh-TW");
console.log(invalidInput); // null

// 超出範圍的年份
const outOfRange = rocPlugin.parseInput("民國300年01月01日", "zh-TW");
console.log(outOfRange); // null

// 無效日期（如2月30日）
const invalidDate = rocPlugin.parseInput("民國113年02月30日", "zh-TW");
console.log(invalidDate); // null

// 法文語言包
const frFRLocaleMessages = {
    error: {
        calendar: {
            unsupported: 'Calendrier non supporté',
        },
        date: {
            required: 'Veuillez sélectionner une date',
            invalid: 'Date invalide',
            outOfRange: 'Date hors de la plage autorisée',
            beforeMin: 'La date ne peut pas être antérieure à {minDate}',
            afterMax: 'La date ne peut pas être postérieure à {maxDate}',
            unsupportedFormat: 'Format de date non supporté, formats supportés: {formats}',
            parseError: 'Échec de l\'analyse de la date, veuillez vérifier le format',
        },
        time: {
            required: 'Veuillez sélectionner une heure',
            invalid: 'Heure invalide',
            hourOutOfRange: 'L\'heure doit être entre {min}-{max}',
            minuteOutOfRange: 'Les minutes doivent être entre 0-59',
            secondOutOfRange: 'Les secondes doivent être entre 0-59',
            hourRequired: 'Veuillez entrer l\'heure',
            minuteRequired: 'Veuillez entrer les minutes',
            secondRequired: 'Veuillez entrer les secondes',
            minuteStepInvalid: 'Les minutes doivent être un multiple de {step}',
        },
        year: {
            required: 'Veuillez entrer une année',
            invalid: 'Format d\'année invalide',
            outOfRange: 'L\'année doit être entre {min}-{max}',
            notLeapYear: 'Le 29 février n\'existe pas en {year}, ce n\'est pas une année bissextile',
        },
        month: {
            required: 'Veuillez entrer le mois',
            invalid: 'Format de mois invalide',
            outOfRange: 'Le mois doit être entre 1-12',
        },
        day: {
            required: 'Veuillez entrer le jour',
            invalid: 'Format de jour invalide',
            outOfRange: 'Le jour doit être entre 1-31',
            notExistInMonth: 'Le mois {month} a au maximum {maxDays} jours',
        },
        range: {
            startRequired: 'Veuillez sélectionner la date de début',
            endRequired: 'Veuillez sélectionner la date de fin',
            startAfterEnd: 'La date de début ne peut pas être postérieure à la date de fin',
            exceedsMaxRange: 'La plage de sélection ne peut pas dépasser {maxRange} jours',
            belowMinRange: 'La plage de sélection ne peut pas être inférieure à {minRange} jours',
        },
        format: {
            dateFormat: 'Format de date invalide: "{original}" automatiquement corrigé en "{fixed}"',
            timeFormat: 'Format d\'heure invalide: "{original}" automatiquement corrigé en "{fixed}"',
        },
    },
    placeholder: {
        date: {
            year: 'AAAA',
            month: 'MM',
            day: 'JJ'
        },
        time: {
            hour: 'HH',
            minute: 'mm',
            second: 'ss'
        },
        general: {
            selectDate: 'Sélectionnez une date',
            selectTime: 'Sélectionnez une heure',
            clear: 'Effacer',
            time: 'Heure',
        },
        range: {
            start: 'Date de début',
            end: 'Date de fin',
        }
    },
    yearSelector: {
        jumpToYear: 'Aller à l\'année',
        inputYearPlaceholder: 'Entrez l\'année grégorienne...',
        yearRangeInfo: 'Plage d\'années {calendar}: {min} - {max}',
        noYearsToDisplay: 'Aucune année à afficher',
        returnToValidRange: 'Retour à la plage valide',
    }
};

function handleValidation(
    isValid: boolean,
    errors: Record<string, string>,
    errorParams?: Record<string, Record<string, any>>
) {
    console.log('驗證結果:', { isValid, errors, errorParams });

    // 安全檢查 errorParams
    if (errorParams) {
        console.log('錯誤參數:', errorParams);

        // 安全使用參數
        Object.entries(errors).forEach(([field, message]) => {
            const params = errorParams[field];
            if (params) {
                console.log(`欄位 ${field} 的參數:`, params);
            }
        });
    }
}

const time24Range = ref({
    start: '2025-06-01 08:00',
    end: '2025-06-01 18:00',
});
const time12Range = ref({
    start: '',
    end: '',
});
</script>
