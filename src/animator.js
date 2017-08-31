(function(exports) {
  'use strict';

  function Animator(canvasContext) {
    this.canvasContext = canvasContext;
    this.spriteSheet = new Image();
    this.spriteSheet.src = "./images/gorillasSpritesheet.png";
  }

  Animator.prototype = {
    drawGorilla1: function(x, y) {
      this.canvasContext.drawImage(this.spriteSheet,
                                  615,
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
                                  715,
                                  0,
                                  50,
                                  50,
                                  x,
                                  y,
                                  50,
                                  50);
    }
  };

 exports.Animator = Animator;
})(this);
