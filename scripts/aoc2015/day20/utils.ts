export function decomposeToPrimeNumbers(
  num: number,
  knownPrimeNumbers = [1],
): number[] {
  if (num < 1) {
    throw new Error("Can decompose only numbers > 1");
  }
  if (num === 1) {
    return [1];
  }
  if (knownPrimeNumbers.includes(num)) {
    return [1, num];
  }

  // case 1: num is 3
  // limit is 3**0.5 cca 1.73...
  const limit = num ** 0.5;
  // list of prime numbers except 1 is [2]
  const filteredKnownPrimeNumbers = knownPrimeNumbers.slice(1).filter((n) =>
    n < limit
  );
  // list of prime numbers except 1 and bellow 1.7 is []
  if (filteredKnownPrimeNumbers.length === 0) {
    // there is no prime number to test
    // add number to list of known prime numbers
    knownPrimeNumbers.push(num);
    return [1, num];
  }
  // check foundPrimeNumber of foundPrimeNumbers till foundPrimeNumber <= num**0.5
  // if none of foundPrimeNumbers (except 1) divides the number with remainder 0

  // case 1: num is 11
  // limit is 11**0.5 cca 3.31...
  // list of prime numbers except 1 is [2, 3, 5, 7]
  // list of prime numbers except 1 and bellow 3.31 is [2, 3]
  // test given prime numbers
  // 11 % 2 is 1, not 0, continue
  // 11 % 3 is 2, not 0, continue
  // there are no more numbers -> add 11 to list of prime numbers
  // return [1, 11] (1, new prime number)

  return [];
}
