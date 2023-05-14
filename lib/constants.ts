export const UNITS = {
  ms: 'millisecond',
  s: 'second',
  m: 'minute',
  h: 'hour',
  d: 'day',
  w: 'week',
  M: 'month',
  q: 'quarter',
  y: 'year',
  lh: 'lunarhour',
  ld: 'lunarday',
  lM: 'lunarmonth',
  ly: 'lunaryear',
  ch: 'char8hour',
  cd: 'char8day',
  cM: 'char8month',
  cy: 'char8year'
}

/**
 * 用于解析时间字符串的正则
 */
export const REGEX_PARSE =
  /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/

/**
 * 一天共有多少毫秒
 */
export const DAY_MS = 24 * 60 * 60 * 1000

export const JDN_1970 = 2440587.5
