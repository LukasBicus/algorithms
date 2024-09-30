/*
--- Day 15: Science for Hungry People ---
Today, you set out on the task of perfecting your milk-dunking cookie recipe.
All you have to do is find the right balance of ingredients.

Your recipe leaves room for exactly 100 teaspoons of ingredients.
You make a list of the remaining ingredients you could use to finish the recipe (your puzzle input) and their properties per teaspoon:

capacity (how well it helps the cookie absorb milk)
durability (how well it keeps the cookie intact when full of milk)
flavor (how tasty it makes the cookie)
texture (how it improves the feel of the cookie)
calories (how many calories it adds to the cookie)
You can only measure ingredients in whole-teaspoon amounts accurately, and you have to be accurate so you can reproduce your results in the future. The total score of a cookie can be found by adding up each of the properties (negative totals become 0) and then multiplying together everything except calories.

For instance, suppose you have these two ingredients:

Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3
Then, choosing to use 44 teaspoons of butterscotch and 56 teaspoons of cinnamon (because the amounts of each ingredient must add up to 100) would result in a cookie with the following properties:

A capacity of 44*-1 + 56*2 = 68
A durability of 44*-2 + 56*3 = 80
A flavor of 44*6 + 56*-2 = 152
A texture of 44*3 + 56*-1 = 76
Multiplying these together (68 * 80 * 152 * 76, ignoring calories for now) results in a total score of 62842880, which happens to be the best score possible given these ingredients. If any properties had produced a negative total, it would have instead become zero, causing the whole score to multiply to zero.

Given the ingredients in your kitchen and their properties, what is the total score of the highest-scoring cookie you can make?

ALGORITHM

- read all ingredients from file
  - we will need a specific parseIngredient function for that

- make variations of 100 ingredients from all ingredients

- add score to each variation
  - take score for each of:
    capacity
    durability
    flavor
    texture
    if one of ingredients is bellow 0, total score is zero
    if all ingredients are above 0, total score is multiplying of those properties

- create a board of results
- add score of each variation to the board
- find one with best score
*/

// ALGORITHM II
//
//
// - read all ingredients from file
//   - we will need a specific parseIngredient function for that
import {
  computeScore,
  generateCombinationWithRepetition,
  Ingredient,
  parseIngredientLine,
} from "./utils.ts";

async function processFile(filename: string): Promise<void> {
  const input = await Deno.readTextFileSync(filename);
  const ingredients: Ingredient[] = [];
  for (const line of input.split("\n")) {
    const ingredient = parseIngredientLine(line);
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  console.log("ingredients", ingredients);
  // - make an iterator, that will provide you with next combination with repetition of 100 ingredients from all ingredients
  const generator = generateCombinationWithRepetition(
    ingredients.map((i) => i.name),
    100,
  );
  // - create a board of results
  const board: number[] = [];
  const ingredientsMap = ingredients.reduce(
    (acc: Record<string, Ingredient>, ingredient) => ({
      ...acc,
      [ingredient.name]: ingredient,
    }),
    {},
  );
  // - start to iterate, in each iteration, compute score.
  for (const combination of generator) {
    const scoreForCombination = computeScore(combination, ingredientsMap);
    // If score is above zero, add it to the board
    if (scoreForCombination) {
      board.push(scoreForCombination);
    }
  }
  // - find one with best score
  console.log("max score", Math.max(...board));
}

// expected score 62842880
processFile("./simpleInput.txt");
processFile("./input.txt");
