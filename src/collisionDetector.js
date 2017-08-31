(function(exports) {
  'use strict';
  
  function CollisionDetector() {}

  CollisionDetector.prototype = {
    isHit: function(rectangle, banana) {
      var rightXCoord = rectangle.leftXCoord + rectangle.width;
      var bottomYCoord = rectangle.topYCoord + rectangle.height;

      if (banana.xCoord < rightXCoord + 10 &&
          banana.xCoord > rectangle.leftXCoord - 10 &&
          banana.yCoord < bottomYCoord + 10 &&
          banana.yCoord > rectangle.topYCoord - 10) {
        return true;
      } else { return false; }
    }
  };
  exports.CollisionDetector = CollisionDetector;
})(this);
