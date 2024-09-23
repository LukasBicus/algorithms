const numbersRegex = /(-)?([0-9]+)/g;

export function getNumbersFromText(text: string): number[] {
  const result: number[] = [];
  const allMatchesIterator = text.matchAll(numbersRegex);
  for (const match of allMatchesIterator) {
    const num = parseInt(match[0], 10);
    if (!Number.isNaN(num)) {
      result.push(num);
    }
  }
  return result;
}
