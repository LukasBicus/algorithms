import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { getNumbersFromText } from "./utils.ts";

describe("getNumbersFromText", () => {
  it("should return empty array if text has no digits", function () {
    assertEquals(getNumbersFromText("abc"), []);
  });
  it("should return array of numbers for text with numbers", function () {
    assertEquals(getNumbersFromText("[1,2,3]"), [1, 2, 3]);
    assertEquals(getNumbersFromText(`{"a":2,"b":4}`), [2, 4]);
    assertEquals(getNumbersFromText("[[[3]]]"), [3]);
    assertEquals(getNumbersFromText(`{"a":{"b":4},"c":-1}`), [4, -1]);
    assertEquals(getNumbersFromText(`{"a":[-1,1]}`), [-1, 1]);
    assertEquals(getNumbersFromText(`[-1,{"a":1}]`), [-1, 1]);
  });
});
