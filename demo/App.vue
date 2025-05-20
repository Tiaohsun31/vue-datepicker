<template>
    <div class="container mx-auto max-w-sm space-y-4 p-5">
        <DatePickerV1></DatePickerV1>
        <div>
            {{ selectedDate }}
            <DatePickerV2 v-model="selectedDate" />
        </div>
        <div>
            {{ dateTime }}
            <!-- <DatePickerV3 v-model="dateTime"></DatePickerV3> -->
        </div>
        <div>
            {{ dateTimeutc }}
            <DatePickerV5 v-model="dateTimeutc" date-format="MM/DD/YYYY"></DatePickerV5>
        </div>
        <!-- <RouterView /> -->
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DatePickerV1 from '@/DatePickerV1.vue';
import DatePickerV2 from '@/DatePickerV2.vue';
// import DatePickerV4 from '@/DatePickerV4.vue';
import DatePickerV5 from '@/DatePickerV5.vue';

const selectedDate = ref(null);

const dateTime = ref('2025-05-22 09:23:20');
const dateTime2 = ref('2025-05-22T21:23:20');
const dateTime3 = ref('2025-05-22T09:23:20+08:00');
const dateTimeutc = ref('');
</script>
