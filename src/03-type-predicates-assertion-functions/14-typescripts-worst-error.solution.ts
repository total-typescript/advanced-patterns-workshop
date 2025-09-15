import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

interface User {
  id: string;
  name: string;
}

interface AdminUser extends User {
  role: "admin";
  organisations: string[];
}

interface NormalUser extends User {
  role: "normal";
}

const assertUserIsAdmin: (
  user: NormalUser | AdminUser,
) => asserts user is AdminUser = (
  user: NormalUser | AdminUser,
): asserts user is AdminUser => {
  if (user.role !== "admin") {
    throw new Error("Not an admin user");
  }
};

// function assertUserIsAdmin(
//   user: NormalUser | AdminUser,
// ): asserts user is AdminUser {
//   if (user.role !== "admin") {
//     throw new Error("Not an admin user");
//   }
// }

it("Should throw an error when it encounters a normal user", () => {
  const user: NormalUser = {
    id: "user_1",
    name: "Miles",
    role: "normal",
  };

  expect(() => assertUserIsAdmin(user)).toThrow();
});

it("Should assert that the type is an admin user after it has been validated", () => {
  const example = (user: NormalUser | AdminUser) => {
    /**
     * The fix is to make assertUserIsAdmin a function,
     * or to add the explicit type annotation back to the arrow function
     * Lord above.
     */
    assertUserIsAdmin(user);

    type tests = [Expect<Equal<typeof user, AdminUser>>];
  };
});
