'use strict';
describe("Gorilla", function() {
  var exampleXCoord = 500;
  var exampleYCoord = 500;
  var gorilla = new Gorilla({ isPlayerOne: true });
  var playerTwoGorilla = new Gorilla({ isPlayerOne: false });
  var exampleTileMap =

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
  it("creates spawn coordinates on top of a building", function() {

  });
});
