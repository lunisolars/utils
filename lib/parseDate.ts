import { DateDict, DateParamType, YMD } from '../types/types'
import { REGEX_PARSE } from './constants'
import { hasProps } from './func'

export const getDefaultDateDict = (): Required<DateDict> => {
  const now = new Date()
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  }
}

/**
 * 日期字符串转日期字典
 * @param str 日期字符串
 * @returns 日期字典对象
 */
export const string2DateDict = (str: string): Required<DateDict> => {
  const res = getDefaultDateDict()
  const d = str.match(REGEX_PARSE) as any
  if (d) {
    const ms = (d[7] || '0').substring(0, 3)
    res.year = Number(d[1] || res.year)
    res.month = Number(d[2] || 0)
    res.day = Number(d[3] || 1)
    res.hour = Number(d[4] || 0)
    res.minute = Number(d[5] || 0)
    res.second = Number(d[6] || 0)
    res.millisecond = Number(ms)
  }
  return res
}

type DateDictYMD = Pick<DateDict, YMD>
type DateDictPart = DateDictYMD & Partial<Omit<DateDict, YMD>>

/**
 * 日期字典对象转Date对象
 * @param dateDict 日期字典对象
 * @param isUTC 是否UTC
 * @returns Date对象
 */
export const dateDict2Date = (dateDict: DateDict, isUTC: boolean = false) => {
  const y = dateDict.year
  const M = dateDict.month - 1
  const d = dateDict.day
  const h = dateDict.hour
  const m = dateDict.minute
  const s = dateDict.second
  const ms = dateDict.millisecond
  if (isUTC) {
    return new Date(Date.UTC(y, M, d || 1, h || 0, m || 0, s || 0, ms))
  }
  return new Date(y, M, d || 1, h || 0, m || 0, s || 0, ms)
}

export const dateDictYMD2Date = (dateDict: DateDictPart, isUTC: boolean = false) => {
  const dd = getDefaultDateDict()
  Object.assign(dd, dateDict)
  return dateDict2Date(dd, isUTC)
}

/**
 * 转为日期对象
 * @param date 日期字符串或日期对象
 * @param isUTC 是否UTC时间
 * @returns 返回日期对像
 */
export const parseDate = (date?: DateParamType, isUTC: boolean = false): Date => {
  if (typeof date === 'undefined') return new Date()
  if (date === null) return new Date(NaN) // null is invalid
  if (typeof date === 'object' && !(date instanceof Date) && typeof date.toDate !== 'undefined') {
    const dToDate = date.toDate()
    if (dToDate instanceof Date) return dToDate
  }

  if (date instanceof Date) return new Date(date.valueOf())
  if (typeof date === 'string' && !/Z$/i.test(date))
    return dateDict2Date(string2DateDict(date), isUTC)
  if (typeof date === 'object' && hasProps(date, ['year', 'month', 'day']))
    return dateDictYMD2Date(date as unknown as DateDictPart, isUTC)
  return new Date(date as string | number)
}
