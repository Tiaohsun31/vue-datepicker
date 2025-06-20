import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/**', 'tests/e2e/**'],
            setupFiles: ['./tests/units/setup.ts'],
            coverage: {
                provider: 'v8',
                reporter: ['text', 'json', 'html', 'lcov'],
                exclude: [
                    'node_modules/',
                    '**/*.d.ts',
                    '**/*.test.{ts,js}',
                    '**/*.spec.{ts,js}',
                    'src/types/',
                    'playground/',
                    'scripts/',
                    'tests/',
                    'src/components/icons/',
                    'src/index.ts',
                    // 設定檔案
                    '**/eslint.config.ts',
                    '**/playwright.config.ts',
                    '**/vite.config.ts',
                    '**/vitest.config.ts',
                    '**/tailwind.config.js',
                    '**/postcss.config.js',
                    // 暫時忽略
                    'src/TimePicker.vue',
                ],
            },
        },

        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
    }),
)
