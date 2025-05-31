// plugins/calendars/JapaneseCalendarPlugin.ts
import { type CalendarPlugin, type CalendarConfig } from '@/types/calendarPlugin';
import { type SimpleDateValue } from '@/utils/dateUtils';

/**
 * 日本年號日曆插件
 */
export class JapaneseCalendarPlugin implements CalendarPlugin {
    readonly id = 'japanese';

    readonly displayName = {
        'zh-TW': '日本年號',
        'zh-CN': '日本年号',
        'en-US': 'Japanese Era',
        'ja-JP': '和暦'
    };

    readonly yearRange = {
        min: 1868,  // 明治元年
        max: 2100   // 現代到未來
    };

    readonly placeholders = {
        'zh-TW': '年號年',
        'zh-CN': '年号年',
        'en-US': 'Era Year',
        'ja-JP': '和暦年'
    };

    // 年號對照表 - 簡化版，實際使用可以更完整
    private readonly eras = [
        { name: '明治', nameEn: 'Meiji', start: 1868, end: 1912 },
        { name: '大正', nameEn: 'Taisho', start: 1912, end: 1926 },
        { name: '昭和', nameEn: 'Showa', start: 1926, end: 1989 },
        { name: '平成', nameEn: 'Heisei', start: 1989, end: 2019 },
        { name: '令和', nameEn: 'Reiwa', start: 2019, end: 2100 } // 當前年號
    ];

    /**
     * 解析日本年號輸入
     * 支援格式：
     * - "令和6年5月20日"
     * - "令和6-05-20"
     * - "Reiwa 6-05-20"
     * - "R6-05-20" (簡寫)
     */
    parseInput(input: string): SimpleDateValue | null {
        if (!input?.trim()) return null;

        const trimmed = input.trim();

        // 解析各種日本年號格式
        const patterns = [
            // 完整格式：令和6年5月20日
            /^(明治|大正|昭和|平成|令和)(\d{1,2})年(\d{1,2})月(\d{1,2})日$/,
            // 數字格式：令和6-05-20
            /^(明治|大正|昭和|平成|令和)(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{1,2})$/,
            // 英文格式：Reiwa 6-05-20
            /^(Meiji|Taisho|Showa|Heisei|Reiwa)\s*(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{1,2})$/i,
            // 簡寫格式：R6-05-20, H31-05-20, S64-05-20
            /^([MTSHR])(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{1,2})$/i
        ];

        for (let i = 0; i < patterns.length; i++) {
            const match = trimmed.match(patterns[i]);
            if (match) {
                const result = this.parseByPattern(match, i);
                if (result) return result;
            }
        }

        return null;
    }

    /**
     * 根據不同模式解析
     */
    private parseByPattern(match: RegExpMatchArray, patternIndex: number): SimpleDateValue | null {
        let eraName: string;
        let eraYear: number;
        let month: number;
        let day: number;

        switch (patternIndex) {
            case 0: // 日文完整格式
            case 1: // 日文數字格式
                eraName = match[1];
                eraYear = parseInt(match[2]);
                month = parseInt(match[3]);
                day = parseInt(match[4]);
                break;

            case 2: // 英文格式
                eraName = this.getJapaneseEraName(match[1]);
                eraYear = parseInt(match[2]);
                month = parseInt(match[3]);
                day = parseInt(match[4]);
                break;

            case 3: // 簡寫格式
                const shortCode = match[1].toUpperCase();
                eraName = this.getEraNameFromShortCode(shortCode);
                eraYear = parseInt(match[2]);
                month = parseInt(match[3]);
                day = parseInt(match[4]);
                break;

            default:
                return null;
        }

        if (!eraName) return null;

        // 轉換為西元年
        const gregorianYear = this.eraToGregorian(eraName, eraYear);
        if (!gregorianYear) return null;

        // 基本驗證
        if (month < 1 || month > 12 || day < 1 || day > 31) return null;

        return {
            year: gregorianYear,
            month,
            day
        };
    }

    /**
     * 英文年號名稱轉日文
     */
    private getJapaneseEraName(englishName: string): string {
        const era = this.eras.find(e => e.nameEn.toLowerCase() === englishName.toLowerCase());
        return era ? era.name : '';
    }

    /**
     * 簡寫代碼轉年號名稱
     */
    private getEraNameFromShortCode(code: string): string {
        const mapping: Record<string, string> = {
            'M': '明治',
            'T': '大正',
            'S': '昭和',
            'H': '平成',
            'R': '令和'
        };
        return mapping[code] || '';
    }

    /**
     * 年號年轉西元年
     */
    private eraToGregorian(eraName: string, eraYear: number): number | null {
        const era = this.eras.find(e => e.name === eraName);
        if (!era) return null;

        const gregorianYear = era.start + eraYear - 1;

        // 驗證年份在年號範圍內
        if (gregorianYear < era.start || gregorianYear > era.end) {
            return null;
        }

        return gregorianYear;
    }

    /**
     * 西元年轉年號年
     */
    private gregorianToEra(gregorianYear: number): { eraName: string; eraYear: number } | null {
        const era = this.eras.find(e => gregorianYear >= e.start && gregorianYear <= e.end);
        if (!era) return null;

        return {
            eraName: era.name,
            eraYear: gregorianYear - era.start + 1
        };
    }

    /**
     * 驗證日期
     */
    isValid(date: SimpleDateValue): boolean {
        if (!date) return false;

        // 檢查是否在支援的年份範圍內
        if (date.year < this.yearRange.min || date.year > this.yearRange.max) {
            return false;
        }

        // 檢查是否能轉換為年號
        const eraInfo = this.gregorianToEra(date.year);
        if (!eraInfo) return false;

        // 基本月日驗證
        if (date.month < 1 || date.month > 12) return false;
        if (date.day < 1 || date.day > 31) return false;

        return true;
    }

    /**
     * 格式化輸出
     */
    format(date: SimpleDateValue, format: string, locale: string): string {
        if (!date) return '';

        const eraInfo = this.gregorianToEra(date.year);
        if (!eraInfo) {
            // 回退到西元年顯示
            return `西元${date.year}年${date.month}月${date.day}日`;
        }

        const { eraName, eraYear } = eraInfo;
        const month = date.month;
        const day = date.day;

        // 支援的日本年號格式
        const japaneseFormats: Record<string, string> = {
            // 完整日文格式
            'JAPANESE-FULL': `${eraName}${eraYear}年${month}月${day}日`,
            'JAPANESE-YYYY-MM-DD': `${eraName}${eraYear}年${month.toString().padStart(2, '0')}月${day.toString().padStart(2, '0')}日`,

            // 數字格式
            'JAPANESE-NUM': `${eraName}${eraYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,

            // 英文格式
            'JAPANESE-EN': `${this.getEnglishEraName(eraName)} ${eraYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,

            // 簡寫格式
            'JAPANESE-SHORT': `${this.getShortCode(eraName)}${eraYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,

            // 年份格式
            'JAPANESE-YEAR': `${eraName}${eraYear}年`,
            'JAPANESE-YEAR-EN': `${this.getEnglishEraName(eraName)} ${eraYear}`,
        };

        if (japaneseFormats[format]) {
            return japaneseFormats[format];
        }

        // 預設格式
        return `${eraName}${eraYear}年${month}月${day}日`;
    }

    /**
     * 獲取年號的英文名稱
     */
    private getEnglishEraName(eraName: string): string {
        const era = this.eras.find(e => e.name === eraName);
        return era ? era.nameEn : eraName;
    }

    /**
     * 獲取年號的簡寫代碼
     */
    private getShortCode(eraName: string): string {
        const mapping: Record<string, string> = {
            '明治': 'M',
            '大正': 'T',
            '昭和': 'S',
            '平成': 'H',
            '令和': 'R'
        };
        return mapping[eraName] || 'U'; // U for Unknown
    }

    /**
     * 西元曆轉日本年號日曆
     */
    fromGregorian(gregorianDate: SimpleDateValue): SimpleDateValue {
        const eraInfo = this.gregorianToEra(gregorianDate.year);
        if (!eraInfo) {
            // 如果無法轉換，保持原樣
            return gregorianDate;
        }

        // 這裡返回的仍是西元曆格式，但可以添加額外的年號資訊
        return {
            ...gregorianDate,
            // 可以添加額外屬性供格式化使用
            __eraName: eraInfo.eraName,
            __eraYear: eraInfo.eraYear
        } as SimpleDateValue & { __eraName?: string; __eraYear?: number };
    }

    /**
     * 日本年號日曆轉西元曆（實際上內部已經是西元曆）
     */
    toGregorian(calendarDate: SimpleDateValue): SimpleDateValue {
        return calendarDate;
    }

    /**
     * 獲取配置
     */
    getConfig(): CalendarConfig {
        return {
            id: this.id,
            displayName: this.displayName,
            yearRange: this.yearRange,
            placeholders: this.placeholders,
            isBuiltIn: false
        };
    }

    /**
     * 獲取支援的輸入格式範例（用於錯誤提示）
     */
    getSupportedInputFormats(): string[] {
        return [
            '令和6年5月20日',
            '令和6-05-20',
            'Reiwa 6-05-20',
            'R6-05-20',
            '平成31年4月30日',
            'H31-04-30'
        ];
    }

    /**
     * 獲取支援的輸出格式範例
     */
    getSupportedOutputFormats(): string[] {
        return [
            'JAPANESE-FULL',        // 令和6年5月20日
            'JAPANESE-YYYY-MM-DD',  // 令和6年05月20日
            'JAPANESE-NUM',         // 令和6-05-20
            'JAPANESE-EN',          // Reiwa 6-05-20
            'JAPANESE-SHORT',       // R6-05-20
            'JAPANESE-YEAR',        // 令和6年
            'JAPANESE-YEAR-EN'      // Reiwa 6
        ];
    }

    /**
     * 獲取目前年號資訊（額外功能）
     */
    getCurrentEra(): { name: string; nameEn: string; year: number } {
        const now = new Date();
        const currentYear = now.getFullYear();
        const eraInfo = this.gregorianToEra(currentYear);

        if (eraInfo) {
            const era = this.eras.find(e => e.name === eraInfo.eraName);
            return {
                name: eraInfo.eraName,
                nameEn: era?.nameEn || '',
                year: eraInfo.eraYear
            };
        }

        return {
            name: '未知',
            nameEn: 'Unknown',
            year: 0
        };
    }

    /**
     * 檢查指定年份是否為年號元年（額外功能）
     */
    isFirstYearOfEra(gregorianYear: number): boolean {
        return this.eras.some(era => era.start === gregorianYear);
    }

    /**
     * 獲取年號列表（供 UI 選擇器使用）
     */
    getAvailableEras(): Array<{ name: string; nameEn: string; period: string }> {
        return this.eras.map(era => ({
            name: era.name,
            nameEn: era.nameEn,
            period: `${era.start}-${era.end === 2100 ? '現在' : era.end}`
        }));
    }
}

/**
 * 工廠函數 - 系統約定的命名規則
 * 函數名必須為：create{CapitalizedId}CalendarPlugin
 */
export function createJapaneseCalendarPlugin(): CalendarPlugin {
    return new JapaneseCalendarPlugin();
}
