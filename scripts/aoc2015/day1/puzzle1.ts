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
// current stage - starts with zero, ends with final stage
let currentStage = 0;

// read instruction one by one
for (const instruction of navigationInstructions) {
  // in each iteration, adjust current stage
  if (instruction === UP) {
    currentStage += 1;
  } else if (instruction === DOWN) {
    currentStage -= 1;
  }
}

// echo final instruction at the end
console.log("currentStage: ", currentStage);
