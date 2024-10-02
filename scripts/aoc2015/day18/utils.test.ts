import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  fillGrid,
  getNeighboursPositions,
  LightGrid,
  LightState,
  performStep,
} from "./utils.ts";

describe("getNeighboursPositions", () => {
  it("should return position for {x: 1, y:2}", function () {
    assertEquals(getNeighboursPositions({ x: 1, y: 2 }, 6), [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
    ]);
  });

  it("should return position for {x: 0, y: 3}", function () {
    assertEquals(getNeighboursPositions({ x: 0, y: 3 }, 6), [
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 0, y: 4 },
      { x: 1, y: 4 },
    ]);
  });

  it("should return position for {x: 3, y: 0}", function () {
    assertEquals(getNeighboursPositions({ x: 3, y: 0 }, 6), [
      { x: 2, y: 0 },
      { x: 4, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
    ]);
  });
});

describe("fillGrid", function () {
  it("should fill simpleGrid", function () {
    const expectedGrid: LightGrid = new Map();
    expectedGrid.set("0-0", LightState.TurnedOff);
    expectedGrid.set("0-1", LightState.TurnedOff);
    expectedGrid.set("1-0", LightState.TurnedOn);
    expectedGrid.set("1-1", LightState.TurnedOff);
    assertEquals(
      fillGrid(`.#
..`),
      {
        grid: expectedGrid,
        size: 2,
      },
    );
  });
});

describe("performStep", function () {
  it("should perform step", function () {
    const { grid: initialGrid, size } = fillGrid(`.#.#.#
...##.
#....#
..#...
#.#..#
####..`);
    const { grid: expectedGrid } = fillGrid(`..##..
..##.#
...##.
......
#.....
#.##..`);
    assertEquals(performStep(initialGrid, size), expectedGrid);
  });
});
