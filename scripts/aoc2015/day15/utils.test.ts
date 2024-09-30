import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import {
  computeScore,
  generateCombinationWithRepetition,
  parseIngredientLine,
} from "./utils.ts";

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

describe("generateCombinationWithRepetition", function () {
  it("should provide 1 result for n = 0", function () {
    const generator = generateCombinationWithRepetition(
      ["blue", "brown", "black"],
      0,
    );
    const result = generator.next();
    assertEquals(result.value, {
      blue: 0,
      brown: 0,
      black: 0,
    });
  });

  it("should provide 1 result for names with length 1", function () {
    const generator = generateCombinationWithRepetition(
      ["blue"],
      100,
    );
    const result = generator.next();
    assertEquals(result.value, {
      blue: 100,
    });
  });

  it("should provide 3 results for names with length 2", function () {
    const expectedResults = [{
      blue: 0,
      red: 2,
    }, {
      blue: 1,
      red: 1,
    }, {
      blue: 2,
      red: 0,
    }];
    assertEquals([...generateCombinationWithRepetition(
      ["blue", "red"],
      2,
    )], expectedResults);
  });

  it("should provide 6 results for names with length 3", function () {
    const expectedResults = [{
      blue: 0,
      red: 0,
      green: 2,
    }, {
      blue: 0,
      red: 1,
      green: 1,
    }, {
      blue: 0,
      red: 2,
      green: 0,
    }, {
      blue: 1,
      red: 0,
      green: 1,
    }, {
      blue: 1,
      red: 1,
      green: 0,
    }, {
      blue: 2,
      red: 0,
      green: 0,
    }];
    assertEquals([...generateCombinationWithRepetition(
      ["blue", "red", "green"],
      2,
    )], expectedResults);
  });
});
