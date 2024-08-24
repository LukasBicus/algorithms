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
type SignalLogicGate = BaseLogicGate & {
  inputSignal: number;
};

type LogicGateWithOperator = BaseLogicGate & {
  operator: GateOperator;
};
// x AND y -> d
type AndLogicGate = LogicGateWithOperator & {
  inputWireA: string;
  inputWireB: string;
};
// x OR y -> e
type OrLogicGate = LogicGateWithOperator & {
  inputWireA: string;
  inputWireB: string;
};
// x LSHIFT 2 -> f
type LShiftLogicGate = LogicGateWithOperator & {
  inputWire: string;
  inputSignal: number;
};
// y RSHIFT 2 -> g
type RShiftLogicGate = LogicGateWithOperator & {
  inputWire: string;
  inputSignal: number;
};
// NOT x -> h
type NotLogicGate = LogicGateWithOperator & {
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
  throw new Error("Unknown signal line");
}

// function for resolvingSignalForLogicGate
// recursive function: resolveSignalForWire
