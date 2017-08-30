describe("Banana", function() {
  var exampleXCoord, exampleYCoord, newXCoord, newYCoord, banana;

  exampleXCoord = 500;
  exampleYCoord = 500;
  newXCoord = 250;
  newYCoord = 250;

  banana = new Banana(exampleXCoord, exampleYCoord)

  it("has a default width of 20", function() {
    expect(banana.width()).toEqual(20)
  });
  it("has a default height of 20", function() {
    expect(banana.height()).toEqual(20)
  });
  it("returns its x coordinate", function() {
    expect(banana.xCoord()).toEqual(exampleXCoord)
  });
  it("returns its y coordinate", function() {
    expect(banana.yCoord()).toEqual(exampleYCoord)
  });
  describe("#set", function() {
    beforeEach(function() {
      banana.set(newXCoord, newYCoord)
    });
    it("coordinates can be directly changed", function() {
      expect(banana.xCoord()).toEqual(newXCoord)
    });
    it("coordinates can be directly changed", function() {
      expect(banana.yCoord()).toEqual(newYCoord)
    });

  })
});
