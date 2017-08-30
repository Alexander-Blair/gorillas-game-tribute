

(function(exports){

  function Terrain() {
    this.tileArray = [];
  }

  var terrainUnitWidth = 40;
  var terrainUnitHeight = 24;

  Terrain.prototype = {
    generate: function() {
      var tileArray = get2DArray(terrainUnitWidth, terrainUnitHeight);
      console.log(tileArray);
      var widthArray = generateWidthArray();
      var buildingCount = widthArray.length;
      var heightArray = generateHeightArray(buildingCount);

      var x = 0;
      var y = tileArray.length - 1;

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
    }
  };

  function randombetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  function add(a, b) {
      return a + b;
  }

  function generateWidthArray() {
    var widthArray = [];
    var i = 0;
    while(widthArray.reduce(add, 0) < terrainUnitWidth - 3) {
      widthArray[i] = randombetween(1, 3);
      i ++;
    }
    widthArray[i] = terrainUnitWidth - (widthArray.reduce(add, 0));
    return widthArray;
  }

  function generateHeightArray(length) {
    var heightArray = [];
    i = 0;
    while(heightArray.length < length) {
      heightArray[i] = randombetween(1, 8);
      i ++;
    }
    return heightArray;
  }

  function get2DArray(width, height) {
    var array = [];

    for(var y = height; y > 0; y--) {
      var row = [];
        for(var x = width; x > 0; x--) { row.push(0); }
      array.push(row);
    }
    return array;
  }

  exports.Terrain = terrain;
})(this);
