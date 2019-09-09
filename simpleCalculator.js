import parser from "./dateCalculator";
import { simple } from "./bindings/simple";

const customConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  info: console.info.bind(console),
  debug: console.debug.bind(console)
};
export const simpleCalculator = parser(
  simple(parser, {
    console: customConsole
  })
);
export default simpleCalculator;
