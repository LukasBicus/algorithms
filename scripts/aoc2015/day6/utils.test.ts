import assert from "node:assert";
import {beforeEach, describe, it} from "node:test";
import {Action, getGridKey, LightState, parseInstruction, performAction, setupGrid} from "./puzzle1";

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
  it('get data from toggle instruction', {skip: false}, () => {
    assert.deepEqual(parseInstruction('toggle 0,0 through 999,0'), {
      action: Action.Toggle,
      startX: 0,
      startY: 0,
      endX: 999,
      endY: 0
    })
  })
  it('get data from turn off instruction', {skip: false}, () => {
    assert.deepEqual(parseInstruction('turn off 499,499 through 500,500'), {
      action: Action.TurnOff,
      startX: 499,
      startY: 499,
      endX: 500,
      endY: 500
    })
  })
})

describe('performAction', () => {
  let grid: Map<string, LightState> = new Map<string, LightState>()
  beforeEach(() => {
    setupGrid(grid)
  })
  it('should turn on', () => {
    const instruction = {action: Action.TurnOn, startX: 0, startY: 0, endX: 5, endY: 3}
    const changedGrid = performAction(grid, instruction)
    for (let x = instruction.startX; x <= instruction.endX; x++) {
      for (let y = instruction.startY; y <= instruction.endY; y++) {
        assert.equal(changedGrid.get(getGridKey({x, y})), LightState.TurnedOn)
      }
    }
  })
  it('should turn off', () => {
    const instruction = {action: Action.TurnOff, startX: 1, startY: 2, endX: 5, endY: 3}
    const changedGrid = performAction(grid, instruction)
    for (let x = instruction.startX; x <= instruction.endX; x++) {
      for (let y = instruction.startY; y <= instruction.endY; y++) {
        assert.equal(changedGrid.get(getGridKey({x, y})), LightState.TurnedOff)
      }
    }
  })

  it('should toggle', () => {
    grid = performAction(grid, {action: Action.TurnOn, startX: 1, startY: 2, endX: 1, endY: 3})
    /**
     . . . . . .
     . * . . . .
     . * . . . .
     . * . . . .
     . . . . . .
     */
    const instruction = {action: Action.Toggle, startX: 1, startY: 2, endX: 2, endY: 4}
    grid = performAction(grid, instruction)
    /**
     . * * . . .
     . . * . . .
     . . * . . .
     . . . . . .
     . . . . . .
     */
    assert.equal(grid.get(getGridKey({x: 1, y: 4})), LightState.TurnedOn)
    assert.equal(grid.get(getGridKey({x: 2, y: 4})), LightState.TurnedOn)
    assert.equal(grid.get(getGridKey({x: 2, y: 3})), LightState.TurnedOn)
    assert.equal(grid.get(getGridKey({x: 2, y: 2})), LightState.TurnedOn)
    assert.equal(grid.get(getGridKey({x: 2, y: 1})), LightState.TurnedOff)
    assert.equal(grid.get(getGridKey({x: 1, y: 3})), LightState.TurnedOff)
    assert.equal(grid.get(getGridKey({x: 1, y: 2})), LightState.TurnedOff)
    assert.equal(grid.get(getGridKey({x: 1, y: 1})), LightState.TurnedOff)
    assert.equal(grid.get(getGridKey({x: 0, y: 0})), LightState.TurnedOff)

  })
})