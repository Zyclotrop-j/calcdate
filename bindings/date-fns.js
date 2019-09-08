import {
  parseISO,
  isValid,
  differenceInMilliseconds,
  isDate,
  toDate,
  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addBusinessDays,
  addDays,
  addWeeks,
  addMonths,
  addQuarters,
  addYears,
  subMilliseconds,
  subSeconds,
  subMinutes,
  subHours,
  subBusinessDays,
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears
} from "date-fns";

const divTable = {
  milliseconds: 1,
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  days: 1000 * 60 * 60 * 24,
  weekdays: 1000 * 60 * 60 * 24,
  weeks: 1000 * 60 * 60 * 24 * 7,
  months: 1000 * 60 * 60 * 24 * 30.436875,
  quarters: 1000 * 60 * 60 * 24 * 91.310625,
  years: 1000 * 60 * 60 * 24 * 365.2425
};
Object.fromEntries =
  Object.fromEntries ||
  (arr =>
    [...arr].reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {}));

const ops = Object.fromEntries(
  Object.entries({
    addMilliseconds,
    addSeconds,
    addMinutes,
    addHours,
    addWeekDays: addBusinessDays,
    addDays,
    addWeeks,
    addMonths,
    addQuarters,
    addYears,
    subMilliseconds,
    subSeconds,
    subMinutes,
    subHours,
    subWeekDays: subBusinessDays,
    subDays,
    subWeeks,
    subMonths,
    subQuarters,
    subYears,

    addUnitless: addMilliseconds,
    subUnitless: subMilliseconds
  }).map(([k, v]) => [k.toLowerCase(), v])
);

export const datefns = (
  { NATIVEDATE, DATEXPRESION, DURATIONEXPRESSION, DURATIONOBJECT },
  { console }
) => {
  const tostring = {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function() {
      return JSON.stringify(this);
    }
  };
  const isDurationConfig = {
    configurable: false,
    enumerable: false,
    writable: false,
    value: true
  };
  const isDurationSymbol = Symbol("isDuration");
  const newDuration = () =>
    Object.defineProperty(
      Object.defineProperty({}, isDurationSymbol, isDurationConfig),
      "toString",
      tostring
    );
  const isDuration = x => x[isDurationSymbol] === true;
  function makeDuration(arg) {
    const isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    const match = isoRegex.exec(arg);
    if (match) {
      const sign = match[1] === "-" ? -1 : 1;
      const parseFloatInIso = mat => {
        const res = mat && parseFloat(mat.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign;
      };
      return Object.assign(newDuration(), {
        years: parseFloatInIso(match[2]),
        months: parseFloatInIso(match[3]),
        weeks: parseFloatInIso(match[4]),
        days: parseFloatInIso(match[5]),
        hours: parseFloatInIso(match[6]),
        minutes: parseFloatInIso(match[7]),
        seconds: parseFloatInIso(match[8])
      });
    }
    try {
      return Object.assign(newDuration(), JSON.parse(arg));
    } catch (e) {
      throw new Error("Found invalid duration " + arg);
    }
  }

  const getType = arg => {
    if (isValid(arg)) return "DATE";
    if (isDuration(arg)) return "DURATION";
    if (isDate(toDate(arg)) && !isValid(arg)) return "INVALID DATE";
    return typeof arg;
  };
  const isUnitless = a => {
    const keys = Object.keys(a);
    return keys.length === 1 && keys[0] === "unitless";
  };

  return {
    makeDuration: (duration, { type }) => {
      return {
        [DURATIONEXPRESSION]: makeDuration,
        [DURATIONOBJECT]: a => Object.assign(newDuration(), a)
      }[type](duration);
    },
    makeDate: (date, { type }) => {
      return {
        [DATEXPRESION]: parseISO,
        [NATIVEDATE]: d => d
      }[type](date);
    },
    add: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless + b.unitless };
      }
      if (isDuration(a) && isDuration(b)) {
        return Object.entries(a).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: (p[k] || 0) + v
            }),
          b
        );
      }
      if (isValid(a) && isValid(b)) {
        throw new Error("Can't add dates to each other!");
      }
      if (isValid(a) && isDuration(b)) {
        // b is duratoin
        return Object.entries(b).reduce(
          (date, [k, v]) => ops[`add${k}`](date, v),
          a
        );
      }
      if (isValid(b) && isDuration(a)) {
        // a is duratoin
        return Object.entries(a).reduce(
          (date, [k, v]) => ops[`add${k}`](date, v),
          b
        );
      }
      const e = `Invalid arguments for 'add', expected (date, duration), (duration, date), (duration, duration) but found (${getType(
        a
      )}, ${getType(b)})`;
      console.error(e, a, b);
      throw new Error(e);
    },
    subtract: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless - b.unitless };
      }
      if (isDuration(a) && isDuration(b)) {
        return Object.entries(a).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: (p[k] || 0) - v
            }),
          b
        );
      }
      if (isValid(a) && isValid(b)) {
        console.warn(
          "subtracting two dates from each other is potentially unsafe as a loss of information occurs!"
        );
        return Object.assign(newDuration(), {
          milliseconds: differenceInMilliseconds(a, b)
        });
      }
      if (isValid(a) && isDuration(b)) {
        // b is duratoin
        return Object.entries(b).reduce(
          (date, [k, v]) => ops[`sub${k}`](date, v),
          a
        );
      }
      if (isValid(b) && isDuration(a)) {
        // a is duratoin
        return Object.entries(a).reduce(
          (date, [k, v]) => ops[`sub${k}`](date, v),
          b
        );
      }
      const e = `Invalid arguments for 'subtract', expected (date, duration), (duration, date), (duration, duration) but found (${getType(
        a
      )}, ${getType(b)})`;
      console.error(e, a, b);
      throw new Error(e);
    },
    multiply: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless * b.unitless };
      }
      if (isDuration(a) && isUnitless(b)) {
        return Object.entries(a).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: v * b.unitless
            }),
          newDuration()
        );
      }
      if (isDuration(b) && isUnitless(a)) {
        return Object.entries(b).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: v * a.unitless
            }),
          newDuration()
        );
      }
      const e = `Invalid arguments for multiply, expected (duration, unitless) or (unitless, duration) but found (${getType(
        a
      )}, ${getType(b)})`;
      console.error(e, a, b);
      throw new Error(e);
    },
    divide: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless / b.unitless };
      }
      if (isDuration(a) && isUnitless(b)) {
        return Object.entries(a).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: v / b.unitless
            }),
          newDuration()
        );
      }
      if (isDuration(b) && isUnitless(a)) {
        return Object.entries(b).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: a.unitless / v
            }),
          newDuration()
        );
      }
      if (isDuration(a) && isDuration(b)) {
        console.warn(
          `Dividing one duration by another is potentially unsafe! Assuming conversion table ${JSON.stringify(
            divTable,
            null,
            "  "
          )}!`
        );
        const bInMs = Object.entries(b).reduce(
          (p, [k, v]) => p + divTable[k] * v,
          0
        );
        const aInMs = Object.entries(a).reduce(
          (p, [k, v]) => p + divTable[k] * v,
          0
        );
        return { unitless: aInMs / bInMs };
      }
      const e = `Invalid arguments for divide, expected (duration, unitless) or (unitless, duration) but found (${getType(
        a
      )}, ${getType(b)})`;
      console.error(e, a, b);
      throw new Error(e);
    }
  };
};
export default datefns;
