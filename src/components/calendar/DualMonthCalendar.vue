<!-- components/calendar/DualMonthCalendar.vue -->
<template>
    <div class="dual-month-calendar flex flex-col gap-4 min-w-auto md:min-w-[570px] md:flex-row m-1">
        <!-- 左側月份 -->
        <div class="month-container flex-1 min-w-auto md:min-w-[275px]">
            <CalendarGrid :range-start="rangeStart" :range-end="rangeEnd" :selection-mode="'range'" :year="leftYear"
                :month="leftMonth" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" :calendar="calendar" @range-select="handleRangeSelect" />
        </div>

        <!-- 右側月份 -->
        <div class="month-container flex-1 md:min-w-[275px] min-w-auto">
            <CalendarGrid :range-start="rangeStart" :range-end="rangeEnd" :selection-mode="'range'" :year="rightYear"
                :month="rightMonth" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" :calendar="calendar" @range-select="handleRangeSelect" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import CalendarGrid from './CalendarGrid.vue';
import { getTodaysDate, type SimpleDateValue } from '@/utils/dateUtils';

interface Props {
    rangeStart?: SimpleDateValue | null;
    rangeEnd?: SimpleDateValue | null;
    minDate?: SimpleDateValue | null;
    maxDate?: SimpleDateValue | null;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    calendar?: string;

    // 初始顯示的月份（西元曆）
    initialYear?: number;
    initialMonth?: number;
}

const props = withDefaults(defineProps<Props>(), {
    rangeStart: null,
    rangeEnd: null,
    minDate: null,
    maxDate: null,
    locale: 'en-US',
    weekStartsOn: 0,
    calendar: 'gregory',
    initialYear: () => getTodaysDate().year,
    initialMonth: () => getTodaysDate().month
});

const emit = defineEmits<{
    'range-select': [startDate: SimpleDateValue | null, endDate: SimpleDateValue | null];
}>();

// 初始化年月 initialYear/Month > rangeStart > 今天
const getInitialYearMonth = () => {
    // 1. 優先使用 props 提供的初始年月
    if (props.initialYear && props.initialMonth) {
        return { year: props.initialYear, month: props.initialMonth };
    }

    // 2. 從 rangeStart 中提取
    if (props.rangeStart) {
        return { year: props.rangeStart.year, month: props.rangeStart.month };
    }

    // 3. 使用今天的日期
    const today = getTodaysDate();
    return { year: today.year, month: today.month };
};

const { year: displayYear, month: displayMonth } = getInitialYearMonth();

// 左側月份（用戶可控制，顯示主要月份）
const leftYear = ref(displayYear);
const leftMonth = ref(displayMonth);

// 右側月份（自動計算，顯示下一個月）
const rightYear = computed(() => {
    if (leftMonth.value === 12) {
        return leftYear.value + 1;
    }
    return leftYear.value;
});

const rightMonth = computed(() => {
    if (leftMonth.value === 12) {
        return 1;
    }
    return leftMonth.value + 1;
});

// 簡化的範圍選擇狀態 - 內部使用 SimpleDateValue 追蹤點擊
const selectedDates = ref<SimpleDateValue[]>([]);

// 計算實際的 start 和 end（自動排序）
const actualStart = computed(() => {
    // 優先使用外部傳入的範圍
    if (selectedDates.value.length === 0) return props.rangeStart;
    if (selectedDates.value.length === 1) {
        return selectedDates.value[0];
    }

    // 有兩個日期時，自動排序
    const [first, second] = selectedDates.value;
    const firstNum = first.year * 10000 + first.month * 100 + first.day;
    const secondNum = second.year * 10000 + second.month * 100 + second.day;

    return firstNum <= secondNum ? first : second;
});

const actualEnd = computed(() => {
    if (selectedDates.value.length < 2) return props.rangeEnd;

    // 有兩個日期時，自動排序
    const [first, second] = selectedDates.value;
    const firstNum = first.year * 10000 + first.month * 100 + first.day;
    const secondNum = second.year * 10000 + second.month * 100 + second.day;

    return firstNum <= secondNum ? second : first;
});

// 監聽外部傳入的範圍變化
watch(() => [props.rangeStart, props.rangeEnd], ([newStart, newEnd]) => {
    if (newStart && newEnd) {
        // 外部有完整範圍，清空內部選擇
        selectedDates.value = [];
    } else if (newStart && !newEnd) {
        // 外部只有開始日期
        selectedDates.value = [newStart];
    } else {
        // 外部沒有範圍，清空內部選擇
        selectedDates.value = [];
    }

    // 如果有開始日期，調整顯示月份
    if (newStart && !props.initialYear && !props.initialMonth) {
        leftYear.value = newStart.year;
        leftMonth.value = newStart.month;
    }
}, { immediate: true });

// 處理範圍選擇 - 接收 SimpleDateValue 進行內部管理
const handleRangeSelect = (startDate: SimpleDateValue | null, endDate: SimpleDateValue | null) => {
    if (!startDate) {
        // 清空選擇
        selectedDates.value = [];
        emit('range-select', null, null);
        return;
    }

    if (selectedDates.value.length === 0) {
        // 第一次點擊 - 設置開始日期
        selectedDates.value = [startDate];
        emit('range-select', startDate, null);
    } else if (selectedDates.value.length === 1) {
        const existing = selectedDates.value[0];

        // 檢查是否點擊了同一個日期
        if (startDate.year === existing.year &&
            startDate.month === existing.month &&
            startDate.day === existing.day) {
            // 點擊同一個日期，保持單日選擇狀態
            return;
        }

        // 第二次點擊不同日期 - 完成範圍選擇
        selectedDates.value = [existing, startDate];

        // 自動排序並發送事件
        const sortedStart = actualStart.value;
        const sortedEnd = actualEnd.value;
        emit('range-select', sortedStart, sortedEnd);
    } else {
        // 已有完整範圍 - 檢查點擊的日期
        const [currentFirst, currentSecond] = selectedDates.value;

        // 如果點擊的是範圍內的日期，重新開始選擇
        if ((startDate.year === currentFirst.year &&
            startDate.month === currentFirst.month &&
            startDate.day === currentFirst.day) ||
            (startDate.year === currentSecond.year &&
                startDate.month === currentSecond.month &&
                startDate.day === currentSecond.day)) {
            // 如果點擊的是起始或結束日期，重新開始選擇
            selectedDates.value = [startDate];
            emit('range-select', startDate, null);
        } else {
            // 如果點擊的是其他日期，重新開始選擇
            selectedDates.value = [startDate];
            emit('range-select', startDate, null);
        }
    }
};

// 導航到上個月
const previousMonth = () => {
    if (leftMonth.value === 1) {
        leftMonth.value = 12;
        leftYear.value -= 1;
    } else {
        leftMonth.value -= 1;
    }
};

// 導航到下個月
const nextMonth = () => {
    if (leftMonth.value === 12) {
        leftMonth.value = 1;
        leftYear.value += 1;
    } else {
        leftMonth.value += 1;
    }
};

defineExpose({
    // 重置範圍選擇
    resetRangeSelection: () => {
        selectedDates.value = [];
    },

    // 獲取當前顯示的月份
    getCurrentDisplay: () => ({
        left: { year: leftYear.value, month: leftMonth.value },
        right: { year: rightYear.value, month: rightMonth.value }
    }),

    // 設置顯示月份
    setDisplayMonth: (year: number, month: number) => {
        leftYear.value = year;
        leftMonth.value = month;
    },

    // 手動設置範圍 - 接收 SimpleDateValue
    setRange: (start: SimpleDateValue | null, end: SimpleDateValue | null) => {
        if (start && end) {
            selectedDates.value = [start, end];
        } else if (start) {
            selectedDates.value = [start];
        } else {
            selectedDates.value = [];
        }
    },

    // 獲取當前選擇狀態
    getSelectionState: () => ({
        selectedDates: selectedDates.value,
        actualStart: actualStart.value,
        actualEnd: actualEnd.value
    }),

    // 月份導航
    previousMonth,
    nextMonth
});
</script>
