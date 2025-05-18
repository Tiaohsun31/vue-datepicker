<template>
    <div class="flex justify-between items-center mb-4 gap-2">
        <button type="button" @click="previousMonth"
            class="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-primary-500"
            aria-label="上個月">
            <DatePickerPrev class="h-5 w-5" />
        </button>

        <div class="grow grid grid-cols-2 gap-2">
            <!-- 月份選擇器 -->
            <select v-model="selectedMonthLocal" @change="onMonthChange"
                class="form-select py-1 pl-2 w-full border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-vdt-primary-500"
                aria-label="選擇月份" role="combobox">
                <option v-for="(month, index) in monthNames" :key="index" :value="index + 1">
                    {{ month }}
                </option>
            </select>

            <!-- 年份輸入/選擇器 -->
            <div class="relative">
                <!-- 顯示年份的按鈕 -->
                <button type="button" @click="toggleYearSelector" data-year-selector-button
                    class="inline-flex items-center px-2 py-1 w-full border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-vdt-primary-500"
                    aria-label="選擇年份">
                    {{ selectedYearLocal }}
                </button>

                <!-- 年份選擇面板 -->
                <YearSelector :selected-year="selectedYearLocal" v-model:show-selector="showYearSelector"
                    :min-year="minYear" :max-year="maxYear" @year-selected="onYearSelected" />
            </div>
        </div>

        <button type="button" @click="nextMonth"
            class="p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-vdt-primary-500"
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

interface Props {
    month: number;
    year: number;
    locale?: string;
    minYear?: number;
    maxYear?: number;
}

const props = withDefaults(defineProps<Props>(), {
    locale: 'en-US',
    minYear: 1900,
    maxYear: 2100
});

const emit = defineEmits<{
    'update:month': [value: number];
    'update:year': [value: number];
}>();

// 本地響應式數據
const selectedMonthLocal = ref(props.month);
const selectedYearLocal = ref(props.year);
const showYearSelector = ref(false);

// 監聽props的變化
watch(() => props.month, (newMonth) => {
    selectedMonthLocal.value = newMonth;
}, { immediate: true });

watch(() => props.year, (newYear) => {
    selectedYearLocal.value = newYear;
}, { immediate: true });

// 產生月份名稱列表
const monthNames = computed(() => {
    const formatter = new Intl.DateTimeFormat(props.locale, { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => {
        const date = new Date(2000, i, 1);
        return formatter.format(date);
    });
});

// 切換到上個月
const previousMonth = () => {
    let newMonth = selectedMonthLocal.value - 1;
    let newYear = selectedYearLocal.value;

    if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
    }

    // 確保年份在允許範圍內
    if (newYear < props.minYear) {
        newYear = props.minYear;
        newMonth = 1;
    }

    updateDate(newMonth, newYear);
};

// 切換到下個月
const nextMonth = () => {
    let newMonth = selectedMonthLocal.value + 1;
    let newYear = selectedYearLocal.value;

    if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
    }

    // 確保年份在允許範圍內
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

// 更新日期並發送更新事件
const updateDate = (month: number, year: number) => {
    selectedMonthLocal.value = month;
    selectedYearLocal.value = year;

    emit('update:month', month);
    emit('update:year', year);
};

// 切換年份選擇器的顯示狀態
const toggleYearSelector = () => {
    showYearSelector.value = !showYearSelector.value;
};
</script>

<style scoped>
/* 取消Select箭頭 (適用於大多數瀏覽器) */
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

/* 取消IE的Select箭頭 */
select::-ms-expand {
    display: none;
}
</style>
