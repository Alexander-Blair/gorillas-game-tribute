'use strict';

describe("Collision Detector", function() {
  var collisionDetector, mockRectangle;
  var leftHitBanana, rightHitBanana, topHitBanana;
  var leftMissBanana, rightMissBanana, topMissBanana;

  mockRectangle = {
    leftXCoord: 100,
    topYCoord: 450,
    width: 100,
    height: 150
  }
  function MockBanana(xCoord, yCoord) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
  }

  leftHitBanana = new MockBanana(100, 500);
  rightHitBanana = new MockBanana(200, 500);
  topHitBanana = new MockBanana(150, 450);

  leftMissBanana = new MockBanana(50, 500);
  rightMissBanana = new MockBanana(250, 500);
  topMissBanana = new MockBanana(150, 400);

  collisionDetector = new CollisionDetector(mockRectangle)

  describe("collision", function() {
    it("detects a hit to the left side", function() {
      expect(collisionDetector.isHit(leftHitBanana)).toBe(true);
    });
    it("detects a hit to the right side", function() {
      expect(collisionDetector.isHit(rightHitBanana)).toBe(true);
    });
    it("detects a hit to the top side", function() {
      expect(collisionDetector.isHit(topHitBanana)).toBe(true);
    });
  });
  describe("not a collision", function() {
    it("detects a hit to the left side", function() {
      expect(collisionDetector.isHit(leftMissBanana)).toBe(false);
    });
    it("detects a hit to the right side", function() {
      expect(collisionDetector.isHit(rightMissBanana)).toBe(false);
    });
    it("detects a hit to the top side", function() {
      expect(collisionDetector.isHit(topMissBanana)).toBe(false);
    });
  });
});
