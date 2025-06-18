import { describe, it, expect } from 'vitest';
import { RocFormatPlugin } from '@/plugins/calendars/RocFormatPlugin';
import type { SimpleDateValue } from '@/utils/dateUtils';

describe('RocFormatPlugin', () => {
    const plugin = new RocFormatPlugin();

    describe('基本屬性測試', () => {
        it('應該有正確的插件 ID', () => {
            expect(plugin.id).toBe('roc');
        });

        it('應該有正確的年份範圍', () => {
            expect(plugin.yearRange.min).toBe(1);
            expect(plugin.yearRange.max).toBe(200);
        });

        it('應該有多語言顯示名稱', () => {
            expect(plugin.displayName['zh-TW']).toBe('民國曆');
            expect(plugin.displayName['zh-CN']).toBe('民国历');
            expect(plugin.displayName['en-US']).toBe('ROC Calendar');
        });
    });

    describe('canParseInput 測試', () => {
        it('應該識別民國格式輸入', () => {
            expect(plugin.canParseInput('民國114年06月18日')).toBe(true);
            expect(plugin.canParseInput('民国114年06月18日')).toBe(true);
            expect(plugin.canParseInput('ROC 114年06月18日')).toBe(true);
            expect(plugin.canParseInput('ROC114年06月18日')).toBe(true);
        });

        it('應該拒絕非民國格式輸入', () => {
            expect(plugin.canParseInput('2025年06月18日')).toBe(false);
            expect(plugin.canParseInput('2025-06-18')).toBe(false);
            expect(plugin.canParseInput('June 18, 2025')).toBe(false);
        });
    });

    describe('parseInput 日期解析測試', () => {
        it('應該解析中文民國日期格式', () => {
            const result = plugin.parseInput('民國114年06月18日', 'zh-TW');
            expect(result).toEqual({
                year: 2025,
                month: 6,
                day: 18
            });
        });

        it('應該解析簡化版民國日期格式', () => {
            const result = plugin.parseInput('民国99年12月31日', 'zh-CN');
            expect(result).toEqual({
                year: 2010,
                month: 12,
                day: 31
            });
        });

        it('應該解析 ROC 前綴日期格式', () => {
            const result = plugin.parseInput('ROC 110年01月01日', 'en-US');
            expect(result).toEqual({
                year: 2021,
                month: 1,
                day: 1
            });
        });

        it('應該解析用分隔符的民國日期', () => {
            const result1 = plugin.parseInput('民國114-06-18', 'zh-TW');
            expect(result1).toEqual({
                year: 2025,
                month: 6,
                day: 18
            });

            const result2 = plugin.parseInput('ROC 114/06/18', 'zh-TW');
            expect(result2).toEqual({
                year: 2025,
                month: 6,
                day: 18
            });
        });

        it('應該拒絕無效的日期', () => {
            expect(plugin.parseInput('民國114年13月18日', 'zh-TW')).toBeNull();
            expect(plugin.parseInput('民國114年06月32日', 'zh-TW')).toBeNull();
            expect(plugin.parseInput('民國114年02月30日', 'zh-TW')).toBeNull();
        });

        it('應該拒絕超出範圍的年份', () => {
            expect(plugin.parseInput('民國0年06月18日', 'zh-TW')).toBeNull();
            expect(plugin.parseInput('民國201年06月18日', 'zh-TW')).toBeNull();
        });
    });

    describe('parseInput 日期時間解析測試', () => {
        it('應該解析帶有上午時間的日期', () => {
            const result = plugin.parseInput('民國114年06月18日 上午 10時30分', 'zh-TW');
            expect(result).toEqual({
                year: 2025,
                month: 6,
                day: 18,
                hour: 10,
                minute: 30,
                second: 0
            });
        });

        it('應該解析帶有下午時間的日期', () => {
            const result = plugin.parseInput('民國114年06月18日 下午 2時15分30秒', 'zh-TW');
            expect(result).toEqual({
                year: 2025,
                month: 6,
                day: 18,
                hour: 14,
                minute: 15,
                second: 30
            });
        });

        it('應該正確處理 12 小時制轉換', () => {
            // 上午 12 時應該轉為 0 時
            const result1 = plugin.parseInput('民國114年06月18日 上午 12時00分', 'zh-TW');
            expect(result1?.hour).toBe(0);

            // 下午 12 時應該保持 12 時
            const result2 = plugin.parseInput('民國114年06月18日 下午 12時00分', 'zh-TW');
            expect(result2?.hour).toBe(12);
        });

        it('應該解析 24 小時制時間格式', () => {
            const result = plugin.parseInput('民國114年06月18日 14:30:45', 'zh-TW');
            expect(result).toEqual({
                year: 2025,
                month: 6,
                day: 18,
                hour: 14,
                minute: 30,
                second: 45
            });
        });

        it('當時間解析失敗時應該返回日期部分', () => {
            const result = plugin.parseInput('民國114年06月18日 無效時間', 'zh-TW');
            expect(result).toEqual({
                year: 2025,
                month: 6,
                day: 18
            });
        });
    });

    describe('supportsFormat 測試', () => {
        it('應該支援 ROC 相關格式', () => {
            expect(plugin.supportsFormat('ROC-YYYY-MM-DD')).toBe(true);
            expect(plugin.supportsFormat('ROC-YY')).toBe(true);
            expect(plugin.supportsFormat('民國YYYY年MM月DD日')).toBe(true);
        });

        it('應該拒絕不支援的格式', () => {
            expect(plugin.supportsFormat('YYYY-MM-DD')).toBe(false);
            expect(plugin.supportsFormat('DD/MM/YYYY')).toBe(false);
        });
    });

    describe('format 日期格式化測試', () => {
        const testDate: SimpleDateValue = {
            year: 2025,
            month: 6,
            day: 18
        };

        it('應該格式化 ROC 特定格式', () => {
            expect(plugin.format(testDate, 'ROC-YYYY', 'zh-TW')).toBe('民國114年');
            expect(plugin.format(testDate, 'ROC-YY', 'zh-TW')).toBe('民國14年');
            expect(plugin.format(testDate, 'ROC-YYYY-MM-DD', 'zh-TW')).toBe('民國114年06月18日');
            expect(plugin.format(testDate, 'ROC-YY-MM-DD', 'zh-TW')).toBe('民國14年06月18日');
        });

        it('應該格式化數字格式', () => {
            expect(plugin.format(testDate, 'ROC-NUM-YYYY-MM-DD', 'zh-TW')).toBe('114-06-18');
            expect(plugin.format(testDate, 'ROC-NUM-YY-MM-DD', 'zh-TW')).toBe('14-06-18');
        });

        it('應該格式化斜線分隔格式', () => {
            expect(plugin.format(testDate, 'ROC-YYYY/MM/DD', 'zh-TW')).toBe('民國114/06/18');
        });

        it('當不支援格式時應該拋出錯誤', () => {
            expect(() => {
                plugin.format(testDate, 'YYYY-MM-DD', 'zh-TW');
            }).toThrow('RocFormatPlugin 不支援格式: YYYY-MM-DD');
        });
    });

    describe('format 日期時間格式化測試', () => {
        const testDateTime: SimpleDateValue = {
            year: 2025,
            month: 6,
            day: 18,
            hour: 14,
            minute: 30,
            second: 45
        };

        it('應該格式化 24 小時制時間', () => {
            const result = plugin.format(testDateTime, 'ROC-YYYY-MM-DD HH:mm:ss', 'zh-TW');
            expect(result).toBe('民國114年06月18日 14:30:45');

            const result2 = plugin.format(testDateTime, 'ROC-YYYY-MM-DD HH:mm', 'zh-TW');
            expect(result2).toBe('民國114年06月18日 14:30');
        });

        it('應該格式化中文時間格式', () => {
            const result = plugin.format(testDateTime, 'ROC-YYYY-MM-DD HH時mm分ss秒', 'zh-TW');
            expect(result).toBe('民國114年06月18日 14時30分45秒');

            const result2 = plugin.format(testDateTime, 'ROC-YYYY-MM-DD HH時mm分', 'zh-TW');
            expect(result2).toBe('民國114年06月18日 14時30分');
        });

        it('應該格式化 12 小時制時間', () => {
            const morningTime: SimpleDateValue = { ...testDateTime, hour: 10 };
            const result1 = plugin.format(morningTime, 'ROC-YYYY-MM-DD hh:mm A', 'zh-TW');
            expect(result1).toBe('民國114年06月18日 10:30 上午');

            const result2 = plugin.format(testDateTime, 'ROC-YYYY-MM-DD A hh:mm', 'zh-TW');
            expect(result2).toBe('民國114年06月18日 下午 02:30');
        });

        it('應該格式化中文 12 小時制時間', () => {
            const result = plugin.format(testDateTime, 'ROC-YYYY-MM-DD A HH時mm分', 'zh-TW');
            expect(result).toBe('民國114年06月18日 下午 02時30分');
        });
    });

    describe('邊界條件測試', () => {
        it('應該處理空輸入', () => {
            expect(plugin.parseInput('', 'zh-TW')).toBeNull();
            expect(plugin.parseInput(null as any, 'zh-TW')).toBeNull();
            expect(plugin.parseInput(undefined as any, 'zh-TW')).toBeNull();
        });

        it('應該處理民國元年', () => {
            const result = plugin.parseInput('民國1年01月01日', 'zh-TW');
            expect(result).toEqual({
                year: 1912,
                month: 1,
                day: 1
            });
        });

        it('應該處理民國最大年份', () => {
            const result = plugin.parseInput('民國200年12月31日', 'zh-TW');
            expect(result).toEqual({
                year: 2111,
                month: 12,
                day: 31
            });
        });

        it('應該處理閏年', () => {
            // 民國89年 = 2000年（閏年）
            const result = plugin.parseInput('民國89年02月29日', 'zh-TW');
            expect(result).toEqual({
                year: 2000,
                month: 2,
                day: 29
            });
        });

        it('應該拒絕非閏年的 2 月 29 日', () => {
            // 民國90年 = 2001年（非閏年）
            expect(plugin.parseInput('民國90年02月29日', 'zh-TW')).toBeNull();
        });

        it('應該處理無時間部分的日期格式化', () => {
            const dateOnly: SimpleDateValue = {
                year: 2025,
                month: 6,
                day: 18
            };
            const result = plugin.format(dateOnly, 'ROC-YYYY-MM-DD HH:mm', 'zh-TW');
            expect(result).toBe('民國114年06月18日 00:00');
        });
    });
});
