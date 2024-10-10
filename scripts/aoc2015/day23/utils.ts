type RegistersState = {
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
type HlfInstruction = {
  shortcut: InstructionShortcut.Hlf;
  register: string;
  offsetChange: 1;
};

// triple
type TplInstruction = {
  shortcut: InstructionShortcut.Tpl;
  register: string;
  offsetChange: 1;
};

// increment
type IncInstruction = {
  shortcut: InstructionShortcut.Inc;
  register: string;
  offsetChange: 1;
};

// jump
type JmpInstruction = {
  shortcut: InstructionShortcut.Jmp;
  offsetChange: number;
};

// jump if even
type JieInstruction = {
  shortcut: InstructionShortcut.Jie;
  register: string;
  offsetChange: number;
};
// jump if one
type JioInstruction = {
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

export function parseInstructionLine(line: string): Instruction | null {
  return null;
}
