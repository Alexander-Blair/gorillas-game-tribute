describe("Terrain", function() {

  beforeEach(function() {
    terrain = new Terrain();
  });

  describe(".tileArray", function(){
    it("returns an array", function(){
      expect(terrain.tileArray.constructor).toBe(Array);
    });
  });

  describe(".generate", function(){
    it("randomises the tileArray", function(){
      terrain.generate();
      expect(terrain.tileArray.constructor).toBe(Array);
    });
  });

});
