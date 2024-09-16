function separateSetValue<T>(
  set: Set<T>,
): { value: T; setWithoutValue: Set<T> } {
  if (set.size === 0) {
    throw new Error("Set is empty");
  }
  let valueIsSet = false;
  let value: T;
  const newSet = new Set<T>();
  for (const item of set.values()) {
    if (!valueIsSet) {
      value = item;
      valueIsSet = true;
    } else {
      newSet.add(item);
    }
  }
  return {
    value: value!,
    setWithoutValue: newSet,
  };
}

// export function combineExistingArrayWithSetValues<T>(arr: T[], set: Set<T>) {
//   let arrraysToAppend: T[];
//   for (const item of set.values()) {
//     const setWithoutItem = new Set<T>(set);
//     setWithoutItem.delete(item);
//     arrraysToAppend.push(combine(arr, ));
//   }
// }

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
  if (uncombinedValues.size > 1) {
    const { value, setWithoutValue } = separateSetValue(uncombinedValues);
    return currentArrays.reduce((acc: T[][], currentArray) => {
      // concat current array with one value from set
      return acc.concat;
    }, [[]]);
  }
  return [];
}
