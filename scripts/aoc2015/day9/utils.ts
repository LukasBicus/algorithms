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
    console.log("currentArray", currentArray);
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

// the recursive function will be called with all combinations
