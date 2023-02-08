import { Equal, Expect } from "../helpers/type-utils";

const addAllOfThisToWindow = {
  addSolution: (a: number, b: number) => a + b,
  subtractSolution: (a: number, b: number) => a - b,
  multiplySolution: (a: number, b: number) => a * b,
  divideSolution: (a: number, b: number) => a / b,
};

Object.assign(window, addAllOfThisToWindow);

declare global {
  type StuffToAdd = typeof addAllOfThisToWindow;

  interface Window extends StuffToAdd {}
}

type tests = [
  Expect<Equal<typeof window.addSolution, (a: number, b: number) => number>>,
  Expect<
    Equal<typeof window.subtractSolution, (a: number, b: number) => number>
  >,
  Expect<
    Equal<typeof window.multiplySolution, (a: number, b: number) => number>
  >,
  Expect<Equal<typeof window.divideSolution, (a: number, b: number) => number>>
];
