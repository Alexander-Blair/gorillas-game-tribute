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
      var frames = [317, 365, 415, 415, 465, 465, 515, 515, 565, 565];
      var celebrationframes = [115, 115, 115, 165, 165, 165, 115, 115, 115, 165];
      var i = 0;

      var timer = setInterval(function() {
        if(i == 10) {
          clearInterval(timer);
         }
        if(gorillaNum === 0) {
          shift2 = frames[i];
          shift1 = celebrationframes[i];
        } else {
          shift1 = frames[i];
          shift2 = celebrationframes[i];
        }
        i ++;
      }, 120);
    },
    throw: function(isPlayerOne) {
      if(isPlayerOne) {
        shift2 += 50;
        setTimeout(function(){ shift2 -= 50; }, 100);
      } else {
        shift1 += 50;
        setTimeout(function(){ shift1 -= 50; }, 100);
      }
    },
    drawGorillas: function(gorillas) {
      this.drawGorilla(gorillas[0].xCoord(), gorillas[0].yCoord(), shift2)
      this.drawGorilla(gorillas[1].xCoord(), gorillas[1].yCoord(), shift1)
    },
    drawGorilla: function(x, y, shift) {
      this.canvasContext.drawImage(this.spriteSheet,
                                  shift,
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
