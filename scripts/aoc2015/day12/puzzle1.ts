/*
--- Day 12: JSAbacusFramework.io ---
Santa's Accounting-Elves need help balancing the books after a recent order. Unfortunately, their accounting software uses a peculiar storage format. That's where you come in.

They have a JSON document which contains a variety of things: arrays ([1,2,3]), objects ({"a":1, "b":2}), numbers, and strings. Your first job is to simply find all of the numbers throughout the document and add them together.

For example:

[1,2,3] and {"a":2,"b":4} both have a sum of 6.
[[[3]]] and {"a":{"b":4},"c":-1} both have a sum of 3.
{"a":[-1,1]} and [-1,{"a":1}] both have a sum of 0.
[] and {} both have a sum of 0.
You will not encounter any strings containing numbers.

What is the sum of all numbers in the document?

 */

import { getNumbersFromText } from "./utils.ts";

async function processFile(filename: string): Promise<number> {
  // read the file string
  const input = await Deno.readTextFile(filename);
  const allNumbers = getNumbersFromText(input);
  // sum all digits together
  return allNumbers.reduce(
    (accumulator: number, number: number) => accumulator + number,
    0,
  );
}

processFile("./simpleInput.txt").then((result) =>
  console.log("result: ", result)
);

processFile("./input.txt").then((result) => console.log("result: ", result));
