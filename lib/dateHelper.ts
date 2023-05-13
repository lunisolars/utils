import type { Unit, UnitFullNameLower } from '../types/types'
import { UNITS } from './constants'

/**
 * 处理日期单位
 * @param unit
 */
export const prettyUnit = (unit?: Unit): UnitFullNameLower | '' => {
  if (!unit) return ''
  unit = unit.trim() as Unit
  return (
    (UNITS as { [prop: string]: UnitFullNameLower })[unit] ||
    (unit || '').toLowerCase().replace(/s$/, '')
  )
}

/**
 * 天干納甲 通過天干取得八卦
  ```
   乾纳甲壬，坤纳乙癸，
   震纳庚，巽纳辛，
   坎纳戊，离纳己，
   艮纳丙，兑纳丁
  ```
 * @param stemValue 天干索引
 * @returns 返回八卦索引值
 */
export const getTrigramValueByStem = function (stemValue: number): number {
  return [7, 0, 4, 3, 2, 5, 1, 5, 7, 0][stemValue]
}

/**
 * 通过天干和地支索引值，计算60个天干地支组合的索引
 * @param stemValue 天干索引值
 * @param branchValue 地支索引值
 */
export const computeSBValue = (stemValue: number, branchValue: number): number => {
  // 如果一个为奇数一个为偶数，则不能组合
  if ((stemValue + branchValue) % 2 !== 0) throw new Error('Invalid SB value')
  return (stemValue % 10) + ((6 - (branchValue >> 1) + (stemValue >> 1)) % 6) * 10
}

/**
  * 五鼠遁计算天干
  ```
  ---- 五鼠遁 ---
  甲己还加甲，乙庚丙作初。
  丙辛从戊起，丁壬庚子居。
  戊癸起壬子，周而复始求。
  ```
  * @param fromStemValue 起始天干value (计算时柱天干则此处应为日柱天干)
  * @param branchValue 目标地支value （计算时柱天干，时处应为时柱地支）
  * @returns 返回目标地支的天干value
*/
export function computeRatStem(fromStemValue: number, branchValue: number = 0): number {
  const h2StartStemNum = (fromStemValue % 5) * 2
  return (h2StartStemNum + branchValue) % 10
}

/**
 * 计算地支的三合五行
 * @param branchValue 地支value值
 * @returns 返回五行属性的索引值
 */
export const computeTriadE5Value = function (branchValue: number): number {
  const e5v = [4, 0, 1, 3]
  const idx = branchValue % 4
  return e5v[idx]
}

/**
 * 计算地支六合五行
 * @param branchValue 地支value值
 * @returns 返回五行属性的索引值
 */
export const computeGroup6E5Value = function (branchValue: number) {
  const e5v = [2, 0, 1, 3, 4, 2]
  branchValue = branchValue === 0 ? 12 : branchValue
  if (branchValue < 7) return e5v[branchValue - 1]
  return e5v[12 - branchValue]
}
