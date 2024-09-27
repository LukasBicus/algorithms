import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { computeScore, parseIngredientLine } from "./utils.ts";

describe("parseIngredientLine", function () {
  it("should return null for invalid line", function () {
    assertEquals(parseIngredientLine("abc"), null);
  });
  it("should return ingredient for valid line", function () {
    assertEquals(
      parseIngredientLine(
        "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8",
      ),
      {
        name: "Butterscotch",
        capacity: -1,
        durability: -2,
        flavor: 6,
        texture: 3,
        calories: 8,
      },
    );
  });

  it("should return ingredient for more complex valid line", function () {
    assertEquals(
      parseIngredientLine(
        "Butterscotch: capacity -19, durability -2, flavor 64, texture 3, calories 8",
      ),
      {
        name: "Butterscotch",
        capacity: -19,
        durability: -2,
        flavor: 64,
        texture: 3,
        calories: 8,
      },
    );
  });
});

describe("computeScore", function () {
  const ingredients = {
    Butterscotch: {
      name: "Butterscotch",
      capacity: -1,
      durability: -2,
      flavor: 6,
      texture: 3,
      calories: 8,
    },
    Cinnamon: {
      name: "Cinnamon",
      capacity: 2,
      durability: 3,
      flavor: -2,
      texture: -1,
      calories: 3,
    },
  };
  it("should throw error, when ingredient is not found", function () {
    assertThrows(() =>
      computeScore({
        Butterscotch: 1,
      }, {})
    );
  });
  it("should return 0, when an property for combination of ingredients is negative", function () {
    assertEquals(
      computeScore({
        Butterscotch: 1,
      }, ingredients),
      0,
    );
  });
  it("should return a value for combination of ingredients", function () {
    assertEquals(
      computeScore({
        Butterscotch: 44,
        Cinnamon: 56,
      }, ingredients),
      62842880,
    );
  });
});
