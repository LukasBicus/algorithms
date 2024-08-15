/**
--- Day 3: Perfectly Spherical Houses in a Vacuum ---
Santa is delivering presents to an infinite two-dimensional grid of houses.

  He begins by delivering a present to the house at his starting location, and then an elf at the North Pole calls him via radio and tells him where to move next.
Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, he delivers another present to the house at his new location.

However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little off, and Santa ends up visiting some houses more than once. How many houses receive at least one present?

  For example:

- > delivers presents to 2 houses: one at the starting location, and one to the east.
- ^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
- ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.
 */

// how many houses will get at least one present??
// presents count - increased on every move
// possible moves <, >, v, ^

// start
// start position [x, y] = [0, 0]
// give a gift on starting position
// lets store gifts count in a set
// key - compute from current position, if not defined, set to 1, otherwise increase by 1
// value - number of gifts

// every move

// read instruction
// change position
//    // for > [x + 1, y]
//    // for < [x - 1, y]
//    // for ^ [x, y + 1]
//    // for v [x, y - 1]
// give a gift on current position

// at the end of cycle, count of items in set is count of houses with at least one gift