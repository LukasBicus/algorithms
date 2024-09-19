// 1. split a string to groups of same letters
// for input "111221"
// split to: "111", "22", "1"

export function splitTextToGroups(text: string): string[] {
  // if text is empty, return empty array
  if (!text) {
    return [];
  }
  // while text is not empty do:
  // loop
  const resultArray: string[] = [];
  while (text.length > 0) {
    // make char at position 0 the reference char
    const refChar = text[0];
    // set buffer to ""
    let buffer = "";
    //   loop
    //     if it is NOT equal to reference char
    //   end loop
    while (text[0] === refChar) {
      //          add the ref char to the buffer
      buffer = buffer + refChar;
      text = text.slice(1);
      //          make text shorter
    }
    // add buffer to result array
    resultArray.push(buffer);
  }
  // end loop
  // return result array
  return resultArray;
}
