export type Sue = {
  name: string;
  children: number;
  cats: number;
  samoyeds: number;
  pomeranians: number;
  akitas: number;
  vizslas: number;
  goldfish: number;
  trees: number;
  cars: number;
  perfumes: number;
};

export function parseSue(line: string): Partial<Sue> | null {
  return null;
}
