import { describe, it } from "@std/testing/bdd";
import { assertEquals, assertThrows } from "@std/assert";
import { getNextChar, incrementTextByOneLetter } from "./utils.ts";

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
