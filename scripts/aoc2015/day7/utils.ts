// required utils
// function for parsing the signalLine

export enum GateOperator {
  And = "AND",
  Or = "OR",
  LShift = "LSHIFT",
  RShift = "RSHIFT",
  Not = "NOT",
}

type BaseLogicGate = {
  outputWire: string;
};

// 123 -> x
export type SignalLogicGate = BaseLogicGate & {
  inputSignal: number;
  operator: null;
};

// x AND y -> d
export type AndLogicGate = BaseLogicGate & {
  operator: GateOperator.And;
  inputWireA: string;
  inputWireB: string;
};
// x OR y -> e
export type OrLogicGate = BaseLogicGate & {
  operator: GateOperator.Or;
  inputWireA: string;
  inputWireB: string;
};
// x LSHIFT 2 -> f
export type LShiftLogicGate = BaseLogicGate & {
  operator: GateOperator.LShift;
  inputWire: string;
  inputSignal: number;
};
// y RSHIFT 2 -> g
export type RShiftLogicGate = BaseLogicGate & {
  operator: GateOperator.RShift;
  inputWire: string;
  inputSignal: number;
};
// NOT x -> h
export type NotLogicGate = BaseLogicGate & {
  operator: GateOperator.Not;
  inputWire: string;
};

export type LogicGate =
  | SignalLogicGate
  | AndLogicGate
  | OrLogicGate
  | LShiftLogicGate
  | RShiftLogicGate
  | NotLogicGate;

const operatorRegex = /(AND|OR|LSHIFT|RSHIFT|NOT)/;
const signalGateRegex = /(\d+) -> ([a-z]+)/;
// x AND y -> d
const andGateRegex = /([a-z]+) AND ([a-z]+) -> ([a-z]+)/;
// x OR y -> d
const orGateRegex = /([a-z]+) OR ([a-z]+) -> ([a-z]+)/;
// x LSHIFT 2 -> f
const lShiftGateRegex = /([a-z]+) LSHIFT (\d+) -> ([a-z]+)/;
// y RSHIFT 2 -> g
const rShiftGateRegex = /([a-z]+) RSHIFT (\d+) -> ([a-z]+)/;
// NOT x -> h
const notGateRegex = /NOT ([a-z]+) -> ([a-z]+)/;

export function parseSignalLine(line: string): LogicGate {
  const operatorMatch = line.match(operatorRegex);
  // parsing "123 -> x"
  if (!operatorMatch) {
    const match = line.match(signalGateRegex);
    if (match) {
      return {
        inputSignal: parseInt(match[1], 10),
        outputWire: match[2],
        operator: null,
      } satisfies SignalLogicGate;
    }
  } else {
    const operator = operatorMatch[1] as GateOperator;
    if (operator === GateOperator.And) {
      const match = line.match(andGateRegex);
      if (match) {
        // x AND y -> d
        return {
          operator: GateOperator.And,
          inputWireA: match[1],
          inputWireB: match[2],
          outputWire: match[3],
        } satisfies AndLogicGate;
      }
    } else if (operator === GateOperator.Or) {
      const match = line.match(orGateRegex);
      if (match) {
        // x OR y -> d
        return {
          operator: GateOperator.Or,
          inputWireA: match[1],
          inputWireB: match[2],
          outputWire: match[3],
        } satisfies OrLogicGate;
      }
    } else if (operator === GateOperator.LShift) {
      const match = line.match(lShiftGateRegex);
      if (match) {
        // x LSHIFT 2 -> f
        return {
          operator: GateOperator.LShift,
          inputWire: match[1],
          inputSignal: parseInt(match[2], 10),
          outputWire: match[3],
        } satisfies LShiftLogicGate;
      }
    } else if (operator === GateOperator.RShift) {
      const match = line.match(rShiftGateRegex);
      if (match) {
        // y RSHIFT 2 -> g
        return {
          operator: GateOperator.RShift,
          inputWire: match[1],
          inputSignal: parseInt(match[2], 10),
          outputWire: match[3],
        } satisfies RShiftLogicGate;
      }
    } else if (operator === GateOperator.Not) {
      const match = line.match(notGateRegex);
      if (match) {
        // NOT x -> h
        return {
          operator,
          inputWire: match[1],
          outputWire: match[2],
        } satisfies NotLogicGate;
      }
    }
  }
  throw new Error("Unknown signal line: " + line);
}

// recursive function: resolveSignalForWire

// resolveSignalForWire - recursive function, that will findLogic gate for a wire

export function resolveSignalForWire({
  wire,
  resolvedSignals,
  gates,
}: {
  resolvedSignals: Map<string, number>;
  gates: Map<string, LogicGate>;
  wire: string;
}): number {
  if (resolvedSignals.has(wire)) {
    // - base case1: it will get signal for wire, if it's already defined
    const signal = resolvedSignals.get(wire);
    if (typeof signal !== "undefined") {
      return signal;
    } else {
      throw new Error("Undefined signal is stored in map!");
    }
  }
  const gate = gates.get(wire);
  if (gate) {
    const { operator } = gate;
    if (operator === null) {
      // - base case2: it will resolves signal for wire, if it's simple signalLogicGate
      // + it will store the signal in `resolvedSignals` map
      resolvedSignals.set(wire, gate.inputSignal);
      return gate.inputSignal;
    }

    // - case 3: if its another logicGate:
    //          - it will recursively call resolveSignalForWire with required wire
    //          - it will store resolved wire
    //          - it will compute signal with resolved signals on wires required for logicGate
    //          - it will return computed signal

    if (operator === GateOperator.And) {
      const wireASignal = resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.inputWireA,
      });
      const wireBSignal = resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.inputWireB,
      });
      const resolvedSignal = wireASignal & wireBSignal;
      resolvedSignals.set(wire, resolvedSignal);
      return resolvedSignal;
    }

    if (operator === GateOperator.Or) {
      const wireASignal = resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.inputWireA,
      });
      const wireBSignal = resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.inputWireB,
      });
      const resolvedSignal = wireASignal | wireBSignal;
      resolvedSignals.set(wire, resolvedSignal);
      return resolvedSignal;
    }

    if (operator === GateOperator.Not) {
      const inputWireSignal = resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.inputWire,
      });
      const resolvedSignal = ~inputWireSignal & 0xFFFF;
      resolvedSignals.set(wire, resolvedSignal);
      return resolvedSignal;
    }

    if (operator === GateOperator.LShift) {
      const inputWireSignal = resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.inputWire,
      });
      const resolvedSignal = (inputWireSignal << gate.inputSignal) & 0xFFFF;
      resolvedSignals.set(wire, resolvedSignal);
      return resolvedSignal;
    }

    if (operator === GateOperator.RShift) {
      const inputWireSignal = resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.inputWire,
      });
      const resolvedSignal = (inputWireSignal >> gate.inputSignal) & 0xFFFF;
      resolvedSignals.set(wire, resolvedSignal);
      return resolvedSignal;
    }
  }
  throw new Error("Unable to resolve signal for wire");
}
