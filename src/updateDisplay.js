(function(exports) {
  function UpdateDisplay(canvasContext) {
    this.canvasContext = canvasContext;
  }

  UpdateDisplay.prototype = {
    drawVelocity: function(velocity, xCoord) {
      this.canvasContext.font = "16px Arial";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.fillText("Velocity: " + velocity + "_", xCoord, 110);
    },
    drawAngle: function(angle, gotAngle, xCoord) {
      this.canvasContext.font = "16px Arial";
      this.canvasContext.fillStyle = 'white';
      var text = "Angle: " + angle;
      if(!gotAngle) { text += "_"; }
      this.canvasContext.fillText(text, xCoord, 70);
    },
    drawScore: function(score, xCoord) {
      this.canvasContext.font = "16px Arial";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.fillText(score, xCoord, 30);
    },
    drawNames: function(player1Name, player2Name) {
      this.canvasContext.font = "16px Arial";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.fillText(player1Name, 10, 30);
      this.canvasContext.fillText(player2Name, 1000, 30);
    }
  }

  exports.UpdateDisplay = UpdateDisplay;
})(this);
