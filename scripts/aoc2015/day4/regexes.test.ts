import {it} from 'node:test'
import assert from 'node:assert'
import {startRegex1, startRegex2} from "./regexes";

it('should test start of hash', () => {
  assert.equal(startRegex1.test('e00000'), false)
  assert.equal(startRegex1.test('e000001'), false)
  assert.equal(startRegex1.test('00000asdfas'), false)
  assert.equal(startRegex1.test('00001asdfas'), false)
  assert.equal(startRegex1.test('e000007asdfas'), false)
  assert.equal(startRegex1.test('000001asdfas'), true)
  assert.equal(startRegex1.test('000002asdfas'), true)
  assert.equal(startRegex1.test('000009asdfas'), true)
  assert.equal(startRegex1.test('000000asdfas'), false)
})

it('should test start of hash 2', () => {
  assert.equal(startRegex2.test('e00000'), false)
  assert.equal(startRegex2.test('e000000'), false)
  assert.equal(startRegex2.test('00000asdfas'), false)
  assert.equal(startRegex2.test('e000000asdfas'), false)
  assert.equal(startRegex2.test('000009asdfas'), false)
  assert.equal(startRegex2.test('000000asdfas'), true)
})