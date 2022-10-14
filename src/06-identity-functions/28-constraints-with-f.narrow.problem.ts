import { F } from "ts-toolbelt";
import { it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * We know that asConst works, but we now also want to be
 * able to narrow the type to only allow an array
 * of fruits.
 */
export const narrowFruits = <TFruits>(t: TFruits) => t;

const fruits = narrowFruits([
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
]);

type tests = [
  Expect<
    Equal<
      typeof fruits,
      [
        {
          name: "apple";
          price: 1;
        },
        {
          name: "banana";
          price: 2;
        }
      ]
    >
  >
];

it("Should ONLY let you pass an array of fruits", () => {
  const notAllowed = narrowFruits([
    // @ts-expect-error
    "not allowed",
  ]);
});
