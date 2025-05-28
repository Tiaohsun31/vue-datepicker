<!-- 企業級錯誤顯示組件範例 -->
<template>
    <div v-if="hasErrors" class="enterprise-error-container">
        <div class="error-header">
            <Icon name="alert-circle" class="error-icon" />
            <div class="error-title">輸入驗證失敗</div>
            <div v-if="errorCode" class="error-code">錯誤代碼: {{ errorCode }}</div>
        </div>

        <div class="error-content">
            <div v-for="(error, field) in errors" :key="field" class="error-item">
                <span class="error-field">{{ getFieldName(field) }}:</span>
                <span class="error-message">{{ error }}</span>
            </div>
        </div>

        <div class="error-actions">
            <button @click="showHelp" class="help-button">
                <Icon name="help-circle" />
                查看說明
            </button>
            <button @click="reportError" class="report-button">
                <Icon name="bug" />
                回報問題
            </button>
        </div>

        <!-- 技術支援資訊 -->
        <div v-if="showSupportInfo" class="support-info">
            <h4>需要協助？</h4>
            <ul>
                <li><a :href="supportInfo.helpUrl" target="_blank">查看線上說明文件</a></li>
                <li><a :href="`mailto:${supportInfo.contactEmail}`">聯絡技術支援</a></li>
                <li><a :href="supportInfo.ticketSystem" target="_blank">提交支援票券</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
interface EnterpriseErrorProps {
    errors?: Record<string, string>;
    errorCode?: string;
    supportInfo?: {
        helpUrl: string;
        contactEmail: string;
        ticketSystem: string;
    };
}

const props = defineProps<EnterpriseErrorProps>();
const emit = defineEmits<{
    'error-reported': [data: any];
}>();

const showSupportInfo = ref(false);

const hasErrors = computed(() => {
    return props.errors && Object.keys(props.errors).length > 0;
});

function getFieldName(field: string): string {
    const fieldNames: Record<string, string> = {
        year: '年份',
        month: '月份',
        day: '日期',
        date: '日期',
        time: '時間',
        startDate: '開始日期',
        endDate: '結束日期'
    };
    return fieldNames[field] || field;
}

function showHelp() {
    showSupportInfo.value = !showSupportInfo.value;
}

function reportError() {
    const errorData = {
        errors: props.errors,
        errorCode: props.errorCode,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };

    emit('error-reported', errorData);
}
</script>

<style scoped>
.enterprise-error-container {
    @apply border border-red-200 rounded-lg bg-red-50 p-4 space-y-3;
}

.error-header {
    @apply flex items-center gap-2 pb-2 border-b border-red-200;
}

.error-icon {
    @apply text-red-500 w-5 h-5;
}

.error-title {
    @apply font-semibold text-red-800;
}

.error-code {
    @apply text-xs text-red-600 ml-auto font-mono;
}

.error-content {
    @apply space-y-1;
}

.error-item {
    @apply text-sm;
}

.error-field {
    @apply font-medium text-red-700;
}

.error-message {
    @apply text-red-600 ml-1;
}

.error-actions {
    @apply flex gap-2 pt-2;
}

.help-button,
.report-button {
    @apply inline-flex items-center gap-1 px-3 py-1 text-xs bg-white border border-red-300 rounded text-red-700 hover:bg-red-100 transition-colors;
}

.support-info {
    @apply bg-white rounded border border-red-200 p-3;
}

.support-info h4 {
    @apply font-medium text-red-800 mb-2;
}

.support-info ul {
    @apply space-y-1;
}

.support-info a {
    @apply text-red-600 hover:text-red-800 text-sm underline;
}
</style>
