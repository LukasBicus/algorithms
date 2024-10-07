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
  weapon?: Weapon;
  armor?: Armor;
  rings?: [Ring?, Ring?];
};

const basicPlayer: Character = {
  hitPoints: 100,
  damage: 0,
  defense: 0,
};

const boss: Character = {
  hitPoints: 109,
  damage: 8,
  defense: 2,
};

// Weapons:    Cost  Damage  Armor

const allWeapons: Weapon[] = [{
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
const allArmors: Armor[] = [
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
const rings: Ring[] = [
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
