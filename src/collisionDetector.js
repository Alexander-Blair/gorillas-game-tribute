
(function(exports) {
  CollisionDetector.prototype = {
    isHit: function(banana, tileMap) {
      var leftTile = banana.x - 25 / 50;
      var rightTile = banana.x + 25 / 50;
      var topTile = banana.y - 25 / 50;
      var bottomTile = banana.y + 25 / 50;
      var anyCollision = false;

      if (leftTile < 0) {
        leftTile = 0;
      }
      if (rightTile > tileMap.width) {
        rightTile = tileMap.width;
      }
      if (toptile < 0) {
        topTile = 0;
      }
      if (bottomTile > tileMap.height) {
        bottomTile = tileMap.height;
      }

      anyCollision = false;

      for (var i = leftTile; i <= rightTile; i++) {
        for (var j = topTile; j <= bottomTile; i++) {
          var tileCoords = [ Math.floor(i / 50), Math.floor(j / 50) ];
          var tile = tileMap.tileAt(tileCoords[0], tileCoords[1]);
          if(tile === 1) {
            anyCollision = true;
          }
        }
      }
    }
  }
})(this);
