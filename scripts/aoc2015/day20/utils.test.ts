import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  decomposeToPrimeNumbers,
  NumberInfoMap,
  spreadToPrimeNumbers,
} from "./utils.ts";

describe("decomposeToPrimeNumbers", function () {
  it("should decompose 1 to prime numbers", function () {
    assertEquals(decomposeToPrimeNumbers(1), []);
  });

  it("should decompose prime number in list of found prime numbers", function () {
    const primeNumbers = [2];
    assertEquals(decomposeToPrimeNumbers(2, primeNumbers), [2]);
  });

  it("should decompose 2 to prime numbers and add 2 to prime numbers", function () {
    const primeNumbers: number[] = [];
    assertEquals(decomposeToPrimeNumbers(2, primeNumbers), [2]);
    assertEquals(primeNumbers, [2]);
  });
  it("should decompose 3 to prime numbers and add 3 to prime numbers", function () {
    const primeNumbers = [2];
    assertEquals(decomposeToPrimeNumbers(3, primeNumbers), [3]);
    assertEquals(primeNumbers, [2, 3]);
  });
  it("should decompose 5 to prime numbers and add 5 to prime numbers", function () {
    const primeNumbers = [2, 3];
    assertEquals(decomposeToPrimeNumbers(5, primeNumbers), [5]);
    assertEquals(primeNumbers, [2, 3, 5]);
  });
  it("should decompose 11 to prime numbers and add 11 to prime numbers", function () {
    const primeNumbers = [2, 3, 5, 7];
    assertEquals(decomposeToPrimeNumbers(11, primeNumbers), [11]);
    assertEquals(primeNumbers, [2, 3, 5, 7, 11]);
  });

  it("should decompose 4 to prime numbers", function () {
    assertEquals(decomposeToPrimeNumbers(4, [2, 3]), [2, 2]);
  });

  it("should decompose 6 to prime numbers", function () {
    const primeNumbers = [2, 3, 5];
    assertEquals(decomposeToPrimeNumbers(6, primeNumbers), [2, 3]);
  });

  it("should decompose 120 to prime numbers", function () {
    const primeNumbers: number[] = [];
    for (let n = 2; n < 119; n++) {
      decomposeToPrimeNumbers(n, primeNumbers);
    }
    assertEquals(decomposeToPrimeNumbers(120, primeNumbers), [
      2,
      2,
      2,
      3,
      5,
    ]);
    assertEquals(primeNumbers, [
      2,
      3,
      5,
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      31,
      37,
      41,
      43,
      47,
      53,
      59,
      61,
      67,
      71,
      73,
      79,
      83,
      89,
      97,
      101,
      103,
      107,
      109,
      113,
    ]);
  });
});

describe.only("spreadToPrimeNumbers", function () {
  it.only("Should return empty array for number 1", function () {
    const map: NumberInfoMap = new Map();
    assertEquals(spreadToPrimeNumbers(1, map), []);
    assertEquals(map.get(1), {
      isPrime: false,
      spread: [],
    });
  });
  it.only("Should return array with 2 for number 2", function () {
    const map: NumberInfoMap = new Map();
    assertEquals(spreadToPrimeNumbers(2, map), [2]);
    assertEquals(map.get(2), {
      isPrime: true,
      spread: [2],
    });
  });
  it.only("Should return array with 3 for number 3", function () {
    const map: NumberInfoMap = new Map();
    map.set(2, {
      isPrime: true,
      spread: [2],
    });
    assertEquals(spreadToPrimeNumbers(3, map), [3]);
    assertEquals(map.get(3), {
      isPrime: true,
      spread: [3],
    });
  });
  it.only("Should return array with 11 for number 11", function () {
    const map: NumberInfoMap = new Map();
    map.set(2, {
      isPrime: true,
      spread: [2],
    });
    map.set(3, {
      isPrime: true,
      spread: [3],
    });
    map.set(5, {
      isPrime: true,
      spread: [5],
    });
    map.set(7, {
      isPrime: true,
      spread: [7],
    });
    assertEquals(spreadToPrimeNumbers(11, map), [11]);
    assertEquals(map.get(11), {
      isPrime: true,
      spread: [11],
    });
  });
  it("Should return array with [2, 2] for number 4", function () {
    const map: NumberInfoMap = new Map();
    map.set(2, {
      isPrime: true,
      spread: [2],
    });
    map.set(3, {
      isPrime: true,
      spread: [3],
    });
    assertEquals(spreadToPrimeNumbers(4, map), [2, 2]);
    assertEquals(map.get(4), {
      isPrime: false,
      spread: [2, 2],
    });
  });
});
