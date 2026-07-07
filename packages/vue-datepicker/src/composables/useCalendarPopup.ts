/**
 * useCalendarPopup.ts
 * 管理日曆彈窗的顯示、隱藏和定位。
 *
 * 定位改用 @floating-ui/dom（computePosition + autoUpdate），搭配模板端的
 * `<Teleport to="body">`：
 *   - Teleport 讓彈窗脫離具有 transform / filter / overflow 的祖先（例如 Modal），
 *     徹底解決舊版「position: fixed 以視窗座標計算、卻被 transformed 祖先當成相對定位」
 *     導致的錯位／溢出，以及被可滾動容器裁切的問題。
 *   - floating-ui 的 flip/shift middleware 負責貼邊翻轉與內縮，維持在視窗內。
 */

import { ref, nextTick, onBeforeUnmount, type Ref, type ComputedRef } from 'vue';
import { computePosition, autoUpdate, offset, flip, shift, limitShift } from '@floating-ui/dom';

interface CalendarPopupOptions {
    disabled?: ComputedRef<boolean>;
    onOutsideClick?: () => void;
}

/** 觸發框與彈窗的間距（px），對應舊版 margin-top 的視覺間隙。 */
const POPUP_OFFSET = 4;
/** flip/shift 與視窗邊緣的安全內距（px）。 */
const VIEWPORT_PADDING = 8;

export function useCalendarPopup(
    containerRef: Ref<HTMLElement | null>,
    calendarRef: Ref<HTMLElement | null>,
    options: CalendarPopupOptions = {}
) {
    const { disabled, onOutsideClick } = options;

    const showCalendar = ref(false);

    // autoUpdate 的清理函式；彈窗開啟時註冊、關閉/卸載時呼叫。
    let stopAutoUpdate: (() => void) | null = null;

    /** 取得定位參考元素：優先用實際輸入框容器，退回 wrapper。 */
    const getReferenceEl = (): HTMLElement | null => {
        const container = containerRef.value;
        if (!container) return null;
        return (container.querySelector('.date-picker-container') as HTMLElement | null) ?? container;
    };

    /** 以 floating-ui 計算並套用一次位置。 */
    const updateCalendarPosition = () => {
        const reference = getReferenceEl();
        const floating = calendarRef.value;
        if (!reference || !floating) return;

        computePosition(reference, floating, {
            strategy: 'fixed',
            placement: 'bottom-start',
            middleware: [
                offset(POPUP_OFFSET),
                flip({ padding: VIEWPORT_PADDING }),
                shift({ padding: VIEWPORT_PADDING, limiter: limitShift() }),
            ],
        }).then(({ x, y }) => {
            Object.assign(floating.style, {
                position: 'fixed',
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    };

    /** 開啟後啟動 autoUpdate（scroll/resize/reflow 皆自動重算）。 */
    const startPositioning = () => {
        const reference = getReferenceEl();
        const floating = calendarRef.value;
        if (!reference || !floating) return;

        // 先固定於左上角，避免首次計算前的版面跳動。
        Object.assign(floating.style, { position: 'fixed', top: '0', left: '0' });
        stopAutoUpdate = autoUpdate(reference, floating, updateCalendarPosition);
    };

    /** 停止 autoUpdate。 */
    const stopPositioning = () => {
        stopAutoUpdate?.();
        stopAutoUpdate = null;
    };

    /**
     * 切換日曆顯示狀態
     */
    const toggleCalendar = () => {
        if (disabled?.value) return;

        showCalendar.value = !showCalendar.value;

        if (showCalendar.value) {
            nextTick(startPositioning);
        } else {
            stopPositioning();
        }
    };

    /**
     * 顯示日曆
     */
    const showCalendarPopup = () => {
        if (disabled?.value) return;

        showCalendar.value = true;
        nextTick(startPositioning);
    };

    /**
     * 隱藏日曆
     */
    const hideCalendar = () => {
        showCalendar.value = false;
        stopPositioning();
    };

    /**
     * 處理點擊外部事件
     */
    const handleClickOutside = (event: MouseEvent) => {
        const calendar = calendarRef.value;
        const container = containerRef.value;
        const target = event.target as Node;

        if (
            showCalendar.value &&
            calendar &&
            !calendar.contains(target) &&
            container &&
            !container.contains(target)
        ) {
            hideCalendar();
            onOutsideClick?.();
        }
    };

    /**
     * 處理容器點擊事件
     */
    const handleContainerClick = (
        event: MouseEvent,
        onNonInputClick?: () => void
    ) => {
        if (disabled?.value) return;

        const target = event.target as HTMLElement;

        // 檢查是否點擊到了輸入框或按鈕
        const isInputElement = target.classList.contains('date-input') ||
            target.classList.contains('time-input') ||
            target.closest('input') ||
            target.closest('button');

        // 如果點擊的不是輸入框或按鈕
        if (!isInputElement) {
            event.preventDefault();
            onNonInputClick?.();
        }
    };

    /**
     * 處理容器 mousedown 事件（防止失焦）
     */
    const handleContainerMouseDown = (event: MouseEvent) => {
        if (disabled?.value) return;

        const target = event.target as HTMLElement;

        // 如果點擊的不是輸入框，防止失去焦點
        const isInputElement = target.classList.contains('date-input') ||
            target.classList.contains('time-input') ||
            target.closest('input') ||
            target.closest('button');

        if (!isInputElement) {
            event.preventDefault();
        }
    };

    // 事件監聽器（定位交給 floating-ui 的 autoUpdate，這裡只處理點擊外部關閉）
    if (typeof document !== 'undefined') {
        document.addEventListener('mousedown', handleClickOutside);
    }

    onBeforeUnmount(() => {
        if (typeof document !== 'undefined') {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        stopPositioning();
    });

    return {
        // 狀態
        showCalendar,

        // 主要方法
        toggleCalendar,
        showCalendarPopup,
        hideCalendar,
        updateCalendarPosition,

        // 事件處理
        handleContainerClick,
        handleContainerMouseDown,
    };
}
