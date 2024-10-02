/*
--- Day 18: Like a GIF For Your Yard ---
After the million lights incident, the fire code has gotten stricter: now, at most ten thousand lights are allowed. You arrange them in a 100x100 grid.

Never one to let you down, Santa again mails you instructions on the ideal lighting configuration. With so few lights, he says, you'll have to resort to animation.

Start by setting your lights to the included initial configuration (your puzzle input).
A # means "on", and a . means "off".

Then, animate your grid in steps, where each step decides the next configuration based on the current one.
Each light's next state (either on or off) depends on
- its current state
- the current states of the eight lights adjacent to it (including diagonals).
- Lights on the edge of the grid might have fewer than eight neighbors; the missing ones always count as "off".

For example, in a simplified 6x6 grid, the light marked A has the neighbors numbered 1 through 8, and the light marked B, which is on an edge, only has the neighbors marked 1 through 5:

1B5...
234...
......
..123.
..8A4.
..765.
The state a light should have next is based on its current state (on or off) plus the number of neighbors that are on:

A light which is on stays on when 2 or 3 neighbors are on, and turns off otherwise.
A light which is off turns on if exactly 3 neighbors are on, and stays off otherwise.
All of the lights update simultaneously; they all consider the same current state before moving to the next.

Here's a few steps from an example configuration of another 6x6 grid:

Initial state:
.#.#.#
...##.
#....#
..#...
#.#..#
####..

After 1 step:
..##..
..##.#
...##.
......
#.....
#.##..

After 2 steps:
..###.
......
..###.
......
.#....
.#....

After 3 steps:
...#..
......
...#..
..##..
......
......

After 4 steps:
......
......
..##..
..##..
......
......
After 4 steps, this example has four lights on.

In your grid of 100x100 lights, given your initial configuration, how many lights are on after 100 steps?

To begin, get your puzzle input.

--- Part Two ---
You flip the instructions over; Santa goes on to point out that this is all just an implementation of Conway's Game of Life. At least, it was, until you notice that something's wrong with the grid of lights you bought: four lights, one in each corner, are stuck on and can't be turned off. The example above will actually run like this:

Initial state:
##.#.#
...##.
#....#
..#...
#.#..#
####.#

After 1 step:
#.##.#
####.#
...##.
......
#...#.
#.####

After 2 steps:
#..#.#
#....#
.#.##.
...##.
.#..##
##.###

After 3 steps:
#...##
####.#
..##.#
......
##....
####.#

After 4 steps:
#.####
#....#
...#..
.##...
#.....
#.#..#

After 5 steps:
##.###
.##..#
.##...
.##...
#.#...
##...#
After 5 steps, this example now has 17 lights on.

In your grid of 100x100 lights, given your initial configuration, but with the four corners always in the on state, how many lights are on after 100 steps?
 */

// ALGORITHM

// read file input
// fill a grid of 100x100
// A # means "on", and a . means "off".
// a "\n" means new line in grid

// perform step 100 times

// in each step
// create next step with no data
// for each light => get state of the light, get state of surrounding neighbours
// A light which is on stays on when 2 or 3 neighbors are on, and turns off otherwise.
// A light which is off turns on if exactly 3 neighbors are on, and stays off otherwise.

// get neighbours function (position - position of a light in a grid)
// gets positions all neighbours of a light in a grid

import {
  fillGrid,
  LightGrid,
  LightState,
  litGridCorners,
  performStep,
} from "./utils.ts";

async function processFile(
  filename: string,
  stepsCount: number,
): Promise<void> {
  const input = await Deno.readTextFile(filename);
  const { grid, size } = fillGrid(input);
  let nextGrid: LightGrid = litGridCorners(grid, size);
  // perform step
  for (let i = 0; i < stepsCount; i++) {
    nextGrid = performStep(nextGrid, size);
    nextGrid = litGridCorners(nextGrid, size);
  }
  let counter = 0;
  for (const [, light] of nextGrid) {
    if (light === LightState.TurnedOn) {
      counter++;
    }
  }
  console.log(`Count of lit lights is: ${counter}`);
}

processFile("simpleInput.txt", 5);
processFile("input.txt", 100);
