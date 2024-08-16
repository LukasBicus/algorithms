import {it} from 'node:test'
import assert from 'node:assert'
import {startRegex} from "./puzzle1";

it('should test start of hash', () => {
  assert.equal(startRegex.test('e00000'), false)
  assert.equal(startRegex.test('e000001'), false)
  assert.equal(startRegex.test('00000asdfas'), false)
  assert.equal(startRegex.test('00001asdfas'), false)
  assert.equal(startRegex.test('e000007asdfas'), false)
  assert.equal(startRegex.test('000001asdfas'), true)
  assert.equal(startRegex.test('000002asdfas'), true)
  assert.equal(startRegex.test('000009asdfas'), true)
  assert.equal(startRegex.test('000000asdfas'), false)
})