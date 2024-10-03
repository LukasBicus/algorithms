export type Replacement = {
  from: string;
  to: string;
};

const replacementRegex = /(\w+) => (\w+)/;

export function parseReplacementLine(line: string): Replacement | null {
  const match = line.match(replacementRegex);
  return match
    ? {
      from: match[1],
      to: match[2],
    }
    : null;
}

export function parseInput(input: string): {
  replacements: Replacement[];
  medicineMolecule: string;
} | null {
  const split = input.split("\n\n");
  if (split.length !== 2) {
    return null;
  }
  const [replacementParts, medicineMolecule] = split;
  const replacements: Replacement[] = [];
  for (const line of replacementParts.split("\n")) {
    const replacement = parseReplacementLine(line);
    if (replacement) {
      replacements.push(replacement);
    }
  }
  return {
    replacements,
    medicineMolecule,
  };
}
