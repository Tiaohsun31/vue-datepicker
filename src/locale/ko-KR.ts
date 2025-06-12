import type { LocaleMessages } from '@/types/locale';

export const koKRLocaleMessages: LocaleMessages = {
    error: {
        date: {
            required: '날짜를 선택해주세요',
            invalid: '유효하지 않은 날짜',
            outOfRange: '날짜가 허용 범위를 벗어났습니다',
            beforeMin: '날짜는 {minDate}보다 이전일 수 없습니다',
            afterMax: '날짜는 {maxDate}보다 이후일 수 없습니다',
            unsupportedFormat: '지원하지 않는 날짜 형식입니다. 지원 형식: {formats}',
            parseError: '날짜를 파싱하는 데 실패했습니다. 날짜 형식을 확인해주세요',
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
            minuteStepInvalid: '분은 {step}의 배수여야 합니다',
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
            clear: '지우기',
        },
        range: {
            start: '시작 날짜를 선택해주세요',
            end: '종료 날짜를 선택해주세요',
        }
    },
    yearSelector: {
        jumpToYear: '연도로 이동',
        inputYearPlaceholder: '서기 연도를 입력...',
        yearRangeInfo: '{calendar}년 범위: {min} - {max}',
        noYearsToDisplay: '표시한 연도는 없습니다',
        returnToValidRange: '유효한 범위로 이동',
    }
};
