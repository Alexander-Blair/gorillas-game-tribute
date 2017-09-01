(function(exports) {
  function UpdateDisplay(canvasContext) {
    this.canvasContext = canvasContext;
  }

  UpdateDisplay.prototype = {
    drawIntroScreen: function(canvas,
                              xCoord,
                              playerOneName,
                              playerTwoName,
                              gotPlayerOneName,
                              gotPlayerTwoName,
                              bestOf) {
      this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      this.canvasContext.fillStyle = "black";
      this.canvasContext.fillRect(0, 0, canvas.width, canvas.height);
      this.drawPlayerName(playerOneName, 1, xCoord);
      if(gotPlayerOneName) { this.drawPlayerName(playerTwoName, 2, xCoord); }
      if(gotPlayerTwoName) { this.drawBestOf(bestOf, xCoord) };
    },
    drawPlayerName: function(name, playerNumber, xCoord) {
      this.canvasContext.font = "16px 'Press Start 2P'";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.textAlign = 'center';
      var number = playerNumber === 1 ? "One" : "Two";
      var yCoord = playerNumber === 1 ? 200 : 300
      var text = "Player " + number + " (default: 'Player" + playerNumber + "'): " + name +  "_"
      this.canvasContext.fillText(text, xCoord , yCoord);
    },
    drawBestOf: function(bestOf, xCoord) {
      this.canvasContext.font = "16px 'Press Start 2P'";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.textAlign = 'center';
      this.canvasContext.fillText("Best of (default: 3): " + bestOf, xCoord , 400);
    },
    drawVelocity: function(velocity, xCoord) {
      this.canvasContext.font = "16px 'Press Start 2P'";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.fillText("Velocity: " + velocity + "_", xCoord, 110);
    },
    drawAngle: function(angle, gotAngle, xCoord) {
      this.canvasContext.font = "16px 'Press Start 2P'";
      this.canvasContext.fillStyle = 'white';
      var text = "Angle: " + angle;
      if(!gotAngle) { text += "_"; }
      this.canvasContext.fillText(text, xCoord, 70);
    },
    drawScore: function(score, xCoord) {
      this.canvasContext.font = "16px 'Press Start 2P'";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.fillText(score, xCoord, 30);
    },
    drawNames: function(player1Name, player2Name) {
      this.canvasContext.font = "16px 'Press Start 2P'";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.textAlign = 'left';
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
    },
    drawEndGameScreen: function(winner, canvas, canvasContext, spriteSheet) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.beginPath();
      canvasContext.fillStyle = 'black';
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
      canvasContext.fill();

      canvasContext.beginPath();
      canvasContext.drawImage(spriteSheet,
                                  715,
                                  0,
                                  50,
                                  50,
                                  canvas.width / 2,
                                  (canvas.height / 2) - 100,
                                  50,
                                  50);

      canvasContext.fill();

      canvasContext.beginPath();
      canvasContext.fillStyle = 'white';
      canvasContext.textAlign = 'center';
      canvasContext.font = "40px 'Press Start 2P'"
      canvasContext.fillText(winner.name() + " WON!", canvas.width / 2, canvas.height /2);
      canvasContext.fill();

      canvasContext.beginPath();
      canvasContext.fillStyle = 'white';
      canvasContext.textAlign = 'center';
      canvasContext.font = "20px 'Press Start 2P'";
      canvasContext.fillText("Go Bananas, " + winner.name() + "!", canvas.width / 2, (canvas.height /2 + 100));
    }
  }

  exports.UpdateDisplay = UpdateDisplay;
})(this);
