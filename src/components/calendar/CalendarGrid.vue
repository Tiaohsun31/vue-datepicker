<template>
    <div class="vdt-date-picker calendar-grid w-full max-w-xs rounded-lg shadow p-2">
        <!-- 月份導航和選擇器 -->
        <CalendarHeader v-model:month="currentMonth" v-model:year="currentYear" :locale="locale" :min-year="minYear"
            :max-year="maxYear" :calendar="calendar">
            <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps" />
            </template>
            <!-- <template #year-display="slotProps">
                <slot name="year-display" v-bind="slotProps" />
            </template> -->
        </CalendarHeader>

        <!-- 星期列 -->
        <WeekdayHeader :locale="locale" :week-starts-on="weekStartsOn" :calendar="calendar" />

        <!-- 日期網格 -->
        <DateGridView :year="currentYear" :month="currentMonth" :selected-date="selectedCalendarDate"
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
import { ref, computed, watch } from 'vue';
import { CalendarDate } from '@internationalized/date';
import CalendarHeader from './CalendarHeader.vue';
import WeekdayHeader from './WeekdayHeader.vue';
import DateGridView from './DateGridView.vue';
import TimeSelector from '../selector/TimeSelector.vue';
import { getTodaysDate, type SimpleDateValue } from '@/utils/dateUtils';
import { CalendarUtils } from '@/utils/calendarUtils';

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

// 獲取當前日期的西元年月
const getInitialYearMonth = () => {
    // 1. 優先使用 props 提供的年月
    if (props.year !== undefined && props.month !== undefined) {
        return { year: props.year, month: props.month };
    }

    // 2. 從 value 中提取
    if (props.value) {
        return { year: props.value.year, month: props.value.month };
    }

    // 3. 從 rangeStart 中提取
    if (props.rangeStart) {
        return { year: props.rangeStart.year, month: props.rangeStart.month };
    }

    // 4. 使用今天的日期
    const today = getTodaysDate();
    return { year: today.year, month: today.month };
};

const { year: initialYear, month: initialMonth } = getInitialYearMonth();
const currentYear = ref<number>(initialYear);
const currentMonth = ref<number>(initialMonth);

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

// 計算當前應該顯示的年月
const displayYearMonth = computed(() => {
    // 1. 優先使用外部指定
    if (props.year !== undefined && props.month !== undefined) {
        return { year: props.year, month: props.month };
    }

    // 2. 從值推導
    const sourceDate = props.selectionMode === 'range' ? props.rangeStart : props.value;
    if (sourceDate) {
        return { year: sourceDate.year, month: sourceDate.month };
    }

    // 3. 保持當前值
    return { year: currentYear.value, month: currentMonth.value };
});

watch(displayYearMonth, ({ year, month }) => {
    currentYear.value = year;
    currentMonth.value = month;
}, { immediate: true });

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
        currentYear.value = today.year;
        currentMonth.value = today.month;
        emit('select', today, false);
    }
};


defineExpose({
    // 獲取當前選中的日期（單一模式）
    getSelectedDate: () => props.value,

    // 獲取當前範圍（範圍模式）
    getSelectedRange: () => ({ start: props.rangeStart, end: props.rangeEnd }),

    // 設置顯示的月份
    setDisplayMonth: (year: number, month: number) => {
        currentYear.value = year;
        currentMonth.value = month;
    },

    // 導航到上個月
    previousMonth: () => {
        if (currentMonth.value === 1) {
            currentMonth.value = 12;
            currentYear.value -= 1;
        } else {
            currentMonth.value -= 1;
        }
    },

    // 導航到下個月
    nextMonth: () => {
        if (currentMonth.value === 12) {
            currentMonth.value = 1;
            currentYear.value += 1;
        } else {
            currentMonth.value += 1;
        }
    }
});
</script>
