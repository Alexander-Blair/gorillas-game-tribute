(function(exports) {
  'use strict';

  var width = 15;
  var height = 15;

  function Banana() {
    this._xCoord = 0;
    this._yCoord = 0;
    this._width = width;
    this._height = height;
  }

  Banana.prototype = {
    offScreen: function(terrainUnitHeight, terrainUnitWidth) {
      return this.yCoord() > terrainUnitHeight ||
             this.xCoord() + this.width() < 0 ||
             this.xCoord() > terrainUnitWidth;
    },
    set: function(xCoord, yCoord) {
      this._xCoord = xCoord;
      this._yCoord = yCoord;
    },
    move: function(xCoord, yCoord) {
      this._xCoord += xCoord;
      this._yCoord += yCoord;
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
    },
    bottomLeft: function() {
      return [this.xCoord(), (this.yCoord() + this.height())];
    },
    bottomRight: function() {
      return [(this.xCoord() + this.width()), (this.yCoord() + this.height())];
    }
  };
  exports.Banana = Banana;
})(this);
