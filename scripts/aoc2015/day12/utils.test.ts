import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { getNumbersFromText, sumNumbersOfObject } from "./utils.ts";

describe("getNumbersFromText", () => {
  it("should return empty array if text has no digits", function () {
    assertEquals(getNumbersFromText("abc"), []);
  });
  it("should return array of numbers for text with numbers", function () {
    assertEquals(getNumbersFromText("[1,-2,3]"), [1, -2, 3]);
    assertEquals(getNumbersFromText(`{"a":2,"b":4}`), [2, 4]);
    assertEquals(getNumbersFromText("[[[3]]]"), [3]);
    assertEquals(getNumbersFromText(`{"a":{"b":4},"c":-1}`), [4, -1]);
    assertEquals(getNumbersFromText(`{"a":[-1,1]}`), [-1, 1]);
    assertEquals(getNumbersFromText(`[-1,{"a":1}]`), [-1, 1]);
  });
});

describe("sumNumbersOfObject", () => {
  it("should return 0 for empty object", function () {
    assertEquals(sumNumbersOfObject({}), 0);
  });
  it("should return 3 for non-empty object", function () {
    assertEquals(
      sumNumbersOfObject({
        a: 1,
        b: 2,
      }),
      3,
    );
  });

  it("should return count for object with array", function () {
    assertEquals(
      sumNumbersOfObject({
        a: [1, 2],
      }),
      3,
    );
  });
  it("should return 0 for object with 'red' value", function () {
    assertEquals(
      sumNumbersOfObject({
        a: 3,
        b: "red",
      }),
      0,
    );
  });
  it("should return count for nested objects", function () {
    assertEquals(
      sumNumbersOfObject({
        a: {
          aa: 1,
          ab: 2,
        },
      }),
      3,
    );
  });
  it("should return count for objects nested in arrays", function () {
    assertEquals(
      sumNumbersOfObject({
        a: [1, 2, {
          aa: 1,
          ab: 2,
        }],
      }),
      6,
    );
  });
});
