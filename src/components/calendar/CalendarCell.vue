<!-- CalendarCell.vue - 增強版支援範圍選擇 -->
<template>
    <div class="calendar-cell text-center relative">
        <!-- 範圍背景 -->
        <div v-if="isInRange && selectionMode === 'range'" class="absolute inset-0 bg-vdt-theme-100 opacity-50" :class="{
            'rounded-l-md': isRangeStart,
            'rounded-r-md': isRangeEnd,
            'rounded-md': isRangeStart && isRangeEnd
        }"></div>

        <!-- 日期按鈕 -->
        <button type="button" :class="cellClasses" :disabled="disabled" :tabindex="focusable ? 0 : -1"
            :aria-selected="selected || isRangeStart || isRangeEnd" :aria-disabled="disabled"
            :aria-current="isToday ? 'date' : undefined" @click="handleSelect" @keydown.enter="handleSelect"
            @keydown.space="handleSelect" @keydown.up="emit('nav', 'up')" @keydown.down="emit('nav', 'down')"
            @keydown.left="emit('nav', 'left')" @keydown.right="emit('nav', 'right')">
            {{ date.day }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CalendarDate } from '@internationalized/date';

type SelectionMode = 'single' | 'range';

interface Props {
    date: CalendarDate;
    currentMonth: number;
    selected?: boolean;
    disabled?: boolean;
    isToday?: boolean;
    focusable?: boolean;

    // 範圍選擇相關屬性
    selectionMode?: SelectionMode;
    isRangeStart?: boolean;
    isRangeEnd?: boolean;
    isInRange?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    selected: false,
    disabled: false,
    isToday: false,
    focusable: false,
    selectionMode: 'single',
    isRangeStart: false,
    isRangeEnd: false,
    isInRange: false
});

const emit = defineEmits<{
    select: [date: CalendarDate];
    nav: [direction: 'up' | 'down' | 'left' | 'right'];
}>();

const isOutsideMonth = computed(() => {
    return props.date.month !== props.currentMonth;
});

// 計算單元格樣式，支援範圍選擇
const cellClasses = computed(() => {
    const baseClasses = {
        'flex justify-center items-center w-8 h-8 rounded-md mx-auto relative z-10': true,
        'bg-vdt-surface text-vdt-content': true,
        'hover:bg-vdt-interactive-hover cursor-pointer': !props.disabled && !props.selected && !props.isRangeStart && !props.isRangeEnd,
        'opacity-40 cursor-not-allowed': props.disabled,
        'text-vdt-content-muted': isOutsideMonth.value && !props.selected && !props.isRangeStart && !props.isRangeEnd,
    };

    // 單一日期選擇模式的樣式
    if (props.selectionMode === 'single') {
        return {
            'bg-vdt-theme-500 text-white': props.selected,
            'ring-2 ring-vdt-theme-500 ring-offset-1': props.isToday && !props.selected,
            ...baseClasses,
        };
    }

    // 範圍選擇模式的樣式
    if (props.selectionMode === 'range') {
        return {
            ...baseClasses,
            // 範圍起始點和結束點
            'bg-vdt-theme-500 text-white': props.isRangeStart || props.isRangeEnd,
            // 範圍內的日期
            'bg-vdt-theme-200 text-vdt-theme-800': props.isInRange && !props.isRangeStart && !props.isRangeEnd,
            // 今天的標記（如果不在範圍選擇中）
            'ring-2 ring-vdt-theme-500 ring-offset-1': props.isToday && !props.isRangeStart && !props.isRangeEnd && !props.isInRange,
        };
    }

    return baseClasses;
});

/**
 * 處理日期選擇事件
 */
const handleSelect = () => {
    if (!props.disabled) {
        emit('select', props.date);
    }
};
</script>

<style scoped>
/* 範圍連接線效果 */
.calendar-cell {
    position: relative;
}

/* 範圍內日期的連接效果 */
.calendar-cell:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2rem;
    transform: translateY(-50%);
    z-index: 0;
}

/* 當該日期在範圍內時顯示連接背景 */
.calendar-cell[data-in-range="true"]:before {
    background-color: var(--color-vdt-theme-100);
    opacity: 0.3;
}

/* 範圍開始日期的連接效果 */
.calendar-cell[data-range-start="true"]:before {
    left: 50%;
}

/* 範圍結束日期的連接效果 */
.calendar-cell[data-range-end="true"]:before {
    right: 50%;
}

/* 單獨選中一天時不顯示連接 */
.calendar-cell[data-range-start="true"][data-range-end="true"]:before {
    display: none;
}
</style>
