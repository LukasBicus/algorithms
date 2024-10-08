import { assertEquals, assertThrows } from "jsr:@std/assert@1";
import { beforeEach, describe, it } from "@std/testing/bdd";
import {
  AndLogicGate,
  AndLogicGateWithInputSignal,
  GateOperator,
  LogicGate,
  LShiftLogicGate,
  NotLogicGate,
  OrLogicGate,
  parseSignalLine,
  resolveSignalForWire,
  RShiftLogicGate,
  SignalLogicGate,
  SignalLogicGateWith2Wires,
} from "./utils.ts";

describe("parseSignalLine", () => {
  it("Should throw for unknown signal line", () => {
    assertThrows(
      () => {
        parseSignalLine("unknown signal line");
      },
      Error,
      "Unknown signal line",
    );
  });
  it("Should return a signal value for line with signal gate", () => {
    assertEquals(parseSignalLine("123 -> x"), {
      outputWire: "x",
      inputSignal: 123,
      operator: null,
    });
  });
  it("Should return a signal value for line with signal gate with input signal", () => {
    assertEquals(parseSignalLine("xx -> x"), {
      outputWire: "x",
      inputWire: "xx",
      operator: null,
    });
  });

  it("Should return a signal value for line with AND gate", () => {
    assertEquals(parseSignalLine("x AND y -> d"), {
      outputWire: "d",
      inputWireA: "x",
      inputWireB: "y",
      operator: GateOperator.And,
    });
  });
  it("Should return a signal value for line with AND gate with input signal", () => {
    assertEquals(parseSignalLine("1 AND y -> d"), {
      outputWire: "d",
      inputSignal: 1,
      inputWire: "y",
      operator: GateOperator.And,
    });
  });
  it("Should return a signal value for line with OR gate", () => {
    assertEquals(parseSignalLine("x OR y -> d"), {
      outputWire: "d",
      inputWireA: "x",
      inputWireB: "y",
      operator: GateOperator.Or,
    });
  });
  it("Should return a signal value for line with LSHIFT gate", () => {
    assertEquals(parseSignalLine("x LSHIFT 2 -> f"), {
      outputWire: "f",
      inputWire: "x",
      inputSignal: 2,
      operator: GateOperator.LShift,
    });
  });
  it("Should return a signal value for line with RSHIFT gate", () => {
    assertEquals(parseSignalLine("y RSHIFT 3 -> g"), {
      outputWire: "g",
      inputWire: "y",
      inputSignal: 3,
      operator: GateOperator.RShift,
    });
  });
  it("Should return a signal value for line with NOT gate", () => {
    assertEquals(parseSignalLine("NOT x -> h"), {
      outputWire: "h",
      inputWire: "x",
      operator: GateOperator.Not,
    });
  });
});

describe("resolveSignalForWire", () => {
  let resolvedSignals: Map<string, number>;
  let gates: Map<string, LogicGate>;
  beforeEach(() => {
    resolvedSignals = new Map<string, number>();
    gates = new Map<string, LogicGate>();
  });
  it("Should throw for unresolvable wire", () => {
    assertThrows(
      () => {
        resolveSignalForWire({
          resolvedSignals,
          gates,
          wire: "unknown wire",
        });
      },
      Error,
      "Unable to resolve signal for wire",
    );
  });

  it("Should return a signal value of already known signal", () => {
    resolvedSignals.set("a", 10);

    assertEquals(
      resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: "a",
      }),
      10,
    );
  });

  it("Should return a signal value for line with signal gate", () => {
    const gate: SignalLogicGate = {
      outputWire: "b",
      inputSignal: 12,
      operator: null,
    };
    gates.set(
      gate.outputWire,
      gate,
    );
    assertEquals(
      resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.outputWire,
      }),
      gate.inputSignal,
    );
    assertEquals(resolvedSignals.get(gate.outputWire), gate.inputSignal);
  });

  it("Should return a signal value for line with signal gate with 2 wires", () => {
    const gate: SignalLogicGateWith2Wires = {
      outputWire: "ba",
      inputWire: "bb",
      operator: null,
    };
    gates.set(
      gate.outputWire,
      gate,
    );
    resolvedSignals.set(gate.inputWire, 10);
    assertEquals(
      resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.outputWire,
      }),
      10,
    );
    assertEquals(resolvedSignals.get(gate.outputWire), 10);
  });

  it("Should return a signal value for line with AND gate", () => {
    const gate: AndLogicGate = {
      outputWire: "c",
      inputWireA: "d",
      inputWireB: "e",
      operator: GateOperator.And,
    };
    gates.set(
      gate.outputWire,
      gate,
    );
    resolvedSignals.set(gate.inputWireA, 3);
    resolvedSignals.set(gate.inputWireB, 5);
    assertEquals(
      resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.outputWire,
      }),
      3 & 5, //1
    );
    assertEquals(resolvedSignals.get(gate.outputWire), 3 & 5);
  });

  it("Should return a signal value for line with AND gate with input signal", () => {
    const gate: AndLogicGateWithInputSignal = {
      outputWire: "cx",
      inputWire: "dx",
      inputSignal: 1,
      operator: GateOperator.And,
    };
    gates.set(
      gate.outputWire,
      gate,
    );
    resolvedSignals.set(gate.inputWire, 3);
    assertEquals(
      resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.outputWire,
      }),
      3 & 1,
    );
    assertEquals(resolvedSignals.get(gate.outputWire), 3 & 1);
  });

  it("Should return a signal value for line with OR gate", () => {
    const gate: OrLogicGate = {
      outputWire: "f",
      inputWireA: "g",
      inputWireB: "h",
      operator: GateOperator.Or,
    };
    gates.set(
      gate.outputWire,
      gate,
    );
    resolvedSignals.set(gate.inputWireA, 3);
    resolvedSignals.set(gate.inputWireB, 5);
    assertEquals(
      resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.outputWire,
      }),
      3 | 5, // 7
    );
    assertEquals(resolvedSignals.get(gate.outputWire), 3 | 5);
  });

  it("Should return a signal value for line with NOT gate", () => {
    const gate: NotLogicGate = {
      outputWire: "i",
      inputWire: "j",
      operator: GateOperator.Not,
    };
    gates.set(
      gate.outputWire,
      gate,
    );
    resolvedSignals.set(gate.inputWire, 123);
    assertEquals(
      resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.outputWire,
      }),
      65412,
    );
    assertEquals(resolvedSignals.get(gate.outputWire), 65412);
  });

  it("Should return a signal value for line with LSHIFT gate", () => {
    const gate: LShiftLogicGate = {
      outputWire: "xf",
      inputWire: "x",
      inputSignal: 2,
      operator: GateOperator.LShift,
    };
    gates.set(
      gate.outputWire,
      gate,
    );
    resolvedSignals.set(gate.inputWire, 123);
    assertEquals(
      resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.outputWire,
      }),
      492, // 20
    );
    assertEquals(resolvedSignals.get(gate.outputWire), 492);
  });

  it("Should return a signal value for line with RSHIFT gate", () => {
    const gate: RShiftLogicGate = {
      outputWire: "yg",
      inputWire: "y",
      inputSignal: 2,
      operator: GateOperator.RShift,
    };
    gates.set(
      gate.outputWire,
      gate,
    );
    resolvedSignals.set(gate.inputWire, 456);
    assertEquals(
      resolveSignalForWire({
        resolvedSignals,
        gates,
        wire: gate.outputWire,
      }),
      114,
    );
    assertEquals(resolvedSignals.get(gate.outputWire), 114);
  });
});
