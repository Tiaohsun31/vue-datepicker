/**
 * useInputNavigation.ts
 * 處理 DateInput 和 TimeInput 之間的導航邏輯
 */

import { ref, nextTick, type Ref } from 'vue';

interface InputRefs {
    dateInputRef: Ref<any>;
    timeInputRef: Ref<any>;
}

interface NavigationOptions {
    showTime: boolean;
    autoFocusTimeAfterDate?: boolean;
}

export function useInputNavigation(
    inputRefs: InputRefs,
    options: NavigationOptions
) {
    const { dateInputRef, timeInputRef } = inputRefs;
    const { showTime, autoFocusTimeAfterDate = true } = options;

    /**
     * 聚焦到第一個輸入框（日期輸入的第一個）
     */
    const focusFirstInput = () => {
        nextTick(() => {
            if (dateInputRef.value?.focus) {
                dateInputRef.value.focus();
            }
        });
    };

    /**
     * 聚焦到最後一個輸入框（根據配置決定是日期還是時間）
     */
    const focusLastInput = () => {
        nextTick(() => {
            if (showTime && timeInputRef.value?.focusLast) {
                timeInputRef.value.focusLast();
            } else if (dateInputRef.value?.focusLast) {
                dateInputRef.value.focusLast();
            } else if (dateInputRef.value?.focus) {
                dateInputRef.value.focus();
            }
        });
    };

    /**
     * 從日期輸入完成後導航到時間輸入
     */
    const handleNavigateToTime = (defaultTimeValue?: string | null) => {
        if (!showTime) return;

        nextTick(() => {
            if (timeInputRef.value?.focus) {
                timeInputRef.value.focus();
            }
        });
    };

    /**
     * 從時間輸入導航回日期輸入
     */
    const handleNavigateToDate = () => {
        nextTick(() => {
            if (dateInputRef.value?.focusLast) {
                // 聚焦到日期輸入的最後一個輸入框
                dateInputRef.value.focusLast();
            } else if (dateInputRef.value?.focus) {
                // 回退到聚焦第一個輸入框
                dateInputRef.value.focus();
            }
        });
    };

    /**
     * 自動聚焦時間輸入（在日期完成後）
     */
    const autoFocusTimeAfterDateComplete = (
        hasTimeValue: boolean,
        defaultTimeValue?: string
    ) => {
        if (!showTime || !autoFocusTimeAfterDate) return;

        // 如果沒有時間值，可以設置一個默認值
        if (!hasTimeValue && defaultTimeValue) {
            // 這裡需要由調用方處理設置時間值
        }

        nextTick(() => {
            if (timeInputRef.value?.focus) {
                timeInputRef.value.focus();
            }
        });
    };

    return {
        // 基本導航方法
        focusFirstInput,
        focusLastInput,

        // 專門的導航處理
        handleNavigateToTime,
        handleNavigateToDate,
        autoFocusTimeAfterDateComplete,
    };
}
