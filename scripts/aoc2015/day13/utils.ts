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
