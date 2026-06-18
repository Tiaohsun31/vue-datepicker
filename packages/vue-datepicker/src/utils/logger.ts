/**
 * 套件統一的 dev-gated logger。
 *
 * 全部以 `import.meta.env.DEV` 收斂：library / 消費者以 production 模式打包時，
 * 該旗標會被靜態替換為 `false`，整段 `console.*` 成為死碼被 tree-shake，
 * 因此**出貨 bundle 不含任何 console 輸出**（解決 §5.5「production 也輸出」）。
 *
 * 所有訊息一律加上 `[vue-datepicker]` 前綴，與主題 dev-warn 一致。
 */
const PREFIX = '[vue-datepicker]';

/** dev 模式警告（無效輸入、可回復的異常狀態）。 */
export function warn(...args: unknown[]): void {
    if (import.meta.env.DEV) console.warn(PREFIX, ...args);
}

/** dev 模式錯誤（捕捉到的例外、不該發生的分支）。命名為 logError 以避免與 `catch (error)` 衝突。 */
export function logError(...args: unknown[]): void {
    if (import.meta.env.DEV) console.error(PREFIX, ...args);
}

/** dev 模式除錯訊息（流程追蹤；預設不輸出，僅供開發追查）。 */
export function logDebug(...args: unknown[]): void {
    if (import.meta.env.DEV) console.log(PREFIX, ...args);
}
