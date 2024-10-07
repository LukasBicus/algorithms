enum ItemType {
  Weapon = "Weapon",
  Armor = "Armor",
  Ring = "Ring",
}
export type Item = {
  type: ItemType;
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
