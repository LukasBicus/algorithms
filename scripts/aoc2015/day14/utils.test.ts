import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { parseReindeerLine, Reindeer, ReindeerActivity } from "./utils.ts";

describe("parseReindeerLine", function () {
  it("should return null for invalid line", function () {
    assertEquals(parseReindeerLine(""), null);
  });
  it("should return object for valid line", function () {
    assertEquals(
      parseReindeerLine(
        "Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.",
      ),
      {
        name: "Dancer",
        speed: 16,
        flyLimit: 11,
        restLimit: 162,
      },
    );
  });
});

describe("Reindeer", function () {
  let reindeer: Reindeer;
  beforeEach(function () {
    reindeer = new Reindeer({
      name: "Dancer",
      speed: 16,
      flyLimit: 11,
      restLimit: 162,
    });
  });

  // After one second Dancer has gone 16 km.
  it("After one second Dancer has gone 16 km.", function () {
    reindeer.tick();
    assertEquals(reindeer.currentActivity, ReindeerActivity.Flying);
    assertEquals(reindeer.distanceTraveled, 16);
    assertEquals(reindeer.timeSpentOnActivity, 1);
  });
  // After ten seconds Dancer has gone 160 km.
  it("After 10 seconds Dancer has gone 160 km.", function () {
    for (let i = 0; i < 10; i++) {
      reindeer.tick();
    }
    assertEquals(reindeer.currentActivity, ReindeerActivity.Flying);
    assertEquals(reindeer.distanceTraveled, 160);
    assertEquals(reindeer.timeSpentOnActivity, 10);
  });
  // On the eleventh second Dancer continues on for a total distance of 176 km.

  it("After 11 seconds Dancer has gone 176 km.", function () {
    for (let i = 0; i < 11; i++) {
      reindeer.tick();
    }
    assertEquals(reindeer.currentActivity, ReindeerActivity.Resting);
    assertEquals(reindeer.distanceTraveled, 176);
    assertEquals(reindeer.timeSpentOnActivity, 0);
  });
  // On the 12th second Dancer stays at 176
  it("After 12 seconds Dancer has gone 176 km.", function () {
    for (let i = 0; i < 12; i++) {
      reindeer.tick();
    }
    assertEquals(reindeer.currentActivity, ReindeerActivity.Resting);
    assertEquals(reindeer.distanceTraveled, 176);
    assertEquals(reindeer.timeSpentOnActivity, 1);
  });
  it("After 174 seconds Dancer has gone 192 km.", function () {
    for (let i = 0; i < 174; i++) {
      reindeer.tick();
    }
    assertEquals(reindeer.currentActivity, ReindeerActivity.Flying);
    assertEquals(reindeer.distanceTraveled, 192);
    assertEquals(reindeer.timeSpentOnActivity, 1);
  });
  // On the 174th second, Dancer distance is 176 + 16.
});
