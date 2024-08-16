import {it} from 'node:test'
import assert from 'node:assert'
import {startRegex} from "./puzzle2";

it('should test start of hash 2', () => {
  assert.equal(startRegex.test('e00000'), false)
  assert.equal(startRegex.test('e000000'), false)
  assert.equal(startRegex.test('00000asdfas'), false)
  assert.equal(startRegex.test('e000000asdfas'), false)
  assert.equal(startRegex.test('000009asdfas'), false)
  assert.equal(startRegex.test('000000asdfas'), true)
})