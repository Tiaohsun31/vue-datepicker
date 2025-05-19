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
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { isNumeric } from '@/utils/validationUtils';
import vAutowidthDirective from '@/directives/v-autowidth';

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
    useLocalizedPeriod: false
});

const emit = defineEmits<{
    'update:modelValue': [value: string | null];
    'validation': [isValid: boolean, errors: Record<string, string>];
    'complete': [time: string];
}>();

// 內部狀態
const hourValue = ref<string>('');
const minuteValue = ref<string>('');
const secondValue = ref<string>('');
const periodValue = ref<'AM' | 'PM'>('AM');
const errors = ref<Record<string, string>>({});
const focused = ref<string | null>(null);
const isInitialized = ref<boolean>(false);

// 引用
const hourRef = ref<HTMLInputElement>();
const minuteRef = ref<HTMLInputElement>();
const secondRef = ref<HTMLInputElement>();

// 計算屬性
const hasErrors = computed(() => Object.keys(errors.value).length > 0);
const errorMessages = computed(() => Object.values(errors.value));

// 本地化的AM/PM顯示
const localizedPeriod = computed(() => {
    try {
        // 建立一個日期對象，分別用於上午和下午的情況
        const amDate = new Date();
        amDate.setHours(9, 0, 0); // 上午9點

        const pmDate = new Date();
        pmDate.setHours(15, 0, 0); // 下午3點

        // 使用 Intl API 只格式化時間段部分
        const dtf = new Intl.DateTimeFormat(props.locale, {
            hour: 'numeric',
            hour12: true
        });

        // 獲取完整的格式化字符串
        const amString = dtf.formatToParts(amDate);
        const pmString = dtf.formatToParts(pmDate);

        // 從格式化部分中提取 dayPeriod (時間段標記)
        const amPeriod = amString.find(part => part.type === 'dayPeriod')?.value || 'AM';
        const pmPeriod = pmString.find(part => part.type === 'dayPeriod')?.value || 'PM';

        return periodValue.value === 'AM' ? amPeriod : pmPeriod;
    } catch (error) {
        console.error('Error getting localized period:', error);
        // 如果出現錯誤，回退到英文AM/PM
        return periodValue.value;
    }
});

// 顯示的時間段標記
const displayPeriod = computed(() => {
    if (props.useLocalizedPeriod) {
        return localizedPeriod.value;
    } else {
        return periodValue.value; // 直接使用 'AM' 或 'PM'
    }
});

// 監聽外部 modelValue 變化
watch(() => props.modelValue, (newValue) => {
    if (!isInitialized.value) {
        isInitialized.value = true;
    }

    if (newValue) {
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

        hourValue.value = hours.toString();
        minuteValue.value = minutes;

        if (props.enableSeconds) {
            secondValue.value = seconds;
        }
    } else {
        hourValue.value = '';
        minuteValue.value = '';
        secondValue.value = '';
        periodValue.value = 'AM';
    }
}, { immediate: true });

// 自動聚焦
onMounted(() => {
    if (props.autoFocus && hourRef.value) {
        hourRef.value.focus();
    }
});

// 驗證單個字段
const validateField = (field: string, value: string) => {
    if (!value) return true; // 空值在必填檢查中處理

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
            break;

        case 'second':
            if (!isNumeric(value) || numValue < 0 || numValue > 59) {
                errors.value[field] = '秒鐘必須是 0-59 之間的數字';
                return false;
            }
            break;
    }

    // 如果該字段沒有錯誤，刪除對應的錯誤信息
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

// 驗證並發送事件
const validateAndEmit = () => {
    // 如果還沒初始化，不進行驗證
    if (!isInitialized.value) return;

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

    // 組合並發送時間
    if (hourValue.value && minuteValue.value && (!props.enableSeconds || secondValue.value)) {
        // 轉換小時為24小時制 (如果使用12小時制)
        let hours = parseInt(hourValue.value, 10);
        if (!props.use24Hour) {
            if (periodValue.value === 'PM' && hours < 12) {
                hours += 12;
            } else if (periodValue.value === 'AM' && hours === 12) {
                hours = 0;
            }
        }

        const hoursStr = hours.toString().padStart(2, '0');
        const minutes = minuteValue.value.padStart(2, '0');
        const seconds = props.enableSeconds ? secondValue.value.padStart(2, '0') : '00';

        const timeStr = props.enableSeconds
            ? `${hoursStr}:${minutes}:${seconds}`
            : `${hoursStr}:${minutes}`;

        emit('update:modelValue', timeStr);
        emit('complete', timeStr);
    } else {
        // 如果有必填欄位未填，則發送 null
        if (isInitialized.value &&
            (!hourValue.value || !minuteValue.value || (props.enableSeconds && !secondValue.value))) {
            emit('update:modelValue', null);
        }
    }

    // 發送驗證結果
    emit('validation', !hasErrors.value, errors.value);
};

// 輸入處理函數
const handleHourInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, ''); // 只保留數字

    if (value.length <= 2) {
        hourValue.value = value;
        const isValid = validateField('hour', value);
        if (!isValid) return;

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

        const isValid = validateField('minute', value);
        if (!isValid) return;

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

        const isValid = validateField('second', value);
        if (!isValid) return;

        // 當輸入完成時驗證並發送
        if (value.length === 2) {
            validateAndEmit();
        }
    }
};

// 鍵盤事件處理
const handleKeydown = (event: KeyboardEvent, field: string) => {
    const target = event.target as HTMLInputElement;

    // 退格鍵處理
    if (event.key === 'Backspace' && target.value === '') {
        switch (field) {
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

    // 箭頭鍵處理
    if (event.key === 'ArrowLeft' && target.selectionStart === 0) {
        switch (field) {
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
const handleFocus = (field: string) => {
    focused.value = field;
};

const handleBlur = (field: string) => {
    focused.value = null;
    // 失焦時驗證
    validateAndEmit();
};

// 提供方法給父組件
defineExpose({
    validate: validateAndEmit,
    reset: () => {
        hourValue.value = '';
        minuteValue.value = '';
        secondValue.value = '';
        periodValue.value = 'AM';
        errors.value = {};
        emit('update:modelValue', null);
    },
    getErrors: () => errors.value,
    hasErrors,
    errorMessages
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
