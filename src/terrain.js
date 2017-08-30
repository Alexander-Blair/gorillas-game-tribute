(function(exports){

  function Terrain(width, height) {
    this.tileArray = [];
    this.terrainUnitWidth = width;
    this.terrainUnitHeight = height;
  }

  Terrain.prototype = {
    generate: function() {
      var tileArray = this.generate2DArray(this.terrainUnitWidth, this.terrainUnitHeight);
      var widthArray = this.generateWidthArray();
      var buildingCount = widthArray.length;
      var heightArray = this.generateHeightArray(buildingCount);

      var x = 0;

      for(var i = 0; i < buildingCount; i ++) {
        for(var width = widthArray[i]; width > 0; width --) {
          y = tileArray.length - 1;
          for(var height = heightArray[i]; height > 0; height --) {
            tileArray[y][x] = 1;
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
      i = 0;
      while(heightArray.length < length) {
        if (i === 0 || i === length - 1) { heightArray[i] = randombetween(4, 6); }
        else if (i === 1 || i === length - 2) { heightArray[i] = randombetween(4, 6); }
        else { heightArray[i] = randombetween(1, 8); }
        i ++;
      }
      return heightArray;
    }
  };

  function randombetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function add(a, b) {
      return a + b;
  }

  exports.Terrain = Terrain;
})(this);
