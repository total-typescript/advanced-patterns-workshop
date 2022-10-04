import { describe, expect, it } from "vitest";
import { Brand } from "../helpers/Brand";

type Password = Brand<string, "Password">;
type Email = Brand<string, "Email">;

export const validateValues = (values: { email: string; password: string }) => {
  if (!values.email.includes("@")) {
    throw new Error("Email invalid");
  }
  if (values.password.length < 8) {
    throw new Error("Password not long enough");
  }

  return {
    email: values.email,
    password: values.password,
  };
};

const createUserOnApi = (values: { email: Email; password: Password }) => {
  // Imagine this function creates the user on the API
};

const onSubmitHandler = (values: { email: string; password: string }) => {
  const validatedValues = validateValues(values);
  // How do we stop this erroring?
  createUserOnApi(validatedValues);
};

describe("onSubmitHandler", () => {
  it("Should error if the email is invalid", () => {
    expect(() => {
      onSubmitHandler({
        email: "invalid",
        password: "12345678",
      });
    }).toThrowError("Email invalid");
  });

  it("Should error if the password is too short", () => {
    expect(() => {
      onSubmitHandler({
        email: "whatever@example.com",
        password: "1234567",
      });
    }).toThrowError("Password not long enough");
  });
});
