<!-- 測試錯誤訊息範例 -->
<template>
    <div class="p-6 space-y-8">

        <!-- 語言切換 -->
        <div class="mb-4">
            <label class="block text-sm font-medium mb-2">測試語言:</label>
            <select v-model="currentLocale" class="border rounded px-3 py-1">
                <option value="zh-TW">繁體中文</option>
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
                <option value="ja-JP">日本語</option>
                <option value="ko-KR">한국어</option>
            </select>
        </div>

        <!-- 測試 DatePicker 錯誤訊息 -->
        <section class="border rounded-lg p-4 bg-gray-50 mb-6">
            <h3 class="font-semibold mb-4">測試 DatePicker 錯誤訊息 ({{ currentLocale }})</h3>

            <!-- 必填測試 -->
            <div class="mb-4">
                <h4 class="font-medium mb-2">必填驗證測試</h4>
                <DatePickerV2 v-model="requiredTest" :locale="currentLocale" :required="true" placeholder="請選擇日期（必填）" />
                <p class="text-sm text-gray-600 mt-1">
                    清空輸入框來測試必填錯誤訊息
                </p>
            </div>

            <!-- 範圍限制測試 -->
            <div class="mb-4">
                <h4 class="font-medium mb-2">日期範圍限制測試</h4>
                <DatePickerV2 v-model="rangeTest" :locale="currentLocale" :min-date="minDate" :max-date="maxDate"
                    placeholder="請選擇日期（限制範圍）" />
                <p class="text-sm text-gray-600 mt-1">
                    允許範圍: {{ minDate }} ~ {{ maxDate }}
                </p>
            </div>

            <!-- 自定義錯誤訊息測試 -->
            <div class="mb-4">
                <h4 class="font-medium mb-2">自定義錯誤訊息測試</h4>
                <DatePickerV2 v-model="customTest" :locale="currentLocale" :required="true"
                    :custom-error-messages="customMessages">
                    <!-- 自定義年份錯誤 -->
                    <template #error-year="{ message }">
                        <div class="flex items-center gap-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                            <span class="text-2xl">⚠️</span>
                            <span class="text-yellow-800 font-medium">自定義年份錯誤: {{ message }}</span>
                        </div>
                    </template>
                </DatePickerV2>
            </div>
        </section>

        <!-- 測試 DateRange 錯誤訊息 -->
        <section class="border rounded-lg p-4 bg-gray-50 mb-6">
            <h3 class="font-semibold mb-4">測試 DateRange 錯誤訊息 ({{ currentLocale }})</h3>

            <!-- 必填測試 -->
            <div class="mb-4">
                <h4 class="font-medium mb-2">範圍必填驗證測試</h4>
                <DateRangeV2 v-model="rangeRequiredTest" :locale="currentLocale" :required="true" />
                <p class="text-sm text-gray-600 mt-1">
                    清空輸入框來測試範圍必填錯誤訊息
                </p>
            </div>

            <!-- 自定義範圍錯誤訊息 -->
            <div class="mb-4">
                <h4 class="font-medium mb-2">自定義範圍錯誤訊息測試</h4>
                <DateRangeV2 v-model="customRangeTest" :locale="currentLocale" :required="true"
                    :custom-error-messages="customMessages">
                    <!-- 自定義開始日期錯誤 -->
                    <template #error-startDate="{ message }">
                        <div class="text-green-600 flex items-center gap-2 p-2 bg-green-50 rounded">
                            <span>🚀</span>
                            <span class="font-medium">開始:</span>
                            <span>{{ message }}</span>
                        </div>
                    </template>

                    <!-- 自定義結束日期錯誤 -->
                    <template #error-endDate="{ message }">
                        <div class="text-blue-600 flex items-center gap-2 p-2 bg-blue-50 rounded">
                            <span>🏁</span>
                            <span class="font-medium">結束:</span>
                            <span>{{ message }}</span>
                        </div>
                    </template>
                </DateRangeV2>
            </div>
        </section>

        <!-- 測試純 DateErrorMessage 組件 -->
        <section class="border rounded-lg p-4 bg-gray-50 mb-6">
            <h3 class="font-semibold mb-4">測試 DateErrorMessage 組件 ({{ currentLocale }})</h3>

            <div class="mb-4">
                <h4 class="font-medium mb-2">模擬錯誤訊息</h4>
                <button @click="toggleTestErrors" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    {{ showTestErrors ? '隱藏' : '顯示' }}測試錯誤
                </button>
            </div>

            <!-- 直接測試 DateErrorMessage -->
            <DateErrorMessage v-if="showTestErrors" :errors="testErrors" :locale="currentLocale"
                :custom-messages="customMessages">
                <!-- 自定義月份錯誤顯示 -->
                <template #error-month="{ message }">
                    <div class="text-orange-600 italic flex items-center gap-1">
                        🗓️ 月份問題: {{ message }}
                    </div>
                </template>
            </DateErrorMessage>
        </section>

        <!-- 偵錯資訊 -->
        <section class="border rounded-lg p-4 bg-blue-50">
            <h3 class="font-semibold mb-4">偵錯資訊</h3>
            <div class="text-sm">
                <p><strong>當前語言:</strong> {{ currentLocale }}</p>
                <p><strong>測試錯誤:</strong> {{ JSON.stringify(testErrors) }}</p>
                <p><strong>自定義訊息:</strong> {{ JSON.stringify(customMessages) }}</p>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import DatePickerV2 from '@/DatePicker.vue';
import DateRangeV2 from '@/DateRange.vue';
import DateErrorMessage from '@/components/calendar/DateErrorMessage.vue';

// 響應式數據
const currentLocale = ref('en-US');
const requiredTest = ref(null);
const rangeTest = ref(null);
const customTest = ref(null);
const rangeRequiredTest = ref(null);
const customRangeTest = ref(null);
const showTestErrors = ref(false);

// 日期範圍限制
const minDate = '2024-01-01';
const maxDate = '2024-12-31';

// 自定義錯誤訊息
const customMessages = {
    '請輸入年份': '🎯 年份欄位必填',
    'Please enter year': '🎯 Year field is required',
    '請選擇開始日期': '🚀 開始日期必須選擇',
    'Please select start date': '🚀 Start date must be selected',
    '請選擇結束日期': '🏁 結束日期必須選擇',
    'Please select end date': '🏁 End date must be selected'
};

// 測試錯誤數據
const testErrors = ref({
    year: '請輸入年份',
    month: '月份必須是 1-12 之間的數字',
    day: '日期必須是 1-31 之間的數字',
    time: '請選擇時間'
});

// 切換測試錯誤顯示
function toggleTestErrors() {
    showTestErrors.value = !showTestErrors.value;

    // 根據語言更新測試錯誤
    if (currentLocale.value === 'en-US') {
        testErrors.value = {
            year: 'Please enter year',
            month: 'Month must be between 1-12',
            day: 'Day must be between 1-31',
            time: 'Please select a time'
        };
    } else {
        testErrors.value = {
            year: '請輸入年份',
            month: '月份必須是 1-12 之間的數字',
            day: '日期必須是 1-31 之間的數字',
            time: '請選擇時間'
        };
    }
}

// 監聽語言變化，更新測試錯誤
watch(currentLocale, (newLocale) => {
    if (showTestErrors.value) {
        toggleTestErrors();
        toggleTestErrors(); // 觸發兩次來更新語言
    }
});
</script>
