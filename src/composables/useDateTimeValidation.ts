/**
 * useDateTimeValidation.ts
 * 處理日期時間驗證邏輯的 Composable
 */

import { ref, computed, type Ref } from 'vue';
import { localeManager } from '@/locale/index';

interface ValidationOptions {
    required?: boolean;
    showTime?: boolean;
}

export function useDateTimeValidation(options: ValidationOptions = {}) {
    const { required = true, showTime = false } = options;

    // 錯誤狀態
    const errors = ref<Record<string, string>>({});
    const formatErrors = ref<Record<string, string>>({});

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
     * 通用的驗證處理器，負責管理錯誤狀態，處理錯誤的存儲、清除等基礎操作
     */
    const handleDateValidation = (
        isValid: boolean,
        validationErrors: Record<string, string>,
        fieldPrefix: string = 'date',
        errorParams: Record<string, Record<string, any>> = {}
    ) => {
        // 清除相關錯誤
        ['date', 'year', 'month', 'day'].forEach(field => {
            clearFieldErrors(`${fieldPrefix}.${field}`);
        });

        console.log('handleDateValidation', isValid, validationErrors, fieldPrefix, errorParams);

        if (!isValid) {
            Object.entries(validationErrors).forEach(([field, localeKey]) => {

                const errorKey = `${fieldPrefix}.${field}`;
                const params = errorParams[field] || {};

                try {
                    errors.value[errorKey] = localeManager.getParameterizedErrorMessage(localeKey, params);
                    if (process.env.NODE_ENV === 'development') {
                        console.log(`翻譯錯誤: ${localeKey} -> ${errors.value[errorKey]}`, params);
                    }
                } catch (error) {
                    console.warn(`翻譯失敗: ${localeKey}`, error);
                    // 回退到原始 key
                    errors.value[errorKey] = localeKey;
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
        fieldPrefix: string = 'time'
    ) => {
        // 清除該字段相關的錯誤
        clearFieldErrors(fieldPrefix);

        // 添加新錯誤
        if (!isValid) {
            Object.entries(validationErrors).forEach(([key, message]) => {
                errors.value[`${fieldPrefix}.${key}`] = message;
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
     * 清除所有錯誤
     */
    const clearAllErrors = () => {
        errors.value = {};
        formatErrors.value = {};
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
                validationResult.errors['date'] = '請選擇日期';
                validationResult.isValid = false;
            }

            if (showTime && !timeValue) {
                validationResult.errors['time'] = '請選擇時間';
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
        clearAllErrors,
        setFormatError,
        clearFormatError,
    };
}
