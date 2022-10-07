export const fetchUser = async (id: string) => {
  return {
    id,
    firstName: "John",
    lastName: "Doe",
  };
};

export const fetchPost = async (id: string) => {
  return {
    id,
    title: "Hello World",
    body: "This is a post that is great and is excessively long, much too long for an excerpt.",
  };
};
