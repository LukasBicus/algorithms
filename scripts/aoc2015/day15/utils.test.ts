import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { parseIngredientLine } from "./utils.ts";

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
