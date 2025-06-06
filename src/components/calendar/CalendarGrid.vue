<template>
    <div class="vdt-date-picker calendar-grid w-full max-w-xs rounded-lg shadow p-2">
        <!-- 月份導航和選擇器 -->
        <CalendarHeader v-model:month="currentMonth" v-model:year="currentYear" :locale="locale" :min-year="minYear"
            :max-year="maxYear" :calendar="calendar" />

        <!-- 星期列 -->
        <WeekdayHeader :locale="locale" :week-starts-on="weekStartsOn" />

        <!-- 日期網格 -->
        <DateGridView :year="currentYear" :month="currentMonth" :selected-date="selectedCalendarDate"
            :range-start="selectionMode === 'range' ? rangeStart : null"
            :range-end="selectionMode === 'range' ? rangeEnd : null" :selection-mode="selectionMode" :min-date="minDate"
            :max-date="maxDate" :locale="locale" :week-starts-on="weekStartsOn" @select="handleSelect"
            @range-select="handleRangeSelect" />

        <!-- 時間選擇器 -->
        <TimeSelector v-if="selectionMode === 'single'" :show="showTimeSelector" :time-value="timeValue"
            :enable-seconds="enableSeconds" :use24-hour="use24Hour" :default-time="defaultTime"
            @time-change="emitTimeSelect" @today-click="setTodaysDate" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { CalendarDate, GregorianCalendar, toCalendar } from '@internationalized/date';
import CalendarHeader from './CalendarHeader.vue';
import WeekdayHeader from './WeekdayHeader.vue';
import DateGridView from './DateGridView.vue';
import TimeSelector from './TimeSelector.vue';
import { getTodaysDate, toCalendarDate } from '@/utils/dateUtils';

type SelectionMode = 'single' | 'range';

interface Props {
    // 單一日期模式的屬性
    value?: CalendarDate | null;

    // 範圍選擇模式的屬性
    rangeStart?: CalendarDate | null;
    rangeEnd?: CalendarDate | null;
    selectionMode?: SelectionMode;

    // 外部控制的年月
    year?: number;
    month?: number;

    // 通用屬性
    minDate?: CalendarDate | null;
    maxDate?: CalendarDate | null;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

    // 時間選擇器相關（僅單一日期模式）
    showTimeSelector?: boolean;
    timeValue?: string | null;
    enableSeconds?: boolean;
    use24Hour?: boolean;
    defaultTime?: string;

    // 日曆系統標識符
    calendar?: string;
}

const props = withDefaults(defineProps<Props>(), {
    value: null,
    rangeStart: null,
    rangeEnd: null,
    selectionMode: 'single',
    year: undefined,
    month: undefined,
    locale: 'en-US',
    weekStartsOn: 0,
    minDate: undefined,
    maxDate: undefined,
    showTimeSelector: false,
    timeValue: null,
    enableSeconds: true,
    use24Hour: false,
    defaultTime: '00:00:00',
    calendar: 'gregory',
});

const emit = defineEmits<{
    // 單一日期選擇事件
    select: [date: CalendarDate, closeCalendar: boolean];
    'time-select': [time: string];

    // 範圍選擇事件
    'range-select': [startDate: CalendarDate | null, endDate: CalendarDate | null];
}>();

// 當前顯示的月份和年份
const currentYear = ref<number>(
    props.year ?? (props.value ? getGregorianYear(props.value) : props.rangeStart ? getGregorianYear(props.rangeStart) : getTodaysDate().year)
);

const currentMonth = ref<number>(
    props.month ?? (props.value ? getGregorianMonth(props.value) : props.rangeStart ? getGregorianMonth(props.rangeStart) : getTodaysDate().month)
);

// 輔助函數：獲取西元曆年份
function getGregorianYear(date: CalendarDate): number {
    if (props.calendar === 'gregory') {
        return date.year;
    }

    try {
        const gregorianDate = toCalendar(date, new GregorianCalendar());
        return gregorianDate.year;
    } catch (error) {
        console.warn('無法轉換到西元曆年份，使用原始年份:', error);
        return date.year;
    }
}

// 輔助函數：獲取西元曆月份
function getGregorianMonth(date: CalendarDate): number {
    if (props.calendar === 'gregory') {
        return date.month;
    }

    try {
        const gregorianDate = toCalendar(date, new GregorianCalendar());
        return gregorianDate.month;
    } catch (error) {
        console.warn('無法轉換到西元曆月份，使用原始月份:', error);
        return date.month;
    }
}

// 選擇的日期（單一日期模式）
const selectedCalendarDate = computed(() => props.value);

// 內部時間值
const timeValue = ref<string | null>(props.timeValue);

// 可選的年份範圍
const minYear = computed(() => props.minDate?.year || 1900);
const maxYear = computed(() => props.maxDate?.year || 2100);

// 監聽外部傳入的年月變化
watch(() => [props.year, props.month], ([newYear, newMonth]) => {
    if (newYear !== undefined) currentYear.value = newYear;
    if (newMonth !== undefined) currentMonth.value = newMonth;
}, { immediate: true });

// 監聽外部傳入的值變化
watch(() => props.value, (newValue) => {
    if (newValue && props.year === undefined && props.month === undefined) {
        let displayYear = newValue.year;
        let displayMonth = newValue.month;
        if (props.calendar && props.calendar !== 'gregory') {
            try {
                // 將當地日曆的 CalendarDate 轉換為西元曆 CalendarDate
                const gregorianCalendar = new GregorianCalendar();
                const gregorianDate = toCalendar(newValue, gregorianCalendar);

                // 使用西元曆的年月來設置導航顯示
                displayYear = gregorianDate.year;
                displayMonth = gregorianDate.month;
            } catch (error) {
                // 如果轉換失敗，回退到原始值
                displayYear = newValue.year;
                displayMonth = newValue.month;
            }
        }
        currentYear.value = displayYear;
        currentMonth.value = displayMonth;
    }
}, { immediate: true });

// 監聽範圍選擇的開始日期
watch(() => props.rangeStart, (newValue) => {
    if (newValue && props.selectionMode === 'range' && props.year === undefined && props.month === undefined) {
        const displayYear = getGregorianYear(newValue);
        const displayMonth = getGregorianMonth(newValue);

        currentYear.value = displayYear;
        currentMonth.value = displayMonth;
    }
}, { immediate: true });

// 監聽外部時間值變化
watch(() => props.timeValue, (newValue) => {
    timeValue.value = newValue;
}, { immediate: true });

// 處理單一日期選擇
const handleSelect = (date: CalendarDate) => {
    if (props.selectionMode === 'single') {
        emit('select', date, true);

        // 如果有時間選擇器，也發送時間選擇事件
        if (props.showTimeSelector && timeValue.value) {
            emit('time-select', timeValue.value);
        }
    }
};

// 處理範圍選擇
const handleRangeSelect = (startDate: CalendarDate | null, endDate: CalendarDate | null) => {
    if (props.selectionMode === 'range') {
        emit('range-select', startDate, endDate);
    }
};

// 發送時間選擇事件
const emitTimeSelect = (time: string) => {
    timeValue.value = time;
    emit('time-select', time);
};

// 設置今天日期
const setTodaysDate = () => {
    if (props.selectionMode === 'single') {
        const today = getTodaysDate();
        const calendarToday = toCalendarDate(today);
        if (calendarToday) {
            currentYear.value = today.year;
            currentMonth.value = today.month;
            emit('select', calendarToday, false);
        }
    }
};

// 公開方法
defineExpose({
    // 獲取當前選中的日期（單一模式）
    getSelectedDate: () => selectedCalendarDate.value,

    // 獲取當前範圍（範圍模式）
    getSelectedRange: () => ({ start: props.rangeStart, end: props.rangeEnd }),

    // 設置顯示的月份
    setDisplayMonth: (year: number, month: number) => {
        currentYear.value = year;
        currentMonth.value = month;
    },

    // 導航到上個月
    previousMonth: () => {
        if (currentMonth.value === 1) {
            currentMonth.value = 12;
            currentYear.value -= 1;
        } else {
            currentMonth.value -= 1;
        }
    },

    // 導航到下個月
    nextMonth: () => {
        if (currentMonth.value === 12) {
            currentMonth.value = 1;
            currentYear.value += 1;
        } else {
            currentMonth.value += 1;
        }
    }
});
</script>
