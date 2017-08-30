(function(exports) {
  function GorillaCollisionDetector() {}

  GorillaCollisionDetector.prototype = {
    isHit: function(hitBox, banana) {
      var rightXCoord = hitBox.xCoord() + hitBox.width();
      var bottomYCoord = hitBox.yCoord() + hitBox.height();

      if(banana.xCoord() > hitBox.xCoord() + hitBox.width()
        || banana.xCoord() + banana.width() < hitBox.xCoord()
        || banana.yCoord() + banana.height() < hitBox.yCoord()
        || banana.yCoord() > hitBox.yCoord() + hitBox.height()) {
          return false;
      } else { return true; }
    }
  }
  exports.GorillaCollisionDetector = GorillaCollisionDetector;
})(this);
