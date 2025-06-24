import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDefaultTime } from '../../../src/composables/useDefaultTime';

describe('useDefaultTime', () => {
    let consoleSpy: any;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('初始化和預設值', () => {
        it('應該使用預設選項', () => {
            const { getValidDefaultTime } = useDefaultTime();
            expect(getValidDefaultTime.value).toBe('00:00:00');
        });

        it('應該使用自訂預設時間', () => {
            const { getValidDefaultTime } = useDefaultTime({
                customDefaultTime: '12:30:45'
            });
            expect(getValidDefaultTime.value).toBe('12:30:45');
        });

        it('當enableSeconds為false時應該省略秒數', () => {
            const { getValidDefaultTime } = useDefaultTime({
                customDefaultTime: '12:30:45',
                enableSeconds: false
            });
            expect(getValidDefaultTime.value).toBe('12:30');
        });
    });

    describe('時間格式驗證', () => {
        it('應該驗證正確的時間格式', () => {
            const { isValidTimeValue } = useDefaultTime();

            expect(isValidTimeValue('12:30:45')).toBe(true);
            expect(isValidTimeValue('12:30')).toBe(true);
            expect(isValidTimeValue('00:00:00')).toBe(true);
            expect(isValidTimeValue('23:59:59')).toBe(true);
        });

        it('應該拒絕無效的時間格式', () => {
            const { isValidTimeValue } = useDefaultTime();

            expect(isValidTimeValue('')).toBe(false);
            expect(isValidTimeValue('24:00:00')).toBe(false);
            expect(isValidTimeValue('12:60:00')).toBe(false);
            expect(isValidTimeValue('12:30:60')).toBe(false);
            expect(isValidTimeValue('abc:def:ghi')).toBe(false);
            expect(isValidTimeValue('12:30:45:67')).toBe(false);
        });

        it('應該在格式錯誤時顯示警告', () => {
            const { isValidTimeValue } = useDefaultTime();

            isValidTimeValue('invalid');
            expect(consoleSpy).toHaveBeenCalledWith('時間格式不正確: invalid，應為 HH:mm:ss 或 HH:mm 格式');
        });

        it('應該在數值超出範圍時顯示警告', () => {
            const { isValidTimeValue } = useDefaultTime();

            isValidTimeValue('25:00:00');
            expect(consoleSpy).toHaveBeenCalledWith('時間格式不正確: 25:00:00，應為 HH:mm:ss 或 HH:mm 格式');
        });
    });

    describe('時間格式化', () => {
        it('應該格式化時間字符串為完整格式', () => {
            const { formatTimeString } = useDefaultTime();

            expect(formatTimeString('1:5:9')).toBe('01:05:09');
            expect(formatTimeString('12:30:45')).toBe('12:30:45');
            expect(formatTimeString('0:0:0')).toBe('00:00:00');
        });

        it('應該根據needSeconds參數決定是否包含秒數', () => {
            const { formatTimeString } = useDefaultTime();

            expect(formatTimeString('12:30:45', true)).toBe('12:30:45');
            expect(formatTimeString('12:30:45', false)).toBe('12:30');
            expect(formatTimeString('1:5', true)).toBe('01:05:00');
            expect(formatTimeString('1:5', false)).toBe('01:05');
        });
    });

    describe('獲取當前時間', () => {
        it('應該返回當前時間字符串', () => {
            const mockDate = new Date('2023-01-01T15:30:45');
            vi.setSystemTime(mockDate);

            const { getCurrentTimeString } = useDefaultTime();
            expect(getCurrentTimeString()).toBe('15:30:45');

            vi.useRealTimers();
        });

        it('當enableSeconds為false時應該省略秒數', () => {
            const mockDate = new Date('2023-01-01T15:30:45');
            vi.setSystemTime(mockDate);

            const { getCurrentTimeString } = useDefaultTime({ enableSeconds: false });
            expect(getCurrentTimeString()).toBe('15:30');

            vi.useRealTimers();
        });
    });

    describe('時間字符串解析', () => {
        it('應該解析時間字符串為組件', () => {
            const { parseTimeString } = useDefaultTime();

            expect(parseTimeString('12:30:45')).toEqual({
                hours: 12,
                minutes: 30,
                seconds: 45
            });

            expect(parseTimeString('01:05:09')).toEqual({
                hours: 1,
                minutes: 5,
                seconds: 9
            });
        });

        it('應該處理缺少秒數的情況', () => {
            const { parseTimeString } = useDefaultTime();

            expect(parseTimeString('12:30')).toEqual({
                hours: 12,
                minutes: 30,
                seconds: 0
            });
        });

        it('應該處理無效數值', () => {
            const { parseTimeString } = useDefaultTime();

            expect(parseTimeString('abc:def:ghi')).toEqual({
                hours: 0,
                minutes: 0,
                seconds: 0
            });
        });
    });

    describe('構建時間字符串', () => {
        it('應該從組件構建時間字符串', () => {
            const { buildTimeString } = useDefaultTime();

            expect(buildTimeString(12, 30, 45)).toBe('12:30:45');
            expect(buildTimeString(1, 5, 9)).toBe('01:05:09');
            expect(buildTimeString(0, 0, 0)).toBe('00:00:00');
        });

        it('當enableSeconds為false時應該省略秒數', () => {
            const { buildTimeString } = useDefaultTime({ enableSeconds: false });

            expect(buildTimeString(12, 30, 45)).toBe('12:30');
            expect(buildTimeString(1, 5, 9)).toBe('01:05');
        });

        it('應該處理預設秒數', () => {
            const { buildTimeString } = useDefaultTime();

            expect(buildTimeString(12, 30)).toBe('12:30:00');
        });
    });

    describe('無效預設時間處理', () => {
        it('當預設時間無效時應該返回undefined', () => {
            const { getValidDefaultTime } = useDefaultTime({
                customDefaultTime: 'invalid-time'
            });

            expect(getValidDefaultTime.value).toBeUndefined();
        });

        it('當預設時間為空字符串時應該返回undefined', () => {
            const { getValidDefaultTime } = useDefaultTime({
                customDefaultTime: ''
            });

            expect(getValidDefaultTime.value).toBeUndefined();
        });
    });

    describe('邊界值測試', () => {
        it('應該處理邊界時間值', () => {
            const { isValidTimeValue } = useDefaultTime();

            expect(isValidTimeValue('00:00:00')).toBe(true);
            expect(isValidTimeValue('23:59:59')).toBe(true);
            expect(isValidTimeValue('12:00')).toBe(true);
            expect(isValidTimeValue('12:59')).toBe(true);
        });

        it('應該拒絕超出邊界的時間值', () => {
            const { isValidTimeValue } = useDefaultTime();

            expect(isValidTimeValue('24:00:00')).toBe(false);
            expect(isValidTimeValue('23:60:00')).toBe(false);
            expect(isValidTimeValue('23:59:60')).toBe(false);
            expect(isValidTimeValue('-1:00:00')).toBe(false);
        });
    });
});
