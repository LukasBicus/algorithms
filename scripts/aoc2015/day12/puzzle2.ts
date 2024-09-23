/*
--- Part Two ---
Uh oh - the Accounting-Elves have realized that they double-counted everything red.

  Ignore any object (and all of its children) which has any property with the value "red". Do this only for objects ({...}), not arrays ([...]).

  [1,2,3] still has a sum of 6.
  [1,{"c":"red","b":2},3] now has a sum of 4, because the middle object is ignored.
{"d":"red","e":[1,2,3,4],"f":5} now has a sum of 0, because the entire structure is ignored.
  [1,"red",5] has a sum of 6, because "red" in an array has no effect.
 */

// read input
// parseJson

// let have a counter

// sumNumbersOfObject:

// if a value of object is "red" - return 0 for the object
// if value is of type number - add it to counter
// if value of object is array
//    - sum all it's numbers
//    - call all values of type object and sumNumberOfObject and sum them
// if value of object is another object, transform it with sumNumbersOfObject
