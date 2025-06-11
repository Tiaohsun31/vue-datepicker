<!-- /src/components/selector/YearSelector.vue -->
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
                    'p-1 text-xs rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500 leading-tight min-h-[2.5rem] flex flex-col justify-center items-center transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
                    selectedYear === yearData.gregorianYear ? 'bg-vdt-theme-500 text-white' : 'hover:bg-vdt-interactive-hover text-vdt-content',
                    yearData.displayWarning ? 'ring-1 ring-amber-400' : ''
                ]" :disabled="yearData.isDisabled" :title="yearData.warningMessage">

                <!-- 主要顯示年份 -->
                <div class="font-medium"
                    :class="{ 'text-amber-600': yearData.displayWarning && selectedYear !== yearData.gregorianYear }">
                    {{ yearData.displayYear }}
                </div>

                <!-- 輔助顯示（西元年參考或警告圖標） -->
                <div v-if="yearData.showReference || yearData.displayWarning"
                    class="text-xs opacity-60 mt-0.5 flex items-center gap-1">
                    <span v-if="yearData.showReference">{{ yearData.referenceYear }}</span>
                </div>
            </button>
        </div>

        <!-- 非範圍內年份時的提示 -->
        <div v-if="outOfRangeMessage" class="py-1 text-center text-sm text-vdt-content-muted">
            <div class="text-xs flex items-center justify-center gap-1">
                {{ outOfRangeMessage.message }}
            </div>
            <button v-if="outOfRangeMessage.type === 'manual-jump'" type="button" @click="goToValidRange"
                class="mt-2 text-xs bg-vdt-theme-100 hover:bg-vdt-theme-200 px-3 py-1 rounded text-vdt-theme-700">
                返回有效範圍
            </button>
        </div>

        <!-- 年份跳轉輸入 - 統一使用西元年 -->
        <div class="p-2 border-t border-vdt-outline">
            <div class="text-xs text-vdt-content-muted mb-1">
                跳至年份（西元年）
            </div>
            <input type="number" v-model="yearInput" @keydown.enter="goToSpecificYear" placeholder="輸入西元年..."
                :min="CALENDAR_MIN_YEAR" :max="CALENDAR_MAX_YEAR"
                class="w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500" />
            <div class="text-xs text-vdt-content-muted mt-1">
                {{ calendarDisplayName }}年範圍: {{ CALENDAR_MIN_YEAR }} - {{ CALENDAR_MAX_YEAR }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { CalendarDate, DateFormatter } from '@internationalized/date';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';
import { CalendarUtils } from '@/utils/calendarUtils';

interface Props {
    selectedYear: number;  // 西元曆年份
    showSelector: boolean;
    pageSize?: number;
    calendar?: string;     // 日曆系統標識符
    locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
    pageSize: 12,
    calendar: 'gregory',
    locale: 'zh-TW',
});

const emit = defineEmits<{
    'year-selected': [year: number];  // 發送西元曆年份
    'update:showSelector': [value: boolean];
}>();

// 常數定義
const getCalendarYearRange = (calendar: string) => {
    const currentYear = new Date().getFullYear();

    // 各日曆系統的起始年份（西元年）
    const calendarRanges: Record<string, { min: number; max: number }> = {
        'gregory': { min: 1, max: currentYear + 100 },
        'japanese': { min: 1868, max: currentYear + 100 }, // 明治元年開始
        'roc': { min: 1912, max: currentYear + 100 }, // 民國元年
        'buddhist': { min: 544, max: currentYear + 543 + 100 },  // 佛曆起始年（概略）
        'islamic': { min: 622, max: currentYear + 100 }, // 伊斯蘭曆起始年
        'persian': { min: 622, max: currentYear + 100 }, // 波斯曆起始年
        'hebrew': { min: 1, max: currentYear + 3760 + 100 }, // 猶太曆起始年
    };

    return calendarRanges[calendar] || { min: 1, max: currentYear + 100 };
};

// 使用日曆特定的年份範圍
const calendarYearRange = computed(() => getCalendarYearRange(props.calendar));
const CALENDAR_MIN_YEAR = computed(() => calendarYearRange.value.min);
const CALENDAR_MAX_YEAR = computed(() => calendarYearRange.value.max);

// 年份選擇器相關狀態
const yearSelectorRef = ref<HTMLElement | null>(null);
const yearInput = ref<number | null>(null);

// 初始年份範圍起始值
const yearRangeStart = ref((() => {
    const normalStart = Math.floor(props.selectedYear / props.pageSize) * props.pageSize;
    const minYear = getCalendarYearRange(props.calendar).min;
    const maxYear = getCalendarYearRange(props.calendar).max;

    // 情境1：輕微超出範圍（1-2頁以內）→ 自動調整
    const pageDistance = Math.abs(normalStart - minYear) / props.pageSize;
    if (pageDistance <= 2 && props.selectedYear < minYear) {
        return minYear; // 自動跳轉到最近的有效範圍
    }

    // 情境2：大幅超出範圍 → 顯示警告
    if (props.selectedYear < minYear || props.selectedYear > maxYear) {
        return normalStart; // 保持原始範圍，顯示警告
    }

    // 情境3：在有效範圍內 → 正常顯示
    return Math.max(normalStart, minYear);
})());

const outOfRangeMessage = computed(() => {
    if (props.selectedYear < CALENDAR_MIN_YEAR.value) {
        const yearDiff = CALENDAR_MIN_YEAR.value - props.selectedYear;
        if (yearDiff <= 24) { // 2頁以內
            return { type: 'auto-adjust', message: `已自動調整到${calendarDisplayName.value}最早年份` };
        } else {
            return { type: 'manual-jump', message: `目前年份 (${props.selectedYear}) 早於${calendarDisplayName.value}起始年份` };
        }
    }
    return null;
});

// 檢查是否為西元曆
const isGregorianCalendar = computed(() => props.calendar === 'gregory');

// 日曆顯示名稱
const calendarDisplayName = computed(() => {
    return CalendarUtils.getCalendarDisplayName(props.calendar, props.locale);
});

// 年份轉換和顯示邏輯
interface YearDisplayData {
    gregorianYear: number;        // 西元曆年份（用於內部邏輯）
    displayYear: string;          // 主要顯示文字
    referenceYear?: string;       // 參考年份（西元年）
    showReference: boolean;       // 是否顯示參考年份
    displayWarning: boolean;      // 是否顯示警告
    warningMessage?: string;      // 警告訊息
    isDisabled: boolean;          // 是否禁用
}

// 緩存 DateFormatter 提升性能
const formatterCache = new Map<string, DateFormatter>();

// 獲取或創建 DateFormatter (@internationalized/date 版本)
const getDateFormatter = (calendar: string, locale: string): DateFormatter => {
    const key = `${calendar}-${locale}`;

    if (!formatterCache.has(key)) {
        try {
            const formatter = new DateFormatter(locale, {
                calendar: calendar,
                year: 'numeric'
            });
            formatterCache.set(key, formatter);
        } catch (error) {
            // 回退到基本 formatter
            const fallbackFormatter = new DateFormatter(locale, {
                year: 'numeric'
            });
            formatterCache.set(key, fallbackFormatter);
        }
    }

    return formatterCache.get(key)!;
};

// 使用 DateFormatter 轉換年份顯示
const formatYearWithDateFormatter = (gregorianYear: number): { success: boolean; displayYear: string; hasWarning: boolean } => {
    try {
        // 使用年中日期避免邊界問題
        const gregorianDate = new CalendarDate(gregorianYear, 6, 1);
        const calendarDate = CalendarUtils.safeToCalendar(
            gregorianDate,
            CalendarUtils.createSafeCalendar(props.calendar)
        );

        const formatter = getDateFormatter(props.calendar, props.locale);
        const formattedDate = formatter.format(calendarDate.toDate('UTC'));

        // 提取年份部分（移除可能的其他格式化文字）
        const yearMatch = formattedDate.match(/\d+/);
        const displayYear = yearMatch ? yearMatch[0] : formattedDate;

        // 檢查是否為特殊格式（如"令和6年"需要保留完整文字）
        const hasNonNumeric = /[^\d\s]/.test(formattedDate.replace(/\d+/, ''));
        const finalDisplayYear = hasNonNumeric ? formattedDate : displayYear;

        return {
            success: true,
            displayYear: finalDisplayYear,
            hasWarning: false
        };

    } catch (error) {
        console.warn(`DateFormatter 轉換失敗 ${gregorianYear}:`, error);
        return {
            success: false,
            displayYear: gregorianYear.toString(),
            hasWarning: true
        };
    }
};

//手動轉換邏輯（回退方案）
const manualYearConversion = (gregorianYear: number): { displayYear: string; hasWarning: boolean } => {
    switch (props.calendar) {
        case 'roc': {
            const rocYear = gregorianYear - 1911;
            if (rocYear <= 0) {
                return {
                    displayYear: `民國前${Math.abs(rocYear - 1)}年`,
                    hasWarning: true
                };
            }
            return {
                displayYear: rocYear.toString(),
                hasWarning: false
            };
        }
        case 'buddhist': {
            const buddhistYear = gregorianYear + 543;
            return {
                displayYear: buddhistYear.toString(),
                hasWarning: false
            };
        }
        case 'islamic': {
            // 簡化的伊斯蘭曆轉換（實際更複雜）
            const islamicYear = Math.floor((gregorianYear - 622) * 1.030684);
            return {
                displayYear: islamicYear > 0 ? islamicYear.toString() : gregorianYear.toString(),
                hasWarning: islamicYear <= 0
            };
        }
        default:
            return {
                displayYear: gregorianYear.toString(),
                hasWarning: true
            };
    }
};

// 轉換西元年為顯示資料
const convertYearForDisplay = (gregorianYear: number): YearDisplayData => {
    // 基本資料結構
    const result: YearDisplayData = {
        gregorianYear,
        displayYear: gregorianYear.toString(),
        showReference: false,
        displayWarning: false,
        isDisabled: false
    };

    // 檢查是否在有效範圍內
    if (gregorianYear < CALENDAR_MIN_YEAR.value || gregorianYear > CALENDAR_MAX_YEAR.value) {
        result.isDisabled = true;
        result.warningMessage = `超出${calendarDisplayName.value}支援範圍 (${CALENDAR_MIN_YEAR.value}-${CALENDAR_MAX_YEAR.value})`;
        return result;
    }

    // 西元曆直接顯示
    if (isGregorianCalendar.value) {
        return result;
    }

    // 優先使用 DateFormatter
    const formatterResult = formatYearWithDateFormatter(gregorianYear);

    if (formatterResult.success) {
        result.displayYear = formatterResult.displayYear;
        result.displayWarning = formatterResult.hasWarning;

        // 決定是否顯示參考年份
        const isNumericOnly = /^\d+$/.test(formatterResult.displayYear);
        if (!isNumericOnly) {
            // 如果是"令和6年"這種格式，顯示西元年參考
            result.showReference = true;
            result.referenceYear = gregorianYear.toString();
        }
    } else {
        // 回退到手動轉換
        const manualResult = manualYearConversion(gregorianYear);
        result.displayYear = manualResult.displayYear;
        result.displayWarning = manualResult.hasWarning;

        if (manualResult.hasWarning) {
            result.warningMessage = `無法準確轉換為${calendarDisplayName.value}`;
        }
    }

    // 檢查建議範圍（現在基本上不需要警告，因為範圍已經合理）
    // 保留少量警告邏輯，用於極端情況
    if (props.calendar === 'japanese' && gregorianYear < 1868) {
        result.displayWarning = true;
        result.warningMessage = `早於明治維新 (1868年)`;
    } else if (props.calendar === 'roc' && gregorianYear < 1912) {
        result.displayWarning = true;
        result.warningMessage = `早於民國成立 (1912年)`;
    }

    return result;
};

// 可見年份計算（使用日曆特定範圍）
const visibleYears = computed((): YearDisplayData[] => {
    const start = yearRangeStart.value;
    const years: YearDisplayData[] = [];

    for (let i = 0; i < props.pageSize; i++) {
        const gregorianYear = start + i;

        // 檢查是否超出日曆特定範圍
        if (gregorianYear > CALENDAR_MAX_YEAR.value) break;
        if (gregorianYear < CALENDAR_MIN_YEAR.value) continue;

        const yearData = convertYearForDisplay(gregorianYear);
        years.push(yearData);
    }

    return years;
});

// 範圍顯示文字（直接使用 visibleYears 數據）
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

// 格式化日曆範圍文字（支援年號區間優化）
const formatCalendarRangeText = (firstYear: YearDisplayData, lastYear: YearDisplayData): string => {
    const firstDisplay = firstYear.displayYear;
    const lastDisplay = lastYear.displayYear;

    // 如果只有一個年份
    if (firstYear.gregorianYear === lastYear.gregorianYear) {
        return firstDisplay;
    }

    // 其他日曆系統的處理
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

// 監聽 selectedYear 變化
watch(() => props.selectedYear, (newYear) => {
    // 如果新年份在有效範圍內，正常更新範圍
    if (newYear >= CALENDAR_MIN_YEAR.value && newYear <= CALENDAR_MAX_YEAR.value) {
        const normalStart = Math.floor(newYear / props.pageSize) * props.pageSize;
        const adjustedStart = Math.max(normalStart, CALENDAR_MIN_YEAR.value);

        if (adjustedStart !== yearRangeStart.value) {
            yearRangeStart.value = adjustedStart;
        }
    } else {
        // 如果超出範圍，顯示警告但不更改當前範圍
        console.warn(`選中年份 ${newYear} 超出${calendarDisplayName.value}有效範圍 (${CALENDAR_MIN_YEAR.value}-${CALENDAR_MAX_YEAR.value})`);
    }
});

watch(() => props.calendar, () => {
    // 當日曆系統改變時，重新調整範圍起始值
    const normalStart = Math.floor(props.selectedYear / props.pageSize) * props.pageSize;
    const adjustedStart = Math.max(normalStart, CALENDAR_MIN_YEAR.value);
    yearRangeStart.value = adjustedStart;
});

// 導航控制（使用日曆特定範圍）
const canGoPrevious = computed(() => {
    return yearRangeStart.value > CALENDAR_MIN_YEAR.value;
});

const canGoNext = computed(() => {
    // 確保下一頁至少有一個有效年份
    return yearRangeStart.value + props.pageSize <= CALENDAR_MAX_YEAR.value;
});

const previousYearRange = () => {
    if (!canGoPrevious.value) return;

    const newStart = Math.max(
        yearRangeStart.value - props.pageSize,
        CALENDAR_MIN_YEAR.value
    );
    yearRangeStart.value = newStart;
};

const nextYearRange = () => {
    if (!canGoNext.value) return;

    const newStart = yearRangeStart.value + props.pageSize;
    if (newStart <= CALENDAR_MAX_YEAR.value) {
        yearRangeStart.value = newStart;
    }
};

const selectYear = (gregorianYear: number) => {
    // 雙重檢查確保年份在有效範圍內
    if (gregorianYear < CALENDAR_MIN_YEAR.value || gregorianYear > CALENDAR_MAX_YEAR.value) {
        console.warn(`嘗試選擇超出範圍的年份: ${gregorianYear}`);
        return;
    }

    emit('year-selected', gregorianYear);
    emit('update:showSelector', false);
};

const goToSpecificYear = () => {
    if (!yearInput.value) return;

    const targetGregorianYear = yearInput.value;

    // 檢查日曆特定年份範圍
    if (targetGregorianYear < CALENDAR_MIN_YEAR.value || targetGregorianYear > CALENDAR_MAX_YEAR.value) {
        console.warn(`西元年 ${targetGregorianYear} 超出${calendarDisplayName.value}有效範圍 ${CALENDAR_MIN_YEAR.value}-${CALENDAR_MAX_YEAR.value}`);
        const inputElement = document.querySelector('input[type="number"]') as HTMLInputElement;
        if (inputElement) {
            inputElement.style.borderColor = '#ef4444';
            setTimeout(() => {
                inputElement.style.borderColor = '';
            }, 2000);
        }
        return;
    }

    // 更新範圍起始值
    const normalStart = Math.floor(targetGregorianYear / props.pageSize) * props.pageSize;
    yearRangeStart.value = Math.max(normalStart, CALENDAR_MIN_YEAR.value);

    // 選擇年份
    emit('year-selected', targetGregorianYear);
    emit('update:showSelector', false);
    yearInput.value = null;
};

const goToValidRange = () => {
    let targetYear: number;

    // 決定跳轉到最近的有效年份
    if (props.selectedYear < CALENDAR_MIN_YEAR.value) {
        targetYear = CALENDAR_MIN_YEAR.value;
    } else if (props.selectedYear > CALENDAR_MAX_YEAR.value) {
        targetYear = Math.min(CALENDAR_MAX_YEAR.value, new Date().getFullYear());
    } else {
        // 正常情況下跳到當前年份
        targetYear = Math.max(CALENDAR_MIN_YEAR.value, Math.min(new Date().getFullYear(), CALENDAR_MAX_YEAR.value));
    }

    emit('year-selected', targetYear);
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
    appearance: textfield;
}
</style>
