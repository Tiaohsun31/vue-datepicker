<template>
    <div class="container max-w-sm space-y-4 p-5">
        <DatePickerV1></DatePickerV1>
        <div>
            {{ selectedDate }}
            <DatePickerV2 v-model="selectedDate" />
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import DatePickerV1 from '@/DatePickerV1.vue';
import DatePickerV2 from '@/DatePickerV2.vue';

const selectedDate = ref(null);
</script>
