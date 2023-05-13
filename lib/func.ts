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
