import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { getCodeOnInputPosition, getNextCode, getPosition } from "./utils.ts";

describe("getPosition", function () {
  it("should return positions till { x: 1, y: 1 }", function () {
    const expectedPositions = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 2 },
      { x: 1, y: 1 },
    ];

    assertEquals([...getPosition({ x: 1, y: 1 })], expectedPositions);
  });
  it("should return positions till { x: 2, y: 3 }", function () {
    const expectedPositions = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 0, y: 3 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 0 },
      { x: 0, y: 4 },
      { x: 1, y: 3 },
      { x: 2, y: 2 },
      { x: 3, y: 1 },
      { x: 4, y: 0 },
      { x: 0, y: 5 },
      { x: 1, y: 4 },
      { x: 2, y: 3 },
    ];

    assertEquals([...getPosition({ x: 2, y: 3 })], expectedPositions);
  });
});

describe("getNextCode", function () {
  it("should return valid code", function () {
    assertEquals(getNextCode(20151125), 31916031);
  });
});

describe("getCodeOnInputPosition", function () {
  it("Should return code on position {x: 0, y: 0}", function () {
    assertEquals(getCodeOnInputPosition({ x: 0, y: 0 }, 20151125), 20151125);
  });
  it("Should return code on position {x: 2, y: 3}", function () {
    assertEquals(getCodeOnInputPosition({ x: 2, y: 3 }, 20151125), 21345942);
  });
});
