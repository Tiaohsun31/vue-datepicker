# @tiaohsun/vue-datepicker 設計決策紀錄

> 本文記錄 `@tiaohsun/vue-datepicker` 自 1.x 到 **2.0** 重構過程中的關鍵設計決策與**取捨理由**，供未來協作者理解「為什麼這樣設計」。
>
> - **這份文件談「為什麼」**；「程式現在長怎樣」請以原始碼與 git 歷史為準，文中的具體數字（測試數、行數）僅為決策當下的快照。
> - 對外的使用說明、breaking changes 與 migration 步驟，請看 [CHANGELOG](../CHANGELOG.md) 與 docs 站。
> - 逐步的重構過程日誌（含試錯細節）保留在 [`refactor-plan.md`](./refactor-plan.md)，本文是其決策面的精煉版。
> - 姊妹套件 `@tiaohsun/vue-datatable` 已完成同型重構，本套件沿用其已驗證的決策，並共用 `--tia-*` token 家族層。

---

## 0. 背景與總目標

專案的分層方向本來就正確（`DatePicker.vue` / `DateRange.vue` 協調 + composables 邏輯 + 小元件 UI + 多曆法 + i18n），但 1.x 累積了三類要在 2.0 一次清掉的問題：

1. **主題系統過度工程化**：全域單例 themeManager + `setTimeout` 重試 + `querySelector`/`getComputedStyle` 偵測；手刻 hex→Lab→OKLCH 近似與「最近色吸附」；11 階色票實際只用到 4 階。
2. **CSS / 打包未自包含**：`tailwindcss` 是必裝 peerDependency，模板大量依賴 Tailwind utility，消費者必須裝 Tailwind 並設定 `@source`。
3. **結構 / 命名漂移**：誤用了 datatable 的命名空間 `--color-vdt-*`；型別與色表重複維護；兩個容器元件大量重複接線。

**總目標**：結構清晰、樣式可維護且自包含（**使用者免裝 Tailwind**）、主題行為宣告式可預期、對外有穩定的 class / CSS 變數 hook、與 `@tiaohsun/vue-*` 家族共用 token 分層。破壞性變更集中於 2.0，並提供 migration。

---

## 1. 核心設計決策（A–E）

| 代號  | 決策                                                                                  | 理由 / 影響                                                                                                                                                        |
| ----- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A** | 中性語義色命名空間 `--color-vdt-*` → **`--color-vdp-*`**，並接上 `--tia-*` 家族共用層 | 修正誤用 datatable 命名空間；破壞性，需 migration                                                                                                                  |
| **B** | 範圍做到**完整自包含**                                                                | 主題引擎 + 模板 utility 收斂為自包含 `.vdp-*` class，**移除 `tailwindcss` peerDependency**，出貨自包含 CSS                                                         |
| **C** | 單一主色輸入模型                                                                      | 只接受 `--color-vdp-primary`，狀態色以 `color-mix()` 衍生；**取消「吸附最近 Tailwind 色」**，使用者傳什麼色就用什麼色（hex/rgb/oklch/色名）                        |
| **D** | 深淺模式以屬性宣告                                                                    | per-instance 用 **`data-vdp-mode`**、家族層（跨 datepicker/datatable 一起切）用 **`data-tia-mode`**；未指定則跟隨 `prefers-color-scheme`。`data-vdt-mode` 全面移除 |
| **E** | dts plugin-less                                                                       | 移除 `vite-plugin-dts`，改 `vue-tsc -p tsconfig.build.json` 產逐檔 `.d.ts`                                                                                         |

---

## 2. 主題系統

### 2.1 三層 token 模型

家族用「共用基元 + 各套件別名 + 字面 fallback」三層，讓套件**單獨安裝也能跑**，又能在家族層統一換色：

```css
:root {
  /* ① 共用基元（與 datatable 同名，才能家族共用；設一次調整整組） */
  --tia-theme-primary: oklch(58.5% 0.233 277.117); /* 家族預設主色：indigo */
  --tia-text-sm: 0.875rem;
  --tia-space-4: 1rem;
  --tia-radius: 0.375rem; /* …等 */

  /* ② datepicker 別名：引用共用層 + 字面 fallback（單獨安裝也能跑） */
  --color-vdp-primary: var(--tia-theme-primary, oklch(58.5% 0.233 277.117));
  --vdp-text-sm: var(--tia-text-sm, 0.875rem);
  --vdp-space-4: var(--tia-space-4, 1rem);

  /* ③ 主色衍生狀態（color-mix；不需使用者提供，隨主色與深淺 surface 自動調整） */
  --color-vdp-primary-hover: color-mix(
    in oklch,
    var(--color-vdp-primary),
    black 12%
  );
  --color-vdp-primary-strong: color-mix(
    in oklch,
    var(--color-vdp-primary),
    black 26%
  );
  --color-vdp-primary-subtle: color-mix(
    in oklch,
    var(--color-vdp-primary),
    var(--color-vdp-surface) 88%
  );
  --color-vdp-primary-border: color-mix(
    in oklch,
    var(--color-vdp-primary),
    var(--color-vdp-surface) 55%
  );
  --color-vdp-primary-ring: color-mix(
    in oklch,
    var(--color-vdp-primary),
    transparent 50%
  );
  --color-vdp-on-primary: white;
}
```

**為何用 `color-mix()` 衍生而非色階表**：1.x 維護 11 階色票卻只用到約 4 階，且需手刻色彩空間轉換。改為「單一主色 + `color-mix()` 自動衍生 hover/strong/subtle/border/ring」後，使用者只要給一個主色，狀態色自動隨主色與深淺 surface 調整，移除了約 700 行的 themeManager + colorUtils。

中性語義色（surface/content/outline/interactive）保留原本「light/dark 兩套」的良好結構，只換命名空間並接上家族層。狀態色 `--color-vdp-error` 保留。

### 2.2 主色解析（取消吸附）

- `resolvePrimaryColor(input)`：色名 → 查色表（縮為「色名 → 單一 base oklch」約 22 筆）；hex/rgb/oklch/任何合法 CSS 色 → **原樣 pass-through**。
- **取消「吸附最近 Tailwind 色」**：使用者傳什麼色就用什麼色。對「既非色名、`CSS.supports('color', input)` 亦為 false」的輸入，dev 模式 `console.warn`（前綴 `[vue-datepicker]`）。

### 2.3 深淺模式（決策 D）

- `.dark, [data-vdp-mode="dark"], [data-tia-mode="dark"]` 切深色；`[data-vdp-mode="light"], [data-tia-mode="light"]` 強制淺色。
- 未指定時用 `@media (prefers-color-scheme: dark)`，但**範圍限定**到 `.date-picker-wrapper:not([data-vdp-mode="light"]):not([data-tia-mode="light"])`，避免硬吃全域 `.dark`、且 SSR 安全。

> **重要陷阱（已實際踩過）**：emit 端（`useTheme`）與 CSS 選擇器**必須同名**。曾發生 emit `data-vdt-mode` 而 CSS 已改 `data-vdp-mode`，導致 `mode` prop 深色**靜默失效**。jsdom 測試只驗屬性字串、抓不到 CSS 是否套用，這類問題須以實際計算樣式（preview）驗證。

### 2.4 宣告式 useTheme

元件改**宣告式綁定** `:style="themeStyle"` + `v-bind="themeAttrs"`，移除命令式的 `watch(theme)→setColor` / `watch(mode)→setMode` 與實例/監聽器模型，以及 `setTheme/setDarkMode/...` 等命令式 API。

- `themeStyle`：**只有指定 `theme` prop 時**才 inline 設 `--color-vdp-primary`；未指定就交給 `:root`（引用家族 `--tia-theme-primary`）。這是最容易漏的一點——若無條件 inline，家族層換色會失效。
- `themeAttrs`：`mode` prop → `data-vdp-mode`（per-instance）；未給則不設、跟隨系統。

> **CSS 繼承行為（務必理解，否則換色會出乎意料）**：`--color-vdp-primary` 在 `:root` 宣告時，其 `var(--tia-theme-primary)` 於 `:root` 即代換完成，子層只繼承結果。因此：
>
> - **家族換色請在 `:root`（全域）設定 `--tia-theme-primary`**；在中間層覆寫 `--tia-theme-primary` 不會傳播到 `--color-vdp-primary`。
> - **per-instance / 子樹換色請用 `theme` prop**（inline 覆寫 `--color-vdp-primary`），或在該子樹直接覆寫 `--color-vdp-primary`。
>
> 同理，5 個 `color-mix()` 衍生變數**必須宣告在 `.date-picker-wrapper` / `.date-range-wrapper` 而非 `:root`**——否則它們在 `:root` 就以家族色算定，per-instance `theme` 無法回頭驅動衍生色（會出現「border 變了、但 ring/subtle 仍是預設色」的 bug）。

---

## 3. CSS 自包含（決策 B）

### 3.1 為何手寫 `.vdp-*` 字面 CSS，而非編譯 Tailwind 出貨

評估過兩條路：

- **方案 A（採用）**：手寫 `.vdp-*` 字面 CSS + 自有 `--vdp-*` 設計 token。
- **方案 B（否決）**：用 Tailwind 編譯出貨 CSS。

**否決 B 的理由**：B 需把通用 `@theme` 變數（`--spacing` / `--text-sm`…）輸出到 `:root`，會與「同樣使用 Tailwind 的消費者」**雙向干擾**（互相覆蓋同名變數），外加 preflight 污染。方案 A 用自有 `--vdp-*` 命名空間完全隔離，零 Tailwind 耦合。

**落地方式**：13 個出貨元件的模板 utility 全部收斂為字面 `.vdp-*` CSS——跨元件共用的放 `src/styles/components.css`，元件內部的放各自 scoped `<style>`；模板只留結構性 / 狀態性 class。錯誤狀態統一走 `.date-picker-container.error` hook（取代模板硬寫的 `border-red-500`）。

**驗證準則（自包含鐵則）**：build 後出貨 CSS 不得含 consumer-only 變數、不得有 `--color-vdt-theme-*` 殘留、`--tw-` 與 preflight 必須為 0。消費者**免裝 Tailwind**，`import '.../style.css'` 即可。

### 3.2 公開 class hook

以下 marker class 作為對外**穩定 class hook** 保留（本身可不帶 CSS，純標記）：`.date-picker-wrapper` / `.date-range-wrapper` / `.date-picker-container`（+`.error`）/ `.date-picker-icon` / `.date-placeholder` / `.calendar-container`。內部實作用 `.vdp-*`，兩者並存——對外承諾的是 marker class，`.vdp-*` 屬內部實作細節。

---

## 4. Packaging（決策 B / E）

- **移除 `tailwindcss` peerDependency**（保留為 devDependency 供 playground/build）。
- **dts plugin-less**：`vite-plugin-dts` 在新工具鏈下需 api-extractor 且不相容，改用 `tsconfig.build.json` + `vue-tsc` 產逐檔 `.d.ts`。
- **公開型別必須可被消費者解析**：原本 emitted 的 `.d.ts` 帶 `@/` alias（消費者端無法解析），因此將 src 全部 `@/` import 轉為相對路徑（順帶統一了 import 風格）。
- **`@tailwindcss/vite` 保留**：library source 無任何 `@import "tailwindcss"` / `@apply` / `@theme`，plugin 對出貨 CSS 無實質處理（dist 已核實 `--tw-`/preflight 皆 0），但 playground 的 dev chrome 仍需它 → 保留無害、移除有風險。
- **dayjs 策略**：維持 `dependencies` + `external`（ESM 由 node_modules 解析；UMD `<script>` 消費者需自備 dayjs 全域）。屬標準作法，於 README 註明即可。

---

## 5. 曆法系統（核心價值）

多曆法是本套件的核心價值。整體架構方向正確，2.0 主要是把「看似可擴展、實則寫死」的部分真正打開。

### 5.1 既有正確的架構（保留）

- **內部規範表示一律西元曆**（`SimpleDateValue`，單一事實來源）。曆法轉換只在「顯示 / 網格生成 / 輸出格式化」邊界發生。
- **`@internationalized/date`** 負責曆法數學、轉換、網格生成。
- **dayjs** 負責西元曆解析/格式化。
- **`CalendarPlugin`** 介面只處理 Intl 做不到的自訂文字格式（如民國年）。

### 5.2 曆法 registry：統一描述子 + 全部非西元曆 opt-in（最大決策）

**問題**：1.x 雖匯出了 `CalendarPlugin` 介面與 `RocFormatPlugin`，但**沒有任何 registry / 註冊 API**，dispatch 都是硬寫 `case 'roc': new RocFormatPlugin()`。消費者無法新增自己的曆法格式（日本令和、泰國佛曆…），匯出的介面給了「可擴展」的錯覺。更糟的是 `createSafeCalendar` 用動態 `createCalendar(id)`，而 `@internationalized/date` 的 `createCalendar` 是對**所有曆法類別的大 switch** → 全部曆法數學**無法 tree-shake**，即使只用西元曆也整包帶走。

**決策：採「統一描述子註冊，全部非西元曆皆 opt-in」。**

- **西元曆**：永遠內建、預設、免註冊。
- **其餘所有曆法（ROC / 佛 / 和 / 波斯 / 希伯來 / 伊斯蘭…）**：一律以 `registerCalendar(descriptor)` **顯式註冊**，不預設註冊。未註冊就使用 → dev-warn（提示「忘了 `registerCalendar`？」）+ fallback 西元曆。
- **統一 `CalendarDescriptor`**，避免「有些 magic、有些要 plugin」雙軌。每個描述子帶：
  - `id` / `displayName` / `yearRange`（收斂原本散落三處、彼此對不上的 metadata 清單）。
  - **自帶具名曆法類別**（`BuddhistCalendar` / `PersianCalendar` / `HebrewCalendar` / `TaiwanCalendar`…）取代動態 `createCalendar` → **換來 tree-shaking**。
  - **可選**的 format/parse plugin：只有「Intl 做不到的自訂文字」曆法才有（如 ROC 民國年）；其餘 fall through 到 `DateFormatter`。
- registry 同時是 **metadata 單一來源**：`getCalendarRange` / `getCalendarDisplayName` / `isCalendarSupported` / `getMonthNames` / `createSafeCalendar` 全改查表。
- registry 持 **singleton 描述子實例**（plugin 須無狀態），順帶解決了「每次 format/parse 都 `new RocFormatPlugin()`」的浪費。

**公開 API**：`registerCalendar()` + `CalendarDescriptor` / `CalendarPlugin` 型別 + 內建描述子模組（`rocCalendar` / `buddhistCalendar` / …）。第三方用同一 API 即可新增自訂文字曆法（dogfood 公開 API）。`RocFormatPlugin` 類別不再直接對外匯出（包進 `rocCalendar` 描述子）——**破壞性變更**。

**代價（可控）**：所有既有元件測試凡用到非西元曆者，都需在 setup 先 `registerCalendar`，否則會 fallback 西元曆。建議用共用 test setup 註冊全部內建曆法以降噪。

### 5.3 原生曆法網格（viewDate 模型）

**問題本質**：瓶頸不在「哪個元件渲染」，而在**視圖狀態綁死西元月**。網格產生其實已用 `@internationalized/date` 把每格產成原生 `CalendarDate`，唯一的錯是**錨點是「西元月 1 號」而非「目標曆法那個月的 1 號」**；Hebrew/Islamic 的西元月 1 號落在原生月中間 → 整個窗格以西元邊界對齊。連帶 `isOutsideMonth`、`previous/nextMonth`、`getMonthNames` 都以西元為單位。

**決策**：把「視圖狀態」錨點原生化，而非重寫，也不做 per-calendar 的 `v-if` 硬鏈組件（那會回退 registry 可擴展性、且 95% grid 邏輯重複）。

- **canonical 儲存值維持西元 `SimpleDateValue`**，只有「視圖狀態」變原生 `CalendarDate`。兩平面只在邊界轉換（渲染時西元→native、選取時 native→西元），導航整段在 native、值平面不動。→ 維持跨曆法比較 / min·max / 輸出的西元座標不變式。
- 導航狀態改原生 `viewDate`（`shallowRef<CalendarDate>`，避免 Vue 深層 `UnwrapRef` 剝離 `CalendarDate` 的私有品牌）；`previous/nextMonth` 用 `viewDate.add/subtract({months:1})`（自動處理希伯來閏年第 13 月）；對外仍以 `currentYear/currentMonth` computed 投影暴露，西元曆下行為不變。
- `getMonthNames` 改為曆法感知：依該曆法當年原生月份數與原生月名（含希伯來閏年 13 月）；西元曆 / 無 referenceDate 時維持 12 西元月名（向下相容）。
- **年份系統維持西元**：YearSelector / 範圍檢查 / 年顯示經西元投影。
- `descriptor.component` 逃生艙（Intl 表達不了的曆法才需要）評估後**延後**，介面不阻擋。

### 5.4 曆法相關的其他決策

- **`globalParser` 去全域單例**：原本以 `setLocale`/私有索引 hack 就地改狀態，會讓多個 DatePicker 實例共享、不同 locale/calendar 互相競態（SSR/多實例才顯現，易漏測）。改為每次 `new SmartDateParser(locale, calendar)` 無狀態。
- **ROC 無前綴數字輸入**：原本 plugin 要求字串以「民國/ROC」開頭才認領，導致 `calendar='roc'` 時輸入 `114-06-18` 被當成西元 114 年解析。改為解析端直接委派 `plugin.parseInput`（不再以前綴 gate），ROC 模式無前綴也能正確解析。
- **ROC year 換算統一**：年份數學經 registry 的 `createCalendar()`（`TaiwanCalendar`）為單一來源，plugin 只負責文字 format/parse，避免兩套機制。
- **ROC 格式化 token-safe**：廢除「dayjs 輸出後做位置盲的字串 replace」（會誤替與西元年同數字的日/分），改在**格式字串層級**把 `YYYY`/`YY` token 換成民國年字面量。

### 5.5 刻意**回退**的設計：非西元曆任意 `dateFormat`（重要前車之鑑）

曾嘗試讓非西元曆套用使用者的數字 `dateFormat` pattern（`formatCalendarNumericPattern`，以該曆法數字填入 pattern），**後來回退**。

**回退原因**：純數字輸出會變成與西元年同形（ROC `115-06-19`、佛曆 `2566/...`），**re-parse 時被當成西元年 → round-trip 損壞**（實測 ROC 選今天再開 → 顯示「民國前 1797 年」）。要正確支援必須同時做「曆法感知數字 parser」，但 `2566` 無法區分佛曆/西元、**本質歧義**，屬大且高風險的新功能。

**現行決策**：維持 Intl 長格式輸出（含曆法標記、可正確 round-trip），此行為於文件講清，並加 round-trip 回歸測試鎖住。曆法感知數字 parser 留待 2.0 後再評估。

---

## 6. 程式碼架構決策（主題與曆法以外）

- **響應式模型統一**：原本 `useDateTimePicker` / `useDateRange` 把 `options` 解構成純值快照，掛載後外部 `v-model` 更新不會傳播（受控元件用法是壞的）。改為 `options.modelValue` 收 `MaybeRefOrGetter`、呼叫端傳 getter、watch 用 `toValue` 監聽真實響應式來源。
- **computed 不得有副作用**：`isValidRange` 純函數化；範圍限制的驗證副作用抽到明確的 `applyRangeConstraintValidation`，由事件流程集中呼叫。
- **i18n 不混字面字串**：移除硬寫中文（錯誤訊息、shortcut 標籤），一律走 locale key，缺漏回退繁中。
- **dev-gated logger**：所有 `console.*` 收斂到單一 helper（`[vue-datepicker]` 前綴、`import.meta.env.DEV` gate），production bundle 整段 tree-shake 掉。
- **`LocaleManager` 每實例隔離**：內建語系維持 module-level 唯讀；自訂語系寫入**每實例的 `customLocales` 覆蓋層**，查找順序 custom → builtin。修掉「自訂語系跨實例洩漏」。
- **去重**：`useDateRange` 的 `handleStart*`/`handleEnd*` 抽成 `createSideHandlers(...)` factory；重複的 `computedTimeFormat` 抽成純函數 `resolveTimeFormat`。
- **型別收斂**：`TailwindColor = keyof typeof tailwindBaseColors`（單一來源）；`theme?: TailwindColor | (string & {})` 保留色名補全；為驗證參數定義具名型別取代滿佈的 `Record<string, Record<string, any>>`；子元件 ref 用窄介面取代 `Ref<any>`。

---

## 7. 刻意「不做」或「延後」的決策

記錄這些是為了避免未來協作者重新糾結已經評估過的選項。

| 項目                                                  | 決定             | 理由                                                                                                                                        |
| ----------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `DatePicker`/`DateRange` 抽共用 shell base composable | **不做**         | 主題/語系/驗證/日期邏輯已抽進 composables，兩元件殘餘的是真正分歧的膠水（format-fixing vs shortcuts/雙曆），強做共用會洩漏抽象、風險 > 收益 |
| `formatOutput` 改 options 物件簽名                    | **不做**         | 兩個 `formatOutput` 實為分層（一管 outputType、一管曆法格式化）非真重複；options 改造純為防呆，屬機械式大量測試 churn、無正確性收益         |
| 拆分 `CalendarUtils` god-class                        | **排程 2.0 後**  | 純機械式 reorg、零行為變動、churn 大（~8 consumer + 測試），發版前風險 > 價值；類為純靜態工具且已有獨立函式匯出，日後以 facade 拆           |
| `descriptor.component` 逃生艙                         | **延後**         | 只有 Intl 表達不了的曆法才需要，介面預留但本輪不實作                                                                                        |
| 非西元曆任意數字 `dateFormat`                         | **2.0 後再評估** | 見第 5.5 節：需曆法感知 parser，且 `2566` 佛曆/西元本質歧義                                                                                 |

---

## 8. 2.0 破壞性變更摘要

完整清單與 migration 步驟見 [CHANGELOG](../CHANGELOG.md)。重點：

1. **CSS 變數命名空間** `--color-vdt-*` → `--color-vdp-*`；**移除 11 階色票** `--color-vdt-theme-50…950` → 改 `--color-vdp-primary` + color-mix 衍生。
2. **移除命令式主題 API**（`setTheme` / `setDarkMode` / …）→ 改用 `theme` / `mode` props。
3. **預設主色 violet → indigo**：`theme` prop 預設由 `'violet'` 改為 `undefined`（走家族 `--tia-theme-primary`=indigo）。
4. **取消「吸附最近 Tailwind 色」**：傳什麼色就用什麼色。
5. **移除 `tailwindcss` peerDependency**：消費者改 `import '.../style.css'`，免裝 Tailwind。
6. **曆法改 opt-in**：`calendar="buddhist"` 等不再開箱即用，須先 `registerCalendar(buddhistCalendar)`；`RocFormatPlugin` 不再直接匯出（改用 `rocCalendar` 描述子）。
7. **深淺模式屬性**：`data-vdt-mode` 移除 → per-instance `data-vdp-mode`、家族 `data-tia-mode`。
