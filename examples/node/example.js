require("date-fns");
require("luxon");
var datecalculator = require("./datecalculator.js").simpleCalculator;
var datefnsCalculator = require("./datecalculator.js").datefnsCalculator;
var luxonCalculator = require("./datecalculator.js").luxonCalculator;
var simpleluxonCalculator = require("./datecalculator.js")
  .simpleluxonCalculator;
var momentCalculator = require("./datecalculator.js").momentCalculator;

var out = function(calc) {
  console.log("This is a demo A: calc`now` = \n\t\t" + calc`now`.toString());
  console.log("This is a demo B: calc`5d` = \n\t\t" + calc`5d`.toString());
  console.log(
    "This is a demo 1: calc`5d + 3min - (1 hour - 2 weeks) * 2` = \n\t\t" +
      calc`5d + 3min - (1 hour - 2 weeks) * 2`.toString()
  );
  console.log(
    "This is a demo 2: calc`P3Y6M4DT12H30M5S + P4Y + P0D * 2` = \n\t\t" +
      calc`P3Y6M4DT12H30M5S + P4Y + P0D * 2`.toString()
  );
  console.log(
    "This is a demo 3: calc`now + P4Y - 2weeks` = \n\t\t" +
      calc`now + P4Y - 2weeks`.toString()
  );
};
out(datecalculator);
out(datefnsCalculator);
out(luxonCalculator);
out(simpleluxonCalculator);
out(momentCalculator);
