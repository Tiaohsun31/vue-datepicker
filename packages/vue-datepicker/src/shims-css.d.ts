// 讓元件庫的型別專案（tsconfig.lib / tsconfig.build）能解析 side-effect 的 CSS import，
// 例如 `import './styles/theme.css'`。放在 src/ 內，確保 type-check 與 build:types 都涵蓋。
declare module '*.css';
