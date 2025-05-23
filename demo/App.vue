<template>
    <div class="container mx-auto max-w-sm space-y-4 p-5">

        <!-- <DatePickerV1></DatePickerV1> -->
        <div>
            {{ selectedDate }}
            <!-- <DatePickerV2 v-model="selectedDate" /> -->
        </div>
        <div>
            {{ dateTime }}
            <!-- <DatePickerV3 v-model="dateTime"></DatePickerV3> -->
        </div>
        <div>
            {{ dateTimeutc }}
            <DatePickerV5 v-model="dateTimeutc" date-format="MM/DD/YYYY" theme="oklch(89.7% 0.196 126.665)">
            </DatePickerV5>
        </div>
        <div class="bg-vdt-surface text-vdt-content border-vdt-outline ">1234</div>

        <div class="bg-vdt-surface text-vdt-content border-vdt-outline ">
            aaaaa
        </div>

        <div data-vdt-mode="dark">
            <div class="bg-vdt-surface text-vdt-content border-vdt-outline ">
                bbb
            </div>
        </div>
        <div class="dark">
            <div class="bg-red-500 text-black dark:bg-black dark:text-white  ">
                沒有變化
            </div>
        </div>
        <div data-vdt-mode="dark">
            <div class="bg-red-500 text-black dark:bg-black dark:text-white  ">
                沒有變化
            </div>
        </div>
        <div data-vdt-mode="light">
            <div class="bg-red-500 text-black dark:bg-black dark:text-white ">
                沒有變化
            </div>
        </div>
        <div data-vdt-mode="dark">
            <div class="bg-vdt-surface text-vdt-content dark:bg-vdt-surface dark:text-vdt-content  ">
                沒有變化
            </div>
        </div>
        <div data-vdt-mode="light">
            <div class="bg-vdt-surface text-vdt-content dark:bg-vdt-surface dark:text-vdt-content  ">
                沒有變化
            </div>
        </div>
        <div data-vdt-mode="dark">
            <div
                class="text-vdt-light-content bg-vdt-light-surface dark:text-vdt-dark-content dark:bg-vdt-dark-surface">
                可以變化
            </div>
        </div>
        <div class="dark" data-vdt-mode="dark">
            <div
                class="text-vdt-dark-content bg-vdt-dark-surface dark:text-vdt-light-content dark:bg-vdt-light-surface">
                可以變化
            </div>
        </div>

        <div class="text-vdt-light-content bg-vdt-light-surface dark:text-vdt-dark-content dark:bg-vdt-dark-surface">
            可以變化
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
// import DatePickerV5 from '@/DatePickerV5.vue';

const selectedDate = ref(null);

const dateTime = ref('2025-05-22 09:23:20');
const dateTime2 = ref('2025-05-22T21:23:20');
const dateTime3 = ref('2025-05-22T09:23:20+08:00');
const dateTimeutc = ref('');
</script>
