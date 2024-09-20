const chars = "abcdefghijklmnopqrstuvwxyz";

export function getNextChar(char: string): string {
  if (char.length !== 1) {
    throw new Error("Invalid input");
  }
  const index = chars.indexOf(char);
  if (index < 0) {
    throw new Error("Invalid input");
  }
  if (index === chars.length - 1) {
    return chars[0];
  }
  return chars[index + 1];
}

export function getNextPassword(oldPassword: string): string {
  if (oldPassword === "zzzzzzzz") {
    return "aaaaaaaa";
  }
  // const splitText = oldPassword.split("");
  // if (splitText.at(-1) !== 'z') {
  //   return
  // }
  return oldPassword;
}
