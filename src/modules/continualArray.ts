export const continueArrayItem = <T>(selector: number, elements: T[]): T => {
  const elementLength = elements.length;
  if (selector > elementLength - 1) {
    return elements[Math.round((selector + 1) / elementLength) - 1];
  }

  return elements[selector];
};
