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

export function incrementTextByOneLetter(text: string): string {
  if (text === "zzzzzzzz") {
    return "aaaaaaaa";
  }
  const splitText = text.split("");
  for (let i = text.length - 1; i >= 0; i--) {
    // find first letters, that doesn't start with `z`
    if (splitText[i] !== "z") {
      // increment the letter
      splitText[i] = getNextChar(splitText[i]);
      // replace all `z`s on prev positions with `a`
      if (i !== text.length - 1) {
        for (let j = i + 1; j < text.length; j++) {
          splitText[j] = "a";
        }
      }
      break;
    }
  }
  return splitText.join("");
}

export function textIncludesOneOfChars(
  text: string,
  forbiddenChars = ["i", "o", "l"],
): boolean {
  for (const char of forbiddenChars) {
    if (text.includes(char)) {
      return true;
    }
  }
  return false;
}

export function containsTwoPairsOfLetters(text: string): boolean {
  const splitText = text.split("");
  let countOfPairs = 0;
  while (splitText.length > 0) {
    const char = splitText.shift();
    if (char === splitText[0]) {
      countOfPairs += 1;
      splitText.shift();
    }
  }
  return countOfPairs >= 2;
}

function getArrayOfIncreasingStraights() {
  const arrayOfIncreasingStraights = [];

  for (const char of "abcdefghijklmnopqrstuvwx") {
    arrayOfIncreasingStraights.push(
      `${char}${getNextChar(char)}${getNextChar(getNextChar(char))}`,
    );
  }
  return arrayOfIncreasingStraights;
}

const arrayOfIncreasingStraights = getArrayOfIncreasingStraights();

export function textIncludesAtLeastOneIncreasingStraight(
  text: string,
): boolean {
  for (const straight of arrayOfIncreasingStraights) {
    if (text.includes(straight)) {
      return true;
    }
  }
  return false;
}
