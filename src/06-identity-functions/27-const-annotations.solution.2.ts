import { Equal, Expect } from "../helpers/type-utils";
import { F } from "ts-toolbelt";

export const asConst = <T>(t: F.Narrow<T>) => t;

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
        }
      ]
    >
  >
];
