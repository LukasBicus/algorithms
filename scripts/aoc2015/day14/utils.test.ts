import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { parseReindeerLine } from "./utils.ts";

describe("parseReindeerLine", function () {
  it("should return null for invalid line", function () {
    assertEquals(parseReindeerLine(""), null);
  });
  it("should return object for valid line", function () {
    assertEquals(
      parseReindeerLine(
        "Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.",
      ),
      {
        name: "Dancer",
        speed: 16,
        flyLimit: 11,
        restLimit: 162,
      },
    );
  });
});
