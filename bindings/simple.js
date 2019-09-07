export const simple = ({
  NATIVEDATE,
  DATEXPRESION,
  DURATIONEXPRESSION,
  DURATIONOBJECT,
  INTERVALEXPRESION,
  INTERVALOBJECT
}) => {
  const tostring = {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function() {
      return JSON.stringify(this);
    }
  };
  function makeDuration(arg) {
    const match = isoRegex.exec(arg);
    if (match) {
      const sign = match[1] === "-" ? -1 : 1;
      const parseFloatInIso = mat => {
        const res = mat && parseFloat(mat.replace(",", "."));
        return (isNaN(res) ? 0 : res) * sign;
      };
      return Object.assign(Object.defineProperty({}, "toString", tostring), {
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
      return Object.assign(
        Object.defineProperty({}, "toString", tostring),
        JSON.parse(arg)
      );
    } catch (e) {
      throw new Error("Found invalid duration " + arg);
    }
  }
  function makeDate(arg) {
    return new Date(arg);
  }
  function isValidDate(date) {
    return date instanceof Date && !isNaN(date.valueOf());
  }
  const addMap = {
    date: () => {
      throw new Error("Cannot merge two dates");
    },
    unitless: (d, a) => d + a * 1,
    milliseconds: (d, a) => d - -a * 1,
    seconds: (d, a) => d - -a * 1000,
    minutes: (d, a) => d - -a * 1000 * 60,
    hours: (d, a) => d - -a * 1000 * 60 * 60,
    days: (d, a) => d - -a * 1000 * 60 * 60 * 24,
    weekdays: (d, a) => d - -a * 1000 * 60 * 60 * 24,
    weeks: (d, a) => d - -a * 1000 * 60 * 60 * 24 * 7,
    months: (d, a) => d - -a * 1000 * 60 * 60 * 24 * 30.436875,
    quarters: (d, a) => d - -a * 1000 * 60 * 60 * 24 * 91.310625,
    years: (d, a) => d - -a * 1000 * 60 * 60 * 24 * 365.2425
  };
  const subtractMap = {
    date: (a, b) => ({ milliseconds: a.getTime() - b.getTime() }),
    unitless: (d, a) => d - a * 1,
    milliseconds: (d, a) => d - a * 1,
    seconds: (d, a) => d - a * 1000,
    minutes: (d, a) => d - a * 1000 * 60,
    hours: (d, a) => d - a * 1000 * 60 * 60,
    days: (d, a) => d - a * 1000 * 60 * 60 * 24,
    weekdays: (d, a) => d - a * 1000 * 60 * 60 * 24,
    weeks: (d, a) => d - a * 1000 * 60 * 60 * 24 * 7,
    months: (d, a) => d - a * 1000 * 60 * 60 * 24 * 30.436875,
    quarters: (d, a) => d - a * 1000 * 60 * 60 * 24 * 91.310625,
    years: (d, a) => d - a * 1000 * 60 * 60 * 24 * 365.2425
  };
  function mergeOp(a, b, f, opMap) {
    if (isValidDate(a) && isValidDate(b)) {
      return opMap.date(a, b);
    }
    if (isValidDate(a)) {
      return new Date(
        Object.entries(b).reduce((d, [k, v]) => opMap[k](d, v), a)
      );
    }
    if (isValidDate(b)) {
      return new Date(
        Object.entries(a).reduce((d, [k, v]) => opMap[k](d, v), b)
      );
    }
    return Object.entries(a).reduce(
      (p, [k, v]) =>
        Object.assign(p, {
          [k]: f(v, b[k] || 0)
        }),
      b
    );
  }
  function isUnitless(a) {
    const keys = Object.keys(a);
    return keys.length === 1 && keys[0] === "unitless";
  }
  function mh(scalar, vector, op) {
    return Object.entries(vector).reduce(
      (p, [k, v]) =>
        Object.assign(p, {
          [k]: op(v, scalar)
        }),
      Object.defineProperty({}, "toString", tostring)
    );
  }
  function scalarMultiply(a, b) {
    if (isUnitless(a) || isUnitless(b)) {
      const m = (a, b) => a * b;
      return isUnitless(a) ? mh(a.unitless, b, m) : mh(b.unitless, a, m);
    }
    throw new Error("Can't multiply unitfull vectors with each other!");
  }
  function scalarDivide(a, b) {
    if (isUnitless(b)) {
      return mh(b.unitless, a, (a, b) => a / b);
    }
    throw new Error("Can't divide unitfull vectors with each other!");
  }
  const isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  const ident = i => i;
  return {
    makeDuration: (duration, { type }) => {
      return {
        [DURATIONEXPRESSION]: makeDuration,
        [DURATIONOBJECT]: a =>
          Object.defineProperty(Object.assign({}, a), "toString", tostring)
      }[type](duration);
    },
    makeDate: (date, { type }) => {
      return {
        [DATEXPRESION]: makeDate,
        [NATIVEDATE]: ident
      }[type](date);
    },
    makeInterval: (interval, { type }) => {
      return {
        [INTERVALEXPRESION]: text => {
          const tryDurationElseDate = i => {
            try {
              return makeDuration(i);
            } catch (e) {
              return makeDate(i);
            }
          };
          const [from, to] = text.split("/");
          return [tryDurationElseDate(from), tryDurationElseDate(to)];
        },
        [INTERVALOBJECT]: ident
      }[type](interval);
    },
    add: (a, b) => {
      return mergeOp(a, b, (a, b) => a + b, addMap);
    },
    subtract: (a, b) => {
      return mergeOp(a, b, (a, b) => a - b, subtractMap);
    },
    multiply: (a, b) => {
      return scalarMultiply(a, b);
    },
    divide: (a, b) => {
      return scalarDivide(a, b);
    }
  };
};
export default simple;
