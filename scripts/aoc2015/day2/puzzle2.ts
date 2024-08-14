// read input file

import {readFileSync} from "node:fs";

// const input = readFileSync('./simplifiedInput.txt', 'utf8');
const input = readFileSync('./input.txt', 'utf8');

// parse dimensions (l, w, h) for each line

const captureLWH = /(\d+)x(\d+)x(\d+)/g

// write regex to get iterator for getting  `lxwxh` groups
const inputIterator = input.matchAll(captureLWH);

// requiredRibbon starts with 0, add all required ribbon in loop
let requiredRibbon = 0

for (const match of inputIterator) {
  const [, stringifiedW, stringifiedL, stringifiedH] = match
  const w = parseFloat(stringifiedW)
  const l = parseFloat(stringifiedL)
  const h = parseFloat(stringifiedH)
  console.log(w, l, h)
  requiredRibbon += getRequiredRibbonForASingleBox({w, l, h})

}

function getRibbonRequiredToWrapPresent({w, h, l}: {
  w: number,
  h: number,
  l: number
}): number {
  const wh = 2 * w + 2 * h
  const hl = 2 * h + 2 * l
  const lw = 2 * l + 2 * w
  return Math.min(wh, hl, lw)
}

function getRequiredRibbonForASingleBox({w, h, l}: {
  w: number,
  h: number,
  l: number
}) {
  return h * w * l + getRibbonRequiredToWrapPresent({w, l, h})
}

console.log('requiredPaper', requiredRibbon)

