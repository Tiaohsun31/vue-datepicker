<template>
    <div v-if="hasErrors" class="mt-1 text-sm text-red-500 font-medium">
        <div v-if="Array.isArray(errors)">
            <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
        </div>
        <div v-else-if="typeof errors === 'string'">{{ errors }}</div>
        <div v-else-if="typeof errors === 'object'">
            <div v-for="(error, key) in errors" :key="key">{{ error }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// 錯誤類型可以是字串、陣列或物件
type ErrorField = 'year' | 'month' | 'day' | 'date';
type ErrorsType = string | string[] | Partial<Record<ErrorField, string>>;

interface Props {
    errors?: ErrorsType;
}

const props = defineProps<Props>();

// 檢查是否有錯誤
const hasErrors = computed(() => {
    if (!props.errors) return false;

    if (Array.isArray(props.errors)) {
        return props.errors.length > 0;
    }

    if (typeof props.errors === 'string') {
        return props.errors.trim().length > 0;
    }

    if (typeof props.errors === 'object') {
        return Object.values(props.errors).some(error => error?.trim().length > 0);
    }

    return false;
});
</script>
