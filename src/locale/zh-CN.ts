import type { LocaleMessages } from '@/types/locale';

export const zhCNLocaleMessages: LocaleMessages = {
    error: {
        date: {
            required: '请选择日期',
            invalid: '无效的日期',
            outOfRange: '日期超出允许范围',
            beforeMin: '日期不能早于 {minDate}',
            afterMax: '日期不能晚于 {maxDate}',
            unsupportedFormat: '不支持的日期格式，支持格式: {formats}',
            parseError: '日期解析失败，请检查日期格式',
        },
        time: {
            required: '请选择时间',
            invalid: '无效的时间',
            hourOutOfRange: '小时必须是 {min}-{max} 之间的数字',
            minuteOutOfRange: '分钟必须是 0-59 之间的数字',
            secondOutOfRange: '秒钟必须是 0-59 之间的数字',
            hourRequired: '请输入小时',
            minuteRequired: '请输入分钟',
            secondRequired: '请输入秒钟',
            minuteStepInvalid: '分钟必须是 {step} 的倍数',
        },
        year: {
            required: '请输入年份',
            invalid: '年份格式不正确',
            outOfRange: '年份必须是 {min}-{max} 之间的数字',
            notLeapYear: '{year}年2月没有29日，不是闰年',
        },
        month: {
            required: '请输入月份',
            invalid: '月份格式不正确',
            outOfRange: '月份必须是 1-12 之间的数字',
        },
        day: {
            required: '请输入日期',
            invalid: '日期格式不正确',
            outOfRange: '日期必须是 1-31 之间的数字',
            notExistInMonth: '{month}月最多只有{maxDays}天',
        },
        range: {
            startRequired: '请选择开始日期',
            endRequired: '请选择结束日期',
            startAfterEnd: '开始日期不能晚于结束日期',
            exceedsMaxRange: '选择范围不能超过 {maxRange} 天',
            belowMinRange: '选择范围不能少于 {minRange} 天',
        },
        format: {
            dateFormat: '日期格式不正确: "{original}" 已自动修复为 "{fixed}"',
            timeFormat: '时间格式不正确: "{original}" 已自动修复为 "{fixed}"',
        },
    },
    placeholder: {
        date: {
            year: '年',
            month: '月',
            day: '日'
        },
        time: {
            hour: '时',
            minute: '分',
            second: '秒'
        },
        general: {
            selectDate: '请选择日期',
            selectTime: '请选择时间',
            clear: '清除',
        },
        range: {
            start: '请选择开始日期',
            end: '请选择结束日期',
        }
    },
    yearSelector: {
        jumpToYear: '跳至年份',
        inputYearPlaceholder: '输入公历年...',
        yearRangeInfo: '{calendar}年范围: {min} - {max}',
        noYearsToDisplay: '没有可显示的年份',
        returnToValidRange: '返回有效范围',
    }
};
