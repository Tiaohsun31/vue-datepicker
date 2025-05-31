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
            <button v-for="yearData in visibleYearRange" :key="yearData.gregorian"
                @click="selectYear(yearData.gregorian)" :class="[
                    'p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
                    selectedYear === yearData.gregorian ? 'bg-vdt-theme-500 text-white' : 'hover:bg-vdt-interactive-hover text-vdt-content'
                ]">
                <!-- 當地日曆年份（主要顯示） -->
                <div class="font-medium">{{ yearData.localDisplay }}</div>
                <!-- 西元年份（參考顯示，僅在非西元曆時顯示） -->
                <div v-if="hasCalendarSystem && currentCalendar !== 'gregory'" class="text-xs opacity-60 mt-0.5">
                    {{ yearData.gregorian }}
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
                範圍: {{ effectiveMinYear }} - {{ effectiveMaxYear }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';
import type { UnifiedCalendarSystem } from '@/utils/calendarSystem';

interface Props {
    selectedYear: number;  // 傳入的西元曆年份
    showSelector: boolean;
    minYear?: number;      // 西元曆最小年份
    maxYear?: number;      // 西元曆最大年份
    pageSize?: number;
    calendarSystem?: UnifiedCalendarSystem | null;
}

const props = withDefaults(defineProps<Props>(), {
    minYear: 1900,
    maxYear: 2100,
    pageSize: 12,
    calendarSystem: null
});

const emit = defineEmits<{
    'year-selected': [year: number];  // 發送西元曆年份
    'update:showSelector': [value: boolean];
}>();

// DOM 引用和輸入狀態
const yearSelectorRef = ref<HTMLElement | null>(null);
const yearInput = ref<number | null>(null);

// 計算當前日曆系統
const currentCalendar = computed(() => {
    return props.calendarSystem?.getCurrentCalendar() || 'gregory';
});

const hasCalendarSystem = computed(() => {
    return props.calendarSystem !== null;
});

// 計算有效的年份範圍（考慮插件限制）
const effectiveYearRange = computed(() => {
    let minYear = props.minYear;
    let maxYear = props.maxYear;

    // 如果有日曆系統且不是西元曆，使用插件的年份範圍
    if (hasCalendarSystem.value && currentCalendar.value !== 'gregory') {
        try {
            const plugin = props.calendarSystem?.getPlugin?.(currentCalendar.value);
            if (plugin) {
                const config = plugin.getConfig();
                const pluginRange = config.yearRange;

                if (pluginRange && 'toGregorian' in plugin) {
                    // 將插件的本地年份範圍轉換為西元年範圍
                    const minLocalDate = { year: pluginRange.min, month: 1, day: 1 };
                    const maxLocalDate = { year: pluginRange.max, month: 12, day: 31 };

                    const minGregorianDate = (plugin as any).toGregorian(minLocalDate);
                    const maxGregorianDate = (plugin as any).toGregorian(maxLocalDate);

                    minYear = minGregorianDate.year;
                    maxYear = maxGregorianDate.year;

                    console.debug(`插件年份範圍: 本地(${pluginRange.min}-${pluginRange.max}) → 西元(${minYear}-${maxYear})`);
                }
            }
        } catch (error) {
            console.warn('獲取插件年份範圍失敗，使用預設範圍:', error);
        }
    }

    // 最大年份暫定
    const adjustedMaxYear = Math.min(maxYear, props.maxYear + 50); // 避免無限制擴大
    return {
        min: minYear,
        max: adjustedMaxYear
    };
});

const effectiveMinYear = computed(() => effectiveYearRange.value.min);
const effectiveMaxYear = computed(() => effectiveYearRange.value.max);

// 計算當前年份範圍的起始年（西元曆）
const yearRangeStart = ref(Math.floor(props.selectedYear / props.pageSize) * props.pageSize);

// 當selectedYear變化時，更新yearRangeStart
watch(() => props.selectedYear, (newYear) => {
    const startOfCurrentRange = Math.floor(newYear / props.pageSize) * props.pageSize;
    if (startOfCurrentRange !== yearRangeStart.value) {
        yearRangeStart.value = startOfCurrentRange;
    }
});

// 年份顯示數據介面
interface YearDisplayData {
    gregorian: number;       // 西元曆年份（內部使用）
    localDisplay: string;    // 當地日曆顯示文字
    localYear: number;       // 當地日曆年份數字
}

// 轉換年份供顯示用
function convertYearForDisplay(gregorianYear: number): YearDisplayData {
    if (!hasCalendarSystem.value || currentCalendar.value === 'gregory') {
        return {
            gregorian: gregorianYear,
            localDisplay: gregorianYear.toString(),
            localYear: gregorianYear
        };
    }

    try {
        // 使用插件轉換顯示格式
        const plugin = props.calendarSystem?.getPlugin?.(currentCalendar.value);
        if (plugin && 'fromGregorian' in plugin) {
            const simpleDate = { year: gregorianYear, month: 1, day: 1 };
            const localDate = (plugin as any).fromGregorian(simpleDate);

            return {
                gregorian: gregorianYear,
                localDisplay: localDate.year.toString(),
                localYear: localDate.year
            };
        }
    } catch (error) {
        console.warn('年份轉換失敗，回退到西元曆顯示:', error);
    }

    return {
        gregorian: gregorianYear,
        localDisplay: gregorianYear.toString(),
        localYear: gregorianYear
    };
}

// 產生可見的年份範圍
const visibleYearRange = computed((): YearDisplayData[] => {
    const start = yearRangeStart.value;
    const years: YearDisplayData[] = [];

    for (let i = 0; i < props.pageSize; i++) {
        const gregorianYear = start + i;

        // 檢查是否超過有效範圍
        if (gregorianYear > effectiveMaxYear.value) break;
        if (gregorianYear < effectiveMinYear.value) continue;

        years.push(convertYearForDisplay(gregorianYear));
    }

    return years;
});

// 範圍顯示文字
const displayRangeText = computed(() => {
    const firstYear = visibleYearRange.value[0];
    const lastYear = visibleYearRange.value[visibleYearRange.value.length - 1];

    if (!firstYear || !lastYear) return '';

    if (hasCalendarSystem.value && currentCalendar.value !== 'gregory') {
        // 顯示當地日曆年份範圍
        return `${firstYear.localDisplay} - ${lastYear.localDisplay}`;
    } else {
        // 顯示西元年範圍
        return `${firstYear.gregorian} - ${lastYear.gregorian}`;
    }
});

// 導航按鈕狀態
const canGoPrevious = computed(() => {
    return yearRangeStart.value > effectiveMinYear.value;
});

const canGoNext = computed(() => {
    return yearRangeStart.value + props.pageSize <= effectiveMaxYear.value;
});

// 顯示上一頁年份
const previousYearRange = () => {
    if (!canGoPrevious.value) return;

    const newStart = Math.max(
        yearRangeStart.value - props.pageSize,
        effectiveMinYear.value
    );

    if (newStart !== yearRangeStart.value) {
        yearRangeStart.value = newStart;
    }
};

// 顯示下一頁年份
const nextYearRange = () => {
    if (!canGoNext.value) return;

    const newStart = yearRangeStart.value + props.pageSize;

    // 確保新的起始年份不會導致超出最大範圍
    if (newStart <= effectiveMaxYear.value) {
        yearRangeStart.value = newStart;
    }
};

// 選擇特定年份（傳出西元曆年份）
const selectYear = (gregorianYear: number) => {
    emit('year-selected', gregorianYear);
    emit('update:showSelector', false);
};

// 跳轉到特定年份（統一使用西元年輸入）
const goToSpecificYear = () => {
    if (!yearInput.value) return;

    const targetGregorianYear = yearInput.value;

    // 確保年份在有效範圍內
    if (targetGregorianYear < effectiveMinYear.value || targetGregorianYear > effectiveMaxYear.value) {
        console.warn(`年份 ${targetGregorianYear} 超出有效範圍 ${effectiveMinYear.value}-${effectiveMaxYear.value}`);
        return;
    }

    // 更新年份範圍起始值
    yearRangeStart.value = Math.floor(targetGregorianYear / props.pageSize) * props.pageSize;

    // 發送西元曆年份
    emit('year-selected', targetGregorianYear);
    emit('update:showSelector', false);
    yearInput.value = null;
};

// 處理點擊外部關閉年份選擇器
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
