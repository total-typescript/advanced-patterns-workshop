import { Equal, Expect } from "../helpers/type-utils";

class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = "CustomError";
  }
}

const handleCustomError = (error: CustomError) => {
  console.error(error.code);

  type test = Expect<Equal<typeof error.code, number>>;
};

export {};
