/*
--- Day 23: Opening the Turing Lock ---
Little Jane Marie just got her very first computer for Christmas from some unknown benefactor. It comes with instructions and an example program, but the computer itself seems to be malfunctioning. She's curious what the program does, and would like you to help her run it.

The manual explains that the computer supports two registers and six instructions (truly, it goes on to remind the reader, a state-of-the-art technology).
The registers are named a and b, can hold any non-negative integer, and begin with a value of 0.


The instructions are as follows:

hlf r sets register r to half its current value, then continues with the next instruction.
tpl r sets register r to triple its current value, then continues with the next instruction.
inc r increments register r, adding 1 to it, then continues with the next instruction.
jmp offset is a jump; it continues with the instruction offset away relative to itself.
jie r, offset is like jmp, but only jumps if register r is even ("jump if even").
jio r, offset is like jmp, but only jumps if register r is 1 ("jump if one", not odd).

All three jump instructions work with an offset relative to that instruction. The offset is always written with a prefix + or - to indicate the direction of the jump (forward or backward, respectively). For example, jmp +1 would simply continue with the next instruction, while jmp +0 would continuously jump back to itself forever.

The program exits when it tries to run an instruction beyond the ones defined.

For example, this program sets a to 2, because the jio instruction causes it to skip the tpl instruction:

inc a
jio a, +2
tpl a
inc a
What is the value in register b when the program in your puzzle input is finished executing?
 */

// register a, non-negative int, starts with 0
// register b, non-negative int, starts with 0

// The instructions are as follows:
//
// `hlf` r sets register r to half its current value, then continues with the next instruction.
// `tpl` r sets register r to triple its current value, then continues with the next instruction.
// `inc` r increments register r, adding 1 to it, then continues with the next instruction.
// `jmp` offset is a jump; it continues with the instruction offset away relative to itself.
// `jie` r, offset is like jmp, but only jumps if register r is even ("jump if even").
// `jio` r, offset is like jmp, but only jumps if register r is 1 ("jump if one", not odd).

// the program exits, when it tries to read instruction, that doesn't exists

// ALGORITHM

// define registers a,b
// define instructions array
// define offset (instruction, we are processing)

// program ends, when offset is lower than 0 and greater than instructions length

// read instructions, save them into an array
// create a function, that parses a line with instruction
// fill array of instructions

// console log b

import {
  ComputerState,
  Instruction,
  parseInstructionLine,
  processInstruction,
} from "./utils.ts";

async function processFile(filename: string): Promise<void> {
  const input = await Deno.readTextFile(filename);
  const instructions: Instruction[] = [];
  for (const line of input.split("\n")) {
    const instruction = parseInstructionLine(line);
    if (instruction) {
      instructions.push(instruction);
    }
  }

  let computerState: ComputerState = {
    a: 0,
    b: 0,
    offset: 0,
  };
  // do
  // start to read instructions
  // each instruction will update a register (a/b) or/and update offset
  // -> create function for execution of each register
  do {
    computerState = processInstruction(
      computerState,
      instructions[computerState.offset],
    );
    console.log("new state", computerState);
    // while offset is within (0..instructions.length)
  } while (
    (computerState.offset < instructions.length) && computerState.offset >= 0
  );
  console.log("computer state", computerState);
}

processFile("simpleInput.txt");
