import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
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
