import { readFileSync } from "node:fs";

// file with navigation instructions
const navigationInstructions = readFileSync("./input.txt", "utf8");
const demoNavigationInstructions = readFileSync(
  "./simplifiedInput.txt",
  "utf8",
);
// instruction up
const UP = "(";
// instruction down
const DOWN = ")";
// current stage - starts with zero, will be adjusted after every instruction
let currentStage = 0;

// index
let index = 1;
// starts with 1

// read instruction one by one
for (const instruction of navigationInstructions) {
  // in each iteration, adjust current stage
  if (instruction === UP) {
    currentStage += 1;
  } else if (instruction === DOWN) {
    currentStage -= 1;
  }
  // will be incremented after every instruction processed
  index += 1;
  // the procedure should finish, when currentStage falls bellow 0
  if (currentStage < 0) {
    console.log("descending into basement on step: ", index);
    break;
  }
}
