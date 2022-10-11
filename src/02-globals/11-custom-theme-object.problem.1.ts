import { expect, it } from "vitest";

/**
 * Here, we've actually got _multiple_ problem files!
 * Make sure to to check problem.2.ts too.
 */

declare global {
  interface DispatchableEvent {
    LOG_IN: {
      username: string;
      password: string;
    };
  }

  /**
   * This type converts the DispatchableEvent
   * interface into a union:
   *
   * { type: 'LOG_IN'; username: string; password: string; }
   */
  type UnionOfDispatchableEvents = {
    [K in keyof DispatchableEvent]: {
      type: K;
    } & DispatchableEvent[K];
  }[keyof DispatchableEvent];
}

const dispatchEvent = (event: UnionOfDispatchableEvents) => {
  // Imagine that this function dispatches this event
  // to a global handler
};

it("Should be able to dispatch a LOG_IN and LOG_OUT event", () => {
  dispatchEvent({ type: "LOG_IN", username: "username", password: "password" });
  dispatchEvent({ type: "LOG_OUT" });
});
