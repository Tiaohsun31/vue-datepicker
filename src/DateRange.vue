<!-- DateRange.vue - 最終修正版 -->
<template>
    <div class="date-range-wrapper relative w-full"
        :class="[themeClasses, showTime ? 'min-w-[280px]' : 'min-w-[200px]']" v-bind="containerAttributes"
        ref="rangeRef">

        <!-- 日期範圍顯示容器 -->
        <DateContainer :errors="errors">
            <div class="flex w-full items-center justify-between">
                <!-- 日期範圍顯示 -->
                <div class="flex items-center gap-2 flex-1">
                    <!-- 開始日期 -->
                    <div class="flex-1 text-center py-1">
                        <span v-if="displayStartDate" class="text-vdt-content text-sm">
                            {{ displayStartDate }}
                        </span>
                        <span v-else class="text-vdt-content-muted text-sm">
                            {{ startPlaceholder }}
                        </span>
                    </div>

                    <!-- 分隔符 -->
                    <div class="text-vdt-content-muted text-sm px-1">
                        {{ separator }}
                    </div>

                    <!-- 結束日期 -->
                    <div class="flex-1 text-center py-1">
                        <span v-if="displayEndDate" class="text-vdt-content text-sm">
                            {{ displayEndDate }}
                        </span>
                        <span v-else class="text-vdt-content-muted text-sm">
                            {{ endPlaceholder }}
                        </span>
                    </div>
                </div>

                <!-- 日曆圖標 -->
                <div class="ml-2">
                    <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        :disabled="disabled" @click="toggleCalendar">
                        <CalendarIcon class="h-5 w-5 cursor-pointer" />
                    </button>
                </div>
            </div>
        </DateContainer>

        <!-- 錯誤訊息 -->
        <DateErrorMessage :errors="mergedErrors" />

        <!-- 日期範圍選擇彈窗 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="absolute mt-1 bg-vdt-surface-elevated border border-vdt-outline rounded-lg shadow-lg z-10 min-w-[640px]"
            @click.stop role="dialog" aria-modal="true" aria-label="date-range-picker">

            <!-- 範圍選擇器內容 -->
            <div class="p-4">
                <!-- 輸入區域 -->
                <div class="mb-4 space-y-3">
                    <!-- 開始日期輸入 -->
                    <div class="flex items-center gap-3">
                        <label class="text-sm font-medium text-vdt-content w-16">開始：</label>
                        <div class="flex items-center gap-2">
                            <DateInput ref="startDateInputRef" v-model="inputStartDate"
                                :year-placeholder="yearPlaceholder" :month-placeholder="monthPlaceholder"
                                :day-placeholder="dayPlaceholder" :max-date="inputEndDate" :min-date="minDateStr"
                                :date-format="dateInputFormat" @validation="onStartDateValidation"
                                @complete="onStartDateComplete" />
                            <TimeInput v-if="showTime" ref="startTimeInputRef" v-model="inputStartTime"
                                :hour-placeholder="hourPlaceholder" :minute-placeholder="minutePlaceholder"
                                :second-placeholder="secondPlaceholder" :enable-seconds="enableSeconds"
                                :use24Hour="use24Hour" :locale="locale" @validation="onStartTimeValidation"
                                @complete="onStartTimeComplete" />
                        </div>
                    </div>

                    <!-- 結束日期輸入 -->
                    <div class="flex items-center gap-3">
                        <label class="text-sm font-medium text-vdt-content w-16">結束：</label>
                        <div class="flex items-center gap-2">
                            <DateInput ref="endDateInputRef" v-model="inputEndDate" :year-placeholder="yearPlaceholder"
                                :month-placeholder="monthPlaceholder" :day-placeholder="dayPlaceholder"
                                :min-date="inputStartDate" :max-date="maxDateStr" :date-format="dateInputFormat"
                                @validation="onEndDateValidation" @complete="onEndDateComplete" />
                            <TimeInput v-if="showTime" ref="endTimeInputRef" v-model="inputEndTime"
                                :hour-placeholder="hourPlaceholder" :minute-placeholder="minutePlaceholder"
                                :second-placeholder="secondPlaceholder" :enable-seconds="enableSeconds"
                                :use24Hour="use24Hour" :locale="locale" @validation="onEndTimeValidation"
                                @complete="onEndTimeComplete" />
                        </div>
                    </div>
                </div>

                <!-- 快捷選項 -->
                <div v-if="shortcuts.length > 0" class="mb-4">
                    <div class="text-xs text-vdt-content-muted mb-2">快速選擇：</div>
                    <div class="flex flex-wrap gap-2">
                        <button v-for="shortcut in shortcuts" :key="shortcut.label" type="button"
                            class="px-3 py-1 text-xs bg-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm transition-colors"
                            @click="applyShortcut(shortcut)">
                            {{ shortcut.label }}
                        </button>
                    </div>
                </div>

                <!-- 雙月日曆 -->
                <div class="calendar-container">
                    <DualMonthCalendar :range-start="selectedStartDate" :range-end="selectedEndDate" :min-date="minDate"
                        :max-date="maxDate" :locale="locale" :week-starts-on="0"
                        @range-select="onCalendarRangeSelect" />
                </div>

                <!-- 操作按鈕 -->
                <div class="flex justify-between mt-4 pt-3 border-t border-vdt-outline">
                    <button type="button" class="px-4 py-2 text-sm text-vdt-content-secondary hover:text-vdt-content"
                        @click="clearRange">
                        清除
                    </button>
                    <div class="flex gap-2">
                        <button type="button"
                            class="px-4 py-2 text-sm border border-vdt-outline text-vdt-content hover:bg-vdt-interactive-hover rounded-sm"
                            @click="hideCalendar">
                            取消
                        </button>
                        <button type="button"
                            class="px-4 py-2 text-sm bg-vdt-theme-500 text-white hover:bg-vdt-theme-600 rounded-sm"
                            :disabled="!isValidRange" @click="confirmRange">
                            確定
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import dayjs from 'dayjs';

// 組件導入
import DateContainer from './components/calendar/DateContainer.vue';
import DateInput from './components/inputs/DateInput.vue';
import TimeInput from './components/inputs/TimeInput.vue';
import DateErrorMessage from './components/calendar/DateErrorMessage.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import DualMonthCalendar from './components/calendar/DualMonthCalendar.vue';

import {
    parseToCalendarDateTime,
    formatCalendarDateToString,
    ensureCalendarDate,
    formatOutput,
    getNow,
    safeCreateCalendarDateTime,
    safeCalendarDateTimeToDate,
    type DateTimeValue,
    type OutputFormat
} from './utils/dateUtils';
import { type TailwindColor } from './types/main';
import { useTheme } from './composables/useTheme';

// 日期範圍類型
interface DateRange {
    start: DateTimeValue;
    end: DateTimeValue;
}

interface DateRangeShortcut {
    label: string;
    getValue: () => DateRange;
}

interface Props {
    modelValue?: DateRange | null;
    mode?: 'light' | 'dark' | 'auto';
    theme?: TailwindColor | string;

    // 日期選項
    yearPlaceholder?: string;
    monthPlaceholder?: string;
    dayPlaceholder?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;

    // 時間選項
    showTime?: boolean;
    hourPlaceholder?: string;
    minutePlaceholder?: string;
    secondPlaceholder?: string;
    enableSeconds?: boolean;
    use24Hour?: boolean;

    // 一般選項
    disabled?: boolean;
    required?: boolean;
    minDate?: DateTimeValue;
    maxDate?: DateTimeValue;
    locale?: string;
    separator?: string;
    dateFormat?: string;
    timeFormat?: string;

    // 範圍特定選項
    maxRange?: number; // 最大天數限制
    minRange?: number; // 最小天數限制

    // 輸出格式
    outputFormat?: OutputFormat;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    mode: 'auto',
    theme: () => 'violet',
    yearPlaceholder: '年',
    monthPlaceholder: '月',
    dayPlaceholder: '日',
    startPlaceholder: '開始日期',
    endPlaceholder: '結束日期',
    showTime: false,
    hourPlaceholder: '時',
    minutePlaceholder: '分',
    secondPlaceholder: '秒',
    enableSeconds: false,
    use24Hour: true,
    disabled: false,
    required: false,
    locale: 'zh-TW',
    separator: ' ~ ',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss',
    outputFormat: 'iso',
});

const emit = defineEmits<{
    'update:modelValue': [range: DateRange | null];
    'change': [range: DateRange | null];
    'validation': [isValid: boolean, errors: Record<string, string>];
}>();

// DOM 引用
const rangeRef = ref<HTMLElement | null>(null);
const calendarRef = ref<HTMLElement | null>(null);
const startDateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const endDateInputRef = ref<InstanceType<typeof DateInput> | null>(null);
const startTimeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);
const endTimeInputRef = ref<InstanceType<typeof TimeInput> | null>(null);

// 狀態
const showCalendar = ref(false);
const errors = ref<Record<string, string>>({});
const formatErrors = ref<Record<string, string>>({});

// 輸入值
const inputStartDate = ref<string | null>(null);
const inputEndDate = ref<string | null>(null);
const inputStartTime = ref<string | null>(null);
const inputEndTime = ref<string | null>(null);

// 內部日期時間
const internalStartDateTime = ref<CalendarDateTime | null>(null);
const internalEndDateTime = ref<CalendarDateTime | null>(null);

// 輔助函數 - 定義在最前面
const getTimeFromDateTime = (dateTime: CalendarDateTime | null): string | null => {
    if (!dateTime) return null;

    const hour = dateTime.hour.toString().padStart(2, '0');
    const minute = dateTime.minute.toString().padStart(2, '0');

    if (props.enableSeconds) {
        const second = dateTime.second.toString().padStart(2, '0');
        return `${hour}:${minute}:${second}`;
    } else {
        return `${hour}:${minute}`;
    }
};

const clearInternalState = () => {
    internalStartDateTime.value = null;
    internalEndDateTime.value = null;
    inputStartDate.value = null;
    inputEndDate.value = null;
    inputStartTime.value = null;
    inputEndTime.value = null;
};

const createCalendarDateTime = (dateStr: string | null, timeStr: string | null): CalendarDateTime | null => {
    if (!dateStr) return null;

    const date = dayjs(dateStr);
    if (!date.isValid()) return null;

    const timeParts = timeStr ? timeStr.split(':').map(Number) : [0, 0, 0];
    const hour = timeParts[0] || 0;
    const minute = timeParts[1] || 0;
    const second = timeParts[2] || 0;

    return safeCreateCalendarDateTime(
        date.year(),
        date.month() + 1,
        date.date(),
        hour,
        minute,
        second
    );
};

// 計算屬性
const selectedStartDate = computed<CalendarDate | null>(() => {
    return internalStartDateTime.value
        ? safeCalendarDateTimeToDate(internalStartDateTime.value as CalendarDateTime)
        : null;
});

const selectedEndDate = computed<CalendarDate | null>(() => {
    return internalEndDateTime.value
        ? safeCalendarDateTimeToDate(internalEndDateTime.value as CalendarDateTime)
        : null;
});

// 轉換 minDate 和 maxDate
const minDate = computed(() => props.minDate !== undefined ? ensureCalendarDate(props.minDate) : null);
const maxDate = computed(() => props.maxDate !== undefined ? ensureCalendarDate(props.maxDate) : null);
const minDateStr = computed(() => formatCalendarDateToString(minDate.value));
const maxDateStr = computed(() => formatCalendarDateToString(maxDate.value));

const dateInputFormat = computed(() => props.dateFormat);

// 顯示的日期範圍
const displayStartDate = computed(() => {
    if (!internalStartDateTime.value) return null;
    return formatCalendarDateToString(internalStartDateTime.value as CalendarDateTime, props.dateFormat) +
        (props.showTime && inputStartTime.value ? ` ${inputStartTime.value}` : '');
});

const displayEndDate = computed(() => {
    if (!internalEndDateTime.value) return null;
    return formatCalendarDateToString(internalEndDateTime.value as CalendarDateTime, props.dateFormat) +
        (props.showTime && inputEndTime.value ? ` ${inputEndTime.value}` : '');
});

// 合併錯誤
const mergedErrors = computed(() => {
    return { ...errors.value, ...formatErrors.value };
});

// 驗證範圍是否有效
const isValidRange = computed(() => {
    if (!internalStartDateTime.value || !internalEndDateTime.value) return false;

    // 基本順序檢查
    if (internalStartDateTime.value.compare(internalEndDateTime.value as CalendarDateTime) > 0) return false;

    // 範圍限制檢查
    if (props.maxRange || props.minRange) {
        const startDate = new Date(internalStartDateTime.value.year, internalStartDateTime.value.month - 1, internalStartDateTime.value.day);
        const endDate = new Date(internalEndDateTime.value.year, internalEndDateTime.value.month - 1, internalEndDateTime.value.day);
        const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

        if (props.maxRange && diffDays > props.maxRange) return false;
        if (props.minRange && diffDays < props.minRange) return false;
    }

    return Object.keys(errors.value).length === 0;
});

// 快捷選項
const shortcuts = computed<DateRangeShortcut[]>(() => [
    {
        label: '今天',
        getValue: () => {
            const today = getNow();
            return { start: today, end: today };
        }
    },
    {
        label: '昨天',
        getValue: () => {
            const yesterday = getNow().subtract({ days: 1 });
            return { start: yesterday, end: yesterday };
        }
    },
    {
        label: '最近7天',
        getValue: () => {
            const end = getNow();
            const start = end.subtract({ days: 6 });
            return { start, end };
        }
    },
    {
        label: '最近30天',
        getValue: () => {
            const end = getNow();
            const start = end.subtract({ days: 29 });
            return { start, end };
        }
    },
    {
        label: '本月',
        getValue: () => {
            const now = getNow();
            const start = safeCreateCalendarDateTime(now.year, now.month, 1, 0, 0, 0);
            const end = start.add({ months: 1 }).subtract({ days: 1 }) as CalendarDateTime;
            return { start, end };
        }
    }
]);

// 監聽外部值變化 - 現在放在輔助函數之後
watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        const startDateTime = parseToCalendarDateTime(newValue.start);
        const endDateTime = parseToCalendarDateTime(newValue.end);

        internalStartDateTime.value = startDateTime;
        internalEndDateTime.value = endDateTime;

        if (startDateTime) {
            inputStartDate.value = formatCalendarDateToString(startDateTime, props.dateFormat);
            inputStartTime.value = getTimeFromDateTime(startDateTime);
        }

        if (endDateTime) {
            inputEndDate.value = formatCalendarDateToString(endDateTime, props.dateFormat);
            inputEndTime.value = getTimeFromDateTime(endDateTime);
        }
    } else {
        clearInternalState();
    }
}, { immediate: true });

// 驗證事件處理
const handleValidation = (field: string, isValid: boolean, validationErrors: Record<string, string>) => {
    // 清除該字段的錯誤
    Object.keys(errors.value).forEach(key => {
        if (key.startsWith(field)) {
            delete errors.value[key];
        }
    });

    // 添加新錯誤（如果有）
    if (!isValid) {
        Object.entries(validationErrors).forEach(([key, message]) => {
            errors.value[`${field}.${key}`] = message;
        });
    }

    emit('validation', Object.keys(errors.value).length === 0, errors.value);
};

const onStartDateValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
    handleValidation('startDate', isValid, validationErrors);
};

const onEndDateValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
    handleValidation('endDate', isValid, validationErrors);
};

const onStartTimeValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
    handleValidation('startTime', isValid, validationErrors);
};

const onEndTimeValidation = (isValid: boolean, validationErrors: Record<string, string>) => {
    handleValidation('endTime', isValid, validationErrors);
};

// 更新日期時間
const updateStartDateTime = () => {
    if (!inputStartDate.value) return;

    const dateTime = createCalendarDateTime(inputStartDate.value, inputStartTime.value);
    if (dateTime) {
        internalStartDateTime.value = dateTime;
    }
};

const updateEndDateTime = () => {
    if (!inputEndDate.value) return;

    const dateTime = createCalendarDateTime(inputEndDate.value, inputEndTime.value);
    if (dateTime) {
        internalEndDateTime.value = dateTime;
    }
};

// 完成事件處理
const onStartDateComplete = (dateStr: string) => {
    inputStartDate.value = dateStr;
    updateStartDateTime();
};

const onEndDateComplete = (dateStr: string) => {
    inputEndDate.value = dateStr;
    updateEndDateTime();
};

const onStartTimeComplete = (timeStr: string) => {
    inputStartTime.value = timeStr;
    updateStartDateTime();
};

const onEndTimeComplete = (timeStr: string) => {
    inputEndTime.value = timeStr;
    updateEndDateTime();
};

// 日曆範圍選擇處理
const onCalendarRangeSelect = (startDate: CalendarDate | null, endDate: CalendarDate | null) => {
    if (startDate && !endDate) {
        // 只有開始日期 - 清除結束日期
        inputStartDate.value = formatCalendarDateToString(startDate, props.dateFormat);
        inputEndDate.value = null;
        updateStartDateTime();

        // 清除結束日期時間
        internalEndDateTime.value = null;
        inputEndTime.value = null;
    } else if (startDate && endDate) {
        // 完整範圍
        inputStartDate.value = formatCalendarDateToString(startDate, props.dateFormat);
        inputEndDate.value = formatCalendarDateToString(endDate, props.dateFormat);
        updateStartDateTime();
        updateEndDateTime();

        // 如果沒有設定時間，使用默認時間
        if (props.showTime) {
            if (!inputStartTime.value) {
                inputStartTime.value = '00:00:00';
            }
            if (!inputEndTime.value) {
                inputEndTime.value = '23:59:59';
            }
        }
    } else {
        // 清空選擇
        clearInternalState();
    }
};

// 快捷選項應用
const applyShortcut = (shortcut: DateRangeShortcut) => {
    const range = shortcut.getValue();

    const startDateTime = parseToCalendarDateTime(range.start);
    const endDateTime = parseToCalendarDateTime(range.end);

    if (startDateTime && endDateTime) {
        internalStartDateTime.value = startDateTime;
        internalEndDateTime.value = endDateTime;

        inputStartDate.value = formatCalendarDateToString(startDateTime, props.dateFormat);
        inputEndDate.value = formatCalendarDateToString(endDateTime, props.dateFormat);

        if (props.showTime) {
            inputStartTime.value = getTimeFromDateTime(startDateTime);
            inputEndTime.value = getTimeFromDateTime(endDateTime);
        }
    }
};

// 清除範圍
const clearRange = () => {
    clearInternalState();
    errors.value = {};
};

// 確認範圍
const confirmRange = () => {
    if (!isValidRange.value) return;

    const range: DateRange = {
        start: formatOutput(internalStartDateTime.value as CalendarDateTime, props.outputFormat),
        end: formatOutput(internalEndDateTime.value as CalendarDateTime, props.outputFormat)
    };

    emit('update:modelValue', range);
    emit('change', range);
    hideCalendar();
};

// 日曆顯示控制
const toggleCalendar = () => {
    if (props.disabled) return;
    showCalendar.value = !showCalendar.value;

    if (showCalendar.value) {
        nextTick(() => {
            updateCalendarPosition();
            startDateInputRef.value?.focus();
        });
    }
};

const hideCalendar = () => {
    showCalendar.value = false;
};

const updateCalendarPosition = () => {
    if (!rangeRef.value || !calendarRef.value) return;

    const rangeRect = rangeRef.value.getBoundingClientRect();
    const calendar = calendarRef.value;

    calendar.style.position = 'absolute';
    calendar.style.top = `${rangeRect.height + 5}px`;
    calendar.style.left = '0';
};

// 點擊外部處理
const handleClickOutside = (event: MouseEvent) => {
    const calendar = calendarRef.value;
    const range = rangeRef.value;
    const target = event.target as Node;

    if (showCalendar.value && calendar && !calendar.contains(target) &&
        range && !range.contains(target)) {
        hideCalendar();
    }
};

// 事件監聽器
onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});

// 主題設置
const {
    themeClasses,
    containerAttributes,
    setColor,
    setMode
} = useTheme();

watch(() => props.theme, (newTheme) => {
    if (newTheme) {
        setColor(newTheme);
    }
}, { immediate: true });

watch(() => props.mode, (newMode) => {
    setMode(newMode);
}, { immediate: true });

// 公開方法
defineExpose({
    focus: () => startDateInputRef.value?.focus(),
    reset: () => {
        clearRange();
        emit('update:modelValue', null);
    },
    validate: () => {
        startDateInputRef.value?.validate();
        endDateInputRef.value?.validate();
        if (props.showTime) {
            startTimeInputRef.value?.validate();
            endTimeInputRef.value?.validate();
        }
    },
    setRange: (range: DateRange | null) => {
        if (range) {
            const startDateTime = parseToCalendarDateTime(range.start);
            const endDateTime = parseToCalendarDateTime(range.end);

            internalStartDateTime.value = startDateTime;
            internalEndDateTime.value = endDateTime;

            if (startDateTime) {
                inputStartDate.value = formatCalendarDateToString(startDateTime, props.dateFormat);
                inputStartTime.value = getTimeFromDateTime(startDateTime);
            }

            if (endDateTime) {
                inputEndDate.value = formatCalendarDateToString(endDateTime, props.dateFormat);
                inputEndTime.value = getTimeFromDateTime(endDateTime);
            }
        } else {
            clearRange();
        }

        emit('update:modelValue', range);
    },

    // 主題控制方法
    setTheme: setColor,
    setDarkMode: () => setMode('dark'),
    setLightMode: () => setMode('light'),
    setAutoMode: () => setMode('auto'),
});
</script>

<style scoped>
.calendar-container {
    display: flex;
    justify-content: center;
}

/* 響應式設計 */
@media (max-width: 768px) {
    .date-range-wrapper {
        min-width: auto !important;
    }

    .calendar-container {
        overflow-x: auto;
    }
}
</style>
