# @tiaohsun/vue-datepicker ROADMAP

> 本檔承接 [`refactor-plan.md`](./refactor-plan.md)（2.0.0 重構已完成）。
> refactor-plan 是「把 1.x 拉到 2.0 的一次性重構」；本檔是「2.0 之後的持續演進」。
> 任何接手 session：先讀 refactor-plan 的 §0 背景與 §7 進度,再依本檔的「里程碑」與「進度追蹤」接續。
>
> 嚴重度/優先級標記沿用 refactor-plan:🔴 高(正確性/核心價值) / 🟡 中(可維護性/體驗) / ⚪ 低(清理)。
> 規模標記:🟢 小 / 🟡 中 / 🔴 大(跨多檔/破壞性)。

---

## 0. 里程碑總覽

| 里程碑   | 主題          | 內容                                                          | 破壞性   |
| -------- | ------------- | ------------------------------------------------------------- | -------- |
| **v2.1** | 補完 + 無障礙 | refactor-plan 殘留清理、a11y 完整化、彈窗定位、`disabledDate` | 否(增量) |
| **v2.2** | 功能擴充      | 日期標記/slot、inline 模式、MonthPicker/YearPicker/WeekPicker | 否(增量) |
| **v3.0** | 生態整合      | Nuxt module、表單 adapter、確認/多選模式、更多語系            | 可能     |

> 排序原則:先還技術債與無障礙(低風險、高價值),再做增量功能,最後才動生態整合。
> **原生曆法網格(原 §D,源自 6.4)已實作完成**,內容移入 [`refactor-plan.md` §6.11](./refactor-plan.md)(本屬 2.0 Phase 6 的核心日曆延伸)。

---

## A. refactor-plan 殘留項(技術債清理)

> 來源:refactor-plan 中標 `⬜` / `📌留後續` / 「評估後不做」的尾巴。
> 已於後續 session 修復並移出本清單:§5.7 `useLocale` 跨實例洩漏、YearSelector `民國前` 硬編、6.6 ROC `formatDatePart` 脆弱性。

| ID  | 項目                                                                                          | 嚴重度 | 規模 | 里程碑    | 備註                                                                           |
| --- | --------------------------------------------------------------------------------------------- | ------ | ---- | --------- | ------------------------------------------------------------------------------ |
| A1  | 清除註解掉的測試(`DatePicker.test.ts` 日曆位置、`calendarUtils.test.ts:304` 伊斯蘭曆)         | ⚪     | 🟢   | v2.1      | 純清理                                                                         |
| A2  | §5.1 殘留:`dateFormat`/`outputType`/`showTime` 仍以快照傳給子 composable,執行期動態變更不反應 | 🟡     | 🟡   | v2.1      | 罕見用法;統一 getter/ref 傳遞                                                  |
| A3  | §5.4 殘留:7 處「合理動態」`any`(i18n 樹遍歷 / deepMerge / slot map / lib cast)                | ⚪     | 🟢   | 隨緣      | 接受現狀,有更佳型別再收                                                        |
| A4  | 6.3 `formatOutput` 同名兩份收斂 + 位置參數→options 物件                                       | 🟡     | 🟡   | 隨緣      | refactor-plan 已評估「不做」(分層非真重複、純防呆 churn);如日後易錯再議        |
| A5  | 6.5 非西元曆忽略 `dateFormat` pattern(目前僅文件化)                                           | 🟡     | 🟡   | 隨緣      | 原生曆法網格(§6.11)只解決「顯示」;任意 pattern 格式化仍是 Intl 限制,維持文件化 |
| A6  | 6.7 拆分 `CalendarUtils` 570 行 god-class(conversion / grid / metadata / formatting)          | ⚪     | 🟡   | 隨緣      | 獨立低優先;原生曆法網格僅在其上新增方法,未拆檔                                 |
| A7  | `TimePicker.vue` 死碼                                                                         | ⚪     | 🟢   | 併入 v2.2 | 使用者指示保留為擴充候選 → 併入「獨立 picker 模式」一起轉正                    |

---

## B. 優化(技術品質)

| ID  | 項目                   | 嚴重度 | 規模 | 里程碑 | 說明                                                                                                                                                                                                           |
| --- | ---------------------- | ------ | ---- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B1  | **無障礙(a11y)完整化** | 🟡     | 🟡   | v2.1   | 現有:`CalendarCell` 的 `tabindex`/`aria-selected`/方向鍵導航。缺:彈窗 `role="dialog"`+`aria-modal`、`role="grid"/gridcell`、focus trap、關閉時焦點歸還觸發元件、`aria-live` 朗讀當前月/選取日。補 axe 自動測試 |
| B2  | **彈窗定位智慧化**     | 🟡     | 🟡   | v2.1   | 確認/加強 `useCalendarPopup`:collision detection / auto-flip / Teleport 到 body(避免被 overflow 裁切)                                                                                                          |
| B3  | **SSR / Nuxt 驗證**    | 🟡     | 🟡   | v3.0   | 計畫宣稱 `prefers-color-scheme` SSR-safe,但無 Nuxt module 或 SSR guide;補 hydration 測試 + SSR 文件                                                                                                            |
| B4  | **CI/CD 強化**         | 🟡     | 🟡   | v2.1   | size-limit/bundle 監控、自動發佈、Playwright 視覺回歸、a11y 自動測試(axe)                                                                                                                                      |
| B5  | **全響應式 props**     | 🟡     | 🟡   | v2.1   | 即 A2;統一 getter/ref 傳遞,執行期改 props 即時反應                                                                                                                                                             |

---

## C. 新功能(產品能力)

| ID  | 項目                                                             | 嚴重度 | 規模 | 里程碑 | 說明                                                                                                    |
| --- | ---------------------------------------------------------------- | ------ | ---- | ------ | ------------------------------------------------------------------------------------------------------- |
| C1  | **`disabledDate` 述詞 / 停用特定日期 / 停用星期**                | 🔴     | 🟡   | v2.1   | 目前只有 `minDate`/`maxDate`;最常被要求的能力。`disabledDate?: (date) => boolean` + `disabledWeekdays?` |
| C2  | **日期標記 / 事件 / 假日高亮**                                   | 🟡     | 🟡   | v2.2   | 日格上的點/徽章;`markers?: Map<dateKey, …>` 或 slot                                                     |
| C3  | **可自訂日格 slot(`#day-cell`)**                                 | 🟡     | 🟡   | v2.2   | 讓消費者完全控制日格渲染(配合 C2)                                                                       |
| C4  | **獨立 MonthPicker / YearPicker / WeekPicker / TimePicker 模式** | 🟡     | 🔴   | v2.2   | 湊成完整族群;吸收 A7 的 `TimePicker.vue`                                                                |
| C5  | **內嵌(inline / always-open)模式**                               | 🟡     | 🟡   | v2.2   | 無輸入框、直接嵌入日曆                                                                                  |
| C6  | **確認模式(footer + apply/cancel)+ 多選日期**                    | 🟡     | 🟡   | v3.0   | `confirm` mode / `multiple` mode                                                                        |
| C7  | **時間限制 + 週數顯示**                                          | 🟡     | 🟡   | v3.0   | minTime/maxTime/停用時段/分鐘 step;`showWeekNumbers`                                                    |
| C8  | **表單整合 adapter + 更多內建語系**                              | 🟡     | 🟡   | v3.0   | VeeValidate / Zod adapter;目前僅 5 語系(en/ja/ko/zh-CN/zh-TW)                                           |

---

## D. 核心架構:原生曆法網格 → ✅ 已完成(內容已移至 refactor-plan)

> 此項源自 refactor-plan 6.4(`getMonthNames` 忽略 `calendarId`),本屬 2.0 Phase 6 核心日曆延伸,
> 已實作完成,完整設計與實作記錄移至 [`refactor-plan.md` §6.11「原生曆法網格」](./refactor-plan.md)。
>
> 摘要:採「單一泛用 grid + 原生 `viewDate` 視圖狀態 + canonical 維持西元」;
> Hebrew/Islamic 等非對齊曆法已能原生渲染(原生月名、原生年號、原生月長 29/30、希伯來閏年 13 月)。
> `descriptor.component` 逃生艙評估後延後(Intl 表達不了的曆法才需要)。

---

## 進度追蹤

| 里程碑              | 狀態      | 備註                                                                                   |
| ------------------- | --------- | -------------------------------------------------------------------------------------- |
| 原生曆法網格(原 §D) | ✅ 完成   | 已移入 refactor-plan §6.11;type-check/build 0、554 測試綠、Hebrew/Islamic preview 驗證 |
| v2.1 補完 + 無障礙  | ⬜ 未開始 | A1/A2/B1/B2/B4/B5/C1                                                                   |
| v2.2 功能擴充       | ⬜ 未開始 | A7/C2/C3/C4/C5                                                                         |
| v3.0 生態整合       | ⬜ 未開始 | B3/C6/C7/C8                                                                            |

> 接手 session:完成項目更新對應狀態(⬜未開始 / 🟡進行中 / ✅完成),並把已落地的細節回寫到對應章節。
