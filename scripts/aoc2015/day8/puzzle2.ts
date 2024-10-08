/**
--- Part Two ---
Now, let's go the other way.

In addition to finding the number of characters of code, you should now encode each code representation as a new string and find the number of characters of the new encoded representation,
including the surrounding double quotes.

For example:

"" encodes to "\"\"", an increase from 2 characters to 6.
"abc" encodes to "\"abc\"", an increase from 5 characters to 9.
"aaa\"aaa" encodes to "\"aaa\\\"aaa\"", an increase from 10 characters to 16.
"\x27" encodes to "\"\\x27\"", an increase from 6 characters to 11.

Your task is to find the total number of characters to represent the newly encoded strings
minus the number of characters of code in each original string literal.
For example, for the strings above,
the total encoded length (6 + 9 + 16 + 11 = 42) minus
the characters in the original code representation (23, just like in the first part of this puzzle)
is 42 - 23 = 19.
**/
import { encodeLine, getCodeLength } from "./utils.ts";

async function processFile(filename: string) {
  // read file
  const simpleInput = await Deno.readTextFile(filename);
  // split to lines
  const lines = simpleInput.split("\n");

  let total = 0;

  for (const line of lines) {
    // encode line and get code length of encoded line
    // get code length of line
    // subtract encoded line code length - line code length
    total += getCodeLength(encodeLine(line)) - getCodeLength(line);
  }

  // print result
  console.log(`total for file ${filename}: `, total);
}

await processFile("./simpleInput.txt");
await processFile("./input.txt");
