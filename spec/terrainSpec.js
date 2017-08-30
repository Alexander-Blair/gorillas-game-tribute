describe("Terrain", function() {

  beforeEach(function() {
    var width = 20;
    var height = 12;
    terrain = new Terrain(width, height);
  });

  describe(".generate", function(){
    it("returns an array", function(){
      terrain.generate();
      expect(terrain.tileArray.constructor).toBe(Array);
    });
  });

  describe(".generate2DArray", function(){
    it("returns an array with the correct dimensions", function(){
      var array = terrain.generate2DArray(2, 3);
      expect(array.length).toBe(3);
      expect(array[0].length).toBe(2);
    });
  });

  describe(".generateWidthArray", function(){
    it("returns an array of building widths that adds up to 20", function(){
      var array = terrain.generateWidthArray();
      var total = 0;
      for(var i = 0; i < array.length; i ++) {
        total += array[i];
      }
      expect(total).toBe(20);
    });
  });

  describe(".generateHeightArray", function(){
    it("generates an array of random numbers between 1 and 8", function(){
      var array = terrain.generateHeightArray(5);
      for(var i = 0; i < array.length; i ++) {
        expect(array[i]).toBeLessThan(9);
      }
    });
  });

});
