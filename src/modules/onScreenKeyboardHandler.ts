export const onScreenKeyboardHandler = (
  keyboardVal: string,
  currentValues: string
) => {
  let inputValue = currentValues + keyboardVal;
  if (keyboardVal === "{bksp}")
    inputValue = inputValue.replace(/\{bksp\}/g, "").replace(/.$/, "");
  return inputValue;
};
