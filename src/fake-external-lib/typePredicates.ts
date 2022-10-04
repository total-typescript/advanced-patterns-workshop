export const isDivElement = (element: unknown): element is HTMLDivElement => {
  return element instanceof HTMLDivElement;
};

export const isBodyElement = (element: unknown): element is HTMLBodyElement => {
  return element instanceof HTMLBodyElement;
};
