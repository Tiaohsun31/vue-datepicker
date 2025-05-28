<!-- 使用範例 -->
<template>
    <div class="space-y-8">

        <!-- 1. 基本使用（使用內建i18n） -->
        <div class="example-section">
            <h3>基本使用 - 內建i18n</h3>
            <DatePickerV2 v-model="basicDate" locale="en-US" />
        </div>

        <!-- 2. 完全自定義錯誤訊息 -->
        <div class="example-section">
            <h3>自定義錯誤訊息</h3>
            <DatePickerV2 v-model="customDate">
                <template #error="{ errors }">
                    <DateErrorMessage :errors="errors" :use-i18n="false" :custom-messages="customErrorMessages">
                        <!-- 完全自定義年份錯誤 -->
                        <template #error-year="{ message }">
                            <div class="flex items-center gap-2 p-2 bg-red-50 rounded">
                                <Icon name="warning" class="text-red-500" />
                                <span class="text-red-700">年份問題：{{ message }}</span>
                            </div>
                        </template>

                        <!-- 自定義月份錯誤 -->
                        <template #error-month="{ message }">
                            <div class="text-orange-600 italic">
                                🗓️ {{ message }}
                            </div>
                        </template>
                    </DateErrorMessage>
                </template>
            </DatePickerV2>
        </div>

        <!-- 3. 混合使用：部分i18n + 部分自定義 -->
        <div class="example-section">
            <h3>混合模式</h3>
            <DatePickerV2 v-model="mixedDate" locale="ja-JP">
                <template #error="{ errors }">
                    <DateErrorMessage :errors="errors" :custom-messages="partialCustomMessages"
                        :message-key-map="keyMapping">
                        <!-- 只自定義特定欄位的顯示 -->
                        <template #error-day="{ message, field }">
                            <div class="border-l-4 border-red-500 pl-3">
                                <strong>日期輸入錯誤:</strong> {{ message }}
                            </div>
                        </template>
                    </DateErrorMessage>
                </template>
            </DatePickerV2>
        </div>

        <!-- 4. 日期範圍的錯誤處理 -->
        <div class="example-section">
            <h3>日期範圍錯誤</h3>
            <DateRangeV2 v-model="rangeDate" locale="ko-KR">
                <template #error="{ errors }">
                    <DateErrorMessage :errors="errors">
                        <!-- 範圍錯誤的特殊處理 -->
                        <template #error-startDate="{ message }">
                            <div class="text-red-600">開始: {{ message }}</div>
                        </template>

                        <template #error-endDate="{ message }">
                            <div class="text-red-600">結束: {{ message }}</div>
                        </template>

                        <!-- 自定義整個錯誤容器 -->
                        <template #error-container="{ errors }">
                            <div class="bg-red-50 border border-red-200 rounded-lg p-3">
                                <div class="flex items-center gap-2 mb-2">
                                    <Icon name="alert-triangle" class="text-red-500" />
                                    <span class="font-medium text-red-800">日期範圍錯誤</span>
                                </div>
                                <div class="space-y-1">
                                    <div v-for="(error, field) in errors" :key="field" class="text-sm text-red-700">
                                        • {{ error }}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </DateErrorMessage>
                </template>
            </DateRangeV2>
        </div>

        <!-- 5. 動態語言切換 -->
        <div class="example-section">
            <h3>動態語言切換</h3>
            <div class="mb-4">
                <label class="block text-sm font-medium mb-2">選擇語言:</label>
                <select v-model="currentLocale" class="border rounded px-3 py-1">
                    <option value="zh-TW">繁體中文</option>
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                    <option value="ko-KR">한국어</option>
                </select>
            </div>
            <DatePickerV2 v-model="dynamicDate" :locale="currentLocale" />
        </div>

        <!-- 6. 企業級自定義 -->
        <div class="example-section">
            <h3>企業級自定義錯誤處理</h3>
            <DatePickerV2 v-model="enterpriseDate" @validation="handleValidation">
                <template #error="{ errors }">
                    <!-- 使用自定義的企業錯誤組件 -->
                    <EnterpriseErrorDisplay :errors="errors" :error-code="errorCode" :support-info="supportInfo"
                        @error-reported="handleErrorReport" />
                </template>
            </DatePickerV2>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { localeManager, type LocaleKey } from '@/locale/index';

// 基本數據
const basicDate = ref(null);
const customDate = ref(null);
const mixedDate = ref(null);
const rangeDate = ref(null);
const dynamicDate = ref(null);
const enterpriseDate = ref(null);
const currentLocale = ref<LocaleKey>('zh-TW');
const errorCode = ref('');

// 完全自定義的錯誤訊息
const customErrorMessages = {
    '請輸入年份': '年份欄位不能空白，請輸入4位數年份',
    '請輸入月份': '月份欄位必填，範圍1-12',
    '請輸入日期': '日期欄位必填，範圍1-31',
    '年份必須是 1900-2100 之間的數字': '年份超出範圍！請輸入1900到2100之間的年份',
    '月份必須是 1-12 之間的數字': '月份錯誤！請輸入1到12之間的數字',
    // 可以添加更多自定義訊息...
};

// 部分自定義訊息（與i18n混合使用）
const partialCustomMessages = {
    '無效的日期': '您輸入的日期格式不正確，請重新輸入',
    'Invalid date': 'The date format you entered is incorrect'
};

// 錯誤鍵值映射到i18n路徑
const keyMapping = {
    'dateRequired': 'date.required',
    'timeRequired': 'time.required',
    'yearOutOfRange': 'year.outOfRange',
    'monthOutOfRange': 'month.outOfRange',
    'dayOutOfRange': 'day.outOfRange'
};

// 企業級支援資訊
const supportInfo = {
    helpUrl: 'https://example.com/help/datepicker',
    contactEmail: 'support@example.com',
    ticketSystem: 'https://support.example.com'
};

// 處理驗證事件
function handleValidation(isValid: boolean, errors: Record<string, string>) {
    if (!isValid) {
        console.log('驗證失敗:', errors);

        // 生成錯誤代碼
        errorCode.value = `ERR_${Date.now().toString(36).toUpperCase()}`;

        // 可以在這裡發送錯誤日志到後端
        // logErrorToServer(errors, errorCode.value);
    }
}

// 處理錯誤回報
function handleErrorReport(errorData: any) {
    console.log('用戶回報錯誤:', errorData);
    // 發送到錯誤追蹤系統
}

// 監聽語言變化，動態設置locale
watch(currentLocale, (newLocale) => {
    localeManager.setLocale(newLocale);
});

// 添加自定義語言包（如果需要）
onMounted(() => {
    // 可以動態添加或覆蓋語言包
    localeManager.addCustomMessages('zh-TW', {
        date: {
            required: '請選擇一個日期', // 覆蓋預設訊息
            customError: '這是自定義的錯誤訊息' // 添加新的錯誤類型
        }
    });
});
</script>
