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
import { computed, onMounted } from 'vue';
import { CalendarDate } from '@internationalized/date';
import CalendarCell from './CalendarCell.vue';
import { getTodaysDate } from '@/utils/dateUtils';
import { CalendarUtils } from '@/utils/calendarUtils';

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
    return CalendarUtils.createSafeCalendar(props.calendar);
});

// 🔥 關鍵修正：需要將西元曆的年月轉換為目標日曆系統的年月來生成日期網格
const currentDisplayMonth = computed(() => {
    if (props.calendar === 'gregory') {
        return props.month;
    }

    try {
        // 將西元曆年月轉換為目標日曆系統的月份
        const gregorianDate = new CalendarDate(props.year, props.month, 1);
        const localDate = CalendarUtils.safeToCalendar(gregorianDate, calendarInstance.value);
        console.log(`轉換月份: 西元${props.year}年${props.month}月 -> ${props.calendar}曆${localDate.year}年${localDate.month}月`);
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
        const localDate = CalendarUtils.safeToCalendar(gregorianDate, calendarInstance.value);
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
    console.log(`生成 ${props.calendar} 曆 ${props.year}年${props.month}月 的日曆`);     // 生成 roc 曆 2025年6月 的日曆

    return CalendarUtils.generateCalendarDays(
        props.year,          // 西元年
        props.month,         // 西元月
        props.calendar,
        props.locale,
        props.weekStartsOn
    );
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
        // 如果是同一個日曆系統，直接比較
        if (date1.calendar.identifier === date2.calendar.identifier) {
            return date1.year === date2.year &&
                date1.month === date2.month &&
                date1.day === date2.day;
        }

        // 不同日曆系統，轉換為西元曆比較
        const gregorianCalendar = CalendarUtils.createSafeCalendar('gregory');
        const gregorianDate1 = CalendarUtils.safeToCalendar(date1, gregorianCalendar);
        const gregorianDate2 = CalendarUtils.safeToCalendar(date2, gregorianCalendar);

        return gregorianDate1.year === gregorianDate2.year &&
            gregorianDate1.month === gregorianDate2.month &&
            gregorianDate1.day === gregorianDate2.day;
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

// 檢查是否是今天
const isToday = (date: CalendarDate): boolean => {
    try {
        // 統一轉換為西元曆進行比較
        let gregorianDate: CalendarDate;

        if (props.calendar === 'gregory') {
            gregorianDate = date;
        } else {
            const gregorianCalendar = CalendarUtils.createSafeCalendar('gregory');
            gregorianDate = CalendarUtils.safeToCalendar(date, gregorianCalendar);
        }

        const today = new Date();
        return gregorianDate.year === today.getFullYear() &&
            gregorianDate.month === today.getMonth() + 1 &&
            gregorianDate.day === today.getDate();
    } catch (error) {
        console.warn('檢查今天日期失敗:', error);
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
onMounted(() => {
    // 初始化時可以進行一些必要的設置或檢查
    console.log(props.selectedDate)
});

// 公開方法
defineExpose({
    getCalendarDays: () => calendarDays.value,
    getCellStates: () => optimizedCellStates.value,
});
</script>
