'use strict';

describe("Banana Collision Detector", function() {

  var collisionDetector = new CollisionDetector();

  var tileMap = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
  ]

  describe("Convert Coords", function () {

    it("correctly identifies a set of coordinates as being in a building", function() {
      expect(collisionDetector.convertCoords([200, 350])).toEqual([7, 4]);
    });

    it("correctly identifies a set of coordinates as being in open air", function() {
      expect(collisionDetector.convertCoords([50, 50])).toEqual([1, 1]);
    });
  });
});
