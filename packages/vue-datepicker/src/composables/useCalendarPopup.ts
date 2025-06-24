/**
 * useCalendarPopup.ts
 * 管理日曆彈窗的顯示、隱藏和定位
 */

import { ref, nextTick, onMounted, onBeforeUnmount, type Ref } from 'vue';

interface CalendarPopupOptions {
    disabled?: Ref<boolean>;
    onOutsideClick?: () => void;
}

export function useCalendarPopup(
    containerRef: Ref<HTMLElement | null>,
    calendarRef: Ref<HTMLElement | null>,
    options: CalendarPopupOptions = {}
) {
    const { disabled, onOutsideClick } = options;

    const showCalendar = ref(false);

    /**
     * 切換日曆顯示狀態
     */
    const toggleCalendar = () => {
        if (disabled?.value) return;

        showCalendar.value = !showCalendar.value;

        if (showCalendar.value) {
            nextTick(() => {
                updateCalendarPosition();
            });
        }
    };

    /**
     * 顯示日曆
     */
    const showCalendarPopup = () => {
        if (disabled?.value) return;

        showCalendar.value = true;
        nextTick(() => {
            updateCalendarPosition();
        });
    };

    /**
     * 隱藏日曆
     */
    const hideCalendar = () => {
        showCalendar.value = false;
    };

    /**
     * 更新日曆位置
     */
    const updateCalendarPosition = () => {
        if (!containerRef.value || !calendarRef.value) return;

        const containerRect = containerRef.value.getBoundingClientRect();
        const calendar = calendarRef.value;
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // 計算基本位置（輸入框下方）
        let top = containerRect.height + 5;
        let left = 0;

        // 檢查是否需要調整位置以防止超出視窗
        const calendarRect = calendar.getBoundingClientRect();

        // 水平位置調整
        if (containerRect.left + calendarRect.width > viewport.width) {
            left = viewport.width - containerRect.left - calendarRect.width - 10;
        }

        // 垂直位置調整（如果下方空間不足，顯示在上方）
        if (containerRect.bottom + calendarRect.height > viewport.height) {
            top = -calendarRect.height - 5;
        }

        // 應用位置
        calendar.style.position = 'absolute';
        calendar.style.top = `${top}px`;
        calendar.style.left = `${left}px`;
        calendar.style.zIndex = '50';
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

    /**
     * 處理窗口大小變化
     */
    const handleResize = () => {
        if (showCalendar.value) {
            updateCalendarPosition();
        }
    };

    /**
     * 處理滾動事件
     */
    const handleScroll = () => {
        if (showCalendar.value) {
            updateCalendarPosition();
        }
    };

    // 事件監聽器
    onMounted(() => {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
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
