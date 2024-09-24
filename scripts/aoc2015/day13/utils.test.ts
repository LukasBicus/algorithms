import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { parseRelationLine } from "./utils.ts";

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
