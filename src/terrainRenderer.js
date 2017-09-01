(function(exports) {
  'use strict';

  function TerrainRenderer(context, spriteSheet) {
    this.context = context;
    this.spriteSheet = spriteSheet;
  }

  TerrainRenderer.prototype = {
    generateCoordArray: function(terrainTileMap) {
      var coordArray = [];
      var height = terrainTileMap.length;
      var width = terrainTileMap[0].length;
      for(var x = 0;x < width; x ++) {
        for(var y = 0; y < height; y ++) {
          if(terrainTileMap[y][x] === 1) {
            coordArray.push([x * 50, y * 50]);
          }
        }
      }
      return coordArray;
    },
    fillBlocks: function(coordArray, colourArray) {
      for(var i = 0;i < coordArray.length;i ++){
        var colour = colourArray[i + 1];
        this.drawBuilding(coordArray[i][0], coordArray[i][1], colour);
      }
    },
    drawBuilding: function(x, y, colour) {
      this.context.drawImage(this.spriteSheet,
                                  colour,
                                  0,
                                  50,
                                  50,
                                  x,
                                  y,
                                  50,
                                  50);
    }
  };

  exports.TerrainRenderer = TerrainRenderer;
})(this);
