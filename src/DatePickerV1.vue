<template>
    <div class="datepicker relative">
        <!-- 輸入框 -->
        <div class="relative">
            <input v-model="inputValue" type="text"
                class="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                :placeholder="placeholder || 'YYYY-MM-DD'" :disabled="disabled" @focus="showCalendar = true"
                @blur="handleInputBlur" />
            <button type="button"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                :disabled="disabled" @click="showCalendar = !showCalendar">
                <CalendarIcon class="h-5 w-5 cursor-pointer" />
            </button>
        </div>

        <!-- 日曆彈出層 -->
        <div v-if="showCalendar && !disabled" ref="calendarRef"
            class="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <CalendarGrid :value="ensureCalendarDate(selectedDate)" :min-date="minDate" :max-date="maxDate"
                :locale="locale || 'zh-TW'" @select="onSelectDate" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { CalendarDate, getLocalTimeZone, today as todayFunction } from '@internationalized/date';
import CalendarGrid from './components/calendar/CalendarGrid.vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import { ensureCalendarDate } from './utils/dateUtils';

const props = defineProps<{
    modelValue?: CalendarDate | null;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    minDate?: CalendarDate;
    maxDate?: CalendarDate;
    locale?: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [date: CalendarDate | null];
    'change': [date: CalendarDate | null];
}>();

// DOM 引用
const calendarRef = ref<HTMLElement | null>(null);

// 輸入框的值
const inputValue = ref('');
// 是否顯示日曆
const showCalendar = ref(false);
// 跟踪是否點擊在日曆內部
const isCalendarClicked = ref(false);

// 選中的日期
const selectedDate = ref<CalendarDate | null>(ensureCalendarDate(props.modelValue));

// 格式化日期為字符串
const formatDate = (date: CalendarDate | null | any) => {
    if (!date) return '';

    // 確保date是CalendarDate類型
    const safeDate = date instanceof CalendarDate ?
        date :
        new CalendarDate(date.year, date.month, date.day);

    const formatter = new Intl.DateTimeFormat(props.locale || 'zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    // 將CalendarDate轉換為JavaScript Date
    const jsDate = new Date(safeDate.year, safeDate.month - 1, safeDate.day);
    return formatter.format(jsDate);
};

// 監聽 modelValue 的變化
watch(() => props.modelValue, (newValue) => {
    selectedDate.value = ensureCalendarDate(newValue);
    inputValue.value = formatDate(selectedDate.value);
}, { immediate: true });

// 當選擇日期時
const onSelectDate = (date: CalendarDate) => {
    selectedDate.value = date;
    inputValue.value = formatDate(date);
    emit('update:modelValue', date);
    emit('change', date);
    showCalendar.value = false;
};

// 處理輸入框失去焦點時的事件
const handleInputBlur = () => {
    // 使用延時以允許點擊日曆上的元素被處理
    setTimeout(() => {
        if (!isCalendarClicked.value) {
            processInputValue();
            showCalendar.value = false;
        }
        isCalendarClicked.value = false;
    }, 200);
};

// 處理點擊事件
const handleClickOutside = (event: MouseEvent) => {
    const calendar = calendarRef.value;
    const target = event.target as Node;

    // 如果點擊在日曆内部，標記為日曆點擊，不關閉日曆
    if (calendar && calendar.contains(target)) {
        isCalendarClicked.value = true;
    }
    // 如果點擊在日曆和輸入框外部，關閉日曆
    else if (calendar && showCalendar.value && !calendar.contains(target) &&
        !(event.target as Element).classList.contains('datepicker') &&
        !(event.target as Element).closest('.datepicker')) {
        showCalendar.value = false;
    }
};

// 處理輸入值
const processInputValue = () => {
    try {
        if (inputValue.value.trim() === '') {
            if (props.required) {
                // 如果是必填，還原為之前的值
                inputValue.value = formatDate(selectedDate.value);
            } else {
                // 如果非必填，允許清空
                selectedDate.value = null;
                emit('update:modelValue', null);
                emit('change', null);
            }
        } else {
            // 嘗試解析用戶輸入的日期
            const parsedDate = parseUserInput(inputValue.value);
            if (parsedDate) {
                selectedDate.value = parsedDate;
                inputValue.value = formatDate(parsedDate);
                emit('update:modelValue', parsedDate);
                emit('change', parsedDate);
            } else {
                // 解析失敗，還原為之前的值
                inputValue.value = formatDate(selectedDate.value);
            }
        }
    } catch (error) {
        // 解析失敗，還原為之前的值
        inputValue.value = formatDate(selectedDate.value);
    }
};

const parseUserInput = (input: string): CalendarDate | null => {
    try {
        // 嘗試多種格式
        const formats = [
            // 標準 ISO 格式
            /^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/, // YYYY-MM-DD or YYYY/MM/DD
            // 本地化格式 (中文通常用 YYYY/MM/DD)
            /^(\d{4})[/\.](\d{1,2})[/\.](\d{1,2})$/, // YYYY/MM/DD or YYYY.MM.DD
            // 日期優先 (歐洲常用)
            /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/, // DD-MM-YYYY or DD/MM/YYYY
            // 月份優先 (美式)
            /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/, // MM-DD-YYYY or MM/DD/YYYY
        ];

        for (const format of formats) {
            const match = input.match(format);
            if (match) {
                let year, month, day;

                // 根據格式解析年月日
                if (format === formats[0] || format === formats[1]) {
                    // YYYY-MM-DD 或 YYYY/MM/DD
                    [, year, month, day] = match.map(Number);
                } else if (format === formats[2]) {
                    // DD-MM-YYYY 或 DD/MM/YYYY
                    [, day, month, year] = match.map(Number);
                } else {
                    // MM-DD-YYYY 或 MM/DD/YYYY (美式)
                    [, month, day, year] = match.map(Number);
                }

                // 驗證日期是否有效
                if (year && month && day &&
                    month >= 1 && month <= 12 &&
                    day >= 1 && day <= 31) {
                    // 確保我們創建的是正確的 CalendarDate 實例
                    return new CalendarDate(year, month, day);
                }
            }
        }

        // 如果所有格式嘗試失敗，回傳 null
        return null;
    } catch (e) {
        console.error("Error parsing date:", e);
        return null;
    }
};

// 修正：確保獲取今天的日期的正確類型
const getTodaysDate = (): CalendarDate => {
    const now = todayFunction(getLocalTimeZone());
    return new CalendarDate(now.year, now.month, now.day);
};

// 添加全局點擊事件監聽器
onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});

// 清理全局點擊事件監聽器
onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
</script>
