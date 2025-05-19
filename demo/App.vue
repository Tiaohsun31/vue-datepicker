<template>
    <div class="container mx-auto max-w-sm space-y-4 p-5">
        <DatePickerV1></DatePickerV1>
        <div>
            {{ selectedDate }}
            <DatePickerV2 v-model="selectedDate" />
        </div>
        <div>
            {{ dateTime }}
            <DatePickerV3 v-model="dateTime"></DatePickerV3>
        </div>
        <div>
            {{ dateTime2 }}
            <DatePickerV4 v-model="dateTime2"></DatePickerV4>
        </div>
        <!-- <RouterView /> -->
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DatePickerV1 from '@/DatePickerV1.vue';
import DatePickerV2 from '@/DatePickerV2.vue';
import DatePickerV3 from '@/DatePickerV3.vue';
import DatePickerV4 from '@/DatePickerV4.vue';

const selectedDate = ref(null);

const dateTime = ref(null);
const dateTime2 = ref(null);
</script>
