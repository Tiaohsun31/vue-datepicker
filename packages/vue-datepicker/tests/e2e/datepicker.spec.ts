// tests/e2e/datepicker.spec.ts
import { test, expect } from '@playwright/test'

test.describe('DatePicker E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('應該能完整的日期選擇流程', async ({ page }) => {
        await page.click('.date-picker-container')

        // 等待日曆出現 (使用你現有的 role="dialog")
        await expect(page.locator('[role="dialog"]')).toBeVisible()

        // 選擇日期 (假設選擇15號)
        await page.click('button:has-text("15")')

        // 驗證日期輸入框有值 (可以檢查 input 元素的值)
        const yearInput = page.locator('input[placeholder*="年"]').first()
        const monthInput = page.locator('input[placeholder*="月"]').first()
        const dayInput = page.locator('input[placeholder*="日"]').first()

        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')

        await expect(yearInput).toHaveValue(year.toString())
        await expect(monthInput).toHaveValue(month)
        await expect(dayInput).toHaveValue('15')

        // 日曆應該關閉
        await expect(page.locator('[role="dialog"]')).not.toBeVisible()
    })

    test('應該能點擊容器開啟日曆', async ({ page }) => {
        // 點擊日期輸入容器
        await page.click('.date-picker-container')

        // 日曆應該打開
        await expect(page.locator('[role="dialog"]')).toBeVisible()
    })

    test('應該能使用清除按鈕', async ({ page }) => {
        // 先輸入一些日期
        const yearInput = page.locator('input[placeholder*="年"]').first()
        const monthInput = page.locator('input[placeholder*="月"]').first()
        const dayInput = page.locator('input[placeholder*="日"]').first()

        await yearInput.fill('2025')
        await monthInput.fill('06')
        await dayInput.fill('15')

        // 有值時清除按鈕即渲染（無需 hover）；點擊第一個 picker 的清除按鈕
        await page.locator('button[aria-label="清除日期"]').first().click()

        // 驗證輸入框被清空
        await expect(yearInput).toHaveValue('')
        await expect(monthInput).toHaveValue('')
        await expect(dayInput).toHaveValue('')
    })

    test('應該能正確處理鍵盤導航', async ({ page }) => {
        // 聚焦到年份輸入框
        const yearInput = page.locator('input[placeholder*="年"]').first()
        await yearInput.focus()

        // Tab 到月份應該自動跳轉
        await page.keyboard.press('Tab')
        const monthInput = page.locator('input[placeholder*="月"]').first()
        await expect(monthInput).toBeFocused()

        // Tab 到日期
        await page.keyboard.press('Tab')
        const dayInput = page.locator('input[placeholder*="日"]').first()
        await expect(dayInput).toBeFocused()

        // 輸入日期
        await page.keyboard.type('15')
    })

    test('應該能正確處理時間選擇', async ({ page }) => {
        // 使用具時間的 DatePicker（showTime 的時間輸入為 inline，非 teleport）
        const dp = page.locator('[data-testid="dp-time"]')
        const hourInput = dp.locator('input[placeholder*="時"]')
        const minuteInput = dp.locator('input[placeholder*="分"]')

        await expect(hourInput).toBeVisible()
        await expect(minuteInput).toBeVisible()

        await hourInput.fill('14')
        await minuteInput.fill('30')

        await expect(hourInput).toHaveValue('14')
        await expect(minuteInput).toHaveValue('30')
    })

    test('應該能正確處理主題（宣告式模型）', async ({ page }) => {
        const firstDatePicker = page.locator('.date-picker-wrapper').first()
        await expect(firstDatePicker).toBeVisible()

        // 新模型：mode 為 auto（預設）時不設 data-vdp-mode，跟隨系統 prefers-color-scheme；
        // 指定 light/dark 時才會有該屬性。
        const mode = await firstDatePicker.getAttribute('data-vdp-mode')
        expect(mode === null || mode === 'light' || mode === 'dark').toBeTruthy()
    })


    test('應該能正確處理錯誤狀態', async ({ page }) => {
        // 輸入無效日期
        const yearInput = page.locator('input[placeholder*="年"]').first()
        const monthInput = page.locator('input[placeholder*="月"]').first()
        const dayInput = page.locator('input[placeholder*="日"]').first()

        // 輸入無效的月份
        await monthInput.fill('13')
        await dayInput.fill('01')

        // 移動焦點以觸發驗證
        await page.keyboard.press('Tab')

        // 應該顯示錯誤訊息
        await expect(page.locator('.vdp-error-message')).toBeVisible()
    })

    test('應該能正確處理禁用狀態', async ({ page }) => {
        // 使用 data-testid 選擇禁用的日本曆 DatePicker
        const disabledDatePicker = page.locator('[data-testid="disabled-date-picker"]')

        // 檢查內部的輸入框是否被禁用
        const inputs = disabledDatePicker.locator('input')
        const inputCount = await inputs.count()

        // 檢查所有輸入框都被禁用
        for (let i = 0; i < inputCount; i++) {
            await expect(inputs.nth(i)).toBeDisabled()
        }
    })

    test('應該能在不同日曆系統間切換', async ({ page }) => {
        const rocDatePicker = page.locator('.date-picker-wrapper').nth(2)
        // 打開日曆
        await rocDatePicker.click()

        // 驗證顯示民國年份
        await expect(page.locator('[role="dialog"]')).toBeVisible()

        const yearSelector = page.locator('[aria-label="選擇年份"]').first()
        await expect(yearSelector).toContainText('民國')
    })
})
