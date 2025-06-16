import { App } from 'vue';
import { CalendarIdentifier } from '@internationalized/date';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComputedRef } from 'vue';
import { CreateComponentPublicInstanceWithMixins } from 'vue';
import { DateInputProps } from './components/inputs/DateInput.vue';
import { DefineComponent } from 'vue';
import { FieldError } from './types/internal';
import { GlobalComponents } from 'vue';
import { GlobalDirectives } from 'vue';
import { OutputType as OutputType_2 } from '.';
import { PublicProps } from 'vue';
import { TailwindColor as TailwindColor_2 } from '.';
import { TimeInputProps } from './components/inputs/TimeInput.vue';

declare const __VLS_component: DefineComponent<DatePickerProps, {
focus: () => void;
reset: () => void;
validate: () => Promise<boolean>;
selectNow: () => Promise<void>;
getDateTime: () => {
year: number;
month: number;
day: number;
hour?: number | undefined;
minute?: number | undefined;
second?: number | undefined;
} | null;
setDateTime: (dateTime: any) => void;
setTheme: (color: TailwindColor_2 | string) => void;
setDarkMode: () => void;
setLightMode: () => void;
setAutoMode: () => void;
getCurrentMode: () => "light" | "dark";
isDarkMode: () => boolean;
isLightMode: () => boolean;
getErrors: () => {
[x: string]: string;
};
hasErrors: () => boolean;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
change: (date: DateTimeInput) => any;
"update:modelValue": (date: DateTimeInput) => any;
validation: (isValid: boolean, errors: Record<string, string>) => any;
}, string, PublicProps, Readonly<DatePickerProps> & Readonly<{
onChange?: ((date: DateTimeInput) => any) | undefined;
"onUpdate:modelValue"?: ((date: DateTimeInput) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>) => any) | undefined;
}>, {
locale: string;
calendar: CalendarIdentifier;
modelValue: DateTimeInput;
required: boolean;
dateFormat: string;
enableSeconds: boolean;
use24Hour: boolean;
useLocalizedPeriod: boolean;
useI18n: boolean;
disabled: boolean;
weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
showTime: boolean;
autoFocusTimeAfterDate: boolean;
timeFormat: string;
outputType: OutputType_2;
useStrictISO: boolean;
placeholderOverrides: {
selectDate?: string;
year?: string;
month?: string;
day?: string;
hour?: string;
minute?: string;
second?: string;
};
mode: "light" | "dark" | "auto";
theme: TailwindColor_2 | string;
dateSeparator: string;
inputEnabled: boolean;
showClearButton: boolean;
showErrorMessage: boolean;
customErrorMessages: Record<string, string>;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
containerRef: HTMLDivElement;
dateInputRef: CreateComponentPublicInstanceWithMixins<Readonly<DateInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((date: string) => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => {
[x: string]: FieldError;
};
hasErrors: () => boolean;
errorMessages: () => string[];
focus: () => void;
focusLast: () => void;
setDate: (dateStr: string) => void;
resetCompletionState: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | null) => any;
validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
complete: (date: string) => any;
}, PublicProps, {
modelValue: string | null;
yearPlaceholder: string;
monthPlaceholder: string;
dayPlaceholder: string;
minDate: string | null;
maxDate: string | null;
required: boolean;
separator: string;
dateFormat: string;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<DateInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((date: string) => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => {
[x: string]: FieldError;
};
hasErrors: () => boolean;
errorMessages: () => string[];
focus: () => void;
focusLast: () => void;
setDate: (dateStr: string) => void;
resetCompletionState: () => void;
}, {}, {}, {}, {
modelValue: string | null;
yearPlaceholder: string;
monthPlaceholder: string;
dayPlaceholder: string;
minDate: string | null;
maxDate: string | null;
required: boolean;
separator: string;
dateFormat: string;
}> | null;
timeInputRef: CreateComponentPublicInstanceWithMixins<Readonly<TimeInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((time: string) => any) | undefined;
"onNavigate-to-date"?: (() => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => Record<string, string>;
hasErrors: ComputedRef<boolean>;
setTime: (timeStr: string) => void;
focus: () => void;
focusLast: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | null) => any;
validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
complete: (time: string) => any;
"navigate-to-date": () => any;
}, PublicProps, {
locale: string;
modelValue: string | null;
required: boolean;
hourPlaceholder: string;
minutePlaceholder: string;
secondPlaceholder: string;
enableSeconds: boolean;
use24Hour: boolean;
useLocalizedPeriod: boolean;
minuteStep: number;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
hourRef: HTMLInputElement;
minuteRef: HTMLInputElement;
secondRef: HTMLInputElement;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<TimeInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((time: string) => any) | undefined;
"onNavigate-to-date"?: (() => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => Record<string, string>;
hasErrors: ComputedRef<boolean>;
setTime: (timeStr: string) => void;
focus: () => void;
focusLast: () => void;
}, {}, {}, {}, {
locale: string;
modelValue: string | null;
required: boolean;
hourPlaceholder: string;
minutePlaceholder: string;
secondPlaceholder: string;
enableSeconds: boolean;
use24Hour: boolean;
useLocalizedPeriod: boolean;
minuteStep: number;
}> | null;
calendarRef: HTMLDivElement;
}, any>;

declare const __VLS_component_2: DefineComponent<DateRangeProps, {
reset: () => void;
validate: () => boolean;
setRange: (range: {
start: DateTimeInput;
end: DateTimeInput;
} | null) => void;
focusStartDate: (event: MouseEvent) => void;
focusEndDate: (event: MouseEvent) => void;
setTheme: (color: TailwindColor_2 | string) => void;
setDarkMode: () => void;
setLightMode: () => void;
setAutoMode: () => void;
getErrors: () => {
[x: string]: string;
};
hasErrors: () => boolean;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
change: (range: {
start: DateTimeInput;
end: DateTimeInput;
} | null) => any;
"update:modelValue": (range: {
start: DateTimeInput;
end: DateTimeInput;
} | null) => any;
validation: (isValid: boolean, errors: Record<string, string>) => any;
}, string, PublicProps, Readonly<DateRangeProps> & Readonly<{
onChange?: ((range: {
start: DateTimeInput;
end: DateTimeInput;
} | null) => any) | undefined;
"onUpdate:modelValue"?: ((range: {
start: DateTimeInput;
end: DateTimeInput;
} | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>) => any) | undefined;
}>, {
locale: string;
calendar: CalendarIdentifier;
modelValue: {
start: DateTimeInput;
end: DateTimeInput;
} | null;
minDate: DateTimeInput;
maxDate: DateTimeInput;
required: boolean;
separator: string;
dateFormat: string;
enableSeconds: boolean;
use24Hour: boolean;
useLocalizedPeriod: boolean;
useI18n: boolean;
disabled: boolean;
weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
showTime: boolean;
timeFormat: string;
outputType: OutputType_2;
useStrictISO: boolean;
placeholderOverrides: {
start?: string;
end?: string;
year?: string;
month?: string;
day?: string;
hour?: string;
minute?: string;
second?: string;
};
showShortcuts: boolean;
incomplete: boolean;
maxRange: number;
minRange: number;
mode: "light" | "dark" | "auto";
theme: TailwindColor_2 | string;
dateSeparator: string;
inputEnabled: boolean;
showClearButton: boolean;
showErrorMessage: boolean;
customErrorMessages: Record<string, string>;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
containerRef: HTMLDivElement;
calendarRef: HTMLDivElement;
startDateInputRef: CreateComponentPublicInstanceWithMixins<Readonly<DateInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((date: string) => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => {
[x: string]: FieldError;
};
hasErrors: () => boolean;
errorMessages: () => string[];
focus: () => void;
focusLast: () => void;
setDate: (dateStr: string) => void;
resetCompletionState: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | null) => any;
validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
complete: (date: string) => any;
}, PublicProps, {
modelValue: string | null;
yearPlaceholder: string;
monthPlaceholder: string;
dayPlaceholder: string;
minDate: string | null;
maxDate: string | null;
required: boolean;
separator: string;
dateFormat: string;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<DateInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((date: string) => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => {
[x: string]: FieldError;
};
hasErrors: () => boolean;
errorMessages: () => string[];
focus: () => void;
focusLast: () => void;
setDate: (dateStr: string) => void;
resetCompletionState: () => void;
}, {}, {}, {}, {
modelValue: string | null;
yearPlaceholder: string;
monthPlaceholder: string;
dayPlaceholder: string;
minDate: string | null;
maxDate: string | null;
required: boolean;
separator: string;
dateFormat: string;
}> | null;
startTimeInputRef: CreateComponentPublicInstanceWithMixins<Readonly<TimeInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((time: string) => any) | undefined;
"onNavigate-to-date"?: (() => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => Record<string, string>;
hasErrors: ComputedRef<boolean>;
setTime: (timeStr: string) => void;
focus: () => void;
focusLast: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | null) => any;
validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
complete: (time: string) => any;
"navigate-to-date": () => any;
}, PublicProps, {
locale: string;
modelValue: string | null;
required: boolean;
hourPlaceholder: string;
minutePlaceholder: string;
secondPlaceholder: string;
enableSeconds: boolean;
use24Hour: boolean;
useLocalizedPeriod: boolean;
minuteStep: number;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
hourRef: HTMLInputElement;
minuteRef: HTMLInputElement;
secondRef: HTMLInputElement;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<TimeInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((time: string) => any) | undefined;
"onNavigate-to-date"?: (() => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => Record<string, string>;
hasErrors: ComputedRef<boolean>;
setTime: (timeStr: string) => void;
focus: () => void;
focusLast: () => void;
}, {}, {}, {}, {
locale: string;
modelValue: string | null;
required: boolean;
hourPlaceholder: string;
minutePlaceholder: string;
secondPlaceholder: string;
enableSeconds: boolean;
use24Hour: boolean;
useLocalizedPeriod: boolean;
minuteStep: number;
}> | null;
endDateInputRef: CreateComponentPublicInstanceWithMixins<Readonly<DateInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((date: string) => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => {
[x: string]: FieldError;
};
hasErrors: () => boolean;
errorMessages: () => string[];
focus: () => void;
focusLast: () => void;
setDate: (dateStr: string) => void;
resetCompletionState: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | null) => any;
validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
complete: (date: string) => any;
}, PublicProps, {
modelValue: string | null;
yearPlaceholder: string;
monthPlaceholder: string;
dayPlaceholder: string;
minDate: string | null;
maxDate: string | null;
required: boolean;
separator: string;
dateFormat: string;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<DateInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((date: string) => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => {
[x: string]: FieldError;
};
hasErrors: () => boolean;
errorMessages: () => string[];
focus: () => void;
focusLast: () => void;
setDate: (dateStr: string) => void;
resetCompletionState: () => void;
}, {}, {}, {}, {
modelValue: string | null;
yearPlaceholder: string;
monthPlaceholder: string;
dayPlaceholder: string;
minDate: string | null;
maxDate: string | null;
required: boolean;
separator: string;
dateFormat: string;
}> | null;
endTimeInputRef: CreateComponentPublicInstanceWithMixins<Readonly<TimeInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((time: string) => any) | undefined;
"onNavigate-to-date"?: (() => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => Record<string, string>;
hasErrors: ComputedRef<boolean>;
setTime: (timeStr: string) => void;
focus: () => void;
focusLast: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | null) => any;
validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
complete: (time: string) => any;
"navigate-to-date": () => any;
}, PublicProps, {
locale: string;
modelValue: string | null;
required: boolean;
hourPlaceholder: string;
minutePlaceholder: string;
secondPlaceholder: string;
enableSeconds: boolean;
use24Hour: boolean;
useLocalizedPeriod: boolean;
minuteStep: number;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
hourRef: HTMLInputElement;
minuteRef: HTMLInputElement;
secondRef: HTMLInputElement;
}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<TimeInputProps> & Readonly<{
"onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
onComplete?: ((time: string) => any) | undefined;
"onNavigate-to-date"?: (() => any) | undefined;
}>, {
validate: () => void;
reset: () => void;
getErrors: () => Record<string, string>;
hasErrors: ComputedRef<boolean>;
setTime: (timeStr: string) => void;
focus: () => void;
focusLast: () => void;
}, {}, {}, {}, {
locale: string;
modelValue: string | null;
required: boolean;
hourPlaceholder: string;
minutePlaceholder: string;
secondPlaceholder: string;
enableSeconds: boolean;
use24Hour: boolean;
useLocalizedPeriod: boolean;
minuteStep: number;
}> | null;
}, any>;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: any) => any>> & Partial<Record<number, (_: {
        error: {
            field: string;
            message: string;
            originalKey: string;
        };
        message: string;
        field: string;
    }) => any>> & {
        error?(_: {
            errors: {
                [x: string]: string;
            };
            hasErrors: true;
        }): any;
    };
    refs: {
        containerRef: HTMLDivElement;
        dateInputRef: CreateComponentPublicInstanceWithMixins<Readonly<DateInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((date: string) => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => {
        [x: string]: FieldError;
        };
        hasErrors: () => boolean;
        errorMessages: () => string[];
        focus: () => void;
        focusLast: () => void;
        setDate: (dateStr: string) => void;
        resetCompletionState: () => void;
        }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
        "update:modelValue": (value: string | null) => any;
        validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
        complete: (date: string) => any;
        }, PublicProps, {
        modelValue: string | null;
        yearPlaceholder: string;
        monthPlaceholder: string;
        dayPlaceholder: string;
        minDate: string | null;
        maxDate: string | null;
        required: boolean;
        separator: string;
        dateFormat: string;
        }, false, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
        }, Readonly<DateInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((date: string) => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => {
        [x: string]: FieldError;
        };
        hasErrors: () => boolean;
        errorMessages: () => string[];
        focus: () => void;
        focusLast: () => void;
        setDate: (dateStr: string) => void;
        resetCompletionState: () => void;
        }, {}, {}, {}, {
        modelValue: string | null;
        yearPlaceholder: string;
        monthPlaceholder: string;
        dayPlaceholder: string;
        minDate: string | null;
        maxDate: string | null;
        required: boolean;
        separator: string;
        dateFormat: string;
        }> | null;
        timeInputRef: CreateComponentPublicInstanceWithMixins<Readonly<TimeInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((time: string) => any) | undefined;
        "onNavigate-to-date"?: (() => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => Record<string, string>;
        hasErrors: ComputedRef<boolean>;
        setTime: (timeStr: string) => void;
        focus: () => void;
        focusLast: () => void;
        }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
        "update:modelValue": (value: string | null) => any;
        validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
        complete: (time: string) => any;
        "navigate-to-date": () => any;
        }, PublicProps, {
        locale: string;
        modelValue: string | null;
        required: boolean;
        hourPlaceholder: string;
        minutePlaceholder: string;
        secondPlaceholder: string;
        enableSeconds: boolean;
        use24Hour: boolean;
        useLocalizedPeriod: boolean;
        minuteStep: number;
        }, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
        hourRef: HTMLInputElement;
        minuteRef: HTMLInputElement;
        secondRef: HTMLInputElement;
        }, any, ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
        }, Readonly<TimeInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((time: string) => any) | undefined;
        "onNavigate-to-date"?: (() => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => Record<string, string>;
        hasErrors: ComputedRef<boolean>;
        setTime: (timeStr: string) => void;
        focus: () => void;
        focusLast: () => void;
        }, {}, {}, {}, {
        locale: string;
        modelValue: string | null;
        required: boolean;
        hourPlaceholder: string;
        minutePlaceholder: string;
        secondPlaceholder: string;
        enableSeconds: boolean;
        use24Hour: boolean;
        useLocalizedPeriod: boolean;
        minuteStep: number;
        }> | null;
        calendarRef: HTMLDivElement;
    };
    rootEl: any;
};

declare function __VLS_template_2(): {
    attrs: Partial<{}>;
    slots: any;
    refs: {
        containerRef: HTMLDivElement;
        calendarRef: HTMLDivElement;
        startDateInputRef: CreateComponentPublicInstanceWithMixins<Readonly<DateInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((date: string) => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => {
        [x: string]: FieldError;
        };
        hasErrors: () => boolean;
        errorMessages: () => string[];
        focus: () => void;
        focusLast: () => void;
        setDate: (dateStr: string) => void;
        resetCompletionState: () => void;
        }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
        "update:modelValue": (value: string | null) => any;
        validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
        complete: (date: string) => any;
        }, PublicProps, {
        modelValue: string | null;
        yearPlaceholder: string;
        monthPlaceholder: string;
        dayPlaceholder: string;
        minDate: string | null;
        maxDate: string | null;
        required: boolean;
        separator: string;
        dateFormat: string;
        }, false, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
        }, Readonly<DateInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((date: string) => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => {
        [x: string]: FieldError;
        };
        hasErrors: () => boolean;
        errorMessages: () => string[];
        focus: () => void;
        focusLast: () => void;
        setDate: (dateStr: string) => void;
        resetCompletionState: () => void;
        }, {}, {}, {}, {
        modelValue: string | null;
        yearPlaceholder: string;
        monthPlaceholder: string;
        dayPlaceholder: string;
        minDate: string | null;
        maxDate: string | null;
        required: boolean;
        separator: string;
        dateFormat: string;
        }> | null;
        startTimeInputRef: CreateComponentPublicInstanceWithMixins<Readonly<TimeInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((time: string) => any) | undefined;
        "onNavigate-to-date"?: (() => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => Record<string, string>;
        hasErrors: ComputedRef<boolean>;
        setTime: (timeStr: string) => void;
        focus: () => void;
        focusLast: () => void;
        }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
        "update:modelValue": (value: string | null) => any;
        validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
        complete: (time: string) => any;
        "navigate-to-date": () => any;
        }, PublicProps, {
        locale: string;
        modelValue: string | null;
        required: boolean;
        hourPlaceholder: string;
        minutePlaceholder: string;
        secondPlaceholder: string;
        enableSeconds: boolean;
        use24Hour: boolean;
        useLocalizedPeriod: boolean;
        minuteStep: number;
        }, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
        hourRef: HTMLInputElement;
        minuteRef: HTMLInputElement;
        secondRef: HTMLInputElement;
        }, any, ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
        }, Readonly<TimeInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((time: string) => any) | undefined;
        "onNavigate-to-date"?: (() => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => Record<string, string>;
        hasErrors: ComputedRef<boolean>;
        setTime: (timeStr: string) => void;
        focus: () => void;
        focusLast: () => void;
        }, {}, {}, {}, {
        locale: string;
        modelValue: string | null;
        required: boolean;
        hourPlaceholder: string;
        minutePlaceholder: string;
        secondPlaceholder: string;
        enableSeconds: boolean;
        use24Hour: boolean;
        useLocalizedPeriod: boolean;
        minuteStep: number;
        }> | null;
        endDateInputRef: CreateComponentPublicInstanceWithMixins<Readonly<DateInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((date: string) => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => {
        [x: string]: FieldError;
        };
        hasErrors: () => boolean;
        errorMessages: () => string[];
        focus: () => void;
        focusLast: () => void;
        setDate: (dateStr: string) => void;
        resetCompletionState: () => void;
        }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
        "update:modelValue": (value: string | null) => any;
        validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
        complete: (date: string) => any;
        }, PublicProps, {
        modelValue: string | null;
        yearPlaceholder: string;
        monthPlaceholder: string;
        dayPlaceholder: string;
        minDate: string | null;
        maxDate: string | null;
        required: boolean;
        separator: string;
        dateFormat: string;
        }, false, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
        }, Readonly<DateInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((date: string) => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => {
        [x: string]: FieldError;
        };
        hasErrors: () => boolean;
        errorMessages: () => string[];
        focus: () => void;
        focusLast: () => void;
        setDate: (dateStr: string) => void;
        resetCompletionState: () => void;
        }, {}, {}, {}, {
        modelValue: string | null;
        yearPlaceholder: string;
        monthPlaceholder: string;
        dayPlaceholder: string;
        minDate: string | null;
        maxDate: string | null;
        required: boolean;
        separator: string;
        dateFormat: string;
        }> | null;
        endTimeInputRef: CreateComponentPublicInstanceWithMixins<Readonly<TimeInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((time: string) => any) | undefined;
        "onNavigate-to-date"?: (() => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => Record<string, string>;
        hasErrors: ComputedRef<boolean>;
        setTime: (timeStr: string) => void;
        focus: () => void;
        focusLast: () => void;
        }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
        "update:modelValue": (value: string | null) => any;
        validation: (isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any;
        complete: (time: string) => any;
        "navigate-to-date": () => any;
        }, PublicProps, {
        locale: string;
        modelValue: string | null;
        required: boolean;
        hourPlaceholder: string;
        minutePlaceholder: string;
        secondPlaceholder: string;
        enableSeconds: boolean;
        use24Hour: boolean;
        useLocalizedPeriod: boolean;
        minuteStep: number;
        }, false, {}, {}, GlobalComponents, GlobalDirectives, string, {
        hourRef: HTMLInputElement;
        minuteRef: HTMLInputElement;
        secondRef: HTMLInputElement;
        }, any, ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
        }, Readonly<TimeInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: string | null) => any) | undefined;
        onValidation?: ((isValid: boolean, errors: Record<string, string>, errorParams: Record<string, Record<string, any>>) => any) | undefined;
        onComplete?: ((time: string) => any) | undefined;
        "onNavigate-to-date"?: (() => any) | undefined;
        }>, {
        validate: () => void;
        reset: () => void;
        getErrors: () => Record<string, string>;
        hasErrors: ComputedRef<boolean>;
        setTime: (timeStr: string) => void;
        focus: () => void;
        focusLast: () => void;
        }, {}, {}, {}, {
        locale: string;
        modelValue: string | null;
        required: boolean;
        hourPlaceholder: string;
        minutePlaceholder: string;
        secondPlaceholder: string;
        enableSeconds: boolean;
        use24Hour: boolean;
        useLocalizedPeriod: boolean;
        minuteStep: number;
        }> | null;
    };
    rootEl: any;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_TemplateResult_2 = ReturnType<typeof __VLS_template_2>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_2<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare interface BaseDatePickerProps {
    mode?: 'light' | 'dark' | 'auto';
    theme?: TailwindColor | string;
    calendar?: CalendarIdentifier;
    locale?: string;
    outputType?: OutputType;
    useStrictISO?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    minDate?: DateTimeInput;
    maxDate?: DateTimeInput;
    dateSeparator?: string;
    dateFormat?: string;
    timeFormat?: string;
    showTime?: boolean;
    enableSeconds?: boolean;
    use24Hour?: boolean;
    useLocalizedPeriod?: boolean;
    disabled?: boolean;
    inputEnabled?: boolean;
    required?: boolean;
    showClearButton?: boolean;
    showErrorMessage?: boolean;
    useI18n?: boolean;
    customErrorMessages?: Record<string, string>;
}

export declare const DatePicker: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare interface DatePickerProps extends BaseDatePickerProps {
    modelValue?: DateTimeInput;
    customDefaultTime?: string;
    autoFocusTimeAfterDate?: boolean;
    placeholderOverrides?: {
        selectDate?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
    };
}

export declare const DateRange: __VLS_WithTemplateSlots_2<typeof __VLS_component_2, __VLS_TemplateResult_2["slots"]>;

export declare interface DateRangeProps extends BaseDatePickerProps {
    modelValue?: {
        start: DateTimeInput;
        end: DateTimeInput;
    } | null;
    placeholderOverrides?: {
        start?: string;
        end?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
    };
    separator?: string;
    showShortcuts?: boolean;
    incomplete?: boolean;
    maxRange?: number;
    minRange?: number;
}

/**
 * 支持的日期時間格式 - 限縮 @internationalized/date 的使用
 */
declare type DateTimeInput = string | Date | SimpleDateValue | null;

/**
 * 輸出資料類型
 * - 'iso': 標準 ISO 8601 字符串 2024-06-18T14:30:00
 * - 'date': JavaScript Date 對象 new Date(...)
 * - 'object': 結構化日期對象 { year: 2024, month: 6, day: 18 }
 * - 'custom': 自定義格式字符串 (使用 dateFormat 和 timeFormat) 2024年06月18日 下午2時30分 或 民國113年06月18日
 */
export declare type OutputType = 'iso' | 'date' | 'object' | 'custom';

/**
 * 內部使用的簡單日期介面(西元曆)，避免 @internationalized/date 的型別問題
 */
declare interface SimpleDateValue {
    year: number;
    month: number;
    day: number;
    hour?: number;
    minute?: number;
    second?: number;
}

export declare type TailwindColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

declare const VueDatePicker: {
    install(app: App): void;
};
export { VueDatePicker }
export default VueDatePicker;

export { }
