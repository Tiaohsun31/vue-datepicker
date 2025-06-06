<template>
    <div class="flex justify-between items-center mb-4 gap-2">
        <!-- 上個月按鈕 -->
        <button type="button" @click="previousMonth"
            class="p-2 hover:bg-gray-100 text-vdt-content-secondary hover:bg-vdt-interactive-hover rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-theme-500"
            aria-label="上個月">
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
import { CalendarDate, createCalendar, toCalendar } from '@internationalized/date';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';
import YearSelector from './YearSelector.vue';

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
    // 對於非西元曆，在 YearSelector 中處理顯示
    // 這裡保持簡單，只顯示西元年
    return selectedYearLocal.value.toString();
});

// 月份名稱
const monthNames = computed(() => {
    try {
        // 使用 @internationalized/date 創建日曆實例
        console.log('使用的日曆 ID:', calendarId.value);
        const calendar = createCalendar(calendarId.value as any);

        // 創建示例日期來獲取月份名稱
        const formatter = new Intl.DateTimeFormat(props.locale, {
            month: 'long',
            calendar: calendarId.value
        });

        return Array.from({ length: 12 }, (_, i) => {
            // 使用當前年份創建日期
            const date = new CalendarDate(calendar, selectedYearLocal.value, i + 1, 1);

            try {
                // 轉換為 JavaScript Date 來格式化
                const jsDate = date.toDate('UTC');
                return formatter.format(jsDate);
            } catch (error) {
                // 如果轉換失敗，回退到簡單的月份數字
                console.warn(`無法格式化月份 ${i + 1}:`, error);
                return `${i + 1}月`;
            }
        });
    } catch (error) {
        console.warn('月份名稱獲取失敗，使用回退邏輯:', error);

        // 回退到簡單的數字月份
        return Array.from({ length: 12 }, (_, i) => `${i + 1}月`);
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
