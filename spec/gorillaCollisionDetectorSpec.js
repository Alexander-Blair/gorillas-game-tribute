'use strict';

describe("Collision Detector", function() {
  var collisionDetector, mockRectangle;
  var leftHitBanana, rightHitBanana, topHitBanana;
  var leftMissBanana, rightMissBanana, topMissBanana;

  mockRectangle = {
    xCoord: function() { return 100; },
    yCoord: function() { return 450; },
    width: function() { return 100; },
    height: function() { return 150; }
  }
  function MockBanana(xCoord, yCoord) {
    this._xCoord = xCoord;
    this._yCoord = yCoord;
    this._width = 25;
    this._height = 25;
  }

  MockBanana.prototype = {
    xCoord: function() { return this._xCoord; },
    yCoord: function() { return this._yCoord; },
    width: function() { return this._width; },
    height: function() { return this._height; }
  }

  leftHitBanana = new MockBanana(100, 500);
  rightHitBanana = new MockBanana(200, 500);
  topHitBanana = new MockBanana(150, 450);

  leftMissBanana = new MockBanana(50, 500);
  rightMissBanana = new MockBanana(250, 500);
  topMissBanana = new MockBanana(150, 400);

  collisionDetector = new GorillaCollisionDetector()

  describe("collision", function() {
    it("detects a hit to the left side", function() {
      expect(collisionDetector.isHit(mockRectangle, leftHitBanana)).toBe(true);
    });
    it("detects a hit to the right side", function() {
      expect(collisionDetector.isHit(mockRectangle, rightHitBanana)).toBe(true);
    });
    it("detects a hit to the top side", function() {
      expect(collisionDetector.isHit(mockRectangle, topHitBanana)).toBe(true);
    });
  });
  describe("not a collision", function() {
    it("detects a hit to the left side", function() {
      expect(collisionDetector.isHit(mockRectangle, leftMissBanana)).toBe(false);
    });
    it("detects a hit to the right side", function() {
      expect(collisionDetector.isHit(mockRectangle, rightMissBanana)).toBe(false);
    });
    it("detects a hit to the top side", function() {
      expect(collisionDetector.isHit(mockRectangle, topMissBanana)).toBe(false);
    });
  });
});
