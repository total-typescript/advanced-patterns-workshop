import { F } from "ts-toolbelt";
import { it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export const narrowFruits = <TFruits extends { name: string; price: number }[]>(
  t: F.Narrow<TFruits>,
) => t;

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
        },
      ]
    >
  >,
];

it("Should ONLY let you pass an array of fruits", () => {
  const notAllowed = narrowFruits([
    // @ts-expect-error
    "not allowed",
  ]);
});
