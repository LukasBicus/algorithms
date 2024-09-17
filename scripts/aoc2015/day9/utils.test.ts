import { assertEquals, assertThrows } from "jsr:@std/assert@1";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { combine, getDistance } from "./utils.ts";

describe("combine", () => {
  describe('for set {"A"}', () => {
    const uncombinedValues = new Set(["A"]);
    it('Should return [["A"]] for empty currentArrays', function () {
      assertEquals(
        combine([[]], uncombinedValues),
        [["A"]],
      );
    });
    it('Should return [["X", "A"]] for currentArrays [["X"]]', function () {
      assertEquals(
        combine([["X"]], uncombinedValues),
        [["X", "A"]],
      );
    });
    it('Should add ["A"] to every array in currentArrays', function () {
      assertEquals(
        combine([["X", "Y"], ["Y", "X"]], uncombinedValues),
        [["X", "Y", "A"], ["Y", "X", "A"]],
      );
    });
  });

  describe('for set {"A", "B"}', function () {
    const uncombinedValues = new Set(["A", "B"]);
    it('Should return result with arrays ["A", "B"], ["B", "A"] for empty currentArrays', function () {
      assertEquals(combine([[]], uncombinedValues), [
        ["A", "B"],
        ["B", "A"],
      ]);
    });
    it('Should return result with arrays ["X", "A", "B"], ["X", "B", "A"] for currentArrays [["X"]]', function () {
      assertEquals(combine([["X"]], uncombinedValues), [
        ["X", "A", "B"],
        ["X", "B", "A"],
      ]);
    });

    it('Should add arrays ["A", "B"], ["B", "A"] to every array in currentArrays', function () {
      assertEquals(combine([["X", "Y"], ["Y", "X"]], uncombinedValues), [
        ["X", "Y", "A", "B"],
        ["X", "Y", "B", "A"],
        ["Y", "X", "A", "B"],
        ["Y", "X", "B", "A"],
      ]);
    });
  });

  describe('for set {"A", "B", "C"}', function () {
    const uncombinedValues = new Set(["A", "B", "C"]);
    it("Should return result with 6 arrays for empty currentArrays", function () {
      assertEquals(combine([[]], uncombinedValues), [
        ["A", "B", "C"],
        ["A", "C", "B"],
        ["B", "A", "C"],
        ["B", "C", "A"],
        ["C", "A", "B"],
        ["C", "B", "A"],
      ]);
    });
    it('Should return result with 6 arrays for currentArrays ["X"]', function () {
      assertEquals(combine([["X"]], uncombinedValues), [
        ["X", "A", "B", "C"],
        ["X", "A", "C", "B"],
        ["X", "B", "A", "C"],
        ["X", "B", "C", "A"],
        ["X", "C", "A", "B"],
        ["X", "C", "B", "A"],
      ]);
    });
  });
});

describe("getDistance", function () {
  const resolvedCombinations = new Map<string, number>();
  beforeEach(() => {
    resolvedCombinations.clear();
    resolvedCombinations.set("AB", 1);
    resolvedCombinations.set("BC", 2);
    resolvedCombinations.set("CD", 3);
    resolvedCombinations.set("DE", 4);
  });
  it("Should throw error for unresolvable combination", function () {
    assertThrows(() => {
      getDistance("XY", resolvedCombinations);
    });
  });
  it("Should resolve AB combination", function () {
    assertEquals(getDistance("AB", resolvedCombinations), 1);
  });
  it("Should resolve BA combination", function () {
    assertEquals(getDistance("BA", resolvedCombinations), 1);
    assertEquals(resolvedCombinations.get("BA"), 1);
  });
  it("Should resolve ABC combination", function () {
    assertEquals(getDistance("ABC", resolvedCombinations), 3);
    assertEquals(resolvedCombinations.get("ABC"), 3);
  });
  it("Should resolve CBA combination", function () {
    assertEquals(getDistance("CBA", resolvedCombinations), 3);
    assertEquals(resolvedCombinations.get("CB"), 2);
    assertEquals(resolvedCombinations.get("BA"), 1);
    assertEquals(resolvedCombinations.get("CBA"), 3);
  });
  it("Should resolve ABCDE combination", function () {
    assertEquals(getDistance("ABCDE", resolvedCombinations), 10);
    assertEquals(resolvedCombinations.get("CDE"), 7);
    assertEquals(resolvedCombinations.get("BCDE"), 9);
    assertEquals(resolvedCombinations.get("ABCDE"), 10);
  });
});
