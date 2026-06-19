<!-- /src/components/calendar/CalendarHeader.vue -->
<template>
    <div class="vdp-cal-header">
        <!-- 上個月按鈕 -->
        <button type="button" @click="previousMonth" class="vdp-cal-nav-btn" aria-label="上個月"
            :disabled="!canNavigatePrevious">
            <DatePickerPrev class="vdp-icon-md" />
        </button>

        <div class="vdp-cal-header-main">
            <!-- 月份選擇器 -->
            <slot name="month-selector" :month-names="monthNames" :selected-month="selectedMonthLocal"
                :on-month-change="onMonthChangeWithValue">
                <select v-model="selectedMonthLocal" @change="onMonthChange" class="vdp-select" aria-label="選擇月份"
                    role="combobox">
                    <option v-for="(month, index) in monthNames" :key="index" :value="index + 1">
                        {{ month }}
                    </option>
                </select>
            </slot>

            <!-- 年份輸入/選擇器 -->
            <div class="vdp-cal-year-wrap">
                <!-- 顯示年份的按鈕 -->
                <slot name="year-selector" :display-year="displayYear" :toggle-year-selector="toggleYearSelector"
                    :show-year-selector="showYearSelector">
                    <button type="button" @click="toggleYearSelector" data-year-selector-button class="vdp-cal-year-btn"
                        aria-label="選擇年份">
                        {{ displayYear }}
                    </button>
                </slot>

                <!-- 年份選擇面板 -->
                <YearSelector :selected-year="gregorianYear" v-model:show-selector="showYearSelector"
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
        <button type="button" @click="nextMonth" class="vdp-cal-nav-btn" aria-label="下個月"
            :disabled="!canNavigateNext">
            <DatePickerNext class="vdp-icon-md" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';
import YearSelector from '../selector/YearSelector.vue';
import { CalendarUtils } from '../../utils/calendarUtils';
import { CalendarDate, DateFormatter, startOfMonth } from '@internationalized/date';

interface Props {
    // §D：原生曆法視圖日期（目標曆法 CalendarDate）
    viewDate: CalendarDate;
    locale?: string;
    minYear?: number;   // 西元年下限
    maxYear?: number;   // 西元年上限
    calendar?: string;
}

const props = withDefaults(defineProps<Props>(), {
    locale: 'en-US',
    minYear: 1900,
    maxYear: 2100,
    calendar: 'gregory',
});

const emit = defineEmits<{
    'update:view-date': [value: CalendarDate];
}>();

const showYearSelector = ref(false);

// 計算當前使用的日曆 ID
const calendarId = computed(() => props.calendar || 'gregory');

// 西元投影：年份系統維持西元（YearSelector / 範圍檢查 / 顯示回退皆以西元年）
const gregorianView = computed(() =>
    CalendarUtils.safeToCalendar(props.viewDate, CalendarUtils.createSafeCalendar('gregory'))
);
const gregorianYear = computed(() => gregorianView.value.year);

// 日曆年份的範圍（西元）
const calendarRange = computed(() => CalendarUtils.getCalendarRange(props.calendar));

// 原生視圖月份（月份下拉選取值）
const selectedMonthLocal = ref(props.viewDate.month);
watch(() => props.viewDate, (vd) => {
    selectedMonthLocal.value = vd.month;
}, { immediate: true });

// 年份顯示（原生年號/年；西元曆直接顯示數字）
const displayYear = computed(() => {
    if (props.calendar === 'gregory') {
        return gregorianYear.value.toString();
    }
    try {
        // 直接格式化原生視圖日期，自動顯示正確年號
        const formatter = new DateFormatter(props.locale, {
            calendar: props.calendar,
            year: 'numeric'
        });
        return formatter.format(props.viewDate.toDate('UTC'));
    } catch (error) {
        return gregorianYear.value.toString();
    }
});

// 月份名稱（曆法感知：原生月數與月名，含希伯來 13 月）
const monthNames = computed(() => {
    return CalendarUtils.getMonthNames(props.locale, props.calendar, props.viewDate);
});

// 以「候選視圖的西元年」判定導航是否超出範圍
const candidateGregorianYear = (monthOffset: number): number => {
    const candidate = monthOffset < 0
        ? props.viewDate.subtract({ months: Math.abs(monthOffset) })
        : props.viewDate.add({ months: monthOffset });
    return CalendarUtils.safeToCalendar(candidate, CalendarUtils.createSafeCalendar('gregory')).year;
};

const canNavigatePrevious = computed(() => candidateGregorianYear(-1) >= calendarRange.value.min);
const canNavigateNext = computed(() => candidateGregorianYear(1) <= calendarRange.value.max);

// 月份切換（原生曆法月份算術，自動處理希伯來 13 月等）
const previousMonth = () => {
    if (!canNavigatePrevious.value) return;
    emit('update:view-date', startOfMonth(props.viewDate.subtract({ months: 1 })));
};

const nextMonth = () => {
    if (!canNavigateNext.value) return;
    emit('update:view-date', startOfMonth(props.viewDate.add({ months: 1 })));
};

// 月份下拉變更（原生月份）
const onMonthChange = () => {
    emit('update:view-date', props.viewDate.set({ month: selectedMonthLocal.value, day: 1 }));
};

const onMonthChangeWithValue = (monthValue?: number) => {
    if (monthValue !== undefined) {
        selectedMonthLocal.value = monthValue;
    }
    onMonthChange();
};

// 年份選擇（YearSelector 發出西元年）→ 維持原生月份，換到該西元年對應的原生月
const onYearSelected = (gYear: number) => {
    if (gYear < calendarRange.value.min || gYear > calendarRange.value.max) return;
    const gMonth = gregorianView.value.month;
    const greg = new CalendarDate(gYear, gMonth, 1);
    const native = props.calendar === 'gregory'
        ? greg
        : CalendarUtils.safeToCalendar(greg, CalendarUtils.createSafeCalendar(props.calendar));
    emit('update:view-date', startOfMonth(native));
};

// 切換年份選擇器
const toggleYearSelector = () => {
    showYearSelector.value = !showYearSelector.value;
};
</script>
