import { readFileSync } from "node:fs";

// how many houses will get at least one present??
// possible moves <, >, v, ^

enum Move {
  East = ">",
  West = "<",
  South = "v",
  North = "^",
}

type Position = {
  x: number;
  y: number;
};

// start
// start position [x, y] = [0, 0]

let startPosition: Position = { x: 0, y: 0 };
// lets store gifts count in a set
const givenGifts = new Map<string, number>();

const getKeyFromPosition = (pos: Position) => `${pos.x}-${pos.y}`;

const giveAGiftOnPosition = (pos: Position) => {
  // get key
  const key = getKeyFromPosition(pos);
  // check current count of gifts on position
  const giftsCount = givenGifts.get(key);
  if (giftsCount) {
    // if defined, increase by 1
    givenGifts.set(key, giftsCount + 1);
  } else {
    // if undefined, set to 1
    givenGifts.set(key, 1);
  }
};

// give a gift on starting position
giveAGiftOnPosition(startPosition);

// key - compute from current position, if not defined, set to 1, otherwise increase by 1
// value - number of gifts

const changePosition = (
  currentPosition: Position,
  instruction: Move,
): Position => {
  switch (instruction) {
    case Move.East:
      // for > [x + 1, y]
      return { x: currentPosition.x + 1, y: currentPosition.y };
    case Move.West:
      // for < [x - 1, y]
      return { x: currentPosition.x - 1, y: currentPosition.y };
    case Move.South:
      // for ^ [x, y + 1]
      return { x: currentPosition.x, y: currentPosition.y - 1 };
    case Move.North:
      // for v [x, y - 1]
      return { x: currentPosition.x, y: currentPosition.y + 1 };
    default:
      throw new Error("Unexpected instruction: " + instruction);
  }
};

const instructions = readFileSync("./input.txt", "utf8");

let position: Position = startPosition;
// every move
// read instruction
for (const instruction of instructions) {
  // console.log('instruction', instruction);
  // change position
  position = changePosition(position, instruction as Move);
  // give a gift
  giveAGiftOnPosition(position);
}

console.log(givenGifts.size);

// give a gift on current position

// at the end of cycle, count of items in set is count of houses with at least one gift
