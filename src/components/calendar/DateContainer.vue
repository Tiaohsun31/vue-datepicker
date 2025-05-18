<template>
    <div class="relative w-full date-input-container">
        <!-- 輸入框容器 -->
        <div class="flex w-full items-center px-2 py-1 border border-gray-200 rounded-sm focus-within:ring-2 ring-vdt-primary-200 focus-within:ring-vdt-primary-500 focus-within:border-transparent transition-all duration-200"
            :class="{ 'border-red-400 ring-2 ring-red-200': hasErrors }">
            <slot></slot>
        </div>

        <!-- 錯誤訊息插槽 -->
        <slot name="error"></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// 錯誤類型可以是字串、陣列或物件
type ErrorsType = string | string[] | Record<string, string>;

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

<style scoped>
/* 錯誤動畫 */
@keyframes errorShake {

    0%,
    100% {
        transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(-2px);
    }

    20%,
    40%,
    60%,
    80% {
        transform: translateX(2px);
    }
}
</style>
