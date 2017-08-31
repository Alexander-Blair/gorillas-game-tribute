(function(exports) {
  'use strict';

  function TerrainRenderer(context) {
    this.context = context;
  }

  TerrainRenderer.prototype = {
    generateCoordArray: function(terrainTileMap) {
      var coordArray = [];
      var height = terrainTileMap.length;
      var width = terrainTileMap[0].length;
      for(x = 0;x < width; x ++) {
        for(y = 0; y < height; y ++) {
          if(terrainTileMap[y][x] === 1) {
            coordArray.push([x * 50, y * 50]);
          }
        }
      }
      return coordArray;
    },
    fillBlocks: function(coordArray, colourArray) {
      for(i = 0;i < coordArray.length;i ++){
        this.context.beginPath();
        this.context.rect(coordArray[i][0],
                     coordArray[i][1],
                     50,
                     50);
        this.context.fillStyle = colourArray[i + 1];
        this.context.fill();
      }
    }
  };

  exports.TerrainRenderer = TerrainRenderer;
})(this);
