// string     code length                     string length
// ""         2                               0
// "abc"      5                               3
// "aaa\"aaa" 10                              7
// "aaa\\aaa" 10                              7
// "\x27"     6                               1

// The only escape sequences used are
//  \\ (which represents a single backslash),
// \" (which represents a lone double-quote character), and
//  \x plus two hexadecimal characters (which represents a single character with that ASCII code).

// get code length - util

export function getCodeLength(line: string): number {
  // const lineWithoutApostrophe = line.slice(1, line.length - 1);
  //
  // const step2string = lineWithoutApostrophe.replaceAll(`\\"`, "Xn")
  //   .replaceAll(`\\\\`, "YY");
  // return step2string.length + 2;
  return line.length;
}
// get string length - util

export function getStringLength(line: string) {
  const lineWithoutApostrophe = line.slice(1, line.length - 1);
  const step2string = lineWithoutApostrophe.replaceAll(`\\"`, '"')
    .replaceAll(`\\\\`, "\\")
    .replaceAll(/(\\x[0-9a-f]{2})/g, "X");

  return step2string.length;
}

export function encodeLine(line: string): string {
  return line;
}
