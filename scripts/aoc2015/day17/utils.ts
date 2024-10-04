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

/**
 * mutates parameter items!!!
 */
export function* generateCombinationsWithoutRepetition<T>(
  items: T[],
): Generator<T[]> {
  if (items.length === 0) {
    yield [];
    return;
  } else if (items.length === 1) {
    yield [];
    yield [items[0]];
    // items.length > 1
  } else {
    const firstItem = items.shift() as T;
    for (const combination of generateCombinationsWithoutRepetition(items)) {
      yield combination;
      yield [firstItem].concat(combination);
    }
  }
}
