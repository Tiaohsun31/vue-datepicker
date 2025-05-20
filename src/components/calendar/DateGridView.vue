<template>
    <!-- <div class="grid grid-cols-7 gap-1">
        <CalendarCell v-for="date in calendarDays" :key="`${date.year}-${date.month}-${date.day}`" :date="date"
            :current-month="currentMonth" :selected="isSelected(date)" :is-today="isToday(date)" v-memo="[
                date.month !== currentMonth,
                isSelected(date),
                isToday(date),
                isDateDisabled(date)
            ]" :disabled="isDateDisabled(date)" :focusable="date.day === 1 && date.month === currentMonth"
            @select="handleSelect" />
    </div> -->
    <div class="grid grid-cols-7 gap-1">
        <CalendarCell v-for="state in cellStates" :key="`${state.date.year}-${state.date.month}-${state.date.day}`"
            v-memo="[state.isSelected, state.isToday, state.isDisabled, state.isOutsideMonth]" :date="state.date"
            :current-month="props.month" :selected="state.isSelected" :is-today="state.isToday"
            :disabled="state.isDisabled === true" :focusable="state.date.day === 1 && state.date.month === props.month"
            @select="handleSelect" />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { CalendarDate, getWeeksInMonth, startOfWeek } from '@internationalized/date';
import CalendarCell from './CalendarCell.vue';
import { getTodaysDate } from '@/utils/dateUtils';

interface Props {
    year: number;
    month: number;
    selectedDate: CalendarDate | null;
    minDate?: CalendarDate | null;
    maxDate?: CalendarDate | null;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.
}

const props = withDefaults(defineProps<Props>(), {
    locale: 'en-US',
    weekStartsOn: 0,
    minDate: undefined,
    maxDate: undefined
});

const emit = defineEmits<{
    'select': [date: CalendarDate]
}>();

// // 今天的日期
// const today = computed(() => getTodaysDate());

// // 當前月份（用於區分當月和非當月日期）
// const currentMonth = computed(() => props.month);

// 生成當月的日曆數據
const calendarDays = computed(() => {
    // 該月第一天
    const firstDayOfMonth = new CalendarDate(props.year, props.month, 1);

    // 該月有幾周
    const weeksInMonth = getWeeksInMonth(firstDayOfMonth, props.locale);

    // 日曆顯示的第一天 (該週的第一天)
    const startDay = startOfWeek(firstDayOfMonth, props.locale);

    // 生成日曆網格
    const days: CalendarDate[] = [];
    let currentDate = startDay;

    // 通常需要 6 周 x 7 天 = 42 天來顯示一個月的日曆
    for (let i = 0; i < weeksInMonth * 7; i++) {
        days.push(currentDate);
        currentDate = currentDate.add({ days: 1 });
    }

    return days;
});

// 將日期索引儲存在 Map 中以實現 O(1) 查找
const selectedDateKey = computed(() => {
    if (!props.selectedDate) return null;
    return `${props.selectedDate.year}-${props.selectedDate.month}-${props.selectedDate.day}`;
});

const todayKey = computed(() => {
    const today = getTodaysDate();
    return `${today.year}-${today.month}-${today.day}`;
});

// 預計算每個日期的狀態
const cellStates = computed(() => {
    const todayK = todayKey.value;
    const selectedK = selectedDateKey.value;

    return calendarDays.value.map(date => {
        const dateKey = `${date.year}-${date.month}-${date.day}`;
        const isOutsideMonth = date.month !== props.month;

        return {
            date,
            isToday: dateKey === todayK,
            isSelected: dateKey === selectedK,
            isDisabled: (props.minDate && date.compare(props.minDate) < 0) ||
                (props.maxDate && date.compare(props.maxDate) > 0),
            isOutsideMonth
        };
    });
});

// // 檢查日期是否可選
// const isDateDisabled = (date: CalendarDate) => {
//     if (props.minDate && date.compare(props.minDate) < 0) return true;
//     if (props.maxDate && date.compare(props.maxDate) > 0) return true;
//     return false;
// };

// // 檢查日期是否是今天
// const isToday = (date: CalendarDate) => {
//     return date.compare(today.value) === 0;
// };

// // 檢查日期是否被選中
// const isSelected = (date: CalendarDate) => {
//     return props.selectedDate?.compare(date) === 0;
// };

// 處理日期選擇
const handleSelect = (date: CalendarDate) => {
    emit('select', date);
};
</script>
