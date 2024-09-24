import { Neighbor } from "./types.ts";

export type NeighbourRelation = {
  // positive is gain, negative number is loss
  [neighbour: string]: number;
};

export type AllRelations = {
  [name: string]: NeighbourRelation;
};

// create object relationships, where each person will have relations to other persons with gains/loses in points

const RelationLineRegex =
  /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\./;

export function parseRelationLine(line: string): AllRelations {
  const match = line.match(RelationLineRegex);
  if (!match) {
    return {};
  }
  return {
    [match[1]]: {
      [match[4]]: parseInt(match[3], 10) * ((match[2] === "lose") ? -1 : 1),
    },
  };
}

export function getHappinessForSetup(
  setup: Neighbor[],
  allRelations: AllRelations,
) {
  return setup.reduce((acc, neighbor, currentIndex) => {
    const prevNeighbor = setup.at(currentIndex - 1);
    if (prevNeighbor) {
      acc = acc + allRelations[neighbor][prevNeighbor];
    }
    const nextNeighbor = currentIndex + 1 < setup.length
      ? setup.at(currentIndex + 1)
      : setup[0];
    if (nextNeighbor) {
      acc = acc + allRelations[neighbor][nextNeighbor];
    }
    return acc;
  }, 0);
}
