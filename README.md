# Date Calculator

## TL;DR

```
import { simpleCalculator } from "datecalculator";
// or use any of: datefnsCalculator luxonCalculator simpleluxonCalculator momentCalculator

simpleCalculator`now + 3 days + 5 hours`;
```

## Install

TBD

## git repo

[Find source code on git](https://github.com/Zyclotrop-j/DateCalculator)

## Dependencies

There are **no direct dependencies**!

We recommend using this lib with your favorite date-time lib, use the bindings provided.

| import                | required dependency                      | import                                                    |
| --------------------- | ---------------------------------------- | --------------------------------------------------------- |
| datefnsCalculator     | [date-fns](https://date-fns.org)         | `import { datefnsCalculator } from "datecalculator";`     |
| luxonCalculator       | [luxon](https://moment.github.io/luxon/) | `import { luxonCalculator } from "datecalculator";`       |
| simpleluxonCalculator | [luxon](https://moment.github.io/luxon/) | `import { simpleluxonCalculator } from "datecalculator";` |
| momentCalculator      | [moment](https://momentjs.com/)          | `import { momentCalculator } from "datecalculator";`      |

## Examples

TBD

## Api docs

Calling the calculator is easy:

```
calculator`<expression>`
```

where calculator is your imported calculator and expression is what you want calculated. The following section outlines what is permitted in expressions.

### Types

Being a date-calculator the primary types used in expressions are date-times and the differences in between them (being durations and intervals).

#### Date-Time

A datetime is an exact point in time. It can be expressed as a ISO-8601-date-time (see [w3](https://www.w3.org/TR/NOTE-datetime) and [wikipedia](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators)). Simply put, use the format `YYYY-MM-DDThh:mm:ss.sss` ("extended format"). All parts (but the year) are optional. If a part is not present, its default is used (0 for times and 1 for dates; `2019` = `2019-01-01T00:00:00.000`). You can also use the normal form `YYYYMMDD hhmmsssss`. You can also add a time-zone using `YYYY-MM-DDThh:mm:ss.sss+-hh:mm` or `YYYY-MM-DDThh:mm:ss.sssZ` for utc.

**Examples**

```
2009-12T12:34 // Tue Dec 01 2009 12:34:00 GMT+1100 (Australian Eastern Daylight Time)
2009 // Thu Jan 01 2009 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
2009-05-19 // Tue May 19 2009 10:00:00 GMT+1000 (Australian Eastern Standard Time)
 2009-05-19  // Tue May 19 2009 00:00:00 GMT+1000 (Australian Eastern Standard Time)
2009-05 // Fri May 01 2009 10:00:00 GMT+1000 (Australian Eastern Standard Time)
2009-001 // Thu Jan 01 2009 00:00:00 GMT+1100 (Australian Eastern Daylight Time)
2009-05-19 // Tue May 19 2009 10:00:00 GMT+1000 (Australian Eastern Standard Time)
2009-05-19T00:00 // Tue May 19 2009 00:00:00 GMT+1000 (Australian Eastern Standard Time)
2009-05-19T14:31 // Tue May 19 2009 14:31:00 GMT+1000 (Australian Eastern Standard Time)
2009-05-19T14:39:22 // Tue May 19 2009 14:39:22 GMT+1000 (Australian Eastern Standard Time)
2009-05-19T14:39Z // Wed May 20 2009 00:39:00 GMT+1000 (Australian Eastern Standard Time)
2009-05-19T14:39:22-06:00 // Wed May 20 2009 06:39:22 GMT+1000 (Australian Eastern Standard Time)
2009-05-19T14:39:22+0600 // Tue May 19 2009 18:39:22 GMT+1000 (Australian Eastern Standard Time)
2007-04-06T00:00 // Fri Apr 06 2007 00:00:00 GMT+1000 (Australian Eastern Standard Time)
200912T1234 // Tue Dec 01 2009 12:34:00 GMT+1100 (Australian Eastern Daylight Time)
2009 // Thu Jan 01 2009 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
20090519 // Tue May 19 2009 10:00:00 GMT+1000 (Australian Eastern Standard Time)
 20090519  // Tue May 19 2009 00:00:00 GMT+1000 (Australian Eastern Standard Time)
200905 // Fri May 01 2009 10:00:00 GMT+1000 (Australian Eastern Standard Time)
2009001 // Thu Jan 01 2009 00:00:00 GMT+1100 (Australian Eastern Daylight Time)
20090519 // Tue May 19 2009 10:00:00 GMT+1000 (Australian Eastern Standard Time)
20090519 0000 // Tue May 19 2009 00:00:00 GMT+1000 (Australian Eastern Standard Time)
20090519 1431 // Tue May 19 2009 14:31:00 GMT+1000 (Australian Eastern Standard Time)
20090519 143922 // Tue May 19 2009 14:39:22 GMT+1000 (Australian Eastern Standard Time)
20090519 1439Z // Wed May 20 2009 00:39:00 GMT+1000 (Australian Eastern Standard Time)
20090519 143922-06:00 // Wed May 20 2009 06:39:22 GMT+1000 (Australian Eastern Standard Time)
20090519 143922+0600 // Tue May 19 2009 18:39:22 GMT+1000 (Australian Eastern Standard Time)
20070406 0000 // Fri Apr 06 2007 00:00:00 GMT+1000 (Australian Eastern Standard Time)
```

##### Binding depended

Each parser may provide its own parsing-from-string mechanism using `{....}`-notation.

#### Duration

A duration expresses a time-period, aka "how long". A duration may be expressed using an iso-duration or the short-hand notation as follows.

**Note**
Without a start- or end-date (see Interval) the units in a duration are hard to compare. For example, a duration of `1 month` can be either anywhere from 28 days (2019-02-01/2019-03-01) to 31 days (2019-12-01/2020-01-01). Therefore some operations might be unsafe to perform, such as `1 month / 1 days` (interpreted as "how many days fit into a month"). Depending on the bindings a loss of information and accuracy may occurs. (Also see [luxon-notes](https://moment.github.io/luxon/docs/manual/math.html#duration-math).)

##### Short-hand notation

Each short-hand notation has three different forms which can be used synonymously: spelled-out singular, plural and shorthand (which makes it a shorthand-shorthand, I guess?). Whitespace is irrelevant. So `1 day`, `1 days`, `1 d`, `1day`, `1days`, `1d` all mean "1 day".

| singular    | plural       | shorthand | example | notes              |
| ----------- | ------------ | --------- | ------- | ------------------ |
| millisecond | milliseconds | ms        | `5ms`   |                    |
| second      | seconds      | s         | `1 s`   | alias: ss, sec     |
| minute      | minutes      | m         | `1 min` | alias: min, mm, Tm |
| hour        | hours        | h         | `1 h`   | alias: hh          |
| day         | days         | d         | `1 d`   |                    |
| weekday     | weekdays     | wd        | `1 wd`  |                    |
| week        | weeks        | w         | `1 w`   |                    |
| fortnight   | fortnights   | fn        | `1 fn`  | = two weeks        |
| month       | months       | M         | `1 M`   | alias: l, L        |
| quarter     | quarters     | q         | `1 q`   |                    |
| year        | years        | y         | `1 y`   | alias: a           |

In general these notation are **caseinsensetive** and can be pluralized, with the following exceptions:

- `M`, months, not to be confused with `m`, minutes
- `m`, minutes, see above
- `ms`, milliseconds, not to be confused `Ms`, plural of `M`, months

##### Iso-Notation

Durations may be written in iso as `PnYnMnDTnHnMnS` (where `n` is a any number).
From [wikipedia](https://en.wikipedia.org/wiki/ISO_8601#Durations):

> P is the duration designator (for period) placed at the start of the duration representation.
>
> Y is the year designator that follows the value for the number of years.
>
> M is the month designator that follows the value for the number of months.
>
> W is the week designator that follows the value for the number of weeks.
>
> D is the day designator that follows the value for the number of days.
>
> T is the time designator that precedes the time components of the representation.
>
> H is the hour designator that follows the value for the number of hours.
>
> M is the minute designator that follows the value for the number of minutes.
>
> S is the second designator that follows the value for the number of seconds.

"+" and "-" are allowed for the entire expression and parts individually. Thus `+P1Y` (1 year), `-P1Y` (minus 1 year) and `-P-1y` (minus minus 1 year = 1 year) are valid.

**Examples**

```
// Iso extended form, any number of digits allowed
P1Y2M3DT4H05M600S // 1 year, 2 months, 3 days, 4 hours, 5 minutes, 600 seconds
PT3H5M // 3 hours, 5 minus
P1Y // 1 year
P-1Y1M // -1 year, 1 month -> effectively 11 month
P1DT-30S // 1 day, -30 seconds
P1Y // 1 year
P2M // 2 month
P3D // 3 days
PT4H // 4 hours
PT05M // 5 minutes; padding with 0s is allowed
PT600S // 600 seconds; more than 2 digits are allowed
P1y2m3dT4h5m6s // 1 year, 2 months, 3 days, 4 hours, 5 minutes, 6 seconds; case-insensitive
// Iso-short-form, 4 digits for year, 2 for each other component
P00021015T103020 // 2 years, 10 months, 15 days, 10 hours, 30 minutes, 20 seconds
P00021015 // 2 years, 10 months, 15 days
P0002-10-15T10:30:20 // 2 years, 10 months, 15 days, 10 hours, 30 minutes, 20 seconds
P0002-10-15 // 2 years, 10 months, 15 days
+P00021015T103020
+P00021015
+P0002-10-15T10:30:20
+P0002-10-15
-P00021015T103020 // -2 years, -10 months, -15 days, -10 hours, -30 minutes, -20 seconds
-P00021015
-P0002-10-15T10:30:20
-P0002-10-15
P+00021015T103020
P0002-1015
P0002--10-15T10:+30:20 // 2 years, -10 month, 15 days, 10 hours, 30 minutes, 20 seconds
P0002-10--15 // 2 years, 10 months, -15 days
-P0002-10--15 // -2 years, -10 months, --15 days = 15 days
```

**Note**
The time designator is **mandatory** when denoting times, so `P1H` would be _invalid_ while `PT1H` would be fine.

##### Binding depended

Each parser may provide its own parsing-from-string mechanism using `[....]`-notation.

**Example**
`{["2012 juillet", "YYYY MMM", "fr"]}` + moment-bindings
`{["12/11/2000", "MM/dd/yyyy"]}` + luxon-bindings

#### Interval

An interval expresses the duration between a start- and an end-date. It can be understood as a box for two dates and the duration in between. Hence an interval can be constructed by providing a start- and an end-date, or a start-date and a duration (end-date = start-date + duration), or an end-date and a duration (start-date = end-date - duration).

Intervals may be written as Iso-intervals. The three options are:

- Iso-Date-Time/Iso-Date-Time
- Iso-Date-Time/Iso-Duration
- Iso-Duration/Iso-Date-Time

Iso-Date-Time and Iso-Duration use the same parsing mechanisms described above and hence allow the notations outlined above.

**Examples**

```
2009-12T12:34/20090519 143922+0600
P1Y2M3DT4H05M600S/2009-12T12:34
2009-12T12:34/P1Y2M3DT4H05M600S
```

For more examples, combine any date-time example with another date-time-example or any duration-example.

**Note**
Note all bindings support intervals!

##### Binding depended

Each parser may provide its own parsing-from-string mechanism using `~....~`-notation.

#### Unitless

You may enter "bare" numbers, such as `2`. They are treated as such. This might be useful for scalar operations such as `2 * 2d` (`= 4 d`).

**Examples**

```
1
0
100
-10
-5
0
-09
1 + 1 // 2
10 + 15 - 25 // 0
3 * 5 // 15
3d * -1 // -3d
88 / 11 // 8
1 / 2 // 0.5
2.5 * 2 // 5
2d * 5 // 10d
7 - 8 // -1
```

**Warning**

Longer number are going to be interpreted as Iso-dates and thus might fail parsing!
If you need to use numbers with more digits than 3, consider using interpolation instead.

```
2000 // 2000-01-01T00:00:00
`${2000}` // 'number' 2000
```

#### Custom / Existing values

Use interpolation to insert custom type:

```
calculator`${any_thing_here}`
```

This allows you to use your existing Date/luxon-Date-Times/moments/luxon-Intervals/... directly in the calculator.

**The bindings define what custom types are supported!**

That means, if you interpolate a datefnsCalculator with a luxon-Date-Time it will likely throw an error, as date-fns can't make sense of the luxon-object.

**Examples**

```
import DateTime from 'luxon/src/datetime.js';

luxonCalculator`${DateTime.fromSQL(...)} + ${{ hours: 3, minutes: 13 }}`
```

```
import moment from 'moment';

luxonCalculator`${moment()} + ${moment.duration(2, 'seconds');}`
```

### Operations

#### Add ("plus", "+")

Adds two "things". The binding implementation defines what "add" means and if it has a meaning at all!

**Example**
`1d + 1h`

| Binding      | Type a   | Type b   | Result          | Notes                             |
| ------------ | -------- | -------- | --------------- | --------------------------------- |
| simple       | Date     | Date     | Error           |                                   |
| simple       | Date     | Duration | Timestamp (Int) | Loses accuracy due to conversion  |
| simple       | Duration | Date     | Timestamp (Int) | Loses accuracy due to conversion  |
| simple       | Duration | Duration | Duration        |                                   |
| simple       | Unitless | Unitless | Unitless        |                                   |
| simple       | Unitless | \*       | Error           |                                   |
| simple       | any      | any      | any             | Cast to date/duration; else error |
| -------      | -------- | -------- | --------------- | --------------------------------  |
| date-fns     | Date     | Date     | Error           |                                   |
| date-fns     | Date     | Duration | Date            |                                   |
| date-fns     | Duration | Date     | Date            |                                   |
| date-fns     | Duration | Duration | Duration        |                                   |
| date-fns     | Unitless | Unitless | Unitless        |                                   |
| date-fns     | \*       | \*       | Error           |                                   |
| -------      | -------- | -------- | --------------- | --------------------------------  |
| luxon        | Date     | Date     | Error           |                                   |
| luxon        | Date     | Duration | Date            |                                   |
| luxon        | Date     | Interval | Date            | Date + Duration(Interval)         |
| luxon        | Duration | Date     | Date            |                                   |
| luxon        | Duration | Duration | Duration        |                                   |
| luxon        | Duration | Interval | Interval        | Shifts interval by duration       |
| luxon        | Interval | Date     | Interval        | Interval extended to Date         |
| luxon        | Interval | Duration | Interval        | Shifts interval by duration       |
| luxon        | Interval | Interval | Interval        | Union of intervals                |
| luxon        | Unitless | Unitless | Unitless        |                                   |
| luxon        | \*       | \*       | Error           |                                   |
| -------      | -------- | -------- | --------------- | --------------------------------  |
| simple-luxon | Date     | Date     | Error           |                                   |
| simple-luxon | Date     | Duration | Date            |                                   |
| simple-luxon | Duration | Date     | Date            |                                   |
| simple-luxon | Duration | Duration | Duration        |                                   |
| simple-luxon | Unitless | Unitless | Unitless        |                                   |
| simple-luxon | \*       | \*       | Error           |                                   |
| -------      | -------- | -------- | --------------- | --------------------------------  |
| moment       | Date     | Date     | Error           |                                   |
| moment       | Date     | Duration | Date            |                                   |
| moment       | Duration | Date     | Date            |                                   |
| moment       | Duration | Duration | Duration        |                                   |
| moment       | Unitless | Unitless | Unitless        |                                   |
| moment       | \*       | \*       | Error           |                                   |

#### Subtract ("minus", "-")

TBD

#### Multiply ("\*")

TBD

#### Divide ("/")

TBD

### Other

Additionally `(` + `)` is permitted to group any expression and give its evaluation priority. Nesting is allowed. (Or expressed differently: `(...)` works as you would expect!)

**Example**
`( 1d - 5h ) * 2`

On top there is the keywords "now" (alias "today", both case-insensitive), which creates a Date-Time with the value of "now".

### Operator precedence

| Priority | Expression         | Example                            |
| -------- | ------------------ | ---------------------------------- |
| 1        | Interval           | 2009-12T12:34/20090519 143922+0600 |
| 2        | now, today         | now, now(), Today                  |
| 2        | Custom Constructor | {....}, [....], \~....\~           |
| 2        | Duration           | P1D                                |
| 2        | Date-Time          | 2019                               |
| 2        | Duration shorthand | 1 day                              |
| 3        | Unitless           | 1                                  |
| 4        | Brackets           | ( .... )                           |
| 5        | Multiply           | .. \* ..                           |
| 5        | Divide             | .. / ..                            |
| 6        | Plus               | .. + ..                            |
| 6        | Minus              | .. - ..                            |

This order insures that `2019/P1D` is an interval while `2019 / P1D` means "divide 2019 by P1D".
It also care to interpret `2019-08` as "August of 2019", while `2019 - 08` means "The date 2019 minus unitless 8".

## Bring your own lib

The date-calculator itself is not bound to any library. You can 'teach' it to work with any library by implementing 'bindings'. To create a new calculator type import the calculatorFactory (aka "parser") and call it with your bindings (see below).

```
import calculatorFactory from "./dateCalculator";

const yourCalculator = calculatorFactory({
    makeDate: ...,
    makeDuration: ...,
    makeInterval: ...,
    add: ...,
    subtract: ...,
    multiply: ...,
    minus: ...
});
```

You will need to implement the following methods:

### makeDate

You function to create a new date. It can take the following two signatures:

- `makeDate(date: Native_Date, { type: calculatorFactory.NATIVEDATE }) : YourDateType`
- `makeDate(date: any, { type: calculatorFactory.DATEXPRESION }) : YourDateType`, created by calculator`{any_string}`

### makeDuration

- `makeDuration({ milliseconds, seconds, minutes, hours, days, weekdays, weeks, months, years } : { milliseoncds: Number?, seconds: Number?, minutes: Number?, hours: Number?, days: Number?, weekdays: Number?, weeks: Number?, months: Number?, years: Number? }, { type: calculatorFactory.DURATIONOBJECT }) : YourDurationType`
- `makeDuration(duration: any, { type: calculatorFactory.DURATIONEXPRESSION }) : YourDurationType`, created by calculator`[any_string]`

### makeInterval

- `makeInterval([from: YourDateType, to: YourDateType], { type: calculatorFactory.INTERVALOBJECT }) : YourIntervalType`
- `makeInterval([from: YourDateType, to: YourDurationType], { type: calculatorFactory.INTERVALOBJECT }) : YourIntervalType`
- `makeInterval([from: YourDurationType, to: YourDateType], { type: calculatorFactory.INTERVALOBJECT }) : YourIntervalType`
- `makeInterval(interval: any, { type: calculatorFactory.DURATIONEXPRESSION }) : INTERVALEXPRESION`, created by calculator`~any_string~`

### add

`add(a, b) : c`, where `a, b, c` are `YourDateType | YourDurationType | YourIntervalType | { unitless: Number } | any`

**Examples**

- `now + 1 day` - `add(a: YourDateType, b: YourDurationType)`
- `now + 1` - `add(a: YourDateType, { unitless: 1 } : { unitless: Number })`
- `P3Y6M4DT12H30M5S + { 1 day }` - `add(a: YourDurationType, b: YourDurationType)`
- `2019-01-01/2019-01-02 + now` - `add(a: YourIntervalType, b: YourDateType)`
- `${new RegExp("foobar")} + ~hello world~` - `add(a: any, b: YourIntervalType)`
- `1d + 1h + 1m` - `add(add(a: YourDurationType, b: YourDurationType), x: YourDurationType)`

**Note**
You **should** throw (helpful) errors when you can't make sense of the arguments. For example adding up two duration makes sense - adding up two dates might not! The same applies for all the operations!

### subtract

`subtract(a, b) : c`, where `a, b, c` are `YourDateType | YourDurationType | YourIntervalType | { unitless: Number } | any`

### multiply

`multiply(a, b) : c`, where `a, b, c` are `YourDateType | YourDurationType | YourIntervalType | { unitless: Number } | any`

### minus

`minus(a, b) : c`, where `a, b, c` are `YourDateType | YourDurationType | YourIntervalType | { unitless: Number } | any`
