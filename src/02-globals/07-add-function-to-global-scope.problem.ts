import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

declare global {
  function myFunc(): boolean;
  var myVar: number;
}

/**
 * Clues:
 *
 * 1. declare global will be needed:
 *
 * declare global {}
 *
 * 2. myFunc will need to be added to the global scope using 'function':
 *
 * function myFunc(): boolean
 *
 * 3. myVar will need to be added to the global scope using 'var':
 *
 * var myVar: number
 */

globalThis.myFunc = () => true;
globalThis.myVar = 1;

it("Should let you call myFunc without it being imported", () => {
  expect(myFunc()).toBe(true);
  type test1 = Expect<Equal<typeof myFunc, () => boolean>>;
});

it("Should let you access myVar without it being imported", () => {
  expect(myVar).toBe(1);
  type test1 = Expect<Equal<typeof myVar, number>>;
});
