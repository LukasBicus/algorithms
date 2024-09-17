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
import { Cities, SimpleInputCities } from "./types.ts";
import { getDistance, getPermutations, parseCityLine } from "./utils.ts";

function getProcessFile(cityValues: string[]) {
  return function processFile(text: string) {
    const lines = text.split("\n");
    const resolvedCombinations = new Map<string, number>();
    for (const line of lines) {
      // parse line by line
      const { cityALiteral, cityBLiteral, distance } = parseCityLine(line);
      if (cityALiteral && cityBLiteral) {
        //     fill resolvedCombinations with initial data
        resolvedCombinations.set(cityALiteral + cityBLiteral, distance);
      } else {
        throw new Error("Unknown literals");
      }
    }
    // combine them with combine function. get list of combinations

    const allPermutations = getPermutations(
      new Set(cityValues),
    );
    const allDistances = [];
    for (const permutation of allPermutations) {
      //    for each combination, get distance, store it in array of distances
      const distance = getDistance(permutation.join(""), resolvedCombinations);
      allDistances.push(distance);
    }
    // find the smallest distance
    console.log("Min distance", Math.min(...allDistances));
  };
}

// read file with cities and distances
Deno.readTextFile("./simpleInput.txt").then(
  getProcessFile(Object.values(SimpleInputCities).map(String)),
);
Deno.readTextFile("./input.txt").then(
  getProcessFile(Object.values(Cities).map(String)),
);
