import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export const values = ["a", "b", undefined, "c", undefined];

// This solution is a little ugly! The much better one
// is solution number 2!
const filteredValues = values.filter((value) => Boolean(value)) as string[];

it("Should filter out the undefined values", () => {
  expect(filteredValues).toEqual(["a", "b", "c"]);
});

it('Should be of type "string[]"', () => {
  type test1 = Expect<Equal<typeof filteredValues, string[]>>;
});
