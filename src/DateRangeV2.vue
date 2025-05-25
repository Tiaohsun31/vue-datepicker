<!-- 重構後的 DateRange.vue - 使用 Composables -->
<template>
    <div class="date-range-wrapper md:min-w-auto relative w-full"
        :class="[themeClasses, showTime ? 'min-w-[300px]' : 'min-w-[200px]']" v-bind="containerAttributes"
        ref="containerRef">

        <!-- 日期範圍顯示容器 -->
        <DateContainer :errors="mergedErrors">
            <button type="button" class="flex items-center gap-1 flex-1 cursor-pointer transition-colors duration-200"
                :disabled="disabled" @click="toggleCalendar">

                <!-- 開始日期 -->
                <div class="flex-1 text-center whitespace-nowrap">
                    <span v-if="displayStartDate" class="text-vdt-content text-sm">
                        {{ displayStartDate }}
                    </span>
                    <span v-else class="text-vdt-content-muted text-sm">
                        {{ startPlaceholder }}
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
                        {{ endPlaceholder }}
                    </span>
                </div>

                <!-- 日曆圖標 -->
                <span class="text-gray-400 hover:text-gray-600">
                    <CalendarIcon class="h-5 w-5" />
                </span>
            </button>
        </DateContainer>

        <!-- 日期範圍選擇彈窗 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10 overflow-auto md:min-w-[640px]"
            @click.stop role="dialog" aria-modal="true" aria-label="date-range-picker">

            <!-- 範圍選擇器內容 -->
            <div class="p-2">
                <!-- 輸入區域 -->
                <div class="w-full flex flex-col md:flex-row flex-justify-between gap-2 mb-2">
                    <!-- 開始日期輸入 -->
                    <div
                        class="flex-1 flex w-full items-center px-2 py-1 gap-2 border border-gray-200 bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200">
                        <DateInput ref="startDateInputRef" v-model="startDateTime.inputDateValue.value"
                            :year-placeholder="yearPlaceholder" :month-placeholder="monthPlaceholder"
                            :day-placeholder="dayPlaceholder" :max-date="endDateTime.inputDateValue.value"
                            :min-date="minDateStr" :date-format="dateInputFormat"
                            @validation="handleStartDateValidation" @complete="handleStartDateComplete" />

                        <TimeInput v-if="showTime" ref="startTimeInputRef" v-model="startDateTime.inputTimeValue.value"
                            :hour-placeholder="hourPlaceholder" :minute-placeholder="minutePlaceholder"
                            :second-placeholder="secondPlaceholder" :enable-seconds="enableSeconds"
                            :use24Hour="use24Hour" :locale="locale" @validation="handleStartTimeValidation"
                            @complete="handleStartTimeComplete" @navigate-to-date="handleStartNavigateToDate" />
                    </div>

                    <!-- 結束日期輸入 -->
                    <div
                        class="flex-1 flex w-full items-center gap-2 px-2 py-1 border border-gray-200 bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200">
                        <DateInput ref="endDateInputRef" v-model="endDateTime.inputDateValue.value"
                            :year-placeholder="yearPlaceholder" :month-placeholder="monthPlaceholder"
                            :day-placeholder="dayPlaceholder" :min-date="startDateTime.inputDateValue.value"
                            :max-date="maxDateStr" :date-format="dateInputFormat" @validation="handleEndDateValidation"
                            @complete="handleEndDateComplete" />

                        <TimeInput v-if="showTime" ref="endTimeInputRef" v-model="endDateTime.inputTimeValue.value"
                            :hour-placeholder="hourPlaceholder" :minute-placeholder="minutePlaceholder"
                            :second-placeholder="secondPlaceholder" :enable-seconds="enableSeconds"
                            :use24Hour="use24Hour" :locale="locale" @validation="handleEndTimeValidation"
                            @complete="handleEndTimeComplete" @navigate-to-date="handleEndNavigateToDate" />
                    </div>
                </div>

                <!-- 快捷選項 -->
                <div v-if="shortcuts.length > 0 && showShortcuts" class="mb-2">
                    <div class="flex flex-wrap gap-2">
                        <button v-for="shortcut in shortcuts" :key="shortcut.label" type="button"
                            class="px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors"
                            @click="applyShortcut(shortcut)">
                            {{ shortcut.label }}
                        </button>
                    </div>
                </div>

                <!-- 雙月日曆 -->
                <div class="calendar-container flex flex-col md:flex-row gap-2 overflow-auto">
                    <DualMonthCalendar :range-start="calendarStartDate" :range-end="calendarEndDate"
                        :min-date="calendarMinDate" :max-date="calendarMaxDate" :locale="locale" :week-starts-on="0"
                        @range-select="handleCalendarRangeSelect" />
                </div>

                <!-- 操作按鈕 -->
                <div class="flex justify-between mt-3 pt-2 border-t border-vdt-outline">
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
                </div>
            </div>
        </div>
    </div>

    <!-- 錯誤訊息 -->
    <DateErrorMessage :errors="mergedErrors" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// 組件導入
import DateContainer from './components/calendar/DateContainer.vue';
import DateInput from './components/inputs/DateInput.vue';
import TimeInput from './components/inputs/TimeInput.vue';
import DateErrorMessage from './components/calendar/DateErrorMessage.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import DualMonthCalendar from './components/calendar/DualMonthCalendar.vue';

// Composables
import { useDateRange } from './composables/useDateRange';
import { useTheme } from './composables/useTheme';

// Utils
import {
    formatSimpleDate,
    ensureSimpleDate,
    type DateTimeValue,
    type OutputFormat
} from './utils/dateUtils';
import { type TailwindColor } from './types/main';

interface Props {
    modelValue?: { start: DateTimeValue; end: DateTimeValue } | null;
    mode?: 'light' | 'dark' | 'auto';
    theme?: TailwindColor | string;

    // 日期選項
    yearPlaceholder?: string;
    monthPlaceholder?: string;
    dayPlaceholder?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;

    // 時間選項
    showTime?: boolean;
    hourPlaceholder?: string;
    minutePlaceholder?: string;
    secondPlaceholder?: string;
    enableSeconds?: boolean;
    use24Hour?: boolean;

    // 一般選項
    disabled?: boolean;
    required?: boolean;
    minDate?: DateTimeValue;
    maxDate?: DateTimeValue;
    locale?: string;
    separator?: string;
    dateFormat?: string;
    timeFormat?: string;
    showShortcuts?: boolean;

    // 範圍特定選項
    maxRange?: number;
    minRange?: number;

    // 輸出格式
    outputFormat?: OutputFormat;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    mode: 'auto',
    theme: () => 'violet',
    yearPlaceholder: '年',
    monthPlaceholder: '月',
    dayPlaceholder: '日',
    startPlaceholder: '開始日期',
    endPlaceholder: '結束日期',
    showTime: true,
    hourPlaceholder: '時',
    minutePlaceholder: '分',
    secondPlaceholder: '秒',
    enableSeconds: true,
    use24Hour: true,
    disabled: false,
    required: false,
    locale: 'zh-TW',
    separator: ' ~ ',
    showShortcuts: true,
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    outputFormat: 'iso',
});

const emit = defineEmits<{
    'update:modelValue': [range: { start: DateTimeValue; end: DateTimeValue } | null];
    'change': [range: { start: DateTimeValue; end: DateTimeValue } | null];
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
        outputFormat: props.outputFormat,
        enableSeconds: props.enableSeconds,
        minDate: props.minDate,
        maxDate: props.maxDate,
        maxRange: props.maxRange,
        minRange: props.minRange
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

// 計算屬性
const minDateStr = computed(() => formatSimpleDate(ensureSimpleDate(props.minDate)));
const maxDateStr = computed(() => formatSimpleDate(ensureSimpleDate(props.maxDate)));
const dateInputFormat = computed(() => props.dateFormat);

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
});

// 解構賦值暴露 composable 的方法和狀態
const {
    // 狀態
    displayStartDate,
    displayEndDate,
    showCalendar,
    isValidRange,
    mergedErrors,
    shortcuts,
    calendarStartDate,
    calendarEndDate,
    calendarMinDate,
    calendarMaxDate,
    startDateTime,
    endDateTime,

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
} = dateRange;
</script>
