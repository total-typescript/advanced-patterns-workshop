declare module "fake-animation-lib-solution" {
  export type AnimatingState =
    | "before-animation"
    | "animating"
    | "after-animation";
  export function getAnimatingState(): AnimatingState;
}
