describe("TerrainRenderer", function() {

  beforeEach(function() {
    terrainrenderer = new TerrainRenderer();

  });

  describe(".generateCoordArray", function(){
    it("returns an array of coordinates", function(){
      var terrainTileMap = [[0,0,0],
                            [0,0,1],
                            [0,1,1]];
      expect(terrainrenderer.generateCoordArray(terrainTileMap)).toEqual([ [50,100],[100,50],[100,100] ]);
    });
  });

});
