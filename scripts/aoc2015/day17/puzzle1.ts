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

// read file
// parse containers - fill array of containers

// create iterator based on available containers

// filter out combinations of containers with size 150l

// getCombinationsWithoutRepetition

// for set of items {a, b}, available combinations are:
// []
// [a]
// [b]
// [a, b]

// for set of items {a, b, c}, available combinations are:
// []
// [a]
// [b]
// [c]
// [a, b]
// [a, c]
// [b, c]
// [a, b, c]

// those can be grouped into:

// without item "a"
// []
// [b]
// [c]
// [b, c]

// with item "a"- see - the item "a" is added in front of all options without "a"
// [a]
// [a, b]
// [a, c]
// [a, b, c]
