import {
  jdn2dateDict,
  gre2jdn,
  jdn2timestamp,
  dateDict2jdms,
  jdDict2timestamp,
  timestamp2jdDict
} from '../lib/jd'
import { DateDict } from '../types/types'

describe('test gre2jdn()', () => {
  it('test gre2jdn 2023-05-14 13:00', () => {
    const dd: DateDict = {
      year: 2023,
      month: 5,
      day: 14,
      hour: 13,
      minute: 0,
      second: 0
    }
    const jdn = gre2jdn(dd, false)
    const jdms = dateDict2jdms(dd)

    expect(jdn).toBe(2460078.7083333335)
    expect(jdms).toBe(46800000 - 8 * 60 * 60 * 1000)
    expect(jdn2timestamp(jdn)).toBe(new Date(2023, 4, 14, 13).valueOf())
  })

  it('test gre2jdn 2023-04-14 13:00', () => {
    const dd: DateDict = {
      year: 2023,
      month: 4,
      day: 14,
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0
    }
    const jdn = gre2jdn(dd, true)
    const jdms = dateDict2jdms(dd, true)
    const jdms2 = dateDict2jdms(dd, false)

    expect(jdn).toBe(2460049)
    expect(jdms).toBe(43200000)
    expect(jdms2).toBe(14400000)
    // 14400000
    expect(jdn2timestamp(jdn)).toBe(Date.UTC(2023, 3, 14, 12).valueOf())
    expect(jdn2dateDict(jdn, true, jdms)).toEqual(dd)
  })
})

describe('test jdn2DateDict()', () => {
  it('test jdn2DateDict 1', () => {
    expect(jdn2dateDict(2460078.7083333335, false, 46800000 - 8 * 60 * 60 * 1000)).toEqual({
      year: 2023,
      month: 5,
      day: 14,
      hour: 13,
      minute: 0,
      second: 0,
      millisecond: 0
    })
  })
})

describe('test jdDict2timestamp() and timestamp2jdDict', () => {
  it('test jdDict2timestamp 1', () => {
    const jdms = 46800000 - 8 * 60 * 60 * 1000
    expect(jdDict2timestamp({ jdn: 2460078.708333, jdms })).toBe(1684040400000)
  })

  it('test timestamp2jdDict', () => {
    expect(timestamp2jdDict(1684040400000)).toEqual({
      jdn: 2460078.7083333335,
      jdms: 46800000 - 8 * 60 * 60 * 1000
    })
  })
})
