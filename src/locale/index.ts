// locale/index.ts
export type LocaleKey = 'zh-TW' | 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR';

export interface ErrorMessages {
    // 日期相關錯誤
    date: {
        required: string;
        invalid: string;
        outOfRange: string;
        beforeMin: string;
        afterMax: string;
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
    };
}
export interface LocaleMessages {
    error: ErrorMessages;
    placeholder: PlaceholderMessages;
}

// 預設語言包
export const localeMessages: Record<LocaleKey, LocaleMessages> = {
    'zh-TW': {
        error: {
            date: {
                required: '請選擇日期',
                invalid: '無效的日期',
                outOfRange: '日期超出允許範圍',
                beforeMin: '日期不能早於 {minDate}',
                afterMax: '日期不能晚於 {maxDate}',
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
                clear: '清除'
            }
        }
    },

    'zh-CN': {
        error: {
            date: {
                required: '请选择日期',
                invalid: '无效的日期',
                outOfRange: '日期超出允许范围',
                beforeMin: '日期不能早于 {minDate}',
                afterMax: '日期不能晚于 {maxDate}',
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
                clear: '清除'
            }
        }
    },
    'en-US': {
        error: {
            date: {
                required: 'Please select a date',
                invalid: 'Invalid date',
                outOfRange: 'Date is out of allowed range',
                beforeMin: 'Date cannot be before {minDate}',
                afterMax: 'Date cannot be after {maxDate}',
            },
            time: {
                required: 'Please select a time',
                invalid: 'Invalid time',
                hourOutOfRange: 'Hour must be between {min}-{max}',
                minuteOutOfRange: 'Minute must be between 0-59',
                secondOutOfRange: 'Second must be between 0-59',
                hourRequired: 'Please enter hour',
                minuteRequired: 'Please enter minute',
                secondRequired: 'Please enter second',
            },
            year: {
                required: 'Please enter year',
                invalid: 'Invalid year format',
                outOfRange: 'Year must be between {min}-{max}',
                notLeapYear: 'February 29th does not exist in {year}, not a leap year',
            },
            month: {
                required: 'Please enter month',
                invalid: 'Invalid month format',
                outOfRange: 'Month must be between 1-12',
            },
            day: {
                required: 'Please enter day',
                invalid: 'Invalid day format',
                outOfRange: 'Day must be between 1-31',
                notExistInMonth: 'Month {month} has maximum {maxDays} days',
            },
            range: {
                startRequired: 'Please select start date',
                endRequired: 'Please select end date',
                startAfterEnd: 'Start date cannot be after end date',
                exceedsMaxRange: 'Selection range cannot exceed {maxRange} days',
                belowMinRange: 'Selection range cannot be less than {minRange} days',
            },
            format: {
                dateFormat: 'Invalid date format: "{original}" auto-fixed to "{fixed}"',
                timeFormat: 'Invalid time format: "{original}" auto-fixed to "{fixed}"',
            },
        },
        placeholder: {
            date: {
                year: 'YYYY',
                month: 'MM',
                day: 'DD'
            },
            time: {
                hour: 'HH',
                minute: 'mm',
                second: 'ss'
            },
            general: {
                selectDate: 'Please select a date',
                selectTime: 'Please select a time',
                clear: 'Clear'
            }
        }
    },

    'ja-JP': {
        error: {
            date: {
                required: '日付を選択してください',
                invalid: '無効な日付',
                outOfRange: '日付が許可範囲外です',
                beforeMin: '日付は {minDate} より前にはできません',
                afterMax: '日付は {maxDate} より後にはできません',
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
                clear: 'クリア'
            }
        }
    },

    'ko-KR': {
        error: {
            date: {
                required: '날짜를 선택해주세요',
                invalid: '유효하지 않은 날짜',
                outOfRange: '날짜가 허용 범위를 벗어났습니다',
                beforeMin: '날짜는 {minDate}보다 이전일 수 없습니다',
                afterMax: '날짜는 {maxDate}보다 이후일 수 없습니다',
            },
            time: {
                required: '시간을 선택해주세요',
                invalid: '유효하지 않은 시간',
                hourOutOfRange: '시간은 {min}-{max} 사이의 숫자여야 합니다',
                minuteOutOfRange: '분은 0-59 사이의 숫자여야 합니다',
                secondOutOfRange: '초는 0-59 사이의 숫자여야 합니다',
                hourRequired: '시간을 입력해주세요',
                minuteRequired: '분을 입력해주세요',
                secondRequired: '초을 입력해주세요',
            },
            year: {
                required: '연도를 입력해주세요',
                invalid: '연도 형식이 올바르지 않습니다',
                outOfRange: '연도는 {min}-{max} 사이의 숫자여야 합니다',
                notLeapYear: '{year}년 2월 29일은 존재하지 않습니다 (윤년이 아님)',
            },
            month: {
                required: '월을 입력해주세요',
                invalid: '월 형식이 올바르지 않습니다',
                outOfRange: '월은 1-12 사이의 숫자여야 합니다',
            },
            day: {
                required: '일을 입력해주세요',
                invalid: '일 형식이 올바르지 않습니다',
                outOfRange: '일은 1-31 사이의 숫자여야 합니다',
                notExistInMonth: '{month}월은 최대 {maxDays}일까지입니다',
            },
            range: {
                startRequired: '시작 날짜를 선택해주세요',
                endRequired: '종료 날짜를 선택해주세요',
                startAfterEnd: '시작 날짜는 종료 날짜보다 늦을 수 없습니다',
                exceedsMaxRange: '선택 범위는 {maxRange}일을 초과할 수 없습니다',
                belowMinRange: '선택 범위는 {minRange}일 미만일 수 없습니다',
            },
            format: {
                dateFormat: '날짜 형식이 올바르지 않습니다: "{original}"을(를) "{fixed}"로 자동 수정했습니다',
                timeFormat: '시간 형식이 올바르지 않습니다: "{original}"을(를) "{fixed}"로 자동 수정했습니다',
            },
        },
        placeholder: {
            date: {
                year: '년',
                month: '월',
                day: '일'
            },
            time: {
                hour: '시',
                minute: '분',
                second: '초'
            },
            general: {
                selectDate: '날짜를 선택해주세요',
                selectTime: '시간을 선택해주세요',
                clear: '지우기'
            }
        }
    }
};

// 訊息插值函數
export function interpolateMessage(template: string, variables: Record<string, any>): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        return variables[key]?.toString() || match;
    });
}

// 語言包管理器
export class LocaleManager {
    private currentLocale: LocaleKey = 'zh-TW';

    setLocale(locale: LocaleKey): void {
        this.currentLocale = locale;
    }

    getCurrentLocale(): LocaleKey {
        return this.currentLocale;
    }

    getMessage(path: string, variables?: Record<string, any>): string {
        const keys = path.split('.');
        let message: any = localeMessages[this.currentLocale];

        for (const key of keys) {
            message = message?.[key];
        }

        if (typeof message !== 'string') {
            console.warn(`Missing translation for path: ${path} in locale: ${this.currentLocale}`);
            return path;
        }

        return variables ? interpolateMessage(message, variables) : message;
    }

    getErrorMessage(path: string, variables?: Record<string, any>): string {
        return this.getMessage(`error.${path}`, variables);
    }

    getPlaceholderMessage(path: string, variables?: Record<string, any>): string {
        return this.getMessage(`placeholder.${path}`, variables);
    }

    // 支援自定義語言包
    addCustomMessages(locale: LocaleKey, messages: Partial<ErrorMessages>): void {
        localeMessages[locale] = {
            ...localeMessages[locale],
            ...this.deepMerge(localeMessages[locale], messages)
        };
    }

    private deepMerge(target: any, source: any): any {
        const result = { ...target };

        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }

        return result;
    }
}

// 全域實例
export const localeManager = new LocaleManager();
