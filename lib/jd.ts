import type { DateDict } from '../types/types'
import { toInt } from './func'
import { DAY_MS } from './constants'
import { date2DateDict } from './parseDate'

export function dateDict2jdms(d: DateDict): number {
  const ms = d.millisecond ?? 0
  return d.hour * 60 * 60 * 1000 + d.minute * 60 * 1000 + d.second * 1000 + ms
}

export function jdms2hms(
  jdms: number
): Pick<Required<DateDict>, 'hour' | 'minute' | 'second' | 'millisecond'> {
  const hour = toInt(jdms / (60 * 60 * 1000))
  let f = jdms - hour * 60 * 60 * 1000
  const minute = toInt(f / (60 * 1000))
  f -= minute * (60 * 1000)
  const second = toInt(f / 1000)
  f -= second
  return {
    hour,
    minute,
    second,
    millisecond: f
  }
}

export function modDayMs(jdms: number, addValue: number): number {
  return (DAY_MS + jdms + addValue) % DAY_MS
}

/**
 * Gregorian calendar to Julian Day Number
 * 公历转儒略日数
 *
 * @param date Gregorian calendar date
 * @param isUTC is UTC
 * @returns Julian Day Number
 */
export function gre2jdn(date?: Date | Partial<DateDict>, isUTC = false): number {
  const dateDict = date2DateDict(date) as DateDict
  const now = new Date()
  let year = dateDict?.year ?? now.getFullYear()
  let month = dateDict?.month ?? now.getMonth() + 1
  let day = dateDict?.day ?? now.getDate()
  const hour = dateDict?.hour ?? 0
  const m = dateDict?.minute ?? 0
  const s = dateDict?.second ?? 0
  const ms = dateDict?.millisecond ?? 0
  const tzOffset = now.getTimezoneOffset() // -480
  let dig = hour / 24 + m / (24 * 60) + s / (24 * 60 * 60) + ms / (24 * 60 * 60 * 1000)
  // 减去时区差
  if (date && !(date instanceof Date) && !isUTC) {
    dig += tzOffset / (24 * 60)
  }

  //公历转儒略日
  let n = 0,
    G = 0
  if (year * 372 + month * 31 + toInt(day) >= 588829) G = 1 //判断是否为格里高利历日1582*372+10*31+15
  if (month <= 2) (month += 12), year--
  if (G) (n = toInt(year / 100)), (n = 2 - n + toInt(n / 4)) //加百年闰
  return toInt(365.25 * (year + 4716)) + toInt(30.6001 * (month + 1)) + day + n - 1524.5 + dig
}

/**
 * Juilan Day Number to Gregorian calendar
 * @param jdn Julian Day Number
 * @param isUTC is UTC
 * @returns  Gregorian calendar date dict
 */
export function jdn2gre(jdn: number, isUTC = false, jdms?: number): Required<DateDict> {
  if (!isUTC) {
    const timezoneOffset = -new Date().getTimezoneOffset()
    jdn += timezoneOffset / (24 * 60)
    if (jdms && jdms > 0) {
      jdms = modDayMs(jdms, timezoneOffset * 60 * 1000)
    }
  }
  //儒略日数转公历
  const r: Required<DateDict> = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  }
  let D = toInt(jdn + 0.5),
    F = jdn + 0.5 - D,
    c //取得日数的整数部份A及小数部分F
  if (D >= 2299161) {
    c = toInt((D - 1867216.25) / 36524.25)
    D += 1 + c - toInt(c / 4)
  }
  D += 1524
  r.year = toInt((D - 122.1) / 365.25) //年数
  D -= toInt(365.25 * r.year)
  r.month = toInt(D / 30.601) //月数
  D -= toInt(30.601 * r.month)
  r.day = D //日数
  if (r.month > 13) {
    r.month -= 13
    r.year -= 4715
  } else {
    r.month -= 1
    r.year -= 4716
  }
  if (jdms && jdms > 0) {
    const hms = jdms2hms(jdms)
    r.hour = hms.hour
    r.minute = hms.minute
    r.second = hms.second
    r.millisecond = hms.millisecond
  } else {
    //日的小数转为时分秒
    F *= 24
    r.hour = toInt(F)
    F -= r.hour
    F *= 60
    r.minute = toInt(F)
    F -= r.minute
    F *= 60
    r.second = Math.round(F)
    if (r.second > 59) {
      r.second -= 60
      r.minute++
    }
    if (r.minute > 59) {
      r.minute -= 60
      r.hour++
    }
  }
  return r
}
