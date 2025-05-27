<!-- DualMonthCalendar.vue -->
<template>
    <div class="dual-month-calendar flex flex-col gap-4 min-w-auto md:min-w-[570px] md:flex-row m-1">
        <!-- 左側月份 -->
        <div class="month-container flex-1 min-w-auto md:min-w-[275px]">
            <CalendarGrid :range-start="actualStart" :range-end="actualEnd" :selection-mode="'range'" :year="leftYear"
                :month="leftMonth" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" @range-select="handleRangeSelect" />
        </div>

        <!-- 右側月份 -->
        <div class="month-container flex-1 md:min-w-[275px] min-w-auto">
            <CalendarGrid :range-start="actualStart" :range-end="actualEnd" :selection-mode="'range'" :year="rightYear"
                :month="rightMonth" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" @range-select="handleRangeSelect" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { CalendarDate } from '@internationalized/date';
import CalendarGrid from './CalendarGrid.vue';
import { getTodaysDate, toCalendarDate, fromCalendarDate, type SimpleDateValue } from '@/utils/dateUtils';

interface Props {
    rangeStart?: CalendarDate | null;
    rangeEnd?: CalendarDate | null;
    minDate?: CalendarDate | null;
    maxDate?: CalendarDate | null;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

    // 初始顯示的月份
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
    initialYear: () => getTodaysDate().year,
    initialMonth: () => getTodaysDate().month
});

const emit = defineEmits<{
    'range-select': [startDate: CalendarDate | null, endDate: CalendarDate | null];
}>();

// 左側月份（用戶可控制）
const leftYear = ref(props.initialYear);
const leftMonth = ref(props.initialMonth);

// 右側月份（自動計算，確保不超過左側）
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

// 簡化的範圍選擇狀態 - 內部使用 SimpleDateValue 陣列來追蹤點擊
const selectedDates = ref<SimpleDateValue[]>([]);

// 計算實際的 start 和 end（自動排序）- 轉換為 CalendarDate 供子組件使用
const actualStart = computed(() => {
    // 優先使用外部傳入的範圍
    if (selectedDates.value.length === 0) return props.rangeStart;
    if (selectedDates.value.length === 1) {
        return toCalendarDate(selectedDates.value[0]);
    }

    // 有兩個日期時，自動排序
    const [first, second] = selectedDates.value;
    const firstDate = toCalendarDate(first);
    const secondDate = toCalendarDate(second);

    if (!firstDate || !secondDate) return null;

    return firstDate.compare(secondDate) <= 0 ? firstDate : secondDate;
});

const actualEnd = computed(() => {
    if (selectedDates.value.length < 2) return props.rangeEnd;

    // 有兩個日期時，自動排序
    const [first, second] = selectedDates.value;
    const firstDate = toCalendarDate(first);
    const secondDate = toCalendarDate(second);

    if (!firstDate || !secondDate) return null;

    return firstDate.compare(secondDate) <= 0 ? secondDate : firstDate;
});

// 監聽外部傳入的範圍變化
watch(() => [props.rangeStart, props.rangeEnd], ([newStart, newEnd]) => {
    if (newStart && newEnd) {
        // 外部有完整範圍，清空內部選擇
        selectedDates.value = [];
    } else if (newStart && !newEnd) {
        // 外部只有開始日期，轉換為 SimpleDateValue
        const simpleStart = fromCalendarDate(newStart);
        selectedDates.value = [simpleStart];
    } else {
        // 外部沒有範圍，清空內部選擇
        selectedDates.value = [];
    }

    // 如果有開始日期，調整顯示月份
    if (newStart) {
        leftYear.value = newStart.year;
        leftMonth.value = newStart.month;
    }
}, { immediate: true });

// 處理範圍選擇 - 接收 CalendarDate 並轉換為 SimpleDateValue 進行內部管理
const handleRangeSelect = (startDate: CalendarDate | null, endDate: CalendarDate | null) => {
    if (!startDate) {
        // 清空選擇
        selectedDates.value = [];
        emit('range-select', null, null);
        return;
    }

    // 將 CalendarDate 轉換為 SimpleDateValue 進行內部處理
    const simpleStartDate = fromCalendarDate(startDate);

    if (selectedDates.value.length === 0) {
        // 第一次點擊 - 設置開始日期
        selectedDates.value = [simpleStartDate];
        emit('range-select', startDate, null);
    } else if (selectedDates.value.length === 1) {
        const existingSimple = selectedDates.value[0];
        const existingDate = toCalendarDate(existingSimple);

        // 檢查是否點擊了同一個日期
        if (existingDate && startDate.compare(existingDate) === 0) {
            // 點擊同一個日期，保持單日選擇狀態
            return;
        }

        // 第二次點擊不同日期 - 完成範圍選擇
        selectedDates.value = [existingSimple, simpleStartDate];

        // 自動排序並發送事件
        const sortedStart = actualStart.value;
        const sortedEnd = actualEnd.value;
        emit('range-select', sortedStart, sortedEnd);
    } else {
        // 已有完整範圍 - 檢查點擊的日期
        const [currentFirst, currentSecond] = selectedDates.value;
        const currentFirstDate = toCalendarDate(currentFirst);
        const currentSecondDate = toCalendarDate(currentSecond);

        // 如果點擊的是範圍內的日期，重新開始選擇
        if ((currentFirstDate && startDate.compare(currentFirstDate) === 0) ||
            (currentSecondDate && startDate.compare(currentSecondDate) === 0)) {
            // 如果點擊的是起始或結束日期，重新開始選擇
            selectedDates.value = [simpleStartDate];
            emit('range-select', startDate, null);
        } else {
            // 如果點擊的是其他日期，重新開始選擇
            selectedDates.value = [simpleStartDate];
            emit('range-select', startDate, null);
        }
    }
};

// 公開方法
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

    // 手動設置範圍 - 接收 CalendarDate 並轉換為內部格式
    setRange: (start: CalendarDate | null, end: CalendarDate | null) => {
        if (start && end) {
            const simpleStart = fromCalendarDate(start);
            const simpleEnd = fromCalendarDate(end);
            selectedDates.value = [simpleStart, simpleEnd];
        } else if (start) {
            const simpleStart = fromCalendarDate(start);
            selectedDates.value = [simpleStart];
        } else {
            selectedDates.value = [];
        }
    },

    // 獲取當前選擇狀態
    getSelectionState: () => ({
        selectedDates: selectedDates.value,
        actualStart: actualStart.value,
        actualEnd: actualEnd.value
    })
});
</script>
