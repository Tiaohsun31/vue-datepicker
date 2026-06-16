# @tiaohsun/vue-datepicker 重構計畫書

> 本檔為跨 session 工作文件。任何接手的 session 請**先完整讀過本檔**，再依「§7 進度追蹤」接續。
> 套件名：`@tiaohsun/vue-datepicker`　當前版本：1.0.5　目標版本：**2.0.0（major / 允許合理破壞性變更）**
> 姊妹套件：`@tiaohsun/vue-datatable`（已完成同型重構至 v3，本計畫沿用其已驗證決策）。

---

## 0. 背景與總目標

專案分層方向正確（`DatePicker.vue` / `DateRange.vue` 協調 + composables 邏輯 + 小元件 UI + 多曆法 + i18n），
但有三類問題要一次清掉，與 datatable v3 重構前的狀況幾乎相同：

1. **主題系統過度工程化**：`themeManager.ts`(410 行) 全域單例 + `setTimeout` 重試 + `querySelector` + `getComputedStyle` 偵測；`colorUtils.ts`(290 行) 手刻 hex→Lab→OKLCH 近似 + 最近色吸附；11 階色票只用到 4 階。
2. **CSS / 打包未自包含**：`tailwindcss` 為必裝 peerDependency，模板大量依賴 Tailwind utility，消費者必須裝 Tailwind + 設 `@source`。
3. **結構 / 命名漂移**：命名空間錯用 `--color-vdt-*`（datatable 的）；`TailwindColor` union 與色表重複維護；`DatePicker`/`DateRange` 大量重複接線；docs/README 為舊模型。

**總目標**：結構清晰、樣式可維護自包含（**使用者免裝 Tailwind**）、主題行為宣告式可預期、對外有穩定 class / CSS 變數 hook、與 `@tiaohsun/vue-*` 家族共用 token 分層。

**破壞性變更接受度**：可接受合理破壞，集中於 **2.0**，文件須附 migration。

### 已定案決策（本輪 review + 使用者拍板）

- **決策 A — 中性語義色改命名空間**：`--color-vdt-*` → **`--color-vdp-*`**，並接上 `--tia-*` 家族共用層。破壞性，須 migration。
- **決策 B — 範圍做到完整自包含**：主題引擎 + 模板 utility 收斂為自包含 `.vdp-*` class + **移除 `tailwindcss` peerDependency** + 出貨自包含 CSS（對齊 datatable v3）。
- **決策 C — 主色模型**：單一輸入 `--color-vdp-primary` + `color-mix()` 衍生狀態色；**取消「吸附最近 Tailwind 色」**，使用者傳什麼色就用什麼色（hex/rgb/oklch/色名）。
- **決策 D — 深淺模式屬性**：沿用家族同一屬性 `data-vdt-mode`（家族一起切深淺）；未指定跟隨 `prefers-color-scheme`。
- **決策 E — dts plugin-less**：移除 `vite-plugin-dts`，改 `vue-tsc -p tsconfig.build.json` 產逐檔 `.d.ts`。

---

## 1. 主題 token 分層策略（決策 A/C/D 細節）

家族用「共用基元 + 各套件別名 + 字面 fallback」三層：

```css
:root {
  /* ① 共用基元（與 datatable 同名，才能家族共用；設一次調整整組） */
  --tia-theme-primary: oklch(58.5% 0.233 277.117); /* 家族預設主色：indigo */
  --tia-text-xs: 0.75rem; --tia-text-sm: 0.875rem; --tia-leading-sm: 1.25rem;
  --tia-space-1: 0.25rem; --tia-space-2: 0.5rem; --tia-space-3: 0.75rem; --tia-space-4: 1rem;
  --tia-radius-sm: 0.125rem; --tia-radius: 0.375rem; --tia-radius-full: 9999px;
  --tia-font-medium: 500; --tia-font-semibold: 600;

  /* ② datepicker 別名：引用共用層 + 字面 fallback（單獨安裝也能跑） */
  --color-vdp-primary: var(--tia-theme-primary, oklch(58.5% 0.233 277.117));
  --vdp-text-sm: var(--tia-text-sm, 0.875rem);
  --vdp-space-4: var(--tia-space-4, 1rem);
  /* …其餘 --vdp-* 比照 */

  /* ③ 主色衍生狀態（color-mix；不需使用者提供，隨主色 + 深淺 surface 自動調整） */
  --color-vdp-primary-hover:  color-mix(in oklch, var(--color-vdp-primary), black 12%);   /* 取代 600 */
  --color-vdp-primary-strong: color-mix(in oklch, var(--color-vdp-primary), black 26%);   /* 取代 700 */
  --color-vdp-primary-subtle: color-mix(in oklch, var(--color-vdp-primary), var(--color-vdp-surface) 88%); /* 取代 100/200 */
  --color-vdp-primary-border: color-mix(in oklch, var(--color-vdp-primary), var(--color-vdp-surface) 55%); /* 取代 300 */
  --color-vdp-primary-ring:   color-mix(in oklch, var(--color-vdp-primary), transparent 50%); /* 取代 400 25% */
  --color-vdp-on-primary:     white;
}
```

- **中性語義色**（surface/content/outline/interactive，含 light/dark 兩套 + `[data-vdt-mode]` 切換）：全部由 `--color-vdt-*` 改名 `--color-vdp-*`，並接上 `--tia-*` 共用層。這套深淺設計本身是好的，保留結構、只換命名空間。
- **深色模式**：`.dark, [data-vdt-mode="dark"]` 切深色；`[data-vdt-mode="light"]` 強制淺色；未指定時用 `@media (prefers-color-scheme: dark)` 範圍限定到 `.date-picker-wrapper:not([data-vdt-mode="light"])`（對齊 datatable，避免硬吃全域 `.dark`、SSR 安全）。
- **狀態色** `--color-vdp-error` 保留。

---

## 2. 主題引擎（`useTheme` 照搬 datatable 關鍵作法）

- `resolvePrimaryColor(input)`：色名 → 查 `tailwind4-color.ts`（縮為「色名 → 單一 base oklch」約 22–26 筆）；hex/rgb/oklch/合法 CSS 色 → 原樣 pass-through。
- `themeStyle` computed：**只有指定 `theme` prop 時才 inline 設 `--color-vdp-primary`**；未指定就交給 `:root` 的 `--color-vdp-primary`（引用 `--tia-theme-primary`），家族換色才會生效，也尊重消費者全域覆寫。**（最易漏，務必照做。）**
- `themeAttrs` computed：`mode` prop → `data-vdt-mode`；未給不設，跟隨系統。
- dev 模式對「既非色名、`CSS.supports('color', input)` 亦 false」的輸入 `console.warn`（前綴 `[vue-datepicker]`）。
- 元件改**宣告式綁定**：`:style="themeStyle"` `v-bind="themeAttrs"`，移除 `watch(theme)→setColor` / `watch(mode)→setMode` 命令式呼叫與 `data-vdt-instance` 機制。

**移除**：`src/utils/themeManager.ts`（整檔）、`src/utils/colorUtils.ts`（絕大部分）、`--color-vdt-theme-50…950` 全部色階、`useTheme` 的 `setRedTheme/…` 便利器與實例/監聽器模型。

---

## 3. 元件樣式（決策 B：自包含 `.vdp-*`）

- 保留 `.date-picker-container` 公開 hook；色階引用改新衍生變數：
  - `border-color: theme-500` → `var(--color-vdp-primary)`
  - `box-shadow: theme-200` → `var(--color-vdp-primary-subtle)`
  - `outline: theme-400 25%` → `var(--color-vdp-primary-ring)`
  - `.error` 維持 `--color-vdp-error`。
- **修錯誤狀態不一致**：`DatePicker.vue` 模板硬寫的 `border-red-500 ring-2 ring-red-200` 改走 `.date-picker-container.error` 統一路徑。
- 其餘內部 utility 比照 datatable 收斂為自包含 `.vdp-*` class（用 §1 的 `--vdp-*` 設計 token 撰寫），模板僅留結構性/狀態性 class。建 `src/styles/components.css`，`theme.css` import。
- 受影響元件（模板 utility → `.vdp-*`）：`DatePicker` / `DateRange` / `calendar/*`（CalendarCell·CalendarGrid·CalendarHeader·WeekdayHeader·RangeCalendar·DateGridView·DateErrorMessage）/ `inputs/*`（DateInput·TimeInput）/ `selector/*`（TimeSelector·YearSelector）。

---

## 4. Packaging（決策 B/E，比照 datatable v3）

- 移除 `tailwindcss` peerDependency；出貨自包含 CSS（build 後 grep 不到 consumer-only 變數、無 `--color-vdt-theme-*` 殘留）。
- dts 走 plugin-less：新增 `tsconfig.build.json`，`build:types` 改 `vue-tsc -p tsconfig.build.json` 產逐檔 `.d.ts`（移除 `vite-plugin-dts`）。
- `package.json`：`files` 移除不存在的 `"types"`；新增 `"sideEffects": ["**/*.css"]`；`exports` 含 `./style`；vite lib `cssFileName` 釘住。
- 釐清 dayjs：目前列 `dependencies` 卻被 `external`，UMD 消費者需自備全域 → 確認策略（建議 ES/UMD 一致；或 bundle、或維持 external 但文件註明）。

---

## 5. 程式碼品質與架構（主題以外）

> 本節為第二輪深入 review composables 後補充。與主題重構獨立，但同屬 2.0 可一併處理的整體品質提升。
> 嚴重度：🔴 高（潛在正確性 / 反模式）/ 🟡 中（可維護性 / 型別 / i18n）/ ⚪ 低（清理）。

### 5.1 響應式模型不一致（🔴 → ✅ modelValue 已修復 2026-06-16）

> **修復（Phase 4）**：`useDateTimePicker` / `useDateRange` 的 `options.modelValue` 改為 `MaybeRefOrGetter`，
> 呼叫端（DatePicker/DateRange.vue）傳 getter `() => props.modelValue`，watch 改 `() => toValue(options.modelValue)`。
> 掛載後外部 v-model 更新可正確傳播。`controlled-update.test.ts` 的 `it.fails` 已轉為 5 個正式通過測試；type-check / 488 測試全綠。
>
> **殘留（可選，非 confirmed bug）**：`dateFormat` / `outputType` / `showTime` 等仍以快照往下傳給子 composable，
> 執行期動態變更不會反應（罕見用法）。若要徹底「統一響應式」可一併改 getter/ref；目前聚焦已確認的 modelValue 破口。

- **已用測試實證**（Phase A，2026-06-16）：`mount(DatePicker,{modelValue:'2023-12-01'})` 後 `getDateTime()` 正確回 2023-12-01（靠 `watch` 的 `immediate`）；但 `setProps({modelValue:'2025-06-16'})` 後 `getDateTime()` **仍回 2023-12-01** → **掛載後外部 `v-model`/`modelValue` 更新不會傳播到內部狀態，受控元件用法是壞的。**
- 根因：`useDateTimePicker`/`useDateRange` 把 `options` 解構成**純值快照**，`watch(() => modelValue, …)` 監聽的是被擷取的常數，只在 `immediate` 觸發一次。模型還混亂：部分 prop 以 `toRef` 傳（disabled/calendar/outputType/locale），卻又把 `outputType.value`、`dateFormat`（`internalDateFormat.value`）等快照往下傳。
- **建議**：統一傳遞響應式來源（`toRefs(props)` / getter），子 composable 內 `watch` 真實響應式來源；或採 datatable 的 `useX(props, emit)` + options-of-refs 模式。先補測試鎖住「外部 `v-model` 更新→顯示同步」，再重構。
- **DatePicker vs DateRange 的差異（2026-06-16 補測時發現）**：
  - **DatePicker**：輸入框顯示走內部 `inputDateValue`，故 bug **使用者可見**（setProps 後輸入框停在舊值）。已加 `it.fails` 測試記錄（`tests/units/components/controlled-update.test.ts`）。
  - **DateRange**：顯示區是 `{{ modelValue?.start }}` **直接綁 prop**，故顯示會隨 setProps 更新 —— 但這只是回顯 prop，**內部 `useDateRange` 狀態仍 stale**（同一個快照 watch bug），影響日曆預選 / 範圍驗證 / 快捷比較。顯示層被 prop 直綁遮蔽，故 bug 較隱蔽。
  - 啟示：修 §5.1 時兩者都要改；DateRange 還要注意「顯示綁 prop、邏輯綁內部」的不一致（評估顯示也改走內部狀態，單一事實來源）。

### 5.2 computed 副作用（🔴 → ✅ 已修復 2026-06-16）
- `useDateRange.isValidRange`(:185) 在 computed 內呼叫 `endValidation.handleDateValidation` / `clearFieldErrors` 改狀態。computed 應純函數。
- **建議**：把 maxRange/minRange 的驗證副作用移到 `watch` 或明確的 `validate()` 流程，`isValidRange` 只回傳布林。

### 5.3 i18n 破口（🟡 → ✅ 已修復 2026-06-16）
- `useDateRange.shortcuts` 的 label（`'今天'`/`'最近7天'`/`'最近30天'`/`'本月'`）與部分錯誤訊息（如 `useDateTimePicker:186` `'無效的日期格式'`）**硬寫中文**，繞過既有 i18n。
- **建議**：shortcut label 走 locale key；錯誤一律用 i18n key（`date.invalid` 等），不要混字面字串。

### 5.4 型別鬆散（🟡）
- 54 處 `any`：子元件 ref `Ref<any>`（應 `Ref<InstanceType<typeof DateInput>>`）、errorParams `Record<string, Record<string, any>>` 滿佈、`clearFieldErrors(validation: any)`。
- **建議**：為驗證 errorParams 定義具名型別；子元件 ref 用 `InstanceType`；逐步消除 `any`。

### 5.5 console 衛生（🟡）
- 69 處、中英混雜、無 `import.meta.env.DEV` 收斂、無套件前綴、production 也輸出；另有註解掉的 debug log。
- **建議**：收斂成單一 dev-gated helper（`warn('[vue-datepicker] …')`），與主題的 dev-warn 一致；移除註解 debug。

### 5.6 重複（🟡）
- `useDateRange` 的 `handleStart*`/`handleEnd*`（validation/complete/time）近乎複製貼上 → 抽 `createSideHandlers('start'|'end')` factory。
- `DatePicker.vue` / `DateRange.vue` 的 shell（prop defaults、theme/locale/error 接線、format 修復、slot 轉發）大量重複 → 抽共用 composable / base setup。

### 5.7 清理與雜項（⚪）
- 死碼 / 註解碼：`useDateRange`（focus 轉移、`applyDefaultTimeIfNeeded`）、`useDateTimeValue.setInternalDateTime` 尾段、`themeManager.ts:204-207`、`calendarUtils`/`dateUtils` 註解 log。
- `useDateRange` watch 內 `setTimeout(…,0)` 排序 hack → 改正規響應式流程。
- `useDateTimePicker` 預設 `required = true` 與 `DatePicker` prop 預設 `false` 不一致 → 對齊。
- `useLocale` 每實例 `new LocaleManager()` 重註冊內建語系；`customLocaleMessages` 與 `customErrorMessages` 兩套 → 評估比照 datatable `locale`+`localeOverrides` 收斂。
- `@/` alias 與相對 import 混用 → 統一。

### 5.8 型別 / 命名（⚪，與主題共用）
- `TailwindColor` 改 `keyof typeof tailwindBaseColors` 單一來源；`theme?: TailwindColor | (string & {})` 保留色名補全。
- `types/main.ts` 評估改名 `types/public.ts`（對齊 datatable）。
- 清 TODO（`DatePicker.vue:69` slot 轉發須明確傳遞）。

### 5.9 測試套件紅燈（🔴 → ✅ 已修復 2026-06-16）
- **症狀**：`npx vitest run` → 48 失敗 / 424 通過。失敗集中在會渲染 DOM 的元件測試；輸入框值為空 + `Missing ref owner context` warning。
- **真正根因（已定位）**：**重複的 `@vue/test-utils` 副本** —— `@testing-library/vue@8.1.0` 依賴 `^2.4.1` 解析到 **2.4.6**，與 `vue@3.5.38` 不相容（render 後 v-model 不生效）；而 datepicker 直接依賴的 **2.4.11** 相容。`@vue/test-utils` mount 直接用一律正常，只有 testing-library 的 render 走到舊副本才壞。非邏輯 bug，非版本「太新」，是 **dedupe 問題**。
- **修法**：`pnpm-workspace.yaml` 加 `overrides: { '@vue/test-utils': 2.4.11 }`，`pnpm install` 後單一副本 → **48 失敗瞬間降到 5**。
- **剩餘 5 個的處理**：① DatePicker `min-w-[300px]` stale 斷言（元件實為 `270px`）→ 改正；② 4 個 ROC 解析測試以 module-mock 攔截寫死的 `new RocFormatPlugin()`，在 vitest 4 下接線失效 → **改寫為測真實 ROC 行為**（更好的測試）。
- **結果**：`npx vitest run` → **470 通過 / 0 失敗（16 檔全綠）**。
- **✅ `pnpm type-check` 已修（2026-06-16）**：原 exit 2 的兩個錯誤（`rollupTypes` + `baseUrl`）已解，作法為提前完成 Phase 3 的 dts plugin-less（移除 `vite-plugin-dts` → `vue-tsc -p tsconfig.build.json`）+ 移除 baseUrl + 新增 CSS shim。type-check / build / test 三者皆綠。

---

## 5.5 核心日曆流程評估（@internationalized/date + 插件擴展）

> 第三輪 review：多曆法是 vue-datepicker 的核心價值，這節專評其流程／使用／擴展是否正確、有無重構項。

### 結論：整體方向正確
- **內部規範表示 `SimpleDateValue` 一律西元曆**（單一事實來源），曆法轉換只在「顯示 / 網格生成 / 輸出格式化」邊界發生 —— 設計正確。
- **`@internationalized/date`**（`CalendarDate`/`CalendarDateTime`/`toCalendar`/`createCalendar`/`getWeeksInMonth`/`DateFormatter`）負責曆法數學、轉換、網格 —— 選型正確。
- **dayjs** 負責西元曆解析/格式化（+`customParseFormat`）；**`CalendarPlugin`** 介面處理 Intl 做不到的自訂文字格式（民國年）—— 分工概念正確。

### 重構項（核心流程）
1. **🔴 插件系統「看似可擴展、實則寫死」（最大問題）**：`CalendarPlugin` 介面 + `RocFormatPlugin` 都有，且從 `index.ts` 匯出，但**沒有任何 registry / 註冊 API**。`CalendarUtils.formatOutput` 與 `SmartDateParser.tryParseWithPlugins` 都是**硬寫 `case 'roc': new RocFormatPlugin()`**。後果：
   - 消費者**無法新增自己的曆法格式插件**（如日本令和、泰國佛曆文字），必須改套件內部 switch —— 匯出的介面/類別給了「可擴展」的錯覺。
   - 每次 format/parse 都 `new RocFormatPlugin()`（無生命週期、浪費）。
   - **建議**：做成真正的 registry —— `Map<id, CalendarPlugin>` + `registerCalendarPlugin(plugin)`（從 `index.ts` 匯出），dispatch 改查表而非 switch。曆法 metadata（range/displayName）也內聚到各 plugin。
2. **🟡 `formatOutput` 命名/位置/簽名問題（review 中真的踩到）**：
   - **同名兩份**：`CalendarUtils.formatOutput`（曆法 god-class 內）與 `dateUtils.formatOutput`（composables 實際用、`outputType==='custom'` 時委派給前者）—— 同名不同責、易混淆。
   - **死參數誤導**：`dateUtils.formatOutput` 第 3 位曾是 `customFormat`，移除時只把它**註解掉留在簽名裡**（`// customFormat?: string,`），導致照簽名數位置的呼叫者把 `dateFormat` 餵到 `timeFormat` 位（本次 review 即因此誤判一次）。
   - **過長位置參數（9 個）**：`(date, outputType, dateFormat, timeFormat, includeTime, calendar, locale, useStrictISO, enableSeconds)` 易錯 —— 連既有測試都把 `'gregory'` 傳到 `timeFormat` 位、靠預設值僥倖通過。
   - **建議**：① 收斂為單一 calendar-aware 格式化（曆法邏輯歸曆法模組，dateUtils 委派或移除）；② 刪掉註解殘留參數；③ 改 **options 物件**（`formatOutput(date, { outputType, dateFormat, ... })`）自我文件化、杜絕位置錯置（比照 datatable 決策 5）。
3. **🔴 `globalParser` 全域可變單例**：`dateParsingUtils` 的 `globalParser` 以 `setLocale/setCalendar` + `globalParser['locale']`（私有索引 hack）就地改狀態 → **多個 DatePicker 實例共享、不同 locale/calendar 會互相競態**。改為無狀態（每次 new 或純函數傳參）。
4. **🟡 非西元/非 ROC 曆法忽略 `dateFormat`**：`formatOutput` 走 `DateFormatter`（`month:'long'`）固定輸出 Intl 長格式，使用者的 `dateFormat` pattern 被忽略 → 行為不一致，需文件講清或補格式支援。
5. **🟡 `getMonthNames` 完全忽略 `calendarId`**：用固定 `new Date(2000,i,1)` 取西元月名 → 非西元曆（希伯來/伊斯蘭等）月名是錯的。註解「大多數日曆月份名稱相同」不成立。
6. **🟡 曆法清單三處不一致**：`isCalendarSupported`（含 `islamic-civil/tbla/umalqura`）、`getCalendarRange`（用 `'islamic'`，不在支援清單）、`getCalendarDisplayName`（又一組）三份 id 清單彼此對不上 → 收斂為單一 metadata 來源（理想由 plugin registry 提供）。
7. **🟡 ROC 格式表硬寫 + 字串 replace 脆弱**：`formatDatePart` 用 Record 列舉特定 format，未命中就 `dayjs(...).format` 後 `.replace(西元年, 民國年)`（位置盲、有誤替風險）；ROC `yearRange.max=200` 與 `getCalendarRange` roc 的 `currentYear+100` 不一致；ROC `displayName` 在 plugin 與 `CalendarUtils` 重複定義。
8. **⚪ `CalendarUtils` 570 行 god-class**：混了轉換/網格/年轉換/顯示名/驗證/格式化 → 評估拆分（conversion / grid / metadata / formatting）。

## 6. 分階段任務（低風險優先）

> 每個 phase 結束跑 `pnpm type-check` + `pnpm build` 通過。

### Phase 0 — 測試套件轉綠 + 清理盤點（最優先）
- [x] **✅ 修復測試套件紅燈（§5.9）**：根因為重複 `@vue/test-utils`（testing-library 用 2.4.6 與 vue 3.5.38 不相容）；以 pnpm override 統一 2.4.11 + 修 1 個 stale 斷言 + 改寫 4 個 ROC mock 測試 → **470 通過 / 0 失敗**。
- [x] **✅ 修 `pnpm type-check`（2026-06-16，順勢完成 Phase 3 dts plugin-less）**：移除 `vite-plugin-dts`（v5 需 api-extractor、與新工具鏈不相容）→ 改 `vue-tsc -p tsconfig.build.json` 產逐檔 `.d.ts`；移除 `tsconfig.lib.json` 的 `baseUrl`（TS6 棄用，bundler 解析 paths 毋需它）；新增 `src/shims-css.d.ts` 解決 side-effect CSS import；`package.json` types/exports 指向 `./dist/index.d.ts`。**type-check exit 0、build 產出 dist/index.d.ts、tests 全綠。**
- [x] **✅ 補核心缺口測試（執行「B」，2026-06-16）**：
  - `tests/units/components/controlled-update.test.ts`：DatePicker 受控更新以 `it.fails` 標記 §5.1 bug（修好會自動提醒）；DateRange 記錄「顯示回顯 prop」現狀。
  - `calendarUtils.test.ts`：新增「formatOutput - 多曆法輸出」（ROC/佛/日/波斯/希伯來 + 非西元曆忽略 dateFormat 的現狀記錄 + 西元對照）。
  - `dateUtils.test.ts`：新增 `custom 輸出 → 曆法分派` 活路徑整合測試。
  - 結果：**485 passed / 2 expected-fail（17 檔）**。
- [ ] 移除殘留 TODO / 註解碼（含 `DatePicker.test.ts` 註解掉的日曆位置測試、`calendarUtils.test.ts:304` 註解掉的伊斯蘭曆測試）；統一 import 風格。
- [ ] `package.json`：`files` 移除 `"types"`；加 `"sideEffects": ["**/*.css"]`。
- [ ] 盤點所有 `--color-vdt-*` 使用點（已知 11 檔，見 §3 清單），確認替換對照表。

### Phase 1 — 主題引擎重寫（核心，先做引擎再做 CSS class）
- [ ] `theme.css` 改寫為 §1 三層 token 模型（`--tia-*` + `--color-vdp-*` + `--vdp-*` + color-mix 衍生 + 深淺模式 + media query auto）。
- [ ] `tailwind4-color.ts` 縮為「色名 → 單一 base oklch」（約 22–26 筆，`satisfies Record<string,string>`，`TailwindColor = keyof typeof`）。
- [ ] 重寫 `useTheme.ts`（§2）：`resolvePrimaryColor` + `themeStyle` + `themeAttrs` + dev warn；移除單例/setTimeout/querySelector/監聽器。
- [ ] 刪 `themeManager.ts`；刪 `colorUtils.ts` 大部分（保留必要 helper 或一併刪）。
- [ ] `DatePicker.vue` / `DateRange.vue` 改宣告式 `:style="themeStyle"` `v-bind="themeAttrs"`，移除命令式 watch + 便利方法 export（`setTheme/setDarkMode…` 公開 API 評估保留薄包裝或移除，列 migration）。
- [ ] 重寫 `useTheme.test.ts`（測 `resolvePrimaryColor`：色名/hex/oklch/非法；`themeStyle` 只在 theme prop 存在時有值）。

### Phase 2 — CSS 語義 class + 自包含（最大塊）
- [ ] 建 `src/styles/components.css`，定義 `.date-picker-container`（+`.error`）與各 `.vdp-*` hook，用 `--vdp-*` token 撰寫自包含字面 CSS。
- [ ] 逐元件把模板 Tailwind utility 搬進 `.vdp-*`（§3 清單），所有 `--color-vdt-*` → `--color-vdp-*`，色階 → 衍生變數。
- [ ] 移除 `tailwindcss` peerDependency。
- [ ] **決定性驗證**：playground 暫停 `@import "tailwindcss"` 後截圖，元件仍完整渲染 → 證明 dist CSS 自包含。

### Phase 3 — Packaging + dts（決策 E）
- [x] **✅ dts plugin-less（2026-06-16，提前完成）**：新增 `tsconfig.build.json`；`build:types` = `vue-tsc -p tsconfig.build.json`；移除 `vite-plugin-dts`；types/exports → `dist/index.d.ts`；`src/shims-css.d.ts` 解 CSS import。
- [ ] vite lib 釘 `cssFileName`；`exports` 補 `./style`。
- [ ] `npm pack` 驗證：版本 2.0.0、CSS 一併打包、無 favicon、公開型別可解析、`TailwindColor` union 未塌成 string。

### Phase 4 — 程式碼品質與架構（§5，主題以外；可與 1–3 並行）
> 先補測試鎖住現有行為，再重構，避免回歸。
- [x] **✅ 5.1 響應式模型（modelValue）**：`options.modelValue` 改 `MaybeRefOrGetter` + 呼叫端傳 getter + watch 用 `toValue` → 受控更新生效；測試由 `it.fails` 轉 5 個正式通過。🔴 殘留 dateFormat/outputType 快照（可選）。
- [x] **✅ 5.2 computed 副作用**：`isValidRange` 純函數化；範圍限制驗證副作用抽成 `applyRangeConstraintValidation`，由 `emitRangeEvents` 集中呼叫。🔴
- [x] **✅ 5.3 i18n**：硬寫錯誤字串 `'無效的日期格式'`→`'date.invalid'` key；DateRange 預設 shortcut 標籤改走 locale（新增 `ShortcutMessages` + 5 語系；`getMessage`/`localeRef` 注入；缺漏回退繁中）。加 2 個 i18n 鎖定測試。🟡
- [ ] **5.4 型別**：errorParams 具名型別、子元件 ref 用 `InstanceType`、削減 `any`。🟡
- [ ] **5.5 console**：收斂 dev-gated `warn('[vue-datepicker]…')` helper，移除註解 log。🟡
- [ ] **5.6 重複**：`useDateRange` start/end factory；`DatePicker`/`DateRange` shell 共用化。🟡
- [~] **5.7 清理（部分）**：✅ `required` 預設對齊（true→false）、移除 useDateRange 死註解碼；⬜ `setTimeout(0)` hack、`useLocale` 每實例 LocaleManager 收斂待辦。⚪
- [ ] **5.8 型別/命名**：`TailwindColor` 單一來源、`theme?: TailwindColor|(string&{})`、`types/main→public`、清 TODO。⚪

### Phase 6 — 核心日曆流程重構（§5.5；多曆法是核心價值，獨立大塊）
> 先補曆法轉換/格式化/解析的單元測試（各曆法 round-trip），再重構。
- [ ] **6.1 插件 registry**：`Map<id,CalendarPlugin>` + `registerCalendarPlugin`，format/parse 改查表 dispatch；移除硬寫 switch；`index.ts` 匯出註冊 API。🔴
- [ ] **6.2 `globalParser` 去單例**：改無狀態/傳參，消除跨實例競態與私有索引 hack。🔴
- [ ] **6.3 收斂 formatOutput**：`CalendarUtils.formatOutput` 與 `dateUtils.formatOutput` 二選一為單一事實來源。🟡
- [ ] **6.4 曆法 metadata 單一來源**：合併 `isCalendarSupported`/`getCalendarRange`/`getCalendarDisplayName` 三份清單（理想由 plugin 提供）；修 `getMonthNames` 忽略 calendarId。🟡
- [ ] **6.5 非西元曆 `dateFormat` 行為**：補格式支援或文件明確化（目前被 Intl 長格式覆蓋）。🟡
- [ ] **6.6 ROC 插件**：格式表/字串 replace 脆弱性、yearRange 不一致、displayName 重複。🟡
- [ ] **6.7（評估）拆分 `CalendarUtils` god-class**。⚪

### Phase 5 — 測試、文件、發佈
- [ ] 單元/元件測試補齊（目標 27↑ 全綠）；主題相關行為測試。
- [ ] 自建最小 playground 截圖 + eval：預設色、`theme` prop per-instance 覆蓋、設 `--tia-theme-primary` 家族換色生效、深淺模式、focus/error 狀態。
- [ ] 更新 README（中英）：安裝段（免裝 Tailwind）、Theme 段（新模型 + `--tia` 分層）、Props（mode/theme 行為變更）。
- [ ] CHANGELOG 2.0.0（breaking：色階移除、JS 動態移除、命名空間 vdt→vdp、Tailwind peer 移除）。
- [ ] docs 站 theming 頁（中英）重寫為新模型。

---

## 7. 進度追蹤

| Phase | 狀態 | 備註 |
|-------|------|------|
| 0 測試轉綠 + 清理盤點 | 🟡 進行中 | ✅ vitest 470 全綠（pnpm override 修重複 test-utils）；⬜ type-check 仍紅（→Phase 3）、清理盤點待辦 |
| 1 主題引擎重寫 | ⬜ 未開始 | token 模型 + useTheme + 刪 themeManager/colorUtils |
| 2 CSS 語義 class + 自包含 | ⬜ 未開始 | .vdp-* 遷移 + 移除 Tailwind peer + 無-Tailwind 截圖驗證 |
| 3 Packaging + dts | 🟡 進行中 | ✅ dts plugin-less 完成（vue-tsc -p tsconfig.build.json）；⬜ 移除 Tailwind peer / cssFileName 釘住 / npm pack 驗證待 Phase 2 後 |
| 4 程式碼品質（主題以外） | 🟡 進行中 | ✅ 5.1 受控更新 / 5.2 computed 副作用 / 5.3 i18n / 5.7 部分清理（490 測試全綠）；⬜ 5.4 型別 / 5.5 console / 5.6 重複 / 5.7 殘項 |
| 5 測試 / 文件 / 發佈 | ⬜ 未開始 | 2.0.0 CHANGELOG + README 中英 + docs |
| 6 核心日曆流程重構 | ⬜ 未開始 | 插件 registry / globalParser 去單例 / metadata 收斂；先補 round-trip 測試 |

> 接手 session：完成項目請勾選對應 checkbox，並更新本表狀態（⬜未開始 / 🟡進行中 / ✅完成）。

---

## 8. 風險與注意事項

- **自包含鐵則**：Phase 2 build 後務必確認出貨 CSS 無 consumer-only 變數、無 `--color-vdt-theme-*` 殘留。
- **命名空間遷移**：`--color-vdt-*` → `--color-vdp-*` 是破壞性，曾覆寫舊變數的消費者要在 migration 明確列出對照表。
- **深淺模式屬性沿用 `data-vdt-mode`**：刻意與 datatable 同名（家族一起切），勿改成 `data-vdp-mode`。
- **`theme` prop inline 規則**：只有 prop 存在才 inline，否則家族層換色失效 —— 最易漏。
- **playground 可能在 .gitignore**：接手 session 跑 dev 前先確認，必要時自建最小 playground。
- **§5.1 響應式重構（🔴 已確認 bug）先補測試再動**：外部 `v-model` 更新不傳播已實證；重構前以測試鎖住預期行為。
- **§5.9 測試套件紅燈是頭號阻擋**：48 個元件測試失敗（依賴版本不相容），未轉綠前任何重構都缺回歸防護 → Phase 0 最優先。
- **核心日曆流程（§5.5 / Phase 6）**：插件 registry 與 metadata 收斂屬破壞性／高 churn，先補各曆法 round-trip 測試再動；`globalParser` 競態在 SSR/多實例下才顯現，易漏測。
- 每 phase 完成跑 `pnpm type-check && pnpm build`。
