export type Ingredient = {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

const ingredientRegex =
  /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;

export function parseIngredientLine(line: string): Ingredient | null {
  const match = line.match(ingredientRegex);
  if (match) {
    return {
      name: match[1],
      capacity: parseInt(match[2], 10),
      durability: parseInt(match[3], 10),
      flavor: parseInt(match[4], 10),
      texture: parseInt(match[5], 10),
      calories: parseInt(match[6], 10),
    };
  }
  return null;
}

type RecipeProperties = {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
};

export function computeScore(
  combination: Record<string, number>,
  ingredients: Record<string, Ingredient>,
): number {
  const ingredientNames = Object.keys(combination);
  ingredientNames.forEach((name) => {
    if (!ingredients[name]) {
      throw new Error("Missing ingredient " + name);
    }
  });
  const recipeProperties: RecipeProperties = {
    capacity: 0,
    durability: 0,
    flavor: 0,
    texture: 0,
  };
  for (
    const property of [
      "capacity",
      "durability",
      "flavor",
      "texture",
    ]
  ) {
    let value = 0;
    for (const [name, spoonsCount] of Object.entries(combination)) {
      const ingredient = ingredients[name];
      value = value + spoonsCount * (ingredient[
            property as keyof RecipeProperties
          ]);
    }
    if (value <= 0) {
      return 0;
    }
    recipeProperties[property as keyof RecipeProperties] = value;
  }
  return recipeProperties.flavor * recipeProperties.texture *
    recipeProperties.capacity * recipeProperties.durability;
}
