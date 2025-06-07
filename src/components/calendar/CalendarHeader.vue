<template>
    <div class="flex justify-between items-center mb-4 gap-2">
        <!-- 上個月按鈕 -->
        <button type="button" @click="previousMonth"
            class="p-2 hover:bg-gray-100 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="上個月" :disabled="!canNavigatePrevious">
            <DatePickerPrev class="h-5 w-5" />
        </button>

        <div class="grow grid grid-cols-2 gap-2">
            <!-- 月份選擇器 -->
            <select v-model="selectedMonthLocal" @change="onMonthChange"
                class="form-select appearance-none bg-none bg-vdt-surface text-vdt-content py-1 pl-2 w-full border border-vdt-outline rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500"
                aria-label="選擇月份" role="combobox">
                <option v-for="(month, index) in monthNames" :key="index" :value="index + 1">
                    {{ month }}
                </option>
            </select>

            <!-- 年份輸入/選擇器 -->
            <div class="relative">
                <!-- 顯示年份的按鈕 -->
                <button type="button" @click="toggleYearSelector" data-year-selector-button
                    class="inline-flex items-center px-2 py-1 bg-vdt-surface text-vdt-content w-full border border-vdt-outline rounded-sm text-sm focus-within:ring-2 focus-within:border-vdt-theme-500 focus-within:ring-vdt-theme-200"
                    aria-label="選擇年份">
                    {{ displayYear }}
                </button>

                <!-- 年份選擇面板 -->
                <YearSelector :selected-year="selectedYearLocal" v-model:show-selector="showYearSelector"
                    :min-year="minYear" :max-year="maxYear" :calendar="calendarId" :locale="locale"
                    @year-selected="onYearSelected" />
            </div>
        </div>

        <!-- 下個月按鈕 -->
        <button type="button" @click="nextMonth"
            class="p-2 hover:bg-gray-100 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500"
            aria-label="下個月">
            <DatePickerNext class="h-5 w-5" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';
import YearSelector from './YearSelector.vue';
import { CalendarUtils } from '@/utils/calendarUtils';
import { CalendarDate } from '@internationalized/date';

interface Props {
    month: number;
    year: number;
    locale?: string;
    minYear?: number;
    maxYear?: number;
    calendar?: string; // 使用字符串標識符，而非自定義系統
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

// 監聽 props 變化
watch(() => props.month, (newMonth) => {
    selectedMonthLocal.value = newMonth;
}, { immediate: true });

watch(() => props.year, (newYear) => {
    selectedYearLocal.value = newYear;
}, { immediate: true });

// 年份顯示邏輯 - 簡化為只顯示西元年
const displayYear = computed(() => {
    if (props.calendar === 'gregory') {
        return selectedYearLocal.value.toString();
    }

    // 對於非西元曆，顯示對應的當地年份
    const { localYear, isValid } = CalendarUtils.convertGregorianYear(
        selectedYearLocal.value,
        props.calendar
    );

    if (isValid) {
        const calendarName = CalendarUtils.getCalendarDisplayName(props.calendar, props.locale);
        // 根據語言決定顯示格式
        if (props.locale?.startsWith('zh')) {
            return `${calendarName} ${localYear}年`;
        } else {
            return `${calendarName} ${localYear}`;
        }
    }

    return selectedYearLocal.value.toString();
});

// 月份名稱
const monthNames = computed(() => {
    return CalendarUtils.getMonthNames(props.locale, props.calendar);
});

// 獲取當前日曆的年月日期範圍
const calendarYearRange = computed(() => {
    return CalendarUtils.getCalendarYearRange(props.calendar);
});

// 檢查是否可以導航到上個月
const canNavigatePrevious = computed(() => {
    if (props.calendar === 'gregory') {
        return selectedYearLocal.value > props.minYear ||
            (selectedYearLocal.value === props.minYear && selectedMonthLocal.value > 1);
    }

    try {
        // 對於非西元曆，需要檢查轉換後的日期是否在有效範圍內
        const currentDate = new CalendarDate(selectedYearLocal.value, selectedMonthLocal.value, 1);
        const targetCalendar = CalendarUtils.createSafeCalendar(props.calendar);
        const localDate = CalendarUtils.safeToCalendar(currentDate, targetCalendar);

        // 檢查上個月是否會超出日曆系統的最小範圍
        let prevMonth = localDate.month - 1;
        let prevYear = localDate.year;

        if (prevMonth < 1) {
            prevMonth = 12;
            prevYear -= 1;
        }

        // 檢查是否超出日曆系統的年份範圍
        return prevYear >= calendarYearRange.value.min;
    } catch (error) {
        console.warn('檢查上月導航失敗:', error);
        return selectedYearLocal.value > props.minYear;
    }
});
// 月份切換邏輯
const previousMonth = () => {
    let newMonth = selectedMonthLocal.value - 1;
    let newYear = selectedYearLocal.value;

    if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
    }

    // 檢查年份限制
    if (newYear < props.minYear) {
        newYear = props.minYear;
        newMonth = 1;
    }

    updateDate(newMonth, newYear);
};

const nextMonth = () => {
    let newMonth = selectedMonthLocal.value + 1;
    let newYear = selectedYearLocal.value;

    if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
    }

    // 檢查年份限制
    if (newYear > props.maxYear) {
        newYear = props.maxYear;
        newMonth = 12;
    }

    updateDate(newMonth, newYear);
};

// 處理月份變更
const onMonthChange = () => {
    updateDate(selectedMonthLocal.value, selectedYearLocal.value);
};

// 處理年份變更
const onYearSelected = (year: number) => {
    selectedYearLocal.value = year;
    updateDate(selectedMonthLocal.value, year);
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

<style scoped>
/* 取消 Select 箭頭 */
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

select::-ms-expand {
    display: none;
}
</style>
