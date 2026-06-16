
export interface ErrorMessages {
    calendar: {
        unsupported: string;
    }
    // 日期相關錯誤
    date: {
        required: string;
        invalid: string;
        outOfRange: string;
        beforeMin: string;
        afterMax: string;
        unsupportedFormat: string;
        parseError: string;
    };

    // 時間相關錯誤
    time: {
        required: string;
        invalid: string;
        hourOutOfRange: string;
        minuteOutOfRange: string;
        secondOutOfRange: string;
        hourRequired: string;
        minuteRequired: string;
        secondRequired: string;
        minuteStepInvalid: string;
    };

    // 年月日個別錯誤
    year: {
        required: string;
        invalid: string;
        outOfRange: string;
        notLeapYear: string;
    };

    month: {
        required: string;
        invalid: string;
        outOfRange: string;
    };

    day: {
        required: string;
        invalid: string;
        outOfRange: string;
        notExistInMonth: string;
    };

    // 範圍選擇錯誤
    range: {
        startRequired: string;
        endRequired: string;
        startAfterEnd: string;
        exceedsMaxRange: string;
        belowMinRange: string;
    };

    // 格式錯誤
    format: {
        dateFormat: string;
        timeFormat: string;
    };
}

export interface PlaceholderMessages {
    date: {
        year: string;
        month: string;
        day: string;
    };
    time: {
        hour: string;
        minute: string;
        second: string;
    };
    general: {
        selectDate: string;
        selectTime: string;
        clear: string;
        time: string;
    };
    range: {
        start: string;
        end: string;
    };
}
export interface YearSelectorMessages {
    jumpToYear: string;
    inputYearPlaceholder: string;
    yearRangeInfo: string;
    noYearsToDisplay: string;
    returnToValidRange: string;
}

// DateRange 預設快捷選項標籤
export interface ShortcutMessages {
    today: string;
    last7Days: string;
    last30Days: string;
    thisMonth: string;
}

export interface LocaleMessages {
    error: ErrorMessages;
    placeholder: PlaceholderMessages;
    yearSelector: YearSelectorMessages;
    // 選填：消費者自訂語言包可不提供（內建語系皆有；缺漏時 DateRange 會回退預設標籤）。
    shortcuts?: ShortcutMessages;
}
