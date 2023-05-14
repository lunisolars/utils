import { jdn2DateDict, gre2jdn, jdn2timestamp, dateDict2jdms } from '../lib/jd'
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
})

describe('test jdn2DateDict()', () => {
  it('test jdn2DateDict 1', () => {
    console.log()
    expect(jdn2DateDict(2460078.7083333335, false, 46800000 - 8 * 60 * 60 * 1000)).toEqual({
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
