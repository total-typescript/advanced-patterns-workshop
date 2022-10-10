import { fetchUser } from "fake-external-lib";
import { Equal, Expect, ExpectExtends } from "../helpers/type-utils";

/**
 * We're using a function from fake-external lib, but we need
 * to extend the types. Extract the types below.
 */

type ParametersOfFetchUser = unknown;

type ReturnTypeOfFetchUserWithFullName = unknown;

export const fetchUserWithFullName = async (
  ...args: ParametersOfFetchUser
): Promise<ReturnTypeOfFetchUserWithFullName> => {
  const user = await fetchUser(...args);
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};

type tests = [
  Expect<Equal<ParametersOfFetchUser, [string]>>,
  Expect<
    ExpectExtends<
      { id: string; firstName: string; lastName: string; fullName: string },
      ReturnTypeOfFetchUserWithFullName
    >
  >,
];
