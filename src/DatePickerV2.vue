<!-- 重構後的 DatePicker.vue - 使用 Composables -->
<template>
    <div class="date-time-picker-wrapper relative w-full"
        :class="[themeClasses, showTime ? 'min-w-[300px]' : 'min-w-[150px]']" v-bind="containerAttributes"
        ref="containerRef">

        <!-- 日期時間輸入容器 -->
        <DateContainer :errors="mergedErrors">
            <div class="flex w-full items-center justify-start gap-1" @click="handleContainerClick"
                @mousedown="handleContainerMouseDown">

                <!-- 日期輸入部分 -->
                <div>
                    <DateInput ref="dateInputRef" v-model="inputDateValue" :year-placeholder="yearPlaceholder"
                        :month-placeholder="monthPlaceholder" :day-placeholder="dayPlaceholder" :min-date="minDateStr"
                        :max-date="maxDateStr" :required="required" :auto-focus="autoFocus" :separator="separator"
                        :date-format="dateInputFormat" @validation="handleDateValidation"
                        @complete="handleDateComplete" />
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
                        :useLocalizedPeriod="useLocalizedPeriod" @validation="handleTimeValidation"
                        @complete="handleTimeComplete" @navigate-to-date="handleNavigateToDate" />
                </div>
            </div>

            <!-- 日曆圖標和清除按鈕 -->
            <button v-if="hasValue && !disabled && showClearButton" type="button"
                class="text-gray-400 hover:text-red-500 transition-colors duration-200" @click="reset"
                :title="'清除日期' + (showTime ? '時間' : '')">
                <ClearIcon class="h-4 w-4 cursor-pointer" />
            </button>
            <button v-else type="button" class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
                :default-time="getValidDefaultTime" :enableSeconds="enableSeconds" :locale="locale"
                @select="handleCalendarSelect" @time-select="handleTimeSelect" />
        </div>
    </div>

    <!-- 錯誤訊息 -->
    <DateErrorMessage :errors="mergedErrors" />
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, watch } from 'vue';

// 組件導入
import DateContainer from './components/calendar/DateContainer.vue';
import DateInput from './components/inputs/DateInput.vue';
import TimeInput from './components/inputs/TimeInput.vue';
import DateErrorMessage from './components/calendar/DateErrorMessage.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import CalendarGrid from './components/calendar/CalendarGrid.vue';
import ClearIcon from './components/icons/ClearIcon.vue';

// Composables
import { useDateTimePicker } from './composables/useDateTimePicker';
import { useTheme } from './composables/useTheme';

// Utils
import {
    formatSimpleDate,
    ensureSimpleDate,
    isValidDateFormat,
    isValidTimeFormat,
    fixDateFormat,
    fixTimeFormat,
    type DateTimeValue,
    type OutputFormat
} from './utils/dateUtils';
import { type TailwindColor } from './types/main';

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
    customDefaultTime?: string;
    autoFocusTimeAfterDate?: boolean;

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
    showClearButton?: boolean;

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
    customDefaultTime: '09:00:00',
    autoFocusTimeAfterDate: true,
    disabled: false,
    required: true,
    locale: 'zh-TW',
    separator: '-',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    autoFocus: false,
    showClearButton: true,
    outputFormat: 'iso',
});

const emit = defineEmits<{
    'update:modelValue': [date: DateTimeValue];
    'change': [date: DateTimeValue];
    'validation': [isValid: boolean, errors: Record<string, string>];
}>();

// DOM 引用
const containerRef = ref<HTMLElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const dateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const timeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);

// 內部格式狀態
const internalDateFormat = ref(props.dateFormat);
const internalTimeFormat = ref(props.timeFormat);
const formatErrors = ref<Record<string, string>>({});

// 使用主要的 DateTimePicker composable
const datePicker = useDateTimePicker(
    {
        modelValue: props.modelValue,
        showTime: props.showTime,
        required: props.required,
        disabled: props.disabled,
        dateFormat: internalDateFormat.value,
        timeFormat: internalTimeFormat.value,
        outputFormat: props.outputFormat,
        customDefaultTime: props.customDefaultTime,
        enableSeconds: props.enableSeconds,
        autoFocusTimeAfterDate: props.autoFocusTimeAfterDate,
        minDate: props.minDate,
        maxDate: props.maxDate,
        autoFocus: props.autoFocus,
    },
    {
        containerRef,
        calendarRef,
        dateInputRef,
        timeInputRef
    }
);

// 設置事件發射器
datePicker.setEmitters({
    update: (value) => emit('update:modelValue', value),
    change: (value) => emit('change', value),
    validation: (isValid, errors) => emit('validation', isValid, errors)
});

// 使用主題 composable
const {
    themeClasses,
    containerAttributes,
    setColor,
    setMode,
    currentMode,
    isDark,
    isLight
} = useTheme();

// 計算屬性
const minDateStr = computed(() => formatSimpleDate(ensureSimpleDate(props.minDate)));
const maxDateStr = computed(() => formatSimpleDate(ensureSimpleDate(props.maxDate)));
const dateInputFormat = computed(() => internalDateFormat.value);

// 合併格式錯誤
const mergedErrors = computed(() => {
    return { ...datePicker.mergedErrors.value, ...formatErrors.value };
});

// 格式驗證和修復
onBeforeMount(() => {
    // 驗證日期格式
    if (!isValidDateFormat(props.dateFormat)) {
        const originalFormat = props.dateFormat;
        const fixedFormat = fixDateFormat(props.dateFormat);

        formatErrors.value.dateFormat = `日期格式不正確: "${originalFormat}" 已自動修復為 "${fixedFormat}"`;
        console.warn(`日期格式 "${originalFormat}" 不正確，已自動修復為 "${fixedFormat}"`);

        internalDateFormat.value = fixedFormat;
    }

    // 驗證時間格式
    if (props.showTime && !isValidTimeFormat(props.timeFormat)) {
        const originalFormat = props.timeFormat;
        const fixedFormat = fixTimeFormat(props.timeFormat);

        formatErrors.value.timeFormat = `時間格式不正確: "${originalFormat}" 已自動修復為 "${fixedFormat}"`;
        console.warn(`時間格式 "${originalFormat}" 不正確，已自動修復為 "${fixedFormat}"`);

        internalTimeFormat.value = fixedFormat;
    }
});

// 監聽主題變化
watch(() => props.theme, (newTheme) => {
    if (newTheme) {
        setColor(newTheme);
    }
}, { immediate: true });

watch(() => props.mode, (newMode) => {
    setMode(newMode);
}, { immediate: true });

// 公開方法
defineExpose({
    // 基本操作
    focus: datePicker.focus,
    reset: datePicker.reset,
    validate: datePicker.validate,
    selectNow: datePicker.selectNow,

    // 數據獲取
    getDateTime: () => datePicker.internalDateTime.value,
    setDateTime: (dateTime: any) => {
        datePicker.setExternalValue(dateTime);
    },

    // 主題控制
    setTheme: setColor,
    setDarkMode: () => setMode('dark'),
    setLightMode: () => setMode('light'),
    setAutoMode: () => setMode('auto'),
    getCurrentMode: () => currentMode.value,
    isDarkMode: () => isDark.value,
    isLightMode: () => isLight.value,
});

// 暴露 composable 的方法（解構賦值）
const {
    // 狀態
    inputDateValue,
    inputTimeValue,
    showCalendar,
    calendarDateForGrid,
    calendarMinDate,
    calendarMaxDate,
    getValidDefaultTime,
    hasValue,

    // 事件處理
    handleDateValidation,
    handleTimeValidation,
    handleDateComplete,
    handleTimeComplete,
    handleCalendarSelect,
    handleTimeSelect,
    handleContainerClick,
    handleContainerMouseDown,
    handleNavigateToDate,

    // 日曆控制
    toggleCalendar,

    // 清除功能
    reset,
} = datePicker;
</script>
