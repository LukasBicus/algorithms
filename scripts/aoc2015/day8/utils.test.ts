import { assertEquals } from "jsr:@std/assert@1";
import { describe, it } from "@std/testing/bdd";
import { getCodeLength, getStringLength } from "./utils.ts";

// string     code length                     string length
// ""         2                               0
// "abc"      5                               3
// "aaa\"aaa" 10                              7
// "aaa\\aaa" 10                              7
// "\x27"     6                               1

describe("getCodeLength", function () {
  it('Should return length of ""', function () {
    assertEquals(getCodeLength('""'), 2);
  });

  it('Should return length of "abc"', function () {
    assertEquals(getCodeLength('"abc"'), 5);
  });
  it(`Should return length of "aaa\\"aaa"`, function () {
    assertEquals(getCodeLength(`"aaa\\"aaa"`), 10);
  });
  it('Should return length of "aaa\\\\aaa"', function () {
    assertEquals(getCodeLength(`"aaa\\\\aaa"`), 10);
  });
  it("Should return length of `\\x27`", function () {
    assertEquals(getCodeLength(`"\\x27"`), 6);
  });
});
describe("getStringLength", function () {
  it('Should return length of ""', function () {
    assertEquals(getStringLength('""'), 0);
  });

  it('Should return length of "abc"', function () {
    assertEquals(getStringLength('"abc"'), 3);
  });
  it(`Should return length of "aaa\\"aaa"`, function () {
    assertEquals(getStringLength(`"aaa\\"aaa"`), 7);
  });
  it('Should return length of "aaa\\\\aaa"', function () {
    assertEquals(getStringLength(`"aaa\\\\aaa"`), 7);
  });
  it("Should return length of `\\x27`", function () {
    assertEquals(getStringLength(`"\\x27"`), 1);
  });
});
