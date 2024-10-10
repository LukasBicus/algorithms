export type ComputerState = {
  a: number;
  b: number;
  offset: number;
};

export enum InstructionShortcut {
  Hlf = "hlf",
  Tpl = "tpl",
  Inc = "inc",
  Jmp = "jmp",
  Jie = "jie",
  Jio = "jio",
}

// half
export type HlfInstruction = {
  shortcut: InstructionShortcut.Hlf;
  register: string;
  offsetChange: 1;
};

// triple
export type TplInstruction = {
  shortcut: InstructionShortcut.Tpl;
  register: string;
  offsetChange: 1;
};

// increment
export type IncInstruction = {
  shortcut: InstructionShortcut.Inc;
  register: string;
  offsetChange: 1;
};

// jump
export type JmpInstruction = {
  shortcut: InstructionShortcut.Jmp;
  offsetChange: number;
};

// jump if even
export type JieInstruction = {
  shortcut: InstructionShortcut.Jie;
  register: string;
  offsetChange: number;
};
// jump if one
export type JioInstruction = {
  shortcut: InstructionShortcut.Jio;
  register: string;
  offsetChange: number;
};

type Instruction =
  | HlfInstruction
  | TplInstruction
  | IncInstruction
  | JmpInstruction
  | JieInstruction
  | JioInstruction;

const simpleRegex = /(hlf|tpl|inc) ([ab])/;
const jmpRegex = /jmp ([+-])(\d)+/;
const jiRegex = /(jie|jio) ([ab]), ([+-])(\d)+/;

export function parseInstructionLine(line: string): Instruction | null {
  const simpleMatch = line.match(simpleRegex);
  if (simpleMatch) {
    return {
      shortcut: simpleMatch[1] as InstructionShortcut.Hlf,
      register: simpleMatch[2],
      offsetChange: 1,
    };
  } else {
    const jumpMatch = line.match(jmpRegex);
    if (jumpMatch) {
      const absoluteChange = parseInt(jumpMatch[2], 10);
      return {
        shortcut: InstructionShortcut.Jmp,
        offsetChange: jumpMatch[1] === "+" ? absoluteChange : -absoluteChange,
      };
    } else {
      const jumpIfMatch = line.match(jiRegex);
      if (jumpIfMatch) {
        const absoluteChange = parseInt(jumpIfMatch[4], 10);
        return {
          shortcut: jumpIfMatch[1] as InstructionShortcut.Jie,
          register: jumpIfMatch[2],
          offsetChange: jumpIfMatch[3] === "+"
            ? absoluteChange
            : -absoluteChange,
        };
      }
    }
  }
  return null;
}

export function processInstruction(
  state: ComputerState,
  instruction: Instruction,
): ComputerState {
  return state;
}
