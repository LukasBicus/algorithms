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

// replaceNthOccurence

export function replaceOccurrenceAtPosition(
  text: string,
  replacement: Replacement,
  position: number,
): string {
  let currentPosition = 0;
  return text.replace(new RegExp(replacement.from, "g"), function () {
    return (position === currentPosition++) ? replacement.to : replacement.from;
  });
}

//    replacement will provide you string to be replaced (FROM) and new string (TO)
export function generateMolecules(
  medicineMolecule: string,
  replacement: Replacement,
): string[] {
  //    traverse medicine molecule,
  //
  //        find each occurrence of FROM and replace it with TO, add new molecule to set of distinct molecules

  // case 1:
  // medicine molecule HOHOHO
  // replacement: C => X
  // expected result: []

  // case 2:
  // medicine molecule HOHOHO
  // replacement: H => X
  // expected:
  // [
  // X0HOHO
  // HOX0HO
  // HOHOX0
  // ]

  const molecules: string[] = [];
  let position = 0;
  let result;
  // do
  do {
    // replace on position 0
    result = replaceOccurrenceAtPosition(
      medicineMolecule,
      replacement,
      position,
    );
    position++;
    // if molecule differs from medicineMolecule
    if (result !== medicineMolecule) {
      // push new molecule to molecules
      molecules.push(result);
    }
  } while (result !== medicineMolecule);

  return molecules;
}

// reverseStep function
// -> will take stepMolecules and reversedReplacements
// -> will provide set of possiblePrevSteps

export function reverseStep(
  prevStep: Set<string>,
  reversedReplacements: Replacement[],
): Set<string> {
  const nextStep = new Set<string>();
  // loop reversed replacements
  for (const replacement of reversedReplacements) {
    if (nextStep.size > 10000) {
      break;
    }
    for (const molecule of prevStep) {
      //    each reversed replacement will provide you array of prevMolecules
      const prevMolecules = generateMolecules(molecule, replacement);
      for (const prevMolecule of prevMolecules) {
        //    add prevMolecules to possiblePrevSteps
        nextStep.add(prevMolecule);
      }
    }
  }
  return nextStep;
}
