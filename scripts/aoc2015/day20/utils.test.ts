import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { decomposeToPrimeNumbers } from "./utils.ts";

describe("decomposeToPrimeNumbers", function () {
  it("should decompose 1 to prime numbers", function () {
    assertEquals(decomposeToPrimeNumbers(1), [1]);
  });

  it("should decompose prime number in list of found prime numbers", function () {
    const primeNumbers = [1, 2];
    assertEquals(decomposeToPrimeNumbers(2, primeNumbers), [1, 2]);
  });

  it("should decompose 2 to prime numbers and add 2 to prime numbers", function () {
    const primeNumbers = [1];
    assertEquals(decomposeToPrimeNumbers(2, primeNumbers), [1, 2]);
    assertEquals(primeNumbers, [1, 2]);
  });
  it("should decompose 3 to prime numbers and add 3 to prime numbers", function () {
    const primeNumbers = [1, 2];
    assertEquals(decomposeToPrimeNumbers(3, primeNumbers), [1, 3]);
    assertEquals(primeNumbers, [1, 2, 3]);
  });
  it.skip("should decompose 5 to prime numbers and add 5 to prime numbers", function () {
    const primeNumbers = [1, 2, 3];
    assertEquals(decomposeToPrimeNumbers(5, primeNumbers), [1, 5]);
    assertEquals(primeNumbers, [1, 2, 3, 5]);
  });
  it.skip("should decompose 11 to prime numbers and add 11 to prime numbers", function () {
    const primeNumbers = [1, 2, 3, 5, 7];
    assertEquals(decomposeToPrimeNumbers(11, primeNumbers), [1, 11]);
    assertEquals(primeNumbers, [1, 2, 3, 5, 7, 11]);
  });

  it.skip("should decompose 4 to prime numbers", function () {
    assertEquals(decomposeToPrimeNumbers(4, [1, 2, 3]), [1, 2, 2]);
  });

  it.skip("should decompose 6 to prime numbers", function () {
    assertEquals(decomposeToPrimeNumbers(6, [1, 2, 3, 5]), [1, 2, 3]);
  });

  it.skip("should decompose 6 to prime numbers", function () {
    const primeNumbers = [1];
    assertEquals(decomposeToPrimeNumbers(6, primeNumbers), [1, 2, 3]);
    assertEquals(primeNumbers, [1, 2, 3]);
  });
});
