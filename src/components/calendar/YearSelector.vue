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
import { CalendarDate, createCalendar, toCalendar, GregorianCalendar } from '@internationalized/date';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';

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
    try {
        return createCalendar(props.calendar as any);
    } catch (error) {
        console.warn(`無法創建日曆 ${props.calendar}，回退到西元曆`);
        return new GregorianCalendar();
    }
});

const isGregorianCalendar = computed(() => props.calendar === 'gregory');
const showGregorianReference = computed(() => !isGregorianCalendar.value);

// 日曆顯示名稱
const calendarDisplayName = computed(() => {
    const names: Record<string, string> = {
        'roc': '民國',
        'buddhist': '佛曆',
        'japanese': '和曆',
        'islamic': '伊斯蘭曆',
        'persian': '波斯曆',
        'hebrew': '希伯來曆',
        'indian': '印度曆',
        'chinese': '農曆'
    };
    return names[props.calendar] || props.calendar;
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
    if (isGregorianCalendar.value) return null;

    try {
        // 嘗試找到日曆系統的有效範圍
        // 對於 ROC，有效年份從 1 開始（對應 1912 西元年）
        // 對於 Buddhist，有效年份從 1 開始（對應 -542 西元年，但實際使用更晚）

        const ranges: Record<string, { min: number; max: number }> = {
            'roc': { min: 1, max: 200 },      // 民國 1年 (1912) 到 200年 (2111)
            'buddhist': { min: 1, max: 3000 }, // 佛曆使用範圍
            'japanese': { min: 1, max: 100 },  // 現代日本年號範圍
        };

        return ranges[props.calendar] || null;
    } catch (error) {
        console.warn('無法計算日曆年份範圍:', error);
        return null;
    }
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

            const minGregorianDate = toCalendar(minLocalDate, new GregorianCalendar());
            const maxGregorianDate = toCalendar(maxLocalDate, new GregorianCalendar());

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

// 年份轉換函數 - 使用 @internationalized/date
const convertYearForDisplay = (gregorianYear: number): YearDisplayData => {
    if (isGregorianCalendar.value) {
        return {
            gregorianYear,
            displayYear: gregorianYear.toString()
        };
    }

    try {
        // 創建西元曆日期
        const gregorianDate = new CalendarDate(gregorianYear, 1, 1);

        // 轉換到目標日曆系統
        const localDate = toCalendar(gregorianDate, currentCalendar.value);

        // 檢查是否為有效年份（避免負數或過小的年份）
        const isInvalid = calendarYearRange.value &&
            (localDate.year < calendarYearRange.value.min || localDate.year > calendarYearRange.value.max);

        return {
            gregorianYear,
            displayYear: localDate.year.toString(),
            localYear: localDate.year,
            isInvalid: isInvalid || false
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
    if (!isGregorianCalendar.value && calendarYearRange.value) {
        try {
            const gregorianDate = new CalendarDate(targetGregorianYear, 1, 1);
            const localDate = toCalendar(gregorianDate, currentCalendar.value);

            if (localDate.year < calendarYearRange.value.min || localDate.year > calendarYearRange.value.max) {
                console.warn(`西元年 ${targetGregorianYear} 對應的${calendarDisplayName.value}年 ${localDate.year} 超出有效範圍`);
                return;
            }
        } catch (error) {
            console.warn('驗證年份有效性失敗:', error);
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
