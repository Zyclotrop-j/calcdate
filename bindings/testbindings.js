export const test = (
  __,
  { makeDuration, makeDate, add, substract, multiply, divide }
) => {
  return {
    makeDuration: makeDuration,
    makeDate: makeDate,
    add: add,
    substract: substract,
    multiply: multiply,
    divide: divide
  };
};
export default test;
