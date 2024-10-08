import { Turn } from "../day21/utils.ts";

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

export const spellCost: Record<Spell, number> = {
  [Spell.MagicMissile]: 53,
  [Spell.Drain]: 73,
  [Spell.Shield]: 113,
  [Spell.Poison]: 173,
  [Spell.Recharge]: 229,
};

// spell is available, when player has enough mana
// when author/target has no related effect already
export function isSpellAvailable(
  author: Character,
  target: Character,
  spell: Spell,
): boolean {
  if (author.mana < spellCost[spell]) {
    return false;
  }
  switch (spell) {
    case Spell.Shield:
      if (author.effects.find((e) => e.name === EffectName.Shielded)) {
        return false;
      }
      break;
    case Spell.Poison:
      if (target.effects.find((e) => e.name === EffectName.Poisoned)) {
        return false;
      }
      break;
    case Spell.Recharge:
      if (author.effects.find((e) => e.name === EffectName.Recharging)) {
        return false;
      }
      break;
  }
  return true;
}

export function getAvailableSpells(
  author: Character,
  target: Character,
): Spell[] {
  return [
    Spell.MagicMissile,
    Spell.Drain,
    Spell.Shield,
    Spell.Poison,
    Spell.Recharge,
  ].filter((spell) => isSpellAvailable(author, target, spell));
}

// Magic Missile costs 53 mana. It instantly does 4 damage.
// Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit points.
// Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
// Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
// Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.

export const RECHARGE_GAIN = 101;
export const SHIELD_DEFENSE_GAIN = 7;

export function castSpell(
  author: Character,
  target: Character,
  spell: Spell,
): void {
  if (!isSpellAvailable(author, target, spell)) {
    throw new Error("Spell not available");
  }
  author.mana = author.mana - spellCost[spell];
  switch (spell) {
    case Spell.MagicMissile:
      target.hitPoints = target.hitPoints - 4;
      break;
    case Spell.Drain:
      author.hitPoints = author.hitPoints + 2;
      target.hitPoints = target.hitPoints - 2;
      break;
    case Spell.Shield:
      author.defense = author.defense + SHIELD_DEFENSE_GAIN;
      author.effects = [...author.effects, {
        name: EffectName.Shielded,
        charges: 6,
      }];
      break;
    case Spell.Poison:
      target.effects = [...target.effects, {
        name: EffectName.Poisoned,
        charges: 6,
      }];
      break;
    case Spell.Recharge:
      author.effects = [...author.effects, {
        name: EffectName.Recharging,
        charges: 5,
      }];
      break;
  }
}

// modifies author/target stats
// wear effect off after all charges are used
export function applyEffects(
  author: Character,
  target: Character,
): void {
  const shieldEffect = author.effects.find((e) =>
    e.name === EffectName.Shielded
  );
  if (shieldEffect) {
    if (shieldEffect.charges === 1) {
      author.effects = author.effects.filter((e) =>
        e.name !== EffectName.Shielded
      );
      author.defense = author.defense - SHIELD_DEFENSE_GAIN;
    } else {
      shieldEffect.charges = shieldEffect.charges - 1;
    }
  }
  const rechargingEffect = author.effects.find((e) =>
    e.name === EffectName.Recharging
  );
  if (rechargingEffect) {
    author.mana = author.mana + RECHARGE_GAIN;
    if (rechargingEffect.charges === 1) {
      author.effects = author.effects.filter((e) =>
        e.name !== EffectName.Recharging
      );
    } else {
      rechargingEffect.charges = rechargingEffect.charges - 1;
    }
  }

  const poisonedEffect = target.effects.find((e) =>
    e.name === EffectName.Poisoned
  );
  if (poisonedEffect) {
    target.hitPoints = target.hitPoints - 3;
    if (poisonedEffect.charges === 1) {
      target.effects = target.effects.filter((e) =>
        e.name !== EffectName.Poisoned
      );
    } else {
      poisonedEffect.charges = poisonedEffect.charges - 1;
    }
  }
}

export function cloneChar(char: Character): Character {
  return JSON.parse(JSON.stringify(char));
  // return Object.assign({}, char);
}

export function isThereAWinner(
  player: Character,
  boss: Character,
  isPlayerTurn?: boolean,
): "player" | "boss" | null {
  if (boss.hitPoints < 1) {
    return "player";
  }
  if (player.hitPoints < 1) {
    return "boss";
  }
  if (isPlayerTurn && player.mana < spellCost[Spell.MagicMissile]) {
    return "boss";
  }
  return null;
}
