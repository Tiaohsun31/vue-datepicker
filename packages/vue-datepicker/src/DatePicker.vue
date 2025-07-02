<template>
    <div class="date-picker-wrapper relative w-full"
        :class="[themeClasses, showTime ? 'min-w-[300px]' : 'min-w-[150px]']" v-bind="containerAttributes"
        ref="containerRef">
        <!-- 日期時間輸入容器 -->
        <div class="date-picker-container flex w-full items-center px-2 py-1 bg-vdt-surface text-vdt-content rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="[{ 'border-red-500 ring-2 ring-red-200': hasErrors }]">
            <div v-if="isGregoryCalendar && inputEnabled" class=" flex w-full items-center justify-start gap-2"
                :class="[disabled ? 'cursor-not-allowed cursor-event-none opacity-50' : '']"
                @click.stop="handleContainerClick" @mousedown="handleContainerMouseDown">
                <!-- 日期輸入部分 -->
                <div>
                    <DateInput ref="dateInputRef" v-model="inputDateValue" :year-placeholder="computedPlaceholders.year"
                        :month-placeholder="computedPlaceholders.month" :day-placeholder="computedPlaceholders.day"
                        :min-date="minDateStr" :max-date="maxDateStr" :required="required" :separator="dateSeparator"
                        :date-format="dateInputFormat" @validation="validateDateInput" @complete="handleDateComplete" />
                </div>

                <!-- 時間輸入部分 -->
                <div v-if="showTime">
                    <TimeInput ref="timeInputRef" v-model="inputTimeValue" :hour-placeholder="computedPlaceholders.hour"
                        :minute-placeholder="computedPlaceholders.minute"
                        :second-placeholder="computedPlaceholders.second" :enable-seconds="enableSeconds"
                        :use24Hour="use24Hour" :required="required" :locale="locale"
                        :useLocalizedPeriod="useLocalizedPeriod" @validation="validateTimeInput"
                        @complete="handleTimeComplete" @navigate-to-date="handleNavigateToDate" />
                </div>
            </div>
            <!-- 非西元曆或禁用輸入時的顯示區域 -->
            <button v-else type="button" class="flex w-full h-full items-center justify-start gap-1" :class="{
                'cursor-not-allowed opacity-50': disabled
            }" @click.stop="!disabled && toggleCalendar?.()" @keydown.enter.prevent="!disabled && toggleCalendar?.()"
                @keydown.space.prevent="!disabled && toggleCalendar?.()">
                <!-- 顯示值或 placeholder -->
                <span v-if="hasDisplayValue" class="date-placeholder text-vdt-content truncate">
                    {{ modelValue }}
                </span>
                <span v-else class="date-placeholder text-vdt-content-muted truncate">
                    {{ computedPlaceholders.selectDate }}
                </span>
            </button>

            <!-- 日曆圖標和清除按鈕 -->
            <div class="date-picker-icon-container relative group cursor-pointer"
                :class="{ 'cursor-not-allowed': disabled }">
                <button type="button"
                    class="date-picker-icon text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                    :class="{ 'group-hover:opacity-0': hasValue && !disabled && showClearButton }" :disabled="disabled"
                    aria-label="開啟日曆" @click.stop.prevent="toggleCalendar?.()">
                    <CalendarIcon class="h-5 w-5" />
                </button>

                <!-- 清除按鈕 (hover時顯示，當有值且不禁用且允許清除時) -->
                <button v-if="hasValue && !disabled && showClearButton" type="button"
                    class="date-picker-icon absolute inset-0 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                    aria-label="清除日期" @click.stop.prevent="reset">
                    <ClearIcon class="h-4 w-4" />
                </button>
            </div>
        </div>

        <!-- 日曆彈出層 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="calendar-container absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10"
            @click.stop role="dialog" aria-modal="true" aria-label="date-picker">
            <CalendarGrid :value="internalDateTime" :weekStartsOn="weekStartsOn" :min-date="calendarMinDate"
                :max-date="calendarMaxDate" :showTimeSelector="showTime" :time-value="inputTimeValue"
                :use24Hour="use24Hour" :default-time="getValidDefaultTime" :enableSeconds="enableSeconds"
                :locale="locale" :calendar="calendar" @select="handleCalendarSelect" @time-select="handleTimeSelect">
                <template v-for="(_, slotName) in calendarSlotNames" #[slotName]="slotProps">
                    <slot :name="slotName" v-bind="slotProps" />
                </template>
                <!-- TODO: slot 須明確傳遞  -->
                <!-- <template #year-display="slotProps">
                    <slot name="year-display" v-bind="slotProps" />
                </template> -->
            </CalendarGrid>
        </div>
    </div>

    <!-- 錯誤訊息顯示 - 可選且可自定義 -->
    <div v-if="showErrorMessage && hasErrors">
        <!-- 讓使用者完全控制錯誤顯示 -->
        <slot name="error" :errors="mergedErrors" :errorParams="mergedErrorParams" :hasErrors="hasErrors">
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
import { ref, computed, onBeforeMount, watch, useSlots, toRef } from 'vue';
import { CalendarUtils } from './utils/calendarUtils';

// 組件導入
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
    isValidDateFormat,
    isValidTimeFormatPattern,
    parseInputToSimpleDate,
    fixDateFormat,
    fixTimeFormat,
    type DateTimeInput,
} from './utils/dateUtils';
import type { DatePickerProps } from './types/datePickerProps';
import { useLocale } from '@/composables/useLocale';

const props = withDefaults(defineProps<DatePickerProps>(), {
    modelValue: null,
    mode: 'auto',
    theme: () => 'violet',

    // 日曆系統
    calendar: 'gregory',
    locale: 'zh-TW',
    customLocaleMessages: undefined,
    outputType: 'iso',
    useStrictISO: false,

    // 日期相關屬性
    weekStartsOn: 0,
    dateSeparator: '-',
    dateFormat: 'YYYY-MM-DD',

    // 時間相關屬性
    showTime: false,
    enableSeconds: true,
    use24Hour: true,
    useLocalizedPeriod: false,
    autoFocusTimeAfterDate: true,

    // 一般選項
    disabled: false,
    inputEnabled: true,
    required: false,
    showClearButton: true,

    // 輸入框佔位符
    placeholderOverrides: () => ({}),

    // 錯誤處理選項
    showErrorMessage: true,
    useI18n: true,
    customErrorMessages: () => ({})
});

const { setLocale, getPlaceholderMessage } = useLocale(
    props.locale,
    props.customLocaleMessages
);

const emit = defineEmits<{
    'update:modelValue': [date: DateTimeInput];
    'change': [date: DateTimeInput];
    'validation': [isValid: boolean, errors: Record<string, string>, errorParams?: Record<string, Record<string, any>>];
}>();

// Slot
const slots = useSlots();
const calendarSlotNames = computed(() => {
    const calendarSlots: Record<string, any> = {};
    ['no-years-display', 'month-selector'].forEach(name => {
        if (slots[name]) {
            calendarSlots[name] = slots[name];
        }
    });
    Object.keys(slots).forEach(name => {
        if (name.startsWith('year-')) {
            calendarSlots[name] = slots[name];
        }
    });
    return calendarSlots;
});

// DOM 引用
const containerRef = ref<HTMLElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const dateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const timeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);

// 內部格式狀態
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

const internalDateFormat = ref(props.dateFormat);
const internalTimeFormat = ref(computedTimeFormat.value);
const formatErrors = ref<Record<string, string>>({});

// 使用主要的 DateTimePicker composable
const datePicker = useDateTimePicker(
    {
        modelValue: props.modelValue,
        showTime: props.showTime,
        required: props.required,
        disabled: props.disabled,
        calendar: toRef(props, 'calendar'),
        dateFormat: internalDateFormat.value,
        timeFormat: internalTimeFormat.value,
        outputType: toRef(props, 'outputType'),
        useStrictISO: props.useStrictISO,
        customDefaultTime: props.customDefaultTime,
        enableSeconds: props.enableSeconds,
        autoFocusTimeAfterDate: props.autoFocusTimeAfterDate,
        minDate: props.minDate,
        maxDate: props.maxDate,
        locale: toRef(props, 'locale'),
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
    validation: (isValid, errors, errorParams) => emit('validation', isValid, errors, errorParams)
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
    const maxDateValue = parseInputToSimpleDate(props.minDate, props.locale);
    return formatSimpleDate(maxDateValue);
});

const maxDateStr = computed(() => {
    const maxDateValue = parseInputToSimpleDate(props.maxDate, props.locale);
    return formatSimpleDate(maxDateValue);
});
const dateInputFormat = computed(() => internalDateFormat.value);
const isGregoryCalendar = computed(() => props.calendar === 'gregory');

const hasDisplayValue = computed(() => {
    return !!(inputDateValue.value && inputDateValue.value.trim());
});


// 日曆系統相關計算屬性
const computedPlaceholders = computed(() => {
    const currentLocale = props.locale;
    // 從語言包獲取預設值
    const localePlaceholders = {
        selectDate: getPlaceholderMessage('general.selectDate'),
        year: getPlaceholderMessage('date.year'),
        month: getPlaceholderMessage('date.month'),
        day: getPlaceholderMessage('date.day'),
        hour: getPlaceholderMessage('time.hour'),
        minute: getPlaceholderMessage('time.minute'),
        second: getPlaceholderMessage('time.second')
    };

    // 允許 props 覆寫
    return {
        selectDate: props.placeholderOverrides?.selectDate || localePlaceholders.selectDate,
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

// 合併所有錯誤（格式錯誤 + 驗證錯誤）
const mergedErrors = computed(() => {
    return {
        ...datePicker.mergedErrors.value,
        ...formatErrors.value
    };
});

// 合併所有錯誤參數
const mergedErrorParams = computed(() => {
    const datePickerParams = datePicker.mergedErrorParams?.value || {};
    const formatParams = {}; // 格式錯誤通常不需要參數

    const merged = {
        ...datePickerParams,
        ...formatParams
    };

    // 如果沒有任何參數，返回空物件而不是 undefined
    return Object.keys(merged).length > 0 ? merged : {};
});

// 是否有錯誤
const hasErrors = computed(() => {
    return Object.keys(mergedErrors.value).length > 0;
});

// 格式驗證和修復
onBeforeMount(() => {
    // 驗證日期格式
    if (!isValidDateFormat(props.dateFormat) && props.calendar === 'gregory') {
        const originalFormat = props.dateFormat;
        const fixedFormat = fixDateFormat(props.dateFormat);

        formatErrors.value.dateFormat = 'format.invalid';
        console.warn(`日期格式 "${originalFormat}" 不正確，已自動修復為 "${fixedFormat}"`);

        internalDateFormat.value = fixedFormat;
    }

    // 驗證時間格式
    if (props.showTime && !isValidTimeFormatPattern(internalTimeFormat.value)) {
        const originalFormat = internalTimeFormat.value;
        const fixedFormat = fixTimeFormat(internalTimeFormat.value);

        // 如果修復後仍然無效，使用預設格式
        if (!isValidTimeFormatPattern(fixedFormat)) {
            const defaultFormat = computedTimeFormat.value; // 使用新的計算邏輯
            formatErrors.value.timeFormat = 'format.invalid';
            console.warn(`時間格式 "${originalFormat}" 不正確，已使用預設格式 "${defaultFormat}"`);
            internalTimeFormat.value = defaultFormat;
        } else {
            formatErrors.value.timeFormat = 'format.invalid';
            console.warn(`時間格式 "${originalFormat}" 不正確，已自動修復為 "${fixedFormat}"`);
            internalTimeFormat.value = fixedFormat;
        }
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
        setLocale(newLocale, props.customLocaleMessages);
    }
}, { immediate: true });

// 監聽自定義語言包變化
watch(() => props.customLocaleMessages, (newMessages) => {
    if (newMessages && props.locale) {
        setLocale(props.locale, newMessages);
    }
});

watch([() => props.enableSeconds, () => props.use24Hour, () => props.timeFormat], () => {
    // 只有在使用者沒有明確設定 timeFormat 時才自動更新
    if (!props.timeFormat) {
        internalTimeFormat.value = computedTimeFormat.value;
    }
}, { immediate: true });

watch(() => props.calendar, (newCalendar) => {
    if (!CalendarUtils.isCalendarSupported(newCalendar)) {
        formatErrors.value.calendar = 'calendar.unsupported';
    } else {
        delete formatErrors.value.calendar;
    }
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
    internalDateTime,
    calendarMinDate,
    calendarMaxDate,
    getValidDefaultTime,
    hasValue,

    // 事件處理
    validateDateInput,
    validateTimeInput,
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
