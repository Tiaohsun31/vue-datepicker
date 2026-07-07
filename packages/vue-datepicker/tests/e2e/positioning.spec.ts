// tests/e2e/positioning.spec.ts
//
// 彈出層定位回歸測試。
// 背景：.vdp-popup 原本為 position:absolute 且 width:auto，寬度採 shrink-to-fit，
// 會被「靜態位置到 containing block 右緣的剩餘空間」限制。當 DatePicker 位於很窄的
// 容器（兩欄表單右欄、Modal 邊緣）時，日曆格 minmax(0,1fr) 會塌陷、星期標題逐字換行
// （被壓扁）。修正：改用 width:max-content + min-width:275px + max-width:95vw。
import { test, expect } from '@playwright/test'

test.describe('DatePicker 彈出層定位', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('在很窄的容器內彈出層不會被壓扁（維持最小寬度且星期列單行）', async ({ page }) => {
        const container = page.locator('[data-testid="edge-container"]')
        await expect(container).toBeVisible()

        // 容器本身刻意設為 140px（比日曆窄），用來重現舊 CSS 的塌陷情境
        const containerBox = await container.boundingBox()
        expect(containerBox!.width).toBeLessThan(200)

        // 開啟這個 picker 的日曆
        await container.locator('.date-picker-container').click()
        const popup = container.locator('.vdp-popup')
        await expect(popup).toBeVisible()

        // 彈出層寬度不應塌陷到容器寬度，應維持 min-width（275px）以上
        const popupBox = await popup.boundingBox()
        expect(popupBox!.width).toBeGreaterThanOrEqual(275)

        // 星期標題列必須是單行（7 格同一 y、且整列高度接近一行）
        const weekdayCells = popup.locator('.vdp-weekday-cell')
        await expect(weekdayCells).toHaveCount(7)

        const tops = await weekdayCells.evaluateAll((els) =>
            els.map((el) => Math.round(el.getBoundingClientRect().top)),
        )
        // 所有星期格的頂端 y 應一致（同一行，容許 1px 誤差）
        const minTop = Math.min(...tops)
        const maxTop = Math.max(...tops)
        expect(maxTop - minTop).toBeLessThanOrEqual(1)

        // 星期列高度不應因逐字換行而變高（單行高度合理上限）
        const headerHeight = await popup
            .locator('.vdp-weekday-header')
            .evaluate((el) => el.getBoundingClientRect().height)
        expect(headerHeight).toBeLessThan(48)
    })

    test('Modal 內開啟日曆時，彈出層堆疊在 Modal 之上（不被壓在底下）', async ({ page }) => {
        await page.locator('[data-testid="open-modal"]').click()
        const panel = page.locator('[data-testid="modal-panel"]')
        await expect(panel).toBeVisible()

        // 開啟 Modal 內 picker 的日曆
        await panel.locator('.date-picker-container').click()
        const popup = panel.locator('.vdp-popup')
        await expect(popup).toBeVisible()

        // 彈出層不應被壓扁
        const popupBox = await popup.boundingBox()
        expect(popupBox!.width).toBeGreaterThanOrEqual(275)

        // 彈出層必須位於 Modal 面板與遮罩之上：
        // 在日曆內某個日期格中心點做 hit-test，最上層命中的元素應屬於彈出層，
        // 而非 modal 面板 / 遮罩（代表沒有被壓在 Modal 底下）。
        const dayCell = popup.locator('.vdp-cell-btn').first()
        await expect(dayCell).toBeVisible()
        const cellBox = await dayCell.boundingBox()
        const cx = cellBox!.x + cellBox!.width / 2
        const cy = cellBox!.y + cellBox!.height / 2

        const topMostInPopup = await page.evaluate(
            ({ x, y }) => {
                const el = document.elementFromPoint(x, y)
                return !!el?.closest('.vdp-popup')
            },
            { x: cx, y: cy },
        )
        expect(topMostInPopup).toBe(true)

        // 點得到日期即代表未被遮擋
        await dayCell.click()
        await expect(popup).not.toBeVisible()
    })
})
