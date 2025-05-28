<!-- DateErrorMessage.vue -->
<template>
    <div v-if="hasErrors" class="mt-1 text-sm text-red-500">

        <!-- 預設的錯誤顯示邏輯 -->
        <div v-if="Array.isArray(processedErrors)">
            <div v-for="(error, index) in processedErrors" :key="index">
                <!-- 嘗試使用具名 slot，回退到預設顯示 -->
                <slot :name="`error-${error.field}`" :error="error" :message="error.message" :field="error.field">
                    <span>{{ error.message }}</span>
                </slot>
            </div>
        </div>

        <div v-else-if="typeof processedErrors === 'string'">
            <slot name="error-single" :error="processedErrors" :message="processedErrors">
                <span>{{ processedErrors }}</span>
            </slot>
        </div>

        <div v-else-if="typeof processedErrors === 'object'">
            <div v-for="(error, field) in processedErrors" :key="field">
                <!-- 關鍵修復：為每個字段提供具名 slot，處理帶點號的字段名 -->
                <slot :name="getSlotName(field)" :field="field" :error="error" :message="error"
                    :originalKey="getOriginalKey(field)" :fieldType="getFieldType(field)">
                    <!-- 預設顯示 -->
                    <span>{{ error }}</span>
                </slot>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { localeManager, type LocaleKey } from '@/locale/index';

// 錯誤類型定義
type ErrorField = 'year' | 'month' | 'day' | 'date' | 'time' | 'startDate' | 'endDate' | 'startTime' | 'endTime';
type ErrorsType = string | string[] | Partial<Record<ErrorField | string, string>>;

interface ProcessedError {
    field: string;
    message: string;
    originalKey?: string;
}

interface Props {
    errors?: ErrorsType;
    locale?: string;
    // 是否使用內建的i18n（可選關閉）
    useI18n?: boolean;
    // 自定義錯誤訊息映射
    customMessages?: Record<string, string>;
    // 錯誤鍵值映射到i18n路徑
    messageKeyMap?: Record<string, string>;
    // 是否顯示調試信息
    debug?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    errors: undefined,
    locale: 'zh-TW',
    useI18n: true,
    customMessages: () => ({}),
    messageKeyMap: () => ({}),
    debug: false
});

// 嘗試將string轉換為LocaleKey
const tryConvertToLocaleKey = (locale: string): LocaleKey => {
    const validLocales: LocaleKey[] = ['zh-TW', 'zh-CN', 'en-US', 'ja-JP', 'ko-KR'];
    return validLocales.includes(locale as LocaleKey) ? (locale as LocaleKey) : 'zh-TW';
};

// 設置當前語言
if (props.useI18n && props.locale) {
    const localeKey = tryConvertToLocaleKey(props.locale);
    localeManager.setLocale(localeKey);
}

// 監聽語言變化
watch(() => props.locale, (newLocale) => {
    if (newLocale && props.useI18n) {
        const localeKey = tryConvertToLocaleKey(newLocale);
        localeManager.setLocale(localeKey);
    }
});

// 內部狀態
const internalCustomMessages = ref<Record<string, string>>({});
const errorOriginalKeys = ref<Record<string, string>>({});

// 合併自定義訊息
const allCustomMessages = computed(() => ({
    ...props.customMessages,
    ...internalCustomMessages.value
}));

// 檢查是否有錯誤
const hasErrors = computed(() => {
    if (!props.errors) return false;

    if (Array.isArray(props.errors)) return props.errors.length > 0;
    if (typeof props.errors === 'string') return props.errors.trim().length > 0;
    if (typeof props.errors === 'object') {
        return Object.values(props.errors).some(error => error && error.trim().length > 0);
    }

    return false;
});

// 處理錯誤訊息，支援i18n
const processedErrors = computed(() => {
    if (!props.errors) return null;

    // 如果是字符串，嘗試轉換
    if (typeof props.errors === 'string') {
        return translateMessage(props.errors);
    }

    // 如果是陣列
    if (Array.isArray(props.errors)) {
        return props.errors.map((error, index) => ({
            field: `item-${index}`,
            message: translateMessage(error),
            originalKey: error
        }));
    }

    // 如果是物件 - 這是最重要的部分
    if (typeof props.errors === 'object') {
        const result: Record<string, string> = {};
        Object.entries(props.errors).forEach(([field, error]) => {
            if (error) {
                // 保存原始錯誤鍵值
                errorOriginalKeys.value[field] = error;
                result[field] = translateMessage(error, field);

                // 調試輸出
                if (props.debug) {
                    console.log(`Processing error for field "${field}":`, {
                        original: error,
                        translated: result[field],
                        field
                    });
                }
            }
        });
        return result;
    }

    return props.errors;
});

/**
 * 獲取字段的原始錯誤鍵值
 */
function getOriginalKey(field: string): string | undefined {
    return errorOriginalKeys.value[field];
}

/**
 * 將字段名轉換為有效的 slot 名稱
 * 例如：'date.year' -> 'error-year'
 */
function getSlotName(field: string): string {
    // 移除前綴，只保留核心字段名
    const coreField = field.replace(/^(date|time|range)\./, '');
    return `error-${coreField}`;
}

/**
 * 獲取字段的類型（用於額外的 slot 屬性）
 */
function getFieldType(field: string): string {
    if (field.startsWith('date.')) return 'date';
    if (field.startsWith('time.')) return 'time';
    if (field.startsWith('range.')) return 'range';
    return 'unknown';
}

/**
 * 翻譯訊息的核心函數
 */
function translateMessage(message: string, field?: string): string {
    // 1. 優先使用自定義訊息
    if (allCustomMessages.value[message]) {
        return allCustomMessages.value[message];
    }

    // 2. 如果關閉i18n，直接返回原始訊息
    if (!props.useI18n) {
        return message;
    }

    // 3. 嘗試使用messageKeyMap映射
    const i18nKey = props.messageKeyMap[message];
    if (i18nKey) {
        try {
            const translated = localeManager.getMessage(i18nKey);
            if (translated && translated !== i18nKey) {
                return translated;
            }
        } catch (error) {
            if (props.debug) console.warn(`Translation failed for key: ${i18nKey}`);
        }
    }

    // 4. 智能匹配常見錯誤模式
    const smartTranslated = smartTranslateError(message, field);
    if (smartTranslated !== message) {
        return smartTranslated;
    }

    // 5. 返回原始訊息
    return message;
}

/**
 * 智能翻譯錯誤訊息
 */
function smartTranslateError(message: string, field?: string): string {
    // 先嘗試直接匹配具體的錯誤訊息
    const directMatches: Record<string, string> = {
        // 中文錯誤訊息直接映射
        '請輸入年份': 'year.required',
        '請輸入月份': 'month.required',
        '請輸入日期': 'day.required',
        '請選擇日期': 'date.required',
        '請選擇時間': 'time.required',
        '請選擇開始日期': 'range.startRequired',
        '請選擇結束日期': 'range.endRequired',

        // 英文錯誤訊息直接映射
        'Please enter year': 'year.required',
        'Please enter month': 'month.required',
        'Please enter day': 'day.required',
        'Please select a date': 'date.required',
        'Please select a time': 'time.required',
        'Please select start date': 'range.startRequired',
        'Please select end date': 'range.endRequired',

        // 其他語言的常見錯誤（可擴展）
        'Year is required': 'year.required',
        'Month is required': 'month.required',
        'Day is required': 'day.required',
        'Date is required': 'date.required',
        'Time is required': 'time.required',
    };

    // 先檢查直接匹配
    if (directMatches[message]) {
        try {
            const translated = localeManager.getMessage(directMatches[message]);
            if (translated && translated !== directMatches[message]) {
                return translated;
            }
        } catch (error) {
            console.warn(`Translation failed for direct match: ${directMatches[message]}`);
        }
    }

    // 如果沒有直接匹配，使用模式匹配
    const patterns = [
        // 必填欄位模式 - 根據field參數決定翻譯鍵
        {
            regex: /請輸入|please enter|required/i,
            handler: (field?: string) => {
                let key = 'date.required'; // 預設值

                if (field === 'year') key = 'year.required';
                else if (field === 'month') key = 'month.required';
                else if (field === 'day') key = 'day.required';
                else if (field === 'time') key = 'time.required';
                else if (field === 'startDate') key = 'range.startRequired';
                else if (field === 'endDate') key = 'range.endRequired';
                else if (field === 'startTime') key = 'time.required';
                else if (field === 'endTime') key = 'time.required';

                return key;
            }
        },

        // 範圍錯誤模式
        {
            regex: /(年份|year).*(\d+)-(\d+).*數字/i,
            handler: () => 'year.outOfRange'
        },
        {
            regex: /(月份|month).*1-12.*數字/i,
            handler: () => 'month.outOfRange'
        },
        {
            regex: /(日期|day).*1-31.*數字/i,
            handler: () => 'day.outOfRange'
        },

        // 時間範圍錯誤
        {
            regex: /(小時|hour).*(\d+)-(\d+)/i,
            handler: () => 'time.hourOutOfRange'
        },
        {
            regex: /(分鐘|minute).*0-59/i,
            handler: () => 'time.minuteOutOfRange'
        },
        {
            regex: /(秒鐘|second).*0-59/i,
            handler: () => 'time.secondOutOfRange'
        },

        // 閏年錯誤
        {
            regex: /(\d+)年2月.*29日.*閏年|february 29.*(\d+).*leap year/i,
            handler: () => 'year.notLeapYear'
        },

        // 月份天數錯誤
        {
            regex: /(\d+)月.*(\d+)天|month.*(\d+).*(\d+) days/i,
            handler: () => 'day.notExistInMonth'
        },

        // 無效格式
        {
            regex: /無效|invalid/i,
            handler: (field?: string) => {
                if (field === 'year') return 'year.invalid';
                if (field === 'month') return 'month.invalid';
                if (field === 'day') return 'day.invalid';
                if (field === 'time') return 'time.invalid';
                return 'date.invalid';
            }
        }
    ];

    // 嘗試模式匹配
    for (const pattern of patterns) {
        if (pattern.regex.test(message)) {
            const i18nKey = pattern.handler(field);

            try {
                const translated = localeManager.getMessage(i18nKey);
                if (translated && translated !== i18nKey) {
                    return translated;
                }
            } catch (error) {
                console.warn(`Translation failed for pattern match: ${i18nKey}`);
                continue;
            }
        }
    }

    // 如果都沒匹配到，返回原始訊息
    return message;
}

// 暴露給父組件的方法
defineExpose({
    hasErrors,
    processedErrors,
    translateMessage,
    getOriginalKey,
    getSlotName,
    getFieldType,

    // 手動設置語言
    setLocale: (locale: string) => {
        const localeKey = tryConvertToLocaleKey(locale);
        localeManager.setLocale(localeKey);
    },

    addCustomTranslation: (key: string, message: string) => {
        internalCustomMessages.value[key] = message;
    }
});
</script>
