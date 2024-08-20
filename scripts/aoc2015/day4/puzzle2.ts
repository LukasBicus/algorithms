//  part of input is `abcdef` + `puzzleAnswerInDecimal (number in decimal)` => hash with MD5
//  => look for a result that starts with `000001` | `000002` |`000003` | `000004` |`000005` | `000006` |`000007` | `000008` |`000009`

// The input to the MD5 hash is some secret key (your puzzle input, given below) followed by a number in decimal.
// for abcdef it is 609043
// for pqrstuv it is 1048970

// start:
// puzzleAnswerInDecimal is 1

import md5 from "npm:md5";
import { startRegex2 } from "./regexes.ts";

let hashResult = "";
// const puzzle = `abcdef`
// let puzzleAnswerInDecimal = 609040
// const puzzle = `pqrstuv`
// let puzzleAnswerInDecimal = 1048965

const puzzle = `bgvyzdsv`;
let puzzleAnswerInDecimal = 0;

function hash(input: string): string {
  return md5(input);
}

do {
  puzzleAnswerInDecimal++;
  // find hash for key + puzzleAnswerInDecimal
  hashResult = hash(`${puzzle}${puzzleAnswerInDecimal}`);
  // validate with regex, if it starts with `00000` followed by a digit
  // if it's true - you have found the answer
} while (!startRegex2.test(hashResult));

console.log(hashResult);
console.log("puzzleAnswerInDecimal", puzzleAnswerInDecimal);
// for hash, find a library
