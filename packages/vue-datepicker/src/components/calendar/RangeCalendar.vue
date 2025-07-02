<!-- components/calendar/RangeCalendar.vue -->
<!-- 統一的範圍選擇日曆：可以顯示單月或雙月 -->
<template>
    <div class="range-calendar" :class="[
        monthDisplayMode === 'single' ? 'single-month' : 'dual-month',
        'flex flex-col gap-4',
        monthDisplayMode === 'dual' ? 'min-w-auto md:min-w-[570px] md:flex-row' : 'min-w-auto max-w-[300px]',
        'm-1'
    ]">
        <!-- 主要月份（單月模式時為唯一月份，雙月模式時為左側月份） -->
        <div class="calendar-container flex-1" :class="[
            monthDisplayMode === 'dual' ? 'min-w-auto md:min-w-[280px]' : 'min-w-auto'
        ]">
            <CalendarGrid :range-start="rangeStart" :range-end="rangeEnd" :selection-mode="'range'" :year="primaryYear"
                :month="primaryMonth" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" :calendar="calendar" :showTimeSelector="showTimeSelector"
                :time-value="primaryTimeValue" :enable-seconds="enableSeconds" :use24-hour="use24Hour"
                @range-select="handleRangeSelect"
                @time-select="(timeStr) => handleTimeSelect(timeStr, primaryTimeTarget)" />
        </div>

        <!-- 次要月份（僅雙月模式顯示） -->
        <div v-if="monthDisplayMode === 'dual'" class="calendar-container flex-1 md:min-w-[280px] min-w-auto">
            <CalendarGrid :range-start="rangeStart" :range-end="rangeEnd" :selection-mode="'range'"
                :year="secondaryYear" :month="secondaryMonth" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" :calendar="calendar" :showTimeSelector="showTimeSelector"
                :time-value="secondaryTimeValue" :enable-seconds="enableSeconds" :use24-hour="use24Hour"
                @range-select="handleRangeSelect" @time-select="(timeStr) => handleTimeSelect(timeStr, 'end')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import CalendarGrid from './CalendarGrid.vue';
import { getTodaysDate, type SimpleDateValue } from '@/utils/dateUtils';

type MonthDisplayMode = 'single' | 'dual';

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

    // 核心新功能：決定顯示模式
    monthDisplayMode?: MonthDisplayMode;

    // 初始顯示的月份（西元曆）
    initialYear?: number;
    initialMonth?: number;
}

const props = withDefaults(defineProps<Props>(), {
    rangeStart: null,
    rangeEnd: null,
    minDate: null,
    maxDate: null,
    locale: 'zh-TW',
    weekStartsOn: 0,
    calendar: 'gregory',

    showTimeSelector: false,
    startTimeValue: null,
    endTimeValue: null,
    enableSeconds: true,
    use24Hour: true,

    monthDisplayMode: 'dual', // 預設為雙月模式，保持向下相容

    initialYear: () => getTodaysDate().year,
    initialMonth: () => getTodaysDate().month
});

const emit = defineEmits<{
    'range-select': [startDate: SimpleDateValue | null, endDate: SimpleDateValue | null];
    'time-select': [timeValue: string, source: 'start' | 'end'];
}>();

// 內部狀態：追蹤範圍選擇狀態
const rangeSelectionState = ref<{
    isSelecting: boolean;
    tempStart: SimpleDateValue | null;
    activeTimeTarget: 'start' | 'end';
}>({
    isSelecting: false,
    tempStart: null,
    activeTimeTarget: 'start'
});

// 初始化年月
const getInitialYearMonth = () => {
    if (props.rangeStart) {
        return { year: props.rangeStart.year, month: props.rangeStart.month };
    }

    if (props.initialYear && props.initialMonth) {
        return { year: props.initialYear, month: props.initialMonth };
    }

    const today = getTodaysDate();
    return { year: today.year, month: today.month };
};

const { year: displayYear, month: displayMonth } = getInitialYearMonth();

// 主要月份（左側月份或單月）
const primaryYear = ref(displayYear);
const primaryMonth = ref(displayMonth);

// 次要月份（右側月份，僅雙月模式）
const secondaryYear = computed(() => {
    return primaryMonth.value === 12 ? primaryYear.value + 1 : primaryYear.value;
});

const secondaryMonth = computed(() => {
    return primaryMonth.value === 12 ? 1 : primaryMonth.value + 1;
});

// 根據選擇狀態和模式決定時間值和目標
const primaryTimeValue = computed(() => {
    if (props.monthDisplayMode === 'single') {
        // 單月模式：根據當前選擇狀態決定
        return rangeSelectionState.value.activeTimeTarget === 'start'
            ? props.startTimeValue
            : props.endTimeValue;
    } else {
        // 雙月模式：主要月份總是顯示開始時間
        return props.startTimeValue;
    }
});

const secondaryTimeValue = computed(() => {
    // 僅雙月模式使用
    return props.endTimeValue;
});

const primaryTimeTarget = computed(() => {
    if (props.monthDisplayMode === 'single') {
        return rangeSelectionState.value.activeTimeTarget;
    } else {
        return 'start' as const;
    }
});

// 監聽外部範圍變化，調整顯示月份和選擇狀態
watch(() => [props.rangeStart, props.rangeEnd], ([newStart, newEnd]) => {
    // 調整顯示月份
    if (newStart && !props.initialYear && !props.initialMonth) {
        primaryYear.value = newStart.year;
        primaryMonth.value = newStart.month;
    }

    // 更新選擇狀態（僅單月模式需要複雜的狀態管理）
    if (props.monthDisplayMode === 'single') {
        if (newStart && newEnd) {
            // 有完整範圍，重置狀態
            rangeSelectionState.value.isSelecting = false;
            rangeSelectionState.value.tempStart = null;
            rangeSelectionState.value.activeTimeTarget = 'start';
        } else if (newStart && !newEnd) {
            // 只有開始日期，進入選擇狀態
            rangeSelectionState.value.isSelecting = true;
            rangeSelectionState.value.tempStart = newStart;
            rangeSelectionState.value.activeTimeTarget = 'end';
        } else {
            // 沒有範圍，重置狀態
            rangeSelectionState.value.isSelecting = false;
            rangeSelectionState.value.tempStart = null;
            rangeSelectionState.value.activeTimeTarget = 'start';
        }
    } else {
        // 雙月模式：簡單的狀態管理
        if (newStart && newEnd) {
            rangeSelectionState.value.isSelecting = false;
            rangeSelectionState.value.tempStart = null;
        } else if (newStart && !newEnd) {
            rangeSelectionState.value.isSelecting = true;
            rangeSelectionState.value.tempStart = newStart;
        } else {
            rangeSelectionState.value.isSelecting = false;
            rangeSelectionState.value.tempStart = null;
        }
    }
}, { immediate: true, deep: true });

// 處理範圍選擇邏輯
const handleRangeSelect = (startDate: SimpleDateValue | null, endDate: SimpleDateValue | null) => {
    if (!startDate) {
        // 清空選擇
        rangeSelectionState.value.isSelecting = false;
        rangeSelectionState.value.tempStart = null;
        if (props.monthDisplayMode === 'single') {
            rangeSelectionState.value.activeTimeTarget = 'start';
        }
        emit('range-select', null, null);
        return;
    }

    if (!rangeSelectionState.value.isSelecting) {
        // 第一次點擊 - 設置開始日期
        rangeSelectionState.value.isSelecting = true;
        rangeSelectionState.value.tempStart = startDate;
        if (props.monthDisplayMode === 'single') {
            rangeSelectionState.value.activeTimeTarget = 'start';
        }
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

            if (props.monthDisplayMode === 'single') {
                rangeSelectionState.value.activeTimeTarget = 'end';
            }
        } else {
            // 點擊了相同的日期，重新開始選擇
            rangeSelectionState.value.tempStart = startDate;
            if (props.monthDisplayMode === 'single') {
                rangeSelectionState.value.activeTimeTarget = 'start';
            }
            emit('range-select', startDate, null);
        }
    }
};

const handleTimeSelect = (timeStr: string, source: 'start' | 'end') => {
    emit('time-select', timeStr, source);
};

// 月份導航（僅影響主要月份）
const previousMonth = () => {
    if (primaryMonth.value === 1) {
        primaryMonth.value = 12;
        primaryYear.value -= 1;
    } else {
        primaryMonth.value -= 1;
    }
};

const nextMonth = () => {
    if (primaryMonth.value === 12) {
        primaryMonth.value = 1;
        primaryYear.value += 1;
    } else {
        primaryMonth.value += 1;
    }
};

defineExpose({
    // 獲取當前顯示的月份
    getCurrentDisplay: () => {
        if (props.monthDisplayMode === 'single') {
            return {
                year: primaryYear.value,
                month: primaryMonth.value
            };
        } else {
            return {
                left: { year: primaryYear.value, month: primaryMonth.value },
                right: { year: secondaryYear.value, month: secondaryMonth.value }
            };
        }
    },

    // 設置顯示月份
    setDisplayMonth: (year: number, month: number) => {
        primaryYear.value = year;
        primaryMonth.value = month;
    },

    // 重置範圍選擇狀態
    resetRangeSelection: () => {
        rangeSelectionState.value.isSelecting = false;
        rangeSelectionState.value.tempStart = null;
        if (props.monthDisplayMode === 'single') {
            rangeSelectionState.value.activeTimeTarget = 'start';
        }
    },

    // 獲取當前選擇狀態
    getSelectionState: () => ({
        isSelecting: rangeSelectionState.value.isSelecting,
        tempStart: rangeSelectionState.value.tempStart,
        activeTimeTarget: rangeSelectionState.value.activeTimeTarget
    }),

    // 月份導航
    previousMonth,
    nextMonth,

    handleRangeSelect,
});
</script>
