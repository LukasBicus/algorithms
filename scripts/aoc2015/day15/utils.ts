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

export function* generateCombinationWithRepetition(
  names: string[],
  n: number, // number of item types, you can choose from
): Generator<{
  [name: string]: number;
}> {
  // if n = 0
  if (n === 0) {
    // return { name[0]: 0, name[1]: 0, name[2]: 0, ...}
    return names.reduce((acc: {
      [name: string]: number;
    }, name) => ({
      ...acc,
      [name]: 0,
    }), {});
  }
  // if names length === 1
  if (names.length === 1) {
    // return {[names[0]]: n}
    return { [names[0]]: n };
  }

  // solve for count of names 2

  // run loop for i = 0 to n - 1
  // if i !== n -1
  // yield {name[0] = i; name[1] = n - i}
  // if i === n -1
  // return {name[0] = i; name[1] = n - i}

  // solve for count of names 3+
  // take one name X and iterate loop for i = 0 to n
  // if i !== n - 1
  // for (const partialCombination of (generateCombinationWithRepetition( {combinations without X}, n - 1 - i)))
  // yield {X: i, ...partialCombination}
  // if i === n - 1
  //
  // return {X: n - 1, ...
  // generateCombinationWithRepetition( {combinations without X field}, 0).next().value
  // }
}
