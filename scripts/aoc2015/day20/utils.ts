export function decomposeToPrimeNumbers(
  num: number,
  foundPrimeNumbers = [1],
): number[] {
  if (num < 1) {
    throw new Error("Can decompose only numbers > 1");
  }
  if (num === 1) {
    return [1];
  }
  if (foundPrimeNumbers.includes(num)) {
    return [1, num];
  }
  return [];
}
