import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts';
import type { Plugin } from 'vite';

/** 在 build 結束後產出 CSS 的型別宣告 stub，讓 TS 能解析 `import '…/style'` */
function cssDtsPlugin(): Plugin {
    return {
        name: 'css-dts',
        apply: 'build',
        closeBundle() {
            const outDir = path.resolve(__dirname, 'dist');
            fs.writeFileSync(
                path.join(outDir, 'vue-datepicker.css.d.ts'),
                '// CSS module type declaration\nexport {};\n'
            );
        }
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss(),
        cssDtsPlugin(),
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
        host: true,
        open: true,
        cors: true,
        allowedHosts: [
            'localhost',
            '127.0.0.1',
        ]
    },
})
