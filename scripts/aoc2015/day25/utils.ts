type Position = {
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
