// 移除 emitted .d.ts 內的 CSS side-effect import（例如 `import './styles/theme.css';`）。
//
// 為什麼需要：src/index.ts 的 `import './styles/theme.css'` 是 build 時把 theme.css
// 收進出貨 CSS 的訊號（必須保留），但 vue-tsc 會原樣 emit 到 dist/index.d.ts。
// dist 內並無該 CSS 檔、也不應 ship 全域 `declare module '*.css'`（會洩漏給消費者），
// 且型別檔根本不需要這行 → 非 Vite 且未開 skipLibCheck 的消費者會報「找不到模組」。
// CSS 由 `./style` 另行出貨，故安全地把這類純 side-effect 的 CSS import 從 .d.ts 移除。
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

// 只比對「無 binding 的 CSS side-effect import」整行，例如：
//   import './styles/theme.css';
//   import "../foo.css"
const CSS_SIDE_EFFECT_IMPORT = /^\s*import\s+['"][^'"]+\.css['"];?\s*$/;

let changed = 0;

function walk(dir) {
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) {
            walk(full);
        } else if (full.endsWith('.d.ts')) {
            const src = readFileSync(full, 'utf8');
            const lines = src.split(/\r?\n/);
            const kept = lines.filter((l) => !CSS_SIDE_EFFECT_IMPORT.test(l));
            if (kept.length !== lines.length) {
                writeFileSync(full, kept.join('\n'));
                changed++;
            }
        }
    }
}

walk(distDir);
console.log(`[strip-css-dts] cleaned CSS side-effect imports from ${changed} .d.ts file(s)`);
