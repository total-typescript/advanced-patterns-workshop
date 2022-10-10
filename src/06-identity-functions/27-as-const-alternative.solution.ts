import { F } from "ts-toolbelt";
import { Equal, Expect } from "../helpers/type-utils";

export const asConst = <T>(t: F.Narrow<T>) => t;

/**
 * Now, fruits is typed as:
 * [{ name: "apple"; price: 1 }, { name: "banana"; price: 2 }]
 *
 * Try changing the argument to asConst to see how it affects
 * the type.
 */
const fruits = asConst([
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
