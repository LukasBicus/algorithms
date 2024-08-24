// required utils
// function for parsing the signalLine

export enum GateOperator {
  And = "AND",
  Or = "OR",
  Lshift = "LSHIFT",
  Rshift = "RSHIFT",
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
    }
  }
  // x OR y -> e
  // x LSHIFT 2 -> f
  // y RSHIFT 2 -> g
  // NOT x -> h
  throw new Error("Unknown signal line");
}

// function for resolvingSignalForLogicGate
// recursive function: resolveSignalForWire
