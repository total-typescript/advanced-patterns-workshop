import { fetchUser } from "fake-external-lib";
import { Equal, Expect, ExpectExtends } from "../helpers/type-utils";

type ParametersOfFetchUser = Parameters<typeof fetchUser>;

type ReturnTypeOfFetchUserWithFullName = Awaited<
  ReturnType<typeof fetchUser>
> & { fullName: string };

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
      ReturnTypeOfFetchUserWithFullName,
      { id: string; firstName: string; lastName: string; fullName: string }
    >
  >,
];
