<template>
    <div class="calendar-grid w-full max-w-xs bg-white rounded-lg shadow p-2">
        <!-- 月份導航和選擇器 -->
        <CalendarHeader v-model:month="currentMonth" v-model:year="currentYear" :locale="locale" :min-year="minYear"
            :max-year="maxYear" />

        <!-- 星期列 -->
        <WeekdayHeader :locale="locale" :week-starts-on="weekStartsOn" />

        <!-- 日期網格 -->
        <DateGridView :year="currentYear" :month="currentMonth" :selected-date="ensureCalendarDate(selectedDate)"
            :min-date="minDate" :max-date="maxDate" :locale="locale" :week-starts-on="weekStartsOn"
            @select="handleSelect" />
    </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { CalendarDate } from '@internationalized/date';
import CalendarHeader from './CalendarHeader.vue';
import WeekdayHeader from './WeekdayHeader.vue';
import DateGridView from './DateGridView.vue';
import { ensureCalendarDate, getTodaysDate } from '@/utils/dateUtils';

interface Props {
    value: CalendarDate | null;
    minDate?: CalendarDate;
    maxDate?: CalendarDate;
    locale?: string;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.
}

const props = withDefaults(defineProps<Props>(), {
    locale: 'en-US',
    weekStartsOn: 0,
    minDate: undefined,
    maxDate: undefined
});

const emit = defineEmits<{
    select: [date: CalendarDate]
}>();

// 當前顯示的月份和年份
const currentYear = ref<number>(
    props.value ? props.value.year : getTodaysDate().year
);
const currentMonth = ref<number>(
    props.value ? props.value.month : getTodaysDate().month
);

// 選擇的日期
const selectedDate = ref<CalendarDate | null>(props.value);

// 可選的年份範圍（根據minDate和maxDate設定）
const minYear = computed(() => props.minDate?.year || 1900);
const maxYear = computed(() => props.maxDate?.year || 2100);

// 監聽外部傳入的值
watch(() => props.value, (newValue) => {
    selectedDate.value = newValue;
    if (newValue) {
        currentYear.value = newValue.year;
        currentMonth.value = newValue.month;
    }
}, { immediate: true });

// 處理日期選擇
const handleSelect = (date: CalendarDate) => {
    selectedDate.value = date;
    emit('select', date);
};
</script>
