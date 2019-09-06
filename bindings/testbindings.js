export const test = (
  __,
  { makeDuration, makeDate, add, subtract, multiply, divide }
) => {
  return {
    makeDuration: makeDuration,
    makeDate: makeDate,
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide
  };
};
export default test;
