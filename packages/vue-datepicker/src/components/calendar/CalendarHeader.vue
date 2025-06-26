<!-- /src/components/calendar/CalendarHeader.vue -->
<template>
    <div class="flex justify-between items-center mb-4 gap-2">
        <!-- 上個月按鈕 -->
        <button type="button" @click="previousMonth"
            class="p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="上個月" :disabled="!canNavigatePrevious">
            <DatePickerPrev class="h-5 w-5" />
        </button>

        <div class="grow grid grid-cols-2 gap-2">
            <!-- 月份選擇器 -->
            <slot name="month-selector" :month-names="monthNames" :selected-month="selectedMonthLocal"
                :on-month-change="onMonthChange">
                <select v-model="selectedMonthLocal" @change="onMonthChange"
                    class="appearance-none bg-none w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
                    aria-label="選擇月份" role="combobox">
                    <option v-for="(month, index) in monthNames" :key="index" :value="index + 1">
                        {{ month }}
                    </option>
                </select>
            </slot>

            <!-- 年份輸入/選擇器 -->
            <div class="relative">
                <!-- 顯示年份的按鈕 -->
                <slot name="year-selector" :display-year="displayYear" :toggle-year-selector="toggleYearSelector"
                    :show-year-selector="showYearSelector">
                    <button type="button" @click="toggleYearSelector" data-year-selector-button
                        class="inline-flex text-nowrap items-center px-2 py-1 bg-vdt-surface text-vdt-content w-full border border-vdt-outline rounded-sm text-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200"
                        aria-label="選擇年份">
                        {{ displayYear }}
                    </button>
                </slot>

                <!-- 年份選擇面板 -->
                <YearSelector :selected-year="selectedYearLocal" v-model:show-selector="showYearSelector"
                    :calendar="calendarId" :locale="locale" @year-selected="onYearSelected">
                    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps" :key="slotName">
                        <slot :name="slotName" v-bind="slotProps"></slot>
                    </template>
                    <!-- <template #year-display="slotProps">
                        <slot name="year-display" v-bind="slotProps" />
                    </template> -->
                </YearSelector>
            </div>
        </div>

        <!-- 下個月按鈕 -->
        <button type="button" @click="nextMonth"
            class="p-2 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="下個月" :disabled="!canNavigateNext">
            <DatePickerNext class="h-5 w-5" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';
import YearSelector from '../selector/YearSelector.vue';
import { CalendarUtils } from '@/utils/calendarUtils';
import { CalendarDate, DateFormatter } from '@internationalized/date';

interface Props {
    month: number;
    year: number;
    locale?: string;
    minYear?: number;
    maxYear?: number;
    calendar?: string;
}

const props = withDefaults(defineProps<Props>(), {
    locale: 'en-US',
    minYear: 1900,
    maxYear: 2100,
    calendar: 'gregory',
});

const emit = defineEmits<{
    'update:month': [value: number];
    'update:year': [value: number];
}>();

// 內部狀態
const selectedMonthLocal = ref(props.month);
const selectedYearLocal = ref(props.year);
const showYearSelector = ref(false);

// 計算當前使用的日曆 ID
const calendarId = computed(() => props.calendar || 'gregory');

// 日曆年份的範圍
const calendarRange = computed(() => CalendarUtils.getCalendarRange(props.calendar));

// 監聽 props 變化
watch(() => props.month, (newMonth) => {
    selectedMonthLocal.value = newMonth;
}, { immediate: true });

watch(() => props.year, (newYear) => {
    selectedYearLocal.value = newYear;
}, { immediate: true });

// 年份顯示邏輯
const displayYear = computed(() => {
    if (props.calendar === 'gregory') {
        return selectedYearLocal.value.toString();
    }

    try {
        // 使用 @internationalized/date 格式化，會自動顯示正確年號
        const gregorianDate = new CalendarDate(selectedYearLocal.value, 6, 1); // 用年中日期
        const calendarDate = CalendarUtils.safeToCalendar(
            gregorianDate,
            CalendarUtils.createSafeCalendar(props.calendar)
        );

        const formatter = new DateFormatter(props.locale, {
            calendar: props.calendar,
            year: 'numeric'
        });

        return formatter.format(calendarDate.toDate('UTC'));
    } catch (error) {
        // 回退
        return selectedYearLocal.value.toString();
    }
});

// 月份名稱
const monthNames = computed(() => {
    return CalendarUtils.getMonthNames(props.locale, props.calendar);
});

// 檢查是否可以導航到上個月
const canNavigatePrevious = computed(() => {
    let prevYear = selectedYearLocal.value;
    let prevMonth = selectedMonthLocal.value - 1;

    // 計算上個月的年份
    if (prevMonth < 1) {
        prevMonth = 12;
        prevYear = selectedYearLocal.value - 1;
    }

    // 檢查是否會超出日曆年份範圍
    return prevYear >= calendarRange.value.min;
});

// 檢查是否可以導航到下個月
const canNavigateNext = computed(() => {
    let nextYear = selectedYearLocal.value;
    let nextMonth = selectedMonthLocal.value + 1;

    // 計算下個月的年份
    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear = selectedYearLocal.value + 1;
    }

    // 檢查是否會超出日曆年份範圍
    return nextYear <= calendarRange.value.max;
});

// 月份切換邏輯
const previousMonth = () => {
    if (!canNavigatePrevious.value) return;

    let newMonth = selectedMonthLocal.value - 1;
    let newYear = selectedYearLocal.value;

    if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
    }

    // 最終安全檢查
    if (newYear >= calendarRange.value.min) {
        updateDate(newMonth, newYear);
    }
};

const nextMonth = () => {
    if (!canNavigateNext.value) return;

    let newMonth = selectedMonthLocal.value + 1;
    let newYear = selectedYearLocal.value;

    if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
    }

    // 最終安全檢查
    if (newYear <= calendarRange.value.max) {
        updateDate(newMonth, newYear);
    }
};

// 處理月份變更
const onMonthChange = () => {
    updateDate(selectedMonthLocal.value, selectedYearLocal.value);
};

// 處理年份變更
const onYearSelected = (year: number) => {
    // 確保年份在有效範圍內
    if (year >= calendarRange.value.min && year <= calendarRange.value.max) {
        selectedYearLocal.value = year;
        updateDate(selectedMonthLocal.value, year);
    }
};

// 更新日期並發送事件
const updateDate = (month: number, year: number) => {
    selectedMonthLocal.value = month;
    selectedYearLocal.value = year;

    emit('update:month', month);
    emit('update:year', year);
};

// 切換年份選擇器
const toggleYearSelector = () => {
    showYearSelector.value = !showYearSelector.value;
};
</script>
