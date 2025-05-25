<template>
    <!-- 時間輸入 -->
    <div class="flex items-center justify-center">
        <!-- 小時輸入 -->
        <input :ref="(el) => setTimeInputRef(el as HTMLInputElement, 'hour')" v-model="hourValue" v-autowidth="20"
            type="text" inputmode="numeric" :placeholder="hourPlaceholder" :maxlength="2"
            class="time-input text-sm text-center" @input="handleHourInput" @keydown="handleKeydown($event, 'hour')"
            @focus="handleFocus('hour')" @blur="handleBlur('hour')" aria-label="hour" :aria-invalid="!!errors.hour"
            :aria-errormessage="errors.hour ? 'hour-error' : undefined" />
        <span class="text-gray-400 mx-1">:</span>

        <!-- 分鐘輸入 -->
        <input :ref="(el) => setTimeInputRef(el as HTMLInputElement, 'minute')" v-model="minuteValue" v-autowidth="20"
            type="text" inputmode="numeric" :placeholder="minutePlaceholder" :maxlength="2"
            class="time-input text-sm text-center" @input="handleMinuteInput" @keydown="handleKeydown($event, 'minute')"
            @focus="handleFocus('minute')" @blur="handleBlur('minute')" aria-label="minute"
            :aria-invalid="!!errors.minute" :aria-errormessage="errors.minute ? 'minute-error' : undefined" />

        <!-- 秒鐘輸入（如果啟用） -->
        <template v-if="enableSeconds">
            <span class="text-gray-400 mx-1">:</span>
            <input :ref="(el) => setTimeInputRef(el as HTMLInputElement, 'second')" v-model="secondValue"
                v-autowidth="20" type="text" inputmode="numeric" :placeholder="secondPlaceholder" :maxlength="2"
                class="time-input text-sm text-center" @input="handleSecondInput"
                @keydown="handleKeydown($event, 'second')" @focus="handleFocus('second')" @blur="handleBlur('second')"
                aria-label="second" :aria-invalid="!!errors.second"
                :aria-errormessage="errors.second ? 'second-error' : undefined" />
        </template>

        <!-- AM/PM 選擇器 (12小時制) -->
        <template v-if="!use24Hour">
            <button type="button" class="pl-2 text-sm cursor-pointer text-gray-600" @click.stop="togglePeriod">
                {{ displayPeriod }}
            </button>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { isNumeric } from '@/utils/validationUtils';
import vAutowidthDirective from '@/directives/v-autowidth';

type TimePeriod = 'AM' | 'PM';
type TimeFieldType = 'hour' | 'minute' | 'second';
type TimeField = Record<string, string>;

// 導入自定義指令
const vAutowidth = {
    mounted: vAutowidthDirective.mounted,
    updated: vAutowidthDirective.updated,
    beforeUnmount: vAutowidthDirective.beforeUnmount
};

interface Props {
    modelValue?: string | null;
    hourPlaceholder?: string;
    minutePlaceholder?: string;
    secondPlaceholder?: string;
    enableSeconds?: boolean;
    use24Hour?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    locale?: string;
    useLocalizedPeriod?: boolean;
    minuteStep?: number;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    hourPlaceholder: 'HH',
    minutePlaceholder: 'MM',
    secondPlaceholder: 'SS',
    enableSeconds: false,
    use24Hour: true,
    required: true,
    autoFocus: false,
    locale: 'zh-TW',
    useLocalizedPeriod: false,
    minuteStep: 1
});

const emit = defineEmits<{
    'update:modelValue': [value: string | null];
    'validation': [isValid: boolean, errors: TimeField];
    'complete': [time: string];
}>();

// 內部狀態
const hourValue = ref<string>('');
const minuteValue = ref<string>('');
const secondValue = ref<string>('');
const periodValue = ref<TimePeriod>('AM');
const errors = ref<TimeField>({});
const focused = ref<TimeFieldType | null>(null);
const isInitialized = ref<boolean>(false);
const timeSetExternally = ref<boolean>(false); // 新增：追蹤時間是否從外部設置

// DOM 引用
const inputRefs = ref<Map<TimeFieldType, HTMLInputElement>>(new Map());

// 計算屬性
const hasErrors = computed(() => Object.keys(errors.value).length > 0);
const errorMessages = computed(() => Object.values(errors.value));

// 重置所有輸入欄位
const resetFields = () => {
    hourValue.value = '';
    minuteValue.value = '';
    secondValue.value = '';
    periodValue.value = 'AM';
    timeSetExternally.value = false;
};

// 設置輸入框引用的函數
const setTimeInputRef = (el: Element | null, fieldType: TimeFieldType) => {
    if (el && el instanceof HTMLInputElement) {
        inputRefs.value.set(fieldType, el);
    } else {
        inputRefs.value.delete(fieldType);
    }
};

// 獲取輸入框引用的輔助函數
const getTimeInputRef = (fieldType: TimeFieldType): HTMLInputElement | undefined => {
    return inputRefs.value.get(fieldType);
};

// 安全地聚焦到元素
const safelyFocus = (fieldType: TimeFieldType) => {
    const element = getTimeInputRef(fieldType);
    if (element && typeof element.focus === 'function') {
        try {
            element.focus();
            console.log(`✅ TimeInput 成功聚焦到 ${fieldType} 輸入框`);
        } catch (error) {
            console.warn(`❌ TimeInput 無法聚焦到 ${fieldType} 輸入框:`, error);
        }
    } else {
        console.warn(`❌ TimeInput ${fieldType} 輸入框不可用`);
    }
};

// 聚焦到第一個時間輸入框
const focusFirstTimeInput = () => {
    console.log('🎯 TimeInput focusFirstTimeInput 被調用');

    // 按順序嘗試聚焦：hour -> minute -> second
    const timeFields: TimeFieldType[] = ['hour', 'minute', 'second'];

    for (const field of timeFields) {
        const element = getTimeInputRef(field);
        if (element && typeof element.focus === 'function') {
            try {
                element.focus();
                console.log(`✅ TimeInput 成功聚焦到第一個可用的時間輸入框: ${field}`);
                return;
            } catch (error) {
                console.warn(`❌ TimeInput 無法聚焦到 ${field} 輸入框:`, error);
            }
        }
    }

    console.warn('❌ TimeInput 沒有找到可用的時間輸入框');
};

// 本地化的AM/PM顯示
const localizedPeriod = computed(() => {
    if (!props.useLocalizedPeriod) return periodValue.value;

    try {
        const amDate = new Date();
        amDate.setHours(9, 0, 0);

        const pmDate = new Date();
        pmDate.setHours(15, 0, 0);

        const dtf = new Intl.DateTimeFormat(props.locale, {
            hour: 'numeric',
            hour12: true
        });

        const amString = dtf.formatToParts(amDate);
        const pmString = dtf.formatToParts(pmDate);

        const amPeriod = amString.find(part => part.type === 'dayPeriod')?.value || 'AM';
        const pmPeriod = pmString.find(part => part.type === 'dayPeriod')?.value || 'PM';

        return periodValue.value === 'AM' ? amPeriod : pmPeriod;
    } catch (error) {
        console.error('Error getting localized period:', error);
        return periodValue.value;
    }
});

// 顯示的時間段標記
const displayPeriod = computed(() => localizedPeriod.value);

/**
 * 格式化最終輸出的時間值
 */
const formattedTimeValue = computed(() => {
    // 如果任何必要欄位為空，返回null
    if (
        hourValue.value === '' ||
        minuteValue.value === '' ||
        (props.enableSeconds && secondValue.value === '')
    ) {
        return null;
    }

    // 取得小時值並處理12/24小時制轉換
    let hour = parseInt(hourValue.value, 10);
    if (!props.use24Hour) {
        if (periodValue.value === 'PM' && hour < 12) {
            hour += 12;
        } else if (periodValue.value === 'AM' && hour === 12) {
            hour = 0;
        }
    }

    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minuteValue.value.padStart(2, '0');

    if (props.enableSeconds) {
        const secondStr = secondValue.value.padStart(2, '0');
        return `${hourStr}:${minuteStr}:${secondStr}`;
    } else {
        return `${hourStr}:${minuteStr}`;
    }
});

// 修復：監聽外部 modelValue 變化 - 防止自動設置當前時間
watch(() => props.modelValue, (newValue) => {
    console.log('👁️ TimeInput 監聽到 modelValue 變化:', newValue);

    if (!isInitialized.value) {
        isInitialized.value = true;
        console.log('🏁 TimeInput 初始化完成');
    }

    if (newValue) {
        console.log('🔧 TimeInput 從外部設置時間值:', newValue);
        timeSetExternally.value = true; // 標記為外部設置

        // 分割時間字符串
        const timeParts = newValue.split(':');
        let hours = parseInt(timeParts[0] || '0', 10);
        const minutes = timeParts[1] || '';
        const seconds = timeParts[2] || '';

        // 處理12小時制
        if (!props.use24Hour) {
            if (hours >= 12) {
                periodValue.value = 'PM';
                hours = hours === 12 ? 12 : hours - 12;
            } else {
                periodValue.value = 'AM';
                hours = hours === 0 ? 12 : hours;
            }
        }

        // 設置時間值
        hourValue.value = hours.toString().padStart(2, '0');
        minuteValue.value = minutes;

        if (props.enableSeconds) {
            secondValue.value = seconds;
        }

        console.log('✅ TimeInput 時間值設置完成:', {
            hour: hourValue.value,
            minute: minuteValue.value,
            second: secondValue.value,
            period: periodValue.value
        });
    } else if (!timeSetExternally.value) {
        // 只有在不是外部設置時才重置字段
        console.log('🧹 TimeInput 重置字段');
        resetFields();
    }
}, { immediate: true });

// 自動聚焦 - 修復版本
onMounted(() => {
    // 移除自動設置當前時間的邏輯
    if (props.autoFocus) {
        nextTick(() => {
            focusFirstTimeInput();
        });
    }
});

/**
 * 驗證單個欄位
 */
const validateField = (field: TimeFieldType, value: string): boolean => {
    if (!value) return true;

    const numValue = parseInt(value);

    switch (field) {
        case 'hour':
            const maxHour = props.use24Hour ? 23 : 12;
            const minHour = props.use24Hour ? 0 : 1;
            if (!isNumeric(value) || numValue < minHour || numValue > maxHour) {
                errors.value[field] = props.use24Hour
                    ? '小時必須是 0-23 之間的數字'
                    : '小時必須是 1-12 之間的數字';
                return false;
            }
            break;

        case 'minute':
            if (!isNumeric(value) || numValue < 0 || numValue > 59) {
                errors.value[field] = '分鐘必須是 0-59 之間的數字';
                return false;
            }

            if (props.minuteStep > 1 && numValue % props.minuteStep !== 0) {
                errors.value[field] = `分鐘必須是 ${props.minuteStep} 的倍數`;
                return false;
            }
            break;

        case 'second':
            if (!isNumeric(value) || numValue < 0 || numValue > 59) {
                errors.value[field] = '秒鐘必須是 0-59 之間的數字';
                return false;
            }
            break;
    }

    if (errors.value[field]) {
        delete errors.value[field];
    }

    return true;
};

// 處理AM/PM變更
const togglePeriod = () => {
    periodValue.value = periodValue.value === 'AM' ? 'PM' : 'AM';
    validateAndEmit();
};

// 修復：驗證並發送事件 - 防止覆蓋外部設置的時間
const validateAndEmit = () => {
    console.log('🔍 TimeInput validateAndEmit 開始:', {
        initialized: isInitialized.value,
        timeSetExternally: timeSetExternally.value,
        hour: hourValue.value,
        minute: minuteValue.value,
        second: secondValue.value
    });

    if (!isInitialized.value) {
        console.log('⏸️ TimeInput 尚未初始化，跳過驗證');
        return;
    }

    // 清除所有錯誤
    errors.value = {};

    // 驗證個別字段
    validateField('hour', hourValue.value);
    validateField('minute', minuteValue.value);
    if (props.enableSeconds) {
        validateField('second', secondValue.value);
    }

    // 檢查必填項
    if (props.required) {
        if (!hourValue.value) errors.value.hour = '請輸入小時';
        if (!minuteValue.value) errors.value.minute = '請輸入分鐘';
        if (props.enableSeconds && !secondValue.value) errors.value.second = '請輸入秒鐘';
    }

    // 發送驗證結果
    const hasValidationErrors = Object.keys(errors.value).length > 0;
    emit('validation', !hasValidationErrors, errors.value);

    // 只有在有完整時間值且驗證通過時才發送事件
    if (formattedTimeValue.value && !hasValidationErrors) {
        console.log('✅ TimeInput 發送更新事件:', formattedTimeValue.value);
        emit('update:modelValue', formattedTimeValue.value);
        emit('complete', formattedTimeValue.value);
    } else if (isInitialized.value && !formattedTimeValue.value && !timeSetExternally.value) {
        // 只有在不是外部設置時才發送 null
        console.log('📤 TimeInput 發送 null 更新');
        emit('update:modelValue', null);
    }
};

// 輸入處理函數
const handleHourInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, '');

    if (value.length <= 2) {
        hourValue.value = value;
        timeSetExternally.value = false; // 標記為用戶輸入

        const isValid = validateField('hour', value);
        if (!isValid) return;

        if (value.length === 2 || (props.use24Hour && parseInt(value) > 2) || (!props.use24Hour && parseInt(value) > 1)) {
            nextTick(() => {
                safelyFocus('minute');
            });
        }
    }
};

const handleMinuteInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, '');

    if (value.length <= 2) {
        timeSetExternally.value = false; // 標記為用戶輸入

        if (value.length === 1 && parseInt(value) > 5) {
            minuteValue.value = value.padStart(2, '0');
            nextTick(() => {
                if (props.enableSeconds) {
                    safelyFocus('second');
                } else {
                    validateAndEmit();
                }
            });
        } else {
            minuteValue.value = value;
        }

        const isValid = validateField('minute', value);
        if (!isValid) return;

        if (value.length === 2) {
            nextTick(() => {
                if (props.enableSeconds) {
                    safelyFocus('second');
                } else {
                    validateAndEmit();
                }
            });
        }
    }
};

const handleSecondInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, '');

    if (value.length <= 2) {
        timeSetExternally.value = false; // 標記為用戶輸入

        if (value.length === 1 && parseInt(value) > 5) {
            secondValue.value = value.padStart(2, '0');
            validateAndEmit();
        } else {
            secondValue.value = value;
        }

        const isValid = validateField('second', value);
        if (!isValid) return;

        if (value.length === 2) {
            validateAndEmit();
        }
    }
};

// 鍵盤事件處理
const handleKeydown = (event: KeyboardEvent, field: TimeFieldType) => {
    const target = event.target as HTMLInputElement;

    // 退格鍵處理
    if (event.key === 'Backspace' && target.value === '') {
        switch (field) {
            case 'minute':
                event.preventDefault();
                safelyFocus('hour');
                const hourElement = getTimeInputRef('hour');
                if (hourElement) hourElement.setSelectionRange(-1, -1);
                break;
            case 'second':
                event.preventDefault();
                safelyFocus('minute');
                const minuteElement = getTimeInputRef('minute');
                if (minuteElement) minuteElement.setSelectionRange(-1, -1);
                break;
        }
    }

    // 箭頭鍵處理
    if (event.key === 'ArrowLeft' && target.selectionStart === 0) {
        switch (field) {
            case 'minute':
                event.preventDefault();
                safelyFocus('hour');
                const hourElement = getTimeInputRef('hour');
                if (hourElement) hourElement.setSelectionRange(-1, -1);
                break;
            case 'second':
                event.preventDefault();
                safelyFocus('minute');
                const minuteElement = getTimeInputRef('minute');
                if (minuteElement) minuteElement.setSelectionRange(-1, -1);
                break;
        }
    }

    if (event.key === 'ArrowRight' && target.selectionStart === target.value.length) {
        switch (field) {
            case 'hour':
                event.preventDefault();
                safelyFocus('minute');
                const minuteElement = getTimeInputRef('minute');
                if (minuteElement) minuteElement.setSelectionRange(0, 0);
                break;
            case 'minute':
                if (props.enableSeconds) {
                    event.preventDefault();
                    safelyFocus('second');
                    const secondElement = getTimeInputRef('second');
                    if (secondElement) secondElement.setSelectionRange(0, 0);
                }
                break;
        }
    }

    // Enter 鍵完成輸入
    if (event.key === 'Enter') {
        validateAndEmit();
    }
};

// 聚焦處理
const handleFocus = (field: TimeFieldType) => {
    focused.value = field;
};

// 修復：失焦處理 - 不要自動設置當前時間
const handleBlur = (field: TimeFieldType) => {
    console.log('👋 TimeInput 失焦:', field, 'timeSetExternally:', timeSetExternally.value);

    focused.value = null;

    // 失焦時只進行驗證，不改變值，也不觸發完整的 validateAndEmit
    validateField(field,
        field === 'hour' ? hourValue.value :
            field === 'minute' ? minuteValue.value : secondValue.value
    );

    // 只發送驗證結果，不觸發值的更新
    const hasValidationErrors = Object.keys(errors.value).length > 0;
    emit('validation', !hasValidationErrors, errors.value);
};

// 公開方法
defineExpose({
    validate: validateAndEmit,
    reset: () => {
        resetFields();
        errors.value = {};
        emit('update:modelValue', null);
    },
    getErrors: () => errors.value,
    hasErrors,
    errorMessages,
    setTime: (timeStr: string) => {
        if (timeStr) {
            timeSetExternally.value = true; // 標記為外部設置

            const [hoursStr, minutes, seconds] = timeStr.split(':');
            let hours = parseInt(hoursStr);

            if (!props.use24Hour) {
                if (hours >= 12) {
                    periodValue.value = 'PM';
                    hours = hours === 12 ? 12 : hours - 12;
                } else {
                    periodValue.value = 'AM';
                    hours = hours === 0 ? 12 : hours;
                }
            }

            hourValue.value = hours.toString().padStart(2, '0');
            minuteValue.value = minutes;
            if (props.enableSeconds && seconds) {
                secondValue.value = seconds;
            }

            validateAndEmit();
        } else {
            resetFields();
            emit('update:modelValue', null);
        }
    },
    focus: focusFirstTimeInput,
    focusHour: () => safelyFocus('hour'),
    focusMinute: () => safelyFocus('minute'),
    focusSecond: () => safelyFocus('second'),
});
</script>

<style scoped>
.time-input {
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

.time-input:focus {
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
