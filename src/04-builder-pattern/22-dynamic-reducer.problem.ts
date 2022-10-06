type HandlersToDiscriminatedUnion<T extends Record<string, any>> = {
  [K in keyof T]: { type: K } & T[K];
}[keyof T];

class DynamicReducer<TState, THandlers extends Record<string, any> = {}> {
  private handlers = {} as Record<
    string,
    (state: TState, action: HandlersToDiscriminatedUnion<THandlers>) => TState
  >;

  addHandler<TType extends string, TPayload = {}>(
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

    return handler(state, action.payload);
  }
}

interface State {
  username: string;
  password: string;
}

const reducer = new DynamicReducer<State>()
  .addHandler(
    "LOG_IN",
    (state, event: { username: string; password: string }) => {
      return {
        username: event.username,
        password: event.password,
      };
    },
  )
  .addHandler("LOG_OUT", () => {
    return {
      username: "",
      password: "",
    };
  });
