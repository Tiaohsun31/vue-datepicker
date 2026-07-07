<!-- DateRange.vue -->
<template>
    <div class="date-range-wrapper vdp-wrapper"
        :style="[themeStyle, { minWidth: showTime ? '300px' : '200px' }]" v-bind="themeAttrs" ref="containerRef">

        <!-- 日期範圍顯示容器 -->
        <div class="date-picker-container" :class="{ error: hasErrors }">
            <!-- 日曆圖標 (預設顯示) -->
            <button v-if="showCalendarIcon" type="button" aria-label="開啟日曆" class="date-picker-icon vdp-icon-btn"
                :disabled="disabled" @click.stop.prevent="toggleCalendar?.()">
                <CalendarIcon class="vdp-icon-md" />
            </button>
            <button type="button" class="vdp-range-display" :disabled="disabled" @click="toggleCalendar"
                aria-label="選擇日期範圍">
                <!-- 開始日期 -->
                <div class="vdp-range-date" :title="computedPlaceholders.start" aria-label="開始日期">
                    <span v-if="modelValue?.start" class="date-placeholder vdp-placeholder">
                        {{ modelValue?.start }}
                    </span>
                    <span v-else class="date-placeholder vdp-placeholder vdp-placeholder--muted">
                        {{ computedPlaceholders.start }}
                    </span>
                </div>

                <!-- 分隔符 -->
                <div class="vdp-range-sep" aria-label="日期範圍分隔符" data-testid="separator">
                    {{ separator }}
                </div>

                <!-- 結束日期 -->
                <div class="vdp-range-date" :title="computedPlaceholders.end" aria-label="結束日期">
                    <span v-if="modelValue?.end" class="date-placeholder vdp-placeholder">
                        {{ modelValue?.end }}
                    </span>
                    <span v-else class="date-placeholder vdp-placeholder vdp-placeholder--muted">
                        {{ computedPlaceholders.end }}
                    </span>
                </div>
            </button>
            <!-- 清除按鈕 (hover時顯示，當有值且不禁用且允許清除時) -->
            <button v-if="hasRangeValue && !disabled && showClearButton" type="button" aria-label="清除日期"
                class="date-picker-icon vdp-clear-btn" @click.stop="clearRange"
                :title="'清除日期' + (showTime ? '時間' : '')">
                <ClearIcon class="vdp-icon-md" />
            </button>
        </div>

        <!-- 日期範圍選擇彈窗：Teleport 到 body 以脫離 transform / overflow 祖先；
             以 themeStyle / themeAttrs 攜帶主題變數與深淺模式。 -->
        <Teleport to="body">
        <div v-if="showCalendar && !disabled" ref="calendarRef" class="vdp-range-popup"
            :class="{ 'vdp-range-popup--dual': displayMode !== 'single' }" :style="themeStyle" v-bind="themeAttrs"
            @click.stop role="dialog" aria-modal="true" aria-label="date-range-picker">

            <!-- 範圍選擇器內容 -->
            <div class="vdp-range-body">
                <!-- 輸入區域 -->
                <div v-if="inputEnabled && displayMode === 'dual'" class="vdp-range-inputs">
                    <!-- 開始日期輸入 -->
                    <div data-testid="start-date-inputs" aria-label="開始日期輸入區域" @click.stop="focusStartDate"
                        class="vdp-range-input-field">

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
                        class="vdp-range-input-field">

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
                    <div class="vdp-range-shortcuts">
                        <!-- 預設快捷選項 -->
                        <button v-for="shortcut in shortcuts" :key="shortcut.label" type="button"
                            :aria-label="`選擇${shortcut.label}範圍`"
                            :data-testid="`shortcut-${shortcut.label.toLowerCase().replace(/\s+/g, '-')}`"
                            class="vdp-shortcut-btn" @click="applyShortcut(shortcut)">
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
                    <div class="vdp-range-shortcuts">
                        <slot name="shortcuts" :apply-shortcut="applyShortcut" :shortcuts="shortcuts"
                            :current-range="modelValue">
                        </slot>
                    </div>
                </div>

                <!-- 雙月日曆 -->
                <div class="vdp-range-cal-wrap">
                    <RangeCalendar :month-display-mode="displayMode" :showTimeSelector="showTime" :calendar="calendar"
                        :range-start="startDateTime.internalDateTime.value"
                        :range-end="endDateTime.internalDateTime.value"
                        :start-time-value="startDateTime.inputTimeValue.value"
                        :end-time-value="endDateTime.inputTimeValue.value" :locale="locale"
                        :week-starts-on="weekStartsOn" :min-date="parseInputToSimpleDate(minDate)"
                        :max-date="parseInputToSimpleDate(maxDate)" :enable-seconds="enableSeconds"
                        :use24-hour="use24Hour" @range-select="handleCalendarRangeSelect"
                        @time-select="handleTimeSelect" />
                </div>
            </div>
        </div>
        </Teleport>
    </div>

    <!-- 錯誤訊息顯示 - 可選且可自定義 -->
    <div v-if="showErrorMessage && hasErrors">
        <!-- 讓使用者完全控制錯誤顯示 -->
        <slot name="error" :errors="errors" :hasErrors="hasErrors">
            <!-- 預設使用 DateErrorMessage -->
            <DateErrorMessage :errors="errors" :locale="locale" :use-i18n="useI18n"
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
import { ref, computed, watch, onBeforeMount, toRef } from 'vue';
import { CalendarUtils } from './utils/calendarUtils';

// 組件導入
import DateInput from './components/inputs/DateInput.vue';
import TimeInput from './components/inputs/TimeInput.vue';
import DateErrorMessage from './components/calendar/DateErrorMessage.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import ClearIcon from './components/icons/ClearIcon.vue';
import RangeCalendar from './components/calendar/RangeCalendar.vue';

// Composables
import { useDateRange } from './composables/useDateRange';
import { useTheme } from './composables/useTheme';

// Utils
import { parseInputToSimpleDate, resolveTimeFormat, type DateTimeInput } from './utils/dateUtils';
import type { DateRangeProps } from './types/datePickerProps';
import type { FieldErrorParams, DateTimeInputExpose } from './types/internal';
import { useLocale } from './composables/useLocale';
import { useWindowSize } from './composables/useWindowSize';

const props = withDefaults(defineProps<DateRangeProps>(), {
    modelValue: null,
    mode: 'auto',
    // theme 未指定時不 inline 覆蓋，交由 :root 的 --color-vdp-primary（家族 --tia-theme-primary）決定。
    theme: undefined,

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
    showCalendarIcon: true,

    // 輸入框佔位符
    placeholderOverrides: () => ({}),

    // 範圍特定
    separator: ' ~ ',
    showShortcuts: true,
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
    'validation': [isValid: boolean, errors: Record<string, string>, errorParams?: FieldErrorParams];
}>();

// DOM 引用
const containerRef = ref<HTMLElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const startDateInputRef = ref<DateTimeInputExpose | null>(null);
const endDateInputRef = ref<DateTimeInputExpose | null>(null);
const startTimeInputRef = ref<DateTimeInputExpose | null>(null);
const endTimeInputRef = ref<DateTimeInputExpose | null>(null);

const formatErrors = ref<Record<string, string>>({});

const { width: windowWidth } = useWindowSize();
const displayMode = computed(() => {
    if (props.monthDisplayMode) {
        return props.monthDisplayMode;
    }
    // 根據響應式的窗口寬度自動切換顯示模式
    return windowWidth.value < 768 ? 'single' : 'dual';
});

const computedTimeFormat = computed(() => resolveTimeFormat({
    timeFormat: props.timeFormat,
    enableSeconds: props.enableSeconds,
    use24Hour: props.use24Hour
}));

const { setLocale, getMessage, getPlaceholderMessage, currentLocale } = useLocale(props.locale);

// 使用日期範圍 composable
const dateRange = useDateRange(
    {
        calendar: props.calendar,
        modelValue: () => props.modelValue,
        showTime: props.showTime,
        required: props.required,
        disabled: toRef(props, 'disabled'),
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
        // i18n：預設快捷選項標籤跟隨語系
        getMessage,
        localeRef: currentLocale,
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
    validation: (isValid, errors, errorParams) => emit('validation', isValid, errors, errorParams)
});

// 使用主題 composable（宣告式：只輸出 inline style 與 data-vdp-mode 屬性）
const { themeStyle, themeAttrs } = useTheme(
    toRef(props, 'theme'),
    toRef(props, 'mode')
);

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
    return Object.keys(errors.value).length > 0;
});


// 主題改為宣告式綁定（:style="themeStyle" / v-bind="themeAttrs"），不再需要命令式 watch。

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

    // 主題改為宣告式：請改用 `theme` / `mode` props 控制（移除命令式 setTheme/setMode）。

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

<style scoped>
.vdp-range-display {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: var(--vdp-space-1);
    width: 100%;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.vdp-range-display:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.vdp-range-date {
    text-align: center;
    min-width: 0;
    max-width: 130px;
}

@media (min-width: 640px) {
    .vdp-range-date {
        max-width: none;
    }
}

.vdp-range-sep {
    color: var(--color-vdp-content-muted);
    font-size: var(--vdp-text-sm);
    line-height: var(--vdp-leading-sm);
    padding-inline: var(--vdp-space-1);
}

.vdp-range-popup {
    /* 由 floating-ui 以 fixed 定位並 Teleport 到 body；top/left 由 JS 設定。 */
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-vdp-surface-elevated);
    border: 1px solid var(--color-vdp-outline);
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    /* 高於一般 Modal；可用 --vdp-popup-z-index 覆蓋 */
    z-index: var(--vdp-popup-z-index, 1100);
    overflow: auto;
    max-width: 95vw;
    max-height: 80vh;
    min-width: 275px;
}

@media (min-width: 640px) {
    .vdp-range-popup {
        max-height: 70vh;
    }
}

@media (min-width: 768px) {
    .vdp-range-popup--dual {
        min-width: 570px;
    }
}

.vdp-range-body {
    padding: var(--vdp-space-2);
}

.vdp-range-body> * + * {
    margin-top: var(--vdp-space-2);
}

.vdp-range-inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--vdp-space-2);
}

@media (min-width: 768px) {
    .vdp-range-inputs {
        flex-direction: row;
    }
}

.vdp-range-input-field {
    flex: 1 1 0%;
    display: flex;
    width: 100%;
    align-items: center;
    gap: var(--vdp-space-2);
    padding: var(--vdp-space-1) var(--vdp-space-2);
    border: 1px solid var(--color-vdp-outline);
    background-color: var(--color-vdp-surface);
    color: var(--color-vdp-content);
    border-radius: var(--vdp-radius-sm);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.vdp-range-input-field:focus-within {
    border-color: var(--color-vdp-primary);
    box-shadow: 0 0 0 2px var(--color-vdp-primary-subtle);
}

.vdp-range-shortcuts {
    display: flex;
    flex-wrap: wrap;
    gap: var(--vdp-space-2);
}

.vdp-shortcut-btn {
    padding: var(--vdp-space-1) var(--vdp-space-3);
    font-size: var(--vdp-text-xs);
    background-color: var(--color-vdp-outline);
    color: var(--color-vdp-content);
    border-radius: var(--vdp-radius-sm);
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.vdp-shortcut-btn:hover {
    background-color: var(--color-vdp-interactive-hover);
}

.vdp-range-cal-wrap {
    overflow: auto;
}
</style>
