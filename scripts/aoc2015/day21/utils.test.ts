import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  allArmors,
  allRings,
  allWeapons,
  Character,
  equipCharacter,
} from "./utils.ts";

describe("equipCharacter", function () {
  it("should equip character with some items", function () {
    const character: Character = {
      hitPoints: 100,
      damage: 0,
      defense: 0,
    };
    const armor = allArmors[0];
    const weapon = allWeapons[0];
    const ring = allRings[0];
    assertEquals(
      equipCharacter(character, {
        armor,
        weapon,
        ringsLeft: ring,
      }),
      {
        character: {
          ...character,
          defense: armor.defense + weapon.defense + ring.defense,
          damage: armor.damage + weapon.damage + ring.damage,
        },
        goldSpent: armor.cost + weapon.cost + ring.cost,
      },
    );
  });
});
