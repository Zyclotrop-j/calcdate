import codegen from 'babel-plugin-codegen/macro';

export const NATIVEDATE = "NATIVEDATE";
export const DATEXPRESION = "DATEXPRESION";
export const DURATIONEXPRESSION = "DURATIONEXPRESSION";
export const DURATIONOBJECT = "DURATIONOBJECT";
const makeThrow = msg => () => {
  throw new Error(msg);
};
const parser = function makeParser(_options) {
  const lookuptable = {};
  const idgen = function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)};
  const options = Object.assign({
    makeDuration: makeThrow(`"makeDuration" option missing`),
    makeDate: makeThrow(`"makeDate" option missing`),
    plus: makeThrow(`"plus" option missing`),
    minus: makeThrow(`"minus" option missing`),
    multiply: makeThrow(`"multiply" option missing`),
    divide: makeThrow(`"divide" option missing`),
  }, _options, {
    interpolation: inter => lookuptable[inter]
  });
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
  function parseDate(strings, ...args) {
      const encoded = args.map(i => {
        const id = idgen();
        lookuptable[id] = i;
        return id;
      }).map((i, idx) => `${strings[idx]}%${i}%`).join("");
      const input = `${encoded}${strings[strings.length - 1]}`;
      return fn.parse(input, options);
  }
  parseDate.NATIVEDATE = NATIVEDATE;
  parseDate.DATEXPRESION = DATEXPRESION;
  parseDate.DURATIONEXPRESSION = DURATIONEXPRESSION;
  parseDate.DURATIONOBJECT = DURATIONOBJECT;
  parseDate._options = Object.freeze(options);
  return Object.freeze(parseDate);
}
parser.NATIVEDATE = NATIVEDATE;
parser.DATEXPRESION = DATEXPRESION;
parser.DURATIONEXPRESSION = DURATIONEXPRESSION;
parser.DURATIONOBJECT = DURATIONOBJECT;

export default parser;
