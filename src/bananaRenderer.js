(function(exports){
  'use strict';

  function BananaRenderer(context) {
    this.canvasContext = context;
  }

  BananaRenderer.prototype = {
    drawBanana: function(banana) {
      var context = this.canvasContext;
      context.beginPath();
      context.rect(banana.xCoord(), banana.yCoord(), 20, 20);
      context.fillStyle = 'yellow';
      context.fill();
    }
  };

  exports.BananaRenderer = BananaRenderer;
})(this);
