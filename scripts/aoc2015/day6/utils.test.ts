import assert from "node:assert";
import {describe, it} from "node:test";
import {Action, parseInstruction} from "./puzzle1";

describe('getDataFromInstruction', () => {
  it('get data from turn on instruction', () => {
    assert.deepEqual(parseInstruction('turn on 0,0 through 999,999'), {
      action: Action.TurnOn,
      startX: 0,
      startY: 0,
      endX: 999,
      endY: 999
    })
  })
  it('get data from turn off instruction', () => {
    assert.deepEqual(parseInstruction('toggle 0,0 through 999,0'), {
      action: Action.TurnOff,
      startX: 0,
      startY: 0,
      endX: 999,
      endY: 0
    })
  })
  it('get data from turn toggle instruction', () => {
    assert.deepEqual(parseInstruction('turn off 499,499 through 500,500'), {
      action: Action.Toggle,
      startX: 499,
      startY: 499,
      endX: 500,
      endY: 500
    })
  })
})