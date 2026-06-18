<!-- components/calendar/CalendarCell.vue -->
<template>
    <div class="vdp-cell">
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

// 計算單元格樣式，支援範圍選擇（語義 modifier class，樣式在 components.css）
const cellClasses = computed(() => {
    const classes: Record<string, boolean> = { 'vdp-cell-btn': true };

    // 禁用狀態（底色/文字由 .vdp-cell-btn 提供）
    if (props.disabled) {
        classes['vdp-cell-btn--disabled'] = true;
        return classes;
    }

    const isEndpoint = props.isRangeStart || props.isRangeEnd;
    const isSelectedSingle = props.selectionMode === 'single' && props.selected;
    const isWithinRange = props.selectionMode === 'range' && props.isInRange;

    if (isEndpoint || isSelectedSingle) {
        // 範圍端點 / 單選選中：主色底
        classes['vdp-cell-btn--selected'] = true;
    } else if (isWithinRange) {
        // 範圍內（非端點）
        classes['vdp-cell-btn--in-range'] = true;
    } else {
        // 預設：可點擊 + hover
        classes['vdp-cell-btn--clickable'] = true;
    }

    // 今天標記（未選中 / 不在範圍時）
    if (props.isToday && !isEndpoint && !isSelectedSingle && !isWithinRange) {
        classes['vdp-cell-btn--today'] = true;
    }

    // 月外日期的文字顏色
    if (isOutsideMonth.value && !props.selected && !isEndpoint) {
        classes['vdp-cell-btn--muted'] = true;
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
.calendar-cell-button[aria-current="date"]:not([aria-selected="true"]) {
    position: relative;
}

.calendar-cell-button[aria-current="date"]:not([aria-selected="true"])::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background-color: var(--color-vdp-primary);
    border-radius: 50%;
}
</style>
