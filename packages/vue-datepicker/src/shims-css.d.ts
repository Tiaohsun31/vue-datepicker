/// <reference types="vite/client" />
// 讓元件庫的型別專案（tsconfig.lib / tsconfig.build）能解析：
//  - side-effect 的 CSS import（例如 `import './styles/theme.css'`）
//  - `import.meta.env.DEV` 等 Vite 注入的環境變數（useTheme dev 警告用）
// vite/client 已宣告 `*.css` 模組與 ImportMeta.env，故毋需再手動 declare。
