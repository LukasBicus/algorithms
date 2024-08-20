// read input file

import { readFileSync } from "node:fs";

// const input = readFileSync('./simplifiedInput.txt', 'utf8');
const input = readFileSync("./input.txt", "utf8");

// parse dimensions (l, w, h) for each line

const captureLWH = /(\d+)x(\d+)x(\d+)/g;

// write regex to get iterator for getting  `lxwxh` groups
const inputIterator = input.matchAll(captureLWH);

// requiredPaper starts with 0, add all required paper in process
let requiredPaper = 0;

for (const match of inputIterator) {
  const [, stringifiedW, stringifiedL, stringifiedH] = match;
  const w = parseFloat(stringifiedW);
  const l = parseFloat(stringifiedL);
  const h = parseFloat(stringifiedH);
  // console.log(w, l, h)
  // loop add paper for one box
  requiredPaper += getRequiredPaperForASingleBox(getSides(l, w, h));
}

// get smallestSide(sides)
//   compare l with w and h return if it's smallest
//   compare w with h, return w if smaller
//   return h
function getSmallestSide(sides: number[]) {
  return Math.min(...sides);
}

// create a function for required paper for single box
//    lw = l*w
//    wh = w*h
//    hl = h*l
//    2 * (lw + wh + hl)
//    add extra -> call get smallest side and add it once

function getSides(w: number, l: number, h: number) {
  return {
    lw: l * w,
    wh: w * h,
    hl: l * h,
  };
}
function getRequiredPaperForASingleBox({ lw, hl, wh }: {
  lw: number;
  wh: number;
  hl: number;
}) {
  return 2 * (lw + hl + wh) + getSmallestSide([lw, hl, wh]);
}

console.log("requiredPaper", requiredPaper);
