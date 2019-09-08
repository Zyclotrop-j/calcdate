import { DateTime, Interval, Duration } from "luxon";

const isUnitless = a => {
  const keys = Object.keys(a);
  return keys.length === 1 && keys[0] === "unitless";
};

export const luxon = (
  {
    NATIVEDATE,
    DATEXPRESION,
    DURATIONEXPRESSION,
    DURATIONOBJECT,
    INTERVALEXPRESION,
    INTERVALOBJECT
  },
  { console }
) => {
  return {
    makeInterval: (interval, { type }) => {
      return {
        [INTERVALEXPRESION]: text => {
          return Interval.fromISO(text);
        },
        [INTERVALOBJECT]: ([from, to]) => {
          if (DateTime.isDateTime(from) && DateTime.isDateTime(from)) {
            return Interval.fromDateTimes(from, to);
          }
          if (DateTime.isDateTime(from) && Duration.isDuration(to)) {
            return Interval.after(from, to);
          }
          if (DateTime.isDateTime(to) && Duration.isDuration(from)) {
            return Interval.before(from, to);
          }
          const e = `Invalid arguments for 'makeInterval', expected (date, duration), (duration, date), (date, date) but found (${
            from.invalidExplanation
              ? `Invalid date ${from.invalidExplanation}`
              : typeof from
          }, ${
            to.invalidExplanation
              ? `Invalid date ${to.invalidExplanation}`
              : typeof to
          })`;
          console.error(e, from, to);
          throw new Error(e);
        }
      }[type](interval);
    },
    makeDuration: (duration, { type }) => {
      return {
        [DURATIONEXPRESSION]: a => {
          try {
            const maybedurationobject = JSON.parse(a);
            if (Array.isArray(maybedurationobject)) {
              return Duration.fromObject(
                maybedurationobject[0],
                Object.assign(
                  { conversionAccuracy: "longterm" },
                  maybedurationobject[1]
                )
              );
            } else if (typeof maybedurationobject === "string") {
              return Duration.fromISO(maybedurationobject, {
                conversionAccuracy: "longterm"
              });
            } else if (typeof maybedurationobject === "number") {
              return Duration.fromMillis(maybedurationobject, {
                conversionAccuracy: "longterm"
              });
            } else {
              return Duration.fromObject(maybedurationobject, {
                conversionAccuracy: "longterm"
              });
            }
          } catch (e) {
            return Duration.fromISO(a, { conversionAccuracy: "longterm" });
          }
        },
        [DURATIONOBJECT]: o =>
          Duration.fromObject(o, { conversionAccuracy: "longterm" })
      }[type](duration);
    },
    makeDate: (date, { type }) => {
      return {
        [DATEXPRESION]: a => {
          try {
            const maybedateobject = JSON.parse(a);
            if (Array.isArray(maybedateobject)) {
              if (
                typeof maybedateobject[0] === "string" &&
                typeof maybedateobject[1] === "string"
              ) {
                return DateTime.fromFormat(
                  maybedateobject[0],
                  maybedateobject[1]
                );
              }
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
      if (Interval.isInterval(a) && Interval.isInterval(b)) {
        return a.union(b);
      }
      if (Interval.isInterval(a) && Duration.isDuration(b)) {
        return a.mapEndpoints(ep => ep.plus(b));
      }
      if (Interval.isInterval(b) && Duration.isDuration(a)) {
        return b.mapEndpoints(ep => ep.plus(a));
      }
      if (Interval.isInterval(a) && DateTime.isDateTime(b)) {
        if (a.isAfter(b)) {
          return Interval.fromDateTimes(b, a.end);
        }
        if (a.isBefore(b)) {
          return Interval.fromDateTimes(a.start, b);
        }
        return b;
      }
      if (Interval.isInterval(b) && DateTime.isDateTime(a)) {
        return a.plus(b.toDuration());
      }
      if (Duration.isDuration(a) && Duration.isDuration(b)) {
        return a.plus(b);
      }
      if (DateTime.isDateTime(a) && DateTime.isDateTime(b)) {
        throw new Error("Can't add dates to each other!");
      }
      if (DateTime.isDateTime(a) && a.isValid && Duration.isDuration(b)) {
        // b is duratoin
        return a.plus(b);
      }
      if (DateTime.isDateTime(b) && b.isValid && Duration.isDuration(a)) {
        // a is duratoin
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
      if (Interval.isInterval(a) && Interval.isInterval(b)) {
        const inter = a.intersection(b);
        if (inter) return inter;
        return Interval.fromDateTimes(
          a.isBefore(b) ? a.end : b.end,
          a.isBefore(b) ? b.start : a.start
        );
      }
      if (Interval.isInterval(a) && Duration.isDuration(b)) {
        return Interval.fromDateTimes(a.start.minus(b), a.end.minus(b));
      }
      if (Interval.isInterval(b) && Duration.isDuration(a)) {
        return Interval.fromDateTimes(b.start.minus(a), b.end.minus(a));
      }
      if (Duration.isDuration(a) && Duration.isDuration(b)) {
        return a.minus(b);
      }
      if (Interval.isInterval(a) && DateTime.isDateTime(b)) {
        if (a.isBefore(b)) {
          return Interval.fromDateTimes(a.end, b);
        }
        if (a.isAfter(b)) {
          return Interval.fromDateTimes(b, a.start);
        }
        return Interval.fromDateTimes(a.start, b);
      }
      if (Interval.isInterval(b) && DateTime.isDateTime(a)) {
        return a.minus(b.toDuration());
      }
      if (
        DateTime.isDateTime(a) &&
        a.isValid &&
        DateTime.isDateTime(b) &&
        b.isValid
      ) {
        return Interval.fromDateTimes(a, b);
      }
      if (DateTime.isDateTime(a) && a.isValid && Duration.isDuration(b)) {
        // b is duratoin
        return a.minus(b);
      }
      if (DateTime.isDateTime(b) && b.isValid && Duration.isDuration(a)) {
        // a is duratoin
        return b.minus(a);
      }
      const e = `Invalid arguments for 'subtract', expected (date, duration), (duration, date), (duration, duration) but found (${
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
      if (Interval.isInterval(a) && isUnitless(b)) {
        const tmp = Object.entries(
          a
            .toDuration(
              [
                "years",
                "months",
                "days",
                "hours",
                "minutes",
                "seconds",
                "milliseconds"
              ],
              {
                conversionAccuracy: "longterm"
              }
            )
            .toObject()
        ).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: v * b.unitless
            }),
          {}
        );
        return Interval.fromDateTimes(a.start, a.end.plus(tmp));
      }
      if (Interval.isInterval(b) && isUnitless(a)) {
        const tmp = Object.entries(
          b
            .toDuration(
              [
                "years",
                "months",
                "days",
                "hours",
                "minutes",
                "seconds",
                "milliseconds"
              ],
              {
                conversionAccuracy: "longterm"
              }
            )
            .toObject()
        ).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: v * a.unitless
            }),
          {}
        );
        return Interval.fromDateTimes(b.start.minus(tmp), b.end);
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
      if (isUnitless(a) && a.unitless === 1 && Interval.isInterval(b)) {
        return Interval.fromDateTimes(b.end, b.start);
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
      if (Duration.isDuration(b) && isUnitless(a)) {
        const tmp = Object.entries(b.toObject()).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: a.unitless / v
            }),
          {}
        );
        return b.set(tmp);
      }
      if (Duration.isDuration(a) && Duration.isDuration(b)) {
        console.warn(`Dividing one duration by another is potentially unsafe!`);
        return { unitless: a.valueOf() / b.valueOf() };
      }
      if (
        DateTime.isDateTime(a) &&
        a.isValid &&
        DateTime.isDateTime(b) &&
        b.isValid
      ) {
        return Interval.fromDateTimes(a, b);
      }
      if (Interval.isInterval(a) && isUnitless(b)) {
        const tmp = Object.entries(
          a
            .toDuration(
              [
                "years",
                "months",
                "days",
                "hours",
                "minutes",
                "seconds",
                "milliseconds"
              ],
              {
                conversionAccuracy: "longterm"
              }
            )
            .toObject()
        ).reduce(
          (p, [k, v]) =>
            Object.assign(p, {
              [k]: v * (b.unitless / 2)
            }),
          {}
        );
        return Interval.fromDateTimes(a.start.plus(tmp), a.end.minus(tmp));
      }
      const e = `Invalid arguments for divide, expected (duration, unitless) or (unitless, duration) but found (${
        a.invalidExplanation ? `Invalid date ${a.invalidExplanation}` : typeof a
      }, ${
        b.invalidExplanation ? `Invalid date ${b.invalidExplanation}` : typeof b
      })`;
      console.error(e, a, b);
      throw new Error(e);
    }
  };
};
export default luxon;
