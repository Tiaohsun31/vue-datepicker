<template>
    <div class="container mx-auto max-w-sm space-y-4 p-5">
        <div>
            {{ dateTimeutc }}
            <DatePicker v-model="dateTimeutc" date-format="MM/DD/YYYY">
            </DatePicker>
        </div>
        <div>
            <DatePicker v-model="dateTime3" mode="dark">
            </DatePicker>
        </div>
        <div>
            <DateRange v-model="selectedDate"></DateRange>
        </div>
        {{ selectedDate }}
        <div>
            <DateRange v-model="selectedDate" mode="dark"></DateRange>
        </div>
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
import DatePicker from '@/DatePickerV2.vue';
import DateRange from '@/DateRangeV2.vue';
import { start } from 'repl';

// const selectedDate = ref({
//     start: '2025-05-22',
//     end: '2025-05-25',
// });
const selectedDate = ref({
    start: '',
    end: '',
});
const dateTime = ref('2025-05-22 09:23:20');
const dateTime2 = ref('2025-05-22T21:23:20');
const dateTime3 = ref('');
const dateTimeutc = ref('');
</script>
