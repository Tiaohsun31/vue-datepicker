<template>
    <div class="container mx-auto p-4 space-y-6">
        <div>
            <!-- <DatePicker v-model="dateTimeutc" date-format="MM/DD/YYYY">
            </DatePicker> -->
            {{ rocDate }}
            <DatePicker v-model="rocDate" calendar="roc" date-format="ROC-YYYY-MM-DD" locale="zh-TW"
                @change="handleDateChange" />
        </div>
        <!-- <div>
            <DatePicker v-model="dateTime2" mode="dark">
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
</DatePicker>
</div> -->
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
        <div>
            <DateRange v-model="selectedDate"></DateRange>
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
const rocDate = ref('');
const dateTime = ref('');
const dateTime2 = ref('');
const dateTime3 = ref('');
const dateTimeutc = ref('');
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
    console.log('日期變更:', date);
};
</script>
