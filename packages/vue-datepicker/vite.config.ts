import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
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
        // .d.ts 改由 plugin-less 的 `vue-tsc -p tsconfig.build.json` 產生（見 package.json build:types），
        // 移除 vite-plugin-dts（v5 需 api-extractor 才能 bundle，且與新版工具鏈不相容）。
    ],
    build: {
        cssCodeSplit: false,
        lib: {
            entry: './src/index.ts',
            name: 'VueDatePicker',
            fileName: (format) => `vue-datepicker.${format}.js`,
            // 釘住 CSS 輸出檔名，避免 vite 預設行為改變導致 `style` / `exports['./style']` 失準
            cssFileName: 'vue-datepicker',
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
