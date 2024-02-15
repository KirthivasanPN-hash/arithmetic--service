const { add } = require("../arithmetica");

test("2+3 is equal to 5", () => {
  expect(add(2, 3)).toBe(5);
});
