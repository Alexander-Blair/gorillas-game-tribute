(function(exports) {
  'use strict';

  function Gorilla() {
    this._width = 50;
    this._height = 50;
  }

  Gorilla.prototype = {
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
  };

  exports.Gorilla = Gorilla;
})(this);
