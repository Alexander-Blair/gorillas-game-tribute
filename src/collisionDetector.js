(function(exports) {
'use strict';

  function CollisionDetector() {

  }

  CollisionDetector.prototype = {
    isHit: function(banana, tileMap) {
      if(banana.yCoord() < 0) { return; }
      var leftIndex  = this.convertCoords(banana.bLeft());
      var rightIndex = this.convertCoords(banana.bRight());

      var leftTile   = tileMap[leftIndex[0]][leftIndex[1]];
      var rightTile  = tileMap[rightIndex[0]][rightIndex[1]];

      if (leftTile === 1 || rightTile === 1 ) {
        return true;
      }
    },
    convertCoords: function(coords) {
      return [Math.floor(coords[1] / 50), Math.floor(coords[0] / 50)];
    }
  };
  exports.CollisionDetector = CollisionDetector;
})(this);
