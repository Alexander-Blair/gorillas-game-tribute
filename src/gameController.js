(function(exports) {
  'use strict';

  function GameController(windowObject, gameEngine) {
    this.windowObject = windowObject;
    this._gameEngine = gameEngine;
  }

  GameController.prototype = {
    setupKeystrokeListener: function() {
      var self = this;
      this.windowObject.addEventListener("keydown", function(event) {
        self.delegateKeyStroke(event.which);
      });
    },
    delegateKeyStroke: function(eventCode) {
      var key = String.fromCharCode(eventCode);
      if(inRange(eventCode, keyRanges.numberKeys)) {
        this._gameEngine.processNumber(key);
      } else if(inRange(eventCode, keyRanges.letterKeys)) {
        this._gameEngine.processLetter(key);
      } else if(inRange(eventCode, keyRanges.miscKeys)) {
        this._gameEngine.processMiscKey(eventCode);
      }
    },
    initializeGameEngine: function() {
      this._gameEngine.intro();
    }
  };

  function inRange(code, range) {
    return code >= range.min && code <= range.max;
  }
  exports.GameController = GameController;
})(this);
