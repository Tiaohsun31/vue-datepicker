<!-- DateInput.vue -->
<template>
    <!-- 年份/月份/日期輸入組 -->
    <div class="flex items-center justify-start">
        <!-- 根據格式順序動態排序輸入字段 -->
        <template v-for="(segment, index) in dateSegments" :key="segment">
            <!-- 渲染對應的輸入框 -->
            <input v-if="segment === 'year'" :ref="(el) => setInputRef(el as HTMLInputElement, 'year')"
                v-model="yearValue" v-autowidth="20" type="text" inputmode="numeric" :placeholder="yearPlaceholder"
                :maxlength="4" class="date-input text-sm text-center active:bg-vdt-theme-100" @input="handleYearInput"
                @keydown="handleKeydown($event, 'year')" @focus="handleFocus('year')" @blur="handleBlur('year')"
                aria-label="year" :aria-invalid="!!errors.year"
                :aria-errormessage="errors.year ? 'year-error' : undefined" />

            <input v-else-if="segment === 'month'" :ref="(el) => setInputRef(el as HTMLInputElement, 'month')"
                v-model="monthValue" v-autowidth="20" type="text" inputmode="numeric" :placeholder="monthPlaceholder"
                :maxlength="2" class="date-input text-sm text-center" @input="handleMonthInput"
                @keydown="handleKeydown($event, 'month')" @focus="handleFocus('month')" @blur="handleBlur('month')"
                aria-label="month" :aria-invalid="!!errors.month"
                :aria-errormessage="errors.month ? 'month-error' : undefined" />

            <input v-else-if="segment === 'day'" :ref="(el) => setInputRef(el as HTMLInputElement, 'day')"
                v-model="dayValue" type="text" v-autowidth="20" inputmode="numeric" :placeholder="dayPlaceholder"
                :maxlength="2" class="date-input text-sm text-center" @input="handleDayInput"
                @keydown="handleKeydown($event, 'day')" @focus="handleFocus('day')" @blur="handleBlur('day')"
                aria-label="day" :aria-invalid="!!errors.day"
                :aria-errormessage="errors.day ? 'day-error' : undefined" />

            <!-- 分隔符，除非是最後一個段 -->
            <span v-if="index < dateSegments.length - 1" class="text-gray-400">{{ separator }}</span>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import dayjs from 'dayjs';
import { isNumeric, isLeapYear } from '@/utils/validationUtils';
import vAutowidthDirective from '@/directives/v-autowidth';
import { dayjsParseDate } from '@/utils/dateUtils';

const vAutowidth = {
    mounted: vAutowidthDirective.mounted,
    updated: vAutowidthDirective.updated,
    beforeUnmount: vAutowidthDirective.beforeUnmount
};

type DateFieldType = 'year' | 'month' | 'day';
type DateField = Record<string, string>;

interface Props {
    modelValue?: string | null;
    yearPlaceholder?: string;
    monthPlaceholder?: string;
    dayPlaceholder?: string;
    minDate?: string | null;
    maxDate?: string | null;
    required?: boolean;
    separator?: string;
    dateFormat?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    yearPlaceholder: '',
    monthPlaceholder: '',
    dayPlaceholder: '',
    minDate: null,
    maxDate: null,
    required: true,
    separator: '-',
    dateFormat: 'YYYY-MM-DD'
});

const emit = defineEmits<{
    'update:modelValue': [value: string | null];
    'validation': [isValid: boolean, errors: DateField];
    'complete': [date: string];
}>();

// 內部狀態
const yearValue = ref<string>('');
const monthValue = ref<string>('');
const dayValue = ref<string>('');
const errors = ref<DateField>({});
const focused = ref<DateFieldType | null>(null);
const isInitialized = ref<boolean>(false);

// 使用 Map 來存儲 DOM 引用 - 修復重點
const inputRefs = ref<Map<DateFieldType, HTMLInputElement>>(new Map());

// 設置輸入框引用的函數
const setInputRef = (el: HTMLInputElement | null, fieldType: DateFieldType) => {
    if (el && el instanceof HTMLInputElement) {
        inputRefs.value.set(fieldType, el);
    } else {
        inputRefs.value.delete(fieldType);
    }
};

// 獲取輸入框引用的輔助函數
const getInputRef = (fieldType: DateFieldType): HTMLInputElement | undefined => {
    return inputRefs.value.get(fieldType);
};

// 計算屬性
const hasErrors = computed(() => Object.keys(errors.value).length > 0);
const errorMessages = computed(() => Object.values(errors.value));

// 根據日期格式順序計算段排序
const dateSegments = computed(() => {
    const format = props.dateFormat.toUpperCase();

    // 更精確的解析，處理各種可能的格式
    const segments: ('year' | 'month' | 'day')[] = [];
    const tokens = format.split(/[^A-Z]+/).filter(Boolean);

    tokens.forEach(token => {
        if (token.includes('Y')) segments.push('year');
        else if (token.includes('M')) segments.push('month');
        else if (token.includes('D')) segments.push('day');
    });

    // 確保有基本的三個組件
    if (segments.length !== 3) {
        console.warn(`Invalid date format: ${props.dateFormat}, falling back to YYYY-MM-DD`);
        return ['year', 'month', 'day'];
    }

    return segments;
});

// 組合的日期字符串 (YYYY-MM-DD 格式)
const dateString = computed(() => {
    if (!yearValue.value || !monthValue.value || !dayValue.value) {
        return null;
    }

    const year = yearValue.value.padStart(4, '0');
    const month = monthValue.value.padStart(2, '0');
    const day = dayValue.value.padStart(2, '0');

    return `${year}-${month}-${day}`;
});

// 格式化的日期字符串 (根據 dateFormat 屬性)
const formattedDateString = computed(() => {
    if (!dateString.value) return null;

    const date = dayjs(dateString.value);
    if (!date.isValid()) return null;

    return date.format(props.dateFormat);
});

// 監聽外部 modelValue 變化
watch(() => props.modelValue, (newValue) => {
    if (!isInitialized.value) {
        isInitialized.value = true;
    }

    if (newValue) {
        const date = dayjsParseDate(newValue, props.dateFormat);
        if (date.isValid()) {
            yearValue.value = date.format('YYYY');
            monthValue.value = date.format('MM');
            dayValue.value = date.format('DD');
        }
    } else {
        yearValue.value = '';
        monthValue.value = '';
        dayValue.value = '';
    }
}, { immediate: true });

// 聚焦到第一個輸入框
const focusFirstInput = () => {
    if (dateSegments.value.length === 0) return;

    const firstSegment = dateSegments.value[0] as DateFieldType;
    const inputElement = getInputRef(firstSegment);

    if (inputElement && typeof inputElement.focus === 'function') {
        try {
            inputElement.focus();
        } catch (error) {
            console.warn('無法聚焦到輸入框:', error);
        }
    } else {
        // 如果第一個輸入框不可用，嘗試其他輸入框
        for (const segment of dateSegments.value) {
            const element = getInputRef(segment as DateFieldType);
            if (element && typeof element.focus === 'function') {
                try {
                    element.focus();
                    break;
                } catch (error) {
                    console.warn('無法聚焦到輸入框:', error);
                }
            }
        }
    }
};

// 安全地聚焦到元素
const safelyFocus = (fieldType: DateFieldType) => {
    const element = getInputRef(fieldType);
    if (element && typeof element.focus === 'function') {
        try {
            element.focus();
        } catch (error) {
            console.warn(`無法聚焦到 ${fieldType} 輸入框:`, error);
        }
    }
};

// 安全地聚焦到元素並設定游標位置
const safelyFocusAndSetCursor = (fieldType: DateFieldType, position: 'start' | 'end') => {
    const element = getInputRef(fieldType);
    if (!element) return;

    try {
        // 先聚焦
        if (typeof element.focus === 'function') {
            element.focus();
        }

        // 設定游標位置
        if (typeof element.setSelectionRange === 'function') {
            const length = position === 'end' ? element.value.length : 0;
            element.setSelectionRange(length, length);
        }
    } catch (error) {
        console.warn(`無法聚焦或設置游標位置到 ${fieldType} 輸入框:`, error);
    }
};

// 獲取指定年月的天數
const getDaysInMonth = (year: number, month: number): number => {
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }

    return daysInMonth[month];
};

// 驗證單個字段
const validateField = (field: DateFieldType, value: string): boolean => {
    if (!value) return true;

    const numValue = parseInt(value);

    switch (field) {
        case 'year':
            if (value.length < 4) return true;
            const maxYear = props.maxDate ? dayjs(props.maxDate).year() : new Date().getFullYear() + 50;
            const minYear = props.minDate ? dayjs(props.minDate).year() : 1;
            if (!isNumeric(value) || numValue < minYear || numValue > maxYear) {
                errors.value[field] = `年份必須是 ${minYear}-${maxYear} 之間的數字`;
                return false;
            }

            if (monthValue.value === '02' && dayValue.value === '29') {
                if (!isLeapYear(numValue)) {
                    errors.value.day = `${numValue}年2月沒有29日，不是閏年`;
                    return false;
                }
            }
            break;

        case 'month':
            if (!isNumeric(value) || numValue < 1 || numValue > 12) {
                errors.value[field] = '月份必須是 1-12 之間的數字';
                return false;
            }

            if (dayValue.value && yearValue.value) {
                const yearNum = parseInt(yearValue.value);
                const daysInSelectedMonth = getDaysInMonth(yearNum, numValue);
                const currentDay = parseInt(dayValue.value);

                if (currentDay > daysInSelectedMonth) {
                    errors.value.day = `${value}月最多只有${daysInSelectedMonth}天`;
                    return false;
                }
            }
            break;

        case 'day':
            if (!isNumeric(value) || numValue < 1 || numValue > 31) {
                errors.value[field] = '日期必須是 1-31 之間的數字';
                return false;
            }

            if (yearValue.value && monthValue.value) {
                const year = parseInt(yearValue.value);
                const month = parseInt(monthValue.value);
                const daysInMonth = getDaysInMonth(year, month);

                if (numValue > daysInMonth) {
                    if (month === 2 && numValue === 29) {
                        errors.value[field] = `${year}年2月沒有29日，不是閏年`;
                    } else {
                        errors.value[field] = `${monthValue.value}月最多只有${daysInMonth}天`;
                    }
                    return false;
                }
            }
            break;
    }

    if (errors.value[field]) {
        delete errors.value[field];
    }

    return true;
};

// 驗證並發送事件
const validateAndEmit = () => {
    if (!isInitialized.value) return;

    errors.value = {};

    validateField('year', yearValue.value);
    validateField('month', monthValue.value);
    validateField('day', dayValue.value);

    if (props.required && (!yearValue.value || !monthValue.value || !dayValue.value)) {
        if (!yearValue.value) errors.value.year = '請輸入年份';
        if (!monthValue.value) errors.value.month = '請輸入月份';
        if (!dayValue.value) errors.value.day = '請輸入日期';
    }
    if (dateString.value) {
        const date = dayjs(dateString.value);

        if (!date.isValid()) {
            errors.value.day = '無效的日期';
        } else {
            if (props.minDate && date.isBefore(dayjs(props.minDate))) {
                errors.value.day = `日期不能早於 ${dayjs(props.minDate).format(props.dateFormat)}`;
            } else if (props.maxDate && date.isAfter(dayjs(props.maxDate))) {
                errors.value.day = `日期不能晚於 ${dayjs(props.maxDate).format(props.dateFormat)}`;
            } else if (formattedDateString.value) {
                emit('update:modelValue', formattedDateString.value);
                emit('complete', formattedDateString.value);
            }
        }
    } else if (isInitialized.value && !yearValue.value && !monthValue.value && !dayValue.value) {
        emit('update:modelValue', null);
    }

    emit('validation', !hasErrors.value, errors.value);
};

// 重置所有輸入欄位
const resetFields = () => {
    yearValue.value = '';
    monthValue.value = '';
    dayValue.value = '';
    errors.value = {};
};

// 處理字段填寫完成後的邏輯
const handleFieldCompletion = (field: DateFieldType) => {
    const fieldIndex = dateSegments.value.findIndex(segment => segment === field);
    const nextSegment = fieldIndex < dateSegments.value.length - 1 ? dateSegments.value[fieldIndex + 1] : null;

    if (nextSegment) {
        nextTick(() => {
            safelyFocus(nextSegment as DateFieldType);
        });
    } else {
        validateAndEmit();
    }
};

// 輸入處理函數
const handleInputBase = (field: DateFieldType, value: string, maxLength: number, autoFillThreshold?: number) => {
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length <= maxLength) {
        if (autoFillThreshold && cleanValue.length === 1 && parseInt(cleanValue) > autoFillThreshold) {
            const paddedValue = cleanValue.padStart(2, '0');

            if (field === 'year') yearValue.value = paddedValue;
            else if (field === 'month') monthValue.value = paddedValue;
            else if (field === 'day') dayValue.value = paddedValue;

            handleFieldCompletion(field);
        } else {
            if (field === 'year') yearValue.value = cleanValue;
            else if (field === 'month') monthValue.value = cleanValue;
            else if (field === 'day') dayValue.value = cleanValue;
        }

        const isValid = validateField(field, cleanValue);
        if (!isValid) return;

        if (cleanValue.length === maxLength) {
            handleFieldCompletion(field);
        }
    }
};

// 年份輸入處理
const handleYearInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    handleInputBase('year', target.value, 4);
};

// 月份輸入處理
const handleMonthInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    handleInputBase('month', target.value, 2, 1);
};

// 日期輸入處理
const handleDayInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    handleInputBase('day', target.value, 2, 3);
};

// 聚焦到最後一個輸入框的方法 - 用於從 TimeInput 導航回來
const focusLastInput = () => {
    nextTick(() => {
        if (dateSegments.value.length === 0) return;

        const lastSegment = dateSegments.value[dateSegments.value.length - 1] as DateFieldType;
        const inputElement = getInputRef(lastSegment);

        if (inputElement && typeof inputElement.focus === 'function') {
            try {
                inputElement.focus();
                // 將游標設置到末尾
                const length = inputElement.value.length;
                inputElement.setSelectionRange(length, length);
            } catch (error) {
                console.warn('無法聚焦到最後一個輸入框:', error);
            }
        }
    });
};

// 鍵盤事件處理
const handleKeydown = (event: KeyboardEvent, field: string) => {
    const target = event.target as HTMLInputElement;

    const currentIndex = dateSegments.value.findIndex(segment => segment === field);
    const prevSegment = currentIndex > 0 ? dateSegments.value[currentIndex - 1] as DateFieldType : null;
    const nextSegment = currentIndex < dateSegments.value.length - 1 ? dateSegments.value[currentIndex + 1] as DateFieldType : null;

    // 退格鍵處理
    if (event.key === 'Backspace' && target.value === '') {
        if (prevSegment) {
            event.preventDefault();
            safelyFocusAndSetCursor(prevSegment, 'end');
        }
    }

    // 左箭頭鍵處理
    if (event.key === 'ArrowLeft' && target.selectionStart === 0) {
        if (prevSegment) {
            event.preventDefault();
            safelyFocusAndSetCursor(prevSegment, 'end');
        }
    }

    // 右箭頭鍵處理
    if (event.key === 'ArrowRight' && target.selectionStart === target.value.length) {
        if (nextSegment) {
            event.preventDefault();
            safelyFocusAndSetCursor(nextSegment, 'start');
        }
    }

    // Enter 鍵完成輸入
    if (event.key === 'Enter') {
        validateAndEmit();
    }
};

// 聚焦處理
const handleFocus = (field: DateFieldType) => {
    focused.value = field;
};

const handleBlur = (field: DateFieldType) => {
    validateAndEmit();
    focused.value = null;
};

// 提供方法給父組件 -
defineExpose({
    validate: validateAndEmit,
    reset: () => {
        resetFields();
        emit('update:modelValue', null);
    },
    getErrors: () => ({ ...errors.value }),
    hasErrors: () => hasErrors.value,
    errorMessages: () => errorMessages.value,
    focus: focusFirstInput,
    focusLast: focusLastInput,
    setDate: (dateStr: string) => {
        if (dateStr) {
            const date = dayjs(dateStr);
            if (date.isValid()) {
                yearValue.value = date.format('YYYY');
                monthValue.value = date.format('MM');
                dayValue.value = date.format('DD');
                validateAndEmit();
            }
        } else {
            resetFields();
            emit('update:modelValue', null);
        }
    }
});
</script>

<style scoped>
/* 處理輸入框樣式覆蓋 @tailwindcss/forms */
.date-input {
    appearance: none !important;
    background-color: transparent !important;
    border-width: 0 !important;
    border-color: transparent !important;
    border-radius: 0 !important;
    padding: 0 !important;
    outline: none !important;
    box-shadow: none !important;
    transition: background-color 0.2s ease;
}

.date-input:focus {
    background-color: var(--vdt-theme-100) !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
}

/* 隱藏數字輸入框的箭頭 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
