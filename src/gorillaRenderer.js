(function(exports) {
  'use strict';

  function GorillaRenderer(canvasContext, spriteSheet) {
    this.canvasContext = canvasContext;
    this.spriteSheet = spriteSheet;
  }

  var shift = 715;

  GorillaRenderer.prototype = {
    throw: function() {
      shift = shift + 50;
      setTimeout(function(){ shift = shift - 50; }, 100);
    },
    drawGorilla1: function(x, y) {
      this.canvasContext.drawImage(this.spriteSheet,
                                  shift,
                                  0,
                                  50,
                                  50,
                                  x,
                                  y,
                                  50,
                                  50);
    },
    drawGorilla2: function(x, y) {
      this.canvasContext.drawImage(this.spriteSheet,
                                  615,
                                  0,
                                  50,
                                  50,
                                  x,
                                  y,
                                  50,
                                  50);
    }
  };

 exports.GorillaRenderer = GorillaRenderer;
})(this);
