// Colin from Zod explains how using subclasses can make generics
// look nice in intellisense.

type ZodString = {
  min: () => any;
  max: () => any;
} & ZodType<string, {}>;

type ZodType<T, ZodDef> = {
  parse: (input: unknown) => T;
};

const str: ZodString = {} as any;

export {};
