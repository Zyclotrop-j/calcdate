import parser from "./dateCalculator";
import { moment } from "./bindings/moment";

const customConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  info: console.info.bind(console),
  debug: console.debug.bind(console)
};
export const momentCalculator = parser(
  moment(parser, {
    console: customConsole
  })
);
export default momentCalculator;
