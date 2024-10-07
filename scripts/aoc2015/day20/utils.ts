export function getDivisors(n: number): number[] {
  const smallDivisors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      smallDivisors.push(i);
    }
  }
  const largeDivisors = [];
  for (const smallDivisor of smallDivisors.concat([]).reverse()) {
    const largeDivisor = n / smallDivisor;
    if (largeDivisor !== smallDivisor) {
      largeDivisors.push(largeDivisor);
    }
  }
  return smallDivisors.concat(largeDivisors);
}

export function findNumberOfGiftsForHouseNumber(
  houseNumber: number,
): number {
  const divisors = getDivisors(houseNumber);
  return divisors.reduce((acc, divisor) => acc + divisor, 0) * 10;
}

// the last house of elf 1 is 50
// the last house of elf 2 is 100
// 3 ... 150

// i have house number and elf number

// will elf number X visit house number Y?
// for elf 2
// house number is bellow 2 * 50 ? I will come: I won't

// for elf 3
// house number is bellow 3 * 50 ? I will come: I won't

export function findNumberOfGiftsForHouseNumberForPuzzle2(
  houseNumber: number,
): number {
  const divisors = getDivisors(houseNumber).reverse();
  const indexOfLastElfComing = divisors.findIndex((divisor) =>
    houseNumber > divisor * 50
  );
  const filteredDivisors = indexOfLastElfComing >= 0
    ? divisors.slice(0, indexOfLastElfComing)
    : divisors;
  return filteredDivisors.reduce((acc, divisor) => acc + divisor, 0) * 11;
}
