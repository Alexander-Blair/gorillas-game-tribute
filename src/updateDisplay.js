(function(exports) {
  function UpdateDisplay(canvas, canvasContext) {
    this.canvas = canvas;
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
      this.fillCanvas('black', canvas);
      this.drawPlayerName(playerOneName, 1, xCoord);
      if(gotPlayerOneName) { this.drawPlayerName(playerTwoName, 2, xCoord); }
      if(gotPlayerTwoName) { this.drawBestOf(bestOf, xCoord) };
    },
    introSettings: function() {
      this.canvasContext.font = "16px 'Press Start 2P'";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.textAlign = 'center';
    },
    gameSettings: function() {
      this.canvasContext.font = "16px 'Press Start 2P'";
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.textAlign = 'left';
    },
    drawPlayerName: function(name, playerNumber, xCoord) {
      this.introSettings();
      var number = playerNumber === 1 ? "One" : "Two";
      var yCoord = playerNumber === 1 ? 200 : 300
      var text = "Player " + number + " (default: 'Player" + playerNumber + "'): " + name +  "_"
      this.canvasContext.fillText(text, xCoord , yCoord);
    },
    drawBestOf: function(bestOf, xCoord) {
      this.introSettings();
      this.canvasContext.fillText("Best of (default: 3): " + bestOf, xCoord , 400);
    },
    drawVelocity: function(velocity, xCoord) {
      this.gameSettings();
      this.canvasContext.fillText("Velocity: " + velocity + "_", xCoord, 110);
    },
    drawAngle: function(angle, gotAngle, xCoord) {
      this.gameSettings();
      var text = "Angle: " + angle;
      if(!gotAngle) { text += "_"; }
      this.canvasContext.fillText(text, xCoord, 70);
    },
    drawScore: function(score, xCoord) {
      this.gameSettings();
      this.canvasContext.fillText(score, xCoord, 30);
    },
    drawNames: function(player1Name, player2Name) {
      this.gameSettings();
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
      this.fillCanvas('black', canvas);

      canvasContext.beginPath();
      this.drawWinGorilla(spriteSheet, canvas);

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
      canvasContext.fillText(this.endMessage(winner));
    },
    endMessage: function(winner) {
      return ["Go Bananas, ",
               winner.name() + "!",
               this.canvas.width / 2,
               (this.canvas.height /2 + 100)].join("")
    },
    drawWinGorilla: function(spriteSheet, canvas) {
      this.canvasContext.drawImage(spriteSheet,
                                  715,
                                  0,
                                  50,
                                  50,
                                  this.canvas.width / 2,
                                  (this.canvas.height / 2) - 100,
                                  50,
                                  50);
    },
    fillCanvas: function(colour) {
      this.canvasContext.beginPath();
      this.canvasContext.fillStyle = colour;
      this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  exports.UpdateDisplay = UpdateDisplay;
})(this);
