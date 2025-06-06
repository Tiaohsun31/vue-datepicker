<!-- 修正後的 DateGridView.vue - 需要支援 calendar prop -->
<template>
    <div class="grid grid-cols-7 gap-1">
        <CalendarCell v-for="cellData in optimizedCellStates" :key="cellData.key" v-memo="cellData.memoKey"
            :date="cellData.date" :current-month="currentDisplayMonth" :selected="cellData.isSelected"
            :is-today="cellData.isToday" :disabled="cellData.isDisabled" :focusable="cellData.isFocusable"
            :is-range-start="cellData.isRangeStart" :is-range-end="cellData.isRangeEnd"
            :is-in-range="cellData.isInRange" :selection-mode="selectionMode" @select="handleSelect"
            @nav="handleNavigation" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
    CalendarDate,
    getWeeksInMonth,
    startOfWeek,
    getDayOfWeek,
    createCalendar,
    toCalendar,
    GregorianCalendar,
    BuddhistCalendar,
    JapaneseCalendar,
    TaiwanCalendar,
} from '@internationalized/date';
import CalendarCell from './CalendarCell.vue';
import { getTodaysDate } from '@/utils/dateUtils';

type SelectionMode = 'single' | 'range';

interface Props {
    year: number;          // 西元曆年份（用於導航顯示）
    month: number;         // 西元曆月份（用於導航顯示）
    selectedDate?: CalendarDate | null;

    // 範圍選擇屬性
    rangeStart?: CalendarDate | null;
    rangeEnd?: CalendarDate | null;
    selectionMode?: SelectionMode;

    minDate?: CalendarDate | null;
    maxDate?: CalendarDate | null;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

    // 日曆系統
    calendar?: string;
}

const props = withDefaults(defineProps<Props>(), {
    selectedDate: null,
    rangeStart: null,
    rangeEnd: null,
    selectionMode: 'single',
    locale: 'en-US',
    weekStartsOn: 0,
    minDate: undefined,
    maxDate: undefined,
    calendar: 'gregory'
});

const emit = defineEmits<{
    'select': [date: CalendarDate];
    'range-select': [startDate: CalendarDate | null, endDate: CalendarDate | null];
    'navigate': [direction: 'prev-month' | 'next-month' | 'prev-year' | 'next-year'];
}>();

// 創建日曆實例
const calendarInstance = computed(() => {
    try {
        return createCalendar(props.calendar as any);
    } catch (error) {
        console.warn(`無法創建日曆 ${props.calendar}，回退到西元曆`);
        return new GregorianCalendar();
    }
});

// 🔥 關鍵修正：需要將西元曆的年月轉換為目標日曆系統的年月來生成日期網格
const currentDisplayMonth = computed(() => {
    if (props.calendar === 'gregory') {
        return props.month;
    }

    try {
        // 將西元曆年月轉換為目標日曆系統的月份
        const gregorianDate = new CalendarDate(props.year, props.month, 1);
        const localDate = toCalendar(gregorianDate, calendarInstance.value);
        return localDate.month;
    } catch (error) {
        console.warn('月份轉換失敗，使用原始月份:', error);
        return props.month;
    }
});

const currentDisplayYear = computed(() => {
    if (props.calendar === 'gregory') {
        return props.year;
    }

    try {
        // 將西元曆年月轉換為目標日曆系統的年份
        const gregorianDate = new CalendarDate(props.year, props.month, 1);
        const localDate = toCalendar(gregorianDate, calendarInstance.value);
        return localDate.year;
    } catch (error) {
        console.warn('年份轉換失敗，使用原始年份:', error);
        return props.year;
    }
});

// 緩存今天的日期鍵值
const todayKey = computed(() => {
    const today = getTodaysDate();
    return `${today.year}-${today.month}-${today.day}`;
});

// 生成當月的日曆數據 - 修正版本
const calendarDays = computed(() => {
    try {
        // 🔥 關鍵：使用目標日曆系統的年月創建第一天
        const firstDayOfMonth = new CalendarDate(
            calendarInstance.value,
            currentDisplayYear.value,
            currentDisplayMonth.value,
            1
        );

        // 使用 @internationalized/date 的函數計算週數和開始日
        const weeksInMonth = getWeeksInMonth(firstDayOfMonth, props.locale);

        // 計算一週的開始日
        let startDay: CalendarDate;
        try {
            startDay = startOfWeek(firstDayOfMonth, props.locale);
        } catch (error) {
            // 如果 locale 不支援，手動計算
            console.warn(`Locale ${props.locale} not supported for startOfWeek, using manual calculation`);
            const dayOfWeek = getDayOfWeek(firstDayOfMonth, props.locale);
            startDay = firstDayOfMonth.subtract({ days: dayOfWeek });
        }

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

// 範圍檢查優化
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
        return true;
    }
};

// 檢查是否是今天 - 需要轉換為西元曆比較
const isToday = (date: CalendarDate): boolean => {
    try {
        let gregorianDate: CalendarDate;

        if (props.calendar === 'gregory') {
            gregorianDate = date;
        } else {
            gregorianDate = toCalendar(date, new GregorianCalendar());
        }

        const dateKey = `${gregorianDate.year}-${gregorianDate.month}-${gregorianDate.day}`;
        return dateKey === todayKey.value;
    } catch {
        return false;
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
    return calendarDays.value.map((date, index) => {
        // 基本狀態
        const dateKey = `${date.year}-${date.month}-${date.day}`;
        const isTodayDate = isToday(date);
        const isOutsideMonth = date.month !== currentDisplayMonth.value;
        const isDisabled = isDateDisabled(date);

        // 選擇狀態
        const isSelected = props.selectionMode === 'single' && isDateEqual(date, props.selectedDate);

        // 範圍選擇狀態
        const isRangeStart = props.selectionMode === 'range' && isDateEqual(date, props.rangeStart);
        const isRangeEnd = props.selectionMode === 'range' && isDateEqual(date, props.rangeEnd);
        const isInRange = props.selectionMode === 'range' &&
            isDateInRange(date) && !isRangeStart && !isRangeEnd && !isDisabled;

        // 焦點狀態
        const isFocusable = date.day === 1 && date.month === currentDisplayMonth.value;

        // 生成 memo 鍵值
        const memoKey = [
            dateKey,
            isSelected,
            isTodayDate,
            isDisabled,
            isRangeStart,
            isRangeEnd,
            isInRange,
            props.selectionMode,
            props.calendar
        ];

        return {
            key: `${props.calendar}-${currentDisplayYear.value}-${currentDisplayMonth.value}-${dateKey}-${index}`,
            memoKey,
            date,
            isToday: isTodayDate,
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

// 處理日期選擇
const handleSelect = (date: CalendarDate) => {
    if (props.selectionMode === 'single') {
        emit('select', date);
    } else if (props.selectionMode === 'range') {
        emit('range-select', date, null);
    }
};

// 處理鍵盤導航
const handleNavigation = (direction: 'up' | 'down' | 'left' | 'right') => {
    const cellStates = optimizedCellStates.value;
    if (cellStates.length === 0) return;

    const firstCell = cellStates[0];
    const lastCell = cellStates[cellStates.length - 1];

    switch (direction) {
        case 'left':
            if (firstCell.date.day < 15 && firstCell.date.month !== currentDisplayMonth.value) {
                emit('navigate', 'prev-month');
            }
            break;
        case 'right':
            if (lastCell.date.day > 15 && lastCell.date.month !== currentDisplayMonth.value) {
                emit('navigate', 'next-month');
            }
            break;
        case 'up':
            // 上一週導航邏輯
            break;
        case 'down':
            // 下一週導航邏輯
            break;
    }
};

// 公開方法
defineExpose({
    getCalendarDays: () => calendarDays.value,
    getCellStates: () => optimizedCellStates.value,
});
</script>
