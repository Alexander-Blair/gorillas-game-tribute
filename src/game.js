(function(exports){

  var winningScore = 2;
  function Game(player1, player2, spriteSheet) {
    this.player1      = player1;
    this.player2      = player2;
    this._isPlayerOne = true
    this.spriteSheet = spriteSheet;
  }

  Game.prototype.newRound = function() {
    // gameEngine.generateFixtures();
  }

  Game.prototype.switchTurn = function() {
    this._isPlayerOne = !this._isPlayerOne;
  }

  Game.prototype.score = function() {
    return this.player1.score() + ':' + this.player2.score();
  }

  Game.prototype.isGameOver = function() {
    return this.player1.score() >= winningScore || this.player2.score() >= winningScore
  }

  Game.prototype.winner = function() {
    return this.player1.score() >= winningScore ? this.player1 : this.player2;
  }

  Game.prototype.isPlayerOne = function() {
    return this._isPlayerOne;
  }

  Game.prototype.updateScore = function(gorilla) {
    if(this.player1.gorilla === gorilla) {
      this.player2.incrementScore();
    } else {
      this.player1.incrementScore();
    }
  }

  Game.prototype.endGame = function(winner, canvas, canvasContext) {

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.beginPath();
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.drawImage(this.spriteSheet,
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
    canvasContext.fillText("Go Banana's, " + winner.name() + "!", canvas.width / 2, (canvas.height /2 + 100));
  }

  exports.Game = Game;
})(this);
