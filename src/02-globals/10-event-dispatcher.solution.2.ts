import { it } from "vitest";

declare global {
  interface DispatchableEventSolution {
    LOG_OUT: {};
    UPDATE_USERNAME: { username: string };
  }
}

const handler = (event: UnionOfDispatchableEventsSolution) => {
  switch (event.type) {
    case "LOG_OUT":
      console.log("LOG_OUT");
      break;
    case "UPDATE_USERNAME":
      console.log(event.username);
      break;
  }
};

it("Should be able to handle LOG_OUT and UPDATE_USERNAME events", () => {
  handler({ type: "LOG_OUT" });
  handler({ type: "UPDATE_USERNAME", username: "matt" });
});
