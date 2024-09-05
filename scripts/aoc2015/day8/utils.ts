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

const backSlashApostropheRegex = /\"/;

export function getCodeLength(line: string) {
  const lineWithoutApostrophe = line.slice(1, line.length - 1);

  return lineWithoutApostrophe.replace(`"`, "Xn").length + 2;
}
// get string length - util

export function getStringLength(line: string) {
  return line.length;
}
