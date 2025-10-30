# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2025-10-30

### Fixed

- 🐛 In the Disabled state, DateInput and TimeInput were not passed correctly. / Disabled狀態下，未正確傳入 DateInput 及 TimeInput

### Added

- 🔧 The default date icon position has been changed to the front, and a new `showCalendarIcon` attribute has been added, allowing users to choose whether to display it. / 預設日期圖標位置改為前面，並新增`showCalendarIcon`屬性，可自行選擇是否顯示。

## [1.0.3] - 2025-10-03

### Fixed

- 🐛 Fixed Disabled only working after initialization / 修復 Disabled 只有在初始化才有作用

### Added

- 🆔 Added support for id and name for label matching / 新增支援id與name，以與label進行搭配
- 🔧 Fixed many type defaults issues / 處理大量型別預設問題

## [1.0.2] - 2025-08-28

### Fixed

- 🐛 Fixed the issue where the input box and date picker displayed abnormally in the Grid / 修復在 Grid 的情況下，輸入框與日期選擇器顯示異常

## [1.0.0] - 2025-07-03

### Added

- 🎉 Initial release of @tiaohsun/vue-datepicker / @tiaohsun/vue-datepicker 首次發布
- 📅 Vue 3 datepicker component with multi-calendar support / Vue 3 日期選擇器組件，支援多月曆顯示
- 🎨 Styled with Tailwind CSS for modern design / 使用 Tailwind CSS 設計現代化樣式
- 🌍 Internationalization (i18n) support / 國際化（i18n）支援
- 📱 Responsive design for mobile and desktop / 響應式設計，支援手機和桌面
- 🔧 TypeScript support with full type definitions / TypeScript 支援與完整型別定義
- 📝 Comprehensive documentation website / 完整的文件網站
- 🧪 Unit tests with Vitest / Vitest 單元測試
- 🎭 E2E tests with Playwright / Playwright E2E 測試
- 📦 Multiple export formats (ES modules, UMD, TypeScript definitions) / 多種匯出格式支援
- 🎯 Date range selection support / 日期範圍選擇支援
- 📚 Integration with @internationalized/date and dayjs / 整合 @internationalized/date 和 dayjs
- 🎪 Interactive demo and examples / 互動式示例和範例

### Features / 功能特色

- Single date selection / 單一日期選擇
- Date range selection / 日期範圍選擇
- Multiple calendar views / 多月曆檢視
- Customizable styling / 可自訂樣式
- Keyboard navigation / 鍵盤導航
- Accessibility support / 無障礙支援
- Locale-specific formatting / 地區特定格式化
- Disabled dates configuration / 停用日期設定
- Custom date validation / 自訂日期驗證
- Flexible positioning options / 靈活的定位選項

[1.0.0]: https://github.com/Tiaohsun31/vue-datepicker/releases/tag/v1.0.0
