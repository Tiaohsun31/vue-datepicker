<!-- DateGridView.vue - 混合使用版本 -->
<template>
    <div class="grid grid-cols-7 gap-1">
        <CalendarCell v-for="state in cellStates" :key="`${state.date.year}-${state.date.month}-${state.date.day}`"
            v-memo="[state.isSelected, state.isToday, state.isDisabled, state.isOutsideMonth, state.isRangeStart, state.isRangeEnd, state.isInRange]"
            :date="state.date" :current-month="props.month" :selected="!!state.isSelected" :is-today="state.isToday"
            :disabled="state.isDisabled === true" :focusable="state.date.day === 1 && state.date.month === props.month"
            :is-range-start="!!state.isRangeStart" :is-range-end="!!state.isRangeEnd" :is-in-range="!!state.isInRange"
            :selection-mode="selectionMode" @select="handleSelect" @nav="handleNavigation" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CalendarDate, getWeeksInMonth, startOfWeek } from '@internationalized/date';
import CalendarCell from './CalendarCell.vue';
import { getTodaysDate } from '@/utils/dateUtils';

type SelectionMode = 'single' | 'range';

interface Props {
    year: number;
    month: number;
    selectedDate?: CalendarDate | null;

    // 範圍選擇屬性
    rangeStart?: CalendarDate | null;
    rangeEnd?: CalendarDate | null;
    selectionMode?: SelectionMode;

    minDate?: CalendarDate | null;
    maxDate?: CalendarDate | null;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const props = withDefaults(defineProps<Props>(), {
    selectedDate: null,
    rangeStart: null,
    rangeEnd: null,
    selectionMode: 'single',
    locale: 'en-US',
    weekStartsOn: 0,
    minDate: undefined,
    maxDate: undefined
});

const emit = defineEmits<{
    'select': [date: CalendarDate];
    'range-select': [startDate: CalendarDate | null, endDate: CalendarDate | null];
    'navigate': [direction: 'prev-month' | 'next-month' | 'prev-year' | 'next-year'];
}>();

// 生成當月的日曆數據 - 這裡必須使用 @internationalized/date 的功能
const calendarDays = computed(() => {
    // 創建當月第一天的 CalendarDate
    const firstDayOfMonth = new CalendarDate(props.year, props.month, 1);

    // 使用 @internationalized/date 的函數計算週數和開始日
    const weeksInMonth = getWeeksInMonth(firstDayOfMonth, props.locale);
    const startDay = startOfWeek(firstDayOfMonth, props.locale);

    const days: CalendarDate[] = [];
    let currentDate = startDay;

    for (let i = 0; i < weeksInMonth * 7; i++) {
        days.push(currentDate);
        currentDate = currentDate.add({ days: 1 });
    }

    return days;
});

// 今天的日期鍵值 - 使用簡單計算
const todayKey = computed(() => {
    const today = getTodaysDate();
    return `${today.year}-${today.month}-${today.day}`;
});

// 檢查日期是否在範圍內（簡化版）
const isDateInRange = (date: CalendarDate): boolean => {
    if (!props.rangeStart || !props.rangeEnd) return false;

    return date.compare(props.rangeStart) >= 0 && date.compare(props.rangeEnd) <= 0;
};

// 預計算每個日期的狀態
const cellStates = computed(() => {
    const todayK = todayKey.value;

    return calendarDays.value.map(date => {
        const dateKey = `${date.year}-${date.month}-${date.day}`;
        const isOutsideMonth = date.month !== props.month;
        const isDisabled = (props.minDate && date.compare(props.minDate) < 0) ||
            (props.maxDate && date.compare(props.maxDate) > 0);

        // 範圍選擇狀態判斷
        const isRangeStart = props.selectionMode === 'range' && props.rangeStart &&
            date.compare(props.rangeStart) === 0;
        const isRangeEnd = props.selectionMode === 'range' && props.rangeEnd &&
            date.compare(props.rangeEnd) === 0;
        const isInRange = props.selectionMode === 'range' &&
            isDateInRange(date) && !isRangeStart && !isRangeEnd && !isDisabled;

        return {
            date,
            isToday: dateKey === todayK,
            isSelected: props.selectionMode === 'single' && props.selectedDate &&
                date.compare(props.selectedDate) === 0,
            isDisabled,
            isOutsideMonth,
            isRangeStart,
            isRangeEnd,
            isInRange
        };
    });
});

// 處理日期選擇 - 簡化邏輯
const handleSelect = (date: CalendarDate) => {
    if (props.selectionMode === 'single') {
        emit('select', date);
    } else if (props.selectionMode === 'range') {
        // 在範圍模式下，直接發送點擊的日期
        // 讓父組件決定這是開始還是結束日期
        emit('range-select', date, null);
    }
};

// 處理鍵盤導航
const handleNavigation = (direction: 'up' | 'down' | 'left' | 'right') => {
    // 簡化的導航邏輯
    if (direction === 'left' && cellStates.value[0].date.day < 15) {
        emit('navigate', 'prev-month');
    } else if (direction === 'right' &&
        cellStates.value[cellStates.value.length - 1].date.day > 15 &&
        cellStates.value[cellStates.value.length - 1].date.month !== props.month) {
        emit('navigate', 'next-month');
    }
};

// 公開方法
defineExpose({
    // 獲取當月所有日期
    getCalendarDays: () => calendarDays.value,

    // 獲取當前狀態
    getCellStates: () => cellStates.value
});
</script>
