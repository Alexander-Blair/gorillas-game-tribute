(function(exports) {
  CollisionDetector.prototype = {
    isHit: function(banana, tileMap) {
      // var leftTile     = banana.x - 25 / 50;
      // var rightTile    = banana.x + 25 / 50;
      // var topTile      = banana.y - 25 / 50;
      // var bottomTile   = banana.y + 25 / 50;
      var bLeft          = [banana.x, (banana.y + 50)];
      var bRight         = [(banana.x + 50), (banana.y + 50)];

      var leftConverted  = [Math.floor(bLeft[1]), Math.floor(bLeft[0])];
      var rightConverted = [Math.floor(bRight[1]), Math.floor(bRight[0])];
      var leftTile       = tileMap[leftConverted[0]][leftConverted[1]];
      var rightTile      = tileMap[rightConverted[0]][rightConverted[1]];

      // var anyCollision = false;
      //
      // if (leftTile < 0) {
      //   leftTile = 0;
      // }
      // if (rightTile > tileMap.width) {
      //   rightTile = tileMap.width;
      // }
      // if (toptile < 0) {
      //   topTile = 0;
      // }
      // if (bottomTile > tileMap.height) {
      //   bottomTile = tileMap.height;
      // }
      //
      // anyCollision = false;
      //
      // for (var i = leftTile; i <= rightTile; i++) {
      //   for (var j = topTile; j <= bottomTile; i++) {
      //     var xcoords = Math.floor(i / 50)
      //     var yxoords = Math.floor(j / 50)
      //     var tile = tileMap[y][x];
      //     if(tile === 1) {
      //       anyCollision = true;
      //     }
      //   }
      // }

      if (leftTile === 1 || rightTile === 1 ) {
        return true;
      }
    }
  }
})(this);
