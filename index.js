import parser from "./dateCalculator";
import { simple } from "./bindings/simple";
import { datefns } from "./bindings/date-fns";
import { luxon } from "./bindings/luxon";
import { simpleluxon } from "./bindings/simpleluxon";
import { moment } from "./bindings/moment";

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
export const calc = simpleCalculator;
export const datefnsCalculator = parser(
  datefns(parser, {
    console: customConsole
  })
);
export const datefnscalc = datefnsCalculator;
export const luxonCalculator = parser(
  luxon(parser, {
    console: customConsole
  })
);
export const luxoncalc = luxonCalculator;
export const simpleluxonCalculator = parser(
  simpleluxon(parser, {
    console: customConsole
  })
);
export const luxonsimplecalc = simpleluxonCalculator;
export const momentCalculator = parser(
  moment(parser, {
    console: customConsole
  })
);
export const momentcalc = momentCalculator;
export default parser(
  simple(parser, {
    console: customConsole
  })
);
