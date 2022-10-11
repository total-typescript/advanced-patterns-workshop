import { Equal, Expect } from "../helpers/type-utils";

interface Fruit {
  name: string;
  price: number;
}

export const wrapFruit = (fruits: unknown[]) => {
  const getFruit = (name: unknown): unknown => {
    return fruits.find((fruit) => fruit.name === name);
  };

  return {
    getFruit,
  };
};

const fruits = wrapFruit([
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
]);

const banana = fruits.getFruit("banana");
const apple = fruits.getFruit("apple");
// @ts-expect-error
const notAllowed = fruits.getFruit("not-allowed");

type tests = [
  Expect<Equal<typeof apple, { name: "apple"; price: 1 }>>,
  Expect<Equal<typeof banana, { name: "banana"; price: 2 }>>,
];
