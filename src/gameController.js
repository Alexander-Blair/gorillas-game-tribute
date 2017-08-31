'use strict';

(function(exports) {
  var banana, gorillas, collisionDetector, gorillaCollisionDetector;
  var terrain, terrainRenderer, terrainTileArray, terrainCoordArray;
  var gameEngine;

  function GameController(windowObject, canvasElement, gameEngine) {
    this.windowObject = windowObject;
    this.canvasElement = canvasElement;
    this.context = this.canvasElement.getContext('2d');
    this._gameEngine = gameEngine;
  }

  GameController.prototype = {
    setupKeystrokeListener: function() {
      var self = this;
      this.windowObject.addEventListener("keydown", function(event) {
        var key = String.fromCharCode(event.which);
        if(inRange(event.which, keyRanges.numberKeys)) {
          self._gameEngine.processNumber(key);
        } else if(inRange(event.which, keyRanges.letterKeys)) {

        } else if(inRange(event.which, keyRanges.miscKeys)) {
          self._gameEngine.processMiscKey(event.which);
        }
      });
    },
    initializeGameEngine: function() {
      this._gameEngine.initialize();
    }
  }

  function inRange(code, range) {
    return code >= range.min && code <= range.max
  }
  exports.GameController = GameController;
})(this);
