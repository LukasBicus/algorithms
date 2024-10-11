import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  getPackagesGroupsWithSmallestLengths,
  isThereACombinationOfPackagesWithGivenWeight,
} from "./utils.ts";

describe("getPackagesGroupsWithSmallestLengths", function () {
  it("should return one group for input", function () {
    const simpleInput = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
    assertEquals(getPackagesGroupsWithSmallestLengths(simpleInput), [[9, 11]]);
  });
});

describe("isThereACombinationOfPackagesWithGivenWeight", function () {
  it("should return true for valid combination", function () {
    assertEquals(
      isThereACombinationOfPackagesWithGivenWeight([1, 2, 3, 4], 7),
      true,
    );
    assertEquals(
      isThereACombinationOfPackagesWithGivenWeight([1, 2, 3, 4], 9),
      true,
    );
  });

  it("should return false for valid combination", function () {
    assertEquals(
      isThereACombinationOfPackagesWithGivenWeight([1, 5, 7, 9], 4),
      false,
    );
  });
});
