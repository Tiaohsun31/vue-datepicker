<template>
    <div class="p-6 max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-6">Vue 日期時間選擇器示例</h1>

        <div class="mb-6">
            <h2 class="text-lg font-medium mb-3">基本日期時間選擇器</h2>
            <DateTimePicker v-model="dateTime1" @change="onChange" />
            <div class="mt-2 text-gray-600">
                選擇的值: {{ dateTimeToString(dateTime1) }}
            </div>
        </div>

        <div class="mb-6">
            <h2 class="text-lg font-medium mb-3">僅顯示日期</h2>
            <DateTimePicker v-model="dateTime2" :show-time="false" />
            <div class="mt-2 text-gray-600">
                選擇的值: {{ dateTimeToString(dateTime2) }}
            </div>
        </div>

        <div class="mb-6">
            <h2 class="text-lg font-medium mb-3">啟用秒</h2>
            <DateTimePicker v-model="dateTime3" :enable-seconds="true" />
            <div class="mt-2 text-gray-600">
                選擇的值: {{ dateTimeToString(dateTime3, true) }}
            </div>
        </div>

        <div class="mb-6">
            <h2 class="text-lg font-medium mb-3">12小時制</h2>
            <DateTimePicker v-model="dateTime4" :use24Hour="false" />
            <div class="mt-2 text-gray-600">
                選擇的值: {{ dateTimeToString(dateTime4, false, false) }}
            </div>
        </div>

        <div class="mb-6">
            <h2 class="text-lg font-medium mb-3">不同風格主題</h2>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <button v-for="color in themeColors" :key="color" @click="activeTheme = color"
                    class="py-1 px-2 rounded text-sm"
                    :class="`bg-${color}-100 text-${color}-800 border border-${color}-300`">
                    {{ color }}
                </button>
            </div>
            <DateTimePicker v-model="dateTime5" :theme="activeTheme" />
            <div class="mt-2 text-gray-600">
                選擇的值: {{ dateTimeToString(dateTime5) }}
            </div>
        </div>

        <div class="mb-6">
            <h2 class="text-lg font-medium mb-3">帶日期範圍限制</h2>
            <DateTimePicker v-model="dateTime6" :min-date="minDate" :max-date="maxDate" />
            <div class="mt-2 text-gray-600">
                選擇的值: {{ dateTimeToString(dateTime6) }}
            </div>
            <div class="mt-1 text-xs text-gray-500">
                限制範圍: {{ formatDate(minDate) }} 至 {{ formatDate(maxDate) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate, CalendarDateTime, toCalendarDateTime } from '@internationalized/date';
import dayjs from 'dayjs';
import DateTimePicker from '@/DatePickerV3.vue'
import { formatCalendarDateToString, formatCalendarDateTimeToString } from '@/utils/dateUtils';

// 初始化日期時間值
const dateTime1 = ref(null);
const dateTime2 = ref(null);
const dateTime3 = ref(null);
const dateTime4 = ref(null);
const dateTime5 = ref(null);
const dateTime6 = ref(null);

// 日期範圍
const today = new Date();
const minDate = new CalendarDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate() - 5
);
const maxDate = new CalendarDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate() + 10
);

// 主題顏色
const themeColors = ['blue', 'green', 'red', 'purple', 'orange', 'pink', 'teal', 'indigo'];
const activeTheme = ref('blue');

// 輔助函數 - 格式化日期為可讀字符串
const formatDate = (date: CalendarDate | null): string => {
    if (!date) return '無日期';
    return formatCalendarDateToString(date);
};

// 輔助函數 - 將CalendarDateTime轉換為可讀字符串
const dateTimeToString = (dateTime: CalendarDateTime | null, includeSeconds = false, use24Hour = true): string => {
    if (!dateTime) return '未選擇';

    const dateStr = formatCalendarDateToString(dateTime);
    let timeFormat = use24Hour ? 'HH:mm' : 'hh:mm A';
    if (includeSeconds) timeFormat += ':ss';

    const time = dayjs().hour(dateTime.hour).minute(dateTime.minute).second(dateTime.second);
    const timeStr = time.format(timeFormat);

    return `${dateStr} ${timeStr}`;
};

// 處理值變化事件
const onChange = (value: CalendarDateTime | null) => {
    console.log('日期時間變更:', value);
    console.log('格式化後:', dateTimeToString(value, true));
};
</script>
