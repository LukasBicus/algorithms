/*
--- Day 22: Wizard Simulator 20XX ---
Little Henry Case decides that defeating bosses with swords and stuff is boring. Now he's playing the game with a wizard.
Of course, he gets stuck on another boss and needs your help again.

In this version, combat still proceeds with the player and the boss taking alternating turns.

The player still goes first. Now, however, you don't get any equipment; instead, you must choose one of your spells to cast. The first character at or below 0 hit points loses.

Since you're a wizard, you don't get to wear armor, and you can't attack normally.
However, since you do magic damage, your opponent's armor is ignored, and so the boss effectively has zero armor as well.
As before, if armor (from a spell, in this case) would reduce damage below 1, it becomes 1 instead - that is, the boss' attacks always deal at least 1 damage.

On each of your turns, you must select one of your spells to cast.
If you cannot afford to cast any spell, you lose.
Spells cost mana; you start with 500 mana, but have no maximum limit.
You must have enough mana to cast a spell, and its cost is immediately deducted when you cast it. Your spells are Magic Missile, Drain, Shield, Poison, and Recharge.

Magic Missile costs 53 mana. It instantly does 4 damage.
Drain costs 73 mana. It instantly does 2 damage and heals you for 2 hit points.
Shield costs 113 mana. It starts an effect that lasts for 6 turns. While it is active, your armor is increased by 7.
Poison costs 173 mana. It starts an effect that lasts for 6 turns. At the start of each turn while it is active, it deals the boss 3 damage.
Recharge costs 229 mana. It starts an effect that lasts for 5 turns. At the start of each turn while it is active, it gives you 101 new mana.

Effects all work the same way.
Effects apply at the start of both the player's turns and the boss' turns.
Effects are created with a timer (the number of turns they last); at the start of each turn, after they apply any effect they have, their timer is decreased by one. If this decreases the timer to zero, the effect ends. You cannot cast a spell that would start an effect which is already active. However, effects can be started on the same turn they end.

For example, suppose the player has 10 hit points and 250 mana, and that the boss has 13 hit points and 8 damage:

-- Player turn --
- Player has 10 hit points, 0 armor, 250 mana
- Boss has 13 hit points
Player casts Poison.

-- Boss turn --
- Player has 10 hit points, 0 armor, 77 mana
- Boss has 13 hit points
Poison deals 3 damage; its timer is now 5.
Boss attacks for 8 damage.

-- Player turn --
- Player has 2 hit points, 0 armor, 77 mana
- Boss has 10 hit points
Poison deals 3 damage; its timer is now 4.
Player casts Magic Missile, dealing 4 damage.

-- Boss turn --
- Player has 2 hit points, 0 armor, 24 mana
- Boss has 3 hit points
Poison deals 3 damage. This kills the boss, and the player wins.
Now, suppose the same initial conditions, except that the boss has 14 hit points instead:

-- Player turn --
- Player has 10 hit points, 0 armor, 250 mana
- Boss has 14 hit points
Player casts Recharge.

-- Boss turn --
- Player has 10 hit points, 0 armor, 21 mana
- Boss has 14 hit points
Recharge provides 101 mana; its timer is now 4.
Boss attacks for 8 damage!

-- Player turn --
- Player has 2 hit points, 0 armor, 122 mana
- Boss has 14 hit points
Recharge provides 101 mana; its timer is now 3.
Player casts Shield, increasing armor by 7.

-- Boss turn --
- Player has 2 hit points, 7 armor, 110 mana
- Boss has 14 hit points
Shield's timer is now 5.
Recharge provides 101 mana; its timer is now 2.
Boss attacks for 8 - 7 = 1 damage!

-- Player turn --
- Player has 1 hit point, 7 armor, 211 mana
- Boss has 14 hit points
Shield's timer is now 4.
Recharge provides 101 mana; its timer is now 1.
Player casts Drain, dealing 2 damage, and healing 2 hit points.

-- Boss turn --
- Player has 3 hit points, 7 armor, 239 mana
- Boss has 12 hit points
Shield's timer is now 3.
Recharge provides 101 mana; its timer is now 0.
Recharge wears off.
Boss attacks for 8 - 7 = 1 damage!

-- Player turn --
- Player has 2 hit points, 7 armor, 340 mana
- Boss has 12 hit points
Shield's timer is now 2.
Player casts Poison.

-- Boss turn --
- Player has 2 hit points, 7 armor, 167 mana
- Boss has 12 hit points
Shield's timer is now 1.
Poison deals 3 damage; its timer is now 5.
Boss attacks for 8 - 7 = 1 damage!

-- Player turn --
- Player has 1 hit point, 7 armor, 167 mana
- Boss has 9 hit points
Shield's timer is now 0.
Shield wears off, decreasing armor by 7.
Poison deals 3 damage; its timer is now 4.
Player casts Magic Missile, dealing 4 damage.

-- Boss turn --
- Player has 1 hit point, 0 armor, 114 mana
- Boss has 2 hit points
Poison deals 3 damage. This kills the boss, and the player wins.
You start with 50 hit points and 500 mana points. The boss's actual stats are in your puzzle input.

What is the least amount of mana you can spend and still win the fight? (Do not include mana recharge effects as "spending" negative mana.)
 */

import { charAAttacksCharB, Turn } from "../day21/utils.ts";
import {
  applyEffects,
  castSpell,
  Character,
  cloneChar,
  getAvailableSpells,
  isThereAWinner,
  Spell,
  spellCost,
} from "./utils.ts";

const boss: Character = {
  hitPoints: 71,
  damage: 10,
  defense: 0,
  effects: [],
  mana: 0,
};

const basicPlayer: Character = {
  hitPoints: 50,
  mana: 500,
  damage: 0,
  defense: 0,
  effects: [],
};

// implement effects (after spells)
// effects:
// shielded defense + 7 for 6 turns
// poisoned damage 3 for 6 turns
// recharging gain 101 mana for 5 turns

// how fight will look like:
// player looses - with no hitpoints
// player looses - with no mana
// boss looses - with no hitpoints

// loop
// make effects on the player
// make the boss
// if it is player turn
//    pick a spell from list of spells (limitations - mana, existing effects)
//    attack
// if it is bosses turn
// attack the player

// ALGORITHM 1
// what is the least amount of mana, I need to use and still win the fight?
// lazy algorithm - always pick the esiest way according to rules
// - I don't know, If my rules are right

// ALGORITHM 2
// brute force - try all combinations, pick the best
// I will need to run fight simulations
// negative - each player turn will increase number of possible scenarios by 1 to 5
// once I will find "winning scenario", I can drop all scenarios with more mana spent
// stop cases:
// player has no mana for next spell
// player dies
// there is other scenario with less mana spent

// what describes single step in scenario
// inputs:
// who will move (Player/ Boss)
// list of combinations of Player and Boss, and mana spent and effects, that can be used
//
//
// outputs:
// who will move
// list of combinations of Player and Boss (very likely the count will differ, some combinations will be added, some wil), and mana spent

// function getListOfAvailableSpells
// depends on player mana, player effects, boss effects

type Scenario = {
  player: Character;
  boss: Character;
  currentManaSpent: number;
  turn: Turn;
  spellsList: Spell[];
};

// lets have a mostEfficientlyManaSpent variable for cases, when player wins
let mostEfficientlyManaSpent: null | number = null;
// lets have a list of scenarios with initial scenario (initial stats, player turn)
let activeScenarios: Scenario[] = [{
  player: basicPlayer,
  boss: boss,
  turn: Turn.Player,
  currentManaSpent: 0,
  spellsList: [],
}];

// example I
// activeScenarios = [{
//   player: {
//     hitPoints: 10,
//     mana: 250,
//     defense: 0,
//     damage: 0,
//     effects: [],
//   },
//   boss: {
//     hitPoints: 13,
//     mana: 0,
//     defense: 0,
//     damage: 8,
//     effects: [],
//   },
//   turn: Turn.Player,
//   currentManaSpent: 0,
//   spellsList: [],
// }];

// example II
// activeScenarios = [{
//   player: {
//     hitPoints: 10,
//     mana: 250,
//     defense: 0,
//     damage: 0,
//     effects: [],
//   },
//   boss: {
//     hitPoints: 14,
//     mana: 0,
//     defense: 0,
//     damage: 8,
//     effects: [],
//   },
//   turn: Turn.Player,
//   currentManaSpent: 0,
//   spellsList: [],
// }];

function tryToUpdateMostEfficientlyManaSpent(playerManaSpent: number) {
  if (
    mostEfficientlyManaSpent === null ||
    playerManaSpent < mostEfficientlyManaSpent
  ) {
    mostEfficientlyManaSpent = playerManaSpent;
  }
}

// for each scenario in list
while (activeScenarios.length > 0) {
  // lets have a list with new scenarios
  const newScenarios: Scenario[] = [];
  for (const scenario of activeScenarios) {
    //    apply effects
    applyEffects(scenario.player, scenario.boss);
    // PUZZLE2 ONLY START!
    if (scenario.turn === Turn.Player) {
      scenario.player.hitPoints = scenario.player.hitPoints - 1;
    }
    // PUZZLE2 ONLY END!
    const result = isThereAWinner(
      scenario.player,
      scenario.boss,
      scenario.turn === Turn.Player,
    );
    //    check if we should continue
    if (result === "player") {
      //      if player wins, try to update mostEfficientlyManaSpent

      console.log("player won!");
      tryToUpdateMostEfficientlyManaSpent(scenario.currentManaSpent);
      break;
    }
    // if its boss turn
    if (scenario.turn === Turn.Boss) {
      //    attack by boss
      charAAttacksCharB(scenario.boss, scenario.player);
      //    check if we should continue
      const resultAfterAttack = isThereAWinner(
        scenario.player,
        scenario.boss,
      );
      //        if boss wins do nothing
      //        if null, add a new scenario to the list of new scenarios
      if (resultAfterAttack === null) {
        newScenarios.push({
          player: cloneChar(scenario.player),
          boss: cloneChar(scenario.boss),
          currentManaSpent: scenario.currentManaSpent,
          turn: Turn.Player,
          spellsList: scenario.spellsList,
        });
      }
    } else {
      // scenario player
      //    get list of available spells
      const availableSpells = getAvailableSpells(
        scenario.player,
        scenario.boss,
      );
      //    loop for each available spell
      for (const spell of availableSpells) {
        //      player casts a spell
        const player = cloneChar(scenario.player);
        const boss = cloneChar(scenario.boss);
        castSpell(player, boss, spell);
        const manaSpent = spellCost[spell];
        const result = isThereAWinner(player, boss, false);
        if (result === "player") {
          //        if player wins, try to update mostEfficientlyManaSpent
          tryToUpdateMostEfficientlyManaSpent(
            scenario.currentManaSpent + manaSpent,
          );
          //        if null,
        } else if (result === null) {
          //           compute new mana spent
          //           if mostEfficientlyManaSpent === null or new mana spent <  mostEfficientlyManaSpent
          if (
            mostEfficientlyManaSpent === null ||
            scenario.currentManaSpent + manaSpent < mostEfficientlyManaSpent
          ) {
            //              add a new scenario to the list of new scenarios with new mana spent
            newScenarios.push({
              player: cloneChar(player),
              boss: cloneChar(boss),
              currentManaSpent: scenario.currentManaSpent + manaSpent,
              turn: Turn.Boss,
              spellsList: scenario.spellsList.concat([spell]),
            });
          }
        }
      }
    }
  }
  // console.log("newScenarios", newScenarios);
  if (mostEfficientlyManaSpent === null) {
    activeScenarios = newScenarios;
  } else {
    activeScenarios = newScenarios.filter((ns) =>
      ns.currentManaSpent < (mostEfficientlyManaSpent as number)
    );
  }
  console.log("activeScenarios", activeScenarios);
}

console.log("mostEfficientlyManaSpent", mostEfficientlyManaSpent);
//
