export const leadingZero = (val: string | number) => {

  return `00${val}`.slice(-2)
};
