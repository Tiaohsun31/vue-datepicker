<template>
    <div class="date-time-picker-wrapper relative w-full"
        :class="[themeClasses, showTime ? 'min-w-[300px]' : 'min-w-[150px]']" v-bind="containerAttributes"
        ref="containerRef">

        <!-- 日期時間輸入容器 -->
        <DateContainer :errors="mergedErrors">
            <div v-if="calendar === 'gregory'" class="flex w-full items-center justify-start gap-1"
                @click="handleContainerClick" @mousedown="handleContainerMouseDown">

                <!-- 日期輸入部分 -->
                <div>
                    <DateInput ref="dateInputRef" v-model="inputDateValue" :year-placeholder="computedPlaceholders.year"
                        :month-placeholder="computedPlaceholders.month" :day-placeholder="computedPlaceholders.day"
                        :min-date="minDateStr" :max-date="maxDateStr" :required="required" :auto-focus="autoFocus"
                        :separator="separator" :date-format="dateInputFormat" @validation="handleDateValidation"
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
            <div v-else class="flex w-full items-center justify-start gap-1" @click="toggleCalendar">
                {{ inputDateValue }}
                <span v-if="showTime"> {{ inputTimeValue }}</span>
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

            <!-- 日曆系統狀態指示器（開發時顯示） -->
            <div v-if="showCalendarInfo && calendarSystem"
                class="px-2 py-1 text-xs text-vdt-content-muted border-b border-vdt-outline">
                📅 {{ currentCalendarName }}
                <span v-if="!calendarInitialized" class="text-orange-500">初始化中...</span>
                <span v-else class="text-green-500">✓</span>
            </div>

            <CalendarGrid :value="calendarDateForGrid" :min-date="calendarMinDate" :max-date="calendarMaxDate"
                :showTimeSelector="showTime" :time-value="inputTimeValue" :use24Hour="use24Hour"
                :default-time="getValidDefaultTime" :enableSeconds="enableSeconds" :locale="locale"
                :calendarSystem="(calendarSystem as UnifiedCalendarSystem)" @select="handleCalendarSelect"
                @time-select="handleTimeSelect" />
        </div>
    </div>

    <!-- 錯誤訊息顯示 - 可選且可自定義 -->
    <div v-if="showErrorMessage && hasErrors">
        <!-- 讓使用者完全控制錯誤顯示 -->
        <slot name="error" :errors="mergedErrors" :hasErrors="hasErrors" :calendarSystem="calendarSystem">
            <!-- 預設使用 DateErrorMessage -->
            <DateErrorMessage :errors="mergedErrors" :locale="locale" :use-i18n="useI18n"
                :custom-messages="customErrorMessages">
                <!-- 將內部的 slot 轉發給使用者 -->
                <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
                    <slot :name="slotName" v-bind="slotProps" />
                </template>
            </DateErrorMessage>
        </slot>
    </div>
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
import { UnifiedCalendarSystem } from './utils/calendarSystem';

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

    calendar?: string;              // 日曆系統 ID，如 'gregory', 'roc', 'japanese'
    showCalendarInfo?: boolean;     // 是否顯示日曆系統資訊（開發用）

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

    // 錯誤處理選項
    showErrorMessage?: boolean;  // 是否顯示錯誤訊息
    useI18n?: boolean;           // 是否使用內建i18n
    customErrorMessages?: Record<string, string>; // 自定義錯誤訊息
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    mode: 'auto',
    theme: () => 'violet',

    calendar: 'gregory',           // 預設使用西元曆
    showCalendarInfo: false,       // 生產環境不顯示

    yearPlaceholder: '',           // 將動態從日曆系統獲取
    monthPlaceholder: '',          // 將動態從日曆系統獲取
    dayPlaceholder: '',            // 將動態從日曆系統獲取

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
    showErrorMessage: true,     // 預設顯示錯誤訊息
    useI18n: true,
    customErrorMessages: () => ({})
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
        calendar: props.calendar,        // 新增：傳入日曆系統
        dateFormat: internalDateFormat.value,
        timeFormat: internalTimeFormat.value,
        outputFormat: props.outputFormat,
        customDefaultTime: props.customDefaultTime,
        enableSeconds: props.enableSeconds,
        autoFocusTimeAfterDate: props.autoFocusTimeAfterDate,
        minDate: props.minDate,
        maxDate: props.maxDate,
        autoFocus: props.autoFocus,
        locale: props.locale,           // 新增：傳入語言
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

// 日曆系統相關計算屬性
const computedPlaceholders = computed(() => {
    // 如果用戶提供了自定義 placeholder，優先使用
    if (props.yearPlaceholder || props.monthPlaceholder || props.dayPlaceholder) {
        return {
            year: props.yearPlaceholder || '年',
            month: props.monthPlaceholder || '月',
            day: props.dayPlaceholder || '日'
        };
    }

    // 否則使用日曆系統的動態 placeholder
    return datePicker.dynamicPlaceholders.value;
});

const currentCalendarName = computed(() => {
    if (!datePicker.calendarSystem.value) return '載入中...';

    const calendarId = datePicker.calendarSystem.value.getCurrentCalendar();
    if (calendarId === 'gregory') return '西元曆';

    // 可以擴展為更完整的名稱映射
    const nameMap: Record<string, string> = {
        'roc': '民國曆',
        'buddhist': '佛曆',
        'japanese': '日本年號',
        'islamic': '伊斯蘭曆',
        'persian': '波斯曆'
    };

    return nameMap[calendarId] || calendarId;
});

// 合併所有錯誤（格式錯誤 + 驗證錯誤）
const mergedErrors = computed(() => {
    return {
        ...datePicker.mergedErrors.value,
        ...formatErrors.value
    };
});

// 是否有錯誤
const hasErrors = computed(() => {
    return Object.keys(mergedErrors.value).length > 0;
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

// === 新增：監聽日曆變化 ===
watch(() => props.calendar, (newCalendar) => {
    if (newCalendar && datePicker.calendarSystem.value) {
        const success = datePicker.calendarSystem.value.setCalendar(newCalendar);
        if (success) {
            // 更新 placeholder
            datePicker.updatePlaceholders();
        }
    }
}, { immediate: false });

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

    // === 新增：日曆系統相關 ===
    getCalendarSystem: () => datePicker.calendarSystem.value,
    setCalendar: async (calendarId: string) => {
        if (datePicker.calendarSystem.value) {
            const success = datePicker.calendarSystem.value.setCalendar(calendarId);
            if (success) {
                datePicker.updatePlaceholders();
            }
            return success;
        }
        return false;
    },
    getCurrentCalendar: () => datePicker.calendarSystem.value?.getCurrentCalendar() || 'gregory',
    parseInput: (input: string) => datePicker.parseInputWithCalendar(input),

    // 主題控制
    setTheme: setColor,
    setDarkMode: () => setMode('dark'),
    setLightMode: () => setMode('light'),
    setAutoMode: () => setMode('auto'),
    getCurrentMode: () => currentMode.value,
    isDarkMode: () => isDark.value,
    isLightMode: () => isLight.value,

    // 錯誤相關
    getErrors: () => mergedErrors.value,
    hasErrors: () => hasErrors.value
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
    calendarInitialized,          // 新增
    calendarSystem,               // 新增

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
