// required utils
// function for parsing the signalLine

enum GateOperator {
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

export function parseSignalLine(line: string): LogicGate {
  const operator = line.match(operatorRegex);
  // parsing "123 -> x"
  if (!operator) {
    const result = line.match(signalGateRegex);
    if (result) {
      return {
        inputSignal: parseInt(result[1], 10),
        outputWire: result[2],
      } satisfies SignalLogicGate;
    }
  }
  // x AND y -> d
  // x OR y -> e
  // x LSHIFT 2 -> f
  // y RSHIFT 2 -> g
  // NOT x -> h
  throw new Error("Unknown signal line");
}

// function for resolvingSignalForLogicGate
// recursive function: resolveSignalForWire
