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
  const { name, ...sueWithoutName } = sue;
  for (const [name, value] of Object.entries(sueWithoutName)) {
    if (
      referenceSue[
        name as (
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
      ] !== value
    ) {
      return false;
    }
  }
  return true;
}

/*
some of values indicate ranges.
cats and trees readings indicates that there are greater than that many
pomeranians and goldfish readings indicate that there are fewer than that many

 */

export function checkSue2(sue: Partial<Sue>, referenceSue: Sue): boolean {
  const { name, ...sueWithoutName } = sue;
  for (const [name, value] of Object.entries(sueWithoutName)) {
    switch (name) {
      case "pomeranians":
      case "goldfish":
        if (referenceSue[name] <= value) {
          return false;
        }
        break;
      case "cats":
      case "trees":
        if (referenceSue[name] >= value) {
          return false;
        }
        break;
      case "children":
      case "samoyeds":
      case "akitas":
      case "vizslas":
      case "cars":
      case "perfumes":
        if (referenceSue[name] !== value) {
          return false;
        }
        break;
      default:
    }
  }
  return true;
}
