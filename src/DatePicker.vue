<template>
    <div class="date-time-picker-wrapper relative w-full"
        :class="[themeClasses, showTime ? 'min-w-[300px]' : 'min-w-[150px]']" v-bind="containerAttributes"
        ref="pickerRef">
        <!-- 日期時間輸入容器 -->
        <DateContainer :errors="errors">
            <div class="flex w-full items-center justify-start gap-1" @click="handleContainerClick"
                @mousedown="handleContainerMouseDown">
                <!-- 日期輸入部分 -->
                <div>
                    <DateInput ref="dateInputRef" v-model="inputDateValue" :year-placeholder="yearPlaceholder"
                        :month-placeholder="monthPlaceholder" :day-placeholder="dayPlaceholder" :min-date="minDateStr"
                        :max-date="maxDateStr" :required="required" :auto-focus="autoFocus" :separator="separator"
                        :date-format="dateInputFormat" @validation="onDateInputValidation"
                        @complete="onDateInputComplete" />
                </div>

                <!-- 分隔符 -->
                <div v-if="showTime" class="text-gray-400 mx-1">
                    <span>{{ timeSeparator }}</span>
                </div>

                <!-- 時間輸入部分 -->
                <div v-if="showTime">
                    <TimeInput ref="timeInputRef" v-model="inputTimeValue" :hour-placeholder="hourPlaceholder"
                        :minute-placeholder="minutePlaceholder" :second-placeholder="secondPlaceholder"
                        :enable-seconds="enableSeconds" :use24Hour="use24Hour" :required="required" :locale="locale"
                        :useLocalizedPeriod="useLocalizedPeriod" @validation="onTimeInputValidation"
                        @complete="onTimeInputComplete" />
                </div>
            </div>

            <!-- 日曆圖標 -->
            <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                :disabled="disabled" @click="toggleCalendar">
                <CalendarIcon class="h-5 w-5 cursor-pointer" />
            </button>
        </DateContainer>

        <!-- 日曆彈出層 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10"
            @click.stop role="dialog" aria-modal="true" aria-label="date-picker">
            <CalendarGrid :value="calendarDateForGrid" :min-date="calendarMinDate" :max-date="calendarMaxDate"
                :showTimeSelector="showTime" :time-value="inputTimeValue" :use24Hour="use24Hour"
                :default-time="getValidDefaultTime()" :enableSeconds="enableSeconds" :locale="locale"
                @select="onCalendarSelect" @time-select="onTimeSelect" />
        </div>
    </div>
    <!-- 錯誤訊息 -->
    <DateErrorMessage :errors="mergedErrors" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, onBeforeMount } from 'vue';
import dayjs from 'dayjs';
import "./styles/theme.css";

// 組件導入
import DateContainer from './components/calendar/DateContainer.vue';
import DateInput from './components/inputs/DateInput.vue';
import TimeInput from './components/inputs/TimeInput.vue';
import DateErrorMessage from './components/calendar/DateErrorMessage.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import CalendarGrid from './components/calendar/CalendarGrid.vue';

// 使用簡化的 dateUtils
import {
    parseToSimpleDate,
    formatSimpleDate,
    ensureSimpleDate,
    formatOutput,
    getNow,
    isValidDateFormat,
    isValidTimeFormat,
    fixDateFormat,
    fixTimeFormat,
    createSimpleDate,
    toCalendarDate,
    fromCalendarDate,
    type SimpleDateValue,
    type DateTimeValue,
    type OutputFormat
} from './utils/dateUtils';
import { type TailwindColor } from './types/main';
import { useTheme } from './composables/useTheme';

interface Props {
    modelValue?: DateTimeValue;
    mode?: 'light' | 'dark' | 'auto';
    theme?: TailwindColor | string;
    // 日期選項
    yearPlaceholder?: string;
    monthPlaceholder?: string;
    dayPlaceholder?: string;
    // 時間選項
    showTime?: boolean;
    hourPlaceholder?: string;
    minutePlaceholder?: string;
    secondPlaceholder?: string;
    enableSeconds?: boolean;
    use24Hour?: boolean;
    minuteStep?: number;
    timeSeparator?: string;
    useLocalizedPeriod?: boolean;
    customDefaultTime?: string; // 自定義預設時間，格式為 HH:mm:ss
    autoFocusTimeAfterDate?: boolean; // 日期完成後是否自動聚焦到時間
    // 一般選項
    disabled?: boolean;
    required?: boolean;
    minDate?: DateTimeValue;
    maxDate?: DateTimeValue;
    locale?: string;
    separator?: string;
    dateFormat?: string;
    timeFormat?: string;
    autoFocus?: boolean;
    // 輸出格式
    outputFormat?: OutputFormat;
    outputDateFormat?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    mode: 'auto',
    theme: () => 'violet',
    yearPlaceholder: '年',
    monthPlaceholder: '月',
    dayPlaceholder: '日',
    showTime: true,
    hourPlaceholder: '時',
    minutePlaceholder: '分',
    secondPlaceholder: '秒',
    enableSeconds: true,
    use24Hour: true,
    minuteStep: 5,
    timeSeparator: ' ',
    useLocalizedPeriod: false,
    customDefaultTime: '00:00:00',
    autoFocusTimeAfterDate: true,

    disabled: false,
    required: true,
    locale: 'zh-TW',
    separator: '-',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    autoFocus: false,
    outputFormat: 'iso',
});

const emit = defineEmits<{
    'update:modelValue': [date: DateTimeValue];
    'change': [date: DateTimeValue];
    'validation': [isValid: boolean, errors: Record<string, string>];
}>();

// DOM 引用
const pickerRef = ref<HTMLElement | null>(null);
const dateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const timeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);
const calendarRef = ref<HTMLElement | null>(null);

// 狀態 - 使用 SimpleDateValue 而不是 CalendarDateTime
const showCalendar = ref(false);
const inputDateValue = ref<string | null>(null);
const inputTimeValue = ref<string | null>(null);
const errors = ref<Record<string, string>>({});
const formatErrors = ref<Record<string, string>>({});

// 內部狀態使用簡單物件
const internalDateTime = ref<SimpleDateValue | null>(null);
const internalDateFormat = ref(props.dateFormat);
const internalTimeFormat = ref(props.timeFormat);

// 計算屬性 - 只在需要傳遞給 CalendarGrid 時才轉換為 CalendarDate
const calendarDateForGrid = computed(() => {
    if (!internalDateTime.value) return null;
    return toCalendarDate(internalDateTime.value);
});

// 轉換 minDate 和 maxDate 為 CalendarDate（只在需要時）
const calendarMinDate = computed(() => {
    const minDateValue = ensureSimpleDate(props.minDate);
    return minDateValue ? toCalendarDate(minDateValue) : null;
});

const calendarMaxDate = computed(() => {
    const maxDateValue = ensureSimpleDate(props.maxDate);
    return maxDateValue ? toCalendarDate(maxDateValue) : null;
});

// 計算屬性 - 將日期轉換為字符串以供輸入組件使用
const minDateStr = computed(() => formatSimpleDate(ensureSimpleDate(props.minDate)));
const maxDateStr = computed(() => formatSimpleDate(ensureSimpleDate(props.maxDate)));

// 輸出格式計算
const outputFormat = computed(() => {
    return props.outputDateFormat || (props.showTime
        ? `${internalDateFormat.value} ${internalTimeFormat.value}`
        : internalDateFormat.value);
});

const dateInputFormat = computed(() => internalDateFormat.value);

// 合併常規錯誤和格式錯誤的計算屬性
const mergedErrors = computed(() => {
    return { ...errors.value, ...formatErrors.value };
});

// 驗證自定義預設時間格式
const validateCustomDefaultTime = (timeStr: string): boolean => {
    if (!timeStr) return false;

    // 檢查基本格式 HH:mm:ss 或 HH:mm
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])(?::([0-5]?[0-9]))?$/;
    if (!timeRegex.test(timeStr)) {
        console.warn(`customDefaultTime 格式不正確: ${timeStr}，應為 HH:mm:ss 或 HH:mm 格式`);
        return false;
    }

    const parts = timeStr.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const seconds = parts[2] ? parseInt(parts[2]) : 0;

    // 驗證範圍
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
        console.warn(`customDefaultTime 時間值超出範圍: ${timeStr}`);
        return false;
    }

    return true;
};

// 獲取有效的預設時間
const getValidDefaultTime = (): string => {
    const defaultTime = props.customDefaultTime || '00:00:00';

    if (validateCustomDefaultTime(defaultTime)) {
        // 確保格式完整 (HH:mm:ss)
        const parts = defaultTime.split(':');
        const hours = parts[0].padStart(2, '0');
        const minutes = parts[1].padStart(2, '0');
        const seconds = parts[2] ? parts[2].padStart(2, '0') : '00';

        return `${hours}:${minutes}:${seconds}`;
    } else {
        // 如果自定義時間無效，使用 00:00:00
        console.warn('customDefaultTime 無效，使用預設值 00:00:00');
        return '00:00:00';
    }
};

// 從SimpleDateValue獲取時間部分
const getTimeFromDateTime = (dateTime: SimpleDateValue | null): string | null => {
    if (!dateTime || dateTime.hour === undefined) return null;

    const hour = dateTime.hour.toString().padStart(2, '0');
    const minute = (dateTime.minute || 0).toString().padStart(2, '0');

    if (props.enableSeconds) {
        const second = (dateTime.second || 0).toString().padStart(2, '0');
        return `${hour}:${minute}:${second}`;
    } else {
        return `${hour}:${minute}`;
    }
};

// 從日期和時間字串創建SimpleDateValue
const createDateTimeFromInputs = (dateStr: string | null, timeStr: string | null): SimpleDateValue | null => {
    if (!dateStr) return null;

    const date = dayjs(dateStr);
    if (!date.isValid()) return null;

    if (!timeStr && !props.showTime) {
        // 如果不需要時間，只返回日期部分
        return createSimpleDate(date.year(), date.month() + 1, date.date());
    } else if (!timeStr) {
        // 如果需要時間但未提供，返回null
        return null;
    }

    const timeParts = timeStr.split(':').map(Number);
    const hour = timeParts[0] || 0;
    const minute = timeParts[1] || 0;
    const second = timeParts[2] || 0;

    return createSimpleDate(date.year(), date.month() + 1, date.date(), hour, minute, second);
};

// 監聽外部值變化
watch(() => props.modelValue, (newValue) => {
    const dateTime = parseToSimpleDate(newValue);
    internalDateTime.value = dateTime;

    if (dateTime) {
        // 設置日期部分
        inputDateValue.value = formatSimpleDate(dateTime, props.dateFormat);

        // 設置時間部分
        inputTimeValue.value = getTimeFromDateTime(dateTime);
    } else {
        inputDateValue.value = null;
        inputTimeValue.value = null;
    }
}, { immediate: true });

// 驗證事件處理 - 日期部分
const onDateInputValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
    // 合併錯誤
    Object.assign(errors.value, validationErrors);

    // 如果沒有日期錯誤，移除所有日期相關鍵
    if (isValid) {
        ['year', 'month', 'day', 'date'].forEach(key => {
            if (errors.value[key]) delete errors.value[key];
        });
    }

    // 發送驗證結果
    const hasErrors = Object.keys(errors.value).length > 0;
    emit('validation', !hasErrors, errors.value);
};

// 驗證事件處理 - 時間部分
const onTimeInputValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
    // 合併錯誤
    Object.assign(errors.value, validationErrors);

    // 如果沒有時間錯誤，移除所有時間相關鍵
    if (isValid) {
        ['hour', 'minute', 'second', 'time'].forEach(key => {
            if (errors.value[key]) delete errors.value[key];
        });
    }

    // 發送驗證結果
    const hasErrors = Object.keys(errors.value).length > 0;
    emit('validation', !hasErrors, errors.value);
};

// 日期完成事件處理
const onDateInputComplete = (dateStr: string) => {
    inputDateValue.value = dateStr;
    // 如果啟用時間且沒有時間值，自動聚焦到時間輸入
    if (props.showTime && !inputTimeValue.value) {
        const defaultTime = getValidDefaultTime();
        inputTimeValue.value = defaultTime;

        // 根據配置決定是否自動聚焦到時間輸入
        if (props.autoFocusTimeAfterDate) {
            nextTick(() => {
                if (timeInputRef.value?.focus) {
                    timeInputRef.value.focus();
                }
            });
        }
    }
    updateDateTimeValue();
};

// 時間選擇處理
const onTimeSelect = (timeStr: string) => {
    inputTimeValue.value = timeStr;
    updateDateTimeValue();
};

// 時間完成事件處理
const onTimeInputComplete = (timeStr: string) => {
    inputTimeValue.value = timeStr;
    updateDateTimeValue();
};

// 更新完整的日期時間值
const updateDateTimeValue = () => {
    if (!inputDateValue.value) {
        emitUpdate(null);
        return;
    }

    // 如果沒有時間值，自動生成一個默認的 00:00:00
    if (!inputTimeValue.value && props.showTime) {
        const defaultTime = getValidDefaultTime();
        inputTimeValue.value = defaultTime;
    }

    const dateTime = createDateTimeFromInputs(inputDateValue.value, inputTimeValue.value);

    if (dateTime) {
        internalDateTime.value = dateTime;
        emitUpdate(dateTime);
    }
};

// 發送更新事件
const emitUpdate = (dateTime: SimpleDateValue | null) => {
    const formattedOutput = formatOutput(dateTime, props.outputFormat, outputFormat.value);

    emit('update:modelValue', formattedOutput);
    emit('change', formattedOutput);
};

// 日曆選擇處理 - 接收 CalendarDate 並轉換為 SimpleDateValue
const onCalendarSelect = (date: any, closeCalendar: boolean = true) => {
    // 將 CalendarDate 轉換為 SimpleDateValue
    const simpleDate = fromCalendarDate(date);
    inputDateValue.value = formatSimpleDate(simpleDate, props.dateFormat);
    updateDateTimeValue();

    if (closeCalendar) {
        hideCalendar();
    }
};

// 切換日曆顯示
const toggleCalendar = () => {
    if (props.disabled) return;

    showCalendar.value = !showCalendar.value;

    if (showCalendar.value) {
        nextTick(() => {
            updateCalendarPosition();
        });
    }
};

// 隱藏日曆
const hideCalendar = () => {
    showCalendar.value = false;
};

// 更新日曆位置
const updateCalendarPosition = () => {
    if (!pickerRef.value || !calendarRef.value) return;

    // 獲取輸入框位置
    const pickerRect = pickerRef.value.getBoundingClientRect();
    const calendar = calendarRef.value;

    // 設置為輸入框下方
    calendar.style.position = 'absolute';
    calendar.style.top = `${pickerRect.height + 5}px`;
    calendar.style.left = '0';
};

// 處理點擊事件
const handleClickOutside = (event: MouseEvent) => {
    const calendar = calendarRef.value;
    const picker = pickerRef.value;
    const target = event.target as Node;

    if (showCalendar.value && calendar && !calendar.contains(target) &&
        picker && !picker.contains(target)) {
        hideCalendar();
    }
};

const handleContainerClick = (event: MouseEvent) => {
    // 如果組件被禁用，則不處理
    if (props.disabled) return;

    const target = event.target as HTMLElement;

    // 檢查是否點擊到了輸入框或按鈕
    const isInputElement = target.classList.contains('date-input') ||
        target.classList.contains('time-input') ||
        target.closest('input') ||
        target.closest('button');

    // 如果點擊的不是輸入框或按鈕，則聚焦到第一個輸入框
    if (!isInputElement) {
        event.preventDefault(); // 防止默認行為
        focusFirstInput();
    }
};

const handleContainerMouseDown = (event: MouseEvent) => {
    if (props.disabled) return;

    const target = event.target as HTMLElement;

    // 如果點擊的不是輸入框，防止失去焦點
    const isInputElement = target.classList.contains('date-input') ||
        target.classList.contains('time-input') ||
        target.closest('input') ||
        target.closest('button');

    if (!isInputElement) {
        event.preventDefault();
    }
};
// 聚焦到第一個輸入框的邏輯
const focusFirstInput = () => {
    // 使用 nextTick 確保 DOM 更新完成
    nextTick(() => {
        if (dateInputRef.value?.focus) {
            dateInputRef.value.focus();
        }
    });
};

// 處理窗口大小變化
const handleResize = () => {
    if (showCalendar.value) {
        updateCalendarPosition();
    }
};

// 處理滾動事件
const handleScroll = () => {
    if (showCalendar.value) {
        updateCalendarPosition();
    }
};

// 事件監聽器
onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleScroll);
});

//#region: 設置主題
const {
    themeClasses,
    containerAttributes,
    setColor,
    setMode,
    currentMode,
    isDark,
    isLight
} = useTheme();

// 監聽 props 變化
watch(() => props.theme, (newTheme) => {
    if (newTheme) {
        setColor(newTheme);  // 設置顏色主題
    }
}, { immediate: true });

watch(() => props.mode, (newMode) => {
    setMode(newMode);  // 設置主題模式
}, { immediate: true });
//#endregion

onBeforeMount(() => {
    // 驗證日期和時間格式
    if (!isValidDateFormat(props.dateFormat)) {
        const originalFormat = props.dateFormat;
        const fixedFormat = fixDateFormat(props.dateFormat);

        // 將錯誤添加到 formatErrors
        formatErrors.value.dateFormat = `日期格式不正確: "${originalFormat}" 已自動修復為 "${fixedFormat}"`;
        console.warn(`日期格式 "${originalFormat}" 不正確，已自動修復為 "${fixedFormat}"`);

        internalDateFormat.value = fixedFormat;
    } else {
        internalDateFormat.value = props.dateFormat;
    }

    // 驗證並自動修復時間格式
    if (props.showTime && !isValidTimeFormat(props.timeFormat)) {
        const originalFormat = props.timeFormat;
        const fixedFormat = fixTimeFormat(props.timeFormat);

        // 將錯誤添加到 formatErrors
        formatErrors.value.timeFormat = `時間格式不正確: "${originalFormat}" 已自動修復為 "${fixedFormat}"`;
        console.warn(`時間格式 "${originalFormat}" 不正確，已自動修復為 "${fixedFormat}"`);

        internalTimeFormat.value = fixedFormat;
    } else {
        internalTimeFormat.value = props.timeFormat;
    }
});

// 公開方法
defineExpose({
    focus: focusFirstInput,
    reset: () => {
        internalDateTime.value = null;
        inputDateValue.value = null;
        inputTimeValue.value = null;
        errors.value = {};
        emit('update:modelValue', null);
    },
    validate: () => {
        dateInputRef.value?.validate();
        if (props.showTime && timeInputRef.value) {
            timeInputRef.value.validate();
        }
    },
    getDateTime: () => createDateTimeFromInputs(inputDateValue.value, inputTimeValue.value),
    setDateTime: (dateTime: SimpleDateValue | null) => {
        internalDateTime.value = dateTime;

        if (dateTime) {
            inputDateValue.value = formatSimpleDate(dateTime);
            inputTimeValue.value = getTimeFromDateTime(dateTime);
        } else {
            inputDateValue.value = null;
            inputTimeValue.value = null;
        }

        emitUpdate(dateTime);
    },
    getNow,
    selectNow: () => {
        const now = getNow();
        internalDateTime.value = now;
        inputDateValue.value = formatSimpleDate(now);
        inputTimeValue.value = getTimeFromDateTime(now);

        emitUpdate(now);
    },

    // 主題控制方法
    setTheme: setColor,
    setDarkMode: () => setMode('dark'),
    setLightMode: () => setMode('light'),
    setAutoMode: () => setMode('auto'),
    getCurrentMode: () => currentMode.value,
    isDarkMode: () => isDark.value,
    isLightMode: () => isLight.value,
});
</script>
