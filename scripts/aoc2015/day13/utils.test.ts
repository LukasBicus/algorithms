import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { Neighbor } from "./types.ts";
import {
  AllRelations,
  getCombinationsBehindTable,
  getHappinessForSetup,
  parseRelationLine,
} from "./utils.ts";

describe("parseRelationLine", function () {
  it("should return empty object for empty line", function () {
    assertEquals(parseRelationLine(""), {});
  });
  it("should return empty object for invalid  line", function () {
    assertEquals(parseRelationLine("abc"), {});
  });
  it("should parse gain line", function () {
    assertEquals(
      parseRelationLine(
        "David would gain 46 happiness units by sitting next to Alice.",
      ),
      {
        David: {
          Alice: 46,
        },
      },
    );
  });
  it("should parse lose line", function () {
    assertEquals(
      parseRelationLine(
        "David would lose 7 happiness units by sitting next to Bob.",
      ),
      {
        David: {
          Bob: -7,
        },
      },
    );
  });
});

describe("getHappinessForSetup", function () {
  const allRelations: AllRelations = {
    [Neighbor.Alice]: {
      [Neighbor.Bob]: 54,
      [Neighbor.Carol]: -79,
      [Neighbor.David]: -2,
    },
    [Neighbor.Bob]: {
      [Neighbor.Alice]: 83,
      [Neighbor.Carol]: -7,
      [Neighbor.David]: -63,
    },
    [Neighbor.Carol]: {
      [Neighbor.Alice]: -62,
      [Neighbor.Bob]: 60,
      [Neighbor.David]: 55,
    },
    [Neighbor.David]: {
      [Neighbor.Alice]: 46,
      [Neighbor.Bob]: -7,
      [Neighbor.Carol]: 41,
    },
  };
  it("should return 0 for empty setup", function () {});
  it("should return 0 for empty setup", function () {
    assertEquals(
      getHappinessForSetup([
        Neighbor.Alice,
        Neighbor.Bob,
        Neighbor.Carol,
        Neighbor.David,
      ], allRelations),
      330,
    );
  });
});

describe("getCombinationsBehindTable", function () {
  it("Should return empty array of results, when there are no items", function () {
    assertEquals(getCombinationsBehindTable(new Set<string>()), [[]]);
  });
  it("Should return one combination, when there there is less then 4 items", function () {
    assertEquals(getCombinationsBehindTable(new Set<string>(["a"])), [["a"]]);
    assertEquals(getCombinationsBehindTable(new Set<string>(["a", "b"])), [[
      "a",
      "b",
    ]]);
    assertEquals(getCombinationsBehindTable(new Set<string>(["a", "b", "c"])), [
      ["a", "b", "c"],
      ["a", "c", "b"],
    ]);
  });
  it("Should return 6 combinations, when there there are 4 items", function () {
    assertEquals(
      getCombinationsBehindTable(new Set<string>(["a", "b", "c", "d"])).length,
      6,
    );
  });
  it("Should return 24 combinations, when there there are 5 items", function () {
    assertEquals(
      getCombinationsBehindTable(new Set<string>(["a", "b", "c", "d", "e"]))
        .length,
      24,
    );
  });
});
