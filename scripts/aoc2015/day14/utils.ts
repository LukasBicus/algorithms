const reindeerRegex =
  /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./;

export function parseReindeerLine(line: string): {
  name: string;
  speed: number;
  restLimit: number;
  flyLimit: number;
} | null {
  const match = line.match(reindeerRegex);
  if (!match) {
    return null;
  }
  return {
    name: match[1],
    speed: parseInt(match[2], 10),
    flyLimit: parseInt(match[3], 10),
    restLimit: parseInt(match[4], 10),
  };
}
