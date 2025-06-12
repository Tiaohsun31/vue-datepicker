<!-- DateRange.vue -->
<template>
    <div class="date-range-wrapper md:min-w-auto relative w-full"
        :class="[themeClasses, showTime ? 'min-w-[300px]' : 'min-w-[200px]']" v-bind="containerAttributes"
        ref="containerRef">

        <!-- 日期範圍顯示容器 -->
        <div class="date-picker-container flex w-full items-center px-2 py-1 border border-gray-200 bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="[{ 'border-red-500 ring-2 ring-red-200': hasErrors }]">
            <button type="button" class="flex items-center gap-1 flex-1 cursor-pointer transition-colors duration-200"
                :disabled="disabled" @click="toggleCalendar">
                <!-- 開始日期 -->
                <div class="flex-1 text-center whitespace-nowrap">
                    <span v-if="displayStartDate" class="text-vdt-content text-sm">
                        {{ displayStartDate }}
                    </span>
                    <span v-else class="text-vdt-content-muted text-sm">
                        {{ computedPlaceholders.start }}
                    </span>
                </div>

                <!-- 分隔符 -->
                <div class="text-vdt-content-muted text-sm px-1">
                    {{ separator }}
                </div>

                <!-- 結束日期 -->
                <div class="flex-1 text-center whitespace-nowrap">
                    <span v-if="displayEndDate" class="text-vdt-content text-sm">
                        {{ displayEndDate }}
                    </span>
                    <span v-else class="text-vdt-content-muted text-sm">
                        {{ computedPlaceholders.end }}
                    </span>
                </div>
            </button>

            <!-- 日曆圖標和清除按鈕 -->
            <button v-if="hasRangeValue && !disabled && showClearButton" type="button"
                class="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                @click="clearRange" :title="'清除日期' + (showTime ? '時間' : '')">
                <ClearIcon class="h-4 w-4 cursor-pointer" />
            </button>
            <button v-else type="button"
                class="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                :disabled="disabled" @click="toggleCalendar">
                <CalendarIcon class="h-5 w-5 cursor-pointer" />
            </button>
        </div>

        <!-- 日期範圍選擇彈窗 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10 overflow-auto md:min-w-[570px]"
            @click.stop role="dialog" aria-modal="true" aria-label="date-range-picker">

            <!-- 範圍選擇器內容 -->
            <div class="p-2 space-y-2">
                <!-- 輸入區域 -->
                <div class="w-full flex flex-col md:flex-row flex-justify-between gap-2">
                    <!-- 開始日期輸入 -->
                    <div @click="focusStartDate"
                        class="flex-1 flex w-full items-center px-2 py-1 gap-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200">
                        <DateInput ref="startDateInputRef" v-model="startDateTime.inputDateValue.value"
                            :year-placeholder="computedPlaceholders.year"
                            :month-placeholder="computedPlaceholders.month" :day-placeholder="computedPlaceholders.day"
                            :max-date="endDateTime.inputDateValue.value" :min-date="minDateStr"
                            :date-format="dateInputFormat" @validation="handleStartDateValidation"
                            @complete="handleStartDateComplete" />

                        <TimeInput v-if="showTime" ref="startTimeInputRef" v-model="startDateTime.inputTimeValue.value"
                            :hour-placeholder="computedPlaceholders.hour"
                            :minute-placeholder="computedPlaceholders.minute"
                            :second-placeholder="computedPlaceholders.second" :enable-seconds="enableSeconds"
                            :use24Hour="use24Hour" :locale="locale" @validation="handleStartTimeValidation"
                            @complete="handleStartTimeComplete" @navigate-to-date="handleStartNavigateToDate" />
                    </div>

                    <!-- 結束日期輸入 -->
                    <div @click="focusEndDate"
                        class="flex-1 flex w-full items-center gap-2 px-2 py-1 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200">
                        <DateInput ref="endDateInputRef" v-model="endDateTime.inputDateValue.value"
                            :year-placeholder="computedPlaceholders.year"
                            :month-placeholder="computedPlaceholders.month" :day-placeholder="computedPlaceholders.day"
                            :min-date="startDateTime.inputDateValue.value" :max-date="maxDateStr"
                            :date-format="dateInputFormat" @validation="handleEndDateValidation"
                            @complete="handleEndDateComplete" />

                        <TimeInput v-if="showTime" ref="endTimeInputRef" v-model="endDateTime.inputTimeValue.value"
                            :hour-placeholder="computedPlaceholders.hour"
                            :minute-placeholder="computedPlaceholders.minute"
                            :second-placeholder="computedPlaceholders.second" :enable-seconds="enableSeconds"
                            :use24Hour="use24Hour" :locale="locale" @validation="handleEndTimeValidation"
                            @complete="handleEndTimeComplete" @navigate-to-date="handleEndNavigateToDate" />
                    </div>
                </div>

                <!-- 快捷選項 -->
                <div v-if="shortcuts.length > 0 && showShortcuts">
                    <div class="flex flex-wrap gap-2">
                        <button v-for="shortcut in shortcuts" :key="shortcut.label" type="button"
                            class="px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors"
                            @click="applyShortcut(shortcut)">
                            {{ shortcut.label }}
                        </button>
                    </div>
                </div>

                <!-- 雙月日曆 -->
                <div class="calendar-container flex flex-col md:flex-row gap-1 overflow-auto">
                    <DualMonthCalendar :range-start="startDateTime.internalDateTime.value"
                        :range-end="endDateTime.internalDateTime.value" :min-date="parseInputToSimpleDate(minDate)"
                        :max-date="parseInputToSimpleDate(maxDate)" :locale="locale" :week-starts-on="weekStartsOn"
                        @range-select="handleCalendarRangeSelect" />
                </div>

                <!-- 操作按鈕 -->
                <!-- <div class="flex justify-between mt-3 pt-2 border-t border-vdt-outline">
                    <button type="button" class="px-4 py-1 text-sm text-vdt-content-secondary hover:text-vdt-content"
                        @click="clearRange">
                        清除
                    </button>
                    <div class="flex gap-2">
                        <button type="button"
                            class="px-4 py-1 text-sm border border-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm"
                            @click="hideCalendar">
                            取消
                        </button>
                        <button type="button"
                            class="px-4 py-1 text-sm bg-vdt-theme-500 text-white hover:bg-vdt-theme-600 rounded-sm"
                            :disabled="!isValidRange" @click="confirmRange">
                            確定
                        </button>
                    </div>
                </div> -->
            </div>
        </div>
    </div>

    <!-- 錯誤訊息顯示 - 可選且可自定義 -->
    <div v-if="showErrorMessage && hasErrors">
        <!-- 讓使用者完全控制錯誤顯示 -->
        <slot name="error" :errors="mergedErrors" :hasErrors="hasErrors">
            <DateErrorMessage :errors="mergedErrors" :locale="locale" :use-i18n="useI18n"
                :custom-messages="customErrorMessages">
                <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
                    <slot :name="slotName" v-bind="slotProps" />
                </template>
            </DateErrorMessage>
        </slot>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue';

// 組件導入
import DateInput from './components/inputs/DateInput.vue';
import TimeInput from './components/inputs/TimeInput.vue';
import DateErrorMessage from './components/calendar/DateErrorMessage.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import ClearIcon from './components/icons/ClearIcon.vue';
import DualMonthCalendar from './components/calendar/DualMonthCalendar.vue';

// Composables
import { useDateRange } from './composables/useDateRange';
import { useTheme } from './composables/useTheme';

// Utils
import {
    parseInputToSimpleDate,
    formatSimpleDate,
    ensureSimpleDate,
    type DateTimeInput,
} from './utils/dateUtils';
import type { DateRangeProps } from '@/types/datePickerProps';
import { useLocale } from '@/composables/useLocale';

const props = withDefaults(defineProps<DateRangeProps>(), {
    modelValue: null,
    mode: 'auto',
    theme: () => 'violet',

    // 日曆系統
    calendar: 'gregory',
    locale: 'zh-TW',
    outputType: 'iso',
    useStrictISO: false,

    // 日期相關屬性
    weekStartsOn: 0,
    dateSeparator: '-',
    dateFormat: 'YYYY-MM-DD',
    minDate: undefined,
    maxDate: undefined,

    // 時間相關屬性
    timeFormat: 'HH:mm:ss',
    showTime: false,
    enableSeconds: true,
    use24Hour: true,
    useLocalizedPeriod: false,
    customDefaultTime: '00:00:00',
    autoFocusTimeAfterDate: false,

    // 一般選項
    disabled: false,
    inputEnabled: true,
    required: false,
    showClearButton: true,


    // 輸入框佔位符
    placeholderOverrides: () => ({}),

    // 範圍特定
    separator: ' ~ ',
    showShortcuts: false,
    incomplete: true,

    maxRange: undefined,
    minRange: undefined,

    // 錯誤處理
    showErrorMessage: true,
    useI18n: true,
    customErrorMessages: () => ({})
});

const emit = defineEmits<{
    'update:modelValue': [range: { start: DateTimeInput; end: DateTimeInput } | null];
    'change': [range: { start: DateTimeInput; end: DateTimeInput } | null];
    'validation': [isValid: boolean, errors: Record<string, string>];
}>();

// DOM 引用
const containerRef = ref<HTMLElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const startDateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const endDateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const startTimeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);
const endTimeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);

// 使用日期範圍 composable
const dateRange = useDateRange(
    {
        modelValue: props.modelValue,
        showTime: props.showTime,
        required: props.required,
        disabled: props.disabled,
        dateFormat: props.dateFormat,
        timeFormat: props.timeFormat,
        outputType: props.outputType,
        enableSeconds: props.enableSeconds,
        minDate: props.minDate,
        maxDate: props.maxDate,
        maxRange: props.maxRange,
        minRange: props.minRange,
        incomplete: props.incomplete,
    },
    {
        containerRef,
        calendarRef,
        startDateInputRef,
        endDateInputRef,
        startTimeInputRef,
        endTimeInputRef
    }
);

const { setLocale, getPlaceholderMessage } = useLocale(props.locale);

// 設置事件發射器
dateRange.setEmitters({
    update: (range) => emit('update:modelValue', range),
    change: (range) => emit('change', range),
    validation: (isValid, errors) => emit('validation', isValid, errors)
});

// 使用主題 composable
const {
    themeClasses,
    containerAttributes,
    setColor,
    setMode
} = useTheme();

const computedPlaceholders = computed(() => {
    // 從語言包獲取預設值
    const localePlaceholders = {
        start: getPlaceholderMessage('range.start'),
        end: getPlaceholderMessage('range.end'),
        year: getPlaceholderMessage('date.year'),
        month: getPlaceholderMessage('date.month'),
        day: getPlaceholderMessage('date.day'),
        hour: getPlaceholderMessage('time.hour'),
        minute: getPlaceholderMessage('time.minute'),
        second: getPlaceholderMessage('time.second')
    };

    // 允許 props 覆寫
    return {
        start: props.placeholderOverrides?.start || localePlaceholders.start,
        end: props.placeholderOverrides?.end || localePlaceholders.end,
        // 時間相關
        hour: props.placeholderOverrides?.hour || localePlaceholders.hour,
        minute: props.placeholderOverrides?.minute || localePlaceholders.minute,
        second: props.placeholderOverrides?.second || localePlaceholders.second,
        // 日期相關
        year: props.placeholderOverrides?.year || localePlaceholders.year,
        month: props.placeholderOverrides?.month || localePlaceholders.month,
        day: props.placeholderOverrides?.day || localePlaceholders.day
    };
});

const minDateStr = computed(() => formatSimpleDate(ensureSimpleDate(props.minDate)));
const maxDateStr = computed(() => formatSimpleDate(ensureSimpleDate(props.maxDate)));
const dateInputFormat = computed(() => props.dateFormat);

// 合併所有錯誤
const mergedErrors = computed(() => {
    return dateRange.mergedErrors.value;
});

// 是否有錯誤
const hasErrors = computed(() => {
    return Object.keys(mergedErrors.value).length > 0;
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

watch(() => props.locale, (newLocale) => {
    if (newLocale) {
        setLocale(newLocale);
    }
}, { immediate: true });

onBeforeMount(() => {
    // 初始化語言環境
    setLocale(props.locale);
});

// 公開方法
defineExpose({
    // 基本操作
    reset: dateRange.clearRange,
    validate: dateRange.validate,
    setRange: dateRange.setRange,

    // 聚焦方法
    focusStartDate: dateRange.focusStartDate,
    focusEndDate: dateRange.focusEndDate,

    // 主題控制
    setTheme: setColor,
    setDarkMode: () => setMode('dark'),
    setLightMode: () => setMode('light'),
    setAutoMode: () => setMode('auto'),

    // 錯誤相關
    getErrors: () => mergedErrors.value,
    hasErrors: () => hasErrors.value
});

// 解構賦值暴露 composable 的方法和狀態
const {
    // 狀態
    displayStartDate,
    displayEndDate,
    showCalendar,
    isValidRange,
    shortcuts,
    startDateTime,
    endDateTime,
    hasRangeValue,

    // 事件處理方法
    handleStartDateValidation,
    handleEndDateValidation,
    handleStartTimeValidation,
    handleEndTimeValidation,
    handleStartDateComplete,
    handleEndDateComplete,
    handleStartTimeComplete,
    handleEndTimeComplete,
    handleCalendarRangeSelect,
    handleStartNavigateToDate,
    handleEndNavigateToDate,
    handleContainerClick,
    handleContainerMouseDown,

    // 操作方法
    toggleCalendar,
    hideCalendar,
    applyShortcut,
    clearRange,
    confirmRange,

    focusStartDate,
    focusEndDate,
} = dateRange;
</script>
