// plugins/calendars/registry.ts - 曆法描述子註冊表（Phase 6）
//
// 公開 opt-in 擴展點：西元曆以外的曆法一律以 registerCalendar() 顯式註冊。
// dispatch / metadata 一律查此表，未註冊 → 回退西元曆（+ dev-warn）。
import { GregorianCalendar } from '@internationalized/date';
import type { CalendarDescriptor } from '../../types/calendarPlugin';

const registry = new Map<string, CalendarDescriptor>();

/**
 * 西元曆：永遠內建、免註冊、無法被覆寫移除。
 * 其餘曆法（roc/buddhist/…）由使用者 import 描述子後 registerCalendar 註冊。
 */
export const gregorianDescriptor: CalendarDescriptor = {
    id: 'gregory',
    displayName: {
        'zh-TW': '西元',
        'zh-CN': '西元',
        'en-US': 'Gregorian',
        'ja-JP': '西暦',
        'ko-KR': '서력',
    },
    getYearRange: (currentGregorianYear) => ({ min: 1, max: currentGregorianYear + 100 }),
    createCalendar: () => new GregorianCalendar(),
};

registry.set(gregorianDescriptor.id, gregorianDescriptor);

/**
 * 註冊一個曆法描述子（公開 API）。重複 id 會覆寫。
 */
export function registerCalendar(descriptor: CalendarDescriptor): void {
    registry.set(descriptor.id, descriptor);
}

/**
 * 取得已註冊的曆法描述子；未註冊回傳 undefined。
 */
export function getCalendarDescriptor(id: string): CalendarDescriptor | undefined {
    return registry.get(id);
}

/**
 * 該曆法是否已註冊（西元曆恆為 true）。
 */
export function isCalendarRegistered(id: string): boolean {
    return registry.has(id);
}
