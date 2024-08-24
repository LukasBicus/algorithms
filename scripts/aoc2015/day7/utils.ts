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

export function parseSignalLine(line: string): LogicGate {
  throw new Error("Unknown signal line");
}

// function for resolvingSignalForLogicGate
// recursive function: resolveSignalForWire
