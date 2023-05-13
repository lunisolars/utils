/**
 * 转整数
 * @param val 数值
 */
export function toInt(val: number): number {
  return Math.floor(val)
}

/**
 * 检查对象是否包含所有指定的属性
 * @param target 目标对象
 * @param props 指定的属性列表
 */
export function hasProps(target: object, props: string[]): boolean {
  for (const prop of props) {
    if (!target.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

/**
 * 把两个列表分别作为key为value合并成字典
 * @param keyList key列表数组
 * @param valueList value列表数组
 */
export function twoList2Dict<T = any>(keyList: string[], valueList: T[]): { [key: string]: T } {
  const res: { [key: string]: T } = {}
  for (let i = 0; i < keyList.length; i++) {
    const key = keyList[i]
    const value = valueList[i]
    res[key] = value
  }
  return res
}

export function isNumber(value: number | string): boolean {
  return !isNaN(Number(value))
}

/**
 * 设置对象的所有属性为只读
 * @param obj 对象
 * @returns obj
 */
export const setReadonly = <T extends Object>(obj: T): T => {
  for (const key in obj) {
    Object.defineProperty(obj, key, {
      writable: false
    })
  }
  return obj
}

/**
 * 取得数字的小数部分
 */
export function getFractionalPart(val: number) {
  const strSplit = String(val).split('.')
  return Number(`${strSplit[0]}.${strSplit[1] ?? 0}`)
}
