<template>
    <div class="date-time-picker-wrapper relative w-full"
        :class="[themeClasses, showTime ? 'min-w-[300px]' : 'min-w-[150px]']" v-bind="containerAttributes"
        ref="containerRef">

        <!-- 日期時間輸入容器 -->
        <DateContainer :errors="mergedErrors">
            <div v-if="isGregoryCalendar && inputEnabled" class="flex w-full items-center justify-start gap-2"
                @click="handleContainerClick" @mousedown="handleContainerMouseDown">
                <!-- 日期輸入部分 -->
                <div>
                    <DateInput ref="dateInputRef" v-model="inputDateValue" :year-placeholder="computedPlaceholders.year"
                        :month-placeholder="computedPlaceholders.month" :day-placeholder="computedPlaceholders.day"
                        :min-date="minDateStr" :max-date="maxDateStr" :required="required" :separator="dateSeparator"
                        :date-format="dateInputFormat" @validation="handleDateValidation"
                        @complete="handleDateComplete" />
                </div>

                <!-- 時間輸入部分 -->
                <div v-if="showTime">
                    <TimeInput ref="timeInputRef" v-model="inputTimeValue" :hour-placeholder="placeholderOverrides.hour"
                        :minute-placeholder="placeholderOverrides.minute"
                        :second-placeholder="placeholderOverrides.second" :enable-seconds="enableSeconds"
                        :use24Hour="use24Hour" :required="required" :locale="locale"
                        :useLocalizedPeriod="useLocalizedPeriod" @validation="handleTimeValidation"
                        @complete="handleTimeComplete" @navigate-to-date="handleNavigateToDate" />
                </div>
            </div>
            <!-- 非西元曆或禁用輸入時的顯示區域 -->
            <div v-else class="flex w-full h-full items-center justify-start gap-1" :class="{
                'text-gray-400': !hasDisplayValue,
                'text-gray-900': hasDisplayValue,
                'cursor-not-allowed opacity-50': disabled
            }" @click.stop="!disabled && toggleCalendar?.()" @keydown.enter.prevent="!disabled && toggleCalendar?.()"
                @keydown.space.prevent="!disabled && toggleCalendar?.()">
                <!-- 顯示值或 placeholder -->
                <span v-if="hasDisplayValue" class="text-vdt-content">
                    {{ modelValue }}
                </span>
                <span v-else class="text-vdt-content-muted">
                    {{ computedSelectDatePlaceholder }}
                </span>
            </div>

            <!-- 日曆圖標和清除按鈕 -->
            <button v-if="hasValue && !disabled && showClearButton" type="button"
                class="text-gray-400 hover:text-red-500 transition-colors duration-200" @click.stop="reset">
                <ClearIcon class="h-4 w-4" />
            </button>
            <button v-else type="button" class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                :disabled="disabled" @click.stop="toggleCalendar">
                <CalendarIcon class="h-5 w-5" />
            </button>
        </DateContainer>

        <!-- 日曆彈出層 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10"
            @click.stop role="dialog" aria-modal="true" aria-label="date-picker">
            {{ calendarDateForGrid }}
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
import { ref, computed, onBeforeMount, watch, onMounted } from 'vue';

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
    ensureSimpleDateWithLocale,
    fixDateFormat,
    fixTimeFormat,
    type DateTimeValue,
} from './utils/dateUtils';
import type { DatePickerProps } from './types/DatePickerProps';
import { localeManager, type LocaleKey } from '@/locale/index';

const props = withDefaults(defineProps<DatePickerProps>(), {
    modelValue: null,
    mode: 'auto',
    theme: () => 'violet',

    // 預設使用西元曆
    calendar: 'gregory',
    locale: 'zh-TW',

    // 日期相關屬性
    dateSeparator: '-',
    dateFormat: 'YYYY-MM-DD',
    showClearButton: true,

    // 時間相關屬性
    timeFormat: 'HH:mm:ss',
    showTime: true,
    enableSeconds: true,
    use24Hour: true,
    minuteStep: 1,
    useLocalizedPeriod: false,
    customDefaultTime: '00:00:00',
    autoFocusTimeAfterDate: false,

    disabled: false,
    inputEnabled: true,
    required: false,

    placeholderOverrides: () => ({
        selectDate: localeManager.getPlaceholderMessage('general.selectDate'),
        year: localeManager.getPlaceholderMessage('date.year'),
        month: localeManager.getPlaceholderMessage('date.month'),
        day: localeManager.getPlaceholderMessage('date.day'),
        hour: localeManager.getPlaceholderMessage('time.hour'),
        minute: localeManager.getPlaceholderMessage('time.minute'),
        second: localeManager.getPlaceholderMessage('time.second')
    }),
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
        calendar: props.calendar,
        dateFormat: internalDateFormat.value,
        timeFormat: internalTimeFormat.value,
        outputFormat: props.outputFormat,
        customDefaultTime: props.customDefaultTime,
        enableSeconds: props.enableSeconds,
        autoFocusTimeAfterDate: props.autoFocusTimeAfterDate,
        minDate: props.minDate,
        maxDate: props.maxDate,
        locale: props.locale,
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
const minDateStr = computed(() => {
    const minDateValue = ensureSimpleDateWithLocale(props.minDate, props.locale);
    return formatSimpleDate(minDateValue);
});

const maxDateStr = computed(() => {
    const maxDateValue = ensureSimpleDateWithLocale(props.maxDate, props.locale);
    return formatSimpleDate(maxDateValue);
});
const dateInputFormat = computed(() => internalDateFormat.value);
const isGregoryCalendar = computed(() => props.calendar === 'gregory');

const hasDisplayValue = computed(() => {
    return !!(inputDateValue.value && inputDateValue.value.trim());
});

// 日曆系統相關計算屬性
const computedPlaceholders = computed(() => {
    if (!isGregoryCalendar.value) {
        return datePicker.dynamicPlaceholders.value;
    }
    // 從語言包獲取預設值
    const localePlaceholders = {
        year: localeManager.getPlaceholderMessage('date.year'),
        month: localeManager.getPlaceholderMessage('date.month'),
        day: localeManager.getPlaceholderMessage('date.day')
    };

    // 允許 props 覆寫
    return {
        year: props.placeholderOverrides?.year || localePlaceholders.year,
        month: props.placeholderOverrides?.month || localePlaceholders.month,
        day: props.placeholderOverrides?.day || localePlaceholders.day
    };
});

const computedSelectDatePlaceholder = computed(() => {
    return props.placeholderOverrides?.selectDate ||
        localeManager.getPlaceholderMessage('general.selectDate');
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
    if (props.locale) {
        localeManager.setLocale(props.locale as LocaleKey);
    }
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

// 監聽語言變化
watch(() => props.locale, (newLocale) => {
    if (newLocale) {
        localeManager.setLocale(newLocale as LocaleKey);
    }
});

// 監聽日曆變化
watch(() => props.calendar, (newCalendar) => {
    if (newCalendar && datePicker.calendarSystem.value) {
        const success = datePicker.calendarSystem.value.setCalendar(newCalendar);
        if (success) {
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
    calendarSystem,

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
