/** i18n 插值參數的值型別（錯誤訊息只會帶字串或數字）。 */
export type ErrorParamValue = string | number;

/** i18n 訊息插值的具名參數（參數名 → 字串/數字），用於 getMessage / interpolate 等。 */
export type MessageParams = Record<string, string | number>;

/** 單一欄位的錯誤插值參數（參數名 → 值），如 `{ minDate: '2024-01-01' }`。 */
export type ErrorParams = Record<string, ErrorParamValue>;

/** 多欄位錯誤參數（欄位名 → 該欄位的插值參數），如 `{ year: { min: 1, max: 9999 } }`。 */
export type FieldErrorParams = Record<string, ErrorParams>;

export interface FieldError {
    key: string;
    params?: ErrorParams;
}

/**
 * DateInput / TimeInput 對外暴露、被 composable 的導航與驗證流程取用的方法子集。
 * 用窄介面（而非完整 `InstanceType`）作為 composable ↔ 元件的邊界型別：取代 `Ref<any>`，
 * 又不強迫呼叫端（含測試 mock）提供整個 Vue 元件實例。
 */
export interface DateTimeInputExpose {
    /** 觸發驗證並回傳是否有效（呼叫端會 await，故同步/非同步皆可）。 */
    validate: () => boolean | Promise<boolean>;
    /** 聚焦第一個輸入欄位。 */
    focus: () => void;
    /** 聚焦最後一個輸入欄位。 */
    focusLast: () => void;
}
