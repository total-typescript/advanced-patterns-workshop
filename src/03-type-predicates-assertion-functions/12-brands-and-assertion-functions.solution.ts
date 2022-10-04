import { it } from "vitest";
import { Brand } from "../helpers/Brand";

type Valid<T> = Brand<T, "Valid">;

interface PasswordValues {
  password: string;
  confirmPassword: string;
}

function assertIsValidPassword(
  values: PasswordValues,
): asserts values is Valid<PasswordValues> {
  if (values.password !== values.confirmPassword) {
    throw new Error("Password is invalid");
  }
}

const createUserOnApi = (values: Valid<PasswordValues>) => {
  // Imagine this function creates the user on the API
};

it("Should fail if you do not validate the passwords before calling createUserOnApi", () => {
  const onSubmitHandler = (values: PasswordValues) => {
    // @ts-expect-error
    createUserOnApi(values);
  };
});

it("Should succeed if you DO validate the passwords before calling createUserOnApi", () => {
  const onSubmitHandler = (values: PasswordValues) => {
    assertIsValidPassword(values);
    createUserOnApi(values);
  };
});
