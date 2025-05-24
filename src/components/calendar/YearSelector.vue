<template>

    <div v-if="showSelector" ref="yearSelectorRef"
        class="absolute top-full mt-1  right-0 w-56 max-h-72 overflow-y-auto bg-vdt-surface-elevated text-vdt-content border border-vdt-outline rounded-md shadow-lg z-20 overflow-hidden">
        <!-- 年份選擇器頂部導航 -->
        <div class="p-2 flex items-center justify-between border-b border-vdt-outline">
            <button type="button" @click="previousYearRange"
                class="p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none" aria-label="previous year">
                <DatePickerPrev class="h-4 w-4" />
            </button>
            <span class="text-sm font-medium">
                {{ yearRangeStart }} - {{ yearRangeStart + 19 }}
            </span>
            <button type="button" @click="nextYearRange"
                class="p-1 hover:bg-vdt-interactive-hover rounded focus:outline-none" aria-label="next year">
                <DatePickerNext class="h-4 w-4" />
            </button>
        </div>
        <!-- 年份網格 -->
        <div class="grid grid-cols-4 gap-1 p-2">
            <button v-for="year in visibleYearRange" :key="year" @click="selectYear(year)" :class="[
                'p-1 text-sm rounded focus:outline-none focus:ring-1 focus:ring-vdt-theme-500',
                selectedYear === year ? 'bg-vdt-theme-500 text-white' : 'hover:bg-vdt-interactive-hover text-vdt-content'
            ]">
                {{ year }}
            </button>
        </div>
        <!-- 年份跳轉輸入 -->
        <div class="p-2 border-t border-vdt-outline">
            <input type="number" v-model="yearInput" @keydown.enter="goToSpecificYear" placeholder="跳至年份..."
                class="w-full p-1 text-sm border border-vdt-outline bg-vdt-surface text-vdt-content rounded focus:outline-none focus:ring-2 focus:ring-vdt-theme-200 focus-within:ring-vdt-theme-500" />
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import DatePickerPrev from '../icons/DatePickerPrev.vue';
import DatePickerNext from '../icons/DatePickerNext.vue';

interface Props {
    selectedYear: number;
    showSelector: boolean;
    minYear?: number;
    maxYear?: number;
    pageSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
    minYear: 1900,
    maxYear: 2100,
    pageSize: 12  // 每頁顯示的年份數量
});

const emit = defineEmits<{
    'year-selected': [year: number];
    'update:showSelector': [value: boolean];
}>();

// 年份選擇器 DOM引用和跳轉輸入
const yearSelectorRef = ref<HTMLElement | null>(null);
const yearInput = ref<number | null>(null);

// 計算當前年份範圍的起始年
const yearRangeStart = ref(Math.floor(props.selectedYear / props.pageSize) * props.pageSize);

// 當selectedYear變化時，更新yearRangeStart以確保選中的年份在可見範圍內
watch(() => props.selectedYear, (newYear) => {
    const startOfCurrentRange = Math.floor(newYear / props.pageSize) * props.pageSize;
    if (startOfCurrentRange !== yearRangeStart.value) {
        yearRangeStart.value = startOfCurrentRange;
    }
});

// 產生可見的年份範圍
const visibleYearRange = computed(() => {
    const start = yearRangeStart.value;
    const years = [];

    // 生成pageSize個年份，但確保不超過最大年份限制
    for (let i = 0; i < props.pageSize; i++) {
        const year = start + i;
        if (year <= props.maxYear) {
            years.push(year);
        }
    }

    return years;
});

// 顯示上一頁年份
const previousYearRange = () => {
    // 確保不會小於最小年份
    const newStart = Math.max(yearRangeStart.value - props.pageSize, props.minYear);
    if (newStart !== yearRangeStart.value) {
        yearRangeStart.value = newStart;
    }
};

// 顯示下一頁年份
const nextYearRange = () => {
    // 確保不會超過最大年份
    const newStart = yearRangeStart.value + props.pageSize;
    if (newStart <= props.maxYear) {
        yearRangeStart.value = newStart;
    }
};

// 選擇特定年份
const selectYear = (year: number) => {
    emit('year-selected', year);
    emit('update:showSelector', false);
};

// 跳轉到特定年份
const goToSpecificYear = () => {
    if (yearInput.value) {
        // 確保年份在允許的範圍內
        const year = Math.max(Math.min(yearInput.value, props.maxYear), props.minYear);

        // 更新年份範圍起始值以包含該年份
        yearRangeStart.value = Math.floor(year / props.pageSize) * props.pageSize;

        // 觸發年份選擇事件
        emit('year-selected', year);
        emit('update:showSelector', false);
        yearInput.value = null;
    }
};

// 處理點擊外部關閉年份選擇器
const handleClickOutside = (event: MouseEvent) => {
    if (props.showSelector && yearSelectorRef.value) {
        const target = event.target as Element;

        // 如果點擊在年份選擇器外部，則關閉選擇器
        // 這裡需要檢查點擊是否在年份選擇器按鈕上，如果是，不關閉
        const isYearButton = !!target.closest('[data-year-selector-button]');

        if (!yearSelectorRef.value.contains(target) && !isYearButton) {
            emit('update:showSelector', false);
        }
    }
};

// 添加和清理全局點擊事件監聽器
onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>
