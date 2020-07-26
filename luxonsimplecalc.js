import parser from "./dateCalculator";
import { simpleluxon } from "./bindings/simpleluxon";

const customConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  info: console.info.bind(console),
  debug: console.debug.bind(console)
};
export const luxonsimplecalc = lib => parser(
  simpleluxon(lib)(parser, {
    console: customConsole
  })
);
export default luxonsimplecalc;
