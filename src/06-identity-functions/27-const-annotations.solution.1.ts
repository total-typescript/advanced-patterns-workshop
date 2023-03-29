import { Equal, Expect } from "../helpers/type-utils";

export const asConst = <const T>(t: T) => t;

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
      readonly [
        {
          readonly name: "apple";
          readonly price: 1;
        },
        {
          readonly name: "banana";
          readonly price: 2;
        }
      ]
    >
  >
];
