import parser from "./dateCalculator";
import { luxon } from "./bindings/luxon";

const customConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  info: console.info.bind(console),
  debug: console.debug.bind(console)
};
export const luxonCalculator = parser(
  luxon(parser, {
    console: customConsole
  })
);
export default luxonCalculator;
