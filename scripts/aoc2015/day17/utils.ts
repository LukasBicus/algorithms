const containerRegex = /(\d+)/;

export function parseContainerLine(line: string): number | null {
  const match = line.match(containerRegex);
  return match ? parseInt(match[1]) : null;
}

// getCombinationsWithoutRepetition

// for set of items {a, b}, available combinations are:
// []
// [a]
// [b]
// [a, b]

// for set of items {a, b, c}, available combinations are:
// []
// [a]
// [b]
// [c]
// [a, b]
// [a, c]
// [b, c]
// [a, b, c]

// those can be grouped into:

// without item "a"
// []
// [b]
// [c]
// [b, c]

// with item "a"- see - the item "a" is added in front of all options without "a"
// [a]
// [a, b]
// [a, c]
// [a, b, c]

export function* generateCombinationsWithoutRepetition<T>(
  items: T[],
): Generator<T[]> {
  yield [] as T[];
}
