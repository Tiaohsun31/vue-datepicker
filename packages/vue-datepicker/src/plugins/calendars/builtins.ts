// plugins/calendars/builtins.ts - 內建「Intl 原生」曆法描述子（無自訂文字 plugin）
//
// 這些曆法的數學/網格/格式化全由 @internationalized/date + DateFormatter 處理，
// 不需 plugin。各自為獨立 export const（無副作用），消費者只 import 用到的那個，
// 其餘連同對應曆法類別會被 tree-shake。需使用者 registerCalendar() 後才生效。
import {
    BuddhistCalendar,
    JapaneseCalendar,
    PersianCalendar,
    HebrewCalendar,
    IndianCalendar,
    CopticCalendar,
    EthiopicCalendar,
    EthiopicAmeteAlemCalendar,
    IslamicCivilCalendar,
    IslamicTabularCalendar,
    IslamicUmalquraCalendar,
} from '@internationalized/date';
import type { CalendarDescriptor } from '../../types/calendarPlugin';

const islamicDisplayName: Record<string, string> = {
    'zh-TW': '伊斯蘭曆',
    'zh-CN': '伊斯兰历',
    'en-US': 'Islamic',
    'ja-JP': 'イスラム暦',
    'ko-KR': '이슬람력',
};

export const buddhistCalendar: CalendarDescriptor = {
    id: 'buddhist',
    displayName: { 'zh-TW': '佛曆', 'zh-CN': '佛历', 'en-US': 'Buddhist', 'ja-JP': '仏暦', 'ko-KR': '불력' },
    getYearRange: (cy) => ({ min: 544, max: cy + 643 }),
    createCalendar: () => new BuddhistCalendar(),
};

export const japaneseCalendar: CalendarDescriptor = {
    id: 'japanese',
    displayName: { 'zh-TW': '和曆', 'zh-CN': '和历', 'en-US': 'Japanese', 'ja-JP': '和暦', 'ko-KR': '일본력' },
    getYearRange: (cy) => ({ min: 1868, max: cy + 100 }),
    createCalendar: () => new JapaneseCalendar(),
};

export const persianCalendar: CalendarDescriptor = {
    id: 'persian',
    displayName: { 'zh-TW': '波斯曆', 'zh-CN': '波斯历', 'en-US': 'Persian', 'ja-JP': 'ペルシア暦', 'ko-KR': '페르시아력' },
    getYearRange: (cy) => ({ min: 622, max: cy + 100 }),
    createCalendar: () => new PersianCalendar(),
};

export const hebrewCalendar: CalendarDescriptor = {
    id: 'hebrew',
    displayName: { 'zh-TW': '希伯來曆', 'zh-CN': '希伯来历', 'en-US': 'Hebrew', 'ja-JP': 'ヘブライ暦', 'ko-KR': '히브리력' },
    getYearRange: (cy) => ({ min: 1, max: cy + 3860 }),
    createCalendar: () => new HebrewCalendar(),
};

export const indianCalendar: CalendarDescriptor = {
    id: 'indian',
    displayName: { 'zh-TW': '印度曆', 'zh-CN': '印度历', 'en-US': 'Indian', 'ja-JP': 'インド暦', 'ko-KR': '인도력' },
    getYearRange: (cy) => ({ min: 1, max: cy + 100 }),
    createCalendar: () => new IndianCalendar(),
};

export const copticCalendar: CalendarDescriptor = {
    id: 'coptic',
    displayName: { 'zh-TW': '科普特曆', 'zh-CN': '科普特历', 'en-US': 'Coptic', 'ja-JP': 'コプト暦', 'ko-KR': '콥트력' },
    getYearRange: (cy) => ({ min: 1, max: cy + 100 }),
    createCalendar: () => new CopticCalendar(),
};

export const ethiopicCalendar: CalendarDescriptor = {
    id: 'ethiopic',
    displayName: { 'zh-TW': '衣索比亞曆', 'zh-CN': '埃塞俄比亚历', 'en-US': 'Ethiopic', 'ja-JP': 'エチオピア暦', 'ko-KR': '에티오피아력' },
    getYearRange: (cy) => ({ min: 1, max: cy + 100 }),
    createCalendar: () => new EthiopicCalendar(),
};

export const ethioaaCalendar: CalendarDescriptor = {
    id: 'ethioaa',
    displayName: { 'zh-TW': '衣索比亞曆(阿米特阿萊姆)', 'zh-CN': '埃塞俄比亚历(阿米特阿莱姆)', 'en-US': 'Ethiopic (Amete Alem)', 'ja-JP': 'エチオピア暦(アメテ・アレム)', 'ko-KR': '에티오피아력(아메테 알렘)' },
    getYearRange: (cy) => ({ min: 1, max: cy + 100 }),
    createCalendar: () => new EthiopicAmeteAlemCalendar(),
};

export const islamicCivilCalendar: CalendarDescriptor = {
    id: 'islamic-civil',
    displayName: islamicDisplayName,
    getYearRange: (cy) => ({ min: 622, max: cy + 100 }),
    createCalendar: () => new IslamicCivilCalendar(),
};

export const islamicTabularCalendar: CalendarDescriptor = {
    id: 'islamic-tbla',
    displayName: islamicDisplayName,
    getYearRange: (cy) => ({ min: 622, max: cy + 100 }),
    createCalendar: () => new IslamicTabularCalendar(),
};

export const islamicUmalquraCalendar: CalendarDescriptor = {
    id: 'islamic-umalqura',
    displayName: islamicDisplayName,
    getYearRange: (cy) => ({ min: 622, max: cy + 100 }),
    createCalendar: () => new IslamicUmalquraCalendar(),
};
