(function(exports){
  'use strict';

  function BananaRenderer(context, spriteSheet) {
    this.canvasContext = context;
    this.spriteSheet = spriteSheet;
  }

  BananaRenderer.prototype = {
    drawBanana: function(banana) {
      var x = banana.xCoord();
      var y = banana.yCoord();
      this.canvasContext.drawImage(this.spriteSheet,
                                  0,
                                  0,
                                  15,
                                  15,
                                  x,
                                  y,
                                  15,
                                  15);
    },
    explode: function(banana) {
      var x = banana.xCoord();
      var y = banana.yCoord();
      this.canvasContext.drawImage(this.spriteSheet,
                                  0,
                                  0,
                                  15,
                                  15,
                                  x,
                                  y,
                                  15,
                                  15);
    }
  };

  exports.BananaRenderer = BananaRenderer;
})(this);
