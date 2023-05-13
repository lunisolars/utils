import { toInt, hasProps } from '../src/func'

describe('test toInt()', () => {
  it('test toInt 1', () => {
    expect(toInt(12.11)).toBe(12)
  })
  it('test toInt 2', () => {
    expect(toInt(100.55555)).toBe(100)
  })
})

describe('test hasProps()', () => {
  it('test hasProps 1', () => {
    const dd = {
      year: 2023,
      month: 20,
      day: 1
    }
    expect(hasProps(dd, ['year', 'month', 'day'])).toBe(true)
  })
})
