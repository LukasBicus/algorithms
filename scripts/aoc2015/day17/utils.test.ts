import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { parseContainerLine } from "./utils.ts";

describe("parseContainerLine", function () {
  it("should return null for invalid line", function () {
    assertEquals(parseContainerLine("invalid line"), null);
  });

  it("should return null for valid line", function () {
    assertEquals(parseContainerLine("5"), 5);
    assertEquals(parseContainerLine("25"), 25);
  });
});
