declare module "fake-animation-lib-solution" {
  export function getAnimatingState():
    | "before-animation"
    | "animating"
    | "after-animation";
}
