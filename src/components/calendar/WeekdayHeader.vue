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
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.
}

const props = withDefaults(defineProps<Props>(), {
    locale: 'en-US',
    weekStartsOn: 0
});

// 根據 locale 獲取星期名稱
const weekdayNames = computed(() => {
    const formatter = new Intl.DateTimeFormat(props.locale, { weekday: 'short' });
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + props.weekStartsOn));

    return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(firstDay);
        day.setDate(firstDay.getDate() + i);
        return formatter.format(day);
    });
});
</script>
