/*
--- Day 17: No Such Thing as Too Much ---
The elves bought too much eggnog again - 150 liters this time. To fit it all into your refrigerator, you'll need to move it into smaller containers. You take an inventory of the capacities of the available containers.

For example, suppose you have containers of size 20, 15, 10, 5, and 5 liters. If you need to store 25 liters, there are four ways to do it:

15 and 10
20 and 5 (the first 5)
20 and 5 (the second 5)
15, 5, and 5
Filling all containers entirely, how many different combinations of containers can exactly fit all 150 liters of eggnog?


 */

// ALGORITHM

import {
  generateCombinationsWithoutRepetition,
  parseContainerLine,
} from "./utils.ts";

async function processFile(
  filename: string,
  amountWanted: number,
): Promise<void> {
  // read file
  const input = await Deno.readTextFile(filename);
  const containers: number[] = [];
  for (const line of input.split("\n")) {
    // parse containers - fill array of containers
    const container = parseContainerLine(line);
    if (container) {
      containers.push(container);
    }
  }
  // create iterator based on available containers
  const combinations: number[][] = [];
  for (
    const combination of generateCombinationsWithoutRepetition(containers)
  ) {
    if (
      combination.reduce((acc, container) => acc + container, 0) ===
        amountWanted
    ) {
      combinations.push(combination);
    }
  }
  console.log("combinations count", combinations.length);

  // filter out combinations of containers with size 150l
}

processFile("simpleInput.txt", 25);
processFile("input.txt", 150);
