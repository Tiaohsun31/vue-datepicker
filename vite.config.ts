import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss(),
        dts({
            // 使用組件庫專用的 tsconfig
            tsconfigPath: './tsconfig.lib.json',
            exclude: ['**/*.test.*', '**/*.spec.*'],
            rollupTypes: true,
            outDir: 'dist',
        }),
        // 自定義插件複製 CSS 檔案
        {
            name: 'copy-theme-css',
            generateBundle() {
                try {
                    mkdirSync('dist', { recursive: true })
                    copyFileSync(
                        resolve('src/styles/theme.css'),
                        resolve('dist/theme.css')
                    )
                    console.log('✓ theme.css copied to dist/')
                } catch (error) {
                    console.error('Failed to copy theme.css:', error)
                }
            }
        }
    ],
    build: {
        cssCodeSplit: false,
        lib: {
            entry: './src/index.ts',
            name: 'VueDatePicker',
            fileName: (format) => `vue-datepicker.${format}.js`,
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['vue', 'dayjs'],
            output: {
                globals: {
                    vue: 'Vue',
                    dayjs: 'dayjs'
                },
                exports: 'named'
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        port: 3000,
        open: true,
        cors: true,
    },
})
