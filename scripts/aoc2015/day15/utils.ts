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
