<template>
    <div class="demo-page bg-gray-50 min-h-screen p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">DatePicker 局部主題示例</h1>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- 左側：網頁全域保持淺色 -->
            <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">
                    網頁內容（全域淺色主題）
                </h2>
                <p class="text-gray-600 mb-4">
                    這些內容保持在全域的淺色主題中，不會受到 DatePicker 主題設置的影響。
                </p>

                <!-- 第一個 DatePicker：跟隨系統偏好 -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        DatePicker 1 - 跟隨系統偏好（auto）
                    </label>
                    <DatePickerV5 v-model="date1" theme="blue" :dark-mode="'auto'" placeholder="選擇日期時間" />
                </div>

                <!-- 第二個 DatePicker：強制深色模式 -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        DatePicker 2 - 強制深色模式
                    </label>
                    <DatePickerV5 v-model="date2" theme="green" :dark-mode="true" placeholder="選擇日期時間" />
                </div>

                <!-- 第三個 DatePicker：強制淺色模式 -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        DatePicker 3 - 強制淺色模式
                    </label>
                    <DatePickerV5 v-model="date3" theme="purple" :dark-mode="false" placeholder="選擇日期時間" />
                </div>
            </div>

            <!-- 右側：動態控制區域 -->
            <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">
                    動態控制區域
                </h2>

                <!-- 主題控制 -->
                <div class="mb-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-3">可控制的 DatePicker</h3>

                    <!-- 控制面板 -->
                    <div class="space-y-4 mb-4">
                        <!-- 顏色選擇 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                主題顏色
                            </label>
                            <div class="flex flex-wrap gap-2">
                                <button v-for="color in availableColors" :key="color" @click="currentTheme = color"
                                    :class="[
                                        'w-8 h-8 rounded-full border-2 transition-transform hover:scale-110',
                                        currentTheme === color ? 'border-gray-900 scale-110' : 'border-gray-300'
                                    ]" :style="{ backgroundColor: getColorPreview(color) }" :title="color" />
                            </div>
                        </div>

                        <!-- 模式選擇 -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                深淺模式
                            </label>
                            <div class="flex gap-2">
                                <button @click="currentMode = 'auto'" :class="[
                                    'px-3 py-2 rounded text-sm font-medium transition-colors',
                                    currentMode === 'auto'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]">
                                    跟隨系統
                                </button>
                                <button @click="currentMode = false" :class="[
                                    'px-3 py-2 rounded text-sm font-medium transition-colors',
                                    currentMode === false
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]">
                                    強制淺色
                                </button>
                                <button @click="currentMode = true" :class="[
                                    'px-3 py-2 rounded text-sm font-medium transition-colors',
                                    currentMode === true
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]">
                                    強制深色
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 可控制的 DatePicker -->
                    <DatePickerV5 v-model="date4" :theme="currentTheme" :dark-mode="currentMode"
                        placeholder="可控制的日期時間選擇器" />
                </div>

                <!-- 狀態顯示 -->
                <div class="mt-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-3">當前設置</h3>
                    <div class="bg-gray-50 p-4 rounded">
                        <p><strong>主題顏色：</strong>{{ currentTheme }}</p>
                        <p><strong>模式設置：</strong>{{ getModeText(currentMode) }}</p>
                        <p><strong>系統偏好：</strong>{{ systemPreference }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部說明 -->
        <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-blue-900 mb-2">重要說明</h3>
            <ul class="text-blue-800 space-y-1">
                <li>• 每個 DatePicker 組件都有獨立的主題設置，不會互相影響</li>
                <li>• 網頁的全域樣式保持不變，只有 DatePicker 內部會根據設置變化</li>
                <li>• <code>dark-mode="auto"</code> 會跟隨用戶的系統偏好</li>
                <li>• <code>dark-mode={true|false}</code> 會強制設置為指定模式</li>
                <li>• 主題顏色支援 Tailwind 顏色名、HEX 值、OKLCH 值</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DatePickerV5 from '@/DatePickerV5.vue'; // 假設這是你的日期選擇器組件
import type { TailwindColor } from '@/types/main';

// 日期值
const date1 = ref<string | null>(null);
const date2 = ref<string | null>(null);
const date3 = ref<string | null>(null);
const date4 = ref<string | null>(null);

// 主題控制
const currentTheme = ref<TailwindColor>('violet');
const currentMode = ref<boolean | 'auto'>('auto');
const systemPreference = ref<'light' | 'dark'>('light');

// 可選顏色
const availableColors: TailwindColor[] = [
    'red', 'orange', 'amber', 'yellow', 'lime', 'green',
    'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo',
    'violet', 'purple', 'fuchsia', 'pink', 'rose'
];

// 獲取顏色預覽
const getColorPreview = (color: TailwindColor): string => {
    const colorMap: Record<TailwindColor, string> = {
        red: '#ef4444',
        orange: '#f97316',
        amber: '#f59e0b',
        yellow: '#eab308',
        lime: '#84cc16',
        green: '#22c55e',
        emerald: '#10b981',
        teal: '#14b8a6',
        cyan: '#06b6d4',
        sky: '#0ea5e9',
        blue: '#3b82f6',
        indigo: '#6366f1',
        violet: '#8b5cf6',
        purple: '#a855f7',
        fuchsia: '#d946ef',
        pink: '#ec4899',
        rose: '#f43f5e',
        slate: '#64748b',
        gray: '#6b7280',
        zinc: '#71717a',
        neutral: '#737373',
        stone: '#78716c'
    };

    return colorMap[color] || '#8b5cf6';
};

// 獲取模式文字
const getModeText = (mode: boolean | 'auto'): string => {
    if (mode === 'auto') return '跟隨系統';
    if (mode === true) return '強制深色';
    if (mode === false) return '強制淺色';
    return '未知';
};

// 檢測系統偏好
onMounted(() => {
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        systemPreference.value = mediaQuery.matches ? 'dark' : 'light';

        mediaQuery.addEventListener('change', (e) => {
            systemPreference.value = e.matches ? 'dark' : 'light';
        });
    }
});
</script>
