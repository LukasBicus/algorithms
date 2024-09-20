import { assertEquals } from "jsr:@std/assert@1";
import { describe, it } from "@std/testing/bdd";
import { splitTextToGroups } from "./utils.ts";

describe("splitTextToGroups", () => {
  it("Should return empty array for empty string", function () {
    assertEquals(splitTextToGroups(""), []);
  });
  it('Should return ["1"] for string "1"', function () {
    assertEquals(splitTextToGroups("1"), ["1"]);
  });
  it('Should return ["11"] for string "11"', function () {
    assertEquals(splitTextToGroups("11"), ["11"]);
  });
  it('Should return ["2", "1"] for string "21"', function () {
    assertEquals(splitTextToGroups("21"), ["2", "1"]);
  });
  it('Should return ["1", "2", "11"] for string "1211"', function () {
    assertEquals(splitTextToGroups("1211"), ["1", "2", "11"]);
  });
  it('Should return ["111", "22", "1"] for string "111221"', function () {
    assertEquals(splitTextToGroups("111221"), ["111", "22", "1"]);
  });
});
