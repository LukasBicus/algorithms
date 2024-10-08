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
    // yield { name[0]: 0, name[1]: 0, name[2]: 0, ...}
    yield names.reduce((acc: {
      [name: string]: number;
    }, name) => ({
      ...acc,
      [name]: 0,
    }), {});
    return;
  }
  // if names length === 1
  if (names.length === 1) {
    // yield {[names[0]]: n}
    yield { [names[0]]: n };
    return;
  }

  // solve for count of names 2
  if (names.length === 2) {
    // run loop for i = 0 to n
    for (let i = 0; i <= n; i++) {
      // yield {names[0] = i; names[1] = n - i}
      yield {
        [names[0]]: i,
        [names[1]]: n - i,
      };
    }
  }

  // solve for count of names 3+
  if (names.length > 2) {
    const firstName = names[0];
    const restNames = names.slice(1);
    // take one name X and iterate loop for i = 0 to n
    for (let i = 0; i <= n; i++) {
      // for (const partialCombination of (generateCombinationWithRepetition( {combinations without X}, n - 1 - i)))
      for (
        const partialCombination of generateCombinationWithRepetition(
          restNames,
          n - i,
        )
      ) {
        // yield {X: i, ...partialCombination}
        yield {
          [firstName]: i,
          ...partialCombination,
        };
      }
    }
  }
}

export function computeCalories(
  combination: Record<string, number>,
  ingredients: Record<string, Ingredient>,
): number {
  return Object.entries(combination).reduce(
    (acc, [name, spoons]) => acc + spoons * ingredients[name].calories,
    0,
  );
}
