import type lunisolar from 'lunisolar'
type GreUnitFullName =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
type LunarUnitFullName = 'lunarHour' | 'lunarDay' | 'lunarMonth' | 'lunarYear'
type LunarUnitFullNameLower = 'lunarhour' | 'lunarday' | 'lunarmonth' | 'lunaryear'
type Char8UnitFullName = 'char8Hour' | 'char8Day' | 'char8Month' | 'char8Year'
type Char8UnitFullNameLower = 'char8hour' | 'char8day' | 'char8month' | 'char8year'

type GreUnitShortName = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'q' | 'y'
export type LunarUnitShortName = 'lh' | 'ld' | 'lM' | 'ly'
export type Char8UnitShortName = 'ch' | 'cd' | 'cM' | 'cy'

type GreUnit = GreUnitFullName | GreUnitShortName
type LunarUnit = LunarUnitFullName | LunarUnitShortName | LunarUnitFullNameLower
type Char8Unit = Char8UnitFullName | Char8UnitFullName | Char8UnitFullNameLower

export type UnitFullName = GreUnitFullName | LunarUnitFullName | Char8UnitFullName
export type UnitFullNameLower = GreUnitFullName | LunarUnitFullNameLower | Char8UnitFullNameLower
export type Unit = GreUnit | LunarUnit | Char8Unit

type DateConfigType = lunisolar.DateConfigType
export type DateParamType = DateConfigType | lunisolar.Lunisolar

export type StemOrBranchValueFunc = (
  lsr: lunisolar.Lunisolar,
  ymdh: 'year' | 'month' | 'day' | 'hour',
  div?: number
) => number

export type YMDH = 'year' | 'month' | 'day' | 'hour'

export type YmdhSu = 'Y' | 'M' | 'D' | 'H'
export type YmdhSl = 'y' | 'm' | 'd' | 'h'
