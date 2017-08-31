'use strict';
describe("Gorilla", function() {
  var exampleXCoord = 500;
  var exampleYCoord = 500;
  var gorilla = new Gorilla({ isPlayerOne: true });
  var playerTwoGorilla = new Gorilla({ isPlayerOne: false });
  var exampleTileMap = [[0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 1, 0, 0, 0, 0],
                        [0, 0, 1, 1, 1, 0, 0, 0],
                        [0, 1, 1, 1, 1, 1, 0, 0],
                        [1, 1, 1, 1, 1, 1, 1, 1]];
  var exampleTerrainWidth = 8;
  var exampleTerrainHeight = 5;

  it("has a default width of 50", function() {
    expect(gorilla.width()).toEqual(50);
  });
  it("has a default height of 50", function() {
    expect(gorilla.height()).toEqual(50);
  });
  
  gorilla.set(exampleXCoord, exampleYCoord);
  it("its x coordinate can be set", function() {
    expect(gorilla.xCoord()).toEqual(exampleXCoord);
  });
  it("its y coordinate can be set", function() {
    expect(gorilla.yCoord()).toEqual(exampleYCoord);
  });

  it("can be created as player one", function() {
    expect(gorilla.isPlayerOne()).toEqual(true);
  });
  it("can be created as player two", function() {
    expect(playerTwoGorilla.isPlayerOne()).toEqual(false);
  });

  var tileResult = gorilla.chooseRandomTile(exampleTileMap,
                                 exampleTerrainWidth,
                                 exampleTerrainHeight);
  var secondTileResult = playerTwoGorilla.chooseRandomTile(exampleTileMap,
                                                           exampleTerrainWidth,
                                                           exampleTerrainHeight);
  describe("#chooseRandomTile", function() {
    describe("for player 1", function() {
      it("chooses spawn tile on top of a building", function() {
        expect(tileResult[1]).not.toBeLessThan(Math.round(exampleTerrainWidth / 16));
        expect(tileResult[1]).not.toBeGreaterThan(exampleTerrainWidth / 16 * 6);
      });
      it("doesn't place the gorilla inside a building", function() {
        expect(exampleTileMap[tileResult[0]][tileResult[1]]).toEqual(0)
      });
    });
    describe("for player 2", function() {
      it("chooses spawn tile on top of a building", function() {
        expect(secondTileResult[1]).not.toBeLessThan(Math.round(exampleTerrainWidth / 16 * 10));
        expect(secondTileResult[1]).not.toBeGreaterThan(exampleTerrainWidth / 16 * 15);
      });
      it("doesn't place the gorilla inside a building", function() {
        expect(exampleTileMap[secondTileResult[0]][secondTileResult[1]]).toEqual(0)
      });
    });
  });
  describe("#findTileHeight", function() {
    it("returns the tile corresponding with top of a building", function() {
      expect(gorilla.findTileHeight(exampleTileMap, 0, exampleTerrainHeight)).toEqual(4);
    });
    it("returns the tile corresponding with top of a building", function() {
      expect(gorilla.findTileHeight(exampleTileMap, 1, exampleTerrainHeight)).toEqual(3);
    });
    it("returns the tile corresponding with top of a building", function() {
      expect(gorilla.findTileHeight(exampleTileMap, 2, exampleTerrainHeight)).toEqual(2);
    });
  });
});
