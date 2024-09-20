import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { getNextPassword } from "./utils.ts";

describe("Utils", () => {
  it('Should return "aaaaaaaa" after "zzzzzzzz"', function () {
    assertEquals(getNextPassword("zzzzzzzz"), "aaaaaaaa");
  });
  it('Should return "aaaaaaab" after "aaaaaaaa"', function () {
    assertEquals(getNextPassword("aaaaaaaa"), "aaaaaaab");
  });
  it('Should return "aaaaaaac" after "aaaaaaab"', function () {
    assertEquals(getNextPassword("aaaaaaab"), "aaaaaaac");
  });
  it('Should return "aaaaaaba" after "aaaaaaaz"', function () {
    assertEquals(getNextPassword("aaaaaaaz"), "aaaaaaba");
  });
  it('Should return "aaaaaabb" after "aaaaaaba"', function () {
    assertEquals(getNextPassword("aaaaaaba"), "aaaaaabb");
  });
  it('Should return "aaaaabaa" after "aaaaaazz"', function () {
    assertEquals(getNextPassword("aaaaaazz"), "aaaaabaa");
  });
  it('Should return "aaaaabab" after "aaaaabaa"', function () {
    assertEquals(getNextPassword("aaaaabaa"), "aaaaabab");
  });
  it('Should return "aaaaabac" after "aaaaabab"', function () {
    assertEquals(getNextPassword("aaaaabab"), "aaaaabac");
  });
});
