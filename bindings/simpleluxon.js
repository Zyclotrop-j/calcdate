import { DateTime, Duration } from "luxon";

const isUnitless = a => {
  const keys = Object.keys(a);
  return keys.length === 1 && keys[0] === "unitless";
};

export const simpleluxon = (
  { NATIVEDATE, DATEXPRESION, DURATIONEXPRESSION, DURATIONOBJECT },
  { console }
) => {
  return {
    makeDuration: (duration, { type }) => {
      return {
        [DURATIONEXPRESSION]: a => {
          try {
            const maybedurationobject = JSON.parse(a);
            if (Array.isArray(maybedurationobject)) {
              return Duration.fromObject(
                maybedurationobject[0],
                maybedurationobject[1]
              );
            } else if (typeof maybedurationobject === "string") {
              return Duration.fromISO(maybedurationobject);
            } else if (typeof maybedurationobject === "number") {
              return Duration.fromMillis(maybedurationobject);
            } else {
              return Duration.fromObject(maybedurationobject);
            }
          } catch (e) {
            return Duration.fromISO(a);
          }
        },
        [DURATIONOBJECT]: o => Duration.fromObject(o)
      }[type](duration);
    },
    makeDate: (date, { type }) => {
      return {
        [DATEXPRESION]: a => {
          try {
            const maybedateobject = JSON.parse(a);
            if (Array.isArray(maybedateobject)) {
              return DateTime.fromObject(
                maybedateobject[0],
                maybedateobject[1]
              );
            } else if (typeof maybedateobject === "string") {
              return DateTime.fromISO(maybedateobject);
            } else if (typeof maybedateobject === "number") {
              return DateTime.fromMillis(maybedateobject);
            } else {
              return DateTime.fromObject(maybedateobject);
            }
          } catch (e) {
            return DateTime.fromISO(a);
          }
        },
        [NATIVEDATE]: DateTime.fromJSDate
      }[type](date);
    },
    add: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless + b.unitless };
      }
      if (Duration.isDuration(a) && Duration.isDuration(b)) {
        return a.plus(b);
      }
      if (DateTime.isDateTime(a) && a.isValid && Duration.isDuration(b)) {
        return a.plus(b);
      }
      if (DateTime.isDateTime(b) && b.isValid && Duration.isDuration(a)) {
        return b.plus(a);
      }
      const e = `Invalid arguments for 'add', expected (date, duration), (duration, date), (duration, duration) but found (${
        a.invalidExplanation ? `Invalid date ${a.invalidExplanation}` : typeof a
      }, ${
        b.invalidExplanation ? `Invalid date ${b.invalidExplanation}` : typeof b
      })`;
      console.error(e, a, b);
      throw new Error(e);
    },
    subtract: (a, b) => {
      if (isUnitless(a) && isUnitless(b)) {
        return { unitless: a.unitless - b.unitless };
      }
      if (Duration.isDuration(a) && Duration.isDuration(b)) {
        return a.minus(b);
      }
      if (DateTime.isDateTime(a) && a.isValid && Duration.isDuration(b)) {
        // date - duration
        return a.minus(b);
      }
      const e = `Invalid arguments for 'subtract', expected (date, duration) or (duration, duration) but found (${
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
      if (Duration.isDuration(a) && isUnitless(b)) {
        const tmp = Object.entries(a.toObject()).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: v * b.unitless
            }),
          {}
        );
        return a.set(tmp);
      }
      if (Duration.isDuration(b) && isUnitless(a)) {
        const tmp = Object.entries(b.toObject()).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: v * a.unitless
            }),
          {}
        );
        return b.set(tmp);
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
      if (Duration.isDuration(a) && isUnitless(b)) {
        const tmp = Object.entries(a.toObject()).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: v / b.unitless
            }),
          {}
        );
        return a.set(tmp);
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
export default simpleluxon;
