(function(exports) {
  'use strict';

  function GorillaRenderer(canvasContext, spriteSheet) {
    this.canvasContext = canvasContext;
    this.spriteSheet = spriteSheet;
  }

  GorillaRenderer.prototype = {
    drawGorilla1: function(x, y) {
      this.canvasContext.drawImage(this.spriteSheet,
                                  715,
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
