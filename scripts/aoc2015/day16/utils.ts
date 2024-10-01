export type Sue = {
  name: string;
  children: number;
  cats: number;
  samoyeds: number;
  pomeranians: number;
  akitas: number;
  vizslas: number;
  goldfish: number;
  trees: number;
  cars: number;
  perfumes: number;
};

const nameRegex = /(Sue \d+): /;
const thingRegex = /([a-z]+): (\d+)/g;

export function parseSue(line: string): Partial<Sue> | null {
  const nameMatch = line.match(nameRegex);
  const sue: Partial<Sue> = {};
  if (!nameMatch) {
    return null;
  }
  sue.name = nameMatch[1];
  const thingMatchIterator = line.matchAll(thingRegex);
  for (const thingMatch of thingMatchIterator) {
    if (
      [
        "children",
        "cats",
        "samoyeds",
        "pomeranians",
        "akitas",
        "vizslas",
        "goldfish",
        "trees",
        "cars",
        "perfumes",
      ].includes(
        thingMatch[1],
      )
    ) {
      sue[
        thingMatch[1] as (
          | "children"
          | "cats"
          | "samoyeds"
          | "pomeranians"
          | "akitas"
          | "vizslas"
          | "goldfish"
          | "trees"
          | "cars"
          | "perfumes"
        )
      ] = parseInt(thingMatch[2], 10);
    } else {
      return null;
    }
  }
  return sue;
}

export function checkSue(sue: Partial<Sue>, referenceSue: Sue): boolean {
  return false;
}
