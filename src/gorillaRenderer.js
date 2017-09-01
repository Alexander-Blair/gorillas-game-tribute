(function(exports) {
  'use strict';

  function GorillaRenderer(canvasContext, spriteSheet) {
    this.canvasContext = canvasContext;
    this.spriteSheet = spriteSheet;
  }

  var shift1 = 715;
  var shift2 = 615;

  GorillaRenderer.prototype = {
    reset: function() {
      shift1 = 715;
      shift2 = 615;
    },
    kill: function(gorillaNum) {
      var frames = [317, 365, 415, 465, 515, 565];
      var i = 0;

      var timer = setInterval(function() {
        if(i == 6) {
          clearInterval(timer);
         }
        if(gorillaNum === 0) {
          shift2 = frames[i];
        } else {
          shift1 = frames[i];
        }
        i ++;
      }, 70);
    },
    throw: function(isPlayerOne) {
      if(isPlayerOne) {
        shift2 = shift2 + 50;
        setTimeout(function(){ shift2 = shift2 - 50; }, 100);
      } else {
        shift1 = shift1 + 50;
        setTimeout(function(){ shift1 = shift1 - 50; }, 100);
      }
    },
    drawGorilla1: function(x, y) {
      this.canvasContext.drawImage(this.spriteSheet,
                                  shift1,
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
                                  shift2,
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
