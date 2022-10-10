import { it } from "vitest";
import { Brand } from "../helpers/Brand";

type Valid<T> = Brand<T, "Valid">;

interface PasswordValues {
  password: string;
  confirmPassword: string;
}

const isValidPassword = (
  values: PasswordValues,
): values is Valid<PasswordValues> => {
  if (values.password !== values.confirmPassword) {
    return false;
  }
  return true;
};

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
    if (isValidPassword(values)) {
      createUserOnApi(values);
    }
  };
});
