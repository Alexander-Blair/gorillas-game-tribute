(function(exports){
  'use strict';

  function Terrain(width, height) {
    this.tileArray = [];
    this.terrainUnitWidth = width;
    this.terrainUnitHeight = height;
    this.colourArray = [];
  }

  Terrain.prototype = {
    generate: function() {
      var tileArray = this.generate2DArray(this.terrainUnitWidth, this.terrainUnitHeight);
      var widthArray = this.generateWidthArray();
      var buildingCount = widthArray.length;
      var heightArray = this.generateHeightArray(buildingCount);
      var colours = [265, 815, 215];

      var x = 0;
      this.colourArray.push(colours[randombetween(0, 2)]);

      for(var i = 0; i < buildingCount; i ++) {
        var buildingColour = colours[randombetween(0, 2)];
        for(var width = widthArray[i]; width > 0; width --) {
          var y = tileArray.length - 1;
          for(var height = heightArray[i]; height > 0; height --) {
            tileArray[y][x] = 1;
            this.colourArray.push(buildingColour);
            y -= 1;
          }
          x += 1;
        }
      }
      this.tileArray = tileArray;
    },
    generate2DArray: function(width, height) {
      var array = [];

      for(var y = height; y > 0; y--) {
        var row = [];
          for(var x = width; x > 0; x--) { row.push(0); }
        array.push(row);
      }
      return array;
    },
    generateWidthArray: function() {
      var widthArray = [];
      var i = 0;
      while(widthArray.reduce(add, 0) < this.terrainUnitWidth - 4) {
        widthArray[i] = randombetween(2, 3);
        i ++;
      }
      widthArray[i] = this.terrainUnitWidth - (widthArray.reduce(add, 0));
      return widthArray;
    },
    generateHeightArray: function(length) {
      var heightArray = [];
      var i = 0;
      while(heightArray.length < length) {
        if (i === 0 || i === length - 1) { heightArray[i] = randombetween(3, 4); }
        else if (i === 1 || i === length - 2) { heightArray[i] = randombetween(2, 5); }
        else { heightArray[i] = randombetween(1, (this.terrainUnitHeight/2 + 2)); }
        i ++;
      }
      return heightArray;
    },
  };

  function randombetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function add(a, b) {
      return a + b;
  }

  exports.Terrain = Terrain;
})(this);
