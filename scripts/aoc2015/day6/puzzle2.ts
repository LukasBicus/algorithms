
import fs from "node:fs";
import readline from "node:readline";

// definitions

// a grid of lights
// - each light will be looked by a position: [x, y] tupple
// - each light is an non-negative integer - intensity of light can be 0, 1, 2, ...
// - starting position is 0

export enum LightState {
  TurnedOff = 'turnedOff',
  TurnedOn = 'turnedOn',
}

const grid = new Map<string, number>()

export type Position = {
  x: number
  y: number
}

export function getGridKey(pos: Position) {
  return `${pos.x}-${pos.y}`;
}

// fill starting grid
export function setupGrid(grid: Map<string, number>) {
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      grid.set(getGridKey({x: i, y: j}), 0)
    }
  }
}

// instructions
// examples:
// turn on 0,0 through 999,999
// toggle 0,0 through 999,0
// turn off 499,499 through 500,500

// <<action>> <<startX>>,<<startY>> through <<endX>>,<<endY>>


// algorithm

// utils
// get data from instruction

export enum Action {
  TurnOn = 'turn on',
  TurnOff = 'turn off',
  Toggle = 'toggle'
}

type Instruction = {
  action: Action
  startX: number
  startY: number
  endX: number
  endY: number
}

const instructionRegex = /(turn on|toggle|turn off) (\d+),(\d+) through (\d+),(\d+)/

export function parseInstruction(instruction: string): Instruction | null {
// turn on 0,0 through 999,999
// toggle 0,0 through 999,0
// turn off 499,499 through 500,500

// <<action>> <<startX>>,<<startY>> through <<endX>>,<<endY>>
  const match = instruction.match(instructionRegex)
  if (match) {
    return {
      action: match[1] as Action,
      startX: parseInt(match[2], 10),
      startY: parseInt(match[3], 10),
      endX: parseInt(match[4], 10),
      endY: parseInt(match[5], 10),
    }
  }
  return null
}

// perform action on position(s)

export function performAction(grid: Map<string, number>, instruction: Instruction): Map<string, number> {
  // todo:  change perform action
  // on turn off, decrease intensity down to zero
  // on turn on, increase intensity by one
  // on toggle, increase intensity by two
  for (let x = instruction.startX; x <= instruction.endX; x++) {
    for (let y = instruction.startY; y <= instruction.endY; y++) {
      const key = getGridKey({x, y})
      const currentValue = grid.get(key) || 0
      switch (instruction.action) {
        case Action.TurnOff:
          grid.set(key, currentValue < 1 ? 0 : currentValue - 1)
          break;
        case Action.TurnOn:
          grid.set(key, currentValue + 1)
          break;
        case Action.Toggle:
          grid.set(key, currentValue + 2)
          break;
      }
    }
  }
  return grid
}


// define grid

setupGrid(grid)

function processLine(line: string) {
  const instruction = parseInstruction(line)
  if (instruction) {
    // console.log(instruction)
    performAction(grid, instruction)
  } else {
    console.error(line)
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

readFile('./input.txt', processLine).then(() => {
  let brightness = 0
  for (const value of grid.values()) {
    brightness += value
  }
  console.log('Done!', brightness)
})
// read instructions one by one in a loop
//    mutate grid based on instruction
// once loop finishes, iterate grid and get count of turned on lights

// question: What is the total brightness of all lights combined after following Santa's instructions?