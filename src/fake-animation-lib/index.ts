export const getAnimatingState = (): string => {
  if (Math.random() > 0.5) {
    return "before-animation";
  }

  if (Math.random() > 0.5) {
    return "animating";
  }

  return "after-animation";
};
