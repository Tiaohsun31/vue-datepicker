<!-- SimplifiedDualMonthCalendar.vue - 簡化版雙月日曆 -->
<template>
    <div class="dual-month-calendar flex gap-4">
        <!-- 左側月份 -->
        <div class="month-container">
            <CalendarGrid :range-start="(actualStart as CalendarDate)" :range-end="(actualEnd as CalendarDate)"
                :selection-mode="'range'" :year="leftYear" :month="leftMonth" :min-date="minDate" :max-date="maxDate"
                :locale="locale" :week-starts-on="weekStartsOn" @range-select="handleRangeSelect" />
        </div>

        <!-- 右側月份 -->
        <div class="month-container">
            <CalendarGrid :range-start="(actualStart as CalendarDate)" :range-end="(actualEnd as CalendarDate)"
                :selection-mode="'range'" :year="rightYear" :month="rightMonth" :min-date="minDate" :max-date="maxDate"
                :locale="locale" :week-starts-on="weekStartsOn" @range-select="handleRangeSelect" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { CalendarDate } from '@internationalized/date';
import CalendarGrid from './CalendarGrid.vue';
import { getTodaysDate } from '@/utils/dateUtils';

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

// 簡化的範圍選擇狀態 - 使用陣列來追蹤點擊
const selectedDates = ref<CalendarDate[]>([]);

// 計算實際的 start 和 end（自動排序）
const actualStart = computed(() => {
    if (selectedDates.value.length === 0) return props.rangeStart;
    if (selectedDates.value.length === 1) return selectedDates.value[0];

    // 有兩個日期時，自動排序
    const [first, second] = selectedDates.value;
    return first.compare(second) <= 0 ? first : second;
});

const actualEnd = computed(() => {
    if (selectedDates.value.length < 2) return props.rangeEnd;

    // 有兩個日期時，自動排序
    const [first, second] = selectedDates.value;
    return first.compare(second) <= 0 ? second : first;
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
    if (newStart) {
        leftYear.value = newStart.year;
        leftMonth.value = newStart.month;
    }
}, { immediate: true });

// 處理範圍選擇 - 簡化邏輯
const handleRangeSelect = (startDate: CalendarDate | null, endDate: CalendarDate | null) => {
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
        const existingDate = selectedDates.value[0];

        // 檢查是否點擊了同一個日期
        if (startDate.compare(existingDate) === 0) {
            // 點擊同一個日期，保持單日選擇狀態
            return;
        }

        // 第二次點擊不同日期 - 完成範圍選擇
        selectedDates.value = [existingDate, startDate];

        // 自動排序並發送事件
        const sortedStart = actualStart.value;
        const sortedEnd = actualEnd.value;
        emit('range-select', sortedStart as CalendarDate, sortedEnd as CalendarDate);
    } else {
        // 已有完整範圍 - 檢查點擊的日期
        const [currentStart, currentEnd] = selectedDates.value;

        // 如果點擊的是範圍內的日期，重新開始選擇
        if (startDate.compare(currentStart) === 0 || startDate.compare(currentEnd) === 0) {
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

    // 手動設置範圍
    setRange: (start: CalendarDate | null, end: CalendarDate | null) => {
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
    })
});
</script>

<style scoped>
.dual-month-calendar {
    min-width: 640px;
}

.month-container {
    flex: 1;
    min-width: 300px;
}

/* 響應式設計 */
@media (max-width: 768px) {
    .dual-month-calendar {
        flex-direction: column;
        gap: 1rem;
        min-width: auto;
    }

    .month-container {
        min-width: auto;
    }
}
</style>
