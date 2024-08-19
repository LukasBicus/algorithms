import assert from "node:assert";
import {describe, it} from "node:test";
import {
  doesContainAbCdPqXy,
  doesContainALetterTwiceInRow,
  has2SameLettersWith1BetweenThem,
  hasAtLeast3Vowels
} from "./utils";

describe('hasAtLeast3Vowels', () => {
  it('Should return false for a word without all vowels', () => {
    assert.equal(hasAtLeast3Vowels('ua'), false)
    assert.equal(hasAtLeast3Vowels('bnm ua rty'), false)
  })
  it('Should return true for a word with all vowels', () => {
    assert.equal(hasAtLeast3Vowels('uaei'), true)
    assert.equal(hasAtLeast3Vowels('uaeio'), true)
  })
  it('Should return true for a word aaa', () => {
    assert.equal(hasAtLeast3Vowels('aaa'), true)
    assert.equal(hasAtLeast3Vowels('aaab'), true)
  })
})

describe('doesContainAbCdPqXy', () => {
  it('Should return false for invalid input', () => {
    assert.equal(doesContainAbCdPqXy('acpxbdqy'), false)
  })
  it('Should return true for valid input', () => {
    assert.equal(doesContainAbCdPqXy('zxcvzxcv   ab'), true)
    assert.equal(doesContainAbCdPqXy('zxcvzxcv   cd'), true)
    assert.equal(doesContainAbCdPqXy('zxcvzxcv   cd asdfas'), true)
    assert.equal(doesContainAbCdPqXy('pq   zxcvzxcv'), true)
    assert.equal(doesContainAbCdPqXy('xy   zxcvzxcv'), true)
  })
})
describe('doesContainALetterTwiceInRow', () => {
  it('Should return false for invalid input', () => {
    assert.equal(doesContainALetterTwiceInRow('acpxbdqy'), false)
  })
  it('Should return true for valid input', () => {
    assert.equal(doesContainALetterTwiceInRow('asdfasdf aa'), true)
    assert.equal(doesContainALetterTwiceInRow('asdasdf bb sadfasdf'), true)
    assert.equal(doesContainALetterTwiceInRow('cc asdfadsf asdfa'), true)
    assert.equal(doesContainALetterTwiceInRow('aa bb cc'), true)
  })
})

describe('has2SameLettersWith1BetweenThem', () => {
  it('Should return false for invalid input', () => {
    assert.equal(has2SameLettersWith1BetweenThem('abcabc'), false)
  })
  it('Should return true for valid input', () => {
    assert.equal(has2SameLettersWith1BetweenThem('aaa'), true)
    assert.equal(has2SameLettersWith1BetweenThem('aba'), true)
    assert.equal(has2SameLettersWith1BetweenThem('aasdfasdf aba'), true)
    assert.equal(has2SameLettersWith1BetweenThem('aba aasdfasdf '), true)
    assert.equal(has2SameLettersWith1BetweenThem('xcvbxcvbaba aasdfasdf '), true)

  })
})