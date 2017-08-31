(function(exports) {
  function Gorilla(xCoord, yCoord) {
    this._xCoord = xCoord;
    this._yCoord = yCoord;
    this._width = 50;
    this._height = 50;
  }

  Gorilla.prototype = {
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
  exports.Gorilla = Gorilla;
})(this);
