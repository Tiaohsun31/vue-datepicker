<template>
    <div class="calendar-cell text-center">
        <button type="button" :class="cellClasses" :disabled="disabled" :tabindex="focusable ? 0 : -1"
            :aria-selected="selected" :aria-disabled="disabled" :aria-current="isToday ? 'date' : undefined"
            @click="handleSelect" @keydown.enter="handleSelect" @keydown.space="handleSelect"
            @keydown.up="emit('nav', 'up')" @keydown.down="emit('nav', 'down')" @keydown.left="emit('nav', 'left')"
            @keydown.right="emit('nav', 'right')">
            {{ date.day }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CalendarDate } from '@internationalized/date';

interface Props {
    date: CalendarDate;
    currentMonth: number;
    selected: boolean;
    disabled?: boolean;
    isToday?: boolean;
    focusable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    isToday: false,
    focusable: false
});

const emit = defineEmits<{
    select: [date: CalendarDate];
    nav: [direction: 'up' | 'down' | 'left' | 'right'];
}>();

const isOutsideMonth = computed(() => {
    return props.date.month !== props.currentMonth;
});

// 計算單元格樣式，使用 Tailwind CSS 類別
const cellClasses = computed(() => {
    return {
        'flex justify-center items-center w-8 h-8 rounded-md mx-auto bg-vdt-surface text-vdt-content': true,
        'hover:bg-vdt-theme-100 hover:text-vdt-theme-700 cursor-pointer': !props.disabled,
        'bg-vdt-theme-500 text-white hover:bg-vdt-theme-300': props.selected,
        'ring-2 ring-vdt-theme-500 -ring-offset-1': props.isToday && !props.selected,
        'text-vdt-content-muted': isOutsideMonth.value && !props.selected,
        'opacity-40 cursor-not-allowed': props.disabled,
    };
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
