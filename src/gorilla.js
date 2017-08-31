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
    chooseRandomTile: function(tileMap,
                                     terrainUnitWidth,
                                     terrainUnitHeight) {
      var min, max, column, tile, divider;
      divider = terrainUnitWidth / 16;
      column = chooseTile(this.getMax(divider), this.getMin(divider))
      tile = this.findTileHeight(tileMap, column, terrainUnitHeight) - 1;
      return [tile, column];
    },
    findTileHeight: function(tileMap, column, terrainUnitHeight) {
      for(var i = 0; i < terrainUnitHeight; i++) {
        if(tileMap[i][column] === 1) {
          return i;
        }
      }
    },
    getMax: function(divider) {
      if(this.isPlayerOne()) {
        return Math.floor(divider * 6) - 1;
      } else {
        return Math.floor(divider * 15) - 1;
      }
    },
    getMin: function(divider) {
      if(this.isPlayerOne()) {
        return Math.round(divider) - 1;
      } else {
        return Math.round(divider * 10) - 1;
      }
    }
  };

  function chooseTile(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  exports.Gorilla = Gorilla;
})(this);
