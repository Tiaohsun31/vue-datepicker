<!-- CalendarCell.vue -->
<template>
    <div class="calendar-cell text-center relative">
        <!-- 日期按鈕 -->
        <button type="button" class="calendar-cell-button" :class="cellClasses" :disabled="disabled"
            :tabindex="focusable ? 0 : -1" :aria-selected="selected || isRangeStart || isRangeEnd"
            :aria-disabled="disabled" :aria-current="isToday ? 'date' : undefined"
            :data-in-current-month="!isOutsideMonth" @click="handleSelect" @keydown.enter="handleSelect"
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
    const classes: Record<string, boolean> = {};

    // 基礎樣式
    classes['flex justify-center items-center w-8 h-8 rounded-md mx-auto relative z-10'] = true;

    // 禁用狀態
    if (props.disabled) {
        classes['opacity-40 cursor-not-allowed'] = true;
        classes['bg-vdt-surface text-vdt-content'] = true;
        return classes;
    }

    // 範圍選擇模式
    if (props.selectionMode === 'range') {
        // 範圍起始點和結束點
        if (props.isRangeStart || props.isRangeEnd) {
            classes['bg-vdt-theme-500 text-white'] = true;
        }
        // 範圍內的日期
        else if (props.isInRange) {
            classes['bg-vdt-outline text-vdt-content'] = true;
        }
        // 預設狀態
        else {
            classes['bg-vdt-surface text-vdt-content'] = true;
            classes['hover:bg-vdt-interactive-hover cursor-pointer'] = true;
        }

        // 今天的標記（範圍選擇模式）
        if (props.isToday && !props.isRangeStart && !props.isRangeEnd && !props.isInRange) {
            classes['ring-2 ring-vdt-theme-500'] = true;
        }
    }
    // 單一日期選擇模式
    else {
        if (props.selected) {
            classes['bg-vdt-theme-500 text-white'] = true;
        } else {
            classes['bg-vdt-surface text-vdt-content'] = true;
            classes['hover:bg-vdt-interactive-hover cursor-pointer'] = true;
        }

        // 今天的標記（單一選擇模式）
        if (props.isToday && !props.selected) {
            classes['ring-2 ring-vdt-theme-500'] = true;
        }
    }

    // 月外日期的文字顏色
    if (isOutsideMonth.value && !props.selected && !props.isRangeStart && !props.isRangeEnd) {
        classes['text-vdt-content-muted'] = true;
        // 移除預設文字顏色
        classes['text-vdt-content'] = false;
    }

    return classes;
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
/* 範圍選擇時的特殊效果 */
.calendar-cell-button[data-in-current-month="false"] {
    opacity: 0.6;
}

/* 今天的日期特殊標記 */
.calendar-cell-button[aria-current="date"]:not(.bg-vdt-theme-500) {
    position: relative;
}

.calendar-cell-button[aria-current="date"]:not(.bg-vdt-theme-500)::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background-color: var(--color-vdt-theme-500);
    border-radius: 50%;
}
</style>
