import { string2DateDict, dateDict2Date } from '../lib/parseDate'

describe('test string2DateDict()', () => {
  it('string2DateDict 2023-05-12 17:10', () => {
    expect(string2DateDict('2023-05-12 17:10')).toEqual({
      year: 2023,
      month: 5,
      day: 12,
      hour: 17,
      minute: 10,
      second: 0,
      millisecond: 0
    })
  })

  it('string2DateDict 2023-05-12 17:10', () => {
    expect(string2DateDict('2023-05-12T17:10:00.000Z')).toEqual({
      year: 2023,
      month: 5,
      day: 12,
      hour: 17,
      minute: 10,
      second: 0,
      millisecond: 0
    })
  })
})

it('string2DateDict BC1-05-12', () => {
  expect(string2DateDict('BC1-05-12')).toEqual({
    year: 0,
    month: 5,
    day: 12,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  })
})

it('string2DateDict BC200-05-12', () => {
  expect(string2DateDict('BC200-10-12')).toEqual({
    year: -199,
    month: 10,
    day: 12,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  })
})

describe('test dateDict2Date()', () => {
  it('dateDict2Date 2023-05-12 17:10 UTC', () => {
    const date = dateDict2Date(
      {
        year: 2023,
        month: 5,
        day: 12,
        hour: 17,
        minute: 10,
        second: 0,
        millisecond: 0
      },
      true
    )
    expect(date.getUTCFullYear()).toBe(2023)
    expect(date.getUTCMonth() + 1).toBe(5)
    expect(date.getUTCDate()).toBe(12)
    expect(date.getUTCHours()).toBe(17)
    expect(date.getUTCMinutes()).toBe(10)
    expect(date.getUTCSeconds()).toBe(0)
    expect(date.getUTCMilliseconds()).toBe(0)
  })

  it('dateDict2Date 2023-05-12 17:10', () => {
    const date = dateDict2Date({
      year: 2023,
      month: 5,
      day: 12,
      hour: 17,
      minute: 10,
      second: 0,
      millisecond: 0
    })
    expect(date.getFullYear()).toBe(2023)
    expect(date.getMonth() + 1).toBe(5)
    expect(date.getDate()).toBe(12)
    expect(date.getHours()).toBe(17)
    expect(date.getMinutes()).toBe(10)
    expect(date.getSeconds()).toBe(0)
    expect(date.getMilliseconds()).toBe(0)
  })
})
