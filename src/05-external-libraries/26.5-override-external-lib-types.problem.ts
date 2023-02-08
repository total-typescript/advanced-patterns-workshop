import { getAnimatingState } from "fake-animation-lib";
import { Equal, Expect } from "../helpers/type-utils";

const animatingState = getAnimatingState();

type tests = [
  Expect<
    Equal<
      typeof animatingState,
      "before-animation" | "animating" | "after-animation"
    >
  >
];
