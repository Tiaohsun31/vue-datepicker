<template>
    <!-- 年份/月份/日期輸入組 -->
    <div class="flex items-center justify-start">
        <!-- 根據格式順序動態排序輸入字段 -->
        <template v-for="(segment, index) in dateSegments" :key="segment">
            <!-- 渲染對應的輸入框 -->
            <input v-if="segment === 'year'" ref="yearRef" v-model="yearValue" v-autowidth="20" type="text"
                inputmode="numeric" :placeholder="yearPlaceholder" :maxlength="4" class="date-input text-sm text-center"
                @input="handleYearInput" @keydown="handleKeydown($event, 'year')" @focus="handleFocus('year')"
                @blur="handleBlur('year')" aria-label="year" :aria-invalid="!!errors.year"
                :aria-errormessage="errors.year ? 'year-error' : undefined" />

            <input v-else-if="segment === 'month'" ref="monthRef" v-model="monthValue" v-autowidth="20" type="text"
                inputmode="numeric" :placeholder="monthPlaceholder" :maxlength="2"
                class="date-input text-sm text-center" @input="handleMonthInput"
                @keydown="handleKeydown($event, 'month')" @focus="handleFocus('month')" @blur="handleBlur('month')"
                aria-label="month" :aria-invalid="!!errors.month"
                :aria-errormessage="errors.month ? 'month-error' : undefined" />

            <input v-else-if="segment === 'day'" ref="dayRef" v-model="dayValue" type="text" v-autowidth="20"
                inputmode="numeric" :placeholder="dayPlaceholder" :maxlength="2" class="date-input text-sm text-center"
                @input="handleDayInput" @keydown="handleKeydown($event, 'day')" @focus="handleFocus('day')"
                @blur="handleBlur('day')" aria-label="day" :aria-invalid="!!errors.day"
                :aria-errormessage="errors.day ? 'day-error' : undefined" />

            <!-- 分隔符，除非是最後一個段 -->
            <span v-if="index < dateSegments.length - 1" class="text-gray-400 mx-1">{{ separator }}</span>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import dayjs from 'dayjs';
import { isNumeric, isLeapYear } from '@/utils/validationUtils';
import vAutowidthDirective from '@/directives/v-autowidth';

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
    autoFocus?: boolean;
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
    autoFocus: false,
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

// DOM 引用
const yearRef = ref<HTMLInputElement>();
const monthRef = ref<HTMLInputElement>();
const dayRef = ref<HTMLInputElement>();

// 計算屬性
const hasErrors = computed(() => Object.keys(errors.value).length > 0);
const errorMessages = computed(() => Object.values(errors.value));

// 根據日期格式順序計算段排序
const dateSegments = computed(() => {
    const format = props.dateFormat.toUpperCase();

    // 使用正則表達式找出所有的格式標記 (YYYY、MM、DD)
    const formatMatches = format.match(/(YYYY|MM|DD)/g) || [];

    // 將格式標記轉換為對應的欄位名稱，並過濾掉 undefined
    return formatMatches.map(segment => {
        if (segment === 'YYYY') return 'year';
        if (segment === 'MM') return 'month';
        if (segment === 'DD') return 'day';
        return undefined;
    }).filter(Boolean);
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
        const date = dayjs(newValue);
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

// 自動聚焦
onMounted(() => {
    if (props.autoFocus && yearRef.value) {
        yearRef.value.focus();
    }
});

/**
 * 獲取指定年月的天數
 */
const getDaysInMonth = (year: number, month: number): number => {
    // 月份對應的天數 (非閏年)
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 檢查閏年 (2月為29天)
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }

    return daysInMonth[month];
};

/**
 * 驗證單個字段
 */
const validateField = (field: DateFieldType, value: string): boolean => {
    if (!value) return true; // 空值在必填檢查中處理

    const numValue = parseInt(value);

    switch (field) {
        case 'year':
            if (value.length < 4) return true;
            const maxYear = props.maxDate ? dayjs(props.maxDate).year() : new Date().getFullYear() + 10;
            const minYear = props.minDate ? dayjs(props.minDate).year() : 1;
            if (!isNumeric(value) || numValue < minYear || numValue > maxYear) {
                errors.value[field] = `年份必須是 ${minYear}-${maxYear} 之間的數字`;
                return false;
            }

            // 如果月日已填，檢查閏年情況
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

            // 更智能的日期驗證: 當月份改變時，驗證日期是否合理
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
            // 基本日期範圍檢查
            if (!isNumeric(value) || numValue < 1 || numValue > 31) {
                errors.value[field] = '日期必須是 1-31 之間的數字';
                return false;
            }

            // 詳細的日期驗證，考慮月份和閏年
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

    // 如果該字段沒有錯誤，刪除對應的錯誤信息
    if (errors.value[field]) {
        delete errors.value[field];
    }

    return true;
};

/**
 * 驗證並發送事件
 */
const validateAndEmit = () => {
    // 如果還沒初始化，不進行驗證
    if (!isInitialized.value) return;

    // 清除所有錯誤
    errors.value = {};

    // 驗證個別字段
    validateField('year', yearValue.value);
    validateField('month', monthValue.value);
    validateField('day', dayValue.value);

    // 檢查必填項
    if (props.required && (!yearValue.value || !monthValue.value || !dayValue.value)) {
        if (!yearValue.value) errors.value.year = '請輸入年份';
        if (!monthValue.value) errors.value.month = '請輸入月份';
        if (!dayValue.value) errors.value.day = '請輸入日期';
    }

    // 組合並驗證完整日期
    if (dateString.value) {
        const date = dayjs(dateString.value);

        if (!date.isValid()) {
            errors.value.day = '無效的日期';
        } else {
            // 檢查日期範圍
            if (props.minDate && date.isBefore(dayjs(props.minDate))) {
                errors.value.day = `日期不能早於 ${dayjs(props.minDate).format(props.dateFormat)}`;
            } else if (props.maxDate && date.isAfter(dayjs(props.maxDate))) {
                errors.value.day = `日期不能晚於 ${dayjs(props.maxDate).format(props.dateFormat)}`;
            } else if (formattedDateString.value) {
                // 日期有效，發送完成事件
                emit('update:modelValue', dateString.value);
                emit('complete', formattedDateString.value);
            }
        }
    } else if (isInitialized.value && !yearValue.value && !monthValue.value && !dayValue.value) {
        // 只有在已初始化且三個字段都為空時，才設置為 null
        emit('update:modelValue', null);
    }

    // 發送驗證結果
    emit('validation', !hasErrors.value, errors.value);
};

/**
 * 重置所有輸入欄位
 */
const resetFields = () => {
    yearValue.value = '';
    monthValue.value = '';
    dayValue.value = '';
    errors.value = {};
};

// 輸入處理函數
const handleInputBase = (field: DateFieldType, value: string, maxLength: number, autoFillThreshold?: number) => {
    // 只保留數字
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length <= maxLength) {
        // 自動補零處理
        if (autoFillThreshold && cleanValue.length === 1 && parseInt(cleanValue) > autoFillThreshold) {
            const paddedValue = cleanValue.padStart(2, '0');

            // 設置值
            if (field === 'year') yearValue.value = paddedValue;
            else if (field === 'month') monthValue.value = paddedValue;
            else if (field === 'day') dayValue.value = paddedValue;

            // 自動跳轉到下一個字段
            handleFieldCompletion(field);
        } else {
            // 設置值
            if (field === 'year') yearValue.value = cleanValue;
            else if (field === 'month') monthValue.value = cleanValue;
            else if (field === 'day') dayValue.value = cleanValue;
        }

        // 驗證
        const isValid = validateField(field, cleanValue);
        if (!isValid) return;

        // 如果達到最大長度，處理字段完成
        if (cleanValue.length === maxLength) {
            handleFieldCompletion(field);
        }
    }
};

// 處理字段填寫完成後的邏輯
const handleFieldCompletion = (field: DateFieldType) => {
    const fieldIndex = dateSegments.value.findIndex(segment => segment === field);
    const nextSegment = fieldIndex < dateSegments.value.length - 1 ? dateSegments.value[fieldIndex + 1] : null;

    if (nextSegment) {
        nextTick(() => {
            if (nextSegment === 'year') safelyFocus(yearRef.value!);
            else if (nextSegment === 'month') safelyFocus(monthRef.value!);
            else if (nextSegment === 'day') safelyFocus(dayRef.value!);
        });
    } else {
        // 如果沒有下一個字段，則驗證並發送
        validateAndEmit();
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
// 輔助函數：安全地聚焦到元素
const safelyFocus = (refValue: HTMLInputElement | HTMLInputElement[]) => {
    if (Array.isArray(refValue)) {
        const element = refValue[0];
        if (element && typeof element.focus === 'function') {
            element.focus();
        }
    } else if (refValue && typeof refValue.focus === 'function') {
        refValue.focus();
    }
};
// 鍵盤事件處理
const handleKeydown = (event: KeyboardEvent, field: string) => {
    const target = event.target as HTMLInputElement;

    // 確定當前字段在序列中的位置
    const currentIndex = dateSegments.value.findIndex(segment => segment === field);
    const prevSegment = currentIndex > 0 ? dateSegments.value[currentIndex - 1] : null;
    const nextSegment = currentIndex < dateSegments.value.length - 1 ? dateSegments.value[currentIndex + 1] : null;

    // 退格鍵處理
    if (event.key === 'Backspace' && target.value === '') {
        if (prevSegment) {
            event.preventDefault();
            const prevRef = prevSegment === 'year' ? yearRef.value :
                prevSegment === 'month' ? monthRef.value : dayRef.value;
            safelyFocusAndSetCursor(prevRef!, 'end');
        }
    }

    // 左箭頭鍵處理
    if (event.key === 'ArrowLeft' && target.selectionStart === 0) {
        if (prevSegment) {
            event.preventDefault();
            const prevRef = prevSegment === 'year' ? yearRef.value :
                prevSegment === 'month' ? monthRef.value : dayRef.value;
            safelyFocusAndSetCursor(prevRef!, 'end');
        }
    }

    // 右箭頭鍵處理
    if (event.key === 'ArrowRight' && target.selectionStart === target.value.length) {
        if (nextSegment) {
            event.preventDefault();
            const nextRef = nextSegment === 'year' ? yearRef.value :
                nextSegment === 'month' ? monthRef.value : dayRef.value;
            safelyFocusAndSetCursor(nextRef!, 'start');
        }
    }

    // Enter 鍵完成輸入
    if (event.key === 'Enter') {
        validateAndEmit();
    }
};

// 輔助函數：安全地聚焦到元素並設定游標位置
const safelyFocusAndSetCursor = (refValue: HTMLInputElement | HTMLInputElement[], position: 'start' | 'end') => {
    // 先聚焦
    safelyFocus(refValue);

    // 設定游標位置
    if (Array.isArray(refValue)) {
        const element = refValue[0];
        if (element && typeof element.setSelectionRange === 'function') {
            const length = position === 'end' ? element.value.length : 0;
            element.setSelectionRange(length, length);
        }
    } else if (refValue && typeof refValue.setSelectionRange === 'function') {
        const length = position === 'end' ? refValue.value.length : 0;
        refValue.setSelectionRange(length, length);
    }
};

// 聚焦處理
const handleFocus = (field: DateFieldType) => {
    focused.value = field;
};

const handleBlur = (field: DateFieldType) => {
    focused.value = null;
    // 失焦時驗證
    validateAndEmit();
};

// 提供方法給父組件
defineExpose({
    validate: validateAndEmit,
    reset: () => {
        resetFields();
        emit('update:modelValue', null);
    },
    getErrors: () => errors.value,
    hasErrors,
    errorMessages,
    focus: () => {
        yearRef.value?.focus();
    },
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
    /* 重置所有可能被 @tailwindcss/forms 覆蓋的樣式 */
    appearance: none !important;
    background-color: transparent !important;
    border-width: 0 !important;
    border-color: transparent !important;
    border-radius: 0 !important;
    padding: 0 !important;
    outline: none !important;
    box-shadow: none !important;
    /* 增加一些自定義樣式 */
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
