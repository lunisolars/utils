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

// parse
export const REGEX_PARSE =
  /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/

export const DAY_MS = 24 * 60 * 60 * 1000
