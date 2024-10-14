export type Position = {
  x: number;
  y: number;
};

// y/x
// y0, x0, x1, x3, ...
// y1
// y2
// y3
// ...

// counter is 0; i is 0
// {0, 0}

// counter is 1; i loops 0..1
// {1, 0}
// {0, 1}

// counter is 2; i loops 0..2
// {2, 0}
// {1, 1}
// {0, 2}

export function* getPosition(finalPosition: Position): Generator<Position> {
  let counter = 0;
  let position: Position;
  do {
    for (let i = 0; i <= counter; ++i) {
      position = { x: i, y: counter - i };
      yield position;
      if (position.x === finalPosition.x && position.y === finalPosition.y) {
        return;
      }
    }
    counter++;
  } while (
    true
  );
}

export function getNextCode(prevCode: number): number {
  return (prevCode * 252533) % 33554393;
}

export function getCodeOnInputPosition(
  finalPosition: Position,
  initialCode: number,
): number {
  // loop positions till final position
  let prevCode: number = initialCode;
  for (const position of getPosition(finalPosition)) {
    // if position is 0, 0,
    if (position.x === 0 && position.y === 0) {
      //    store initialCOde to prevCode
      prevCode = initialCode;
      if (position.x === finalPosition.x && position.y === finalPosition.y) {
        //    if final position is 0, 0 return initialCode
        return initialCode;
      }
    } else {
      // else
      // for new position, compute code
      const nextCode = getNextCode(prevCode);
      if (position.x === finalPosition.x && position.y === finalPosition.y) {
        // if it is final Position, return it
        return nextCode;
      } else {
        // if not store it to prev code
        prevCode = nextCode;
      }
    }
  }
  return 0;
}
