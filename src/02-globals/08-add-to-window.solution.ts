import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Clues:
 *
 * 1. You'll need declare global again
 *
 * 2. Inside declare global, you'll need to modify the Window
 * interface to add a makeGreetingSolution function
 */
declare global {
  interface Window {
    makeGreetingSolution: () => string;
  }
}

window.makeGreetingSolution = () => "Hello, world!";

it("Should let you call makeGreetingSolution from the window object", () => {
  expect(window.makeGreetingSolution()).toBe("Hello, world!");

  type test1 = Expect<Equal<typeof window.makeGreetingSolution, () => string>>;
});
