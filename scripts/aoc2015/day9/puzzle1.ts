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

// we have distances between cities
// we want to get the shortest route between all cities

// get enum of all cities

// combine them
// create an util function, that will get an array of values and returns list of combinations of those values
// this can be done recursively
// input: set of values, currentArray
// output

// for currentArray and set of values {'A'} it will return
//     [[...currentArray, 'A']]
// for currentArray and set {'A, 'B'} it will return
//     [
//        ...combine([...currentArray, 'A'], {'B'}),
//        ...combine([...currentArray, 'B'], {'A'})
//     ]
// for currentArray and values ['A, 'B', 'C'] it will return
//     [
//        ...combine([...currentArray, 'A'], {'B', 'C'}),
//        ...combine([...currentArray, 'B'], {'A', 'C'})
//        ...combine([...currentArray, 'C'], {'A', 'B'})
//     ]
// ...

// start with empty currentArray and full set of values

// for each combination, get the route length
// todo: we will need to save all known starting distances -> resolvedCombinations

// getLength(combination, resolvedCombinations) - recursive function
// basic case ->
// combination has 2 letters "AB" -> get length of "AB"

// CASE A:
// combination is "BA" ->
// -> get length of "BA" -> not found
// -> reverse combination -> resolve as "BA", store in resolvedCombinations
// todo: needs reverseString function -> check Array.reverse

// CASE B:
// combination is "ABCDEF"
// -> try to find: X
// -> try to find reversed: X
// -> split to getLength("AB") + getLength("BCDEF")
// -> store length of "ABCDEF" in resolvedCombinations
// -> store length of "FEDCBA" (reversed to "ABCDEF") in resolvedCombinations

// the recursive function will be called with all combinations

// get lengths for all starting combinations, find the smallest length
