<!-- 優化版 YearSelector.vue -->
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
        <div class="grid grid-cols-4 gap-1 p-2" v-if="visibleYears.length > 0">
            <button type="button" v-for="yearData in visibleYears" :key="yearData.gregorianYear"
                @click="selectYear(yearData.gregorianYear)" :class="[
                    'p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200',
                    selectedYear === yearData.gregorianYear ? 'bg-vdt-theme-500 text-white' : 'hover:bg-vdt-interactive-hover text-vdt-content',
                    yearData.displayWarning ? 'ring-1 ring-amber-400' : ''
                ]" :title="yearData.warningMessage">

                <!-- 主要顯示年份 -->
                <slot name="year-display" :year-data="yearData" :is-selected="selectedYear === yearData.gregorianYear">
                    <!-- 預設顯示 -->
                    <div class="font-medium">
                        {{ yearData.displayYear }}
                    </div>
                    <!-- 輔助顯示（西元年參考） -->
                    <div v-if="yearData.showReference" class="text-xs opacity-60 mt-0.5">
                        {{ yearData.referenceYear }}
                    </div>
                </slot>
            </button>
        </div>

        <!-- 超出範圍提示 -->
        <div v-else class="p-4 text-center text-sm text-vdt-content-muted">
            <slot name="no-years-display" :calendar-range="calendarRange" :go-to-valid-range="goToValidRange">
                <div class="mb-2">{{ getLocalizedText('noYearsToDisplay') }}</div>
                <button type="button" @click="goToValidRange"
                    class="text-xs bg-vdt-theme-100 hover:bg-vdt-theme-200 px-3 py-1 rounded text-vdt-theme-700">
                    {{ getLocalizedText('returnToValidRange') }}
                </button>
            </slot>
        </div>

        <!-- 年份跳轉輸入 -->
        <div class="p-2 border-t border-vdt-outline">
            <slot name="year-input" :year-input="yearInput" :calendar-range="calendarRange"
                :calendar-display-name="calendarDisplayName" :go-to-specific-year="goToSpecificYear"
                :get-localized-text="getLocalizedText" :format-text="formatText">
                <!-- 預設顯示 -->
                <div class="text-xs text-gray-400 mb-1">
                    {{ getLocalizedText('jumpToYear') }}
                </div>
                <input type="number" v-model="yearInput" @keydown.enter="goToSpecificYear"
                    :placeholder="getLocalizedText('inputYearPlaceholder')" :min="calendarRange.min"
                    :max="calendarRange.max"
                    class="w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500" />
                <div class="text-xs text-vdt-content-muted mt-1">
                    {{ formatText(getLocalizedText('yearRangeInfo'), {
                        calendar: calendarDisplayName,
                        min: calendarRange.min,
                        max: calendarRange.max
                    }) }}
                </div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { CalendarDate, DateFormatter } from '@internationalized/date';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';
import { CalendarUtils } from '@/utils/calendarUtils';
import { useLocale } from '@/composables/useLocale';

interface Props {
    selectedYear: number;
    showSelector: boolean;
    pageSize?: number;
    calendar?: string;
    locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
    pageSize: 12,
    calendar: 'gregory',
    locale: 'zh-TW',
});

const emit = defineEmits<{
    'year-selected': [year: number];
    'update:showSelector': [value: boolean];
}>();

const { getMessage, formatText } = useLocale(props.locale);

// ===== 核心數據和配置 =====
const yearSelectorRef = ref<HTMLElement | null>(null);
const yearInput = ref<number | null>(null);

const calendarRange = computed(() => CalendarUtils.getCalendarRange(props.calendar));
const calendarDisplayName = computed(() => CalendarUtils.getCalendarDisplayName(props.calendar, props.locale));
const isGregorianCalendar = computed(() => props.calendar === 'gregory');

// ===== 年份範圍起始值（簡化邏輯）=====
const yearRangeStart = ref(0);

// 計算合適的年份範圍起始值
const calculateRangeStart = (targetYear: number): number => {
    const normalStart = Math.floor(targetYear / props.pageSize) * props.pageSize;
    return Math.max(normalStart, calendarRange.value.min);
};

// 初始化年份範圍
const initializeYearRange = () => {
    yearRangeStart.value = calculateRangeStart(props.selectedYear);
};

// ===== 年份顯示數據介面 =====
interface YearDisplayData {
    gregorianYear: number;
    displayYear: string;
    referenceYear?: string;
    showReference: boolean;
    displayWarning: boolean;
    warningMessage?: string;
}

// ===== DateFormatter 緩存 =====
const formatterCache = new Map<string, DateFormatter>();

const getDateFormatter = (calendar: string, locale: string): DateFormatter => {
    const key = `${calendar}-${locale}`;
    if (!formatterCache.has(key)) {
        try {
            formatterCache.set(key, new DateFormatter(locale, { calendar, year: 'numeric' }));
        } catch (error) {
            formatterCache.set(key, new DateFormatter(locale, { year: 'numeric' }));
        }
    }
    return formatterCache.get(key)!;
};

// ===== 年份轉換邏輯（簡化版）=====
const formatYear = (gregorianYear: number): YearDisplayData => {
    const result: YearDisplayData = {
        gregorianYear,
        displayYear: gregorianYear.toString(),
        showReference: false,
        displayWarning: false
    };

    // 西元曆直接返回
    if (isGregorianCalendar.value) {
        return result;
    }

    try {
        // 使用 DateFormatter 格式化
        const gregorianDate = new CalendarDate(gregorianYear, 6, 1);
        const calendarDate = CalendarUtils.safeToCalendar(gregorianDate, CalendarUtils.createSafeCalendar(props.calendar));
        const formatter = getDateFormatter(props.calendar, props.locale);
        const formatted = formatter.format(calendarDate.toDate('UTC'));

        // 提取顯示年份
        const yearMatch = formatted.match(/\d+/);
        const hasNonNumeric = /[^\d\s]/.test(formatted.replace(/\d+/, ''));

        result.displayYear = hasNonNumeric ? formatted : (yearMatch?.[0] || gregorianYear.toString());

        // 如果不是純數字，顯示西元年參考
        if (hasNonNumeric) {
            result.showReference = true;
            result.referenceYear = gregorianYear.toString();
        }

    } catch (error) {
        // 回退邏輯：簡化版
        result.displayWarning = true;
        result.warningMessage = `無法轉換為${calendarDisplayName.value}`;

        // 簡單的手動轉換
        if (props.calendar === 'roc') {
            const rocYear = gregorianYear - 1911;
            result.displayYear = rocYear > 0 ? rocYear.toString() : `民國前${Math.abs(rocYear - 1)}年`;
        }
    }

    return result;
};

// ===== 年份驗證輔助函數 =====
const isYearInRange = (year: number): boolean => {
    return year >= calendarRange.value.min && year <= calendarRange.value.max;
};

// ===== 可見年份計算 =====
const visibleYears = computed((): YearDisplayData[] => {
    const start = yearRangeStart.value;
    const years: YearDisplayData[] = [];

    for (let i = 0; i < props.pageSize; i++) {
        const gregorianYear = start + i;

        if (gregorianYear > calendarRange.value.max) break;
        if (gregorianYear < calendarRange.value.min) continue;

        years.push(formatYear(gregorianYear));
    }

    return years;
});

// ===== 範圍顯示文字 =====
const displayRangeText = computed(() => {
    const years = visibleYears.value;
    if (years.length === 0) return '';

    const firstYear = years[0];
    const lastYear = years[years.length - 1];

    // 西元曆直接顯示數字區間
    if (isGregorianCalendar.value) {
        return `${firstYear.displayYear} - ${lastYear.displayYear}`;
    }

    // 處理其他日曆系統的年號顯示
    return formatCalendarRangeText(firstYear, lastYear);
});

// 格式化日曆範圍文字
const formatCalendarRangeText = (firstYear: YearDisplayData, lastYear: YearDisplayData): string => {
    const firstDisplay = firstYear.displayYear;
    const lastDisplay = lastYear.displayYear;

    // 如果只有一個年份
    if (firstYear.gregorianYear === lastYear.gregorianYear) {
        return firstDisplay;
    }

    return formatEraRange(firstDisplay, lastDisplay);
};

// 格式化年號區間（支援同年號簡化顯示）
const formatEraRange = (firstDisplay: string, lastDisplay: string): string => {
    // 提取年號和年份
    const firstEra = extractEraInfo(firstDisplay);
    const lastEra = extractEraInfo(lastDisplay);

    // 如果都是相同年號，使用簡化顯示
    if (firstEra.eraName && lastEra.eraName && firstEra.eraName === lastEra.eraName) {
        // 格式：昭和31-42年
        return `${firstEra.eraName}${firstEra.year} - ${lastEra.year}年`;
    }

    // 不同年號或無法解析，使用完整顯示
    // 格式：大正9年-昭和6年
    return `${firstDisplay} - ${lastDisplay}`;
};

// 提取年號資訊
interface EraInfo {
    eraName: string | null;   // 年號名稱
    year: string | null;      // 年份數字
    isValid: boolean;         // 是否成功解析
}

const extractEraInfo = (displayYear: string): EraInfo => {
    // 匹配日本年號格式：如"昭和31年"、"令和6年"
    const eraPattern = /^([^\d]+)(\d+)年?$/;
    const match = displayYear.match(eraPattern);

    if (match) {
        return {
            eraName: match[1],    // 年號名稱（如"昭和"、"令和"）
            year: match[2],       // 年份數字（如"31"、"6"）
            isValid: true
        };
    }

    return {
        eraName: null,
        year: null,
        isValid: false
    };
};

// ===== 導航控制 =====
const canGoPrevious = computed(() => yearRangeStart.value > calendarRange.value.min);
const canGoNext = computed(() => yearRangeStart.value + props.pageSize <= calendarRange.value.max);

const previousYearRange = () => {
    if (canGoPrevious.value) {
        yearRangeStart.value = Math.max(
            yearRangeStart.value - props.pageSize,
            calendarRange.value.min
        );
    }
};

const nextYearRange = () => {
    if (canGoNext.value) {
        yearRangeStart.value = Math.min(
            yearRangeStart.value + props.pageSize,
            calendarRange.value.max
        );
    }
};

// ===== 年份選擇 =====
const selectYear = (gregorianYear: number) => {
    if (isYearInRange(gregorianYear)) {
        emit('year-selected', gregorianYear);
        emit('update:showSelector', false);
    }
};

const goToSpecificYear = () => {
    if (!yearInput.value) return;

    if (isYearInRange(yearInput.value)) {
        yearRangeStart.value = calculateRangeStart(yearInput.value);
        emit('year-selected', yearInput.value);
        emit('update:showSelector', false);
        yearInput.value = null;
    } else {
        // 簡化的錯誤提示
        console.warn(`年份 ${yearInput.value} 超出範圍 ${calendarRange.value.min}-${calendarRange.value.max}`);
    }
};

const goToValidRange = () => {
    const targetYear = Math.max(calendarRange.value.min, Math.min(new Date().getFullYear(), calendarRange.value.max));
    emit('year-selected', targetYear);
};

// ===== 本地化工具 =====
const getLocalizedText = (key: string): string => {
    const result = getMessage(`yearSelector.${key}`);
    console.log(`Getting localized text for key: ${key}, result: ${result}`);
    return result;
};

// ===== 監聽器（合併邏輯）=====
const updateRangeStart = () => {
    if (isYearInRange(props.selectedYear)) {
        yearRangeStart.value = calculateRangeStart(props.selectedYear);
    }
};

watch([() => props.selectedYear, () => props.calendar], updateRangeStart, { immediate: true });

// ===== 生命週期 =====
const handleClickOutside = (event: MouseEvent) => {
    if (props.showSelector && yearSelectorRef.value) {
        const target = event.target as Element;
        const isYearButton = !!target.closest('[data-year-selector-button]');
        if (!yearSelectorRef.value.contains(target) && !isYearButton) {
            emit('update:showSelector', false);
        }
    }
};

onMounted(() => {
    initializeYearRange();
    document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});


</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
