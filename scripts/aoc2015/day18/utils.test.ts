import { assertEquals } from "https://jsr.io/@std/assert/1.0.2/equals.ts";
import { describe, it } from "https://jsr.io/@std/testing/1.0.0/bdd.ts";
import { getNeighboursPositions } from "./utils.ts";

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
