(function(exports) {
  function Banana(xCoord, yCoord) {
    this._xCoord = xCoord;
    this._yCoord = yCoord;
    this._width = 20;
    this._height = 20;
  }

  Banana.prototype = {
    set: function(xCoord, yCoord) {
      this._xCoord = xCoord;
      this._yCoord = yCoord;
    },
    xCoord: function() {
      return this._xCoord;
    },
    yCoord: function() {
      return this._yCoord;
    },
    width: function() {
      return this._width;
    },
    height: function() {
      return this._height;
    }
  }
  exports.Banana = Banana;
})(this);
