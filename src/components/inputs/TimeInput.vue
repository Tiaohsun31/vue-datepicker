<!-- components/inputs/TimeInput.vue -->
<template>
    <!-- 時間輸入 -->
    <div class="flex items-center justify-center">
        <!-- 小時輸入 -->
        <input ref="hourRef" v-model="hourValue" v-autowidth="20" type="text" inputmode="numeric"
            :placeholder="hourPlaceholder" :maxlength="2" class="time-input text-sm text-center"
            @input="handleHourInput" @keydown="handleKeydown($event, 'hour')" @focus="handleFocus('hour')"
            @blur="handleBlur('hour')" aria-label="hour" :aria-invalid="!!errors.hour"
            :aria-errormessage="errors.hour ? 'hour-error' : undefined" />
        <span class="text-gray-400 mx-1">:</span>

        <!-- 分鐘輸入 -->
        <input ref="minuteRef" v-model="minuteValue" v-autowidth="20" type="text" inputmode="numeric"
            :placeholder="minutePlaceholder" :maxlength="2" class="time-input text-sm text-center"
            @input="handleMinuteInput" @keydown="handleKeydown($event, 'minute')" @focus="handleFocus('minute')"
            @blur="handleBlur('minute')" aria-label="minute" :aria-invalid="!!errors.minute"
            :aria-errormessage="errors.minute ? 'minute-error' : undefined" />

        <!-- 秒鐘輸入（如果啟用） -->
        <template v-if="enableSeconds">
            <span class="text-gray-400 mx-1">:</span>
            <input ref="secondRef" v-model="secondValue" v-autowidth="20" type="text" inputmode="numeric"
                :placeholder="secondPlaceholder" :maxlength="2" class="time-input text-sm text-center"
                @input="handleSecondInput" @keydown="handleKeydown($event, 'second')" @focus="handleFocus('second')"
                @blur="handleBlur('second')" aria-label="second" :aria-invalid="!!errors.second"
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
import { ref, computed, watch, nextTick } from 'vue';
import { isNumeric } from '@/utils/validationUtils';
import vAutowidthDirective from '@/directives/v-autowidth';
import { type FieldError } from '@/types/internal';

type TimePeriod = 'AM' | 'PM';
type TimeFieldType = 'hour' | 'minute' | 'second';

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
    required: false,
    locale: 'zh-TW',
    useLocalizedPeriod: false,
    minuteStep: 1
});

const emit = defineEmits<{
    'update:modelValue': [value: string | null];
    'validation': [
        isValid: boolean,
        errors: Record<string, string>,
        errorParams: Record<string, Record<string, any>>
    ];
    'complete': [time: string];
    'navigate-to-date': []; // 導航到日期輸入的事件
}>();

// 內部狀態
const hourValue = ref<string>('');
const minuteValue = ref<string>('');
const secondValue = ref<string>('');
const periodValue = ref<TimePeriod>('AM');
const errors = ref<Record<string, FieldError>>({});
const errorParams = ref<Record<string, Record<string, any>>>({});
const focused = ref<TimeFieldType | null>(null);
const isInitialized = ref<boolean>(false);

// DOM 引用
const hourRef = ref<HTMLInputElement>();
const minuteRef = ref<HTMLInputElement>();
const secondRef = ref<HTMLInputElement>();

// 計算屬性
const hasErrors = computed(() => Object.keys(errors.value).length > 0);

// 本地化錯誤訊息
const localizedErrors = computed(() => {
    const result: Record<string, string> = {};
    Object.entries(errors.value).forEach(([field, error]) => {
        // 這裡暫時返回 key，讓 DateErrorMessage 處理翻譯
        result[field] = error.key;
    });
    return result;
});

// 重置所有輸入欄位
const resetFields = () => {
    hourValue.value = '';
    minuteValue.value = '';
    secondValue.value = '';
    periodValue.value = 'AM';
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

const displayPeriod = computed(() => localizedPeriod.value);

/**
 * 格式化最終輸出的時間值
 */
const formattedTimeValue = computed(() => {
    if (
        hourValue.value === '' ||
        minuteValue.value === '' ||
        (props.enableSeconds && secondValue.value === '')
    ) {
        return null;
    }

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

// 監聽外部 modelValue 變化
watch(() => props.modelValue, (newValue) => {
    if (!isInitialized.value) {
        isInitialized.value = true;
    }

    if (newValue) {
        const timeParts = newValue.split(':');
        let hours = parseInt(timeParts[0] || '0', 10);
        const minutes = timeParts[1] || '';
        const seconds = timeParts[2] || '';

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

        if (props.enableSeconds) {
            secondValue.value = seconds;
        }
    } else {
        resetFields();
    }
}, { immediate: true });

/**
 * 驗證單個欄位
 */
const validateField = (field: TimeFieldType, value: string): { valid: boolean; error?: FieldError } => {
    if (!value) return { valid: true };

    const numValue = parseInt(value);

    switch (field) {
        case 'hour':
            const maxHour = props.use24Hour ? 23 : 12;
            const minHour = props.use24Hour ? 0 : 1;

            if (!isNumeric(value) || numValue < minHour || numValue > maxHour) {
                return { valid: false, error: { key: 'time.hourOutOfRange', params: { min: minHour, max: maxHour } } };
            }
            break;

        case 'minute':
            if (!isNumeric(value) || numValue < 0 || numValue > 59) {
                return { valid: false, error: { key: 'time.minuteOutOfRange', params: { min: 0, max: 59 } } };
            }

            if (props.minuteStep > 1 && numValue % props.minuteStep !== 0) {
                return { valid: false, error: { key: 'time.minuteStepInvalid', params: { step: props.minuteStep } } };
            }
            break;

        case 'second':
            if (!isNumeric(value) || numValue < 0 || numValue > 59) {
                return { valid: false, error: { key: 'time.secondOutOfRange', params: { min: 0, max: 59 } } };
            }
            break;
    }

    // 清除該字段的錯誤
    if (errors.value[field]) {
        delete errors.value[field];
        delete errorParams.value[field];
    }

    return { valid: true };
};

// 處理AM/PM變更
const togglePeriod = () => {
    periodValue.value = periodValue.value === 'AM' ? 'PM' : 'AM';
    validateAndEmit();
};

// 驗證並發送事件 - 改進版本
const validateAndEmit = () => {
    if (!isInitialized.value) return;

    // 清除所有錯誤
    errors.value = {};
    errorParams.value = {};

    // 驗證個別字段
    const hourResult = validateField('hour', hourValue.value);
    const minuteResult = validateField('minute', minuteValue.value);
    const secondResult = props.enableSeconds ? validateField('second', secondValue.value) : { valid: true };

    // 收集錯誤
    if (!hourResult.valid && hourResult.error) {
        errors.value.hour = hourResult.error;
        if (hourResult.error.params) {
            errorParams.value.hour = hourResult.error.params;
        }
    }

    if (!minuteResult.valid && minuteResult.error) {
        errors.value.minute = minuteResult.error;
        if (minuteResult.error.params) {
            errorParams.value.minute = minuteResult.error.params;
        }
    }

    if (!secondResult.valid && secondResult.error) {
        errors.value.second = secondResult.error;
        if (secondResult.error.params) {
            errorParams.value.second = secondResult.error.params;
        }
    }

    // 檢查必填項
    if (props.required) {
        if (!hourValue.value) {
            errors.value.hour = { key: 'time.hourRequired' };
        }
        if (!minuteValue.value) {
            errors.value.minute = { key: 'time.minuteRequired' };
        }
        if (props.enableSeconds && !secondValue.value) {
            errors.value.second = { key: 'time.secondRequired' };
        }
    }

    // 發送驗證結果 - 傳遞參數
    emit('validation', !hasErrors.value, localizedErrors.value, errorParams.value);

    // 如果所有欄位都有值且有效，發送完整時間
    if (formattedTimeValue.value) {
        emit('update:modelValue', formattedTimeValue.value);
        emit('complete', formattedTimeValue.value);
    } else if (isInitialized.value) {
        emit('update:modelValue', null);
    }
};

// 輸入處理函數
const handleHourInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, '');

    if (value.length <= 2) {
        hourValue.value = value;
        const validationResult = validateField('hour', value);

        if (!validationResult.valid) return;

        // 自動跳轉到分鐘
        if (value.length === 2 || (props.use24Hour && parseInt(value) > 2) || (!props.use24Hour && parseInt(value) > 1)) {
            nextTick(() => {
                minuteRef.value?.focus();
            });
        }
    }
};

const handleMinuteInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, '');

    if (value.length <= 2) {
        // 自動補零處理
        if (value.length === 1 && parseInt(value) > 5) {
            minuteValue.value = value.padStart(2, '0');
            nextTick(() => {
                if (props.enableSeconds && secondRef.value) {
                    secondRef.value.focus();
                } else {
                    validateAndEmit();
                }
            });
        } else {
            minuteValue.value = value;
        }

        const validationResult = validateField('minute', value);
        if (!validationResult.valid) return;

        // 自動跳轉到秒鐘或完成
        if (value.length === 2) {
            nextTick(() => {
                if (props.enableSeconds && secondRef.value) {
                    secondRef.value.focus();
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
        // 自動補零處理
        if (value.length === 1 && parseInt(value) > 5) {
            secondValue.value = value.padStart(2, '0');
            validateAndEmit();
        } else {
            secondValue.value = value;
        }

        const validationResult = validateField('second', value);
        if (!validationResult.valid) return;

        // 當輸入完成時驗證並發送
        if (value.length === 2) {
            validateAndEmit();
        }
    }
};

// 鍵盤事件處理
const handleKeydown = (event: KeyboardEvent, field: TimeFieldType) => {
    const target = event.target as HTMLInputElement;

    // 退格鍵處理
    if (event.key === 'Backspace') {
        if (target.value === '') {
            switch (field) {
                case 'hour':
                    event.preventDefault();
                    emit('navigate-to-date');
                    break;
                case 'minute':
                    event.preventDefault();
                    hourRef.value?.focus();
                    hourRef.value?.setSelectionRange(-1, -1);
                    break;
                case 'second':
                    event.preventDefault();
                    minuteRef.value?.focus();
                    minuteRef.value?.setSelectionRange(-1, -1);
                    break;
            }
        }
    }

    // 左箭頭鍵處理
    if (event.key === 'ArrowLeft' && target.selectionStart === 0) {
        switch (field) {
            case 'hour':
                event.preventDefault();
                emit('navigate-to-date');
                break;
            case 'minute':
                event.preventDefault();
                hourRef.value?.focus();
                hourRef.value?.setSelectionRange(-1, -1);
                break;
            case 'second':
                event.preventDefault();
                minuteRef.value?.focus();
                minuteRef.value?.setSelectionRange(-1, -1);
                break;
        }
    }

    // 右箭頭鍵處理
    if (event.key === 'ArrowRight' && target.selectionStart === target.value.length) {
        switch (field) {
            case 'hour':
                event.preventDefault();
                minuteRef.value?.focus();
                minuteRef.value?.setSelectionRange(0, 0);
                break;
            case 'minute':
                if (props.enableSeconds) {
                    event.preventDefault();
                    secondRef.value?.focus();
                    secondRef.value?.setSelectionRange(0, 0);
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

const handleBlur = (field: TimeFieldType) => {
    focused.value = null;
    validateAndEmit();
};

// 公開方法
defineExpose({
    validate: validateAndEmit,
    reset: () => {
        resetFields();
        errors.value = {};
        errorParams.value = {};
        emit('update:modelValue', null);
    },
    getErrors: () => localizedErrors.value,
    hasErrors,
    setTime: (timeStr: string) => {
        if (timeStr) {
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
    focus: () => {
        hourRef.value?.focus();
    },
    focusLast: () => {
        if (props.enableSeconds && secondRef.value) {
            secondRef.value.focus();
            secondRef.value.setSelectionRange(0, 0);
        } else if (minuteRef.value) {
            minuteRef.value.focus();
            minuteRef.value.setSelectionRange(0, 0);
        } else if (hourRef.value) {
            hourRef.value.focus();
            hourRef.value.setSelectionRange(0, 0);
        }
    }
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
    appearance: textfield;
}
</style>
