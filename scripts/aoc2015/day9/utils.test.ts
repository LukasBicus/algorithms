// import { assertEquals } from "jsr:@std/assert@1";
import { describe, it } from "@std/testing/bdd";

describe("utils", () => {
  describe('for set {"A"}', () => {
    it('Should return [["A"]] for empty currentArray', function () {});
    it('Should return [["X", "A"]] for currentArray ["X"]', function () {});
  });

  describe('for set {"A", "B"}', function () {
    it('Should return result with arrays ["A", "B"], ["B", "A"] for empty currentArray', function () {});
    it('Should return result with arrays ["X", "A", "B"], ["X", "B", "A"] for currentArray ["X"]', function () {});
  });

  describe('for set {"A", "B", "C"}', function () {
    it("Should return result with 6 arrays for empty currentArray", function () {});
    it('Should return result with 6 arrays for currentArray ["X"]', function () {});
  });
});
