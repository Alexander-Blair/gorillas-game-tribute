(function(exports) {
  'use strict';

  function GorillaCollisionDetector() {}

  GorillaCollisionDetector.prototype = {
    isHit: function(hitBox, banana) {
      var rightXCoord = hitBox.xCoord() + hitBox.width();
      var bottomYCoord = hitBox.yCoord() + hitBox.height();

      if(banana.xCoord() > hitBox.xCoord() + hitBox.width() - 10 ||
        banana.xCoord() + banana.width() < hitBox.xCoord() + 10 ||
        banana.yCoord() + banana.height() < hitBox.yCoord() + 10 ||
        banana.yCoord() > hitBox.yCoord() + hitBox.height() - 10) {
          return false;
      } else { return true; }
    }
  };

  exports.GorillaCollisionDetector = GorillaCollisionDetector;
})(this);
