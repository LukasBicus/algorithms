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

export function sumNumbersOfArray(arr: any[], count: number): number {
  for (const item of arr) {
    if (typeof item === "number") {
      count = count + item;
    } else if (Array.isArray(item)) {
      count = sumNumbersOfArray(item, count);
    } else if (typeof item === "object") {
      count = sumNumbersOfObject(item, count);
    }
  }
  return count;
}

export function sumNumbersOfObject(o: object, count = 0): number {
  if (Object.values(o).find((v) => v === "red")) {
    return count;
  }
  for (const value of Object.values(o)) {
    if (typeof value === "number") {
      count = count + value;
    } else if (Array.isArray(value)) {
      count = sumNumbersOfArray(value, count);
    } else if (typeof value === "object") {
      count = sumNumbersOfObject(value, count);
    }
  }
  return count;
}
