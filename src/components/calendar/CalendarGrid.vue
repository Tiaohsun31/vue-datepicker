<template>
    <div class="vdt-date-picker calendar-grid w-full max-w-xs rounded-lg shadow p-2">
        <!-- 月份導航和選擇器 -->
        {{ value }}
        <CalendarHeader v-model:month="currentMonth" v-model:year="currentYear" :locale="locale" :min-year="minYear"
            :max-year="maxYear" :calendar="calendar" />

        <!-- 星期列 -->
        <WeekdayHeader :locale="locale" :week-starts-on="weekStartsOn" :calendar="calendar" />

        <!-- 日期網格 -->
        <DateGridView :year="currentYear" :month="currentMonth" :selected-date="selectedCalendarDate"
            :range-start="selectionMode === 'range' ? rangeStart : null"
            :range-end="selectionMode === 'range' ? rangeEnd : null" :selection-mode="selectionMode" :min-date="minDate"
            :max-date="maxDate" :locale="locale" :week-starts-on="weekStartsOn" :calendar="calendar"
            @select="handleSelect" @range-select="handleRangeSelect" />

        <!-- 時間選擇器 -->
        <TimeSelector v-if="selectionMode === 'single'" :show="showTimeSelector" :time-value="timeValue"
            :enable-seconds="enableSeconds" :use24-hour="use24Hour" :default-time="defaultTime"
            @time-change="emitTimeSelect" @today-click="setTodaysDate" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { CalendarDate } from '@internationalized/date';
import CalendarHeader from './CalendarHeader.vue';
import WeekdayHeader from './WeekdayHeader.vue';
import DateGridView from './DateGridView.vue';
import TimeSelector from './TimeSelector.vue';
import { getTodaysDate, toCalendarDate } from '@/utils/dateUtils';
import { CalendarUtils } from '@/utils/calendarUtils';

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

// 輔助函數：獲取西元曆年份 - 使用 CalendarUtils
function getGregorianYear(date: CalendarDate): number {
    if (props.calendar === 'gregory') {
        return date.year;
    }

    try {
        const gregorianCalendar = CalendarUtils.createSafeCalendar('gregory');
        const gregorianDate = CalendarUtils.safeToCalendar(date, gregorianCalendar);
        console.log('轉換到西元曆年份:', gregorianDate.year);
        return gregorianDate.year;
    } catch (error) {
        console.warn('無法轉換到西元曆年份，使用原始年份:', error);
        return date.year;
    }
}

// 輔助函數：獲取西元曆月份 - 使用 CalendarUtils
function getGregorianMonth(date: CalendarDate): number {
    if (props.calendar === 'gregory') {
        return date.month;
    }

    try {
        const gregorianCalendar = CalendarUtils.createSafeCalendar('gregory');
        const gregorianDate = CalendarUtils.safeToCalendar(date, gregorianCalendar);
        return gregorianDate.month;
    } catch (error) {
        console.warn('無法轉換到西元曆月份，使用原始月份:', error);
        return date.month;
    }
}

// 當前顯示的月份和年份
// const currentYear = ref<number>(
//     props.year ?? (props.value ? props.value.year : props.rangeStart ? props.rangeStart.year : getTodaysDate().year)
// );

// const currentMonth = ref<number>(
//     props.month ?? (props.value ? props.value.month : props.rangeStart ? props.rangeStart.month : getTodaysDate().month)
// );
const getInitialYearMonth = () => {
    // 優先使用 props 提供的年月
    if (props.year !== undefined && props.month !== undefined) {
        return { year: props.year, month: props.month };
    }
    console.log(props.value, 'props.value');
    // 從 value 中提取
    if (props.value) {
        if (props.value.calendar.identifier === 'gregory') {
            return { year: props.value.year, month: props.value.month };
        } else {
            // 非西元曆，需要轉換
            try {
                const gregorianCalendar = CalendarUtils.createSafeCalendar('gregory');
                const gregorianDate = CalendarUtils.safeToCalendar(props.value, gregorianCalendar);
                console.log('轉換到西元曆日期:', gregorianDate);
                return { year: gregorianDate.year, month: gregorianDate.month };
            } catch (error) {
                console.warn('轉換日期失敗:', error);
            }
        }
    }

    // 使用今天的日期
    const today = getTodaysDate();
    return { year: today.year, month: today.month };
};

const { year: initialYear, month: initialMonth } = getInitialYearMonth();

const currentYear = ref<number>(initialYear);
const currentMonth = ref<number>(initialMonth);

// 選擇的日期（單一日期模式）
const selectedCalendarDate = computed(() => {
    console.log('當前選擇的日期:', props.value);
    return props.value
});

// 內部時間值
const timeValue = ref<string | null>(props.timeValue);

// 可選的年份範圍
const minYear = computed(() => props.minDate?.year || 1900);
const maxYear = computed(() => props.maxDate?.year || 2100);

// 監聽外部傳入的年月變化
watch(() => [props.year, props.month], ([newYear, newMonth]) => {
    console.log('監聽到年月變化:', newYear, newMonth);
    if (newYear !== undefined) currentYear.value = newYear;
    if (newMonth !== undefined) currentMonth.value = newMonth;
}, { immediate: true });

// 監聽外部傳入的值變化 - 使用 CalendarUtils
// watch(() => props.value, (newValue) => {
//     if (newValue && props.year === undefined && props.month === undefined) {
//         console.log('監聽到新值:', newValue);

//         currentYear.value = newValue.year;
//         currentMonth.value = newValue.month;
//     }
// }, { immediate: true });

// 監聽範圍選擇的開始日期
// watch(() => props.rangeStart, (newValue) => {
//     if (newValue && props.selectionMode === 'range' && props.year === undefined && props.month === undefined) {
//         if (props.calendar === 'gregory') {
//             currentYear.value = newValue.year;
//             currentMonth.value = newValue.month;
//         } else {
//             try {
//                 const gregorianCalendar = CalendarUtils.createSafeCalendar('gregory');
//                 const gregorianDate = CalendarUtils.safeToCalendar(newValue, gregorianCalendar);
//                 currentYear.value = gregorianDate.year;
//                 currentMonth.value = gregorianDate.month;
//             } catch (error) {
//                 console.warn('日期轉換失敗，使用原始值:', error);
//                 currentYear.value = newValue.year;
//                 currentMonth.value = newValue.month;
//             }
//         }
//     }
// }, { immediate: true });

// 監聽外部時間值變化
watch(() => props.timeValue, (newValue) => {
    timeValue.value = newValue;
}, { immediate: true });

// 處理單一日期選擇
const handleSelect = (date: CalendarDate) => {
    if (props.selectionMode === 'single') {
        console.log('選擇的日期:', date);
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
