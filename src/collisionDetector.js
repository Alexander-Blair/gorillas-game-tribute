(function(exports) {
  function CollisionDetector(rectangle) {
    this._rectangle = rectangle;
  }

  CollisionDetector.prototype = {
    isHit: function(banana) {
      var rect = this.rectangle();
      var rightXCoord = rect.leftXCoord + rect.width;
      var bottomYCoord = rect.topYCoord + rect.height;

      if (banana.xCoord < rightXCoord + 10 &&
          banana.xCoord > rect.leftXCoord - 10 &&
          banana.yCoord < bottomYCoord + 10 &&
          banana.yCoord > rect.topYCoord - 10) {
        return true;
      } else { return false; }
    },
    rectangle: function() {
      return this._rectangle;
    }
  }
  exports.CollisionDetector = CollisionDetector;
})(this);
