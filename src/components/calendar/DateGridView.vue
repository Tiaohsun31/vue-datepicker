<!-- DateGridView.vue -->
<template>
    <div class="grid grid-cols-7 gap-1">
        <CalendarCell v-for="cellData in optimizedCellStates" :key="cellData.key" v-memo="cellData.memoKey"
            :date="cellData.date" :current-month="props.month" :selected="cellData.isSelected"
            :is-today="cellData.isToday" :disabled="cellData.isDisabled" :focusable="cellData.isFocusable"
            :is-range-start="cellData.isRangeStart" :is-range-end="cellData.isRangeEnd"
            :is-in-range="cellData.isInRange" :selection-mode="selectionMode" @select="handleSelect"
            @nav="handleNavigation" />
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

// 緩存今天的日期鍵值 - 只在日期變化時重新計算
const todayKey = computed(() => {
    const today = getTodaysDate();
    return `${today.year}-${today.month}-${today.day}`;
});

// 生成當月的日曆數據 - 使用 useMemo 來避免不必要的重新計算
const calendarDays = computed(() => {
    try {
        // 創建當月第一天的 CalendarDate
        const firstDayOfMonth = new CalendarDate(props.year, props.month, 1);

        // 使用 @internationalized/date 的函數計算週數和開始日
        const weeksInMonth = getWeeksInMonth(firstDayOfMonth, props.locale);

        // 根據地區設置決定一週的開始日
        const startDay = startOfWeek(firstDayOfMonth, props.locale);

        const days: CalendarDate[] = [];
        let currentDate = startDay;

        const totalCells = weeksInMonth * 7;
        for (let i = 0; i < totalCells; i++) {
            days.push(currentDate);
            currentDate = currentDate.add({ days: 1 });
        }

        return days;
    } catch (error) {
        console.error('Error generating calendar days:', error);
        return [];
    }
});

// 範圍檢查優化 - 使用數值比較提高性能
const isDateInRange = (date: CalendarDate): boolean => {
    if (!props.rangeStart || !props.rangeEnd) return false;

    try {
        return date.compare(props.rangeStart) >= 0 && date.compare(props.rangeEnd) <= 0;
    } catch {
        return false;
    }
};

// 日期比較的輔助函數
const isDateEqual = (date1: CalendarDate | null, date2: CalendarDate | null): boolean => {
    if (!date1 || !date2) return false;
    try {
        return date1.compare(date2) === 0;
    } catch {
        return false;
    }
};

// 檢查日期是否被禁用
const isDateDisabled = (date: CalendarDate): boolean => {
    try {
        if (props.minDate && date.compare(props.minDate) < 0) return true;
        if (props.maxDate && date.compare(props.maxDate) > 0) return true;
        return false;
    } catch {
        return true; // 如果比較失敗，視為禁用
    }
};

// 優化的單元格狀態計算
interface CellData {
    key: string;
    memoKey: (string | boolean | number)[];
    date: CalendarDate;
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    isOutsideMonth: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isInRange: boolean;
    isFocusable: boolean;
}

const optimizedCellStates = computed((): CellData[] => {
    const todayK = todayKey.value;

    return calendarDays.value.map((date, index) => {
        // 基本狀態
        const dateKey = `${date.year}-${date.month}-${date.day}`;
        const isToday = dateKey === todayK;
        const isOutsideMonth = date.month !== props.month;
        const isDisabled = isDateDisabled(date);

        // 選擇狀態
        const isSelected = props.selectionMode === 'single' && isDateEqual(date, props.selectedDate);

        // 範圍選擇狀態
        const isRangeStart = props.selectionMode === 'range' && isDateEqual(date, props.rangeStart);
        const isRangeEnd = props.selectionMode === 'range' && isDateEqual(date, props.rangeEnd);
        const isInRange = props.selectionMode === 'range' &&
            isDateInRange(date) && !isRangeStart && !isRangeEnd && !isDisabled;

        // 焦點狀態 - 當月第一天可聚焦
        const isFocusable = date.day === 1 && date.month === props.month;

        // 生成 memo 鍵值 - 只包含影響渲染的關鍵屬性
        const memoKey = [
            dateKey,
            isSelected,
            isToday,
            isDisabled,
            isRangeStart,
            isRangeEnd,
            isInRange,
            props.selectionMode
        ];

        return {
            key: `${props.year}-${props.month}-${dateKey}-${index}`,
            memoKey,
            date,
            isToday,
            isSelected,
            isDisabled,
            isOutsideMonth,
            isRangeStart,
            isRangeEnd,
            isInRange,
            isFocusable
        };
    });
});

// 處理日期選擇 - 簡化邏輯
const handleSelect = (date: CalendarDate) => {
    if (props.selectionMode === 'single') {
        emit('select', date);
    } else if (props.selectionMode === 'range') {
        // 範圍模式下，直接發送點擊的日期，讓父組件決定邏輯
        emit('range-select', date, null);
    }
};

// 處理鍵盤導航 - 簡化並優化
const handleNavigation = (direction: 'up' | 'down' | 'left' | 'right') => {
    // 基本的月份導航邏輯
    const cellStates = optimizedCellStates.value;
    if (cellStates.length === 0) return;

    const firstCell = cellStates[0];
    const lastCell = cellStates[cellStates.length - 1];

    switch (direction) {
        case 'left':
            if (firstCell.date.day < 15 && firstCell.date.month !== props.month) {
                emit('navigate', 'prev-month');
            }
            break;
        case 'right':
            if (lastCell.date.day > 15 && lastCell.date.month !== props.month) {
                emit('navigate', 'next-month');
            }
            break;
        case 'up':
            // 上一週導航邏輯可以進一步實現
            break;
        case 'down':
            // 下一週導航邏輯可以進一步實現
            break;
    }
};


// 公開方法
defineExpose({
    // 獲取當月所有日期
    getCalendarDays: () => calendarDays.value,

    // 獲取當前狀態
    getCellStates: () => optimizedCellStates.value,
});
</script>
