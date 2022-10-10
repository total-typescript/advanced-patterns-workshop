import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type HandlersToDiscriminatedUnion<T extends Record<string, any>> = {
  [K in keyof T]: { type: K } & T[K];
}[keyof T];

export class DynamicReducer<
  TState,
  THandlers extends Record<string, any> = {},
> {
  private handlers = {} as Record<
    string,
    (state: TState, action: HandlersToDiscriminatedUnion<THandlers>) => TState
  >;

  addHandler<TType extends string, TPayload>(
    type: TType,
    handler: (state: TState, payload: TPayload) => TState,
  ): DynamicReducer<TState, THandlers & Record<TType, TPayload>> {
    this.handlers[type] = handler;

    return this;
  }

  reduce(
    state: TState,
    action: HandlersToDiscriminatedUnion<THandlers>,
  ): TState {
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
    },
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
    { type: "LOG_IN", username: "foo", password: "bar" },
  );

  type test = [Expect<Equal<typeof state, State>>];

  expect(state).toEqual({ username: "foo", password: "bar" });
});

it("Should return the new state after LOG_OUT", () => {
  const state = reducer.reduce(
    { username: "foo", password: "bar" },
    { type: "LOG_OUT" },
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
    },
  );
});

it("Should error if you pass an incorrect payload", () => {
  const state = reducer.reduce(
    { username: "foo", password: "bar" },
    // @ts-expect-error
    {
      type: "LOG_IN",
    },
  );
});
