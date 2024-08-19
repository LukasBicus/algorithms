import assert from "node:assert";
import {describe, it} from "node:test";
import {doesContainAbCdPqXy, doesContainALetterTwiceInRow, hasAllVowels} from "./utils";

describe('hasAllVowels', () => {
  it('Should return false for a word without all vowels', () => {
    assert.equal(hasAllVowels('uaei'), false)
  })
  it('Should return true for a word with all vowels', () => {
    assert.equal(hasAllVowels('uaeio'), true)
  })
})

describe('doesContainAbCdPqXy', () => {
  it('Should return false for invalid input', () => {
    assert.equal(doesContainAbCdPqXy('acpxbdqy'), false)
  })
  it('Should return true for invalid input', () => {
    assert.equal(doesContainAbCdPqXy('zxcvzxcv   ab'), true)
    assert.equal(doesContainAbCdPqXy('zxcvzxcv   cd'), true)
    assert.equal(doesContainAbCdPqXy('pq   zxcvzxcv'), true)
    assert.equal(doesContainAbCdPqXy('xy   zxcvzxcv'), true)
  })
})
describe('doesContainALetterTwiceInRow', () => {
  it('Should return false for invalid input', () => {
    assert.equal(doesContainALetterTwiceInRow('acpxbdqy'), false)
  })
  it('Should return true for invalid input', () => {
    assert.equal(doesContainALetterTwiceInRow('asdfasdf aa'), true)
    assert.equal(doesContainALetterTwiceInRow('asdasdf bb sadfasdf'), true)
    assert.equal(doesContainALetterTwiceInRow('cc asdfadsf asdfa'), true)
    assert.equal(doesContainALetterTwiceInRow('aa bb cc'), true)
  })
})