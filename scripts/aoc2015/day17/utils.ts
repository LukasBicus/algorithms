const containerRegex = /(\d+)/;

export function parseContainerLine(line: string): number | null {
  const match = line.match(containerRegex);
  return match ? parseInt(match[1]) : null;
}
