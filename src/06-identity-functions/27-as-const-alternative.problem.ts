import { Equal, Expect } from "../helpers/type-utils";

/**
 * This is an identity function. It takes a value and returns the same value.
 * Except that it doesn't work great on arrays, or object values.
 *
 * Below, you can see that fruits is typed as
 *
 * { name: string; price: number }[]
 *
 * instead of [{ name: "apple"; price: 1 }, { name: "banana"; price: 2 }]
 *
 * We could handle this using 'as const', but sometimes that isn't possible.
 *
 * So, we can use F.Narrow from ts-toolbelt instead.
 */
export const asConst = <T>(t: T) => t;

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
