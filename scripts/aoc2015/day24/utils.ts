// sum weights and get weight for one group
import { generateCombinationsWithoutRepetition } from "../day17/utils.ts";

function getWeightOfGroup(input: number[]): number {
  return input.reduce(function (acc, i) {
    return acc + i;
  }, 0);
}

export function isThereACombinationOfPackagesWithGivenWeight(
  packages: number[],
  givenWeight: number,
): boolean {
  for (const combination of generateCombinationsWithoutRepetition(packages)) {
    const combinationWeight = getWeightOfGroup(combination);
    if (combinationWeight === givenWeight) {
      return true;
    }
  }
  return false;
}

// split packages to 3 groups, so common heights of packages is equal (several solutions possible)
// based on packages weights and group weight
// -> find first combination of packages, that
// -> should give GroupWeight together
// -> rest packages can be split to 2 equal groups

export function getPackagesGroupsWithSmallestLengths(
  packages: number[],
): number[][] {
  // return [];
  const groupWeight = getWeightOfGroup(packages) / 3;
  if (groupWeight !== Math.round(groupWeight)) {
    throw new Error("Unable to form groups");
  }
  const validCombinations: number[][] = [];
  for (
    const combination of generateCombinationsWithoutRepetition(
      [...packages].sort((a, b) => b - a),
    )
  ) {
    if (validCombinations.length > 0) {
      if (combination.length > validCombinations[0].length) {
        break;
      }
    }
    const combinationWeight = getWeightOfGroup(combination);
    if (combinationWeight !== groupWeight) {
      continue;
    }
    const restPackages = packages.filter((p) => !combination.includes(p));
    // look for such a combination of rest packages, that it makes groupWeight again
    if (
      isThereACombinationOfPackagesWithGivenWeight(restPackages, groupWeight)
    ) {
      validCombinations.push(combination.sort((a, b) => a - b));
      console.log(combination);
    }
  }
  return validCombinations;
}
