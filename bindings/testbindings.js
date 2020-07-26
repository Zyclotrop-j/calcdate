export const test = /*#__PURE__*/ () => (
  __,
  { makeInterval, makeDuration, makeDate, add, subtract, multiply, divide }
) => {
  return {
    makeInterval: makeInterval,
    makeDuration: makeDuration,
    makeDate: makeDate,
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide
  };
};
export default test;
