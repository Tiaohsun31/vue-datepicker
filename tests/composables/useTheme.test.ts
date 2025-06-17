
// tests/composables/useTheme.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { useTheme } from '@/composables/useTheme'

describe('useTheme', () => {
    beforeEach(() => {
        // 清除 DOM
        document.body.innerHTML = ''
    })

    it('應該正確初始化主題', () => {
        let themeResult: any

        const TestComponent = defineComponent({
            setup() {
                themeResult = useTheme({
                    defaultColor: 'blue',
                    defaultMode: 'light'
                })
                return {}
            },
            template: '<div></div>'
        })

        mount(TestComponent)

        expect(themeResult.currentColor.value).toBe('blue')
        expect(themeResult.currentMode.value).toBe('light')
        expect(themeResult.themeClasses.value).toMatchObject({
            'vdt-datepicker': true,
            'vdt-themed': true,
            'vdt-theme-blue': true,
            'vdt-mode-light': true
        })
    })
})
