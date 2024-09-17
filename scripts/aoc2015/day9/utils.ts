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

/*
Input:
{A}
Result:
[[A]]

Input:
{A, B}
Partial
[
...[[A] + combine{B} ]
...[[B] + combine{A} ]
]
Result:
[[A, B], [B, A]]

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
  [A, B, C], d
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
    // for each item in uncombined values
    for (const item of uncombinedValues) {
      // split uncombined values to item and rest values
      const newSet = new Set(uncombinedValues);
      newSet.delete(item);
      // create new current arrays => every current array + item
      const arrayWithItem = currentArray.concat([item]);
      // combine (new current arrays, rest values)
      const newArrays = combine([arrayWithItem], newSet);
      acc.push(newArrays.flat());
    }
    return acc;
  }, []);
}
