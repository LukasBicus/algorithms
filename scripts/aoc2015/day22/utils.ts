export type Character = {
  hitPoints: number;
  damage: number;
  defense: number;
  mana: number;
  effects: Effect[];
};

export enum EffectName {
  Poisoned = "poisoned",
  Shielded = "shielded",
  Recharging = "recharging",
}

export type EffectBlueprint = {
  onEffectTick?: (characters: { target: Character; author: Character }) => void;
  onEffectExpires?: (
    characters: { target: Character; author: Character },
  ) => void;
  onEffectInit?: (characters: { target: Character; author: Character }) => void;
  charges: number;
  name: EffectName;
};

// implement effects (after spells)
// effects:
// shielded defense + 7 for 6 turns
// poisoned damage 3 for 6 turns
// recharging gain 101 mana for 5 turns

const effectBlueprints: EffectBlueprint[] = [{
  name: EffectName.Shielded,
  onEffectInit: function (
    { author }: { target: Character; author: Character },
  ) {
    author.defense = author.defense + 7;
  },
  onEffectExpires: function (
    { author }: { target: Character; author: Character },
  ) {
    author.defense = author.defense - 7;
  },
  charges: 6,
}];

export type Effect = {
  name: EffectName;
  charges: number;
};

export enum Spell {
  MagicMissile = "magicMissile",
  Drain = "drain",
  Shield = "shield",
  Poison = "poison",
  Recharge = "recharge",
}

// Magic Missile costs 53 mana. It instantly does 4 damage.
// Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit points.
// Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
// Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
// Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.

export function castSpell(
  author: Character,
  target: Character,
  spell: Spell,
): void {
  switch (spell) {
    case Spell.MagicMissile:
      author.mana = author.mana - 53;
      target.hitPoints = target.hitPoints - 4;
      break;
    case Spell.Drain:
      author.mana = author.mana - 73;
      author.hitPoints = author.hitPoints + 2;
      target.hitPoints = target.hitPoints - 2;
      break;
    case Spell.Shield:
      author.mana = author.mana - 113;
      author.defense = author.defense + 7;
      author.effects = [...author.effects, {
        name: EffectName.Shielded,
        charges: 6,
      }];
      break;
    case Spell.Poison:
      author.mana = author.mana - 173;
      target.effects = [...target.effects, {
        name: EffectName.Poisoned,
        charges: 6,
      }];
      break;
    case Spell.Recharge:
      author.mana = author.mana - 229;
      author.effects = [...author.effects, {
        name: EffectName.Recharging,
        charges: 5,
      }];
      break;
  }
}

export function applyEffects(
  author: Character,
  target: Character,
  effectBlueprints: EffectBlueprint[],
): void {
  console.log("apply effects");
}
