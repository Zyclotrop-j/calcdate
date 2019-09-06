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
    operations.makeDuration = jest.fn(duration => ({ duration }));
    operations.makeDate = jest.fn(date => ({ date }));
    operations.add = jest.fn((a, b) => ({ add: [a, b] }));
    operations.substract = jest.fn((a, b) => ({ substract: [a, b] }));
    operations.multiply = jest.fn((a, b) => ({ multiply: [a, b] }));
    operations.divide = jest.fn((a, b) => ({ divide: [a, b] }));
    calculator = parser(testbinding(parser, operations));
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
    const cop = "substract";
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
        substract: [
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
          operations.substract.mock.results[0].value,
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
      // "2009-000", // substract operation!! -> valid input
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

  describe("Parses iso-durations", () => {});

  describe("Parses iso-intervals", () => {});
});
