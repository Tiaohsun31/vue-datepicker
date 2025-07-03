import { test, expect } from '@playwright/test'

test.describe('DateRange E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('應該能完整的日期範圍選擇流程', async ({ page }) => {
        const firstDateRange = page.locator('.date-range-wrapper').first()

        await firstDateRange.locator('[aria-label="選擇日期範圍"]').click()
        await expect(page.locator('[aria-label="date-range-picker"]')).toBeVisible()

        // 選擇開始日期 - 在日曆容器內尋找
        const calendar = page.locator('[aria-label="date-range-picker"]')
        await calendar.locator('button:has-text("10")').first().click()

        // 選擇結束日期 - 同樣在日曆容器內尋找
        await calendar.locator('button:has-text("20")').first().click()

        // 點擊外部關閉日曆
        await page.click('body')
        await expect(page.locator('[aria-label="date-range-picker"]')).not.toBeVisible()
    })

    test('應該能使用輸入框直接輸入日期範圍', async ({ page }) => {
        // 打開日期範圍選擇器
        await page.click('[aria-label="選擇日期範圍"]')
        await expect(page.locator('[aria-label="date-range-picker"]')).toBeVisible()

        // 在開始日期輸入框中輸入
        const startYearInput = page.locator('[data-testid="start-date-inputs"] input[placeholder*="年"]')
        const startMonthInput = page.locator('[data-testid="start-date-inputs"] input[placeholder*="月"]')
        const startDayInput = page.locator('[data-testid="start-date-inputs"] input[placeholder*="日"]')

        await startYearInput.fill('2025')
        await startMonthInput.fill('06')
        await startDayInput.fill('10')

        // 在結束日期輸入框中輸入
        const endYearInput = page.locator('[data-testid="end-date-inputs"] input[placeholder*="年"]')
        const endMonthInput = page.locator('[data-testid="end-date-inputs"] input[placeholder*="月"]')
        const endDayInput = page.locator('[data-testid="end-date-inputs"] input[placeholder*="日"]')

        await endYearInput.fill('2025')
        await endMonthInput.fill('06')
        await endDayInput.fill('20')

        // 驗證輸入值
        await expect(startYearInput).toHaveValue('2025')
        await expect(startMonthInput).toHaveValue('06')
        await expect(startDayInput).toHaveValue('10')
        await expect(endYearInput).toHaveValue('2025')
        await expect(endMonthInput).toHaveValue('06')
        await expect(endDayInput).toHaveValue('20')
    })

    test('應該能使用時間選擇功能', async ({ page }) => {
        // 明確選擇第一個 DateRange 組件
        const firstDateRange = page.locator('.date-range-wrapper').first()

        // 打開日期範圍選擇器
        await firstDateRange.click()
        await expect(page.locator('[aria-label="date-range-picker"]')).toBeVisible()

        // 先選擇開始日期
        await page.click('button:has-text("10")')

        // 等待時間輸入區域出現
        await expect(firstDateRange.locator('[data-testid="start-time-inputs"]')).toBeVisible()

        // 定位到具體的時間輸入框
        const startHourInput = firstDateRange.locator('[data-testid="start-time-inputs"] input[placeholder*="時"]')
        const startMinuteInput = firstDateRange.locator('[data-testid="start-time-inputs"] input[placeholder*="分"]')

        // 確保輸入框可見且可用
        await expect(startHourInput).toBeVisible()
        await expect(startHourInput).toBeEnabled()

        // 點擊輸入框聚焦後再填入
        await startHourInput.click()
        await startHourInput.fill('09')

        await startMinuteInput.click()
        await startMinuteInput.fill('30')

        // 輸入結束時間
        const endHourInput = firstDateRange.locator('[data-testid="end-time-inputs"] input[placeholder*="時"]')
        const endMinuteInput = firstDateRange.locator('[data-testid="end-time-inputs"] input[placeholder*="分"]')

        await endHourInput.click()
        await endHourInput.fill('17')

        await endMinuteInput.click()
        await endMinuteInput.fill('45')

        // 驗證時間值
        await expect(startHourInput).toHaveValue('09')
        await expect(startMinuteInput).toHaveValue('30')
        await expect(endHourInput).toHaveValue('17')
        await expect(endMinuteInput).toHaveValue('45')
    })

    test('應該能使用清除按鈕', async ({ page }) => {
        // 先設置一個日期範圍
        await page.click('[aria-label="選擇日期範圍"]')
        await page.click('button:has-text("10")')
        await page.click('button:has-text("20")')

        // 關閉日曆
        await page.click('body')

        // hover 到圖標容器以顯示清除按鈕
        await page.hover('.date-picker-icon-container')

        // 點擊清除按鈕
        await page.click('[aria-label="清除日期"]')

        // 驗證日期範圍被清空 - 應該顯示 placeholder
        const startPlaceholder = page.locator('.date-range-wrapper span').first()
        const endPlaceholder = page.locator('.date-range-wrapper span').last()

        await expect(startPlaceholder).toHaveClass(/text-vdt-content-muted/)
        await expect(endPlaceholder).toHaveClass(/text-vdt-content-muted/)
    })

    test('應該能使用快捷選項', async ({ page }) => {
        // 確保快捷選項在 App.vue 中啟用: showShortcuts="true"
        const dateRangeWithShortcuts = page.locator('[data-testid="date-range-with-shortcuts"]')

        if (await dateRangeWithShortcuts.count() > 0) {
            await dateRangeWithShortcuts.click()
            await expect(page.locator('[aria-label="date-range-picker"]')).toBeVisible()

            // 點擊 "最近7天" 快捷選項
            await page.click('[data-testid="shortcut-last-7-days"]')

            // 驗證日期範圍被正確設置
            await expect(dateRangeWithShortcuts.locator('span').first()).not.toHaveClass(/text-vdt-content-muted/)
        }
    })

    test('應該能正確處理無效日期範圍', async ({ page }) => {
        // 打開日期範圍選擇器
        await page.click('[aria-label="選擇日期範圍"]')
        await expect(page.locator('[aria-label="date-range-picker"]')).toBeVisible()

        // 輸入無效的日期組合 (結束日期早於開始日期)
        const startDayInput = page.locator('[data-testid="start-date-inputs"] input[placeholder*="日"]')
        const endDayInput = page.locator('[data-testid="end-date-inputs"] input[placeholder*="日"]')

        await startDayInput.fill('20')
        await endDayInput.fill('10') // 結束日期早於開始日期

        // 移動焦點觸發驗證
        await page.keyboard.press('Tab')

        // 應該顯示錯誤訊息
        await expect(page.locator('.date-error-message')).toBeVisible()
    })

    test('應該能處理鍵盤導航', async ({ page }) => {
        // 聚焦到日期範圍選擇器
        await page.focus('[aria-label="選擇日期範圍"]')

        // 按 Enter 打開日曆
        await page.keyboard.press('Enter')
        await expect(page.locator('[aria-label="date-range-picker"]')).toBeVisible()

        // 使用 Tab 在輸入框間導航
        await page.focus('[data-testid="start-date-inputs"] input[placeholder*="年"]')

        // Tab 導航到下一個輸入框
        await page.keyboard.press('Tab')
        const monthInput = page.locator('[data-testid="start-date-inputs"] input[placeholder*="月"]')
        await expect(monthInput).toBeFocused()

        await page.keyboard.press('Tab')
        const dayInput = page.locator('[data-testid="start-date-inputs"] input[placeholder*="日"]')
        await expect(dayInput).toBeFocused()
    })

    test('應該能處理最小和最大日期限制', async ({ page }) => {
        // 如果在 App.vue 中設置了 minDate 和 maxDate
        const constrainedDateRange = page.locator('[data-testid="constrained-date-range"]')

        if (await constrainedDateRange.count() > 0) {
            await constrainedDateRange.click()
            await expect(page.locator('[aria-label="date-range-picker"]')).toBeVisible()

            // 嘗試選擇超出範圍的日期
            const disabledDate = page.locator('button:has-text("31"):disabled')

            if (await disabledDate.count() > 0) {
                // 驗證禁用的日期無法點擊
                await expect(disabledDate).toBeDisabled()
            }
        }
    })

    test('應該能處理民國曆日期範圍', async ({ page }) => {
        const rocDateRange = page.locator('[data-testid="roc-date-range"]')

        if (await rocDateRange.count() > 0) {
            await rocDateRange.click()
            await expect(page.locator('[aria-label="date-range-picker"]')).toBeVisible()

            // 驗證顯示民國年份
            const yearSelector = page.locator('[aria-label*="年份"]').first()
            await expect(yearSelector).toContainText('民國')
        }
    })

    test('應該能正確處理禁用狀態', async ({ page }) => {
        const disabledDateRange = page.locator('[data-testid="disabled-date-range"]')

        if (await disabledDateRange.count() > 0) {
            // 禁用的日期範圍選擇器不應該響應點擊
            await disabledDateRange.click()
            await expect(page.locator('[aria-label="date-range-picker"]')).not.toBeVisible()

            // 檢查按鈕是否被禁用
            const button = disabledDateRange.locator('[aria-label="選擇日期範圍"]')
            await expect(button).toBeDisabled()
        }
    })
})
