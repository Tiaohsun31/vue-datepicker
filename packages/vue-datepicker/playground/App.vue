<template>
    <div>
        <h3>E2E Test區域</h3>
        <div class="space-y-4">
            <!-- 基本日期選擇器 -->
            <DatePicker v-model="dateTime" mode="dark" :required="true" :showTime="true"></DatePicker>

            <!-- 使用 disabled 來禁用日期選擇器 -->
            <DatePicker data-testid="disabled-date-picker" v-model="dateTime2" calendar="japanese" mode="dark"
                :disabled="true" :showTime="true"></DatePicker>

            <!-- 使用roc日期選擇器 -->
            <DatePicker data-testid="roc-date-picker" v-model="rocDate" calendar="roc" locale="zh-TW"
                date-format="ROC-YYYY-MM-DD" time-format="A HH時mm分" />

            <!-- 自定義格式 -->
            {{ dateTime }}
            <DatePicker v-model="dateTime" date-format="DD/MM/YYYY" output-type="custom"></DatePicker>

            <!-- 基本日期範圍選擇器 -->
            <DateRange v-model="selectedDate" :showTime="true" />

            <!-- 帶快捷選項的日期範圍選擇器 -->
            <DateRange data-testid="date-range-with-shortcuts" v-model="selectedDateWithShortcuts" :showShortcuts="true"
                :showTime="true" />

            <!-- 禁用的日期範圍選擇器 -->
            <DateRange data-testid="disabled-date-range" v-model="disabledSelectedDate" :disabled="true" />

            <!-- 有日期限制的日期範圍選擇器 -->
            <DateRange data-testid="constrained-date-range" v-model="constrainedSelectedDate"
                :minDate="new Date('2025-06-01')" :maxDate="new Date('2025-06-30')" />

            <!-- 民國曆日期範圍選擇器 -->
            <DateRange data-testid="roc-date-range" v-model="rocSelectedDate" calendar="roc" locale="zh-TW" />

            <!-- 深色主題日期範圍選擇器 -->
            <DateRange data-testid="dark-date-range" v-model="darkSelectedDate" mode="dark" theme="blue" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DatePicker from '@/DatePicker.vue';
import DateRange from '@/DateRange.vue';

// 民國113年6月15日
const rocDate = ref('民國114年06月18日');
const dateTime = ref(''); // ISO 8601 格式
const dateTime2 = ref('2025-05-22 06:22:12');

// 新增 DateRange 測試變數
const selectedDate = ref({
    start: '',
    end: '',
});

const selectedDateWithShortcuts = ref({
    start: '',
    end: '',
});

const disabledSelectedDate = ref({
    start: '',
    end: '',
});

const constrainedSelectedDate = ref({
    start: '',
    end: '',
});

const rocSelectedDate = ref({
    start: '',
    end: '',
});

const darkSelectedDate = ref({
    start: '',
    end: '',
});
</script>
