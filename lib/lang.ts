import type { LocaleData } from '../types/localeData'
/**
 * 取得譯文
 * @param key 譯文key
 */
export function getTranslation<T = any, U = LocaleData>(locale: U, key: string): T | string {
  const keySplit = key.split('.')
  let curr: any = locale
  let res = key
  const resAsCurr = (curr: any) => {
    if (typeof curr === 'string' || typeof curr === 'number' || typeof curr === 'function') {
      res = curr
      return true
    }
    return false
  }
  while (keySplit.length >= 0) {
    if (resAsCurr(curr)) break
    if (keySplit.length === 0) break
    const currKey = keySplit.shift()
    if (currKey === undefined) return ''
    if (Array.isArray(curr)) {
      const idx = Number(currKey)
      if (isNaN(idx) || idx >= curr.length) return ''
      curr = curr[idx]
      res = curr
    } else if (curr.hasOwnProperty(currKey)) {
      curr = curr[currKey]
    } else {
      return keySplit[keySplit.length - 1] || currKey
    }
  }
  return res
}

/**
 * 定义语言包
 * @param localeData 语言包数据
 */
export const defineLocale = (localeData: { name: string; [x: string]: any }) => localeData
