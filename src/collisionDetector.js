// (function(exports) {
//   function CollisionDetector() {}
//
//   CollisionDetector.prototype = {
//     isHit: function(rectangle, banana) {
//       var rightXCoord = rectangle.leftXCoord + rectangle.width;
//       var bottomYCoord = rectangle.topYCoord + rectangle.height;
//
//       if (banana.xCoord < rightXCoord + 10 &&
//           banana.xCoord > rectangle.leftXCoord - 10 &&
//           banana.yCoord < bottomYCoord + 10 &&
//           banana.yCoord > rectangle.topYCoord - 10) {
//         return true;
//       } else { return false; }
//     }
//   }
//   exports.CollisionDetector = CollisionDetector;
// })(this);

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
          var tile = tileMap.tileAt(i, j);
          if(tile.isWall) {
            anyCollision = true;
          }
        }
      }
    }
  }
})(this);
