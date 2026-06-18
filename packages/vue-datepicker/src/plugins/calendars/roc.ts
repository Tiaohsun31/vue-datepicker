// plugins/calendars/roc.ts - 民國曆（ROC）描述子
//
// ROC 同時需要：曆法數學（@internationalized/date 的 TaiwanCalendar）
// 與 Intl 做不到的自訂文字格式（民國年 → RocFormatPlugin）。
// 獨立成檔，使「未使用 ROC」的應用完全不會打包 RocFormatPlugin。
import { TaiwanCalendar } from '@internationalized/date';
import type { CalendarDescriptor } from '../../types/calendarPlugin';
import { RocFormatPlugin } from './RocFormatPlugin';

export const rocCalendar: CalendarDescriptor = {
    id: 'roc',
    displayName: {
        'zh-TW': '民國',
        'zh-CN': '民国',
        'en-US': 'ROC',
        'ja-JP': '中華民国',
        'ko-KR': '중화민국',
    },
    // 對齊 RocFormatPlugin 的民國 1–200 年（1912–2111），避免年份選擇器可選到 plugin 解析會拒絕的年份（6.6）
    getYearRange: () => ({ min: 1912, max: 2111 }),
    createCalendar: () => new TaiwanCalendar(),
    plugin: new RocFormatPlugin(),
};
