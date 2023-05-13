import lunisolar from 'lunisolar'

import * as utils from '../lib/index'

describe('test utils', () => {
  it('prettyUnit', () => {
    expect(utils.prettyUnit('lunarHour')).toBe('lunarhour')
    expect(utils.prettyUnit('ld')).toBe('lunarday')
    expect(utils.prettyUnit('ms')).toBe('millisecond')
  })

  it('getYmdhSB', () => {
    const lsr = lunisolar('2023/02/16')
    expect(utils.getYmdhSB(lsr, 'year').value).toBe(39)
    expect(utils.getYmdhSB(lsr, 'month').value).toBe(50)
    expect(utils.getYmdhSB(lsr, 'day').value).toBe(41)
  })

  it('computeSBValue', () => {
    expect(utils.computeSBValue(0, 0)).toBe(0)
    expect(utils.computeSBValue(0, 10)).toBe(10)
    expect(utils.computeSBValue(4, 0)).toBe(24)
    expect(utils.computeSBValue(9, 11)).toBe(59)
  })
})
