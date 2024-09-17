import { assertEquals } from "jsr:@std/assert@1";
import { describe, it } from "@std/testing/bdd";
import { combine } from "./utils.ts";

describe("utils", () => {
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
    it("Should return result with 6 arrays for empty currentArrays", function () {});
    it('Should return result with 6 arrays for currentArrays ["X"]', function () {});
  });
});
