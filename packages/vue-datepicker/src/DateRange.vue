<!-- DateRange.vue -->
<template>
    <div class="date-range-wrapper relative w-full"
        :class="[themeClasses, showTime ? 'min-w-[300px]' : 'min-w-[200px]']" v-bind="containerAttributes"
        ref="containerRef">

        <!-- 日期範圍顯示容器 -->
        <div class="date-picker-container flex w-full items-center px-2 py-1 rounded-sm transition-all duration-200 bg-vdt-surface text-vdt-content overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            :class="[{ 'border-red-500 ring-2 ring-red-200': hasErrors }]">
            <button type="button"
                class="grid grid-cols-[1fr_auto_1fr] gap-1 w-full cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="disabled" @click="toggleCalendar" aria-label="選擇日期範圍">
                <!-- 開始日期 -->
                <div class="text-center min-w-0 max-w-[130px] sm:max-w-none" :title="computedPlaceholders.start">
                    <span v-if="modelValue?.start" class="date-placeholder text-vdt-content truncate block">
                        {{ modelValue?.start }}
                    </span>
                    <span v-else class="date-placeholder text-vdt-content-muted truncate block">
                        {{ computedPlaceholders.start }}
                    </span>
                </div>

                <!-- 分隔符 -->
                <div class="text-vdt-content-muted text-sm px-1" aria-label="日期範圍分隔符" data-testid="separator">
                    {{ separator }}
                </div>

                <!-- 結束日期 -->
                <div class="text-center  min-w-0 max-w-[130px] sm:max-w-none" :title="computedPlaceholders.end">
                    <span v-if="modelValue?.end" class="date-placeholder text-vdt-content truncate block">
                        {{ modelValue?.end }}
                    </span>
                    <span v-else class="date-placeholder text-vdt-content-muted truncate block">
                        {{ computedPlaceholders.end }}
                    </span>
                </div>
            </button>

            <!-- 日曆圖標和清除按鈕 -->

            <div class="date-picker-icon-container relative group cursor-pointer flex justify-center items-center flex-shrink-0"
                :class="{ 'cursor-not-allowed': disabled }">
                <!-- 日曆圖標 (預設顯示) -->
                <button type="button" aria-label="開啟日曆"
                    class="date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                    :class="{ 'group-hover:opacity-0': hasRangeValue && !disabled && showClearButton }"
                    :disabled="disabled" @click.stop.prevent="toggleCalendar?.()">
                    <CalendarIcon class="h-5 w-5" />
                </button>

                <!-- 清除按鈕 (hover時顯示，當有值且不禁用且允許清除時) -->
                <button v-if="hasRangeValue && !disabled && showClearButton" type="button" aria-label="清除日期"
                    class="date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                    @click.stop="clearRange" :title="'清除日期' + (showTime ? '時間' : '')">
                    <ClearIcon class="h-4 w-4" />
                </button>
            </div>
        </div>

        <!-- 日期範圍選擇彈窗 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10 overflow-auto md:min-w-[570px]"
            @click.stop role="dialog" aria-modal="true" aria-label="date-range-picker">

            <!-- 範圍選擇器內容 -->
            <div class="p-2 space-y-2">
                <!-- 輸入區域 -->
                <div v-if="inputEnabled" class="w-full flex flex-col md:flex-row flex-justify-between gap-2">
                    <!-- 開始日期輸入 -->
                    <div data-testid="start-date-inputs" aria-label="開始日期輸入區域" @click.stop="focusStartDate"
                        class="flex-1 flex w-full items-center px-2 py-1 gap-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200">

                        <DateInput ref="startDateInputRef" v-model="startDateTime.inputDateValue.value"
                            :year-placeholder="computedPlaceholders.year"
                            :month-placeholder="computedPlaceholders.month" :day-placeholder="computedPlaceholders.day"
                            :max-date="startDateConstraintsStr.maxDate" :min-date="startDateConstraintsStr.minDate"
                            :date-format="dateInputFormat" @validation="handleStartDateValidation"
                            @complete="handleStartDateComplete" />

                        <div v-if="showTime" data-testid="start-time-inputs" aria-label="開始時間輸入區域">
                            <TimeInput ref="startTimeInputRef" v-model="startDateTime.inputTimeValue.value"
                                :hour-placeholder="computedPlaceholders.hour"
                                :minute-placeholder="computedPlaceholders.minute"
                                :second-placeholder="computedPlaceholders.second" :enable-seconds="enableSeconds"
                                :use24Hour="use24Hour" :locale="locale" @validation="handleStartTimeValidation"
                                @complete="handleStartTimeComplete" @navigate-to-date="handleStartNavigateToDate" />
                        </div>
                    </div>

                    <!-- 結束日期輸入 -->
                    <div data-testid="end-date-inputs" aria-label="結束日期輸入區域" @click.stop="focusEndDate"
                        class="flex-1 flex w-full items-center gap-2 px-2 py-1 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200 transition-all duration-200">

                        <DateInput ref="endDateInputRef" v-model="endDateTime.inputDateValue.value"
                            :year-placeholder="computedPlaceholders.year"
                            :month-placeholder="computedPlaceholders.month" :day-placeholder="computedPlaceholders.day"
                            :min-date="endDateConstraintsStr.minDate" :max-date="endDateConstraintsStr.maxDate"
                            :date-format="dateInputFormat" @validation="handleEndDateValidation"
                            @complete="handleEndDateComplete" />

                        <div v-if="showTime" data-testid="end-time-inputs" aria-label="結束時間輸入區域">
                            <TimeInput ref="endTimeInputRef" v-model="endDateTime.inputTimeValue.value"
                                :hour-placeholder="computedPlaceholders.hour"
                                :minute-placeholder="computedPlaceholders.minute"
                                :second-placeholder="computedPlaceholders.second" :enable-seconds="enableSeconds"
                                :use24Hour="use24Hour" :locale="locale" @validation="handleEndTimeValidation"
                                @complete="handleEndTimeComplete" @navigate-to-date="handleEndNavigateToDate" />
                        </div>
                    </div>
                </div>

                <!-- 快捷選項 -->
                <div v-if="shortcuts.length > 0 && showShortcuts" aria-label="日期範圍快捷選項">
                    <div class="flex flex-wrap gap-2">
                        <!-- 預設快捷選項 -->
                        <button v-for="shortcut in shortcuts" :key="shortcut.label" type="button"
                            :aria-label="`選擇${shortcut.label}範圍`"
                            :data-testid="`shortcut-${shortcut.label.toLowerCase().replace(/\s+/g, '-')}`"
                            class="px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors"
                            @click="applyShortcut(shortcut)">
                            {{ shortcut.label }}
                        </button>

                        <!-- 自定義快捷選項 slot -->
                        <slot name="shortcuts" :apply-shortcut="applyShortcut" :shortcuts="shortcuts"
                            :current-range="modelValue">
                        </slot>
                    </div>
                </div>

                <!-- 如果只有自定義快捷選項但沒有預設快捷選項 -->
                <div v-else-if="$slots.shortcuts && showShortcuts">
                    <div class="flex flex-wrap gap-2">
                        <slot name="shortcuts" :apply-shortcut="applyShortcut" :shortcuts="shortcuts"
                            :current-range="modelValue">
                        </slot>
                    </div>
                </div>

                <!-- 雙月日曆 -->
                <div class="calendar-container flex flex-col md:flex-row gap-1 overflow-auto">
                    <DualMonthCalendar :showTimeSelector="showTime" :calendar="calendar"
                        :range-start="startDateTime.internalDateTime.value"
                        :range-end="endDateTime.internalDateTime.value" :enableSeconds="enableSeconds"
                        :use24Hour="use24Hour" :locale="locale" :week-starts-on="weekStartsOn"
                        :start-time-value="startDateTime.inputTimeValue.value"
                        :end-time-value="endDateTime.inputTimeValue.value" :min-date="parseInputToSimpleDate(minDate)"
                        :max-date="parseInputToSimpleDate(maxDate)" @range-select="handleCalendarRangeSelect"
                        @time-select="handleTimeSelect" />
                </div>
            </div>
        </div>
    </div>

    <!-- 錯誤訊息顯示 - 可選且可自定義 -->
    <div v-if="showErrorMessage && hasErrors">
        <!-- 讓使用者完全控制錯誤顯示 -->
        <slot name="error" :errors="errors" :hasErrors="hasErrors">
            <!-- 預設使用 DateErrorMessage -->
            <DateErrorMessage :errors="mergedErrors" :locale="locale" :use-i18n="useI18n"
                :custom-messages="customErrorMessages" :errorParams="mergedErrorParams">
                <!-- 將內部的 slot 轉發給使用者 -->
                <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
                    <slot :name="slotName" v-bind="slotProps" />
                </template>
            </DateErrorMessage>
        </slot>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue';
import { CalendarUtils } from './utils/calendarUtils';

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
import { parseInputToSimpleDate, formatSimpleDate, type DateTimeInput } from './utils/dateUtils';
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
    showTime: false,
    enableSeconds: true,
    use24Hour: true,
    useLocalizedPeriod: false,
    autoFocusTimeAfterDate: true,

    // 一般選項
    disabled: false,
    inputEnabled: false,
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
    'validation': [isValid: boolean, errors: Record<string, string>, errorParams?: Record<string, Record<string, any>>];
}>();

// DOM 引用
const containerRef = ref<HTMLElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const startDateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const endDateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const startTimeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);
const endTimeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);

const formatErrors = ref<Record<string, string>>({});

const computedTimeFormat = computed(() => {
    // 如果使用者明確提供了 timeFormat，就使用使用者的設定
    if (props.timeFormat) {
        return props.timeFormat;
    }

    // 否則根據 enableSeconds 和 use24Hour 自動決定
    if (props.enableSeconds) {
        return props.use24Hour ? 'HH:mm:ss' : 'hh:mm:ss A';
    } else {
        return props.use24Hour ? 'HH:mm' : 'hh:mm A';
    }
});

// 使用日期範圍 composable
const dateRange = useDateRange(
    {
        calendar: props.calendar,
        modelValue: props.modelValue,
        showTime: props.showTime,
        required: props.required,
        disabled: props.disabled,
        dateFormat: props.dateFormat,
        timeFormat: computedTimeFormat.value,
        outputType: props.outputType,
        useStrictISO: props.useStrictISO,
        enableSeconds: props.enableSeconds,
        minDate: props.minDate,
        maxDate: props.maxDate,
        maxRange: props.maxRange,
        minRange: props.minRange,
        incomplete: props.incomplete,
        locale: props.locale,
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
    validation: (isValid, errors, errorParams) => emit('validation', isValid, errors, errorParams)
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

const dateInputFormat = computed(() => props.dateFormat);

// 合併所有錯誤（格式錯誤 + 驗證錯誤）
const errors = computed(() => {
    return {
        ...dateRange.mergedErrors.value,
        ...formatErrors.value
    };
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

watch(() => props.calendar, (newCalendar) => {
    if (!CalendarUtils.isCalendarSupported(newCalendar)) {
        formatErrors.value.calendar = 'calendar.unsupported';
    } else {
        delete formatErrors.value.calendar;
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
    showCalendar,
    startDateConstraintsStr,
    endDateConstraintsStr,
    shortcuts,
    startDateTime,
    endDateTime,
    hasRangeValue,
    mergedErrors,
    mergedErrorParams,

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
    handleTimeSelect,

    // 操作方法
    toggleCalendar,
    applyShortcut,
    clearRange,

    focusStartDate,
    focusEndDate,
} = dateRange;
</script>
