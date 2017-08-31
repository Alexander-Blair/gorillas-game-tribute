(function(exports){
  'use strict';

  function GorillaRenderer(context) {
    this.canvasContext = context;

  }

  GorillaRenderer.prototype = {
    drawGorillas: function(gorillas) {
      var context = this.canvasContext;
      for(var i = 0; i < 2; i++) {
        context.beginPath();
        context.rect(gorillas[i].xCoord(),
                     gorillas[i].yCoord(),
                     gorillas[i].width(),
                     gorillas[i].height());
        context.fillStyle = 'gray';
        context.fill();
      }
    }
  };

  exports.GorillaRenderer = GorillaRenderer;
})(this);
