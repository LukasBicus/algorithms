import { assertEquals, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import {
  allArmors,
  allRings,
  allWeapons,
  Character,
  equipCharacter,
  generateRings,
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

describe("generateRings", function () {
  it("should generate all variations for rings", function () {
    assertEquals([...generateRings()], [
      [undefined, undefined],
      [allRings[0], undefined],
      [allRings[1], undefined],
      [allRings[2], undefined],
      [allRings[3], undefined],
      [allRings[4], undefined],
      [allRings[5], undefined],
      [allRings[0], allRings[1]],
      [allRings[0], allRings[2]],
      [allRings[0], allRings[3]],
      [allRings[0], allRings[4]],
      [allRings[0], allRings[5]],
      [allRings[1], allRings[0]],
      [allRings[1], allRings[2]],
      [allRings[1], allRings[3]],
      [allRings[1], allRings[4]],
      [allRings[1], allRings[5]],
      [allRings[2], allRings[0]],
      [allRings[2], allRings[1]],
      [allRings[2], allRings[3]],
      [allRings[2], allRings[4]],
      [allRings[2], allRings[5]],
      [allRings[3], allRings[0]],
      [allRings[3], allRings[1]],
      [allRings[3], allRings[2]],
      [allRings[3], allRings[4]],
      [allRings[3], allRings[5]],
      [allRings[4], allRings[0]],
      [allRings[4], allRings[1]],
      [allRings[4], allRings[2]],
      [allRings[4], allRings[3]],
      [allRings[4], allRings[5]],
      [allRings[5], allRings[0]],
      [allRings[5], allRings[1]],
      [allRings[5], allRings[2]],
      [allRings[5], allRings[3]],
      [allRings[5], allRings[4]],
    ]);
  });
});
