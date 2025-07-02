import type { LocaleMessages } from '@/types/locale';

export const jaJPLocaleMessages: LocaleMessages = {
    error: {
        calendar: {
            unsupported: 'サポートされていないカレンダーIDです',
        },
        date: {
            required: '日付を選択してください',
            invalid: '無効な日付',
            outOfRange: '日付が許可範囲外です',
            beforeMin: '日付は {minDate} より前にはできません',
            afterMax: '日付は {maxDate} より後にはできません',
            unsupportedFormat: 'サポートされていない日付形式です。サポート形式: {formats}',
            parseError: '日付の解析に失敗しました。日付形式を確認してください',
        },
        time: {
            required: '時刻を選択してください',
            invalid: '無効な時刻',
            hourOutOfRange: '時間は {min}-{max} の間で入力してください',
            minuteOutOfRange: '分は 0-59 の間で入力してください',
            secondOutOfRange: '秒は 0-59 の間で入力してください',
            hourRequired: '時間を入力してください',
            minuteRequired: '分を入力してください',
            secondRequired: '秒を入力してください',
            minuteStepInvalid: '分は {step} の倍数でなければなりません',
        },
        year: {
            required: '年を入力してください',
            invalid: '年の形式が正しくありません',
            outOfRange: '年は {min}-{max} の間で入力してください',
            notLeapYear: '{year}年2月29日は存在しません（うるう年ではありません）',
        },
        month: {
            required: '月を入力してください',
            invalid: '月の形式が正しくありません',
            outOfRange: '月は 1-12 の間で入力してください',
        },
        day: {
            required: '日を入力してください',
            invalid: '日の形式が正しくありません',
            outOfRange: '日は 1-31 の間で入力してください',
            notExistInMonth: '{month}月は最大 {maxDays} 日までです',
        },
        range: {
            startRequired: '開始日を選択してください',
            endRequired: '終了日を選択してください',
            startAfterEnd: '開始日は終了日より後にはできません',
            exceedsMaxRange: '選択範囲は {maxRange} 日を超えることはできません',
            belowMinRange: '選択範囲は {minRange} 日未満にはできません',
        },
        format: {
            dateFormat: '日付形式が正しくありません: "{original}" を "{fixed}" に自動修正しました',
            timeFormat: '時刻形式が正しくありません: "{original}" を "{fixed}" に自動修正しました',
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
            selectDate: '日付を選択してください',
            selectTime: '時刻を選択してください',
            clear: 'クリア',
            time: '時刻',
        },
        range: {
            start: '開始日を',
            end: '終了日を',
        },
    },
    yearSelector: {
        jumpToYear: '年にジャンプ',
        inputYearPlaceholder: '西暦年を入力...',
        yearRangeInfo: '{calendar}年の範囲: {min} - {max}',
        noYearsToDisplay: '表示する年はありません',
        returnToValidRange: '有効な範囲に戻る',
    }
};
