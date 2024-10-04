/*
--- Day 20: Infinite Elves and Infinite Houses ---
To keep the Elves busy, Santa has them deliver some presents by hand, door-to-door. He sends them down a street with infinite houses numbered sequentially: 1, 2, 3, 4, 5, and so on.

Each Elf is assigned a number, too, and delivers presents to houses based on that number:

The first Elf (number 1) delivers presents to every house: 1, 2, 3, 4, 5, ....
The second Elf (number 2) delivers presents to every second house: 2, 4, 6, 8, 10, ....
Elf number 3 delivers presents to every third house: 3, 6, 9, 12, 15, ....
There are infinitely many Elves, numbered starting with 1. Each Elf delivers presents equal to ten times his or her number at each house.

So, the first nine houses on the street end up like this:

House 1 got 10 presents.
House 2 got 30 presents.
House 3 got 40 presents.
House 4 got 70 presents.
House 5 got 60 presents.
House 6 got 120 presents.
House 7 got 80 presents.
House 8 got 150 presents.
House 9 got 130 presents.
The first house gets 10 presents: it is visited only by Elf 1, which delivers 1 * 10 = 10 presents. The fourth house gets 70 presents, because it is visited by Elves 1, 2, and 4, for a total of 10 + 20 + 40 = 70 presents.

What is the lowest house number of the house to get at least as many presents as the number in your puzzle input?

Your puzzle input is 34000000.
 */

// Algorithm

/*

elf # | presents count on visit | visit sequence
1     | 10                      | 1, 2, 3, 4, ...
2     | 20                      | 2, 4, 6, 8, ...
3     | 30                      | 3, 6, 9, 12, ...

house # | total presents delivered | visited by elf with numbers | prime numbers decomposition
1       | 10                       | 1                           |
2       | 30                       | 1, 2                        | 2
3       | 40                       | 1, 3                        | 3
4       | 70                       | 1, 2, 4                     | 2, 2
5       | 60                       | 1, 5                        | 5
6       | 120                      | 1, 2, 3, 6                  | 2, 3
7       | 80                       | 1, 7                        | 7
8       | 150                      | 1, 2, 4, 8                  | 2, 2, 2
9       | 130                      | 1, 3, 9                     | 3, 3
10      | 180                      | 1, 2, 5, 10                 | 2, 5
11      | 120                      | 1, 11                       | 11
12      | 280                      | 1, 2, 3, 4, 6, 12           | 2, 2, 3
...
16      | 310                      | 1, 2, 4, 8, 16              | 2, 2, 2, 2

What will be the first house with more than 34_000_000?
 */

// based on house number, I can get "prime numbers decomposition"
// based on "prime numbers decomposition", I can get "visited by elf with numbers"
// based on "visited by elf with numbers", I can get "total presents delivered"

// I need to loop

// hmm - for each number, I need to find prime numbers, it consists from

// lets have an array of known prime numbers 1, 2, 3, ...

// I will need to have a function, that will find out, if a number is a prime number
// lets call it isPrimeNumber

// I will need a function, that will deconstruct number into multiplies of prime numbers
// lets call it: toPrimeNumbers
// it will need the number, array of knownPrime numbers

// CASE 1:
// try it with number 3 and array of known prime numbers [1, 2]

// create array of current prime numbers with one [1]
// try to divide 3 by prime number in array of prime number 2
// remainder is 1
// add 3 to array of prime numbers
// add 3 to current prime numbers, return [1, 3]

// CASE 2:
// try it with number 4 and array of known prime numbers [1, 2, 3]
// try to divide 4 by 2
// remainder is 0, add 2 to list of current prime numbers [1, 2]
// result after division is 2. 2 is in list of prime numbers. Add it to list of current prime numbers [1, 2, 2]

// case 3:
// try it with number 5 and array of known prime numbers [1, 2, 3]
// try to divide 5 with 2, remainder is 1
// as 5**(0.5) is cca 2.23 stop here, add 5 to prime numbers
// add 5 to current prime numbers

// try to divide the number by prime numbers starting by smallest prime numbers
// break when you will find the first number, that will leave 0 after division,
// then com
// continue calling toPrimeNumbers again with result of division

// I will need a function, that will compute count of gifts given to the house
// lets call it: getCountOfGifts given
// it will need prime number of house
// it will compute numbers of elves, that visited the house (prime numbers)
// reduce numbers - accumulate elf numbers multiplied by 10

// algorithm

//

// check houses starting by house 1
// for each house
// get number of elves, that visited the house (call toPrimeNumbers)
// get number of gifts given in the house (

import {
  getTotalPresentsDelivered,
  mapPrimeNumbersToElfNumbers,
  NumberInfoMap,
  spreadToPrimeNumbers,
} from "./utils.ts";

const puzzleInput = 34_000_000;
let presentsDelivered = 0;
let currentHouse = 0;
const mappedNumbers: NumberInfoMap = new Map();

do {
  currentHouse++;
  const primeNumbers = spreadToPrimeNumbers(currentHouse, mappedNumbers);
  const elfNumbers = mapPrimeNumbersToElfNumbers(primeNumbers);
  presentsDelivered = getTotalPresentsDelivered(elfNumbers);
  console.log("presentsDelivered", presentsDelivered);
} while (presentsDelivered < puzzleInput);

console.log("currentHouse", currentHouse);

// What is the lowest house number of the house to get at least as many presents as the number in your puzzle input?

// Your puzzle input is 34000000.
