// directives/v-autowidth.ts
// 創建一個單一的共享 span 元素
let sharedSpan: HTMLSpanElement | null = null;

function getSharedSpan(): HTMLSpanElement {
    if (!sharedSpan) {
        sharedSpan = document.createElement('span');
        sharedSpan.style.visibility = 'hidden';
        sharedSpan.style.position = 'absolute';
        sharedSpan.style.top = '-9999px';
        sharedSpan.style.left = '-9999px';
        sharedSpan.style.whiteSpace = 'pre';
        document.body.appendChild(sharedSpan);
    }
    return sharedSpan;
}

// 用於存儲每個元素的最小寬度
const minWidthMap = new WeakMap<HTMLElement, number>();

function measureWidth(input: HTMLInputElement, placeholder = ''): number {
    const span = getSharedSpan();
    const style = getComputedStyle(input);

    // 應用當前元素的樣式到共享 span
    span.style.font = style.font;
    span.style.fontSize = style.fontSize;
    span.style.fontWeight = style.fontWeight;
    span.style.letterSpacing = style.letterSpacing;
    span.style.padding = style.padding;
    span.style.border = style.border;
    span.style.boxSizing = style.boxSizing;

    // 測量實際內容或佔位符的寬度
    span.textContent = input.value || placeholder || '';

    // 添加小緩衝以避免文本被截斷
    return span.offsetWidth + 4; // 可調整 buffer
}

function updateWidth(el: HTMLInputElement) {
    const placeholder = el.placeholder || '';
    const width = measureWidth(el, placeholder);

    // 獲取存儲的最小寬度（如果有）
    const minWidth = minWidthMap.get(el) || 0;

    // 使用計算寬度和最小寬度中的較大值
    el.style.width = `${Math.max(width, minWidth)}px`;
}

// 清理函數
function cleanup() {
    if (sharedSpan && document.body.contains(sharedSpan)) {
        document.body.removeChild(sharedSpan);
        sharedSpan = null;
    }
}

export default {
    // 初始設置
    mounted(el: HTMLInputElement, binding: {
        value?: unknown;
        oldValue?: unknown;
    }) {
        // 存儲初始最小寬度（如果在綁定值中提供）
        if (binding.value && typeof binding.value === 'number') {
            minWidthMap.set(el, binding.value);
        }

        // 初始寬度計算
        updateWidth(el);

        // 添加事件監聽
        el.addEventListener('input', () => updateWidth(el));

        // 監聽字體加載完成事件（如果可用）
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => updateWidth(el));
        }
    },

    // 處理更新
    updated(el: HTMLInputElement, binding: {
        value?: unknown;
        oldValue?: unknown;
    }) {
        // 更新最小寬度（如果在綁定值中提供）
        if (binding.value && typeof binding.value === 'number' &&
            binding.oldValue !== binding.value) {
            minWidthMap.set(el, binding.value);
        }

        updateWidth(el);
    },

    // 清理
    unmounted(el: HTMLInputElement) {
        el.removeEventListener('input', () => updateWidth(el));

        // 如果這是最後一個使用該指令的元素，清理共享 span
        // 這是一個簡化的檢查，實際中可能需要更精確的引用計數
        setTimeout(() => {
            // 延遲檢查，避免在組件快速重新掛載時不必要的清理
            const autowidthElements = document.querySelectorAll('[v-autowidth]');
            if (autowidthElements.length === 0) {
                cleanup();
            }
        }, 1000);
    },

    // 為 Vue 3 添加 beforeUnmount
    beforeUnmount(el: HTMLInputElement) {
        el.removeEventListener('input', () => updateWidth(el));
    }
};
