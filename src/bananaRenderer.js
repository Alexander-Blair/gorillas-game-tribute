(function(exports){
  'use strict';

  function BananaRenderer(context, spriteSheet) {
    this.canvasContext = context;
    this.spriteSheet = spriteSheet;
    this.shift = 0;
    this.width = 15;
    this.height = 15;
  }

  BananaRenderer.prototype = {
    reset: function(banana) {
      this.shift = 0;
      this.width = 15;
      this.height = 15;
    },
    drawBanana: function(banana) {
      var x = banana.xCoord();
      var y = banana.yCoord();
      this.canvasContext.drawImage(this.spriteSheet,
                                  this.shift,
                                  0,
                                  this.width,
                                  this.height,
                                  x,
                                  y,
                                  this.width,
                                  this.height);
    },
    explode: function(banana) {
      var frames = [317, 365, 15, 465, 515, 565];
      var i = 0;
      var x = banana._xCoord - 20;
      var y = banana._yCoord - 20;

      var self = this;
      var timer = setInterval(function() {
        if(i == 6) {
          clearInterval(timer);
         }
        self.shift = frames[i];
        self.width = 50;
        self.height = 50;
        banana._xCoord = x;
        banana._yCoord = y;
        i ++;
      }, 70);
    }
  };

  exports.BananaRenderer = BananaRenderer;
})(this);
