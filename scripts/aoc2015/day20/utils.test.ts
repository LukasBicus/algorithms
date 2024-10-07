import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  findNumberOfGiftsForHouseNumber,
  findNumberOfGiftsForHouseNumberForPuzzle2,
  getDivisors,
} from "./utils.ts";

describe("findNumberOfGiftsForHouseNumber", function () {
  it("should compute proper presents count for house with number 1", function () {
    assertEquals(findNumberOfGiftsForHouseNumber(1), 10);
  });
  it("should compute proper presents count for house with number 120", function () {
    assertEquals(findNumberOfGiftsForHouseNumber(120), 3600);
  });
});

describe("getDivisors", function () {
  it("should get divisors of 1", function () {
    assertEquals(getDivisors(1), [1]);
  });
  it("should get divisors of 6", function () {
    assertEquals(getDivisors(6), [1, 2, 3, 6]);
  });
  it("should get divisors of 120", function () {
    assertEquals(getDivisors(40), [1, 2, 4, 5, 8, 10, 20, 40]);
  });

  it("should get divisors of 81", function () {
    assertEquals(getDivisors(81), [1, 3, 9, 27, 81]);
  });
});

describe("findNumberOfGiftsForHouseNumberForPuzzle2", function () {
  it("should compute proper presents count for house with number 1", function () {
    assertEquals(findNumberOfGiftsForHouseNumberForPuzzle2(1), 11);
  });

  it("should compute proper presents count for house with number 2", function () {
    assertEquals(findNumberOfGiftsForHouseNumberForPuzzle2(2), 33);
  });

  it("should compute proper presents count for house with number 6", function () {
    // 1, 2, 3, 6
    assertEquals(findNumberOfGiftsForHouseNumberForPuzzle2(6), 12 * 11);
  });

  it("should compute proper presents count for house with number 51", function () {
    const divisors = getDivisors(51);
    const elfNumbersWithoutFirst = divisors.slice(1);
    assertEquals(
      findNumberOfGiftsForHouseNumberForPuzzle2(51),
      elfNumbersWithoutFirst.reduce((acc, divisor) => acc + divisor, 0) * 11,
    );
  });
  it("should compute proper presents count for house with number 100", function () {
    const divisors = getDivisors(100);
    const elfNumbersWithoutFirst = divisors.slice(1);
    assertEquals(
      findNumberOfGiftsForHouseNumberForPuzzle2(100),
      elfNumbersWithoutFirst.reduce((acc, divisor) => acc + divisor, 0) * 11,
    );
  });
  it("should compute proper presents count for house with number 102", function () {
    const divisors = getDivisors(102);
    const elfNumbersWithoutFirstTwo = divisors.slice(2);
    assertEquals(
      findNumberOfGiftsForHouseNumberForPuzzle2(102),
      elfNumbersWithoutFirstTwo.reduce((acc, divisor) => acc + divisor, 0) * 11,
    );
  });
});
