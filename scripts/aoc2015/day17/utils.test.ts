import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  generateCombinationsWithoutRepetition,
  parseContainerLine,
} from "./utils.ts";

describe("parseContainerLine", function () {
  it("should return null for invalid line", function () {
    assertEquals(parseContainerLine("invalid line"), null);
  });

  it("should return null for valid line", function () {
    assertEquals(parseContainerLine("5"), 5);
    assertEquals(parseContainerLine("25"), 25);
  });
});

describe("generateCombinationsWithoutRepetition", function () {
  it("should return an empty array, if length of input items is 0", function () {
    const generator = generateCombinationsWithoutRepetition([]);
    const result = generator.next();
    assertEquals(result, {
      value: [],
      done: false,
    });
  });

  it("should return 2 results, if length of input items is 1", function () {
    const expectedResult = [[], ["a"]];
    const result = [...generateCombinationsWithoutRepetition(["a"])];
    assertEquals(result, expectedResult);
  });

  it("should return 4 results, if length of input items is 2", function () {
    const expectedResult = [[], ["a"], ["b"], ["a", "b"]];
    const result = [...generateCombinationsWithoutRepetition(["a", "b"])];
    assertEquals(result, expectedResult);
  });

  it("should return 8 results, if length of input items is 3", function () {
    const expectedResult = [
      [],
      ["a"],
      ["b"],
      ["a", "b"],
      ["a", "c"],
      ["c"],
      ["b", "c"],
      ["a", "b", "c"],
    ];
    const result = [...generateCombinationsWithoutRepetition(["a", "b", "c"])];
    assertEquals(result, expectedResult);
  });
});
