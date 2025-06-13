<!-- components/calendar/DualMonthCalendar.vue -->
<template>
    <div class="dual-month-calendar flex flex-col gap-4 min-w-auto md:min-w-[570px] md:flex-row m-1">
        <!-- 左側月份 -->
        <div class="calendar-container flex-1 min-w-auto md:min-w-[275px]">
            <CalendarGrid :range-start="rangeStart" :range-end="rangeEnd" :selection-mode="'range'" :year="leftYear"
                :month="leftMonth" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" :calendar="calendar" :showTimeSelector="showTimeSelector"
                :time-value="startTimeValue" :enable-seconds="enableSeconds" :use24-hour="use24Hour"
                :default-time="defaultTime" @range-select="handleRangeSelect"
                @time-select="(timeStr) => handleTimeSelect(timeStr, 'start')" />
        </div>

        <!-- 右側月份 -->
        <div class="calendar-container flex-1 md:min-w-[275px] min-w-auto">
            <CalendarGrid :range-start="rangeStart" :range-end="rangeEnd" :selection-mode="'range'" :year="rightYear"
                :month="rightMonth" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" :calendar="calendar" :showTimeSelector="showTimeSelector"
                :time-value="endTimeValue" :enable-seconds="enableSeconds" :use24-hour="use24Hour"
                :default-time="defaultTime" @range-select="handleRangeSelect"
                @time-select="(timeStr) => handleTimeSelect(timeStr, 'end')" />
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

    showTimeSelector?: boolean;
    startTimeValue?: string | null;
    endTimeValue?: string | null;
    enableSeconds?: boolean;
    use24Hour?: boolean;
    defaultTime?: string;

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

    showTimeSelector: false,
    startTimeValue: null,
    endTimeValue: null,
    enableSeconds: true,
    use24Hour: true,
    defaultTime: '00:00:00',

    initialYear: () => getTodaysDate().year,
    initialMonth: () => getTodaysDate().month
});

const emit = defineEmits<{
    'range-select': [startDate: SimpleDateValue | null, endDate: SimpleDateValue | null];
    'time-select': [timeValue: string, source: 'start' | 'end'];
}>();

// 初始化年月 initialYear/Month > rangeStart > 今天
const getInitialYearMonth = () => {
    if (props.initialYear && props.initialMonth) {
        return { year: props.initialYear, month: props.initialMonth };
    }

    if (props.rangeStart) {
        return { year: props.rangeStart.year, month: props.rangeStart.month };
    }

    const today = getTodaysDate();
    return { year: today.year, month: today.month };
};

const { year: displayYear, month: displayMonth } = getInitialYearMonth();

// 左側月份（用戶可控制，顯示主要月份）
const leftYear = ref(displayYear);
const leftMonth = ref(displayMonth);

// 右側月份（自動計算，顯示下一個月）
const rightYear = computed(() => {
    return leftMonth.value === 12 ? leftYear.value + 1 : leftYear.value;
});

const rightMonth = computed(() => {
    return leftMonth.value === 12 ? 1 : leftMonth.value + 1;
});

// 內部狀態：追蹤範圍選擇狀態
const rangeSelectionState = ref<{
    isSelecting: boolean;
    tempStart: SimpleDateValue | null;
}>({
    isSelecting: false,
    tempStart: null
});

// 監聽外部範圍變化，調整顯示月份和選擇狀態
watch(() => [props.rangeStart, props.rangeEnd], ([newStart, newEnd]) => {
    // 調整顯示月份
    if (newStart && !props.initialYear && !props.initialMonth) {
        leftYear.value = newStart.year;
        leftMonth.value = newStart.month;
    }

    // 重置選擇狀態
    if (newStart && newEnd) {
        // 有完整範圍，重置狀態
        rangeSelectionState.value.isSelecting = false;
        rangeSelectionState.value.tempStart = null;
    } else if (newStart && !newEnd) {
        // 只有開始日期，進入選擇狀態
        rangeSelectionState.value.isSelecting = true;
        rangeSelectionState.value.tempStart = newStart;
    } else {
        // 沒有範圍，重置狀態
        rangeSelectionState.value.isSelecting = false;
        rangeSelectionState.value.tempStart = null;
    }
}, { immediate: true, deep: true });

// 處理範圍選擇邏輯
const handleRangeSelect = (startDate: SimpleDateValue | null, endDate: SimpleDateValue | null) => {
    if (!startDate) {
        // 清空選擇
        rangeSelectionState.value.isSelecting = false;
        rangeSelectionState.value.tempStart = null;
        emit('range-select', null, null);
        return;
    }

    if (!rangeSelectionState.value.isSelecting) {
        // 第一次點擊 - 設置開始日期
        rangeSelectionState.value.isSelecting = true;
        rangeSelectionState.value.tempStart = startDate;
        emit('range-select', startDate, null);
    } else {
        // 第二次點擊 - 完成範圍選擇
        const tempStart = rangeSelectionState.value.tempStart;

        if (tempStart && (
            startDate.year !== tempStart.year ||
            startDate.month !== tempStart.month ||
            startDate.day !== tempStart.day
        )) {
            // 點擊了不同的日期，完成範圍選擇
            rangeSelectionState.value.isSelecting = false;
            rangeSelectionState.value.tempStart = null;

            // 自動排序確保 start <= end
            const startNum = tempStart.year * 10000 + tempStart.month * 100 + tempStart.day;
            const endNum = startDate.year * 10000 + startDate.month * 100 + startDate.day;

            if (startNum <= endNum) {
                emit('range-select', tempStart, startDate);
            } else {
                emit('range-select', startDate, tempStart);
            }
        } else {
            // 點擊了相同的日期，重新開始選擇
            rangeSelectionState.value.tempStart = startDate;
            emit('range-select', startDate, null);
        }
    }
};

const handleTimeSelect = (timeStr: string, source: 'start' | 'end') => {
    emit('time-select', timeStr, source);
};

// 月份導航
const previousMonth = () => {
    if (leftMonth.value === 1) {
        leftMonth.value = 12;
        leftYear.value -= 1;
    } else {
        leftMonth.value -= 1;
    }
};

const nextMonth = () => {
    if (leftMonth.value === 12) {
        leftMonth.value = 1;
        leftYear.value += 1;
    } else {
        leftMonth.value += 1;
    }
};

defineExpose({
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

    // 重置範圍選擇狀態
    resetRangeSelection: () => {
        rangeSelectionState.value.isSelecting = false;
        rangeSelectionState.value.tempStart = null;
    },

    // 獲取當前選擇狀態
    getSelectionState: () => ({
        isSelecting: rangeSelectionState.value.isSelecting,
        tempStart: rangeSelectionState.value.tempStart
    }),

    // 月份導航
    previousMonth,
    nextMonth
});
</script>
