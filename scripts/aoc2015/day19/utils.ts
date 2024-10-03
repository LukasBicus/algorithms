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
