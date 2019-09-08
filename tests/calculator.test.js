import parser from "../dateCalculator";
import { test as testbinding } from "../bindings/testbindings";

const it = test;

describe("Timezones", () => {
  it("should always be UTC", () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});

it("Instanciation works", () => {
  expect(testbinding({}, {})).toEqual({});
  expect(parser(testbinding(parser, {}))).toBeInstanceOf(Function);
});

describe("Parsing without a binding", () => {
  const RealDate = Date;
  let calculator;
  const operations = {};

  beforeAll(() => {
    const DATE_TO_USE = new Date();
    global.Date = jest.fn((str, ...args) => {
      if (!str) return DATE_TO_USE;
      return new RealDate(str, ...args);
    });
    global.Date.UTC = RealDate.UTC;
    global.Date.parse = RealDate.parse;
    global.Date.now = RealDate.now;
  });
  beforeEach(() => {
    operations.makeInterval = jest.fn(interval => ({ interval }));
    operations.makeDuration = jest.fn(duration => ({ duration }));
    operations.makeDate = jest.fn(date => ({ date }));
    operations.add = jest.fn((a, b) => ({ add: [a, b] }));
    operations.subtract = jest.fn((a, b) => ({ subtract: [a, b] }));
    operations.multiply = jest.fn((a, b) => ({ multiply: [a, b] }));
    operations.divide = jest.fn((a, b) => ({ divide: [a, b] }));
    calculator = parser(testbinding(parser, operations));
    /*
    const xcalc = parser(testbinding(parser, operations));
    calculator = (a, ...args) => {
      try {
        return xcalc(a, ...args);
      } catch (e) {
        console.error(
          `Failed on ${args.map((i, idx) => `${a[idx]}${i}`).join("")}${
            args[args.length - 1]
          }`
        );
        throw e;
      }
    };
    */
  });
  afterEach(() => {
    calculator = null;
  });
  afterAll(() => {
    global.Date = RealDate;
  });

  it(" returns new date for 'now'", () => {
    expect(calculator`now`).toEqual({ date: new Date() });
    expect(calculator("now")).toEqual({ date: new Date() });
  });

  it(" returns string-interpolations literally", () => {
    expect(calculator`${"now"}`).toEqual({ date: new Date() });
  });

  it(" returns other interpolations as-is", () => {
    expect(calculator`${["Hello World"]}`).toEqual(["Hello World"]);
  });

  it(" throw when invalid input is supplied", () => {
    expect(() => calculator``).toThrow();
    expect(() => calculator`Hello World`).toThrow();
    expect(() => calculator()).toThrow();
    expect(() => calculator("Hello World")).toThrow();
  });

  it(" parses unitless numbers", () => {
    expect(calculator`1`).toEqual({ unitless: 1 });
    expect(calculator`1u`).toEqual({ unitless: 1 });
  });

  const durationIdentifiers = {
    millisecond: ["ms"],
    second: ["s", "S", "ss", "SS", "sec", "SEC"],
    minute: ["min", "tm", "mm", "MIN", "TM"],
    hour: ["h", "H"],
    day: ["d", "D"],
    weekday: ["wd", "WD"],
    week: ["w", "W"],
    month: ["M", "MM", "l", "L"],
    quarter: ["q", "Q"],
    year: ["y", "a", "Y", "A"]
  };

  describe("Singular long-form duration identifiers", () => {
    Object.keys(durationIdentifiers).forEach(key => {
      ["", " ", "\n", "\r", "\t", " \n\r\t"].forEach(whitespace => {
        const whitespaceDescription = whitespace
          .split("")
          .map(
            i =>
              ({
                " ": "_",
                "\t": "\\t",
                "\n": "\\n",
                "\r": "\\r"
              }[i])
          )
          .join("");
        it(` parses "${key}" with whitespace "${whitespaceDescription}" correctly`, () => {
          expect(calculator`1${whitespace}${key}`).toEqual({
            duration: {
              [`${key}s`]: 1
            }
          });
          expect(calculator`0${whitespace}${key}`).toEqual({
            duration: {
              [`${key}s`]: 0
            }
          });
          expect(calculator`2${whitespace}${key}`).toEqual({
            duration: {
              [`${key}s`]: 2
            }
          });
          expect(calculator`10000${whitespace}${key}`).toEqual({
            duration: {
              [`${key}s`]: 10000
            }
          });

          expect(() => calculator`-1${whitespace}${key}`).toThrow();
          expect(() => calculator`n${whitespace}${key}`).toThrow();
        });
      });
    });
  });

  describe("Plural long-form duration identifiers", () => {
    Object.keys(durationIdentifiers).forEach(key => {
      ["", " ", "  ", "\t", "\t\t", "\t \t ", "\n", " \n \t"].forEach(
        whitespace => {
          const whitespaceDescription = whitespace
            .split("")
            .map(
              i =>
                ({
                  " ": "_",
                  "\t": "\\t",
                  "\n": "\\n"
                }[i])
            )
            .join("");
          it(` parses "${key}" with whitespace "${whitespaceDescription}" correctly`, () => {
            expect(calculator`1${whitespace}${key}s`).toEqual({
              duration: {
                [`${key}s`]: 1
              }
            });
            expect(calculator`0${whitespace}${key}s`).toEqual({
              duration: {
                [`${key}s`]: 0
              }
            });
            expect(calculator`2${whitespace}${key}s`).toEqual({
              duration: {
                [`${key}s`]: 2
              }
            });
            expect(calculator`10000${whitespace}${key}s`).toEqual({
              duration: {
                [`${key}s`]: 10000
              }
            });

            expect(() => calculator`-1${whitespace}${key}s`).toThrow();
            expect(() => calculator`n${whitespace}${key}s`).toThrow();
          });
        }
      );
    });
  });

  describe("Singular short-form duration identifiers", () => {
    Object.entries(durationIdentifiers).forEach(([ident, keys]) => {
      ["", " ", "  ", "\t", "\t\t", "\t \t ", "\n", " \n \t"].forEach(
        whitespace => {
          const whitespaceDescription = whitespace
            .split("")
            .map(
              i =>
                ({
                  " ": "_",
                  "\t": "\\t",
                  "\n": "\\n"
                }[i])
            )
            .join("");
          keys.forEach(key => {
            it(` parses "${key}" (${ident}) with whitespace "${whitespaceDescription}" correctly`, () => {
              expect(calculator`1${whitespace}${key}`).toEqual({
                duration: {
                  [`${ident}s`]: 1
                }
              });
              expect(calculator`0${whitespace}${key}`).toEqual({
                duration: {
                  [`${ident}s`]: 0
                }
              });
              expect(calculator`2${whitespace}${key}`).toEqual({
                duration: {
                  [`${ident}s`]: 2
                }
              });
              expect(calculator`10000${whitespace}${key}`).toEqual({
                duration: {
                  [`${ident}s`]: 10000
                }
              });

              expect(() => calculator`-1${whitespace}${key}`).toThrow();
              expect(() => calculator`n${whitespace}${key}`).toThrow();
            });
          });
        }
      );
    });
  });

  describe("Recognizes '+'", () => {
    const cop = "add";
    it(" calls binding callbacks for two operands", () => {
      const mockCallback = operations[cop];
      const duration = operations.makeDuration;
      const result = calculator`1d + 1d`;
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(duration.mock.calls.length).toBe(2);
      expect(duration.mock.calls[0][0]).toEqual({ days: 1 });
      expect(duration.mock.calls[0][1]).toEqual({
        type: parser.DURATIONOBJECT
      });
      expect(duration.mock.calls[1][0]).toEqual({ days: 1 });
      expect(duration.mock.calls[1][1]).toEqual({
        type: parser.DURATIONOBJECT
      });
      expect(mockCallback.mock.calls[0][0]).toBe(
        duration.mock.results[0].value
      );
      expect(mockCallback.mock.calls[0][1]).toBe(
        duration.mock.results[1].value
      );
      expect(result).toEqual({
        [cop]: [duration.mock.results[0].value, duration.mock.results[1].value]
      });
    });
    it(" calls binding callbacks for many operands", () => {
      const mockCallback = operations[cop];
      const duration = operations.makeDuration;
      const result = calculator`1min + 1s + 1d + 1h`;
      expect(mockCallback.mock.calls.length).toBe(3);
      expect(duration.mock.calls.length).toBe(4);
      // Left-to-right evaluation
      expect(mockCallback.mock.calls[0][0]).toBe(
        duration.mock.results[0].value
      );
      expect(mockCallback.mock.calls[0][1]).toBe(
        duration.mock.results[1].value
      );
      expect(mockCallback.mock.calls[1][0]).toBe(
        mockCallback.mock.results[0].value
      );
      expect(mockCallback.mock.calls[1][1]).toBe(
        duration.mock.results[2].value
      );
      expect(mockCallback.mock.calls[2][0]).toBe(
        mockCallback.mock.results[1].value
      );
      expect(mockCallback.mock.calls[2][1]).toBe(
        duration.mock.results[3].value
      );
      expect(result).toEqual({
        [cop]: [
          mockCallback.mock.results[1].value,
          duration.mock.results[3].value
        ]
      });
    });
  });

  describe("Recognizes '-'", () => {
    const cop = "subtract";
    it(" calls binding callbacks for two operands", () => {
      const mockCallback = operations[cop];
      const duration = operations.makeDuration;
      const result = calculator`1d - 1d`;
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(duration.mock.calls.length).toBe(2);
      expect(duration.mock.calls[0][0]).toEqual({ days: 1 });
      expect(duration.mock.calls[0][1]).toEqual({
        type: parser.DURATIONOBJECT
      });
      expect(duration.mock.calls[1][0]).toEqual({ days: 1 });
      expect(duration.mock.calls[1][1]).toEqual({
        type: parser.DURATIONOBJECT
      });
      expect(mockCallback.mock.calls[0][0]).toBe(
        duration.mock.results[0].value
      );
      expect(mockCallback.mock.calls[0][1]).toBe(
        duration.mock.results[1].value
      );
      expect(result).toEqual({
        [cop]: [duration.mock.results[0].value, duration.mock.results[1].value]
      });
    });
    it(" calls binding callbacks for many operands", () => {
      const mockCallback = operations[cop];
      const duration = operations.makeDuration;
      const result = calculator`1min - 1s - 1d - 1h`;
      expect(mockCallback.mock.calls.length).toBe(3);
      expect(duration.mock.calls.length).toBe(4);
      // Left-to-right evaluation
      expect(mockCallback.mock.calls[0][0]).toBe(
        duration.mock.results[0].value
      );
      expect(mockCallback.mock.calls[0][1]).toBe(
        duration.mock.results[1].value
      );
      expect(mockCallback.mock.calls[1][0]).toBe(
        mockCallback.mock.results[0].value
      );
      expect(mockCallback.mock.calls[1][1]).toBe(
        duration.mock.results[2].value
      );
      expect(mockCallback.mock.calls[2][0]).toBe(
        mockCallback.mock.results[1].value
      );
      expect(mockCallback.mock.calls[2][1]).toBe(
        duration.mock.results[3].value
      );
      expect(result).toEqual({
        [cop]: [
          mockCallback.mock.results[1].value,
          duration.mock.results[3].value
        ]
      });
    });
  });

  describe("Recognizes '*'", () => {
    const cop = "multiply";
    it(" calls binding callbacks for two operands", () => {
      const mockCallback = operations[cop];
      const duration = operations.makeDuration;
      const result = calculator`1d * 1d`;
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(duration.mock.calls.length).toBe(2);
      expect(duration.mock.calls[0][0]).toEqual({ days: 1 });
      expect(duration.mock.calls[0][1]).toEqual({
        type: parser.DURATIONOBJECT
      });
      expect(duration.mock.calls[1][0]).toEqual({ days: 1 });
      expect(duration.mock.calls[1][1]).toEqual({
        type: parser.DURATIONOBJECT
      });
      expect(mockCallback.mock.calls[0][0]).toBe(
        duration.mock.results[0].value
      );
      expect(mockCallback.mock.calls[0][1]).toBe(
        duration.mock.results[1].value
      );
      expect(result).toEqual({
        [cop]: [duration.mock.results[0].value, duration.mock.results[1].value]
      });
    });
    it(" calls binding callbacks for many operands", () => {
      const mockCallback = operations[cop];
      const duration = operations.makeDuration;
      const result = calculator`1min * 1s * 1d * 1h`;
      expect(mockCallback.mock.calls.length).toBe(3);
      expect(duration.mock.calls.length).toBe(4);
      // Left-to-right evaluation
      expect(mockCallback.mock.calls[0][0]).toBe(
        duration.mock.results[0].value
      );
      expect(mockCallback.mock.calls[0][1]).toBe(
        duration.mock.results[1].value
      );
      expect(mockCallback.mock.calls[1][0]).toBe(
        mockCallback.mock.results[0].value
      );
      expect(mockCallback.mock.calls[1][1]).toBe(
        duration.mock.results[2].value
      );
      expect(mockCallback.mock.calls[2][0]).toBe(
        mockCallback.mock.results[1].value
      );
      expect(mockCallback.mock.calls[2][1]).toBe(
        duration.mock.results[3].value
      );
      expect(result).toEqual({
        [cop]: [
          mockCallback.mock.results[1].value,
          duration.mock.results[3].value
        ]
      });
    });
  });

  describe("Recognizes '/'", () => {
    const cop = "divide";
    it(" calls binding callbacks for two operands", () => {
      const mockCallback = operations[cop];
      const duration = operations.makeDuration;
      const result = calculator`1d / 1d`;
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(duration.mock.calls.length).toBe(2);
      expect(duration.mock.calls[0][0]).toEqual({ days: 1 });
      expect(duration.mock.calls[0][1]).toEqual({
        type: parser.DURATIONOBJECT
      });
      expect(duration.mock.calls[1][0]).toEqual({ days: 1 });
      expect(duration.mock.calls[1][1]).toEqual({
        type: parser.DURATIONOBJECT
      });
      expect(mockCallback.mock.calls[0][0]).toBe(
        duration.mock.results[0].value
      );
      expect(mockCallback.mock.calls[0][1]).toBe(
        duration.mock.results[1].value
      );
      expect(result).toEqual({
        [cop]: [duration.mock.results[0].value, duration.mock.results[1].value]
      });
    });
    it(" calls binding callbacks for many operands", () => {
      const mockCallback = operations[cop];
      const duration = operations.makeDuration;
      const result = calculator`1min / 1s / 1d / 1h`;
      expect(mockCallback.mock.calls.length).toBe(3);
      expect(duration.mock.calls.length).toBe(4);
      // Left-to-right evaluation
      expect(mockCallback.mock.calls[0][0]).toBe(
        duration.mock.results[0].value
      );
      expect(mockCallback.mock.calls[0][1]).toBe(
        duration.mock.results[1].value
      );
      expect(mockCallback.mock.calls[1][0]).toBe(
        mockCallback.mock.results[0].value
      );
      expect(mockCallback.mock.calls[1][1]).toBe(
        duration.mock.results[2].value
      );
      expect(mockCallback.mock.calls[2][0]).toBe(
        mockCallback.mock.results[1].value
      );
      expect(mockCallback.mock.calls[2][1]).toBe(
        duration.mock.results[3].value
      );
      expect(result).toEqual({
        [cop]: [
          mockCallback.mock.results[1].value,
          duration.mock.results[3].value
        ]
      });
    });
  });

  describe("Recognizes '()'", () => {
    const cop = "add";
    it(" calls binding callbacks for two operands", () => {
      const mockCallback = operations[cop];
      const duration = operations.makeDuration;
      const result = calculator`1s + (1min + 1d)`;
      expect(mockCallback.mock.calls.length).toBe(2);
      expect(duration.mock.calls.length).toBe(3);
      // right first, then left-to-right
      expect(mockCallback.mock.calls[0][0]).toBe(
        duration.mock.results[1].value
      );
      expect(mockCallback.mock.calls[0][1]).toBe(
        duration.mock.results[2].value
      );
      expect(mockCallback.mock.calls[1][0]).toBe(
        duration.mock.results[0].value
      );
      expect(mockCallback.mock.calls[1][1]).toBe(
        mockCallback.mock.results[0].value
      );
      expect(result).toEqual({
        add: [
          duration.mock.results[0].value,
          mockCallback.mock.results[0].value
        ]
      });
    });
    it(" applys '*' and '/' before '+' and '-'", () => {
      const result1 = calculator`1s + 1min * 1d`;
      expect(result1).toEqual({
        add: [
          operations.makeDuration.mock.results[0].value,
          operations.multiply.mock.results[0].value
        ]
      });
      const result2 = calculator`1s - 1min / 1d`;
      expect(result2).toEqual({
        subtract: [
          operations.makeDuration.mock.results[0].value,
          operations.divide.mock.results[0].value
        ]
      });
    });
    it(" applys '()' first", () => {
      const result1 = calculator`(1s + 1min) * 1d`;
      expect(result1).toEqual({
        multiply: [
          operations.add.mock.results[0].value,
          operations.makeDuration.mock.results[2].value
        ]
      });
      const result2 = calculator`(1s - 1min) / 1d`;
      expect(result2).toEqual({
        divide: [
          operations.subtract.mock.results[0].value,
          operations.makeDuration.mock.results[2].value
        ]
      });
    });
  });

  describe("Parses iso-dates", () => {
    const extended = [
      "2009-12T12:34",
      "2009",
      "2009-05-19",
      " 2009-05-19 ",
      "2009-05",
      "2009-001",
      "2009-05-19",
      "2009-05-19T00:00",
      "2009-05-19T14:31",
      "2009-05-19T14:39:22",
      "2009-05-19T14:39Z",
      "2009-05-19T14:39:22-06:00",
      "2009-05-19T14:39:22+0600",
      "2007-04-06T00:00"
    ];
    const iso = [
      "200912T1234",
      "2009",
      "20090519",
      " 20090519 ",
      "200905",
      "2009001",
      "20090519",
      "20090519 0000",
      "20090519 1431",
      "20090519 143922",
      "20090519 1439Z",
      "20090519 143922-06:00",
      "20090519 143922+0600",
      "20070406 0000"
    ];
    extended.forEach(i =>
      it(` parse "${i}" successfully`, () => {
        const result = calculator`${i}`;
        expect(result).toBeDefined();
        expect(`${i} = ${result.date}`).toMatchSnapshot();
      })
    );
    iso.forEach((i, idx) =>
      it(` parse "${i}" successfully`, () => {
        const result = calculator`${i}`;
        expect(result).toBeDefined();
        expect(`${i} = ${result.date}`).toMatchSnapshot();
      })
    );

    const invalidisos = [
      "200913",
      "2009367",
      "2009-",
      "20070405T24:50",
      // "2009-000", // subtract operation!! -> valid input
      "2009-M511",
      "2009M511",
      "2009-05-19T14a39r",
      "2009-05-1914:39",
      "2009-05-19 14:",
      "2009-05-19r14:39",
      "2009-05-19 14a39a22",
      "2009-05-19 14:39:22+06a00",
      "2009-05-19 146922.500",
      "2010-02-18T16.5:23.35:48",
      "2010-02-18T16:23.35:48",
      "2010-02-18T16:23.35:48.45",
      "2009-05-19 14.5.44",
      "2010-02-18T16:23.33.600",
      "2010-02-18T16,25:23:48,444"
    ];
    invalidisos.forEach((i, idx) =>
      it(` throws on "${i}"`, () => {
        const result = () => calculator`${i}`;
        expect(result).toThrow();
      })
    );
  });

  describe("Parses iso-durations", () => {
    const durations = [
      "P1Y2M3DT4H05M600S", // 1 year, 2 months, 3 days, 4 hours, 5 minutes, 600 seconds
      "PT3H5M", // 3 hours, 5 minus
      "P1Y", // 1 year
      "P-1Y1M", // -1 year, 1 month -> effectively 11 month
      "P1DT-30S", // 1 day, -30 seconds

      "P1Y",
      "P2M",
      "P3D",
      "PT4H",
      "PT05M",
      "PT600S",
      "P1y2m3dT4h5m6s",

      "P00021015T103020",
      "P00021015",
      "P0002-10-15T10:30:20",
      "P0002-10-15",
      "+P00021015T103020",
      "+P00021015",
      "+P0002-10-15T10:30:20",
      "+P0002-10-15",
      "-P00021015T103020",
      "-P00021015",
      "-P0002-10-15T10:30:20",
      "-P0002-10-15",
      "P+00021015T103020",
      "P0002-1015",
      "P0002--10-15T10:+30:20",
      "P0002-10--15",
      "-P0002-10--15"
    ];
    durations.forEach(i =>
      it(` parse "${i}" successfully`, () => {
        const result = calculator`${i}`;
        expect(result).toBeDefined();
        expect(`${i} = ${JSON.stringify(result.duration)}`).toMatchSnapshot();
      })
    );
  });

  describe("Parses iso-intervals", () => {
    const durations = [
      "P1Y2M3DT4H05M600S", // 1 year, 2 months, 3 days, 4 hours, 5 minutes, 600 seconds
      "PT3H5M", // 3 hours, 5 minus
      "P1Y", // 1 year
      "P-1Y1M", // -1 year, 1 month -> effectively 11 month
      "P1DT-30S", // 1 day, -30 seconds
      "P1Y",
      "P2M",
      "P3D",
      "PT4H",
      "PT05M",
      "PT600S",
      "P1y2m3dT4h5m6s",
      "P00021015T103020",
      "P00021015",
      "P0002-10-15T10:30:20",
      "P0002-10-15",
      "+P00021015T103020",
      "+P00021015",
      "+P0002-10-15T10:30:20",
      "+P0002-10-15",
      "-P00021015T103020",
      "-P00021015",
      "-P0002-10-15T10:30:20",
      "-P0002-10-15",
      "P+00021015T103020",
      "P0002-1015",
      "P0002--10-15T10:+30:20",
      "P0002-10--15",
      "-P0002-10--15"
    ];
    const dates = [
      "2009-12T12:34",
      "2009",
      "2009-05-19",
      " 2009-05-19 ",
      "2009-05",
      "2009-001",
      "2009-05-19",
      "2009-05-19T00:00",
      "2009-05-19T14:31",
      "2009-05-19T14:39:22",
      "2009-05-19T14:39Z",
      "2009-05-19T14:39:22-06:00",
      "2009-05-19T14:39:22+0600",
      "2007-04-06T00:00",
      "200912T1234",
      "2009",
      "20090519",
      " 20090519 ",
      "200905",
      "2009001",
      "20090519",
      "20090519 0000",
      "20090519 1431",
      "20090519 143922",
      "20090519 1439Z",
      "20090519 143922-06:00",
      "20090519 143922+0600",
      "20070406 0000"
    ];
    // durations
    // dates
    dates.forEach(a => {
      it(` parse "${a}/date" successfully`, () => {
        dates.forEach(b => {
          if (a === b) return;
          const result = calculator`${a}/${b}`;
          expect(result).toBeDefined();
          expect(
            `${a}/${b} = ${JSON.stringify(result.duration)}`
          ).toMatchSnapshot();
        });
      });
    });
    durations.forEach(duration => {
      it(` parse "date/${duration}" and "${duration}/date"  successfully`, () => {
        dates.forEach(date => {
          const result = calculator`${date}/${duration}`;
          expect(result).toBeDefined();
          expect(
            `${date}/${duration} = ${JSON.stringify(result.duration)}`
          ).toMatchSnapshot();
          const result2 = calculator`${duration}/${date}`;
          expect(result2).toBeDefined();
          expect(
            `${duration}/${date} = ${JSON.stringify(result2.interval)}`
          ).toMatchSnapshot();
        });
      });
    });
  });

  describe("can handle 'unitless' numbers", () => {
    it("Can parse unitless", () => {
      expect(calculator`1`).toEqual({ unitless: 1 });
      expect(calculator`2`).toEqual({ unitless: 2 });
      expect(calculator`0`).toEqual({ unitless: 0 });
      expect(calculator`5`).toEqual({ unitless: 5 });
      expect(calculator`100`).toEqual({ unitless: 100 });
      expect(calculator`-1`).toEqual({ unitless: -1 });
      expect(calculator`-0`).toEqual({ unitless: -0 });
      expect(calculator`-100`).toEqual({ unitless: -100 });
      expect(calculator`01`).toEqual({ unitless: 1 });
      expect(calculator`-01`).toEqual({ unitless: -1 });
      expect(calculator`1`).toEqual({ unitless: 1 });
      expect(calculator`0`).toEqual({ unitless: 0 });
      expect(calculator`100`).toEqual({ unitless: 100 });
      // expect(calculator`70000`).toEqual({ unitless: 70000 });
      expect(calculator`-10`).toEqual({ unitless: -10 });
      expect(calculator`-5`).toEqual({ unitless: -5 });
      expect(calculator`0`).toEqual({ unitless: 0 });
      // expect(calculator`00001`).toEqual({ unitless: 1 });
      // expect(calculator`00123901`).toEqual({ unitless: 123901 });
      expect(calculator`-09`).toEqual({ unitless: -9 });
      expect(calculator`2.5`).toEqual({ unitless: 2.5 });
      expect(calculator`-2.5`).toEqual({ unitless: -2.5 });
      expect(calculator`1.0`).toEqual({ unitless: 1 });
      expect(calculator`-1.0`).toEqual({ unitless: -1 });
      expect(calculator`06.6`).toEqual({ unitless: 6.6 });
      expect(calculator`-006.089`).toEqual({ unitless: -6.089 });
    });
  });

  describe("Parses dates, durations and intervals in all combinations and operations", () => {
    const typemix = [
      "P20080915T155300",
      "-P20080915T155300",
      "P2008-09-15T15:53:00",
      "-P2008-09-15T15:53:00",
      "P2y10m14dT20h13m45s",
      "-P2y10m14dT20h13m45s",
      "P6w",
      "20080915T155300/20101113T000000",
      "P2y10M14dT20h13m45s/20080915T155300",
      "20080915T155300/P2y10M14dT20h13m45s",
      "2008-09-15T15:53:00/2010-11-13T00:00:00",
      "P2y10M14dT20h13m45s/2008-09-15T15:53:00",
      "2008-09-15T15:53:00/P2y10M14dT20h13m45s",
      "20080915T155300",
      "2008-09-15T15:53:00+04:30"
    ];
    typemix.forEach(t1 => {
      it(` parses ${t1}`, () => {
        expect(calculator(t1)).toBeDefined();
        typemix.forEach(t2 => {
          expect(calculator(`${t1} + ${t2}`)).toBeDefined();
          expect(calculator(`${t1} - ${t2}`)).toBeDefined();
          expect(calculator(`${t1} * ${t2}`)).toBeDefined();
          expect(calculator(`${t1} / ${t2}`)).toBeDefined();

          expect(calculator(`${t2} / (${t1} + ${t2})`)).toBeDefined();
          expect(calculator(`${t2} * (${t1} - ${t2})`)).toBeDefined();
          expect(calculator(`(${t2} + ${t1}) * ${t2}`)).toBeDefined();
          expect(calculator(`(${t2} - ${t1}) / ${t2}`)).toBeDefined();
        });
      });
    });
  });
});
