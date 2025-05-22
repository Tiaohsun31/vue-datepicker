<template>

    <div class="bg-vdt-surface text-vdt-content border-vdt-outline ">
        沒有變化454
    </div>
    <div class="date-time-picker-wrapper relative w-full" :class="[showTime ? 'min-w-[300px]' : 'min-w-[150px]']"
        v-bind="containerAttributes" ref="pickerRef">
        <!-- 日期時間輸入容器 -->
        <div class="bg-vdt-surface text-vdt-content border-vdt-outline ">
            沒有變化454
        </div>

        <DateContainer :errors="errors">
            <div class="flex w-full items-center justify-start gap-1">
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
            <div class="ml-auto flex gap-2">
                <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    :disabled="disabled" @click="toggleCalendar">
                    <CalendarIcon class="h-5 w-5 cursor-pointer" />
                </button>
            </div>
        </DateContainer>

        <!-- 錯誤訊息 -->
        <DateErrorMessage :errors="mergedErrors" />

        <!-- 日曆彈出層 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10" @click.stop role="dialog"
            aria-modal="true" aria-label="date-picker">
            <CalendarGrid :value="selectedCalendarDate" :min-date="minDate" :max-date="maxDate"
                :showTimeSelector="showTime" :time-value="inputTimeValue" :use24Hour="use24Hour"
                :enableSeconds="enableSeconds" :locale="locale" @select="onCalendarSelect"
                @time-select="onTimeSelect" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, onBeforeMount } from 'vue';
import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import dayjs from 'dayjs';
import "./styles/themeT4.css";

// 組件導入
import DateContainer from './components/calendar/DateContainer.vue';
import DateInput from './components/inputs/DateInput.vue';
import TimeInput from './components/inputs/TimeInput.vue';
import DateErrorMessage from './components/calendar/DateErrorMessage.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import CalendarGrid from './components/calendar/CalendarGrid.vue';
import {
    parseToCalendarDateTime,
    formatCalendarDateToString,
    ensureCalendarDate,
    formatOutput,
    getNow,
    isValidDateFormat,
    isValidTimeFormat,
    fixDateFormat,
    fixTimeFormat,
    type DateTimeValue,
    type OutputFormat
} from './utils/dateUtils';
import { type TailwindColor } from './types/main';
import { useScopedTheme } from './composables/useThemeV2';

interface Props {
    modelValue?: DateTimeValue;
    darkMode?: boolean | 'auto';
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
    darkMode: true,
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
    disabled: false,
    required: true,
    locale: 'zh-TW',
    separator: '/',
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

// 狀態
const showCalendar = ref(false);
const inputDateValue = ref<string | null>(null);
const inputTimeValue = ref<string | null>(null);
const errors = ref<Record<string, string>>({});
const formatErrors = ref<Record<string, string>>({});

// 內部格式變量
const internalDateTime = ref<CalendarDateTime | null>(null);
const internalDateFormat = ref(props.dateFormat);
const internalTimeFormat = ref(props.timeFormat);

// 計算屬性
const selectedCalendarDate = computed<CalendarDate | null>(() => {
    return internalDateTime.value
        ? new CalendarDate(internalDateTime.value.year, internalDateTime.value.month, internalDateTime.value.day)
        : null;
});

// 轉換 minDate 和 maxDate 為 CalendarDate
const minDate = computed(() => props.minDate !== undefined ? ensureCalendarDate(props.minDate) : null);
const maxDate = computed(() => props.maxDate !== undefined ? ensureCalendarDate(props.maxDate) : null);

// 計算屬性 - 將CalendarDate轉換為字符串以供輸入組件使用
const minDateStr = computed(() => formatCalendarDateToString(minDate.value));
const maxDateStr = computed(() => formatCalendarDateToString(maxDate.value));

// 說明格式轉換流程
// 1. 使用者輸入格式由 dateFormat 控制 (如 MM/DD/YYYY)
// 2. 內部存儲為標準格式
// 3. 輸出時會根據 outputDateFormat 或 dateFormat+timeFormat 進行格式化
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

// 從CalendarDateTime獲取時間部分
const getTimeFromDateTime = (dateTime: CalendarDateTime | null): string | null => {
    if (!dateTime) return null;

    const hour = dateTime.hour.toString().padStart(2, '0');
    const minute = dateTime.minute.toString().padStart(2, '0');

    if (props.enableSeconds) {
        const second = dateTime.second.toString().padStart(2, '0');
        return `${hour}:${minute}:${second}`;
    } else {
        return `${hour}:${minute}`;
    }
};

// 從日期和時間字串創建CalendarDateTime
const createCalendarDateTime = (dateStr: string | null, timeStr: string | null): CalendarDateTime | null => {
    if (!dateStr) return null;

    const date = dayjs(dateStr);
    if (!date.isValid()) return null;

    const calendarDate = new CalendarDate(date.year(), date.month() + 1, date.date());

    if (!timeStr && !props.showTime) {
        // 如果不需要時間，創建默認為00:00的時間
        return new CalendarDateTime(calendarDate.year, calendarDate.month, calendarDate.day, 0, 0, 0);
    } else if (!timeStr) {
        // 如果需要時間但未提供，返回null
        return null;
    }

    const timeParts = timeStr.split(':').map(Number);
    const hour = timeParts[0] || 0;
    const minute = timeParts[1] || 0;
    const second = timeParts[2] || 0;

    return new CalendarDateTime(calendarDate.year, calendarDate.month, calendarDate.day, hour, minute, second);
};

// 監聽外部值變化
watch(() => props.modelValue, (newValue) => {
    const dateTime = parseToCalendarDateTime(newValue);
    internalDateTime.value = dateTime;

    if (dateTime) {
        // 設置日期部分
        inputDateValue.value = formatCalendarDateToString(dateTime, props.dateFormat);

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
        inputTimeValue.value = '00:00:00';
    }

    const dateTime = createCalendarDateTime(inputDateValue.value, inputTimeValue.value);

    if (dateTime) {
        internalDateTime.value = dateTime;
        emitUpdate(dateTime);
    }
};

// 發送更新事件
const emitUpdate = (dateTime: CalendarDateTime | null) => {
    const formattedOutput = formatOutput(dateTime, props.outputFormat, outputFormat.value);

    emit('update:modelValue', formattedOutput);
    emit('change', formattedOutput);
};

// 日曆選擇處理
const onCalendarSelect = (date: CalendarDate, closeCalendar: boolean = true) => {
    inputDateValue.value = formatCalendarDateToString(date, props.dateFormat);
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
} = useScopedTheme();

// 監聽 props 變化
watch(() => props.theme, (newTheme) => {
    if (newTheme) {
        setColor(newTheme);  // 設置顏色主題
    }
}, { immediate: true });

watch(() => props.darkMode, (newMode) => {
    if (newMode === true) setMode('dark');
    else if (newMode === false) setMode('light');
    else setMode('auto');  // 跟隨系統
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
    focus: () => dateInputRef.value?.focus(),
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
    getDateTime: () => createCalendarDateTime(inputDateValue.value, inputTimeValue.value),
    setDateTime: (dateTime: CalendarDateTime | null) => {
        internalDateTime.value = dateTime;

        if (dateTime) {
            inputDateValue.value = formatCalendarDateToString(dateTime);
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
        inputDateValue.value = formatCalendarDateToString(now);
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
