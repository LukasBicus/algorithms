import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { parseReplacementLine } from "./utils.ts";

describe("parseReplacementLine", function () {
  it("should return null for invalid line", function () {
    assertEquals(parseReplacementLine("invalid line"), null);
  });

  it("should return replacement for valid line", function () {
    assertEquals(parseReplacementLine("F => CaF"), {
      from: "F",
      to: "CaF",
    });
    assertEquals(parseReplacementLine("Mg => TiMg"), {
      from: "Mg",
      to: "TiMg",
    });
  });
});
