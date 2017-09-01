(function(exports){

  var winningScore = 2;
  function Game(player1, player2) {
    this.player1      = player1;
    this.player2      = player2;
    this._isPlayerOne = true
  }

  Game.prototype.newRound = function() {
    // gameEngine.generateFixtures();
  }

  Game.prototype.switchTurn = function() {
    this._isPlayerOne = !this._isPlayerOne;
  }

  Game.prototype.endGame = function() {
    // Game Over screen?
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
    if(this.isGameOver()) {
      this.endGame();
    } else {
      this.newRound();
    }
  }

  exports.Game = Game;
})(this);
