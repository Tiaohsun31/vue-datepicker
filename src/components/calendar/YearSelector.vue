<template>
    <div v-if="showSelector" ref="yearSelectorRef"
        class="absolute top-full mt-1 right-0 w-56 max-h-72 overflow-y-auto bg-vdt-surface-elevated text-vdt-content border border-vdt-outline rounded-md shadow-lg z-20 overflow-hidden">

        <!-- 年份選擇器頂部導航 -->
        <div class="p-2 flex items-center justify-between border-b border-vdt-outline">
            <button type="button" @click="previousYearRange"
                class="p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none" :disabled="!canGoPrevious"
                :class="{ 'opacity-50 cursor-not-allowed': !canGoPrevious }" aria-label="previous year">
                <DatePickerPrev class="h-4 w-4" />
            </button>
            <span class="text-sm font-medium">
                {{ displayRangeText }}
            </span>
            <button type="button" @click="nextYearRange"
                class="p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none" :disabled="!canGoNext"
                :class="{ 'opacity-50 cursor-not-allowed': !canGoNext }" aria-label="next year">
                <DatePickerNext class="h-4 w-4" />
            </button>
        </div>

        <!-- 年份網格 -->
        <div class="grid grid-cols-4 gap-1 p-2">
            <button v-for="yearData in visibleYears" :key="yearData.gregorianYear"
                @click="selectYear(yearData.gregorianYear)" :class="[
                    'p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
                    selectedYear === yearData.gregorianYear ? 'bg-vdt-theme-500 text-white' : 'hover:bg-vdt-interactive-hover text-vdt-content'
                ]" :disabled="yearData.isInvalid">
                <!-- 當地日曆年份（主要顯示） -->
                <div class="font-medium" :class="{ 'text-red-400': yearData.isInvalid }">
                    {{ yearData.displayYear }}
                </div>
                <!-- 西元年份（參考顯示，僅在非西元曆時顯示） -->
                <div v-if="showGregorianReference" class="text-xs opacity-60 mt-0.5">
                    {{ yearData.gregorianYear }}
                </div>
            </button>
        </div>

        <!-- 年份跳轉輸入 - 統一使用西元年 -->
        <div class="p-2 border-t border-vdt-outline">
            <div class="text-xs text-vdt-content-muted mb-1">
                跳至年份（西元年）
            </div>
            <input type="number" v-model="yearInput" @keydown.enter="goToSpecificYear" placeholder="輸入西元年..."
                :min="effectiveMinYear" :max="effectiveMaxYear"
                class="w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500" />
            <div class="text-xs text-vdt-content-muted mt-1">
                西元年範圍: {{ effectiveMinYear }} - {{ effectiveMaxYear }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { CalendarDate } from '@internationalized/date';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';
import { CalendarUtils } from '@/utils/calendarUtils';

interface Props {
    selectedYear: number;  // 西元曆年份
    showSelector: boolean;
    minYear?: number;      // 西元曆年份範圍
    maxYear?: number;
    pageSize?: number;
    calendar?: string;     // 日曆系統標識符（如 'gregory', 'roc'）
    locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
    minYear: 1900,
    maxYear: 2100,
    pageSize: 12,
    calendar: 'gregory',
    locale: 'zh-TW',
    calendarSystem: null
});

const emit = defineEmits<{
    'year-selected': [year: number];  // 發送西元曆年份
    'update:showSelector': [value: boolean];
}>();

// DOM 引用和輸入狀態
const yearSelectorRef = ref<HTMLElement | null>(null);
const yearInput = ref<number | null>(null);

// 當前年份範圍起始
const yearRangeStart = ref(Math.floor(props.selectedYear / props.pageSize) * props.pageSize);

// 計算當前使用的日曆系統
const currentCalendar = computed(() => {
    return CalendarUtils.createSafeCalendar(props.calendar);
});

const isGregorianCalendar = computed(() => props.calendar === 'gregory');
const showGregorianReference = computed(() => !isGregorianCalendar.value);

// 日曆顯示名稱
const calendarDisplayName = computed(() => {
    return CalendarUtils.getCalendarDisplayName(props.calendar, props.locale);
});

// 年份顯示數據介面
interface YearDisplayData {
    gregorianYear: number;    // 西元曆年份（用於內部邏輯）
    displayYear: string;      // 顯示文字
    localYear?: number;       // 當地日曆年份數字（如果適用）
    isInvalid?: boolean;      // 是否為無效年份
}

// 計算日曆系統的有效年份範圍（當地日曆年份）
const calendarYearRange = computed(() => {
    if (isGregorianCalendar.value) return { min: props.minYear, max: props.maxYear };
    return CalendarUtils.getCalendarYearRange(props.calendar);
});

// 計算有效的西元年份範圍
const effectiveYearRange = computed(() => {
    let minYear = props.minYear;
    let maxYear = props.maxYear;

    // 根據不同日曆系統調整西元年範圍
    if (!isGregorianCalendar.value && calendarYearRange.value) {
        try {
            // 使用當地日曆的第一年和最後一年轉換為西元年
            const minLocalDate = new CalendarDate(currentCalendar.value, calendarYearRange.value.min, 1, 1);
            const maxLocalDate = new CalendarDate(currentCalendar.value, calendarYearRange.value.max, 12, 31);

            const minGregorianDate = CalendarUtils.safeToCalendar(minLocalDate, CalendarUtils.createSafeCalendar('gregory'));
            const maxGregorianDate = CalendarUtils.safeToCalendar(maxLocalDate, CalendarUtils.createSafeCalendar('gregory'));

            // 確保不超出用戶設定的範圍
            minYear = Math.max(minYear, minGregorianDate.year);
            maxYear = Math.min(maxYear, maxGregorianDate.year);

            console.debug(`${props.calendar}曆年份範圍: 當地(${calendarYearRange.value.min}-${calendarYearRange.value.max}) → 西元(${minYear}-${maxYear})`);
        } catch (error) {
            console.warn('計算有效年份範圍失敗，使用預設範圍:', error);
        }
    }

    return { min: minYear, max: maxYear };
});

const effectiveMinYear = computed(() => effectiveYearRange.value.min);
const effectiveMaxYear = computed(() => effectiveYearRange.value.max);

// 年份轉換函數 - 使用 CalendarUtils
const convertYearForDisplay = (gregorianYear: number): YearDisplayData => {
    if (isGregorianCalendar.value) {
        return {
            gregorianYear,
            displayYear: gregorianYear.toString()
        };
    }

    try {
        // 使用 CalendarUtils 進行年份轉換
        const { localYear, isValid } = CalendarUtils.convertGregorianYear(gregorianYear, props.calendar);

        return {
            gregorianYear,
            displayYear: localYear.toString(),
            localYear: localYear,
            isInvalid: !isValid
        };
    } catch (error) {
        console.warn(`年份轉換失敗 ${gregorianYear}:`, error);
        return {
            gregorianYear,
            displayYear: gregorianYear.toString(),
            isInvalid: true
        };
    }
};

// 可見的年份範圍 - 只顯示有效的年份
const visibleYears = computed((): YearDisplayData[] => {
    const start = yearRangeStart.value;
    const years: YearDisplayData[] = [];

    for (let i = 0; i < props.pageSize; i++) {
        const gregorianYear = start + i;

        // 檢查西元年範圍
        if (gregorianYear > effectiveMaxYear.value) break;
        if (gregorianYear < effectiveMinYear.value) continue;

        const yearData = convertYearForDisplay(gregorianYear);

        // 如果是無效年份，跳過不顯示
        if (yearData.isInvalid) continue;

        years.push(yearData);
    }

    return years;
});

// 範圍顯示文字
const displayRangeText = computed(() => {
    const years = visibleYears.value;
    if (years.length === 0) return '';

    const firstYear = years[0];
    const lastYear = years[years.length - 1];

    if (isGregorianCalendar.value) {
        return `${firstYear.displayYear} - ${lastYear.displayYear}`;
    } else {
        // 顯示當地日曆年份範圍
        return `${calendarDisplayName.value} ${firstYear.displayYear} - ${lastYear.displayYear}`;
    }
});

// 導航按鈕狀態 - 考慮有效年份範圍
const canGoPrevious = computed(() => {
    return yearRangeStart.value > effectiveMinYear.value;
});

const canGoNext = computed(() => {
    // 檢查下一頁是否還有有效年份
    const nextPageStart = yearRangeStart.value + props.pageSize;
    return nextPageStart <= effectiveMaxYear.value;
});

// 監聽 selectedYear 變化
watch(() => props.selectedYear, (newYear) => {
    const startOfCurrentRange = Math.floor(newYear / props.pageSize) * props.pageSize;
    if (startOfCurrentRange !== yearRangeStart.value) {
        yearRangeStart.value = startOfCurrentRange;
    }
});

// 導航方法
const previousYearRange = () => {
    if (!canGoPrevious.value) return;

    const newStart = Math.max(
        yearRangeStart.value - props.pageSize,
        effectiveMinYear.value
    );
    yearRangeStart.value = newStart;
};

const nextYearRange = () => {
    if (!canGoNext.value) return;

    const newStart = yearRangeStart.value + props.pageSize;
    if (newStart <= effectiveMaxYear.value) {
        yearRangeStart.value = newStart;
    }
};

// 選擇年份（始終使用西元年）
const selectYear = (gregorianYear: number) => {
    emit('year-selected', gregorianYear);
    emit('update:showSelector', false);
};

// 跳轉到特定年份 - 統一使用西元年輸入
const goToSpecificYear = () => {
    if (!yearInput.value) return;

    const targetGregorianYear = yearInput.value;

    // 檢查西元年範圍
    if (targetGregorianYear < effectiveMinYear.value || targetGregorianYear > effectiveMaxYear.value) {
        console.warn(`西元年 ${targetGregorianYear} 超出有效範圍 ${effectiveMinYear.value}-${effectiveMaxYear.value}`);
        return;
    }

    // 對於非西元曆，檢查轉換後的當地年份是否有效
    if (!isGregorianCalendar.value) {
        const { isValid } = CalendarUtils.convertGregorianYear(targetGregorianYear, props.calendar);

        if (!isValid) {
            console.warn(`西元年 ${targetGregorianYear} 在 ${calendarDisplayName.value} 中無效`);
            return;
        }
    }

    // 更新範圍起始值
    yearRangeStart.value = Math.floor(targetGregorianYear / props.pageSize) * props.pageSize;

    // 選擇年份
    emit('year-selected', targetGregorianYear);
    emit('update:showSelector', false);
    yearInput.value = null;
};

// 點擊外部關閉
const handleClickOutside = (event: MouseEvent) => {
    if (props.showSelector && yearSelectorRef.value) {
        const target = event.target as Element;
        const isYearButton = !!target.closest('[data-year-selector-button]');

        if (!yearSelectorRef.value.contains(target) && !isYearButton) {
            emit('update:showSelector', false);
        }
    }
};

// 生命週期
onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style scoped>
/* 輸入框數字類型的樣式調整 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
