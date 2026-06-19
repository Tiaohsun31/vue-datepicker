# @tiaohsun/vue-datepicker ROADMAP

> 本檔承接 [`RefactorPlan.md`](./RefactorPlan.md)（2.0.0 重構已完成）。
> RefactorPlan 是「把 1.x 拉到 2.0 的一次性重構」；本檔是「2.0 之後的持續演進」。
> 任何接手 session：先讀 RefactorPlan 的 §0 背景與 §7 進度,再依本檔的「里程碑」與「進度追蹤」接續。
>
> 嚴重度/優先級標記沿用 RefactorPlan:🔴 高(正確性/核心價值) / 🟡 中(可維護性/體驗) / ⚪ 低(清理)。
> 規模標記:🟢 小 / 🟡 中 / 🔴 大(跨多檔/破壞性)。

---

## 0. 里程碑總覽

| 里程碑 | 主題 | 內容 | 破壞性 |
|--------|------|------|--------|
| **v2.1** | 補完 + 無障礙 | RefactorPlan 殘留清理、a11y 完整化、彈窗定位、`disabledDate` | 否(增量) |
| **v2.2** | 功能擴充 | 日期標記/slot、inline 模式、MonthPicker/YearPicker/WeekPicker | 否(增量) |
| **v2.x** | 原生曆法網格 | Hebrew/Islamic 等非對齊曆法原生渲染(§D,本檔重點討論項) | 否(僅視圖層) |
| **v3.0** | 生態整合 | Nuxt module、表單 adapter、確認/多選模式、更多語系 | 可能 |

> 排序原則:先還技術債與無障礙(低風險、高價值),再做增量功能,最後才動核心架構(原生曆法網格)與生態。
> 原生曆法網格(§D)經細部評估後規模由 🔴 下修為 🟡:grid 已是原生產格,僅需把「導航視圖狀態」的錨點原生化,且 canonical 值模型維持西元不變(現狀即如此),不綁死版本但風險可控。

---

## A. RefactorPlan 殘留項(技術債清理)

> 來源:RefactorPlan 中標 `⬜` / `📌留後續` / 「評估後不做」的尾巴。
> 已於後續 session 修復並移出本清單:§5.7 `useLocale` 跨實例洩漏、YearSelector `民國前` 硬編、6.6 ROC `formatDatePart` 脆弱性。

| ID | 項目 | 嚴重度 | 規模 | 里程碑 | 備註 |
|----|------|--------|------|--------|------|
| A1 | 清除註解掉的測試(`DatePicker.test.ts` 日曆位置、`calendarUtils.test.ts:304` 伊斯蘭曆) | ⚪ | 🟢 | v2.1 | 純清理 |
| A2 | §5.1 殘留:`dateFormat`/`outputType`/`showTime` 仍以快照傳給子 composable,執行期動態變更不反應 | 🟡 | 🟡 | v2.1 | 罕見用法;統一 getter/ref 傳遞 |
| A3 | §5.4 殘留:7 處「合理動態」`any`(i18n 樹遍歷 / deepMerge / slot map / lib cast) | ⚪ | 🟢 | 隨緣 | 接受現狀,有更佳型別再收 |
| A4 | 6.3 `formatOutput` 同名兩份收斂 + 位置參數→options 物件 | 🟡 | 🟡 | 隨緣 | RefactorPlan 已評估「不做」(分層非真重複、純防呆 churn);如日後易錯再議 |
| A5 | 6.5 非西元曆忽略 `dateFormat` pattern(目前僅文件化) | 🟡 | 🟡 | 併入 §D | 與原生曆法網格一起做:原生格式化才有意義 |
| A6 | 6.7 拆分 `CalendarUtils` 570 行 god-class(conversion / grid / metadata / formatting) | ⚪ | 🟡 | 併入 §D | §D 改 grid 時順勢拆 |
| A7 | `TimePicker.vue` 死碼 | ⚪ | 🟢 | 併入 v2.2 | 使用者指示保留為擴充候選 → 併入「獨立 picker 模式」一起轉正 |

---

## B. 優化(技術品質)

| ID | 項目 | 嚴重度 | 規模 | 里程碑 | 說明 |
|----|------|--------|------|--------|------|
| B1 | **無障礙(a11y)完整化** | 🟡 | 🟡 | v2.1 | 現有:`CalendarCell` 的 `tabindex`/`aria-selected`/方向鍵導航。缺:彈窗 `role="dialog"`+`aria-modal`、`role="grid"/gridcell`、focus trap、關閉時焦點歸還觸發元件、`aria-live` 朗讀當前月/選取日。補 axe 自動測試 |
| B2 | **彈窗定位智慧化** | 🟡 | 🟡 | v2.1 | 確認/加強 `useCalendarPopup`:collision detection / auto-flip / Teleport 到 body(避免被 overflow 裁切) |
| B3 | **SSR / Nuxt 驗證** | 🟡 | 🟡 | v3.0 | 計畫宣稱 `prefers-color-scheme` SSR-safe,但無 Nuxt module 或 SSR guide;補 hydration 測試 + SSR 文件 |
| B4 | **CI/CD 強化** | 🟡 | 🟡 | v2.1 | size-limit/bundle 監控、自動發佈、Playwright 視覺回歸、a11y 自動測試(axe) |
| B5 | **全響應式 props** | 🟡 | 🟡 | v2.1 | 即 A2;統一 getter/ref 傳遞,執行期改 props 即時反應 |

---

## C. 新功能(產品能力)

| ID | 項目 | 嚴重度 | 規模 | 里程碑 | 說明 |
|----|------|--------|------|--------|------|
| C1 | **`disabledDate` 述詞 / 停用特定日期 / 停用星期** | 🔴 | 🟡 | v2.1 | 目前只有 `minDate`/`maxDate`;最常被要求的能力。`disabledDate?: (date) => boolean` + `disabledWeekdays?` |
| C2 | **日期標記 / 事件 / 假日高亮** | 🟡 | 🟡 | v2.2 | 日格上的點/徽章;`markers?: Map<dateKey, …>` 或 slot |
| C3 | **可自訂日格 slot(`#day-cell`)** | 🟡 | 🟡 | v2.2 | 讓消費者完全控制日格渲染(配合 C2) |
| C4 | **獨立 MonthPicker / YearPicker / WeekPicker / TimePicker 模式** | 🟡 | 🔴 | v2.2 | 湊成完整族群;吸收 A7 的 `TimePicker.vue` |
| C5 | **內嵌(inline / always-open)模式** | 🟡 | 🟡 | v2.2 | 無輸入框、直接嵌入日曆 |
| C6 | **確認模式(footer + apply/cancel)+ 多選日期** | 🟡 | 🟡 | v3.0 | `confirm` mode / `multiple` mode |
| C7 | **時間限制 + 週數顯示** | 🟡 | 🟡 | v3.0 | minTime/maxTime/停用時段/分鐘 step;`showWeekNumbers` |
| C8 | **表單整合 adapter + 更多內建語系** | 🟡 | 🟡 | v3.0 | VeeValidate / Zod adapter;目前僅 5 語系(en/ja/ko/zh-CN/zh-TW) |

---

## D. 核心架構:原生曆法網格(重點討論項)

> 來源:RefactorPlan 6.4(`getMonthNames` 忽略 `calendarId`)。
> 因目前 Hebrew/Islamic 等「非對齊月份」曆法仍以西元月網格呈現而被隱藏。
> **狀態:方案定案,待實作。** 規模 🟡(細評後由 🔴 下修,見 D.0)。

### D.0 問題本質(含關鍵發現)

瓶頸不在「哪個組件渲染」,而在**視圖狀態(view state)被綁死在西元月**:「當前檢視月/年」「上下月導航」都用西元 `year/month` 計算。對 Buddhist/ROC/Japanese/Persian(12 月、對齊或純偏移)沒問題;對 Hebrew(閏年 13 月、Adar I/II)、Islamic(陰曆漂移)會崩。

**關鍵發現(讀碼後)——grid 其實「已經」原生產格,只差錨點:**
`generateCalendarDays`([calendarUtils.ts:176-197](../packages/vue-datepicker/src/utils/calendarUtils.ts))已把每格產成原生 `CalendarDate`、用 `@internationalized/date` 的 `.add({days:1})` 推算。day cell 渲染/選取/範圍/鍵盤**完全不用動**。唯一壞掉的是**錨點是「西元月的 1 號」而非「目標曆法那個月的 1 號」**:
```ts
const gregorianDate = new CalendarDate(year, month, 1);     // ← 錨在西元月 1 號(問題所在)
const firstDayOfMonth = this.safeToCalendar(gregorianDate, calendar);
const weeksInMonth = getWeeksInMonth(firstDayOfMonth, locale);
```
對齊曆法剛好正確;Hebrew/Islamic 的西元月 1 號落在原生月中間 → 窗格以西元邊界對齊而非原生月。連帶 `DateGridView.isOutsideMonth`(native 月比西元月)、`CalendarGrid.previous/nextMonth`(西元 `month±1`)、`getMonthNames`(固定 `new Date(2000,i,1)` 12 個月)都用西元單位。

**所以實作從「重建 grid」收斂為「把導航視圖狀態錨點原生化」**——約 5–6 檔局部改動,非重寫。

### D.1 採用的架構(已定方向)

**單一泛用 grid + registry 驅動 metadata**,而非 N 個 `v-if` 硬鏈的 per-calendar 組件。

理由:
- per-calendar `v-if` 鏈會把曆法清單**硬寫回模板**,回退 Phase 6 才建好的 registry/opt-in 可擴展性(§5.5#1 反模式)。
- 95% 的 grid 邏輯(週列/weekday header/day cell/選取/範圍/今天/鍵盤/彈窗)在曆法間**完全相同**且**已是原生**(見 D.0);差異只有 ① 每年月數與月算術 ② 月名/紀元 ③ 年表示 ④ 週起始 —— 這四項 `@internationalized/date` + `CalendarDescriptor` registry 都能提供。

- **`descriptor.component` 逃生艙 —— 本次延後,標 optional。** 概念:`CalendarDescriptor` 加 optional `component`,`DatePicker` 以 `descriptor.component ?? <泛用 grid>` 查表分派(非 `v-if` 鏈),供 Intl 表達不了的曆法(自訂財政曆、特殊文字曆)掛自訂組件。本里程碑**不做**,專注用泛用 grid 解開 Hebrew/Islamic;待日後有「Intl 不支援的曆法」需求再實作。

### D.2 資料流模型(已定案:canonical 維持西元、只原生化視圖)

**canonical 儲存值維持西元 `SimpleDateValue` 不變(現狀即如此),只有「視圖狀態」變原生 `CalendarDate`。** 系統分兩個平面,只在邊界用 `toCalendar` 轉換:

```
┌─ 值平面 (canonical, 永遠西元 SimpleDateValue) ── 單一事實來源 ─┐
│   modelValue / 選取值 / min·max / 輸出                          │
└───────────────────────────────────────────────────────────────┘
        ▲  convertFromCalendarDate            │  convertToCalendarDate
        │  (native → 西元)                     ▼  (西元 → native)
┌─ 視圖平面 (native CalendarDate, 目標曆法) ── 純 UI、可丟棄 ─────┐
│   viewDate(當前檢視月) / grid 格子 / header 月年                │
└───────────────────────────────────────────────────────────────┘
```

| 動作 | 流向 | 做法 |
|---|---|---|
| ① modelValue/輸入進來 | 值平面 | 一律先正規化成**西元** `SimpleDateValue`(現有 parser/plugin 已做),**不存 native** |
| ② 開啟日曆、定位視圖 | 值→視圖 | `convertToCalendarDate(西元值 ?? 今天, calendar)` → native `viewDate`;grid 用它產月 |
| ③ 上下月/選月選年導航 | **只在視圖平面** | `viewDate.add/subtract({months:1})` 純原生算(希伯來 13 月自動正確);**值平面不動**(換月≠改選取) |
| ④ 點某一天 | 視圖→值 | 該格是 native `CalendarDate` → `convertFromCalendarDate(date, calendar)` → 西元 `SimpleDateValue` → emit |

- 轉換**只在兩點**:渲染(②)、選取(④);導航(③)整段在 native,不需每步來回西元。
- 西元是唯一儲存格式;native 是 render 時算出、用完即丟的衍生視圖 → 維持跨曆法比較/min·max/輸出的西元座標不變式。
- 兩個轉換函式 `convertToCalendarDate`/`convertFromCalendarDate` **現已存在**([CalendarGrid.vue:131](../packages/vue-datepicker/src/components/calendar/CalendarGrid.vue)、:189);改動只是把導航狀態從西元 year/month 換成 native `viewDate`,讓 ② 錨對齊原生月。

### D.3 工項(viewDate 重訂)

| 改點 | 現狀 | 改成 |
|---|---|---|
| `CalendarGrid` 導航狀態 | `currentYear/currentMonth`(西元) | `viewDate: CalendarDate`(原生);初始 = value/今天轉該曆法 |
| `generateCalendarDays` | 錨在 `new CalendarDate(西元年,月,1)` | 錨在 `startOfMonth(viewDate)`(原生月) |
| 上/下月導航 | 西元 `month±1`([CalendarGrid.vue:241](../packages/vue-datepicker/src/components/calendar/CalendarGrid.vue)) | `viewDate.add/subtract({months:1})`(自動處理 13 月) |
| `CalendarHeader` 月份下拉 | 固定 12、`getMonthNames` 西元 | `calendar.getMonthsInYear(viewDate)` 筆數 + 原生月名(`DateFormatter({month:'long'})`) → 正解 6.4 |
| `DateGridView.isOutsideMonth/isFocusable` | 比西元月 | 比 `viewDate.month`(原生) |
| `YearSelector` 年範圍/表示 | 西元 | 查描述子原生年 |

順勢併入:A5(非西元曆 `dateFormat` 行為)、A6(拆 `CalendarUtils`)。
回歸防護先行:動工前補各曆法 grid 快照測試 + round-trip 測試。

blast radius:`CalendarGrid` / `CalendarHeader` / `DateGridView` / `RangeCalendar` + `calendarUtils`(`generateCalendarDays`、`getMonthNames`)。

### D.4 風險

- 希伯來閏月 Adar I/II 命名與 13 月下拉。
- Islamic 各變體(civil / umalqura / tbla)日數差異。
- 月份下拉長度可變(12/13)→ 月/年選擇器 UI 要容納。
- 鍵盤導航跨月/跨年邊界(目前 up/down 週導航尚未實作,見 [DateGridView.vue:211-216](../packages/vue-datepicker/src/components/calendar/DateGridView.vue))。
- 重新顯示先前隱藏的 Hebrew/Islamic 描述子。

### D.5 DoD

- Hebrew(含閏年)/Islamic 原生月份正確導航與渲染;月名正確、月份下拉筆數正確。
- canonical 值仍西元、round-trip identity 不變;既有測試全綠。
- registry 可擴展性保留(`descriptor.component` 逃生艙雖延後,介面預留不阻擋)。
- type-check / build 0;各曆法 grid 快照測試綠。

---

## 進度追蹤

| 里程碑 | 狀態 | 備註 |
|--------|------|------|
| v2.1 補完 + 無障礙 | ⬜ 未開始 | A1/A2/B1/B2/B4/B5/C1 |
| v2.2 功能擴充 | ⬜ 未開始 | A7/C2/C3/C4/C5 |
| v2.x 原生曆法網格(§D) | 🟡 規劃完成,待實作 | 方案定案:viewDate 原生化、canonical 維持西元、`descriptor.component` 延後;規模 🟡 |
| v3.0 生態整合 | ⬜ 未開始 | B3/C6/C7/C8 |

> 接手 session:完成項目更新對應狀態(⬜未開始 / 🟡進行中 / ✅完成),並把已落地的細節回寫到對應章節。
