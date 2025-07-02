import type { LocaleMessages } from '@/types/locale';

export const zhTWLocaleMessages: LocaleMessages = {
    error: {
        calendar: {
            unsupported: '不支援的日曆',
        },
        date: {
            required: '請選擇日期',
            invalid: '無效的日期',
            outOfRange: '日期超出允許範圍',
            beforeMin: '日期不能早於 {minDate}',
            afterMax: '日期不能晚於 {maxDate}',
            unsupportedFormat: '不支援的日期格式，支援格式: {formats}',
            parseError: '日期解析失敗，請檢查日期格式',
        },
        time: {
            required: '請選擇時間',
            invalid: '無效的時間',
            hourOutOfRange: '小時必須是 {min}-{max} 之間的數字',
            minuteOutOfRange: '分鐘必須是 0-59 之間的數字',
            secondOutOfRange: '秒鐘必須是 0-59 之間的數字',
            hourRequired: '請輸入小時',
            minuteRequired: '請輸入分鐘',
            secondRequired: '請輸入秒鐘',
            minuteStepInvalid: '分鐘必須是 {step} 的倍數',
        },
        year: {
            required: '請輸入年份',
            invalid: '年份格式不正確',
            outOfRange: '年份必須是 {min}-{max} 之間的數字',
            notLeapYear: '{year}年2月沒有29日，不是閏年',
        },
        month: {
            required: '請輸入月份',
            invalid: '月份格式不正確',
            outOfRange: '月份必須是 1-12 之間的數字',
        },
        day: {
            required: '請輸入日期',
            invalid: '日期格式不正確',
            outOfRange: '日期必須是 1-31 之間的數字',
            notExistInMonth: '{month}月最多只有{maxDays}天',
        },
        range: {
            startRequired: '請選擇開始日期',
            endRequired: '請選擇結束日期',
            startAfterEnd: '開始日期不能晚於結束日期',
            exceedsMaxRange: '選擇範圍不能超過 {maxRange} 天',
            belowMinRange: '選擇範圍不能少於 {minRange} 天',
        },
        format: {
            dateFormat: '日期格式不正確: "{original}" 已自動修復為 "{fixed}"',
            timeFormat: '時間格式不正確: "{original}" 已自動修復為 "{fixed}"',
        },
    },
    placeholder: {
        date: {
            year: '年',
            month: '月',
            day: '日'
        },
        time: {
            hour: '時',
            minute: '分',
            second: '秒'
        },
        general: {
            selectDate: '請選擇日期',
            selectTime: '請選擇時間',
            clear: '清除',
            time: '時間',
        },
        range: {
            start: '開始日期',
            end: '結束日期',
        }
    },
    yearSelector: {
        jumpToYear: '跳至年份',
        inputYearPlaceholder: '輸入西元年...',
        yearRangeInfo: '{calendar}年範圍: {min} - {max}',
        noYearsToDisplay: '沒有可顯示的年份',
        returnToValidRange: '返回有效範圍',
    }
};
