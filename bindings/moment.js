import m from "moment";

const isUnitless = a => {
  const keys = Object.keys(a);
  return keys.length === 1 && keys[0] === "unitless";
};

export const moment = (
  { NATIVEDATE, DATEXPRESION, DURATIONEXPRESSION, DURATIONOBJECT },
  { console }
) => {
  return {
    makeDuration: (duration, { type }) => {
      return {
        [DURATIONEXPRESSION]: a => {
          try {
            return m.duration(JSON.parse(a));
          } catch (e) {
            return m.duration(a);
          }
        },
        [DURATIONOBJECT]: o => m.duration(o)
      }[type](duration);
    },
    makeDate: (date, { type }) => {
      return {
        [DATEXPRESION]: a => {
          try {
            return m(JSON.parse(a));
          } catch (e) {
            return m(a);
          }
        },
        [NATIVEDATE]: a => m(a)
      }[type](date);
    },
    add: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless + b.unitless };
      }
      if (m.isDuration(a) && m.isDuration(b)) {
        return a.add(b);
      }
      if (m.isMoment(a) && a.isValid && m.isDuration(b)) {
        return a.add(b);
      }
      if (m.isMoment(b) && b.isValid && m.isDuration(a)) {
        return b.add(a);
      }
      const e = `Invalid arguments for 'add', expected (date, duration), (duration, date), (duration, duration) but found (${
        a.invalidExplanation ? `Invalid date ${a.invalidExplanation}` : typeof a
      }, ${
        b.invalidExplanation ? `Invalid date ${b.invalidExplanation}` : typeof b
      })`;
      console.error(e, a, b);
      throw new Error(e);
    },
    substract: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless - b.unitless };
      }
      if (m.isDuration(a) && m.isDuration(b)) {
        return a.subtract(b);
      }
      if (m.isMoment(a) && a.isValid && m.isDuration(b)) {
        // date - duration
        return a.subtract(b);
      }
      const e = `Invalid arguments for 'substract', expected (date, duration) or (duration, duration) but found (${
        a.invalidExplanation ? `Invalid date ${a.invalidExplanation}` : typeof a
      }, ${
        b.invalidExplanation ? `Invalid date ${b.invalidExplanation}` : typeof b
      })`;
      console.error(e, a, b);
      throw new Error(e);
    },
    multiply: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless * b.unitless };
      }
      if (m.isDuration(a) && isUnitless(b)) {
        return m.duration(a.as("milliseconds") * b.unitless);
      }
      if (m.isDuration(b) && isUnitless(a)) {
        return m.duration(b.as("milliseconds") * a.unitless);
      }
      const e = `Invalid arguments for multiply, expected (duration, unitless) or (unitless, duration) but found (${
        a.invalidExplanation ? `Invalid date ${a.invalidExplanation}` : typeof a
      }, ${
        b.invalidExplanation ? `Invalid date ${b.invalidExplanation}` : typeof b
      })`;
      console.error(e, a, b);
      throw new Error(e);
    },
    divide: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless / b.unitless };
      }
      if (m.isDuration(a) && isUnitless(b)) {
        return m.duration(a.as("milliseconds") / b.unitless);
      }
      const e = `Invalid arguments for divide, expected (duration, unitless) but found (${
        a.invalidExplanation ? `Invalid date ${a.invalidExplanation}` : typeof a
      }, ${
        b.invalidExplanation ? `Invalid date ${b.invalidExplanation}` : typeof b
      })`;
      console.error(e, a, b);
      throw new Error(e);
    }
  };
};
export default moment;
