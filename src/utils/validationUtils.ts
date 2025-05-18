/**
 * 檢查字符串是否只包含數字
 * @param str 要檢查的字符串
 * @returns 是否只包含數字
 */
export const isNumeric = (str: string): boolean => /^\d+$/.test(str);

/**
 * 檢查是否是閏年
 * @param year 年份
 * @returns 是否是閏年
 */
export const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};
