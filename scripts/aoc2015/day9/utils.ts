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
  return [];
}
