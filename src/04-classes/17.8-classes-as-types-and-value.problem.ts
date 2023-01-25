import { Equal, Expect } from "../helpers/type-utils";

class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = "CustomError";
  }
}

// How do we type the 'error' parameter?
const handleCustomError = (error: unknown) => {
  console.error(error.code);

  type test = Expect<Equal<typeof error.code, number>>;
};

export {};
