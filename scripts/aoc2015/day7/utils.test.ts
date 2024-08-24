import { assertEquals, assertThrows } from "jsr:@std/assert@1";
import { describe, it } from "@std/testing/bdd";
import { parseSignalLine } from "./utils.ts";

describe("parseSignalLine", () => {
  it("Should return a signal value for line with signal gate", () => {
    assertEquals(parseSignalLine("123 -> x"), {
      outputWire: "x",
      inputSignal: 123,
    });
  });
  it("Should throw for unknown signal line", () => {
    assertThrows(
      () => {
        parseSignalLine("unknown signal line");
      },
      Error,
      "Unknown signal line",
    );
  });
});
