(function(exports){

  function Game(player1, player2) {
    this.player1      = player1;
    this.player2      = player2;
    this.isPlayerOne = true

  }

  Game.prototype.newRound = function() {
    gameEngine.generateFixtures();
  }

  Game.prototype.switchTurn = function() {
    this.isPlayerOne = !this.isPlayerOne;
  }

  Game.prototype.gameOver = function() {
    // Game Over screen?
  }

  Game.prototype.isGameOver = function() {
    this.player1.score >= 2 || this.player2.score >= 2
  }

  Game.prototype.updateScore = function(gorilla) {
    if(player1.gorilla === gorilla) {
      player2.increaseScore();
    } else { player1.increaseScore(); }
    if (this.isgameOver()) {
      this.gameOver();
    } else {
      this.newRound();
    }
  }

  exports.Game = Game;
})(this);
