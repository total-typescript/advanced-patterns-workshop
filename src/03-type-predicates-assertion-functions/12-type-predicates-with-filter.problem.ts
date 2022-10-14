import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export const values = ["a", "b", undefined, "c", undefined];

// How can you change this line to make the test pass?
// Clue - check out the docs on type predicates:
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types
const filteredValues = values.filter((value) => Boolean(value));

it("Should filter out the undefined values", () => {
  expect(filteredValues).toEqual(["a", "b", "c"]);
});

it('Should be of type "string[]"', () => {
  type test1 = Expect<Equal<typeof filteredValues, string[]>>;
});
