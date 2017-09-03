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
        self.delegateKeyStroke(event.which, event.shiftKey);
      });
    },
    delegateKeyStroke: function(eventCode, shiftDown) {
      var processor = this._gameEngine._userInputProcessor;
      var key = String.fromCharCode(eventCode);
      if(inRange(eventCode, keyRanges.numberKeys)) {
        processor.processNumber(key);
      } else if(inRange(eventCode, keyRanges.upperLetterKeys) ||
                inRange(eventCode, keyRanges.lowerLetterKeys)) {
                  if(!shiftDown) { key = String.fromCharCode(eventCode + 32); }
                  processor.processLetter(key);
      } else if(inRange(eventCode, keyRanges.miscKeys)) {
        processor.processMiscKey(eventCode);
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
