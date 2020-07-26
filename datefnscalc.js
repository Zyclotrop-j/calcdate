import parser from "./dateCalculator";
import { datefns } from "./bindings/date-fns";

const customConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  info: console.info.bind(console),
  debug: console.debug.bind(console)
};
export const datefnscalc = lib => parser(
  datefns(lib)(parser, {
    console: customConsole
  })
);
export default datefnscalc;
