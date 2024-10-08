enum ItemType {
  Weapon = "Weapon",
  Armor = "Armor",
  Ring = "Ring",
}
export type Item = {
  type: ItemType;
  name: string;
  damage: number;
  defense: number;
  cost: number;
};

export type Weapon = Item & {
  type: ItemType.Weapon;
};
export type Armor = Item & {
  type: ItemType.Armor;
};
export type Ring = Item & {
  type: ItemType.Ring;
};

export type Character = {
  hitPoints: number;
  damage: number;
  defense: number;
};

// Weapons:    Cost  Damage  Armor

export const allWeapons: Weapon[] = [{
  type: ItemType.Weapon,
  name: "Dagger",
  cost: 8,
  damage: 4,
  defense: 0,
}, {
  type: ItemType.Weapon,
  name: "Warhammer",
  cost: 25,
  damage: 6,
  defense: 0,
}, {
  type: ItemType.Weapon,
  name: "Shortsword",
  cost: 10,
  damage: 5,
  defense: 0,
}, {
  type: ItemType.Weapon,
  name: "Longsword",
  cost: 40,
  damage: 7,
  defense: 0,
}, {
  type: ItemType.Weapon,
  name: "Greataxe",
  cost: 74,
  damage: 8,
  defense: 0,
}];
// Armor:      Cost  Damage  Armor
export const allArmors: Armor[] = [
  {
    name: "Leather",
    cost: 13,
    damage: 0,
    defense: 1,
    type: ItemType.Armor,
  },
  {
    name: "Chainmail",
    cost: 31,
    damage: 0,
    defense: 2,
    type: ItemType.Armor,
  },
  {
    name: "Splintmail",
    cost: 53,
    damage: 0,
    defense: 3,
    type: ItemType.Armor,
  },
  {
    name: "Bandedmail",
    cost: 75,
    damage: 0,
    defense: 4,
    type: ItemType.Armor,
  },
  {
    name: "Platemail",
    cost: 102,
    damage: 0,
    defense: 5,
    type: ItemType.Armor,
  },
];

// Rings:      Cost  Damage  Armor
export const allRings: Ring[] = [
  {
    name: "Damage +1",
    cost: 25,
    damage: 1,
    defense: 0,
    type: ItemType.Ring,
  },
  {
    name: "Damage +2",
    cost: 50,
    damage: 2,
    defense: 0,
    type: ItemType.Ring,
  },
  {
    name: "Damage +3",
    cost: 100,
    damage: 3,
    defense: 0,
    type: ItemType.Ring,
  },
  {
    name: "Defense +1",
    cost: 20,
    damage: 0,
    defense: 1,
    type: ItemType.Ring,
  },
  {
    name: "Defense +2",
    cost: 40,
    damage: 0,
    defense: 2,
    type: ItemType.Ring,
  },
  {
    name: "Defense +3",
    cost: 80,
    damage: 0,
    defense: 3,
    type: ItemType.Ring,
  },
];

export function equipCharacter(character: Character, equip: {
  weapon: Weapon;
  armor?: Armor;
  ringsLeft?: Ring;
  ringRight?: Ring;
}): { character: Character; goldSpent: number } {
  return {
    character: {
      ...character,
      defense: equip.weapon.defense + (equip.armor?.defense ?? 0) +
        (equip.ringRight?.defense ?? 0) + (equip.ringsLeft?.defense ?? 0),
      damage: equip.weapon.damage + (equip.armor?.damage ?? 0) +
        (equip.ringRight?.damage ?? 0) + (equip.ringsLeft?.damage ?? 0),
    },
    goldSpent: equip.weapon.cost + (equip.armor?.cost ?? 0) +
      (equip.ringRight?.cost ?? 0) + (equip.ringsLeft?.cost ?? 0),
  };
}

export function* generateWeapon(): Generator<Weapon> {
  for (const weapon of allWeapons) {
    yield weapon;
  }
}

export function* generateArmor(): Generator<undefined | Armor> {
  yield undefined;
  for (const armor of allArmors) {
    yield armor;
  }
}

export function* generateRings(): Generator<[Ring?, Ring?]> {
  yield [undefined, undefined];
  for (const ring of allRings) {
    yield [ring, undefined];
  }
  for (const ring1 of allRings) {
    for (
      const ring2 of allRings
        .filter((r) => r.name !== ring1.name)
    ) {
      yield [ring1, ring2];
    }
  }
}

export function* modifyCharWithEquip(
  char: Character,
): Generator<{ character: Character; goldSpent: number }> {
  for (const weapon of generateWeapon()) {
    for (const armor of generateArmor()) {
      for (const [ring1, ring2] of generateRings()) {
        yield equipCharacter(char, {
          armor,
          weapon,
          ringsLeft: ring1,
          ringRight: ring2,
        });
      }
    }
  }
}

export function charAAttacksCharB(charA: Character, charB: Character) {
  if (charA.damage > charB.defense) {
    charB.hitPoints = charB.hitPoints - (charA.damage - charB.defense);
  } else {
    charB.hitPoints = charB.hitPoints - 1;
  }
}

enum Turn {
  Player = "player",
  Boss = "boss",
}

/**
 * @return true if player wins
 */
export function simulateFight(player: Character, boss: Character): boolean {
  let turn = Turn.Player;
  while (player.hitPoints > 0 && boss.hitPoints > 0) {
    if (turn === Turn.Player) {
      charAAttacksCharB(player, boss);
      turn = Turn.Boss;
    } else {
      charAAttacksCharB(boss, player);
      turn = Turn.Player;
    }
  }
  return player.hitPoints > boss.hitPoints;
}
