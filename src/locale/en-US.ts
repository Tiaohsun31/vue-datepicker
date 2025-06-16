import type { LocaleMessages } from '@/types/locale';

export const enUSLocaleMessages: LocaleMessages = {
    error: {
        date: {
            required: 'Please select a date',
            invalid: 'Invalid date',
            outOfRange: 'Date is out of allowed range',
            beforeMin: 'Date cannot be before {minDate}',
            afterMax: 'Date cannot be after {maxDate}',
            unsupportedFormat: 'Unsupported date format, supported formats: {formats}',
            parseError: 'Failed to parse date, please check the date format',
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
            minuteStepInvalid: 'Minute must be a multiple of {step}',
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
            clear: 'Clear',
            time: 'Time',
        },
        range: {
            start: 'Please select start date',
            end: 'Please select end date',
        }
    },
    yearSelector: {
        jumpToYear: 'Jump to Year',
        inputYearPlaceholder: 'Enter Gregorian year...',
        yearRangeInfo: '{calendar} Year Range: {min} - {max}',
        noYearsToDisplay: 'No years to display',
        returnToValidRange: 'Return to valid range',
    }
};
