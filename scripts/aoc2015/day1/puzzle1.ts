import { readFileSync } from 'node:fs';

const content = readFileSync("./input.txt", "utf8");

console.log('content', content);

// file with navigation instructions
// instruction up
// instruction down
// current stage - starts with zero, ends with final stage

// read instruction one by one
  // in each iteration, adjust current stage

// echo final instruction at the end


