<!-- /**
 * 改進的 ThemeManager - 提供更實用的 themeClasses
 */

class ThemeManager {
  // ... 其他方法

  /**
   * 獲取主題類別（改進版）
   */
  getThemeClasses(instanceId: string): Record<string, boolean> {
    const state = this.instances.get(instanceId);
    if (!state) return {};

    return {
      // 穩定的通用類名
      'vdt-datepicker': true,
      'vdt-themed': true,

      // 主題色相關類名
      [`vdt-theme-${state.color}`]: true,

      // 模式相關類名
      [`vdt-mode-${state.currentMode}`]: true,
      'vdt-mode-auto': state.userPreference === 'auto',

      // 實例相關（用於調試，但不應用於 CSS）
      [`vdt-instance-${instanceId}`]: true,
    };
  }

  /**
   * 獲取容器屬性（改進版）
   */
  getContainerAttributes(instanceId: string): Record<string, string> {
    const state = this.instances.get(instanceId);
    if (!state) return {};

    const attributes: Record<string, string> = {
      'data-vdt-instance': instanceId,
      'data-vdt-theme': state.color,
      'data-vdt-mode-preference': state.userPreference,
    };

    // 只有在非 auto 模式時才設置 data-vdt-mode
    if (state.userPreference !== 'auto') {
      attributes['data-vdt-mode'] = state.currentMode;
    }

    return attributes;
  }
}

/* ========================================
   現在可以使用穩定的 CSS 類名了！
   ======================================== */

// ✅ 這些類名是穩定的，可以安全地用於 CSS

/* 通用 DatePicker 樣式 */
.vdt-datepicker {
  border-radius: 8px;
  transition: all 0.2s ease;
}

/* 主題色相關樣式 */
.vdt-theme-violet {
  /* violet 主題的特殊樣式 */
}

.vdt-theme-blue {
  /* blue 主題的特殊樣式 */
}

.vdt-theme-green {
  /* green 主題的特殊樣式 */
}

/* 模式相關樣式 */
.vdt-mode-dark {
  /* 深色模式的額外樣式（補充 CSS 變數）*/
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.vdt-mode-light {
  /* 淺色模式的額外樣式 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* auto 模式指示器（用於調試）*/
.vdt-mode-auto::before {
  content: "🌓";
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 12px;
  opacity: 0.5;
}

/* 組合選擇器 */
.vdt-datepicker.vdt-theme-violet.vdt-mode-dark {
  /* violet 主題在深色模式下的特殊樣式 */
}

/* ========================================
   屬性選擇器（推薦用法）
   ======================================== */

/* 基於 data 屬性的樣式（更靈活）*/
[data-vdt-theme="violet"] {
  /* violet 主題樣式 */
}

[data-vdt-theme="blue"] {
  /* blue 主題樣式 */
}

[data-vdt-mode="dark"] {
  /* 深色模式樣式 */
}

[data-vdt-mode-preference="auto"] {
  /* 自動模式的特殊處理 */
}

/* 組合屬性選擇器 */
[data-vdt-theme="violet"][data-vdt-mode="dark"] {
  /* violet 主題 + 深色模式 */
}

/* ========================================
   使用建議
   ======================================== */

/*
優先級建議：
1. 使用 CSS 變數（最靈活）: var(--color-vdt-surface)
2. 使用屬性選擇器（次推薦）: [data-vdt-theme="violet"]
3. 使用穩定類名（特殊情況）: .vdt-theme-violet
4. 避免使用實例 ID 類名（僅用於調試）: .vdt-instance-xxx
*/ -->
