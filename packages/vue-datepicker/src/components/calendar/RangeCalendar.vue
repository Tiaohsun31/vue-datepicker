<!-- components/calendar/RangeCalendar.vue -->
<!-- 統一的範圍選擇日曆：可以顯示單月或雙月 -->
<template>
    <div class="vdp-range-calendar"
        :class="monthDisplayMode === 'single' ? 'vdp-range-calendar--single' : 'vdp-range-calendar--dual'">
        <!-- 主要月份（單月模式時為唯一月份，雙月模式時為左側月份） -->
        <div class="vdp-range-month">
            <CalendarGrid :range-start="rangeStart" :range-end="rangeEnd" :selection-mode="'range'"
                :view-date="primaryViewDate" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" :calendar="calendar" :showTimeSelector="showTimeSelector"
                :time-value="primaryTimeValue" :enable-seconds="enableSeconds" :use24-hour="use24Hour"
                @range-select="handleRangeSelect"
                @time-select="(timeStr) => handleTimeSelect(timeStr, primaryTimeTarget)" />
        </div>

        <!-- 次要月份（僅雙月模式顯示） -->
        <div v-if="monthDisplayMode === 'dual'" class="vdp-range-month">
            <CalendarGrid :range-start="rangeStart" :range-end="rangeEnd" :selection-mode="'range'"
                :view-date="secondaryViewDate" :min-date="minDate" :max-date="maxDate" :locale="locale"
                :week-starts-on="weekStartsOn" :calendar="calendar" :showTimeSelector="showTimeSelector"
                :time-value="secondaryTimeValue" :enable-seconds="enableSeconds" :use24-hour="use24Hour"
                @range-select="handleRangeSelect" @time-select="(timeStr) => handleTimeSelect(timeStr, 'end')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, watch } from 'vue';
import { CalendarDate, startOfMonth } from '@internationalized/date';
import CalendarGrid from './CalendarGrid.vue';
import { getTodaysDate, type SimpleDateValue } from '../../utils/dateUtils';
import { CalendarUtils } from '../../utils/calendarUtils';

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

// §D：原生曆法視圖狀態
const targetCalendar = computed(() => CalendarUtils.createSafeCalendar(props.calendar));

// 把「西元年月」錨成目標曆法的原生月 1 號
const gregorianToNativeMonthStart = (gYear: number, gMonth: number): CalendarDate => {
    const greg = new CalendarDate(gYear, gMonth, 1);
    const native = props.calendar === 'gregory'
        ? greg
        : CalendarUtils.safeToCalendar(greg, targetCalendar.value);
    return startOfMonth(native);
};

// 計算主要月份視圖（優先序：rangeStart > initialYear/Month > 今天）
const computePrimaryViewDate = (): CalendarDate => {
    if (props.rangeStart) {
        const native = CalendarUtils.convertToCalendarDate(props.rangeStart, props.calendar);
        if (native) return startOfMonth(native);
    }
    if (props.initialYear && props.initialMonth) {
        return gregorianToNativeMonthStart(props.initialYear, props.initialMonth);
    }
    const today = getTodaysDate();
    return gregorianToNativeMonthStart(today.year, today.month);
};

// 主要月份（左側月份或單月）
// shallowRef：避免 Vue 對含私有欄位的 CalendarDate 做深層 UnwrapRef 而剝離型別品牌
const primaryViewDate = shallowRef<CalendarDate>(computePrimaryViewDate());

// 次要月份（右側月份，僅雙月模式）= 主要月份的下一個原生月
const secondaryViewDate = computed(() => primaryViewDate.value.add({ months: 1 }));

// 對外以「原生年月」投影暴露（西元曆下與西元年月一致 → 既有測試行為不變）
// 可寫：設定時改寫 primaryViewDate（保留原 ref 可賦值的相容行為）
const primaryYear = computed({
    get: () => primaryViewDate.value.year,
    set: (y: number) => {
        primaryViewDate.value = new CalendarDate(targetCalendar.value, y, primaryViewDate.value.month, 1);
    },
});
const primaryMonth = computed({
    get: () => primaryViewDate.value.month,
    set: (m: number) => {
        primaryViewDate.value = new CalendarDate(targetCalendar.value, primaryViewDate.value.year, m, 1);
    },
});
const secondaryYear = computed(() => secondaryViewDate.value.year);
const secondaryMonth = computed(() => secondaryViewDate.value.month);

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
    // 調整顯示月份（原生曆法）
    if (newStart && !props.initialYear && !props.initialMonth) {
        const native = CalendarUtils.convertToCalendarDate(newStart, props.calendar);
        if (native) primaryViewDate.value = startOfMonth(native);
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

// 月份導航（僅影響主要月份；原生曆法月份算術）
const previousMonth = () => {
    primaryViewDate.value = primaryViewDate.value.subtract({ months: 1 });
};

const nextMonth = () => {
    primaryViewDate.value = primaryViewDate.value.add({ months: 1 });
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

    // 設置顯示月份（year/month 為目標曆法的原生年月；西元曆下即西元年月）
    setDisplayMonth: (year: number, month: number) => {
        primaryViewDate.value = new CalendarDate(targetCalendar.value, year, month, 1);
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

<style scoped>
.vdp-range-calendar {
    display: flex;
    flex-direction: column;
    gap: var(--vdp-space-4);
    margin: var(--vdp-space-1);
}

.vdp-range-calendar--single {
    max-width: 300px;
}

.vdp-range-month {
    flex: 1 1 0%;
}

@media (min-width: 768px) {
    .vdp-range-calendar--dual {
        min-width: 570px;
        flex-direction: row;
    }

    .vdp-range-calendar--dual .vdp-range-month {
        min-width: 280px;
    }
}
</style>
