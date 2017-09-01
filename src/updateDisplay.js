(function(exports) {
  function UpdateDisplay(canvasContext) {
    this.canvasContext = canvasContext;
  }

  UpdateDisplay.prototype = {
    drawIntroScreen: function(canvas,
                              xCoord,
                              playerOneName,
                              playerTwoName,
                              gotPlayerOneName) {
      this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      this.canvasContext.fillStyle = "black";
      this.canvasContext.fillRect(0, 0, canvas.width, canvas.height);
      this.drawPlayerName(playerOneName, 1, xCoord);
      if(gotPlayerOneName) {
        this.drawPlayerName(playerTwoName, 2, xCoord);
      }
    },
    drawPlayerName: function(name, playerNumber, xCoord) {
      this.canvasContext.font = "16px Arial";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.textAlign = 'center';
      var number = playerNumber === 1 ? "One" : "Two";
      var yCoord = playerNumber === 1 ? 200 : 300
      var text = "Player " + number + " (default: 'Player" + playerNumber + "'): " + name +  "_"
      this.canvasContext.fillText(text, xCoord , yCoord);
    },
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
    },
    drawWind: function(wind) {
      this.canvasContext.fillStyle = 'white';
      var arrowlength = (wind.wind * 1000);
      if(wind.wind > 0) {
        this.canvasContext.rect(wind.x - 10, wind.y - 15, arrowlength + 25, 30);
      } else {
        this.canvasContext.rect(wind.x + 10, wind.y - 15, arrowlength - 25, 30);
      }
      this.canvasContext.fill();
      this.canvasContext.fillStyle = 'black';
      this.canvasContext.stroke();
      wind.drawArrow(this.canvasContext, wind.x, wind.y, (wind.x + wind.wind * 1000), wind.y);
    }
  }

  exports.UpdateDisplay = UpdateDisplay;
})(this);
