// tests/e2e/positioning.spec.ts
//
// 彈出層定位回歸測試（DatePicker + DateRange）。
//
// 背景：彈窗改用 @floating-ui/dom + `<Teleport to="body">`。本檔重點在「情境祖先」，
// 而非 picker 本身——舊版在下列祖先下會錯位／溢出／被壓扁／被裁切：
//   1. 很窄的容器（shrink-to-fit 壓扁）
//   2. transformed 祖先（position:fixed 被當成相對定位 → 大幅偏移、溢出視窗）
//   3. clipping 祖先（overflow:auto/hidden 把行內彈窗裁掉）
//   4. 真實 Modal（transform + overflow 同時存在）
//
// 斷言用幾何量測（jsdom 無 layout，只能用 Playwright 真實瀏覽器）。
import { test, expect, type Page, type Locator } from '@playwright/test'

const TOL = 2 // 幾何容差（px）

async function viewport(page: Page) {
    return page.evaluate(() => ({ w: window.innerWidth, h: window.innerHeight }))
}

/** 開啟某容器內 picker 的彈窗，回傳彈窗與觸發框的幾何。 */
async function openPicker(page: Page, containerSelector: string, popupSelector: string) {
    const trigger = page.locator(`${containerSelector} .date-picker-container`).first()
    await trigger.scrollIntoViewIfNeeded()
    await trigger.click()
    const popup = page.locator(popupSelector)
    await popup.waitFor({ state: 'visible' })
    // 等一個 rAF 讓 floating-ui 首次計算落定
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(null))))
    const popupBox = await popup.boundingBox()
    const triggerBox = await trigger.boundingBox()
    const vp = await viewport(page)
    return { popup, trigger, popupBox: popupBox!, triggerBox: triggerBox!, vp }
}

/** 斷言矩形完整落在視窗內（含容差）。 */
function expectWithinViewport(
    box: { x: number; y: number; width: number; height: number },
    vp: { w: number; h: number },
) {
    expect(box.x).toBeGreaterThanOrEqual(-TOL)
    expect(box.y).toBeGreaterThanOrEqual(-TOL)
    expect(box.x + box.width).toBeLessThanOrEqual(vp.w + TOL)
    expect(box.y + box.height).toBeLessThanOrEqual(vp.h + TOL)
}

/** 在某元素中心點做 hit-test，確認最上層命中的是彈窗（沒被 Modal / 背景遮住）。 */
async function isOnTop(page: Page, target: Locator, popupSelector: string) {
    const box = (await target.boundingBox())!
    return page.evaluate(
        ({ x, y, sel }) => {
            const el = document.elementFromPoint(x, y)
            return !!el?.closest(sel)
        },
        { x: box.x + box.width / 2, y: box.y + box.height / 2, sel: popupSelector },
    )
}

test.describe('DatePicker 彈出層定位', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('很窄的容器內不被壓扁（最小寬度 + 星期列單行）', async ({ page }) => {
        const { popup, popupBox, vp } = await openPicker(page, '[data-testid="edge-container"]', '.vdp-popup')
        expect(popupBox.width).toBeGreaterThanOrEqual(275)
        expectWithinViewport(popupBox, vp)

        const weekdayCells = popup.locator('.vdp-weekday-cell')
        await expect(weekdayCells).toHaveCount(7)
        const tops = await weekdayCells.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)))
        expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1)
    })

    test('transformed 祖先內：對齊觸發框、完全在視窗內、不溢出（核心回歸）', async ({ page }) => {
        const { popupBox, triggerBox, vp } = await openPicker(page, '[data-testid="transform-ancestor"]', '.vdp-popup')
        // 舊版此處左緣會偏移約 936px 並溢出右界；修正後應對齊觸發框且在視窗內
        expect(Math.abs(popupBox.x - triggerBox.x)).toBeLessThanOrEqual(8)
        expect(popupBox.width).toBeGreaterThanOrEqual(275)
        expectWithinViewport(popupBox, vp)
    })

    test('clipping（overflow）祖先內：不被裁切、可點到日期', async ({ page }) => {
        const { popup, popupBox, vp } = await openPicker(page, '[data-testid="clip-container"]', '.vdp-popup')
        expectWithinViewport(popupBox, vp)
        // Teleport 到 body → 不受 overflow 容器裁切：某日期格中心點應由彈窗命中
        const day = popup.locator('.vdp-cell-btn').first()
        await expect(day).toBeVisible()
        expect(await isOnTop(page, day, '.vdp-popup')).toBe(true)
    })

    test('Modal（transform + overflow 面板）內：堆疊在上、在視窗內、可選日期', async ({ page }) => {
        await page.locator('[data-testid="open-modal"]').click()
        await expect(page.locator('[data-testid="modal-panel"]')).toBeVisible()

        // 面板中第一個 picker 是 DatePicker
        const { popup, popupBox, vp } = await openPicker(page, '[data-testid="modal-panel"]', '.vdp-popup')
        expect(popupBox.width).toBeGreaterThanOrEqual(275)
        expectWithinViewport(popupBox, vp)

        const day = popup.locator('.vdp-cell-btn').first()
        expect(await isOnTop(page, day, '.vdp-popup')).toBe(true)
        await day.click()
        await expect(popup).not.toBeVisible()
    })

    test('Teleport 後點擊外部仍能關閉', async ({ page }) => {
        const { popup } = await openPicker(page, '[data-testid="edge-container"]', '.vdp-popup')
        await expect(popup).toBeVisible()
        await page.mouse.click(5, 5)
        await expect(popup).not.toBeVisible()
    })
})

test.describe('DateRange 彈出層定位', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('transformed 祖先內：完全在視窗內、不溢出、不被壓扁', async ({ page }) => {
        const { popupBox, vp } = await openPicker(page, '[data-testid="range-transform-ancestor"]', '.vdp-range-popup')
        expect(popupBox.width).toBeGreaterThanOrEqual(275)
        expectWithinViewport(popupBox, vp)
    })

    test('Modal 內：堆疊在上、在視窗內', async ({ page }) => {
        await page.locator('[data-testid="open-modal"]').click()
        const panel = page.locator('[data-testid="modal-panel"]')
        await expect(panel).toBeVisible()

        // Modal 內的 DateRange 是面板中第二個 picker
        const trigger = panel.locator('.date-picker-container').nth(1)
        await trigger.scrollIntoViewIfNeeded()
        await trigger.click()
        const popup = page.locator('.vdp-range-popup')
        await popup.waitFor({ state: 'visible' })
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(null))))

        const popupBox = (await popup.boundingBox())!
        expectWithinViewport(popupBox, await viewport(page))
        expect(await isOnTop(page, popup.locator('.vdp-range-body'), '.vdp-range-popup')).toBe(true)
    })
})
