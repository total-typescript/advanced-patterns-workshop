import { expect, it } from "vitest";

declare global {
  interface DispatchableEventSolution {
    LOG_IN: {
      username: string;
      password: string;
    };
  }
  type UnionOfDispatchableEventsSolution = {
    [K in keyof DispatchableEventSolution]: {
      type: K;
    } & DispatchableEventSolution[K];
  }[keyof DispatchableEventSolution];
}

const dispatchEvent = (event: UnionOfDispatchableEventsSolution) => {
  // Imagine that this function dispatches this event
  // to a global handler
};

it("Should be able to dispatch a LOG_IN and LOG_OUT event", () => {
  dispatchEvent({ type: "LOG_IN", username: "username", password: "password" });
  dispatchEvent({ type: "LOG_OUT" });
});
