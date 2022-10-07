import { fetchUser, fetchPost } from "fake-external-lib";

// UNFINISHED

type AddAdditionalParamsToFunc<
  TFunc extends (...args: any[]) => Promise<any>,
  TAdditionalParams,
> = (
  ...args: Parameters<TFunc>
) => Promise<Awaited<ReturnType<TFunc>> & TAdditionalParams>;

export const fetchUserWithFullName: AddAdditionalParamsToFunc<
  typeof fetchUser,
  { fullName: string }
> = async (...args) => {
  const user = await fetchUser(...args);
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};

export const FetchPostWithExcerpt: AddAdditionalParamsToFunc<
  typeof fetchPost,
  { excerpt: string }
> = async (...args) => {
  const post = await fetchPost(...args);
  return {
    ...post,
    excerpt: post.body.slice(0, 50) + "...",
  };
};
