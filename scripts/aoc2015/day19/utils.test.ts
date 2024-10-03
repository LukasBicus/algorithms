import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  generateMolecules,
  parseInput,
  parseReplacementLine,
  replaceOccurrenceAtPosition,
} from "./utils.ts";

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

describe("generateMolecules", function () {
  it("should return empty array, if there is no match for replacement", function () {
    assertEquals(
      generateMolecules("HOH", {
        from: "x",
        to: "HO",
      }),
      [],
    );
  });
  it("should generate array of molecules for replacement", function () {
    assertEquals(
      generateMolecules("HOH", {
        from: "H",
        to: "HO",
      }),
      [
        "HOOH",
        "HOHO",
      ],
    );
  });
});

describe("replaceNthOccurrence", function () {
  it("should replace first occurrence", function () {
    assertEquals(
      replaceOccurrenceAtPosition("HOHOHO", {
        from: "H",
        to: "X",
      }, 0),
      "XOHOHO",
    );
  });
  it("should replace second occurrence", function () {
    assertEquals(
      replaceOccurrenceAtPosition("HOHOHO", {
        from: "H",
        to: "X",
      }, 1),
      "HOXOHO",
    );
  });
  it("should replace third occurrence", function () {
    assertEquals(
      replaceOccurrenceAtPosition("HOHOHO", {
        from: "H",
        to: "X",
      }, 2),
      "HOHOXO",
    );
  });
  it("should not replace non-existing fourth occurrence", function () {
    assertEquals(
      replaceOccurrenceAtPosition("HOHOHO", {
        from: "H",
        to: "X",
      }, 3),
      "HOHOHO",
    );
  });
});
