/**
 * --- Day 5: Doesn't He Have Intern-Elves For This? ---
 * Santa needs help figuring out which strings in his text file are naughty or nice.
 *
 * A nice string is one with all of the following properties:
 *
 * It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
 * It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
 * It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
 * For example:
 *
 * ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
 * aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
 * jchzalrnumimnmhp is naughty because it has no double letter.
 * haegwjzuvuyypxyu is naughty because it contains the string xy.
 * dvszwmarrgswjxmb is naughty because it contains only one vowel.
 * How many strings are nice?
 */


import * as fs from "node:fs";
import * as readline from "node:readline";
import {doesContainAbCdPqXy, doesContainALetterTwiceInRow, hasAtLeast3Vowels} from "./utils";

// UTILS:
// isStringNice
// input: on line
// output: boolean

// It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
// --> function hasAllVowels

// It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
// -> regex -> negate function doesContainAbCdPqXy

// It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
// --> regex -> function doesContainALetterTwiceInRow

// read all strings
// loop all string one by one
// decide, if string is nice - a function?
let niceStringsCount = 0

function processLine(chunk: string) {
  if (hasAtLeast3Vowels(chunk) &&  !doesContainAbCdPqXy(chunk) && doesContainALetterTwiceInRow(chunk)) {
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

await readFile('./input.txt', processLine).then(() => {
  console.log('Done!', niceStringsCount);
})
console.log('Finished reading the file.', niceStringsCount);







// GOAL:
// How many strings are nice?