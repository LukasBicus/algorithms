/**
 * --- Part Two ---
 * Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.
 *
 * Now, a nice string is one with all of the following properties:
 *
 * It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
 * It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
 * For example:
 *
 * qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).
 * xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.
 * uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.
 * ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.
 * How many strings are nice under these new rules?
 */


import * as fs from "node:fs";
import * as readline from "node:readline";
import {
  doesContainAbCdPqXy,
  doesContainALetterTwiceInRow,
  has2SameLettersWith1BetweenThem,
  hasAPairAppearingTwice,
  hasAtLeast3Vowels
} from "./utils";

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
let niceStringsCount = 0

function processLine(chunk: string) {
  if (hasAPairAppearingTwice(chunk) &&  has2SameLettersWith1BetweenThem(chunk)) {
    console.log('nice word', chunk)
    niceStringsCount++
  }
}

function readFile(path: string, processLine: (line: string) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path, {
      encoding: 'utf8',
      highWaterMark: 1024 // Adjust the buffer size if needed
    });

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity // Recognize all instances of CR LF ('\r\n') as a single line break
    });

    rl.on('line', processLine);

    rl.on('close', resolve);
  })
}

await readFile('./simpleInput2.txt', processLine).then(() => {
  console.log('Done!', niceStringsCount);
})







// GOAL:
// How many strings are nice?