import assert from "node:assert";
import {describe, it} from "node:test";
import {hasAllVowels} from "./utils";

describe('hasAllVowels', () => {
  it('Should fail for a word without all vowels', () => {
    assert.equal(hasAllVowels('uaei'), false)
  })
  it('Should pass for a word with all vowels', () => {
    assert.equal(hasAllVowels('uaeio'), true)
  })
})