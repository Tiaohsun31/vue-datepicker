<!-- CalendarGrid 整合時間選擇 -->
<template>
    <div class="vdt-date-picker calendar-grid w-full max-w-xs  rounded-lg shadow p-2">
        <!-- 月份導航和選擇器 -->
        <CalendarHeader v-model:month="currentMonth" v-model:year="currentYear" :locale="locale" :min-year="minYear"
            :max-year="maxYear" />

        <!-- 星期列 -->
        <WeekdayHeader :locale="locale" :week-starts-on="weekStartsOn" />

        <!-- 日期網格 -->
        <DateGridView :year="currentYear" :month="currentMonth"
            :selected-date="ensureCalendarDate(selectedDate as DateTimeValue)" :min-date="minDate" :max-date="maxDate"
            :locale="locale" :week-starts-on="weekStartsOn" @select="handleSelect" />

        <!-- 時間選擇區域 -->
        <template v-if="showTimeSelector">
            <hr class="my-2 border-gray-200" />
            <div class="flex flex-row items-center justify-between">
                <label class="text-sm font-medium text-gray-700 uppercase">Time:</label>
                <div class="flex flex-row items-center gap-1">
                    <button type="button" @click="setNowTime"
                        class="px-2 py-1 text-xs transition-colors rounded-sm bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
                        Now
                    </button>
                    <button type="button" @click="setTodaysDate"
                        class="px-2 py-1 text-xs transition-colors rounded-sm bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
                        Today
                    </button>
                </div>

            </div>
            <div v-if="showTimeSelector" class="time-selector-container pt-1">
                <!-- 簡化版時間選擇器 -->
                <div class="flex flex-row items-center gap-1">
                    <!-- 小時選擇器 -->
                    <div class="flex-1">
                        <select v-model="selectedHour"
                            class="w-full py-1 px-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-vdt-primary-200 focus-within:ring-vdt-primary-500">
                            <option v-for="hour in hourOptions" :key="hour" :value="hour">
                                {{ formatHour(hour) }}
                            </option>
                        </select>
                    </div>

                    <!-- 分鐘選擇器 -->
                    <div class="flex-1">
                        <select v-model="selectedMinute"
                            class="w-full py-1 px-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-vdt-primary-200 focus-within:ring-vdt-primary-500">
                            <option v-for="minute in minuteOptions" :key="minute" :value="minute">
                                {{ formatNumber(minute) }}
                            </option>
                        </select>
                    </div>

                    <!-- 秒鐘選擇器 -->
                    <div class="flex-1" v-if="enableSeconds">
                        <select v-model="selectedSecond"
                            class="w-full py-1 px-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-vdt-primary-200 focus-within:ring-vdt-primary-500">
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
                    <div class="isolate  inline-flex rounded-md border border-gray-300 overflow-hidden">
                        <button type="button" @click="setPeriod('AM')" class="px-3 py-1 text-sm transition-colors"
                            :class="selectedPeriod === 'AM' ? 'bg-vdt-primary-500 text-white ' : 'text-gray-700 hover:bg-gray-100'">
                            AM
                        </button>
                        <button type="button" @click="setPeriod('PM')" class="px-3 py-1 text-sm transition-colors"
                            :class="selectedPeriod === 'PM' ? 'bg-vdt-primary-500 text-white ' : 'text-gray-700 hover:bg-gray-100'">
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
import DateGridView from './DateGridView.vue';
import { ensureCalendarDate, getTodaysDate, type DateTimeValue } from '@/utils/dateUtils';

interface Props {
    value: CalendarDate | null;
    minDate?: CalendarDate | null;
    maxDate?: CalendarDate | null;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.

    // 時間選擇器相關
    showTimeSelector?: boolean;
    timeValue?: string | null;
    enableSeconds?: boolean;
    use24Hour?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    locale: 'en-US',
    weekStartsOn: 0,
    minDate: undefined,
    maxDate: undefined,
    showTimeSelector: true,
    timeValue: null,
    enableSeconds: true,
    use24Hour: false
});

const emit = defineEmits<{
    select: [date: CalendarDate, closeCalendar: boolean],
    'time-select': [time: string]
}>();

// 當前顯示的月份和年份
const currentYear = ref<number>(
    props.value ? props.value.year : getTodaysDate().year
);
const currentMonth = ref<number>(
    props.value ? props.value.month : getTodaysDate().month
);

// 選擇的日期
const selectedDate = ref<CalendarDate | null>(ensureCalendarDate(props.value));

// 時間相關
const selectedHour = ref<number>(0);
const selectedMinute = ref<number>(0);
const selectedSecond = ref<number>(0);
const selectedPeriod = ref<'AM' | 'PM'>('AM');

// 可選的年份範圍（根據minDate和maxDate設定）
const minYear = computed(() => props.minDate?.year || 1900);
const maxYear = computed(() => props.maxDate?.year || 2100);

// 小時選項
const hourOptions = computed(() => {
    return props.use24Hour
        ? Array.from({ length: 24 }, (_, i) => i)
        : Array.from({ length: 12 }, (_, i) => i + 1);
});

// 分鐘選項 (完整 0-59)
const minuteOptions = computed(() => {
    return Array.from({ length: 60 }, (_, i) => i);
});

// 秒鐘選項 (完整 0-59)
const secondOptions = computed(() => {
    return Array.from({ length: 60 }, (_, i) => i);
});

// 格式化的時間值
const formattedTimeValue = computed(() => {
    let hour = selectedHour.value;

    // 12小時制轉24小時制
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

// 監聽外部傳入的值
watch(() => props.value, (newValue) => {
    selectedDate.value = newValue;
    if (newValue) {
        currentYear.value = newValue.year;
        currentMonth.value = newValue.month;
    }
}, { immediate: true });



// 格式化數字為兩位數
const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
};

// 格式化小時 (只顯示數字，不帶AM/PM)
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

// 處理日期選擇
const handleSelect = (date: CalendarDate) => {
    selectedDate.value = date;

    // 始終發送日期選擇事件
    emit('select', date, true);

    // 如果有時間選擇器，也發送時間選擇事件
    if (props.showTimeSelector) {
        const time = formattedTimeValue.value;
        emit('time-select', time);
    }
};

const setTodaysDate = () => {
    const today = getTodaysDate();
    selectedDate.value = today;
    currentYear.value = today.year;
    currentMonth.value = today.month;

    selectedDate.value = ensureCalendarDate(today);
    emit('select', today, false);
};

// 設置為當前時間
const setNowTime = () => {
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
};
// 監聽外部傳入的時間值
watch(() => props.timeValue, (newValue) => {
    if (newValue) {
        const [hoursStr, minutes, seconds] = newValue.split(':');
        let hours = parseInt(hoursStr);

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
    } else {
        // 設置為當前時間
        setNowTime();
    }
}, { immediate: true });

// 監聽時間值的變化並發送事件
watch(
    [selectedHour, selectedMinute, selectedSecond, selectedPeriod],
    () => {
        if (props.showTimeSelector) {
            // 當任何時間相關的值發生變化時，發送時間選擇事件
            emit('time-select', formattedTimeValue.value);
        }
    }
);
// 初始化
onMounted(() => {
    if (!props.timeValue && props.showTimeSelector) {
        setNowTime();
    }
})

</script>
