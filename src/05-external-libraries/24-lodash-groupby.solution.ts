import _ from "lodash";
import { expect, it } from "vitest";
import { doNotExecute, Equal, Expect } from "../helpers/type-utils";

const groupByAge = <T extends { age: number }>(array: T[]) => {
  const grouped = _.groupBy(array, "age");

  return grouped;
};

const result = groupByAge([
  {
    name: "John",
    age: 20,
  },
  {
    name: "Jane",
    age: 20,
  },
  {
    name: "Mary",
    age: 30,
  },
]);

it("Should group the items by age", () => {
  expect(result).toEqual({
    20: [
      {
        name: "John",
        age: 20,
      },
      {
        name: "Jane",
        age: 20,
      },
    ],
    30: [
      {
        name: "Mary",
        age: 30,
      },
    ],
  });

  type tests = [
    Expect<Equal<typeof result, _.Dictionary<{ name: string; age: number }[]>>>,
  ];
});

it("Should not let you pass in an array of objects NOT containing age", () => {
  doNotExecute(() => {
    groupByAge([
      {
        // @ts-expect-error
        name: "John",
      },
      {
        // @ts-expect-error
        name: "Bill",
      },
    ]);
  });
});
