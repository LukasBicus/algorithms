import fs from "node:fs";
import readline from "node:readline";
import {
  LightState,
  parseInstruction,
  performAction,
  setupGrid,
} from "./utils.ts";

const grid = setupGrid();

function processLine(line: string) {
  const instruction = parseInstruction(line);
  if (instruction) {
    // console.log(instruction)
    performAction(grid, instruction);
  } else {
    console.error(line);
  }
}

function readFile(
  path: string,
  processLine: (line: string) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(path, {
      encoding: "utf8",
      highWaterMark: 1024, // Adjust the buffer size if needed
    });

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity, // Recognize all instances of CR LF ('\r\n') as a single line break
    });

    rl.on("line", processLine);

    rl.on("close", resolve);
  });
}

readFile("./input.txt", processLine).then(() => {
  let count = 0;
  for (const value of grid.values()) {
    if (value === LightState.TurnedOn) {
      count++;
    }
  }
  console.log("Done!", count);
});
