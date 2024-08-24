import { assertEquals, assertThrows } from "jsr:@std/assert@1";
import { describe, it } from "@std/testing/bdd";
import { GateOperator, parseSignalLine } from "./utils.ts";

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
  it("Should return a signal value for line with OR gate", () => {
    assertEquals(parseSignalLine("x OR y -> d"), {
      outputWire: "d",
      inputWireA: "x",
      inputWireB: "y",
      operator: GateOperator.Or,
    });
  });
});
