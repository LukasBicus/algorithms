/*
CASE 1:
Input:
{A}
Result:
[[A]]

CASE 2:
Input:
{A, B}
Partial
[
...[[A] + combine{B} ]
...[[B] + combine{A} ]
]
Result:
[[A, B], [B, A]]

CASE 3:
Input:
{A, B, C}

Partial:
[
...[[A] + combine({B, C})]
...[[B] + combine({A, C})]
...[[C] + combine({A, B})]
]
Result:
[
  [A, B, C],
  [A, C, B],
  [B, A, C],
  [B, C, A],
  [C, A, B],
  [C, B, A],
]
 */

import { Cities } from "./types.ts";

export function combine<T>(
  currentArrays: T[][],
  uncombinedValues: Set<T>,
): T[][] {
  if (uncombinedValues.size === 0) {
    return currentArrays;
  }
  if (uncombinedValues.size === 1) {
    // return currentArray.concat(Array.from(uncombinedValues.values()));
    return currentArrays.map((currentArray) =>
      currentArray.concat(Array.from(uncombinedValues))
    );
  }
  // uncombinedValues.size
  // for each currentArray in currentArrays
  return currentArrays.reduce((acc: T[][], currentArray) => {
    // for each item in uncombined values
    for (const item of uncombinedValues) {
      // split uncombined values to item and rest values
      const newSet = new Set(uncombinedValues);
      newSet.delete(item);
      // create new current arrays => every current array + item
      const arrayWithItem = currentArray.concat([item]);
      // combine (new current arrays, rest values)
      const newArrays = combine([arrayWithItem], newSet);
      acc = acc.concat(newArrays);
    }
    return acc;
  }, []);
}

export function getPermutations<T>(set: Set<T>): T[][] {
  return combine([[]], set);
}

// getDistance(combination, resolvedCombinations) - recursive function
export function getDistance(
  combination: string,
  resolvedCombinations: Map<string, number>,
): number {
  // basic case ->
  // combination has 2 letters "AB" -> get length of "AB"
  if (resolvedCombinations.has(combination)) {
    return resolvedCombinations.get(combination) as number;
  }
  // combination is "BA" ->
  // -> get length of "BA" -> not found
  // -> reverse combination -> resolve as "BA", store in resolvedCombinations
  const reversedCombination = combination.split("").reverse().join("");
  if (resolvedCombinations.has(reversedCombination)) {
    const result = resolvedCombinations.get(reversedCombination) as number;
    resolvedCombinations.set(combination, result);
    return result;
  }
  // CASE B:
  // combination is "ABCDEF"
  // -> split to getDistance("AB") + getDistance("BCDEF")
  // -> store length of "ABCDEF" in resolvedCombinations
  if (combination.length > 2) {
    const startCombination = combination.slice(0, 2);
    const distanceOfStartCombination = getDistance(
      startCombination,
      resolvedCombinations,
    );
    const endCombination = combination.slice(1);
    const distanceOfEndCombination = getDistance(
      endCombination,
      resolvedCombinations,
    );
    const totalDistance = distanceOfEndCombination + distanceOfStartCombination;
    resolvedCombinations.set(combination, totalDistance);
    return totalDistance;
  }
  console.log("Unresolveble combination: ", combination);
  throw Error("Unresolvable combination");
}

function getCity(city: string) {
  switch (city) {
    case "Faerun":
    case "London":
      return Cities.Faerun;
    case "Norrath":
    case "Dublin":
      return Cities.Norrath;
    case "Tristram":
    case "Belfast":
      return Cities.Tristram;
    case "AlphaCentauri":
      return Cities.AlphaCentauri;
    case "Arbre":
      return Cities.Arbre;
    case "Snowdin":
      return Cities.Snowdin;
    case "Tambi":
      return Cities.Tambi;
    case "Straylight":
      return Cities.Straylight;
    default:
      return null;
  }
}

const lineRegex = /([a-zA-Z\s]+) to ([a-zA-Z\s]+) = ([\d]+)/;
export function parseCityLine(line: string) {
  const match = line.match(lineRegex);
  if (!match) {
    throw new Error("line does not match: " + line);
  }
  const [, city1, city2, distance] = match;
  return {
    cityALiteral: getCity(city1)?.toString(),
    cityBLiteral: getCity(city2)?.toString(),
    distance: parseInt(distance, 10),
  };
}
