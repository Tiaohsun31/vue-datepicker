import { defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

/**
 * 提供 Vue 組件上下文來測試 composable
 * 解決生命週期鉤子警告問題
 */
export function withSetup<T>(composable: () => T): [T, any] {
    let result: T
    let wrapper: any

    const TestComponent = defineComponent({
        setup() {
            result = composable()
            // 返回空的 render 函數
            return () => { }
        }
    })

    wrapper = mount(TestComponent)

    return [result!, wrapper]
}

/**
 * 清理測試組件
 */
export function cleanupSetup(wrapper: any) {
    if (wrapper) {
        wrapper.unmount()
    }
}
