<!-- DateErrorMessage.vue - 修復時間錯誤匹配 -->
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
    locale?: string;
    useI18n?: boolean;
    customMessages?: Record<string, string>;
    messageKeyMap?: Record<string, string>;
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
                result[field] = translateMessage(error, field);

                if (props.debug) {
                    console.log(`Processing error for field "${field}":`, {
                        original: error,
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

function translateMessage(message: string, field?: string): string {
    if (props.debug) {
        console.log(`Translating message: "${message}" for field: "${field}"`);
    }

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

function smartTranslateError(message: string, field?: string): string {
    // 基於字段和訊息內容的智能匹配 - 更精確版本
    function getI18nKeyByFieldAndMessage(message: string, field?: string): string | null {
        // 精確匹配具體字段的必填錯誤
        if (/請輸入|please enter|required/i.test(message)) {
            if (field?.includes('year') || message.includes('年份')) return 'year.required';
            if (field?.includes('month') || message.includes('月份')) return 'month.required';
            if (field?.includes('day') || message.includes('日期')) return 'day.required';

            // 時間字段的精確匹配
            if (field?.includes('hour') || message.includes('小時')) return 'time.hourRequired';
            if (field?.includes('minute') || message.includes('分鐘')) return 'time.minuteRequired';
            if (field?.includes('second') || message.includes('秒鐘')) return 'time.secondRequired';

            // 範圍相關
            if (field?.includes('startDate') || message.includes('開始日期')) return 'range.startRequired';
            if (field?.includes('endDate') || message.includes('結束日期')) return 'range.endRequired';

            // 通用時間和日期（作為後備）
            if (field?.includes('time') || message.includes('時間')) return 'time.required';
            if (field?.includes('date') || message.includes('日期')) return 'date.required';
        }

        return null;
    }

    // 簡化的直接匹配表 - 只保留最明確的匹配
    const directMatches: Record<string, string> = {
        // 精確匹配的錯誤訊息
        '請選擇日期': 'date.required',
        '請選擇時間': 'time.required',
        '請選擇開始日期': 'range.startRequired',
        '請選擇結束日期': 'range.endRequired',

        // 範圍錯誤
        '小時必須是 0-23 之間的數字': 'time.hourOutOfRange',
        '小時必須是 1-12 之間的數字': 'time.hourOutOfRange',
        '分鐘必須是 0-59 之間的數字': 'time.minuteOutOfRange',
        '秒鐘必須是 0-59 之間的數字': 'time.secondOutOfRange',

        // 英文錯誤訊息
        'Please select a date': 'date.required',
        'Please select a time': 'time.required',
        'Please select start date': 'range.startRequired',
        'Please select end date': 'range.endRequired',
    };

    // 先檢查直接匹配
    if (directMatches[message]) {
        try {
            const translated = localeManager.getMessage(directMatches[message]);
            if (translated && translated !== directMatches[message]) {
                return translated;
            }
        } catch (error) {
            if (props.debug) console.warn(`Translation failed for direct match: ${directMatches[message]}`);
        }
    }

    // 模式匹配 - 使用新的智能匹配函數
    if (/請輸入|please enter|required/i.test(message)) {
        const smartKey = getI18nKeyByFieldAndMessage(message, field);
        if (smartKey) {
            try {
                const translated = localeManager.getMessage(smartKey);
                if (translated && translated !== smartKey) {
                    return translated;
                }
            } catch (error) {
                if (props.debug) console.warn(`Translation failed for smart key: ${smartKey}`);
            }
        }
    }

    // 其他模式匹配
    const patterns = [
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
        {
            regex: /無效|invalid/i,
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
            const i18nKey = pattern.handler(field);
            try {
                const translated = localeManager.getMessage(i18nKey);
                if (translated && translated !== i18nKey) {
                    return translated;
                }
            } catch (error) {
                if (props.debug) console.warn(`Translation failed for pattern: ${i18nKey}`);
            }
        }
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
