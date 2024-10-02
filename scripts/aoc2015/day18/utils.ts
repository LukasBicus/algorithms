export type Position = {
  x: number;
  y: number;
};

export enum LightState {
  TurnedOff = "turnedOff",
  TurnedOn = "turnedOn",
}

// starts with "0-0"
// for grid with size 100 ends with "99-99"
export type LightGrid = Map<string, LightState>;

// get neighbours function (position - position of a light in a grid)
// gets positions all neighbours of a light in a grid
export function getNeighboursPositions(
  pos: Position,
  gridSize: number,
): Position[] {
  if (pos.x < 0 || pos.x >= gridSize || pos.y < 0 || pos.y >= gridSize) {
    throw new Error("Position is not in grid");
  }
  const positions: Position[] = [];
  for (const y of [pos.y - 1, pos.y, pos.y + 1]) {
    if (y >= 0 && y < gridSize) {
      for (const x of [pos.x - 1, pos.x, pos.x + 1]) {
        if (x >= 0 && x < gridSize) {
          if (!(x === pos.x && y === pos.y)) {
            positions.push({ x, y });
          }
        }
      }
    }
  }
  return positions;
}

export function getGridKey(pos: Position) {
  return `${pos.x}-${pos.y}`;
}

export function getPositionFromKey(key: string): Position {
  const [x, y] = key.split("-");
  return {
    x: parseInt(x, 10),
    y: parseInt(y, 10),
  };
}

// fill a grid of 100x100
// A # means "on", and a . means "off".
// a "\n" means new line in grid
export function fillGrid(input: string): { grid: LightGrid; size: number } {
  const grid: LightGrid = new Map();
  const lines = input.split("\n");
  const size = lines.length;
  for (const [y, line] of Object.entries(lines)) {
    for (const [x, char] of Object.entries(line)) {
      const key = getGridKey({
        x: parseInt(x, 10),
        y: parseInt(y, 10),
      });
      switch (char) {
        case ".":
          grid.set(
            key,
            LightState.TurnedOff,
          );
          break;
        case "#":
          grid.set(
            key,
            LightState.TurnedOn,
          );
          break;
        default:
          break;
      }
    }
  }
  return {
    grid,
    size,
  };
}
