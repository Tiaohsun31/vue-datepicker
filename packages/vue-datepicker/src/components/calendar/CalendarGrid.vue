<template>
    <div class="vdp-calendar-grid">
        <!-- 月份導航和選擇器 -->
        <CalendarHeader :view-date="currentViewDate" @update:view-date="currentViewDate = $event" :locale="locale"
            :min-year="minYear" :max-year="maxYear" :calendar="calendar">
            <template v-for="(_, slotName) in $slots" #[slotName]="slotProps" :key="slotName">
                <slot :name="slotName" v-bind="slotProps" />
            </template>
            <!-- <template #year-display="slotProps">
                <slot name="year-display" v-bind="slotProps" />
            </template> -->
        </CalendarHeader>

        <!-- 星期列 -->
        <WeekdayHeader :locale="locale" :week-starts-on="weekStartsOn" :calendar="calendar" />

        <!-- 日期網格 -->
        <DateGridView :view-date="currentViewDate" :selected-date="selectedCalendarDate"
            :range-start="rangeStartCalendarDate" :range-end="rangeEndCalendarDate" :selection-mode="selectionMode"
            :min-date="minCalendarDate" :max-date="maxCalendarDate" :locale="locale" :week-starts-on="weekStartsOn"
            :calendar="calendar" @select="handleSelect" @range-select="handleRangeSelect" />

        <!-- 時間選擇器 -->
        <TimeSelector :locale="locale" :show="showTimeSelector" :time-value="timeValue" :enable-seconds="enableSeconds"
            :use24-hour="use24Hour" :default-time="defaultTime" :selectionMode="selectionMode"
            @time-change="emitTimeSelect" @today-click="setTodaysDate" />
    </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, watch } from 'vue';
import { CalendarDate, startOfMonth } from '@internationalized/date';
import CalendarHeader from './CalendarHeader.vue';
import WeekdayHeader from './WeekdayHeader.vue';
import DateGridView from './DateGridView.vue';
import TimeSelector from '../selector/TimeSelector.vue';
import { getTodaysDate, type SimpleDateValue } from '../../utils/dateUtils';
import { CalendarUtils } from '../../utils/calendarUtils';

type SelectionMode = 'single' | 'range';

interface Props {
    // 單一日期模式的屬性
    value?: SimpleDateValue | null;

    // 範圍選擇模式的屬性
    rangeStart?: SimpleDateValue | null;
    rangeEnd?: SimpleDateValue | null;
    selectionMode?: SelectionMode;

    // 外部控制的年月（西元曆，用於日曆導航顯示）
    year?: number;    // 西元年
    month?: number;   // 西元月 (1-12)

    // §D：外部直接指定的原生視圖日期（目標曆法 CalendarDate）。
    // 由 RangeCalendar 提供以驅動雙月顯示；優先序高於 year/month。
    viewDate?: CalendarDate | null;

    // 通用屬性
    minDate?: SimpleDateValue | null;
    maxDate?: SimpleDateValue | null;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

    // 時間選擇器相關
    showTimeSelector?: boolean;
    timeValue?: string | null;
    enableSeconds?: boolean;
    use24Hour?: boolean;
    defaultTime?: string;

    // 日曆系統標識符
    calendar?: string;
}

const props = withDefaults(defineProps<Props>(), {
    value: null,
    rangeStart: null,
    rangeEnd: null,
    selectionMode: 'single',
    year: undefined,
    month: undefined,
    viewDate: undefined,
    locale: 'en-US',
    weekStartsOn: 0,
    minDate: undefined,
    maxDate: undefined,
    showTimeSelector: false,
    timeValue: null,
    enableSeconds: true,
    use24Hour: false,
    defaultTime: '00:00:00',
    calendar: 'gregory',
});

const emit = defineEmits<{
    // 單一日期選擇事件（發送西元曆 SimpleDateValue）
    select: [date: SimpleDateValue, closeCalendar: boolean];
    'time-select': [time: string];

    // 範圍選擇事件（發送西元曆 SimpleDateValue）
    'range-select': [startDate: SimpleDateValue | null, endDate: SimpleDateValue | null];
}>();

// §D：原生曆法視圖狀態（目標曆法 CalendarDate，恆錨在原生月 1 號）
const targetCalendar = computed(() => CalendarUtils.createSafeCalendar(props.calendar));

// 把「西元年月」錨成目標曆法的原生月 1 號
const gregorianToNativeMonthStart = (gYear: number, gMonth: number): CalendarDate => {
    const greg = new CalendarDate(gYear, gMonth, 1);
    const native = props.calendar === 'gregory'
        ? greg
        : CalendarUtils.safeToCalendar(greg, targetCalendar.value);
    return startOfMonth(native);
};

// 計算視圖日期（優先序：view-date prop > 西元 year/month > value/rangeStart > 今天）
const computeViewDate = (): CalendarDate => {
    if (props.viewDate) return startOfMonth(props.viewDate);

    if (props.year !== undefined && props.month !== undefined) {
        return gregorianToNativeMonthStart(props.year, props.month);
    }

    const sourceDate = props.selectionMode === 'range' ? props.rangeStart : props.value;
    if (sourceDate) {
        const native = CalendarUtils.convertToCalendarDate(sourceDate, props.calendar);
        if (native) return startOfMonth(native);
    }

    const today = getTodaysDate();
    return gregorianToNativeMonthStart(today.year, today.month);
};

// shallowRef：避免 Vue 對含私有欄位的 CalendarDate 做深層 UnwrapRef 而剝離型別品牌
const currentViewDate = shallowRef<CalendarDate>(computeViewDate());

// 對外仍以「原生年月」投影暴露（西元曆下與西元年月一致 → 既有測試行為不變）
const currentYear = computed(() => currentViewDate.value.year);
const currentMonth = computed(() => currentViewDate.value.month);

// 內部時間值
const timeValue = ref<string | null>(props.timeValue);

// 轉換後的選中日期（供子組件使用）
const selectedCalendarDate = computed(() => {
    return CalendarUtils.convertToCalendarDate(props.value, props.calendar);
});

// 轉換後的範圍開始日期
const rangeStartCalendarDate = computed(() => {
    return CalendarUtils.convertToCalendarDate(props.rangeStart, props.calendar);
});

// 轉換後的範圍結束日期
const rangeEndCalendarDate = computed(() => {
    return CalendarUtils.convertToCalendarDate(props.rangeEnd, props.calendar);
});

//轉換後的最小日期
const minCalendarDate = computed(() => {
    return CalendarUtils.convertToCalendarDate(props.minDate || null, props.calendar);
});


// 轉換後的最大日期
const maxCalendarDate = computed(() => {
    return CalendarUtils.convertToCalendarDate(props.maxDate || null, props.calendar);
});

// 年份範圍（用於 CalendarHeader）
const minYear = computed(() => props.minDate?.year || 1900);
const maxYear = computed(() => props.maxDate?.year || 2100);

// 外部來源（view-date / 西元年月 / 值 / 曆法）變動時重新定位視圖。
// 內部導航（previousMonth/nextMonth）改的是 currentViewDate，不在依賴中 → 不會被覆蓋。
watch(
    [
        () => props.viewDate,
        () => props.year,
        () => props.month,
        () => props.value,
        () => props.rangeStart,
        () => props.calendar,
    ],
    () => {
        currentViewDate.value = computeViewDate();
    }
);

// 監聽時間值變化
watch(() => props.timeValue, (newValue) => {
    timeValue.value = newValue;
}, { immediate: true });

// 處理單一日期選擇
const handleSelect = (date: CalendarDate) => {
    if (props.selectionMode === 'single') {
        const simpleDate = CalendarUtils.convertFromCalendarDate(date, props.calendar);
        if (simpleDate) {
            emit('select', simpleDate, true);

            // 如果有時間選擇器，也發送時間選擇事件
            if (props.showTimeSelector && timeValue.value) {
                emit('time-select', timeValue.value);
            }
        }
    }
};

// 處理範圍日期選擇
const handleRangeSelect = (startDate: CalendarDate | null, endDate: CalendarDate | null) => {
    if (props.selectionMode === 'range') {
        const simpleStart = CalendarUtils.convertFromCalendarDate(startDate, props.calendar);
        const simpleEnd = CalendarUtils.convertFromCalendarDate(endDate, props.calendar);
        emit('range-select', simpleStart, simpleEnd);
    }
};

// 處理時間選擇事件
const emitTimeSelect = (time: string) => {
    timeValue.value = time;
    emit('time-select', time);
};

// 設置今天的日期（僅單一模式）
const setTodaysDate = () => {
    if (props.selectionMode === 'single') {
        const today = getTodaysDate();
        currentViewDate.value = gregorianToNativeMonthStart(today.year, today.month);
        emit('select', today, false);
    }
};


defineExpose({
    // 獲取當前選中的日期（單一模式）
    getSelectedDate: () => props.value,

    // 獲取當前範圍（範圍模式）
    getSelectedRange: () => ({ start: props.rangeStart, end: props.rangeEnd }),

    // 設置顯示的月份（year/month 為目標曆法的原生年月；西元曆下即西元年月）
    setDisplayMonth: (year: number, month: number) => {
        currentViewDate.value = new CalendarDate(targetCalendar.value, year, month, 1);
    },

    // 導航到上個月（原生曆法月份算術，自動處理希伯來 13 月等）
    previousMonth: () => {
        currentViewDate.value = currentViewDate.value.subtract({ months: 1 });
    },

    // 導航到下個月
    nextMonth: () => {
        currentViewDate.value = currentViewDate.value.add({ months: 1 });
    }
});
</script>
