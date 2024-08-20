import * as fs from "node:fs";
import * as readline from "node:readline";
import {
  has2SameLettersWith1BetweenThem,
  hasAPairAppearingTwice,
} from "./utils.ts";

// UTILS:
// hasAPairAppearingTwice
// input: on line
// output: boolean

// has2SameLettersWith1BetweenThem
// input: on line
// output: boolean

// read all strings
// loop all string one by one
// decide, if string is nice - a function?
let niceStringsCount = 0;

function processLine(chunk: string) {
  if (hasAPairAppearingTwice(chunk) && has2SameLettersWith1BetweenThem(chunk)) {
    // console.log('nice word', chunk)
    niceStringsCount++;
  }
}

function readFile(
  path: string,
  processLine: (line: string) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path, {
      encoding: "utf8",
      highWaterMark: 1024, // Adjust the buffer size if needed
    });

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity, // Recognize all instances of CR LF ('\r\n') as a single line break
    });

    rl.on("line", processLine);

    rl.on("close", resolve);
  });
}

await readFile("./input.txt", processLine).then(() => {
  console.log("Done!", niceStringsCount);
});
