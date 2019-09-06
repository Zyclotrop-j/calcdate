import codegen from "babel-plugin-codegen/macro";

export const NATIVEDATE = "NATIVEDATE";
export const DATEXPRESION = "DATEXPRESION";
export const DURATIONEXPRESSION = "DURATIONEXPRESSION";
export const DURATIONOBJECT = "DURATIONOBJECT";
export const INTERVALOBJECT = "INTERVALOBJECT";
export const INTERVALEXPRESION = "INTERVALEXPRESION";
const makeThrow = msg => () => {
  throw new Error(msg);
};
const parser = function makeParser(_options) {
  const lookuptable = {};
  const idgen = function b(a) {
    return a
      ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
      : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
  };
  const options = Object.assign(
    {
      makeDuration: makeThrow(`"makeDuration" option missing`),
      makeDate: makeThrow(`"makeDate" option missing`),
      makeInterval: makeThrow(`"makeInterval" option missing`),
      add: makeThrow(`"add" option missing`),
      subtract: makeThrow(`"subtract" option missing`),
      multiply: makeThrow(`"multiply" option missing`),
      divide: makeThrow(`"divide" option missing`)
    },
    _options,
    {
      interpolation: inter => lookuptable[inter]
    }
  );
  const fn = codegen`
  const peg = require('pegjs');
  const fs = require('fs');
  const contents = fs.readFileSync('./grammar.peg', 'utf8');
  const parser = peg.generate(contents, {
    optimize: "size",
    output: "source",
    // dependencies: umd
    format: "bare" // / globals
    // exportVar: "foobarexportvariablename"
  });
  fs.writeFileSync('./dist/parser.js', parser);
  module.exports = parser;
  `;
  function parseDate(_strings, ...args) {
    const strings = Array.isArray(_strings) ? _strings : [_strings];
    const REPLACE = "REPLACE";
    const STRING = "STRING";
    const encoded = args
      .map(i => {
        if (typeof i === "string") {
          return [STRING, i];
        }
        const id = idgen();
        lookuptable[id] = i;
        return [REPLACE, id];
      })
      .map(([t, i], idx) =>
        t === REPLACE ? `${strings[idx]}%${i}%` : `${strings[idx]}${i}`
      )
      .join("");
    const input = `${encoded}${strings[strings.length - 1]}`;
    return fn.parse(input, options);
  }
  parseDate.NATIVEDATE = NATIVEDATE;
  parseDate.DATEXPRESION = DATEXPRESION;
  parseDate.DURATIONEXPRESSION = DURATIONEXPRESSION;
  parseDate.DURATIONOBJECT = DURATIONOBJECT;
  parseDate.INTERVALOBJECT = INTERVALOBJECT;
  parseDate.INTERVALEXPRESION = INTERVALEXPRESION;
  parseDate._options = Object.freeze(options);
  return Object.freeze(parseDate);
};
parser.NATIVEDATE = NATIVEDATE;
parser.DATEXPRESION = DATEXPRESION;
parser.DURATIONEXPRESSION = DURATIONEXPRESSION;
parser.DURATIONOBJECT = DURATIONOBJECT;
parser.INTERVALOBJECT = INTERVALOBJECT;
parser.INTERVALEXPRESION = INTERVALEXPRESION;

export default parser;
