import { assertEquals, assertThrows } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import {
  applyEffects,
  castSpell,
  Character,
  cloneChar,
  EffectName,
  isSpellAvailable,
  Spell,
  spellCost,
} from "./utils.ts";

describe("castSpell", function () {
  const playerTemplate: Character = {
    hitPoints: 100,
    damage: 0,
    defense: 0,
    mana: 500,
    effects: [],
  };
  const bossTemplate: Character = {
    hitPoints: 200,
    damage: 10,
    defense: 2,
    mana: 0,
    effects: [],
  };
  let player: Character;
  let boss: Character;
  beforeEach(function () {
    player = Object.assign({}, playerTemplate);
    boss = Object.assign({}, bossTemplate);
  });
  // Magic Missile costs 53 mana. It instantly does 4 damage.

  it("should throw error, when player has not enough mana to cast spells", function () {
    assertThrows(() =>
      castSpell(
        { ...player, mana: 10 },
        boss,
        Spell.MagicMissile,
      )
    );
  });

  it("should cast magic missile", function () {
    castSpell(
      player,
      boss,
      Spell.MagicMissile,
    );
    assertEquals(player.effects.length, 0);
    assertEquals(boss.effects.length, 0);
    assertEquals(boss.hitPoints, bossTemplate.hitPoints - 4);
    assertEquals(player.mana, playerTemplate.mana - 53);
  });
  // Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit points.
  it("should cast drain", function () {
    castSpell(
      player,
      boss,
      Spell.Drain,
    );
    assertEquals(boss, {
      ...bossTemplate,
      hitPoints: bossTemplate.hitPoints - 2,
    });
    assertEquals(player, {
      ...playerTemplate,
      hitPoints: playerTemplate.hitPoints + 2,
      mana: playerTemplate.mana - 73,
    });
  });
  // Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
  it("should cast shield", function () {
    castSpell(
      player,
      boss,
      Spell.Shield,
    );
    assertEquals(boss, bossTemplate);
    assertEquals(player, {
      ...playerTemplate,
      effects: [{
        name: EffectName.Shielded,
        charges: 6,
      }],
      defense: playerTemplate.defense + 7,
      mana: playerTemplate.mana - 113,
    });
  });
  // Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
  it("should cast poison", function () {
    castSpell(
      player,
      boss,
      Spell.Poison,
    );
    assertEquals(boss, {
      ...bossTemplate,
      effects: [{
        name: EffectName.Poisoned,
        charges: 6,
      }],
    });
    assertEquals(player, {
      ...playerTemplate,
      mana: playerTemplate.mana - 173,
    });
  });
  // Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.
  it("should cast recharge", function () {
    castSpell(
      player,
      boss,
      Spell.Recharge,
    );
    assertEquals(boss, bossTemplate);
    assertEquals(player, {
      ...playerTemplate,
      effects: [{
        name: EffectName.Recharging,
        charges: 5,
      }],
      mana: playerTemplate.mana - 229,
    });
  });
});

describe("isSpellAvailable", function () {
  const player: Character = {
    hitPoints: 100,
    damage: 0,
    defense: 0,
    mana: 500,
    effects: [],
  };
  const boss: Character = {
    hitPoints: 200,
    damage: 10,
    defense: 2,
    mana: 0,
    effects: [],
  };
  it("should return false if player has no mana", function () {
    assertEquals(
      isSpellAvailable({ ...player, mana: 52 }, boss, Spell.MagicMissile),
      false,
    );
  });
  it("should return false if player has related effect on", function () {
    assertEquals(
      isSpellAvailable(
        {
          ...player,
          effects: [{
            name: EffectName.Recharging,
            charges: 3,
          }],
        },
        boss,
        Spell.Recharge,
      ),
      false,
    );
  });
  it("should return false if target has related effect on", function () {
    assertEquals(
      isSpellAvailable(player, {
        ...boss,
        effects: [{ name: EffectName.Poisoned, charges: 3 }],
      }, Spell.Poison),
      false,
    );
  });
  it("should return true if spell is available", function () {
    assertEquals(isSpellAvailable(player, boss, Spell.Shield), true);
  });
});

describe("applyEffects", function () {
  const playerTemplate: Character = {
    hitPoints: 100,
    damage: 0,
    defense: 0,
    mana: 500,
    effects: [],
  };
  const bossTemplate: Character = {
    hitPoints: 200,
    damage: 10,
    defense: 2,
    mana: 0,
    effects: [],
  };
  it("should validate ticks and end exit of shielded effect", function () {
    const player = cloneChar(playerTemplate);
    const boss = cloneChar(bossTemplate);
    castSpell(player, boss, Spell.Shield);
    applyEffects(player, boss);
    assertEquals(player, {
      ...playerTemplate,
      mana: playerTemplate.mana - spellCost[Spell.Shield],
      effects: [{ name: EffectName.Shielded, charges: 5 }],
      defense: playerTemplate.defense + 7,
    });
    assertEquals(boss, bossTemplate);
    applyEffects(player, boss);
    applyEffects(player, boss);
    applyEffects(player, boss);
    applyEffects(player, boss);
    applyEffects(player, boss);
    assertEquals(player, {
      ...playerTemplate,
      mana: playerTemplate.mana - spellCost[Spell.Shield],
      effects: [],
    });
  });
  it("should validate ticks and end exit of poisoned effect", function () {
  });
  it("should validate ticks and end exit of recharging effect", function () {
  });
});
