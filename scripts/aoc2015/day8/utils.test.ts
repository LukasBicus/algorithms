import { assertEquals } from "jsr:@std/assert@1";
import { describe, it } from "@std/testing/bdd";
import { encodeLine, getCodeLength, getStringLength } from "./utils.ts";

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
  it(`Should return length of "\\"\\""`, function () {
    assertEquals(getCodeLength(`"\\"\\""`), 6);
  });
  it(`Should return length of "\\"abc\\""`, function () {
    assertEquals(getCodeLength(`"\\"abc\\""`), 9);
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

describe("encodeLine", function () {
  // "" encodes to "\"\"", an increase from 2 characters to 6.
  it(`Should encode "" to "\\"\\""`, function () {
    assertEquals(encodeLine(`""`), `"\\"\\""`);
  });
  // "abc" encodes to "\"abc\"", an increase from 5 characters to 9.
  it(`Should encode "abc" to "\\"abc\\""`, function () {
    assertEquals(encodeLine(`"abc"`), `"\\"abc\\""`);
  });
  // "aaa\"aaa" encodes to "\"aaa\\\"aaa\"", an increase from 10 characters to 16.
  it(`Should encode "aaa\\"aaa" to "\\"aaa\\\\\\"aaa\\""`, function () {
    assertEquals(encodeLine(`"aaa\\"aaa"`), `"\\"aaa\\\\\\"aaa\\""`);
  });
  // "\x27" encodes to "\"\\x27\"", an increase from 6 characters to 11.
  it(`Should encode "\\x27" to "\"\\x27\""`, function () {
    assertEquals(encodeLine(`"\\x27"`), `"\\"\\\\x27\\""`);
  });
});
