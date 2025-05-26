<!-- CalendarCell.vue - 增強版支援範圍選擇 -->
<template>
    <div class="calendar-cell text-center relative">
        <!-- 日期按鈕 -->
        <button type="button"
            class="flex justify-center items-center w-8 h-8 rounded-md mx-auto relative z-10 bg-vdt-surface text-vdt-content"
            :class="cellClasses" :disabled="disabled" :tabindex="focusable ? 0 : -1"
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
        'hover:bg-vdt-interactive-hover cursor-pointer': !props.disabled && !props.selected && !props.isRangeStart && !props.isRangeEnd,
        'opacity-40 cursor-not-allowed': props.disabled,
        'text-vdt-content-muted': isOutsideMonth.value && !props.selected && !props.isRangeStart && !props.isRangeEnd,
    };

    // 單一日期選擇模式的樣式
    if (props.selectionMode === 'single') {
        return {
            ...baseClasses,
            'bg-vdt-theme-500 text-white': props.selected,
            'ring-2 ring-vdt-theme-500': props.isToday && !props.selected,
        };
    }

    // 範圍選擇模式的樣式
    if (props.selectionMode === 'range') {
        return {
            ...baseClasses,
            // 範圍起始點和結束點
            'bg-vdt-theme-500 text-white': props.isRangeStart || props.isRangeEnd,
            // 範圍內的日期
            '!bg-vdt-interactive-hover text-white': props.isInRange && !props.isRangeStart && !props.isRangeEnd,
            // 今天的標記（如果不在範圍選擇中）
            'ring-2 ring-vdt-theme-500': props.isToday && !props.isRangeStart && !props.isRangeEnd && !props.isInRange,
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
