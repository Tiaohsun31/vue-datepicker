<template>
    <div class="time-grid p-3 w-full max-w-xs">
        <!-- 時間選擇器頭部 -->
        <div class="text-center mb-2">
            <h3 class="text-base font-medium text-gray-700">選擇時間</h3>
        </div>

        <!-- 時、分、秒選擇器和AM/PM切換 -->
        <div class="grid grid-cols-3 gap-2  text-sm">
            <!-- 小時選擇 -->
            <div class="time-column">
                <div class="time-header py-2 text-center font-medium bg-gray-50 rounded-t-md">
                    小時
                </div>
                <div class="time-list h-48 overflow-y-auto border border-gray-200 rounded-b-md">
                    <button v-for="hour in hourOptions" :key="`hour-${hour}`" type="button" @click="selectHour(hour)"
                        class="w-full py-2 px-3 text-center transition-colors duration-150" :class="[
                            selectedHour === hour ? 'bg-vdt-primary-500 text-white' : 'hover:bg-vdt-primary-100',
                        ]">
                        {{ formatHour(hour) }}
                    </button>
                </div>
            </div>

            <!-- 分鐘選擇 -->
            <div class="time-column">
                <div class="time-header py-2 text-center font-medium bg-gray-50 rounded-t-md">
                    分鐘
                </div>
                <div class="time-list h-48 overflow-y-auto border border-gray-200 rounded-b-md">
                    <button v-for="minute in minuteOptions" :key="`minute-${minute}`" type="button"
                        @click="selectMinute(minute)"
                        class="w-full py-2 px-3 text-center transition-colors duration-150" :class="[
                            selectedMinute === minute ? 'bg-vdt-primary-500 text-white' : 'hover:bg-vdt-primary-100',
                        ]">
                        {{ formatNumber(minute) }}
                    </button>
                </div>
            </div>

            <!-- 秒鐘選擇 -->
            <div class="time-column">
                <div class="time-header py-2 text-center font-medium bg-gray-50 rounded-t-md">
                    秒鐘
                </div>
                <div class="time-list h-48 overflow-y-auto border border-gray-200 rounded-b-md">
                    <button v-for="second in secondOptions" :key="`second-${second}`" type="button"
                        @click="selectSecond(second)"
                        class="w-full py-2 px-3 text-center transition-colors duration-150" :class="[
                            selectedSecond === second ? 'bg-vdt-primary-500 text-white' : 'hover:bg-vdt-primary-100',
                        ]">
                        {{ formatNumber(second) }}
                    </button>
                </div>
            </div>
        </div>

        <!-- AM/PM 切換按鈕 (12小時制) -->
        <div v-if="!use24Hour" class="mt-3 flex justify-center">
            <div class="flex rounded-md overflow-hidden border  text-sm border-gray-200">
                <button type="button" @click="setPeriod('AM')"
                    class="px-4 py-2 transition-colors duration-150 cursor-pointer" :class="[
                        period === 'AM'
                            ? 'bg-vdt-primary-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-vdt-primary-100'
                    ]">
                    AM
                </button>
                <button type="button" @click="setPeriod('PM')"
                    class="px-4 py-2 transition-colors duration-150 cursor-pointer" :class="[
                        period === 'PM'
                            ? 'bg-vdt-primary-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-vdt-primary-100'
                    ]">
                    PM
                </button>
            </div>
        </div>

        <!-- 按鈕區域 -->
        <div class="flex justify-between mt-4">
            <button type="button" @click="setNow"
                class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-150">
                現在
            </button>
            <button type="button" @click="confirm"
                class="px-3 py-1 text-sm bg-vdt-primary-500 text-white hover:bg-vdt-primary-600 rounded-md transition-colors duration-150">
                確定
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';

interface Props {
    value?: string | null;
    enableSeconds?: boolean;
    use24Hour?: boolean;
    locale?: string;
}

const props = withDefaults(defineProps<Props>(), {
    value: null,
    enableSeconds: true,
    use24Hour: false,
    locale: 'zh-TW',
});

const emit = defineEmits<{
    'select': [time: string];
}>();

// 小時選項
const hourOptions = computed(() => {
    return props.use24Hour
        ? Array.from({ length: 24 }, (_, i) => i)
        : Array.from({ length: 12 }, (_, i) => i + 1);
});

// 分鐘選項 (完整 0-59)
const minuteOptions = computed(() => {
    return Array.from({ length: 60 }, (_, i) => i);
});

// 秒鐘選項 (完整 0-59)
const secondOptions = computed(() => {
    return Array.from({ length: 60 }, (_, i) => i);
});

// 選中的值
const selectedHour = ref<number | null>(null);
const selectedMinute = ref<number | null>(null);
const selectedSecond = ref<number | null>(null);
const period = ref<'AM' | 'PM'>('AM');

// 監聽外部值變化
watch(() => props.value, (newValue) => {
    if (newValue) {
        const [hoursStr, minutes, seconds] = newValue.split(':');
        let hours = parseInt(hoursStr);

        if (!props.use24Hour) {
            if (hours >= 12) {
                period.value = 'PM';
                hours = hours === 12 ? 12 : hours - 12;
            } else {
                period.value = 'AM';
                hours = hours === 0 ? 12 : hours;
            }
        }

        selectedHour.value = hours;
        selectedMinute.value = parseInt(minutes) || 0;
        selectedSecond.value = parseInt(seconds) || 0;
    }
}, { immediate: true });

// 格式化數字為兩位數
const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
};

// 格式化小時 (只顯示數字，不帶AM/PM)
const formatHour = (hour: number): string => {
    return formatNumber(hour);
};

// 設置時間段
const setPeriod = (newPeriod: 'AM' | 'PM') => {
    period.value = newPeriod;
};

// 選擇小時
const selectHour = (hour: number) => {
    selectedHour.value = hour;
    scrollToSelected();
};

// 選擇分鐘
const selectMinute = (minute: number) => {
    selectedMinute.value = minute;
    scrollToSelected();
};

// 選擇秒鐘
const selectSecond = (second: number) => {
    selectedSecond.value = second;
    scrollToSelected();
};

// 設置為當前時間
const setNow = () => {
    const now = new Date();
    const currentHour = now.getHours();

    if (props.use24Hour) {
        selectedHour.value = currentHour;
    } else {
        period.value = currentHour >= 12 ? 'PM' : 'AM';
        selectedHour.value = currentHour % 12 || 12;
    }

    selectedMinute.value = now.getMinutes();
    selectedSecond.value = now.getSeconds();

    scrollToSelected();
};

// 確認選擇
const confirm = () => {
    // 確保有選中的值
    if (selectedHour.value === null) {
        selectedHour.value = props.use24Hour ? 0 : 1;
    }
    if (selectedMinute.value === null) {
        selectedMinute.value = 0;
    }
    if (selectedSecond.value === null) {
        selectedSecond.value = 0;
    }

    // 轉換為24小時制
    let hour = selectedHour.value;
    if (!props.use24Hour) {
        if (period.value === 'PM' && hour < 12) {
            hour += 12;
        } else if (period.value === 'AM' && hour === 12) {
            hour = 0;
        }
    }

    const hourStr = formatNumber(hour);
    const minuteStr = formatNumber(selectedMinute.value);
    const secondStr = formatNumber(selectedSecond.value);

    const timeString = `${hourStr}:${minuteStr}:${secondStr}`;
    emit('select', timeString);
};

// 滾動到選定的選項
const scrollToSelected = () => {
    nextTick(() => {
        const columns = document.querySelectorAll('.time-column .time-list');

        if (columns[0] && selectedHour.value !== null) {
            const selectedEl = columns[0].querySelector(`.bg-vdt-primary-500`);
            if (selectedEl) {
                selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        if (columns[1] && selectedMinute.value !== null) {
            const selectedEl = columns[1].querySelector(`.bg-vdt-primary-500`);
            if (selectedEl) {
                selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        if (columns[2] && selectedSecond.value !== null) {
            const selectedEl = columns[2].querySelector(`.bg-vdt-primary-500`);
            if (selectedEl) {
                selectedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
};

// 初始化時設定為當前時間（如果沒有提供值）
onMounted(() => {
    if (!props.value) {
        setNow();
    } else {
        scrollToSelected();
    }
});
</script>

<style scoped>
.time-list {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.time-list::-webkit-scrollbar {
    width: 4px;
}

.time-list::-webkit-scrollbar-track {
    background: transparent;
}

.time-list::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 4px;
}
</style>
