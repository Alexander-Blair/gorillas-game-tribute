(function(exports) {
'use strict';

  function CollisionDetector() {

  }

  CollisionDetector.prototype = {
    isHit: function(banana, tileMap) {
      var leftIndex  = this.convertCoords(banana.bLeft());
      var rightIndex = this.convertCoords(banana.bRight());

      var leftTile   = tileMap[leftIndex[0]][leftIndex[1]];
      var rightTile  = tileMap[rightIndex[0], rightIndex[1]];
      console.log(leftIndex);
      console.log(leftTile);

      if (leftTile === 1 || rightTile === 1 ) {
        return true;
      }
    },
    convertCoords: function(coords) {
      return [Math.floor(coords[1] / 50), Math.floor(coords[0] / 50)]
    }
  };
  exports.CollisionDetector = CollisionDetector;
})(this);
