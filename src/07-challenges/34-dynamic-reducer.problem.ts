import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

// Clue - this will be needed!
type PayloadsToDiscriminatedUnion<T extends Record<string, any>> = {
  [K in keyof T]: { type: K } & T[K];
}[keyof T];

/**
 * It turns a record of handler information into a discriminated union:
 *
 * | { type: "LOG_IN", username: string, password: string }
 * | { type: "LOG_OUT" }
 */
type TestingPayloadsToDiscriminatedUnion = PayloadsToDiscriminatedUnion<{
  LOG_IN: { username: string; password: string };
  LOG_OUT: {};
}>;

/**
 * Clue:
 *
 * You'll need to add two generics here!
 */
export class DynamicReducer {
  private handlers = {} as unknown;

  addHandler(
    type: unknown,
    handler: (state: unknown, payload: unknown) => unknown
  ): unknown {
    this.handlers[type] = handler;

    return this;
  }

  reduce(state: unknown, action: unknown): unknown {
    const handler = this.handlers[action.type];
    if (!handler) {
      return state;
    }

    return handler(state, action);
  }
}

interface State {
  username: string;
  password: string;
}

const reducer = new DynamicReducer<State>()
  .addHandler(
    "LOG_IN",
    (state, action: { username: string; password: string }) => {
      return {
        username: action.username,
        password: action.password,
      };
    }
  )
  .addHandler("LOG_OUT", () => {
    return {
      username: "",
      password: "",
    };
  });

it("Should return the new state after LOG_IN", () => {
  const state = reducer.reduce(
    { username: "", password: "" },
    { type: "LOG_IN", username: "foo", password: "bar" }
  );

  type test = [Expect<Equal<typeof state, State>>];

  expect(state).toEqual({ username: "foo", password: "bar" });
});

it("Should return the new state after LOG_OUT", () => {
  const state = reducer.reduce(
    { username: "foo", password: "bar" },
    { type: "LOG_OUT" }
  );

  type test = [Expect<Equal<typeof state, State>>];

  expect(state).toEqual({ username: "", password: "" });
});

it("Should error if you pass it an incorrect action", () => {
  const state = reducer.reduce(
    { username: "foo", password: "bar" },
    {
      // @ts-expect-error
      type: "NOT_ALLOWED",
    }
  );
});

it("Should error if you pass an incorrect payload", () => {
  const state = reducer.reduce(
    { username: "foo", password: "bar" },
    // @ts-expect-error
    {
      type: "LOG_IN",
    }
  );
});
