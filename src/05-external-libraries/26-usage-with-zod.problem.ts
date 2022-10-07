import { expect, it } from "vitest";
import { z } from "zod";

/**
 * In this exercise, we need to dive deep into the types of a
 * library called zod - a schema definition library. We're trying
 * to make a function that takes a schema and a function, and
 * returns a new function that will parse the input using the
 * schema before calling the original function.
 *
 * Your focus should be the 'arg:' below - what type should it be?
 *
 * Clues:
 *
 * 1. You'll need to investigate the generic signature of z.ZodType
 * to see if you can extract the output.
 */
const makeZodSafeFunction = <TSchema extends z.ZodType, TResult>(
  schema: TSchema,
  func: (arg: unknown) => TResult,
) => {
  return (arg: unknown) => {
    const result = schema.parse(arg);
    return func(result);
  };
};

const addTwoNumbersArg = z.object({
  a: z.number(),
  b: z.number(),
});

const addTwoNumbers = makeZodSafeFunction(
  addTwoNumbersArg,
  (args) => args.a + args.b,
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
