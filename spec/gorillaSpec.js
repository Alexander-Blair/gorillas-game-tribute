describe("Gorilla", function() {
  var exampleXCoord = 500;
  var exampleYCoord = 500;
  var gorilla = new Gorilla(exampleXCoord, exampleYCoord)

  it("has a default width of 50", function() {
    expect(gorilla.width()).toEqual(50)
  });
  it("has a default height of 50", function() {
    expect(gorilla.height()).toEqual(50)
  });
  it("returns its x coordinate", function() {
    expect(gorilla.xCoord()).toEqual(exampleXCoord)
  });
  it("returns its y coordinate", function() {
    expect(gorilla.yCoord()).toEqual(exampleYCoord)
  });
});
