<!-- src/components/selector/YearSelector.vue -->
<template>
    <div v-if="showSelector" ref="yearSelectorRef" class="vdp-year-selector">

        <!-- 年份選擇器頂部導航 -->
        <div class="vdp-year-nav">
            <button type="button" @click="previousYearRange" class="vdp-year-nav-btn" :disabled="!canGoPrevious"
                aria-label="previous year">
                <DatePickerPrev class="vdp-icon-sm" />
            </button>
            <span class="vdp-year-range-text">
                <slot name="year-range-display" :first-year="firstYear" :last-year="lastYear"
                    :display-text="displayRangeText">
                    {{ displayRangeText }}
                </slot>
            </span>
            <button type="button" @click="nextYearRange" class="vdp-year-nav-btn" :disabled="!canGoNext"
                aria-label="next year">
                <DatePickerNext class="vdp-icon-sm" />
            </button>
        </div>

        <!-- 年份網格 -->
        <div class="vdp-year-grid" v-if="visibleYears.length > 0">
            <button type="button" v-for="yearData in visibleYears" :key="yearData.gregorianYear"
                @click="selectYear(yearData.gregorianYear)" class="vdp-year-btn" :class="{
                    'vdp-year-btn--selected': selectedYear === yearData.gregorianYear,
                    'vdp-year-btn--warning': yearData.displayWarning
                }" :title="yearData.warningMessage">

                <!-- 主要顯示年份 -->
                <slot name="year-display" :yearData="yearData" :isSelected="selectedYear === yearData.gregorianYear">
                    <!-- 預設顯示 -->
                    <div class="vdp-year-num">
                        <div v-if="isJapaneseCalendar"> {{ yearData.displayEra }} </div>
                        {{ yearData.displayYear }}
                    </div>
                    <!-- 輔助顯示（西元年參考） -->
                    <div v-if="yearData.showReference" class="vdp-year-ref">
                        {{ yearData.referenceYear }}
                    </div>
                </slot>
            </button>
        </div>

        <!-- 超出範圍提示 -->
        <div v-else class="vdp-year-empty">
            <slot name="no-years-display" :calendar-range="calendarRange" :go-to-valid-range="goToValidRange">
                <div class="vdp-year-empty-text">{{ getLocalizedText('noYearsToDisplay') }}</div>
                <button type="button" @click="goToValidRange" class="vdp-year-return-btn">
                    {{ getLocalizedText('returnToValidRange') }}
                </button>
            </slot>
        </div>

        <!-- 年份跳轉輸入 -->
        <div class="vdp-year-jump">
            <slot name="year-input" :year-input="yearInput" :calendar-range="calendarRange"
                :calendar-display-name="calendarDisplayName" :go-to-specific-year="goToSpecificYear"
                :get-localized-text="getLocalizedText" :format-text="formatText">
                <!-- 預設顯示 -->
                <div class="vdp-year-jump-label">
                    {{ getLocalizedText('jumpToYear') }}
                </div>
                <input type="number" v-model="yearInput" @keydown.enter="goToSpecificYear"
                    :placeholder="getLocalizedText('inputYearPlaceholder')" :min="calendarRange.min"
                    :max="calendarRange.max" class="vdp-year-input" />
                <div class="vdp-year-jump-info">
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
import { warn } from '../../utils/logger';
import { CalendarDate, DateFormatter } from '@internationalized/date';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';
import { CalendarUtils } from '../../utils/calendarUtils';
import { useLocale } from '../../composables/useLocale';

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
const isJapaneseCalendar = computed(() => props.calendar === 'japanese');

// slot 使用
const firstYear = computed(() => visibleYears.value[0]);
const lastYear = computed(() => visibleYears.value[visibleYears.value.length - 1]);

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
    displayEra: string; // 用於非西元曆的年號顯示
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
            formatterCache.set(key, new DateFormatter(locale, { calendar, year: 'numeric', era: 'short' }));
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
        displayEra: '',
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
        const parts = formatter.formatToParts(calendarDate.toDate('UTC'));

        // 提取顯示年份
        result.displayYear = parts.find(part => part.type === 'year')?.value || gregorianYear.toString();
        result.displayEra = parts.find(part => part.type === 'era')?.value || '';

        // 如果有年號或年份與西元年不同，顯示西元年參考
        const hasEra = Boolean(result.displayEra);
        const isDifferentYear = result.displayEra !== gregorianYear.toString();

        if (hasEra || isDifferentYear) {
            result.showReference = true;
            result.referenceYear = gregorianYear.toString();
        }

    } catch (error) {
        // 回退邏輯：簡化版
        result.displayWarning = true;
        result.warningMessage = formatText(getLocalizedText('conversionFailed'), { calendar: calendarDisplayName.value });

        // 簡單的手動轉換（ROC：紀元前年份走 i18n）
        if (props.calendar === 'roc') {
            const rocYear = gregorianYear - 1911;
            result.displayYear = rocYear > 0
                ? rocYear.toString()
                : formatText(getLocalizedText('beforeEra'), { year: Math.abs(rocYear - 1) });
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

    if (!firstYear || !lastYear) return '';

    // 西元曆直接顯示數字區間
    if (isGregorianCalendar.value) {
        return `${firstYear.displayYear} - ${lastYear.displayYear}`;
    }

    // 如果只有一個年份
    if (firstYear.gregorianYear === lastYear.gregorianYear) {
        return firstYear.displayYear;
    }

    const firstEra = firstYear.displayEra;
    const lastEra = lastYear.displayEra;
    // 如果都是相同年號，使用簡化顯示
    if (firstEra && lastEra && firstEra === lastEra) {
        return `${firstEra} ${firstYear.displayYear} - ${lastYear.displayYear}`;
    }

    return `${firstYear.displayEra} ${firstYear.displayYear} - ${lastYear.displayEra} ${lastYear.displayYear}`;
});

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
        warn(`年份 ${yearInput.value} 超出範圍 ${calendarRange.value.min}-${calendarRange.value.max}`);
    }
};

const goToValidRange = () => {
    const targetYear = Math.max(calendarRange.value.min, Math.min(new Date().getFullYear(), calendarRange.value.max));
    emit('year-selected', targetYear);
};

// ===== 本地化工具 =====
const getLocalizedText = (key: string): string => {
    const result = getMessage(`yearSelector.${key}`);
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

defineExpose({
    getLocalizedText,
    formatText,
    goToSpecificYear,
    goToValidRange
});
</script>

<style scoped>
.vdp-year-selector {
    position: absolute;
    top: 100%;
    margin-top: var(--vdp-space-1);
    right: 0;
    min-width: 14rem;
    max-height: 18rem;
    overflow: auto;
    background-color: var(--color-vdp-surface-elevated);
    color: var(--color-vdp-content);
    border: 1px solid var(--color-vdp-outline);
    border-radius: var(--vdp-radius);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    z-index: 20;
}

.vdp-year-nav {
    padding: var(--vdp-space-2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-vdp-outline);
}

.vdp-year-nav-btn {
    padding: var(--vdp-space-1);
    border-radius: var(--vdp-radius);
    cursor: pointer;
}

.vdp-year-nav-btn:hover {
    background-color: var(--color-vdp-interactive-hover);
}

.vdp-year-nav-btn:focus {
    outline: none;
}

.vdp-year-nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.vdp-year-range-text {
    font-size: var(--vdp-text-sm);
    line-height: var(--vdp-leading-sm);
    font-weight: var(--vdp-font-medium);
}

.vdp-year-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--vdp-space-1);
    padding: var(--vdp-space-2);
}

.vdp-year-btn {
    padding: var(--vdp-space-1);
    font-size: var(--vdp-text-xs);
    border-radius: var(--vdp-radius);
    line-height: 1.25;
    min-height: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--color-vdp-content);
    transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.vdp-year-btn:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--color-vdp-primary);
}

.vdp-year-btn:not(.vdp-year-btn--selected):hover {
    background-color: var(--color-vdp-interactive-hover);
}

.vdp-year-btn--selected {
    background-color: var(--color-vdp-primary);
    color: var(--color-vdp-on-primary);
}

.vdp-year-btn--warning {
    box-shadow: 0 0 0 1px oklch(82.8% 0.189 84.429); /* amber-400 警告 */
}

.vdp-year-num {
    font-weight: var(--vdp-font-medium);
}

.vdp-year-ref {
    font-size: var(--vdp-text-xs);
    opacity: 0.6;
    margin-top: 0.125rem;
}

.vdp-year-empty {
    padding: var(--vdp-space-4);
    text-align: center;
    font-size: var(--vdp-text-sm);
    color: var(--color-vdp-content-muted);
}

.vdp-year-empty-text {
    margin-bottom: var(--vdp-space-2);
}

.vdp-year-return-btn {
    font-size: var(--vdp-text-xs);
    background-color: var(--color-vdp-primary-subtle);
    padding: var(--vdp-space-1) var(--vdp-space-3);
    border-radius: var(--vdp-radius);
    color: var(--color-vdp-primary);
    cursor: pointer;
}

.vdp-year-jump {
    padding: var(--vdp-space-2);
    border-top: 1px solid var(--color-vdp-outline);
}

.vdp-year-jump-label {
    font-size: var(--vdp-text-xs);
    color: var(--color-vdp-content-muted);
    margin-bottom: var(--vdp-space-1);
}

.vdp-year-input {
    width: 100%;
    padding: var(--vdp-space-1);
    font-size: var(--vdp-text-sm);
    border: 1px solid var(--color-vdp-outline);
    background-color: var(--color-vdp-surface);
    color: var(--color-vdp-content);
    border-radius: var(--vdp-radius);
}

.vdp-year-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-vdp-primary-subtle);
}

.vdp-year-jump-info {
    font-size: var(--vdp-text-xs);
    color: var(--color-vdp-content-muted);
    margin-top: var(--vdp-space-1);
}

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
