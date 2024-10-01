import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { checkSue, checkSue2, parseSue, Sue } from "./utils.ts";

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

describe("checkSue", function () {
  const referenceSue: Sue = {
    name: "MFCSAM Sue",
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };
  it("should return false when there is no match", function () {
    assertEquals(
      checkSue({
        name: "Sue 8",
        pomeranians: 7,
        goldfish: 8,
        cars: 10,
      }, referenceSue),
      false,
    );
  });
  it("should return false when there is no match", function () {
    assertEquals(
      checkSue({
        name: "Sue X",
        goldfish: 5,
        trees: 3,
        cars: 2,
      }, referenceSue),
      true,
    );
  });
});

describe("checkSue2", function () {
  const referenceSue: Sue = {
    name: "MFCSAM Sue",
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };
  it("should return false when there is no match", function () {
    assertEquals(
      checkSue2({
        name: "Sue 8",
        pomeranians: 7,
        goldfish: 8,
        cars: 10,
      }, referenceSue),
      false,
    );
  });
  it("should return false when there is no match", function () {
    assertEquals(
      checkSue2({
        name: "Sue X",
        trees: 5,
        cats: 8,
        cars: 2,
        pomeranians: 2,
        goldfish: 4,
      }, referenceSue),
      true,
    );
  });
});
