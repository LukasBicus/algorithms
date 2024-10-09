import { assertEquals, assertThrows } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { charAAttacksCharB } from "../day21/utils.ts";
import {
  applyEffects,
  castSpell,
  Character,
  cloneChar,
  EffectName,
  isSpellAvailable,
  isThereAWinner,
  RECHARGE_GAIN,
  SHIELD_DEFENSE_GAIN,
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
    assertEquals(
      player.mana,
      playerTemplate.mana - spellCost[Spell.MagicMissile],
    );
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
      mana: playerTemplate.mana - spellCost[Spell.Drain],
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
      defense: playerTemplate.defense + SHIELD_DEFENSE_GAIN,
      mana: playerTemplate.mana - spellCost[Spell.Shield],
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
      mana: playerTemplate.mana - spellCost[Spell.Poison],
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
      mana: playerTemplate.mana - spellCost[Spell.Recharge],
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
      defense: playerTemplate.defense + SHIELD_DEFENSE_GAIN,
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
    const player = cloneChar(playerTemplate);
    const boss = cloneChar(bossTemplate);
    castSpell(player, boss, Spell.Poison);
    applyEffects(player, boss);
    assertEquals(boss, {
      ...bossTemplate,
      effects: [{ name: EffectName.Poisoned, charges: 5 }],
      hitPoints: bossTemplate.hitPoints - 3,
    });
    applyEffects(player, boss);
    assertEquals(boss, {
      ...bossTemplate,
      effects: [{ name: EffectName.Poisoned, charges: 4 }],
      hitPoints: bossTemplate.hitPoints - 2 * 3,
    });
    applyEffects(player, boss);
    applyEffects(player, boss);
    applyEffects(player, boss);
    applyEffects(player, boss);
    assertEquals(boss, {
      ...bossTemplate,
      effects: [],
      hitPoints: bossTemplate.hitPoints - 6 * 3,
    });
  });
  it("should validate ticks and end exit of recharging effect", function () {
    const player = cloneChar(playerTemplate);
    const boss = cloneChar(bossTemplate);
    castSpell(player, boss, Spell.Recharge);
    assertEquals(player, {
      ...playerTemplate,
      mana: playerTemplate.mana - spellCost[Spell.Recharge],
      effects: [{ name: EffectName.Recharging, charges: 5 }],
    });
    applyEffects(player, boss);
    assertEquals(player, {
      ...playerTemplate,
      mana: playerTemplate.mana - spellCost[Spell.Recharge] + RECHARGE_GAIN,
      effects: [{ name: EffectName.Recharging, charges: 4 }],
    });
    assertEquals(boss, bossTemplate);
    applyEffects(player, boss);
    applyEffects(player, boss);
    applyEffects(player, boss);
    applyEffects(player, boss);
    assertEquals(player, {
      ...playerTemplate,
      mana: playerTemplate.mana - spellCost[Spell.Recharge] + 5 * RECHARGE_GAIN,
      effects: [],
    });
  });
});

describe("isThereAWinner", function () {
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
  it("should return boss if player has no more mana for next spell", function () {
    assertEquals(
      isThereAWinner(
        {
          ...playerTemplate,
          mana: 30,
        },
        bossTemplate,
        true,
      ),
      "boss",
    );
  });
  it("should return null if player has no more mana and it's boss turn", function () {
    assertEquals(
      isThereAWinner(
        {
          ...playerTemplate,
          mana: 30,
        },
        bossTemplate,
      ),
      null,
    );
  });
  it("should return boss if player hitPoints are bellow one", function () {
    assertEquals(
      isThereAWinner({
        ...playerTemplate,
        hitPoints: 0,
      }, bossTemplate),
      "boss",
    );
  });
  it("should return player if boss hitPoints are bellow one", function () {
    assertEquals(
      isThereAWinner(playerTemplate, {
        ...bossTemplate,
        hitPoints: 0,
      }),
      "player",
    );
  });
  it("should return null otherwise if fight should continue", function () {
    assertEquals(
      isThereAWinner(playerTemplate, bossTemplate),
      null,
    );
  });
});

describe("a fight", function () {
  it("player should win", function () {
    const player: Character = {
      hitPoints: 10,
      mana: 250,
      defense: 0,
      damage: 0,
      effects: [],
    };
    const boss: Character = {
      hitPoints: 13,
      mana: 0,
      defense: 0,
      damage: 8,
      effects: [],
    };

    // Player turn
    applyEffects(player, boss);
    assertEquals(isThereAWinner(player, boss, true), null);
    castSpell(player, boss, Spell.Poison);
    isThereAWinner(player, boss, false);
    // Boss Turn
    applyEffects(player, boss);
    assertEquals(isThereAWinner(player, boss, false), null);
    charAAttacksCharB(boss, player);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Player turn
    applyEffects(player, boss);
    isThereAWinner(
      player,
      boss,
      true,
    );
    castSpell(player, boss, Spell.MagicMissile);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Boss Turn
    applyEffects(player, boss);
    const result = isThereAWinner(
      player,
      boss,
      false,
    );
    assertEquals(result, "player");
  });

  it("player should win II", function () {
    const player: Character = {
      hitPoints: 10,
      mana: 250,
      defense: 0,
      damage: 0,
      effects: [],
    };
    const boss: Character = {
      hitPoints: 13,
      mana: 0,
      defense: 0,
      damage: 8,
      effects: [],
    };
    // Player turn
    applyEffects(player, boss);
    assertEquals(isThereAWinner(player, boss, true), null);
    castSpell(player, boss, Spell.Recharge);
    isThereAWinner(player, boss, false);

    // Boss Turn
    applyEffects(player, boss);
    assertEquals(isThereAWinner(player, boss, false), null);
    charAAttacksCharB(boss, player);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Player turn
    applyEffects(player, boss);
    isThereAWinner(player, boss, true);
    castSpell(player, boss, Spell.Shield);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Boss Turn
    applyEffects(player, boss);
    assertEquals(isThereAWinner(player, boss, false), null);
    charAAttacksCharB(boss, player);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Player turn
    applyEffects(player, boss);
    isThereAWinner(player, boss, true);
    castSpell(player, boss, Spell.Drain);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Boss Turn
    applyEffects(player, boss);
    assertEquals(isThereAWinner(player, boss, false), null);
    charAAttacksCharB(boss, player);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Player turn
    applyEffects(player, boss);
    isThereAWinner(player, boss, true);
    castSpell(player, boss, Spell.Poison);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Boss Turn
    applyEffects(player, boss);
    assertEquals(isThereAWinner(player, boss, false), null);
    charAAttacksCharB(boss, player);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Player turn
    applyEffects(player, boss);
    isThereAWinner(player, boss, true);
    castSpell(player, boss, Spell.MagicMissile);
    assertEquals(isThereAWinner(player, boss, false), null);

    // Boss Turn
    applyEffects(player, boss);
    assertEquals(isThereAWinner(player, boss, false), "player");
  });
});
