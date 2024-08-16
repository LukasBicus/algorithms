/*
Santa needs help mining some AdventCoins (very similar to bitcoins) to use as gifts for all the economically forward-thinking little girls and boys.

To do this, he needs to find MD5 hashes which, in hexadecimal, start with at least five zeroes.


To mine AdventCoins, you must find Santa the lowest positive number (no leading zeroes: 1, 2, 3, ...) that produces such a hash.

For example:

If your secret key is abcdef, the answer is 609043, because the MD5 hash of abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest such number to do so.
If your secret key is pqrstuv, the lowest number it combines with to make an MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of pqrstuv1048970 looks like 000006136ef....
Your puzzle input is bgvyzdsv.
*/

//  part of input is `abcdef` + `puzzleAnswerInDecimal (number in decimal)` => hash with MD5
//  => look for a result that starts with `000001` | `000002` |`000003` | `000004` |`000005` | `000006` |`000007` | `000008` |`000009`

// The input to the MD5 hash is some secret key (your puzzle input, given below) followed by a number in decimal.
// for abcdef it is 609043
// for pqrstuv it is 1048970

// start:
// puzzleAnswerInDecimal is 1

let puzzleAnswerInDecimal = 1
let hashResult = ''

// const puzzle = `bgvyzdsv`
const puzzle = `abcdef`




// loop
// find hash for key + puzzleAnswerInDecimal
// validate with regex, if it starts with `00000` followed by a digit
export const startRegex = /^00000\d/
// if it's true - you have found the answer
// if it's falsy - increase puzzleAnswerInDecimal, rerun loop

// for hash, find a library





