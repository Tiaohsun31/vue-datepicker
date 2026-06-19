// tests/units/locale/LocaleManager.test.ts
// §5.7 修正回歸鎖：自訂語系註冊必須「每實例」隔離，不得跨實例洩漏或污染內建語系。
import { describe, it, expect } from 'vitest'
import { LocaleManager } from '@/locale/index'
import type { LocaleMessages } from '@/types/locale'

// 最小自訂包：只覆寫 yearSelector.jumpToYear，其餘鍵靠「部分覆寫 + 內建回退」特性自動回退。
function makeMessages(jumpToYear: string): LocaleMessages {
    return { yearSelector: { jumpToYear } } as unknown as LocaleMessages
}

describe('LocaleManager 自訂語系隔離（§5.7）', () => {
    it('一個實例註冊自訂語系，不影響另一個實例', () => {
        const a = new LocaleManager()
        const b = new LocaleManager()

        a.registerLocale('en-US', makeMessages('A-CUSTOM'))
        a.setLocale('en-US')
        b.setLocale('en-US')

        expect(a.getMessage('yearSelector.jumpToYear')).toBe('A-CUSTOM')
        // b 不該被 a 的註冊污染，應拿到內建 en-US 值
        expect(b.getMessage('yearSelector.jumpToYear')).toBe('Jump to Year')
    })

    it('自訂語系不污染共享內建語系（新實例仍拿內建值）', () => {
        const a = new LocaleManager()
        a.registerLocale('en-US', makeMessages('LEAK?'))
        a.setLocale('en-US')
        expect(a.getMessage('yearSelector.jumpToYear')).toBe('LEAK?')

        // 全新實例不應看到上面的覆寫
        const fresh = new LocaleManager()
        fresh.setLocale('en-US')
        expect(fresh.getMessage('yearSelector.jumpToYear')).toBe('Jump to Year')
    })

    it('部分覆寫的自訂包，缺漏鍵回退內建語系', () => {
        const a = new LocaleManager()
        a.registerLocale('en-US', makeMessages('ONLY-JUMP'))
        a.setLocale('en-US')

        expect(a.getMessage('yearSelector.jumpToYear')).toBe('ONLY-JUMP') // 覆寫生效
        expect(a.getMessage('yearSelector.returnToValidRange')).toBe('Return to valid range') // 回退內建
    })

    it('可註冊全新語系（內建不存在）並查得', () => {
        const a = new LocaleManager()
        expect(a.hasLocale('xx-XX')).toBe(false)
        a.registerLocale('xx-XX', makeMessages('NEW-LOCALE'))
        expect(a.hasLocale('xx-XX')).toBe(true)
        a.setLocale('xx-XX')
        expect(a.getMessage('yearSelector.jumpToYear')).toBe('NEW-LOCALE')
    })
})
