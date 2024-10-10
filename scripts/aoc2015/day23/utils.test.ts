import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  ComputerState,
  HlfInstruction,
  IncInstruction,
  InstructionShortcut,
  JieInstruction,
  JioInstruction,
  JmpInstruction,
  parseInstructionLine,
  processInstruction,
  TplInstruction,
} from "./utils.ts";

describe("parseInstructionLine", function () {
  it("should return null for invalid line", function () {
    assertEquals(parseInstructionLine("invalid instruction"), null);
  });

  it("should return half instruction", function () {
    assertEquals(parseInstructionLine("hlf a"), {
      register: "a",
      shortcut: InstructionShortcut.Hlf,
      offsetChange: 1,
    });
  });

  it("should return triple instruction", function () {
    assertEquals(parseInstructionLine("tpl a"), {
      register: "a",
      shortcut: InstructionShortcut.Tpl,
      offsetChange: 1,
    });
  });

  it("should return increment instruction", function () {
    assertEquals(parseInstructionLine("inc a"), {
      register: "a",
      shortcut: InstructionShortcut.Inc,
      offsetChange: 1,
    });
  });

  it("should return jump instruction", function () {
    assertEquals(parseInstructionLine("jmp +2"), {
      shortcut: InstructionShortcut.Jmp,
      offsetChange: 2,
    });
    assertEquals(parseInstructionLine("jmp +22"), {
      shortcut: InstructionShortcut.Jmp,
      offsetChange: 22,
    });
    assertEquals(parseInstructionLine("jmp -7"), {
      shortcut: InstructionShortcut.Jmp,
      offsetChange: -7,
    });
  });

  it("should return jump if even instruction", function () {
    assertEquals(parseInstructionLine("jie a, +8"), {
      shortcut: InstructionShortcut.Jie,
      register: "a",
      offsetChange: 8,
    });
    assertEquals(parseInstructionLine("jie b, -2"), {
      shortcut: InstructionShortcut.Jie,
      register: "b",
      offsetChange: -2,
    });
  });

  it("should return jump if one instruction", function () {
    assertEquals(parseInstructionLine("jio a, +8"), {
      shortcut: InstructionShortcut.Jio,
      register: "a",
      offsetChange: 8,
    });
    assertEquals(parseInstructionLine("jio b, -2"), {
      shortcut: InstructionShortcut.Jio,
      register: "b",
      offsetChange: -2,
    });
  });
});

describe("processInstruction", function () {
  const initState: ComputerState = {
    a: 10,
    b: 1,
    offset: 10,
  };
  it("should process half instruction", function () {
    const instruction: HlfInstruction = {
      offsetChange: 1,
      register: "a",
      shortcut: InstructionShortcut.Hlf,
    };
    assertEquals(
      processInstruction(initState, instruction),
      {
        ...initState,
        a: Math.floor(initState.a / 2),
        offset: initState.offset + instruction.offsetChange,
      },
    );
  });
  it("should process triple instruction", function () {
    const instruction: TplInstruction = {
      offsetChange: 1,
      register: "a",
      shortcut: InstructionShortcut.Tpl,
    };
    assertEquals(
      processInstruction(initState, instruction),
      {
        ...initState,
        a: initState.a * 3,
        offset: initState.offset + instruction.offsetChange,
      },
    );
  });
  it("should process increment instruction", function () {
    const instruction: IncInstruction = {
      offsetChange: 1,
      register: "a",
      shortcut: InstructionShortcut.Inc,
    };
    assertEquals(
      processInstruction(initState, instruction),
      {
        ...initState,
        a: initState.a + 1,
        offset: initState.offset + instruction.offsetChange,
      },
    );
  });

  it("should process jump instruction", function () {
    const instruction: JmpInstruction = {
      offsetChange: 8,
      shortcut: InstructionShortcut.Jmp,
    };
    assertEquals(
      processInstruction(initState, instruction),
      { ...initState, offset: initState.offset + instruction.offsetChange },
    );
  });

  it("should process jump if even instruction", function () {
    const instructionA: JieInstruction = {
      offsetChange: 8,
      register: "a",
      shortcut: InstructionShortcut.Jie,
    };
    const instructionB: JieInstruction = {
      offsetChange: 8,
      register: "b",
      shortcut: InstructionShortcut.Jie,
    };
    assertEquals(
      processInstruction(initState, instructionA),
      { ...initState, offset: initState.offset + instructionA.offsetChange },
    );
    assertEquals(
      processInstruction(initState, instructionB),
      { ...initState, offset: initState.offset + 1 },
    );
  });

  it("should process jump if one instruction", function () {
    const instructionA: JioInstruction = {
      offsetChange: 8,
      register: "a",
      shortcut: InstructionShortcut.Jio,
    };
    const instructionB: JioInstruction = {
      offsetChange: 8,
      register: "b",
      shortcut: InstructionShortcut.Jio,
    };
    assertEquals(
      processInstruction(initState, instructionA),
      { ...initState, offset: initState.offset + 1 },
    );
    assertEquals(
      processInstruction(initState, instructionB),
      { ...initState, offset: initState.offset + instructionA.offsetChange },
    );
  });
});
