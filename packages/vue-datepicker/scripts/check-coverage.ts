// (目前尚未安裝tsx執行檢查門檻)
// pnpm add -D tsx
// 在package.json中添加腳本:
// "check:coverage": "tsx scripts/check-coverage.ts"
// 然後執行: pnpm run check:coverage
// 這個腳本會讀取 coverage-summary.json 檔案，並檢查各項測試涵蓋率是否達到預設的門檻
// 如果未達到門檻，則會顯示警告訊息，但不會終止執行流程
// 如果找不到 coverage-summary.json 檔案
// 則會顯示錯誤訊息，並建議先執行測試以生成報告
// 注意：這個腳本假設 coverage-summary.json 檔案位於專案根目錄下的 `coverage` 資料夾中
// 如果你的專案結構不同，請根據實際情況調整 `coveragePath` 的路徑
import { readFileSync } from 'fs'
import { join } from 'path'

interface CoverageSummary {
    total: {
        lines: { pct: number }
        functions: { pct: number }
        statements: { pct: number }
        branches: { pct: number }
    }
}

const COVERAGE_THRESHOLDS = {
    lines: 50,
    functions: 50,
    statements: 50,
    branches: 40
} as const

function checkCoverage() {
    try {
        const coveragePath = join(process.cwd(), 'coverage', 'coverage-summary.json')
        const coverageData: CoverageSummary = JSON.parse(readFileSync(coveragePath, 'utf-8'))

        const { lines, functions, statements, branches } = coverageData.total

        console.log('\n📊 測試涵蓋率報告:')
        console.log('========================')
        console.log(`📝 程式行數: ${lines.pct.toFixed(1)}% (建議: ${COVERAGE_THRESHOLDS.lines}%)`)
        console.log(`🔧 函數: ${functions.pct.toFixed(1)}% (建議: ${COVERAGE_THRESHOLDS.functions}%)`)
        console.log(`📋 陳述式: ${statements.pct.toFixed(1)}% (建議: ${COVERAGE_THRESHOLDS.statements}%)`)
        console.log(`🌿 分支: ${branches.pct.toFixed(1)}% (建議: ${COVERAGE_THRESHOLDS.branches}%)`)
        console.log('========================\n')

        const warnings: string[] = []

        if (lines.pct < COVERAGE_THRESHOLDS.lines) {
            warnings.push(`程式行數涵蓋率 ${lines.pct.toFixed(1)}% 低於建議值 ${COVERAGE_THRESHOLDS.lines}%`)
        }

        if (functions.pct < COVERAGE_THRESHOLDS.functions) {
            warnings.push(`函數涵蓋率 ${functions.pct.toFixed(1)}% 低於建議值 ${COVERAGE_THRESHOLDS.functions}%`)
        }

        if (statements.pct < COVERAGE_THRESHOLDS.statements) {
            warnings.push(`陳述式涵蓋率 ${statements.pct.toFixed(1)}% 低於建議值 ${COVERAGE_THRESHOLDS.statements}%`)
        }

        if (branches.pct < COVERAGE_THRESHOLDS.branches) {
            warnings.push(`分支涵蓋率 ${branches.pct.toFixed(1)}% 低於建議值 ${COVERAGE_THRESHOLDS.branches}%`)
        }

        if (warnings.length > 0) {
            console.warn('⚠️  涵蓋率低於建議門檻:')
            warnings.forEach(warning => console.warn(`  • ${warning}`))
            console.warn('\n💡 建議逐步增加測試來提高涵蓋率\n')
            // process.exit(1)，僅顯示警告
        } else {
            console.log('✅ 涵蓋率達到建議標準！\n')
        }

    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            console.error('❌ 找不到涵蓋率報告檔案')
            console.error('💡 請先執行: npm run test:coverage')
        } else {
            console.error('❌ 檢查涵蓋率時發生錯誤:', error)
        }
        console.warn('⚠️  跳過涵蓋率檢查，繼續執行...')
    }
}

checkCoverage()
