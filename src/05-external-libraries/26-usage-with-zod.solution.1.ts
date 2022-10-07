import { expect, it } from "vitest";
import { z } from "zod";

const makeZodSafeFunction = <TSchema extends z.ZodType, TResult>(
  schema: TSchema,
  func: (arg: TSchema["_type"]) => TResult,
) => {
  return (arg: TSchema["_type"]) => {
    const result = schema.parse(arg);
    return func(result);
  };
};

/**
 * You should be able to edit the object below,
 * and see the args inside the makeZodSafeFunction
 * call change.
 */
const addTwoNumbersArg = z.object({
  a: z.number(),
  b: z.number(),
});

const addTwoNumbers = makeZodSafeFunction(
  addTwoNumbersArg,
  (args) => args.a + args.b,
  // ^ 🕵️‍♂️
);

it("Should error on the type level AND the runtime if you pass incorrect params", () => {
  expect(() =>
    addTwoNumbers(
      // @ts-expect-error
      { a: 1, badParam: 3 },
    ),
  ).toThrow();
});

it("Should succeed if you pass the correct type", () => {
  expect(addTwoNumbers({ a: 1, b: 2 })).toBe(3);
});
