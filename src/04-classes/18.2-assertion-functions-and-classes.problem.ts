import { Equal, Expect } from "../helpers/type-utils";

interface User {
  id: string;
}

export class SDK {
  loggedInUser?: User;

  constructor(loggedInUser?: User) {
    this.loggedInUser = loggedInUser;
  }

  // How do we type this assertion function?
  assertIsLoggedIn() {
    if (!this.loggedInUser) {
      throw new Error("Not logged in");
    }
  }

  createPost(title: string, body: string) {
    type test1 = Expect<Equal<typeof this.loggedInUser, User | undefined>>;

    this.assertIsLoggedIn();

    type test2 = Expect<Equal<typeof this.loggedInUser, User>>;
  }
}
