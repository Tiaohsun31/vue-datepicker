<template>
    <DateRange v-model="dateRange" :show-shortcuts="true">
        <!-- 自定義快捷選項 -->
        <template #shortcuts="{ applyShortcut, currentRange }">
            <!-- 自定義按鈕 -->
            <button type="button"
                class="px-3 py-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-sm transition-colors"
                @click="applyShortcut({
                    label: '本季',
                    start: getQuarterStart(),
                    end: getQuarterEnd()
                })">
                本季
            </button>

            <button type="button"
                class="px-3 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded-sm transition-colors"
                @click="applyShortcut({
                    label: '去年同期',
                    start: getLastYearSamePeriodStart(),
                    end: getLastYearSamePeriodEnd()
                })">
                去年同期
            </button>

            <!-- 或者使用下拉選單 -->
            <select class="px-2 py-1 text-xs border border-gray-300 rounded-sm" @change="handleCustomShortcut">
                <option value="">選擇時間範圍</option>
                <option value="ytd">年初至今</option>
                <option value="custom-period">自定義期間</option>
            </select>
        </template>
    </DateRange>
</template>

<script setup>
import { ref } from 'vue';

const dateRange = ref(null);

const getQuarterStart = () => {
    // 計算本季開始日期的邏輯
    const now = new Date();
    const quarter = Math.floor(now.getMonth() / 3);
    return new Date(now.getFullYear(), quarter * 3, 1);
};

const getQuarterEnd = () => {
    // 計算本季結束日期的邏輯
    const now = new Date();
    const quarter = Math.floor(now.getMonth() / 3);
    return new Date(now.getFullYear(), quarter * 3 + 3, 0);
};

const handleCustomShortcut = (event) => {
    const value = event.target.value;
    if (value === 'ytd') {
        applyShortcut({
            label: '年初至今',
            start: new Date(new Date().getFullYear(), 0, 1),
            end: new Date()
        });
    }
    // 處理其他自定義選項...
};
</script>
