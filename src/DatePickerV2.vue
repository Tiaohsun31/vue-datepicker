<template>
    <div class="date-picker-wrapper relative w-full" ref="pickerRef">
        <!-- 日期輸入容器 -->
        <DateContainer :errors="errors">
            <!-- 日期輸入部分 -->
            <DateInput ref="dateInputRef" v-model="inputDateValue" :year-placeholder="yearPlaceholder"
                :month-placeholder="monthPlaceholder" :day-placeholder="dayPlaceholder" :min-date="minDateStr"
                :max-date="maxDateStr" :required="required" :auto-focus="autoFocus" :separator="separator"
                :date-format="displayFormat" @validation="onInputValidation" @complete="onInputComplete" />

            <!-- 日曆圖標 -->
            <div class="ml-auto">
                <button type="button"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    :disabled="disabled" @click="toggleCalendar">
                    <CalendarIcon class="h-5 w-5 cursor-pointer" />
                </button>
            </div>
        </DateContainer>

        <!-- 錯誤訊息 -->
        <DateErrorMessage :errors="errors" />

        <!-- 日曆彈出層 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10" @click.stop role="dialog"
            aria-modal="true" aria-label="date-picker">
            <CalendarGrid :value="ensureCalendarDate(selectedDate)" :min-date="minDate" :max-date="maxDate"
                :locale="locale" @select="onCalendarSelect" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, onBeforeMount } from 'vue';
import { CalendarDate } from '@internationalized/date';
import dayjs from 'dayjs';

// 組件導入
import DateContainer from './components/calendar/DateContainer.vue';
import DateInput from './components/inputs/DateInput.vue';
import DateErrorMessage from './components/calendar/DateErrorMessage.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import CalendarGrid from './components/calendar/CalendarGrid.vue';
import { ensureCalendarDate, formatCalendarDateToString, getTodaysDate } from './utils/dateUtils';
import { type TailwindColor } from './types/main';
import { setTheme } from './utils/tailwind4Theme';
interface Props {
    modelValue?: CalendarDate | null;
    theme?: TailwindColor | string;
    yearPlaceholder?: string;
    monthPlaceholder?: string;
    dayPlaceholder?: string;
    disabled?: boolean;
    required?: boolean;
    minDate?: CalendarDate;
    maxDate?: CalendarDate;
    locale?: string;
    separator?: string;
    displayFormat?: string;
    autoFocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    theme: () => 'violet',
    yearPlaceholder: 'YYYY',
    monthPlaceholder: 'MM',
    dayPlaceholder: 'DD',
    disabled: false,
    required: true,
    locale: 'zh-TW',
    separator: '/',
    displayFormat: 'YYYY-MM-DD',
    autoFocus: false
});

const emit = defineEmits<{
    'update:modelValue': [date: CalendarDate | null];
    'change': [date: CalendarDate | null];
    'validation': [isValid: boolean, errors: Record<string, string>];
}>();

// DOM 引用
const pickerRef = ref<HTMLElement | null>(null);
const dateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const calendarRef = ref<HTMLElement | null>(null);

// 狀態
const showCalendar = ref(false);
const inputDateValue = ref<string | null>(null);
const errors = ref<Record<string, string>>({});
const selectedDate = ref<CalendarDate | null>(ensureCalendarDate(props.modelValue));

// 計算屬性 - 將CalendarDate轉換為字符串以供輸入組件使用
const minDateStr = computed(() => {
    if (!props.minDate) return null;
    return formatCalendarDateToString(props.minDate);
});

const maxDateStr = computed(() => {
    if (!props.maxDate) return null;
    return formatCalendarDateToString(props.maxDate);
});

// 監聽外部值變化
watch(() => props.modelValue, (newValue) => {
    selectedDate.value = ensureCalendarDate(newValue);
    inputDateValue.value = newValue ? formatCalendarDateToString(newValue) : null;
}, { immediate: true });

// 從字符串解析為CalendarDate (綜合新舊版本)
function parseStringToCalendarDate(dateStr: string): CalendarDate | null {
    try {
        // 先使用 dayjs 嘗試解析標準格式
        const date = dayjs(dateStr);
        if (date.isValid()) {
            return new CalendarDate(date.year(), date.month() + 1, date.date());
        }

        // 如果失敗，嘗試解析用戶輸入的多種格式 (從舊版移植)
        return parseUserInput(dateStr);
    } catch (e) {
        console.error('Error parsing date string:', e);
        return null;
    }
}

// 從舊版移植的多格式解析函數
const parseUserInput = (input: string): CalendarDate | null => {
    try {
        // 嘗試多種格式
        const formats = [
            // 標準 ISO 格式
            /^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/, // YYYY-MM-DD or YYYY/MM/DD
            // 本地化格式 (中文通常用 YYYY/MM/DD)
            /^(\d{4})[/\.](\d{1,2})[/\.](\d{1,2})$/, // YYYY/MM/DD or YYYY.MM.DD
            // 日期優先 (歐洲常用)
            /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/, // DD-MM-YYYY or DD/MM/YYYY
            // 月份優先 (美式)
            /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/, // MM-DD-YYYY or MM/DD/YYYY
        ];

        for (const format of formats) {
            const match = input.match(format);
            if (match) {
                let year, month, day;

                // 根據格式解析年月日
                if (format === formats[0] || format === formats[1]) {
                    // YYYY-MM-DD 或 YYYY/MM/DD
                    [, year, month, day] = match.map(Number);
                } else if (format === formats[2]) {
                    // DD-MM-YYYY 或 DD/MM/YYYY
                    [, day, month, year] = match.map(Number);
                } else {
                    // MM-DD-YYYY 或 MM/DD/YYYY (美式)
                    [, month, day, year] = match.map(Number);
                }

                // 驗證日期是否有效
                if (year && month && day &&
                    month >= 1 && month <= 12 &&
                    day >= 1 && day <= 31) {
                    return new CalendarDate(year, month, day);
                }
            }
        }
        return null;
    } catch (e) {
        console.error("Error parsing date:", e);
        return null;
    }
};

// 驗證事件處理
const onInputValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
    errors.value = validationErrors;
    emit('validation', isValid, validationErrors);
};

// 日期完成事件處理
const onInputComplete = (dateStr: string) => {
    const date = parseStringToCalendarDate(dateStr);
    if (date) {
        selectedDate.value = date;
        emit('update:modelValue', date);
        emit('change', date);
    }
};

// 日曆選擇處理
const onCalendarSelect = (date: CalendarDate) => {
    selectedDate.value = date;
    inputDateValue.value = formatCalendarDateToString(date);
    emit('update:modelValue', date);
    emit('change', date);
    hideCalendar();
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
    calendar.style.top = `${pickerRect.height + 5}px`; // 輸入框高度 + 5px 間距
    calendar.style.left = '0';
};

// 處理點擊事件 (結合新舊版本的邏輯)
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

// 公開方法
defineExpose({
    focus: () => dateInputRef.value?.focus,
    reset: () => {
        selectedDate.value = null;
        inputDateValue.value = null;
        errors.value = {};
        emit('update:modelValue', null);
    },
    validate: () => dateInputRef.value?.validate(),
    getDate: () => selectedDate.value,
    setDate: (date: CalendarDate | null) => {
        selectedDate.value = date;
        inputDateValue.value = date ? formatCalendarDateToString(date) : null;
        emit('update:modelValue', date);
    },
    getTodaysDate,
    selectToday: () => {
        const today = getTodaysDate();
        selectedDate.value = today;
        inputDateValue.value = formatCalendarDateToString(today);
        emit('update:modelValue', today);
        emit('change', today);
    }
});

onBeforeMount(() => {
    if (props.theme) {
        setTheme(props.theme);
    }
});
</script>
