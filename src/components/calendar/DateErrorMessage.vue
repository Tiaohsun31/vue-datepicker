<!-- DateErrorMessage.vue -->
<template>
    <div v-if="hasErrors" class="mt-1 text-sm text-red-500">
        <!-- 預設的錯誤顯示邏輯 -->
        <div v-if="Array.isArray(processedErrors)">
            <div v-for="(error, index) in processedErrors" :key="index">
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
                <slot :name="getSlotName(field)" :field="field" :error="error" :message="error"
                    :originalKey="getOriginalKey(field)" :fieldType="getFieldType(field)">
                    <span>{{ error }}</span>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { localeManager, type LocaleKey } from '@/locale/index';

type ErrorsType = string | string[] | Record<string, string>;

interface ProcessedError {
    field: string;
    message: string;
    originalKey?: string;
}

interface Props {
    errors?: ErrorsType;
    errorParams?: Record<string, Record<string, any>>; // ✅ 新增：錯誤參數
    locale?: string;
    useI18n?: boolean;
    customMessages?: Record<string, string>;
    messageKeyMap?: Record<string, string>;
    debug?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    errors: undefined,
    errorParams: () => ({}), // ✅ 新增：預設空物件
    locale: 'zh-TW',
    useI18n: true,
    customMessages: () => ({}),
    messageKeyMap: () => ({}),
    debug: false
});

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

const allCustomMessages = computed(() => ({
    ...props.customMessages,
    ...internalCustomMessages.value
}));

const hasErrors = computed(() => {
    if (!props.errors) return false;

    if (Array.isArray(props.errors)) return props.errors.length > 0;
    if (typeof props.errors === 'string') return props.errors.trim().length > 0;
    if (typeof props.errors === 'object') {
        return Object.values(props.errors).some(error => error && error.trim().length > 0);
    }

    return false;
});

const processedErrors = computed(() => {
    if (!props.errors) return null;

    if (typeof props.errors === 'string') {
        return translateMessage(props.errors);
    }

    if (Array.isArray(props.errors)) {
        return props.errors.map((error, index) => ({
            field: `item-${index}`,
            message: translateMessage(error),
            originalKey: error
        }));
    }

    if (typeof props.errors === 'object') {
        const result: Record<string, string> = {};
        Object.entries(props.errors).forEach(([field, error]) => {
            if (error) {
                errorOriginalKeys.value[field] = error;

                // ✅ 修正：傳遞對應字段的參數
                const fieldParams = props.errorParams?.[field] || {};
                result[field] = translateMessage(error, field, fieldParams);

                if (props.debug) {
                    console.log(`Processing error for field "${field}":`, {
                        original: error,
                        params: fieldParams,
                        translated: result[field],
                        field,
                        slotName: getSlotName(field)
                    });
                }
            }
        });
        return result;
    }

    return props.errors;
});

function getOriginalKey(field: string): string | undefined {
    return errorOriginalKeys.value[field];
}

function getSlotName(field: string): string {
    const coreField = field.replace(/^(date|time|range)\./, '');
    return `error-${coreField}`;
}

function getFieldType(field: string): string {
    if (field.startsWith('date.')) return 'date';
    if (field.startsWith('time.')) return 'time';
    if (field.startsWith('range.')) return 'range';
    return 'unknown';
}

// ✅ 修正：translateMessage 現在正確使用參數
function translateMessage(message: string, field?: string, params: Record<string, any> = {}): string {
    if (props.debug) {
        console.log(`翻譯訊息: "${message}", field: "${field}", params:`, params);
    }

    // 1. 優先使用自定義訊息
    if (allCustomMessages.value[message]) {
        return allCustomMessages.value[message];
    }

    // 2. 如果關閉i18n，直接返回原始訊息
    if (!props.useI18n) {
        return message;
    }

    // 3. 檢查是否為 locale key
    const isLocaleKey = /^[a-zA-Z]+\.[a-zA-Z]+$/.test(message);

    if (isLocaleKey) {
        try {
            const translated = localeManager.getParameterizedErrorMessage(message, params);
            if (props.debug) {
                console.log(`Locale key 翻譯: "${message}" -> "${translated}" with params:`, params);
            }
            if (translated && translated !== message) {
                return translated;
            }
        } catch (error) {
            if (props.debug) console.warn(`Locale key 翻譯失敗: ${message}`, error);
        }
    }

    // 4. 嘗試使用messageKeyMap映射
    const i18nKey = props.messageKeyMap[message];
    if (i18nKey) {
        try {
            const translated = localeManager.getParameterizedErrorMessage(i18nKey, params);
            if (props.debug) {
                console.log(`MessageKeyMap 翻譯: "${message}" -> "${translated}" with params:`, params);
            }
            if (translated && translated !== i18nKey) {
                return translated;
            }
        } catch (error) {
            if (props.debug) console.warn(`MessageKeyMap 翻譯失敗: ${i18nKey}`, error);
        }
    }

    // 5. 智能模式匹配（作為最後的回退）
    return smartTranslateError(message, field, params);
}

// ✅ 修正：smartTranslateError 現在所有地方都使用參數
function smartTranslateError(message: string, field?: string, params: Record<string, any> = {}): string {
    if (props.debug) {
        console.log(`smartTranslateError: "${message}", field: "${field}", params:`, params);
    }

    // 簡化的直接匹配表
    const directMatches: Record<string, string> = {
        '請選擇日期': 'date.required',
        '請選擇時間': 'time.required',
        '請選擇開始日期': 'range.startRequired',
        '請選擇結束日期': 'range.endRequired',
        'Please select a date': 'date.required',
        'Please select a time': 'time.required',
        'Please select start date': 'range.startRequired',
        'Please select end date': 'range.endRequired',
    };

    // 先檢查直接匹配
    if (directMatches[message]) {
        try {
            const translated = localeManager.getParameterizedErrorMessage(directMatches[message], params);
            if (props.debug) {
                console.log(`直接匹配翻譯: "${message}" -> "${translated}" with params:`, params);
            }
            if (translated && translated !== directMatches[message]) {
                return translated;
            }
        } catch (error) {
            if (props.debug) console.warn(`直接匹配翻譯失敗: ${directMatches[message]}`, error);
        }
    }

    // 智能字段匹配
    function getI18nKeyByFieldAndMessage(message: string, field?: string): string | null {
        if (/請輸入|please enter|required/i.test(message)) {
            if (field?.includes('year') || message.includes('年份')) return 'year.required';
            if (field?.includes('month') || message.includes('月份')) return 'month.required';
            if (field?.includes('day') || message.includes('日期')) return 'day.required';
            if (field?.includes('hour') || message.includes('小時')) return 'time.hourRequired';
            if (field?.includes('minute') || message.includes('分鐘')) return 'time.minuteRequired';
            if (field?.includes('second') || message.includes('秒鐘')) return 'time.secondRequired';
            if (field?.includes('startDate') || message.includes('開始日期')) return 'range.startRequired';
            if (field?.includes('endDate') || message.includes('結束日期')) return 'range.endRequired';
            if (field?.includes('time') || message.includes('時間')) return 'time.required';
            if (field?.includes('date') || message.includes('日期')) return 'date.required';
        }
        return null;
    }

    // 模式匹配 - 必填錯誤
    const smartKey = getI18nKeyByFieldAndMessage(message, field);
    if (smartKey) {
        try {
            const translated = localeManager.getParameterizedErrorMessage(smartKey, params);
            if (props.debug) {
                console.log(`智能匹配翻譯: "${message}" -> "${translated}" with params:`, params);
            }
            if (translated && translated !== smartKey) {
                return translated;
            }
        } catch (error) {
            if (props.debug) console.warn(`智能匹配翻譯失敗: ${smartKey}`, error);
        }
    }

    // 複雜模式匹配
    const patterns = [
        {
            regex: /(年份|year).*(\d+)-(\d+).*數字/i,
            key: 'year.outOfRange'
        },
        {
            regex: /(月份|month).*1-12.*數字/i,
            key: 'month.outOfRange'
        },
        {
            regex: /(日期|day).*1-31.*數字/i,
            key: 'day.outOfRange'
        },
        {
            regex: /(小時|hour).*(\d+)-(\d+)/i,
            key: 'time.hourOutOfRange'
        },
        {
            regex: /(分鐘|minute).*0-59/i,
            key: 'time.minuteOutOfRange'
        },
        {
            regex: /(秒鐘|second).*0-59/i,
            key: 'time.secondOutOfRange'
        },
        {
            regex: /無效|invalid/i,
            key: null,
            handler: (field?: string) => {
                if (field?.includes('year')) return 'year.invalid';
                if (field?.includes('month')) return 'month.invalid';
                if (field?.includes('day')) return 'day.invalid';
                if (field?.includes('time') || field?.includes('hour') || field?.includes('minute') || field?.includes('second')) return 'time.invalid';
                return 'date.invalid';
            }
        }
    ];

    for (const pattern of patterns) {
        if (pattern.regex.test(message)) {
            const i18nKey = pattern.handler ? pattern.handler(field) : pattern.key;
            if (i18nKey) {
                try {
                    // ✅ 修正：所有模式匹配都使用參數
                    const translated = localeManager.getParameterizedErrorMessage(i18nKey, params);
                    if (props.debug) {
                        console.log(`模式匹配翻譯: "${message}" -> "${translated}" (key: ${i18nKey}) with params:`, params);
                    }
                    if (translated && translated !== i18nKey) {
                        return translated;
                    }
                } catch (error) {
                    if (props.debug) console.warn(`模式匹配翻譯失敗: ${i18nKey}`, error);
                }
            }
        }
    }

    // 如果都無法匹配，返回原始訊息
    if (props.debug) {
        console.log(`無法翻譯，返回原始訊息: "${message}"`);
    }
    return message;
}

defineExpose({
    hasErrors,
    processedErrors,
    translateMessage,
    getOriginalKey,
    getSlotName,
    getFieldType,
    setLocale: (locale: string) => {
        const localeKey = tryConvertToLocaleKey(locale);
        localeManager.setLocale(localeKey);
    },
    addCustomTranslation: (key: string, message: string) => {
        internalCustomMessages.value[key] = message;
    }
});
</script>
