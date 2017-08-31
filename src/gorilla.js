(function(exports) {
  'use strict';

  function Gorilla(object) {
    this._width = 50;
    this._height = 50;
    this._isPlayerOne = object.isPlayerOne;
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
    },
    isPlayerOne: function() {
      return this._isPlayerOne;
    },
    chooseSpawnCoordinates: function(tileMap,
                                     terrainUnitWidth,
                                     terrainUnitHeight) {
      var min, max;
      var divider = terrainUnitWidth / 16;

      if(this.isPlayerOne()) {
        min = Math.round(divider)
        max = Math.floor(divider * 6)
      } else {
        min = Math.round(divider * 10)
        max = Math.floor(divider * 15)
      }
      var tile = chooseTile(min, max)
    }
  };

  function chooseTile(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  exports.Gorilla = Gorilla;
})(this);
