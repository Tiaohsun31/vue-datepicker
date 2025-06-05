/**
 * useDateTimeValidation.ts
 * 處理日期時間驗證邏輯的 Composable
 */

import { ref, computed } from 'vue';

interface ValidationOptions {
    required?: boolean;
    showTime?: boolean;
}

export function useDateTimeValidation(options: ValidationOptions = {}) {
    const { required = true, showTime = false } = options;

    // 錯誤狀態
    const errors = ref<Record<string, string>>({});
    const formatErrors = ref<Record<string, string>>({});
    const errorParams = ref<Record<string, Record<string, any>>>({}); // 新增：錯誤參數存儲

    // 合併所有錯誤
    const mergedErrors = computed(() => {
        return { ...errors.value, ...formatErrors.value };
    });

    // 是否有錯誤
    const hasErrors = computed(() => {
        return Object.keys(mergedErrors.value).length > 0;
    });

    /**
     * 處理日期輸入驗證
     */
    const handleDateValidation = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        fieldPrefix: string = 'date',
        validationErrorParams: Record<string, Record<string, any>> = {}
    ) => {
        // 清除相關錯誤
        ['date', 'year', 'month', 'day'].forEach(field => {
            clearFieldErrors(`${fieldPrefix}.${field}`);
            clearFieldParams(`${fieldPrefix}.${field}`);
        });

        if (!isValid) {
            Object.entries(validationErrors).forEach(([field, localeKey]) => {
                const errorKey = `${fieldPrefix}.${field}`;

                errors.value[errorKey] = localeKey;

                if (validationErrorParams[field]) {
                    errorParams.value[errorKey] = validationErrorParams[field];
                }
            });
        }
    };

    /**
     * 處理時間輸入驗證
     */
    const handleTimeValidation = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        fieldPrefix: string = 'time',
        validationErrorParams: Record<string, Record<string, any>> = {}
    ) => {
        ['time', 'hour', 'minute', 'second'].forEach(field => {
            clearFieldErrors(`${fieldPrefix}.${field}`);
            clearFieldParams(`${fieldPrefix}.${field}`);
        });

        if (!isValid) {
            Object.entries(validationErrors).forEach(([key, localeKey]) => {
                const fullFieldKey = `${fieldPrefix}.${key}`;
                errors.value[fullFieldKey] = localeKey;

                if (validationErrorParams[key]) {
                    errorParams.value[fullFieldKey] = validationErrorParams[key];
                }
            });
        }

        return !hasErrors.value;
    };

    /**
     * 清除特定字段的錯誤
     */
    const clearFieldErrors = (fieldPrefix: string) => {
        Object.keys(errors.value).forEach(key => {
            if (key.startsWith(fieldPrefix)) {
                delete errors.value[key];
            }
        });
    };

    /**
     * 清除特定字段的錯誤參數
     */
    const clearFieldParams = (fieldPrefix: string) => {
        Object.keys(errorParams.value).forEach(key => {
            if (key.startsWith(fieldPrefix)) {
                delete errorParams.value[key];
            }
        });
    };

    /**
     * 清除所有錯誤
     */
    const clearAllErrors = () => {
        errors.value = {};
        formatErrors.value = {};
        errorParams.value = {};
    };

    /**
     * 設置格式錯誤
     */
    const setFormatError = (key: string, message: string) => {
        formatErrors.value[key] = message;
    };

    /**
     * 清除格式錯誤
     */
    const clearFormatError = (key: string) => {
        delete formatErrors.value[key];
    };

    /**
     * 驗證完整的日期時間
     */
    const validateDateTime = (
        dateValue: string | null,
        timeValue: string | null
    ) => {
        const validationResult = {
            isValid: true,
            errors: {} as Record<string, string>
        };

        // 檢查必填項
        if (required) {
            if (!dateValue) {
                validationResult.errors['date'] = 'date.required';
                validationResult.isValid = false;
            }

            if (showTime && !timeValue) {
                validationResult.errors['time'] = 'time.required';
                validationResult.isValid = false;
            }
        }

        // 更新錯誤狀態
        Object.assign(errors.value, validationResult.errors);

        return validationResult.isValid && !hasErrors.value;
    };

    return {
        // 狀態
        errors,
        formatErrors,
        mergedErrors,
        hasErrors,

        // 驗證方法
        handleDateValidation,
        handleTimeValidation,
        validateDateTime,

        // 錯誤管理
        clearFieldErrors,
        clearFieldParams,
        clearAllErrors,
        setFormatError,
        clearFormatError,
    };
}
