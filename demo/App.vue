<template>
    <div class="container mx-auto p-4 space-y-6">
        <div>
            {{ dateTime }}
            <DatePicker v-model="dateTime" locale="en-US">
                <!-- <template #year-display="{ yearData, isSelected }">
                    <div class="custom-year-display">
                        <div :class="['font-bold', isSelected ? 'text-white' : 'text-blue-600']">
                            {{ yearData.displayYear }}
                        </div>
                        <div v-if="yearData.showReference" class="text-xs opacity-70">
                            ({{ yearData.referenceYear }})
                        </div>
                    </div>
                </template> -->
            </DatePicker>
            <!-- {{ rocDate }}
            <DatePicker v-model="rocDate" calendar="roc" locale="zh-TW" date-format="ROC-YYYY-MM-DD"
                time-format="A HH時mm分" @change="handleDateChange" /> -->
            <!-- {{ dateTime3.toLocaleDateString('zh-TW') }} -->
            {{ dateTime3 }}
            <DatePicker v-model="rocDate" calendar="roc" output-type="custom" mode="dark" @change="handleDateChange"
                time-format="A HH時mm分" />
            <!-- <DatePicker v-model="dateTime3" calendar="japanese" mode="dark"></DatePicker> -->

            <!-- date-format="ROC-YYYY-MM-DD" time-format="A HH時mm分" -->
            <!--
            {{ dayjs(dateTime).format('YYYY-MM-DDTHH:mm:ss') }} -->
        </div>
        <div>
            {{ dateTime2 }}
            <!-- <DatePicker v-model="dateTime2" mode="dark" output-type="custom" date-format="DD/MM/YYYY" locale="zh-TW">
                <template #error="{ errors }">
                    <div v-if="Object.keys(errors).length > 0" class="mt-2 p-3 bg-red-100 border-l-4 border-red-500">
                        <h4 class="font-bold text-red-800">輸入錯誤：</h4>
                        <ul class="list-disc list-inside text-red-700 text-sm">
                            <li v-for="(error, field) in errors" :key="field">
                                {{ getFieldName(field as string) }}: {{ error }}
                            </li>
                        </ul>
                    </div>
                </template>
</DatePicker> -->
        </div>
        <div>
            {{ selectedDate }}
            <DateRange v-model="selectedDate" calendar="roc" output-type="custom"></DateRange>
        </div>
        <!-- <div>
            <DatePicker v-model="dateTime3">
                <template #error-year="{ message, field, originalKey }">自定義年份錯誤
                    {{ message }}
                    {{ field }}
                    {{ originalKey }}
                </template>
                <template #error-month="{ message, field, fieldType }">
                    <div class="custom-month-error">
                        月份錯誤: {{ message }} {{ field }} {{ fieldType }}
                    </div>
                </template>
            </DatePicker>
        </div> -->
        <!-- <div>
            <DatePicker v-model="dateTime" locale="zh-TW" @validation="handleValidation" :showErrorMessage="false">
            </DatePicker>
        </div>
        <div>
            <h3>3. 部分自定義錯誤顯示</h3>
            <DatePicker v-model="partialCustomDate" :customErrorMessages="myCustomMessages">

            </DatePicker>
        </div>

        {{ selectedDate }}
        <div>
            <DateRange v-model="selectedDate" mode="dark"></DateRange>
        </div> -->
        <!-- <RouterView /> -->


    </div>
    <!-- <ScopeTheme></ScopeTheme> -->
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate, getWeeksInMonth } from '@internationalized/date';
import dayjs from 'dayjs';
// import ScopeTheme from './views/ScopeTheme.vue';
// import DatePickerV1 from '@/DatePickerV1.vue';
// import DatePickerV2 from '@/DatePickerV2.vue';
// import DatePickerV4 from '@/DatePickerV4.vue';
import DatePicker from '@/DatePicker.vue';
import DateRange from '@/DateRange.vue';
const validationErrors = ref<string[]>([]);
// const selectedDate = ref({
//     start: '2025-05-22',
//     end: '2025-05-25',
// });
const selectedDate = ref({
    start: '',
    end: '',
});
const rocDate = ref('民國114年06月18日 上午 02時48分');
const dateTime = ref('1868-09-22 12:22:12'); // ISO 8601 格式
const dateTime2 = ref('2025-05-22 06:22:12');
const dateTime3 = ref('1868-09-22 06:22:12');
const dateTimeutc = ref('2022-01-01T12:00:00.000Z'); // UTC 時間格式
const partialCustomDate = ref();
const fieldNames = {
    year: '年份',
    month: '月份',
    day: '日期',
    date: '日期',
    time: '時間'
};
function getFieldName(field: string): string {
    return fieldNames[field as keyof typeof fieldNames] || field;
}
function handleValidation(isValid: boolean, errors: Record<string, string>) {
    if (!isValid) {
        validationErrors.value = Object.values(errors);
    } else {
        validationErrors.value = [];
    }

    console.log('Validation errors:', validationErrors.value);
}

const myCustomMessages = {
    '請輸入年份': '年份不能空白喔！',
    '請輸入月份': '別忘了月份',
    '請輸入日期': '日期也要填寫'
};

const handleDateChange = (date: any) => {
    // console.log('日期變更:', date);
};

const date1868_09 = new CalendarDate('japanese', 1868, 9, 1);
const date1868_10 = new CalendarDate('japanese', 1868, 10, 1);

console.log('1868年9月1日:', date1868_09);
console.log('1868年10月1日:', date1868_10);

// 檢查週的計算
const weeksIn1868_09 = getWeeksInMonth(date1868_09, 'ja-JP');
const weeksIn1868_10 = getWeeksInMonth(date1868_10, 'ja-JP');

console.log('1868年9月的週數:', weeksIn1868_09);
console.log('1868年10月的週數:', weeksIn1868_10);
</script>
