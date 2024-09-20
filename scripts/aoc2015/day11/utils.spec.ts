import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import {
  containsTwoPairsOfLetters,
  getNextChar,
  incrementTextByOneLetter,
  textIncludesOneOfChars,
} from "./utils.ts";

describe("incrementTextByOneLetter", () => {
  it('Should return "aaaaaaaa" after "zzzzzzzz"', function () {
    assertEquals(incrementTextByOneLetter("zzzzzzzz"), "aaaaaaaa");
  });
  it('Should return "aaaaaaab" after "aaaaaaaa"', function () {
    assertEquals(incrementTextByOneLetter("aaaaaaaa"), "aaaaaaab");
  });
  it('Should return "aaaaaaac" after "aaaaaaab"', function () {
    assertEquals(incrementTextByOneLetter("aaaaaaab"), "aaaaaaac");
  });
  it('Should return "aaaaaaba" after "aaaaaaaz"', function () {
    assertEquals(incrementTextByOneLetter("aaaaaaaz"), "aaaaaaba");
  });
  it('Should return "aaaaaabb" after "aaaaaaba"', function () {
    assertEquals(incrementTextByOneLetter("aaaaaaba"), "aaaaaabb");
  });
  it('Should return "aaaaabaa" after "aaaaaazz"', function () {
    assertEquals(incrementTextByOneLetter("aaaaaazz"), "aaaaabaa");
  });
  it('Should return "aaaaabab" after "aaaaabaa"', function () {
    assertEquals(incrementTextByOneLetter("aaaaabaa"), "aaaaabab");
  });
  it('Should return "aaaaabac" after "aaaaabab"', function () {
    assertEquals(incrementTextByOneLetter("aaaaabab"), "aaaaabac");
  });
});

describe("getNextChar", function () {
  it('should return "b" after "a"', function () {
    assertEquals(getNextChar("a"), "b");
  });
  it('should return "c" after "b"', function () {
    assertEquals(getNextChar("b"), "c");
  });
  it('should return "a" after "z"', function () {
    assertEquals(getNextChar("z"), "a");
  });
  it("should throw for invalid char", function () {
    assertThrows(function () {
      getNextChar("A");
    });
  });
  it("should throw for char group", function () {
    assertThrows(function () {
      getNextChar("ab");
    });
  });
});

describe("textIncludesOneOfChars", function () {
  it("should return false for text without forbidden chars", function () {
    assertEquals(textIncludesOneOfChars("abc"), false);
  });
  it("should return true for text with forbidden chars", function () {
    assertEquals(textIncludesOneOfChars("ijk"), true);
  });
});

describe("containsTwoPairsOfLetters", function () {
  it("should return false for text without 2 pairs of letters", function () {
    assertEquals(containsTwoPairsOfLetters("bcdabcdefgh"), false);
  });
  it("should return false for partially overlapping pairs", function () {
    assertEquals(containsTwoPairsOfLetters("bcdaaabcdefgh"), false);
  });
  it("should return true for two valid pairs", function () {
    assertEquals(containsTwoPairsOfLetters("bcdaabbebcdefgh"), true);
  });
  it("should return true for two valid pairs", function () {
    assertEquals(containsTwoPairsOfLetters("bbcdaabcdefgh"), true);
  });
});
