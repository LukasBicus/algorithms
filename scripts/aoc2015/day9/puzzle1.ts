/**
-- Day 9: All in a Single Night ---
Every year, Santa manages to deliver all of his presents in a single night.

This year, however, he has some new locations to visit;
his elves have provided him the distances between every pair of locations.
He can start and end at any two (different) locations he wants,
but he must visit each location exactly once.
What is the shortest distance he can travel to achieve this?

  For example, given the following distances:

London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
The possible routes are therefore:

Dublin -> London -> Belfast = 982
London -> Dublin -> Belfast = 605
London -> Belfast -> Dublin = 659
Dublin -> Belfast -> London = 659
Belfast -> Dublin -> London = 605
Belfast -> London -> Dublin = 982

The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this example.

What is the distance of the shortest route?

*/
import { SimpleInputCities } from "./types.ts";
import { getDistance, getPermutations, parseCityLine } from "./utils.ts";

function processFile(text: string) {
  const lines = text.split("\n");
  const resolvedCombinations = new Map<string, number>();
  for (const line of lines) {
    const { cityALiteral, cityBLiteral, distance } = parseCityLine(line);
    if (cityALiteral && cityBLiteral) {
      resolvedCombinations.set(cityALiteral + cityBLiteral, distance);
    }
  }
  const allPermutations = getPermutations(
    new Set(Object.values(SimpleInputCities).map(String)),
  );
  const allDistances = [];
  for (const permutation of allPermutations) {
    const distance = getDistance(permutation.join(""), resolvedCombinations);
    allDistances.push(distance);
  }
  console.log("Min distance", Math.min(...allDistances));
}

Deno.readTextFile("./simpleInput.txt").then(processFile);

// read file with cities and distances
// parse line by line
//     fill resolvedCombinations with initial data
// end loop

// combine them with combine function. get list of combinations

// loop combinations
//    for each combination, get distance, store it in array of distances
// end loop

// find the smallest distance
