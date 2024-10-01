import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { parseSue, Sue } from "./utils.ts";

describe("parseSue", () => {
  it("should return null for invalid line", function () {
    assertEquals(parseSue("invalid line"), null);
  });
  it("should return a Sue for valid line", function () {
    assertEquals(
      parseSue("Sue 7: pomeranians: 5, samoyeds: 0, perfumes: 10"),
      {
        name: "Sue 7",
        pomeranians: 5,
        samoyeds: 0,
        perfumes: 10,
      } as Partial<Sue>,
    );
    assertEquals(
      parseSue("Sue 8: cars: 10, pomeranians: 7, goldfish: 8"),
      {
        name: "Sue 8",
        pomeranians: 7,
        goldfish: 8,
        cars: 10,
      } as Partial<Sue>,
    );
  });
});
