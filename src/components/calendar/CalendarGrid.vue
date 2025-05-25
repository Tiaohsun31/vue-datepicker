<!-- CalendarGrid.vue - 混合使用版本 -->
<template>
    <div class="vdt-date-picker calendar-grid w-full max-w-xs rounded-lg shadow p-2">
        <!-- 月份導航和選擇器 -->
        <CalendarHeader v-model:month="currentMonth" v-model:year="currentYear" :locale="locale" :min-year="minYear"
            :max-year="maxYear" />

        <!-- 星期列 -->
        <WeekdayHeader :locale="locale" :week-starts-on="weekStartsOn" />

        <!-- 日期網格 -->
        <SimplifiedDateGridView :year="currentYear" :month="currentMonth" :selected-date="selectedCalendarDate"
            :range-start="selectionMode === 'range' ? rangeStart : null"
            :range-end="selectionMode === 'range' ? rangeEnd : null" :selection-mode="selectionMode" :min-date="minDate"
            :max-date="maxDate" :locale="locale" :week-starts-on="weekStartsOn" @select="handleSelect"
            @range-select="handleRangeSelect" />

        <!-- 時間選擇區域（單一日期模式） -->
        <template v-if="showTimeSelector && selectionMode === 'single'">
            <hr class="my-2 border-vdt-outline" />
            <div class="flex flex-row items-center justify-between">
                <label class="text-sm font-medium text-vdt-content uppercase">Time:</label>
                <div class="flex flex-row items-center gap-1">
                    <button type="button" @click="setNowTime"
                        class="px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover cursor-pointer">
                        Now
                    </button>
                    <button type="button" @click="setTodaysDate"
                        class="px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover cursor-pointer">
                        Today
                    </button>
                </div>
            </div>
            <div class="time-selector-container pt-1">
                <!-- 簡化版時間選擇器 -->
                <div class="flex flex-row items-center gap-1">
                    <!-- 小時選擇器 -->
                    <div class="flex-1">
                        <select v-model="selectedHour"
                            class="w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500">
                            <option v-for="hour in hourOptions" :key="hour" :value="hour">
                                {{ formatHour(hour) }}
                            </option>
                        </select>
                    </div>

                    <!-- 分鐘選擇器 -->
                    <div class="flex-1">
                        <select v-model="selectedMinute"
                            class="w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500">
                            <option v-for="minute in minuteOptions" :key="minute" :value="minute">
                                {{ formatNumber(minute) }}
                            </option>
                        </select>
                    </div>

                    <!-- 秒鐘選擇器 -->
                    <div class="flex-1" v-if="enableSeconds">
                        <select v-model="selectedSecond"
                            class="w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500">
                            <option v-for="second in secondOptions" :key="second" :value="second">
                                {{ formatNumber(second) }}
                            </option>
                        </select>
                    </div>

                    <!-- AM/PM 選擇器 (僅12小時制) -->
                    <div class="col-span-1" v-if="!use24Hour && enableSeconds">
                        <button type="button" @click="togglePeriod"
                            class="px-3 py-1 text-sm transition-colors rounded-sm bg-gray-500 text-white">
                            {{ selectedPeriod }}
                        </button>
                    </div>
                </div>

                <!-- AM/PM 選擇器 (僅12小時制，沒有秒鐘時顯示在同一行) -->
                <div class="mt-2" v-if="!use24Hour && !enableSeconds">
                    <div class="isolate inline-flex rounded-md border border-gray-300 overflow-hidden">
                        <button type="button" @click="setPeriod('AM')" class="px-3 py-1 text-sm transition-colors"
                            :class="selectedPeriod === 'AM' ? 'bg-vdt-theme-500 text-vdt-content ' : 'text-gray-700 hover:bg-gray-100'">
                            AM
                        </button>
                        <button type="button" @click="setPeriod('PM')" class="px-3 py-1 text-sm transition-colors"
                            :class="selectedPeriod === 'PM' ? 'bg-vdt-theme-500 text-vdt-content ' : 'text-gray-700 hover:bg-gray-100'">
                            PM
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { CalendarDate } from '@internationalized/date';
import CalendarHeader from './CalendarHeader.vue';
import WeekdayHeader from './WeekdayHeader.vue';
import SimplifiedDateGridView from './DateGridView.vue';
import {
    getTodaysDate,
    toCalendarDate,
} from '@/utils/dateUtils';

// 選擇模式類型
type SelectionMode = 'single' | 'range';

interface Props {
    // 單一日期模式的屬性
    value?: CalendarDate | null;

    // 範圍選擇模式的屬性
    rangeStart?: CalendarDate | null;
    rangeEnd?: CalendarDate | null;
    selectionMode?: SelectionMode;

    // 外部控制的年月（新增）
    year?: number;
    month?: number;

    // 通用屬性
    minDate?: CalendarDate | null;
    maxDate?: CalendarDate | null;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

    // 時間選擇器相關（僅單一日期模式）
    showTimeSelector?: boolean;
    timeValue?: string | null;
    enableSeconds?: boolean;
    use24Hour?: boolean;

    defaultTime?: string;
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
    defaultTime: '00:00:00'
});

const emit = defineEmits<{
    // 單一日期選擇事件
    select: [date: CalendarDate, closeCalendar: boolean];
    'time-select': [time: string];

    // 範圍選擇事件
    'range-select': [startDate: CalendarDate | null, endDate: CalendarDate | null];
}>();

// 當前顯示的月份和年份 - 使用簡單數值
const currentYear = ref<number>(
    props.year ||
    (props.value ? props.value.year :
        props.rangeStart ? props.rangeStart.year :
            getTodaysDate().year)
);
const currentMonth = ref<number>(
    props.month ||
    (props.value ? props.value.month :
        props.rangeStart ? props.rangeStart.month :
            getTodaysDate().month)
);

// 選擇的日期（單一日期模式） - 直接使用傳入的 CalendarDate
const selectedCalendarDate = computed(() => props.value);

// 時間相關（僅單一日期模式）
const selectedHour = ref<number>(0);
const selectedMinute = ref<number>(0);
const selectedSecond = ref<number>(0);
const selectedPeriod = ref<'AM' | 'PM'>('AM');

// 時間是否已初始化的標誌
const timeInitialized = ref<boolean>(false);

// 可選的年份範圍
const minYear = computed(() => props.minDate?.year || 1900);
const maxYear = computed(() => props.maxDate?.year || 2100);

// 小時選項
const hourOptions = computed(() => {
    return props.use24Hour
        ? Array.from({ length: 24 }, (_, i) => i)
        : Array.from({ length: 12 }, (_, i) => i + 1);
});

// 分鐘選項
const minuteOptions = computed(() => {
    return Array.from({ length: 60 }, (_, i) => i);
});

// 秒鐘選項
const secondOptions = computed(() => {
    return Array.from({ length: 60 }, (_, i) => i);
});

// 格式化的時間值
const formattedTimeValue = computed(() => {
    let hour = selectedHour.value;

    if (!props.use24Hour) {
        if (selectedPeriod.value === 'PM' && hour < 12) {
            hour += 12;
        } else if (selectedPeriod.value === 'AM' && hour === 12) {
            hour = 0;
        }
    }

    const hourStr = formatNumber(hour);
    const minuteStr = formatNumber(selectedMinute.value);

    if (props.enableSeconds) {
        const secondStr = formatNumber(selectedSecond.value);
        return `${hourStr}:${minuteStr}:${secondStr}`;
    } else {
        return `${hourStr}:${minuteStr}`;
    }
});

const parseAndSetTime = (timeStr: string) => {
    console.log('🔧 CalendarGrid 解析時間:', timeStr);

    if (!timeStr) return;

    const [hoursStr, minutes, seconds] = timeStr.split(':');
    let hours = parseInt(hoursStr) || 0;

    if (!props.use24Hour) {
        if (hours >= 12) {
            selectedPeriod.value = 'PM';
            hours = hours === 12 ? 12 : hours - 12;
        } else {
            selectedPeriod.value = 'AM';
            hours = hours === 0 ? 12 : hours;
        }
    }

    selectedHour.value = hours;
    selectedMinute.value = parseInt(minutes) || 0;

    if (props.enableSeconds && seconds) {
        selectedSecond.value = parseInt(seconds) || 0;
    }

    timeInitialized.value = true;
    console.log('✅ CalendarGrid 時間設置完成:', {
        hour: selectedHour.value,
        minute: selectedMinute.value,
        second: selectedSecond.value,
        period: selectedPeriod.value
    });
};

// 使用預設時間初始化
const initializeWithDefaultTime = () => {
    console.log('🏁 CalendarGrid 使用預設時間初始化:', props.defaultTime);
    parseAndSetTime(props.defaultTime);
};

// 監聽外部傳入的年月變化
watch(() => [props.year, props.month], ([newYear, newMonth]) => {
    if (newYear !== undefined) {
        currentYear.value = newYear;
    }
    if (newMonth !== undefined) {
        currentMonth.value = newMonth;
    }
}, { immediate: true });

// 監聽外部傳入的值
watch(() => props.value, (newValue) => {
    // 只有在沒有外部年月控制時才自動調整
    if (newValue && props.year === undefined && props.month === undefined) {
        currentYear.value = newValue.year;
        currentMonth.value = newValue.month;
    }
}, { immediate: true });

// 監聽範圍選擇的開始日期
watch(() => props.rangeStart, (newValue) => {
    // 只有在沒有外部年月控制且為範圍模式時才自動調整
    if (newValue && props.selectionMode === 'range' && props.year === undefined && props.month === undefined) {
        currentYear.value = newValue.year;
        currentMonth.value = newValue.month;
    }
}, { immediate: true });

// 格式化數字為兩位數
const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
};

// 格式化小時
const formatHour = (hour: number): string => {
    return formatNumber(hour);
};

// 設置時間段
const setPeriod = (period: 'AM' | 'PM') => {
    selectedPeriod.value = period;
};

const togglePeriod = () => {
    selectedPeriod.value = selectedPeriod.value === 'AM' ? 'PM' : 'AM';
};

// 處理單一日期選擇
const handleSelect = (date: CalendarDate) => {
    if (props.selectionMode === 'single') {
        emit('select', date, true);

        // 如果有時間選擇器，也發送時間選擇事件
        if (props.showTimeSelector) {
            const time = formattedTimeValue.value;
            emit('time-select', time);
        }
    }
};

// 處理範圍選擇
const handleRangeSelect = (startDate: CalendarDate | null, endDate: CalendarDate | null) => {
    if (props.selectionMode === 'range') {
        emit('range-select', startDate, endDate);
    }
};

// 設置今天日期
const setTodaysDate = () => {
    if (props.selectionMode === 'single') {
        const today = getTodaysDate();
        const calendarToday = toCalendarDate(today);
        if (calendarToday) {
            currentYear.value = today.year;
            currentMonth.value = today.month;
            emit('select', calendarToday, false);
        }
    }
};

// 設置為當前時間
const setNowTime = () => {
    console.log('🕐 CalendarGrid 手動設置當前時間');

    const now = new Date();

    if (props.use24Hour) {
        selectedHour.value = now.getHours();
    } else {
        const hours = now.getHours();
        selectedPeriod.value = hours >= 12 ? 'PM' : 'AM';
        selectedHour.value = hours % 12 || 12;
    }

    selectedMinute.value = now.getMinutes();

    if (props.enableSeconds) {
        selectedSecond.value = now.getSeconds();
    }

    timeInitialized.value = true;
};

// 監聽外部傳入的時間值
watch(() => props.timeValue, (newValue) => {
    console.log('👁️ CalendarGrid 監聽到 timeValue 變化:', newValue);

    if (newValue) {
        // 如果有外部時間值，使用它
        parseAndSetTime(newValue);
    } else if (!timeInitialized.value && props.showTimeSelector && props.selectionMode === 'single') {
        // 只有在時間尚未初始化且沒有外部時間值時，才使用預設時間
        console.log('🔧 CalendarGrid 首次初始化，使用預設時間');
        initializeWithDefaultTime();
    }
}, { immediate: true });

// 監聽時間值的變化並發送事件
watch(
    [selectedHour, selectedMinute, selectedSecond, selectedPeriod],
    () => {
        if (props.showTimeSelector && props.selectionMode === 'single' && timeInitialized.value) {
            console.log('📤 CalendarGrid 發送時間選擇事件:', formattedTimeValue.value);
            emit('time-select', formattedTimeValue.value);
        }
    }
);

// 公開方法
defineExpose({
    // 獲取當前選中的日期（單一模式）
    getSelectedDate: () => selectedCalendarDate.value,

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
