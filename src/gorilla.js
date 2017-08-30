(function(exports) {
  function Gorilla(xCoord, yCoord) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.width = 50;
    this.height = 50;
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
