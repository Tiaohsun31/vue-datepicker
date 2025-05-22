<template>
    <div class="date-time-picker-wrapper relative w-full" ref="pickerRef">
        <!-- 日期時間輸入容器 -->
        <DateContainer :errors="errors">
            <div class="flex w-full items-center justify-start gap-1">
                <!-- 日期輸入部分 -->
                <div>
                    <DateInput ref="dateInputRef" v-model="inputDateValue" :year-placeholder="yearPlaceholder"
                        :month-placeholder="monthPlaceholder" :day-placeholder="dayPlaceholder" :min-date="minDateStr"
                        :max-date="maxDateStr" :required="required" :auto-focus="autoFocus" :separator="separator"
                        :date-format="displayFormat" @validation="onDateInputValidation"
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

            <!-- 日曆和時鐘圖標 -->
            <div class="ml-auto flex gap-2">
                <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    :disabled="disabled" @click="toggleCalendar">
                    <CalendarIcon class="h-5 w-5 cursor-pointer" />
                </button>
                <button v-if="showTime" type="button"
                    class="text-gray-400 hover:text-gray-600 transition-colors duration-200" :disabled="disabled"
                    @click="toggleTimeGrid">
                    <TimeIcon class="h-5 w-5 cursor-pointer" />
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

        <!-- 時間選擇彈出層 -->
        <div v-if="showTimeGrid && !disabled" ref="timeGridRef"
            class="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10" @click.stop role="dialog"
            aria-modal="true" aria-label="time-picker">
            <TimeGrid :value="inputTimeValue" :enable-seconds="enableSeconds" :use24Hour="use24Hour" :locale="locale"
                @select="onTimeGridSelect" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, onBeforeMount } from 'vue';
import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import dayjs from 'dayjs';

// 組件導入
import DateContainer from './components/calendar/DateContainer.vue';
import DateInput from './components/inputs/DateInput.vue';
import TimeInput from './components/inputs/TimeInput.vue';
import DateErrorMessage from './components/calendar/DateErrorMessage.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import TimeIcon from './components/icons/TimeIcon.vue';
import CalendarGrid from './components/calendar/CalendarGrid.vue';
import TimeGrid from './components/calendar/TimeSelector.vue';
import { ensureCalendarDate, formatCalendarDateToString } from './utils/dateUtils';
import { type TailwindColor } from './types/main';
import { setTheme } from './utils/colorUtils';

interface Props {
    modelValue?: CalendarDateTime | null;
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
    timeSeparator?: string;
    useLocalizedPeriod?: boolean;
    // 一般選項
    disabled?: boolean;
    required?: boolean;
    minDate?: CalendarDate;
    maxDate?: CalendarDate;
    locale?: string;
    separator?: string;
    displayFormat?: string;
    timeFormat?: string;
    autoFocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    theme: () => 'violet',
    yearPlaceholder: '年',
    monthPlaceholder: '月',
    dayPlaceholder: '日',
    showTime: true,
    hourPlaceholder: '時',
    minutePlaceholder: '分',
    secondPlaceholder: '秒',
    enableSeconds: true,
    use24Hour: false,
    minuteStep: 5,
    timeSeparator: ' ',
    useLocalizedPeriod: false,
    disabled: false,
    required: true,
    locale: 'zh-TW',
    separator: '/',
    displayFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    autoFocus: false
});

const emit = defineEmits<{
    'update:modelValue': [date: CalendarDateTime | null];
    'change': [date: CalendarDateTime | null];
    'validation': [isValid: boolean, errors: Record<string, string>];
}>();

// DOM 引用
const pickerRef = ref<HTMLElement | null>(null);
const dateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const timeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const timeGridRef = ref<HTMLElement | null>(null);

// 狀態
const showCalendar = ref(false);
const showTimeGrid = ref(false);
const inputDateValue = ref<string | null>(null);
const inputTimeValue = ref<string | null>(null);
const errors = ref<Record<string, string>>({});
const selectedDate = ref<CalendarDate | null>(ensureCalendarDate(props.modelValue));
const selectedTime = ref<string | null>(null);

// 計算屬性 - 將CalendarDate轉換為字符串以供輸入組件使用
const minDateStr = computed(() => {
    if (!props.minDate) return null;
    return formatCalendarDateToString(props.minDate);
});

const maxDateStr = computed(() => {
    if (!props.maxDate) return null;
    return formatCalendarDateToString(props.maxDate);
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
    if (newValue) {
        // 設置日期部分
        selectedDate.value = new CalendarDate(
            newValue.year,
            newValue.month,
            newValue.day
        );
        inputDateValue.value = formatCalendarDateToString(newValue);

        // 設置時間部分
        selectedTime.value = getTimeFromDateTime(newValue);
        inputTimeValue.value = selectedTime.value;
    } else {
        selectedDate.value = null;
        inputDateValue.value = null;
        selectedTime.value = null;
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

// 時間完成事件處理
const onTimeInputComplete = (timeStr: string) => {
    inputTimeValue.value = timeStr;
    updateDateTimeValue();
};

// 更新完整的日期時間值
const updateDateTimeValue = () => {
    const dateTime = createCalendarDateTime(inputDateValue.value, inputTimeValue.value);

    if (dateTime) {
        emit('update:modelValue', dateTime);
        emit('change', dateTime);
    }
};

// 日曆選擇處理
const onCalendarSelect = (date: CalendarDate) => {
    selectedDate.value = date;
    inputDateValue.value = formatCalendarDateToString(date);
    updateDateTimeValue();
    hideCalendar();
};

// 時間選擇處理
const onTimeGridSelect = (timeStr: string) => {
    selectedTime.value = timeStr;
    inputTimeValue.value = timeStr;
    updateDateTimeValue();
    hideTimeGrid();
};

// 切換日曆顯示
const toggleCalendar = () => {
    if (props.disabled) return;

    // 如果時間選擇器顯示中，先隱藏
    if (showTimeGrid.value) {
        showTimeGrid.value = false;
    }

    showCalendar.value = !showCalendar.value;

    if (showCalendar.value) {
        nextTick(() => {
            updateCalendarPosition();
        });
    }
};

// 切換時間選擇器顯示
const toggleTimeGrid = () => {
    if (props.disabled) return;

    // 如果日曆顯示中，先隱藏
    if (showCalendar.value) {
        showCalendar.value = false;
    }

    showTimeGrid.value = !showTimeGrid.value;

    if (showTimeGrid.value) {
        nextTick(() => {
            updateTimeGridPosition();
        });
    }
};

// 隱藏日曆
const hideCalendar = () => {
    showCalendar.value = false;
};

// 隱藏時間選擇器
const hideTimeGrid = () => {
    showTimeGrid.value = false;
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

// 更新時間選擇器位置
const updateTimeGridPosition = () => {
    if (!pickerRef.value || !timeGridRef.value) return;

    // 獲取輸入框位置
    const pickerRect = pickerRef.value.getBoundingClientRect();
    const timeGrid = timeGridRef.value;

    // 設置為輸入框下方
    timeGrid.style.position = 'absolute';
    timeGrid.style.top = `${pickerRect.height + 5}px`;
    timeGrid.style.right = '0';
};

// 處理點擊事件
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    // 處理日曆點擊外部
    if (showCalendar.value && calendarRef.value && !calendarRef.value.contains(target) &&
        pickerRef.value && !pickerRef.value.contains(target)) {
        hideCalendar();
    }

    // 處理時間選擇器點擊外部
    if (showTimeGrid.value && timeGridRef.value && !timeGridRef.value.contains(target) &&
        pickerRef.value && !pickerRef.value.contains(target)) {
        hideTimeGrid();
    }
};

// 處理窗口大小變化
const handleResize = () => {
    if (showCalendar.value) {
        updateCalendarPosition();
    }
    if (showTimeGrid.value) {
        updateTimeGridPosition();
    }
};

// 處理滾動事件
const handleScroll = () => {
    if (showCalendar.value) {
        updateCalendarPosition();
    }
    if (showTimeGrid.value) {
        updateTimeGridPosition();
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

// 獲取當前日期和時間
// const getNow = (): CalendarDateTime => {
//     const now = new Date();
//     return new CalendarDateTime(
//         now.getFullYear(),
//         now.getMonth() + 1,
//         now.getDate(),
//         now.getHours(),
//         now.getMinutes(),
//         now.getSeconds()
//     );
// };

// 公開方法
// defineExpose({
//     focus: () => dateInputRef.value?.focus,
//     reset: () => {
//         selectedDate.value = null;
//         selectedTime.value = null;
//         inputDateValue.value = null;
//         inputTimeValue.value = null;
//         errors.value = {};
//         emit('update:modelValue', null);
//     },
//     validate: () => {
//         dateInputRef.value?.validate();
//         if (props.showTime && timeInputRef.value) {
//             timeInputRef.value.validate();
//         }
//     },
//     getDateTime: () => createCalendarDateTime(inputDateValue.value, inputTimeValue.value),
//     setDateTime: (dateTime: CalendarDateTime | null) => {
//         if (dateTime) {
//             selectedDate.value = new CalendarDate(
//                 dateTime.year,
//                 dateTime.month,
//                 dateTime.day
//             );
//             inputDateValue.value = formatCalendarDateToString(selectedDate.value);

//             selectedTime.value = getTimeFromDateTime(dateTime);
//             inputTimeValue.value = selectedTime.value;
//         } else {
//             selectedDate.value = null;
//             selectedTime.value = null;
//             inputDateValue.value = null;
//             inputTimeValue.value = null;
//         }

//         emit('update:modelValue', dateTime);
//     },
//     getNow,
//     selectNow: () => {
//         const now = getNow();
//         selectedDate.value = new CalendarDate(now.year, now.month, now.day);
//         inputDateValue.value = formatCalendarDateToString(selectedDate.value);

//         const timeStr = getTimeFromDateTime(now);
//         selectedTime.value = timeStr;
//         inputTimeValue.value = timeStr;

//         emit('update:modelValue', now);
//         emit('change', now);
//     }
// });

onBeforeMount(() => {
    if (props.theme) {
        setTheme(props.theme);
    }
});
</script>
