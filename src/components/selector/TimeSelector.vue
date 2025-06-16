<template>
    <div v-if="show">
        <hr class="my-2 border-vdt-outline" />
        <div class="flex flex-row items-center justify-between">
            <label class="text-sm font-medium text-vdt-content uppercase">
                {{ getPlaceholderMessage('general.time') }}:
            </label>
            <div class="flex flex-row items-center gap-1">
                <button type="button" @click="setNowTime"
                    class="px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover cursor-pointer">
                    Now
                </button>
                <button v-if="selectionMode === 'single'" type="button" @click="emitTodayEvent"
                    class="px-2 py-1 text-xs transition-colors rounded-sm bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover cursor-pointer">
                    Today
                </button>
            </div>
        </div>
        <div class="time-selector-container pt-1">
            <!-- 簡化版時間選擇器 -->
            <div class="flex flex-row items-center gap-1">
                <!-- 小時選擇器 -->
                <div class="flex-1">
                    <select v-model="selectedHour"
                        class="w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500">
                        <option v-for="hour in hourOptions" :key="hour" :value="hour">
                            {{ formatHour(hour) }}
                        </option>
                    </select>
                </div>

                <!-- 分鐘選擇器 -->
                <div class="flex-1">
                    <select v-model="selectedMinute"
                        class="w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500">
                        <option v-for="minute in minuteOptions" :key="minute" :value="minute">
                            {{ formatNumber(minute) }}
                        </option>
                    </select>
                </div>

                <!-- 秒鐘選擇器 -->
                <div class="flex-1" v-if="enableSeconds">
                    <select v-model="selectedSecond"
                        class="w-full py-1 px-2 border border-vdt-outline bg-vdt-surface text-vdt-content rounded-sm text-sm focus:ring-2 focus:ring-vdt-theme-200 focus:border-vdt-theme-500">
                        <option v-for="second in secondOptions" :key="second" :value="second">
                            {{ formatNumber(second) }}
                        </option>
                    </select>
                </div>

                <div v-if="!use24Hour" class="flex-shrink-0">
                    <div
                        class="isolate inline-flex rounded-md border border-vdt-outline bg-vdt-surface overflow-hidden">
                        <button type="button" @click="setPeriod('AM')" class="px-2 py-1 text-sm transition-colors"
                            :class="selectedPeriod === 'AM' ? 'bg-vdt-theme-500 text-white' : 'text-vdt-content hover:bg-vdt-interactive-hover'">
                            {{ getLocalizedPeriod('AM') }}
                        </button>
                        <button type="button" @click="setPeriod('PM')" class="px-2 py-1 text-sm transition-colors"
                            :class="selectedPeriod === 'PM' ? 'bg-vdt-theme-500 text-white' : 'text-vdt-content hover:bg-vdt-interactive-hover'">
                            {{ getLocalizedPeriod('PM') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useLocale } from '@/composables/useLocale';
interface Props {
    show?: boolean;
    timeValue?: string | null;
    enableSeconds?: boolean;
    use24Hour?: boolean;
    defaultTime?: string;
    locale?: string;
    selectionMode?: 'single' | 'range';
}

const props = withDefaults(defineProps<Props>(), {
    show: true,
    timeValue: null,
    enableSeconds: true,
    use24Hour: false,
    defaultTime: '00:00:00',
    locale: 'zh-TW',
    selectionMode: 'single'
});

const emit = defineEmits<{
    'time-change': [time: string];
    'today-click': [];
}>();

const { getPlaceholderMessage } = useLocale(props.locale);

// 時間相關狀態
const selectedHour = ref<number>(0);
const selectedMinute = ref<number>(0);
const selectedSecond = ref<number>(0);
const selectedPeriod = ref<'AM' | 'PM'>('AM');
const timeInitialized = ref<boolean>(false);

// 小時選項
const hourOptions = computed(() => {
    return props.use24Hour
        ? Array.from({ length: 24 }, (_, i) => i)
        : Array.from({ length: 12 }, (_, i) => i + 1);
});

// 分鐘選項
const minuteOptions = computed(() => {
    return Array.from({ length: 60 }, (_, i) => i);
});

// 秒鐘選項
const secondOptions = computed(() => {
    return Array.from({ length: 60 }, (_, i) => i);
});

// 格式化的時間值
const formattedTimeValue = computed(() => {
    let hour = selectedHour.value;

    if (!props.use24Hour) {
        if (selectedPeriod.value === 'PM' && hour < 12) {
            hour += 12;
        } else if (selectedPeriod.value === 'AM' && hour === 12) {
            hour = 0;
        }
    }

    const hourStr = formatNumber(hour);
    const minuteStr = formatNumber(selectedMinute.value);

    if (props.enableSeconds) {
        const secondStr = formatNumber(selectedSecond.value);
        return `${hourStr}:${minuteStr}:${secondStr}`;
    } else {
        return `${hourStr}:${minuteStr}`;
    }
});

// 格式化數字為兩位數
const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
};

// 格式化小時
const formatHour = (hour: number): string => {
    return formatNumber(hour);
};

// 解析並設置時間
const parseAndSetTime = (timeStr: string) => {
    if (!timeStr) return;

    const [hoursStr, minutes, seconds] = timeStr.split(':');
    let hours = parseInt(hoursStr) || 0;

    if (!props.use24Hour) {
        if (hours >= 12) {
            selectedPeriod.value = 'PM';
            hours = hours === 12 ? 12 : hours - 12;
        } else {
            selectedPeriod.value = 'AM';
            hours = hours === 0 ? 12 : hours;
        }
    }

    selectedHour.value = hours;
    selectedMinute.value = parseInt(minutes) || 0;

    if (props.enableSeconds && seconds) {
        selectedSecond.value = parseInt(seconds) || 0;
    }

    timeInitialized.value = true;
};

// 使用預設時間初始化
const initializeWithDefaultTime = () => {
    parseAndSetTime(props.defaultTime);
};

// 設置時間段
const setPeriod = (period: 'AM' | 'PM') => {
    selectedPeriod.value = period;
};

const getLocalizedPeriod = (period: 'AM' | 'PM'): string => {
    // 使用瀏覽器內建的本地化功能
    const date = new Date();
    // 設定為對應的時間段來獲取本地化文字
    date.setHours(period === 'AM' ? 6 : 18, 0, 0, 0);

    const formatter = new Intl.DateTimeFormat(props.locale || navigator.language, {
        hour12: true,
        hour: 'numeric'
    });

    const parts = formatter.formatToParts(date);
    const dayPeriodPart = parts.find(part => part.type === 'dayPeriod');

    return dayPeriodPart?.value || period;
};

// 設置為當前時間
const setNowTime = () => {
    const now = new Date();

    if (props.use24Hour) {
        selectedHour.value = now.getHours();
    } else {
        const hours = now.getHours();
        selectedPeriod.value = hours >= 12 ? 'PM' : 'AM';
        selectedHour.value = hours % 12 || 12;
    }

    selectedMinute.value = now.getMinutes();

    if (props.enableSeconds) {
        selectedSecond.value = now.getSeconds();
    }

    timeInitialized.value = true;
};

// 發送今天按鈕點擊事件
const emitTodayEvent = () => {
    emit('today-click');
};

// 監聽外部傳入的時間值
watch(() => props.timeValue, (newValue) => {
    if (newValue) {
        parseAndSetTime(newValue);
    } else if (!timeInitialized.value && props.show) {
        initializeWithDefaultTime();
    }
}, { immediate: true });

// 監聽時間值的變化並發送事件
watch(
    [selectedHour, selectedMinute, selectedSecond, selectedPeriod],
    () => {
        if (timeInitialized.value) {
            emit('time-change', formattedTimeValue.value);
        }
    }
);

// 公開方法
defineExpose({
    // 獲取當前時間值
    getCurrentTime: () => formattedTimeValue.value,

    // 設置時間
    setTime: (timeStr: string) => parseAndSetTime(timeStr),

    // 重置為預設時間
    resetToDefault: () => initializeWithDefaultTime(),
});
</script>
