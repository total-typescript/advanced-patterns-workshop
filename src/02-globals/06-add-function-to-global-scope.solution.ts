import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Because declare global works in multiple files, I've changed
 * the name of the variables/functions to avoid a conflict with
 * the other file
 */
declare global {
  function mySolutionFunc(): boolean;
  var mySolutionVar: number;
}

globalThis.mySolutionFunc = () => true;
globalThis.mySolutionVar = 1;

it("Should let you call myFunc without it being imported", () => {
  expect(mySolutionFunc()).toBe(true);
  type test1 = Expect<Equal<typeof mySolutionFunc, () => boolean>>;
});

it("Should let you access myVar without it being imported", () => {
  expect(mySolutionVar).toBe(1);
  type test1 = Expect<Equal<typeof mySolutionVar, number>>;
});
