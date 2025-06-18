// tests/e2e/datepicker.spec.ts
import { test, expect } from '@playwright/test'

test.describe('DatePicker E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/demo') // 假設你有一個 demo 頁面
    })

    test('應該能完整的日期選擇流程', async ({ page }) => {
        // 點擊日期選擇器
        await page.click('[data-testid="date-picker"]')

        // 等待日曆出現
        await expect(page.locator('[role="dialog"]')).toBeVisible()

        // 選擇日期
        await page.click('button:has-text("15")')

        // 驗證日期被選中
        await expect(page.locator('[data-testid="date-picker"]')).toContainText('2024-06-15')

        // 日曆應該關閉
        await expect(page.locator('[role="dialog"]')).not.toBeVisible()
    })

    test('應該能在不同日曆系統間切換', async ({ page }) => {
        // 切換到民國曆
        await page.selectOption('[data-testid="calendar-selector"]', 'roc')

        // 打開日曆
        await page.click('[data-testid="date-picker"]')

        // 驗證顯示民國年份
        await expect(page.locator('.year-selector')).toContainText('民國')
    })

    test('應該能正確處理鍵盤導航', async ({ page }) => {
        // 聚焦到年份輸入框
        await page.focus('[aria-label="year"]')

        // 輸入年份
        await page.keyboard.type('2024')

        // Tab 到月份應該自動跳轉
        await page.keyboard.press('Tab')
        await expect(page.locator('[aria-label="month"]')).toBeFocused()

        // 輸入月份
        await page.keyboard.type('06')

        // 應該自動跳轉到日期
        await expect(page.locator('[aria-label="day"]')).toBeFocused()
    })

    test('應該能正確處理時間選擇', async ({ page }) => {
        // 啟用時間選擇
        await page.check('[data-testid="enable-time"]')

        // 選擇日期
        await page.click('[data-testid="date-picker"]')
        await page.click('button:has-text("15")')

        // 時間輸入框應該可見
        await expect(page.locator('[aria-label="hour"]')).toBeVisible()

        // 輸入時間
        await page.fill('[aria-label="hour"]', '14')
        await page.fill('[aria-label="minute"]', '30')

        // 驗證完整的日期時間
        await expect(page.locator('[data-testid="result"]')).toContainText('2024-06-15 14:30')
    })

    test('應該能正確處理主題切換', async ({ page }) => {
        // 切換到深色模式
        await page.click('[data-testid="dark-mode-toggle"]')

        // 驗證主題變化
        await expect(page.locator('.vdt-datepicker')).toHaveClass(/vdt-mode-dark/)

        // 切換主題色
        await page.selectOption('[data-testid="theme-selector"]', 'red')
        await expect(page.locator('.vdt-datepicker')).toHaveClass(/vdt-theme-red/)
    })

    test('應該能正確處理範圍選擇', async ({ page }) => {
        // 切換到範圍模式
        await page.goto('/demo/range')

        // 打開範圍選擇器
        await page.click('[data-testid="date-range-picker"]')

        // 選擇開始日期
        await page.click('button:has-text("10")')

        // 選擇結束日期
        await page.click('button:has-text("20")')

        // 驗證範圍被選中
        await expect(page.locator('[data-testid="date-range-picker"]')).toContainText('2024-06-10 ~ 2024-06-20')
    })

    test('應該能正確處理錯誤狀態', async ({ page }) => {
        // 設置最小日期限制
        await page.fill('[data-testid="min-date"]', '2024-06-01')

        // 嘗試選擇超出範圍的日期
        await page.click('[data-testid="date-picker"]')

        // 導航到上個月
        await page.click('[aria-label="上個月"]')

        // 嘗試選擇被禁用的日期
        await page.click('button:has-text("30")')

        // 應該顯示錯誤訊息
        await expect(page.locator('.error-message')).toBeVisible()
    })

    test('應該能正確處理多語言', async ({ page }) => {
        // 切換到英文
        await page.selectOption('[data-testid="locale-selector"]', 'en-US')

        // 驗證月份名稱變為英文
        await page.click('[data-testid="date-picker"]')
        await expect(page.locator('.month-selector')).toContainText('June')

        // 切換到日文
        await page.selectOption('[data-testid="locale-selector"]', 'ja-JP')
        await expect(page.locator('.month-selector')).toContainText('6月')
    })
})
