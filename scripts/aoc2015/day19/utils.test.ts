import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { parseInput, parseReplacementLine } from "./utils.ts";

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

describe("parseInput", function () {
  it("should return null for invalid file", function () {
    assertEquals(parseInput("invalid input"), null);
  });
  it("should return data for valid file", function () {
    assertEquals(
      parseInput(`H => HO
H => OH
O => HH

HOH`),
      {
        replacements: [{
          from: "H",
          to: "HO",
        }, {
          from: "H",
          to: "OH",
        }, {
          from: "O",
          to: "HH",
        }],
        medicineMolecule: "HOH",
      },
    );
  });
});
