<template>
    <div class="grid grid-cols-7 mb-2">
        <div v-for="(day, i) in weekdayNames" :key="i" class="text-center text-vdt-content text-sm py-2">
            {{ day }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    calendar?: string;
}

const props = withDefaults(defineProps<Props>(), {
    locale: 'en-US',
    weekStartsOn: 0,
    calendar: 'gregory'
});

// 根據 locale 獲取星期名稱
const weekdayNames = computed(() => {
    const formatter = new Intl.DateTimeFormat(props.locale, {
        weekday: 'short',
        calendar: props.calendar
    });

    // 使用固定的週日日期作為基準 (2023-01-01 是週日)
    const baseDate = new Date(2023, 0, 1);

    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + ((i + props.weekStartsOn) % 7));
        return formatter.format(date);
    });
});
</script>
