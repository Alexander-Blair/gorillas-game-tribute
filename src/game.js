(function(exports){

  var winningScore = 2;
  function Game(player1, player2, spriteSheet) {
    this.player1      = player1;
    this.player2      = player2;
    this._isPlayerOne = true
    this.spriteSheet = spriteSheet;
    this._bestOf = 3;
  }

  Game.prototype.switchTurn = function() {
    this._isPlayerOne = !this._isPlayerOne;
  }

  Game.prototype.score = function() {
    return this.player1.score() + ':' + this.player2.score();
  }

  Game.prototype.bestOf = function() {
    return this._bestOf;
  }

  Game.prototype.setBestOf = function(value) {
    this._bestOf = value;
  }

  Game.prototype.winningScore = function() {
    return Math.floor(this._bestOf / 2) + 1;
  }

  Game.prototype.isGameOver = function() {
    return this.player1.score() >= this.winningScore() ||
           this.player2.score() >= this.winningScore() ||
           this.player1.score() + this.player2.score() >= this._bestOf;
  }

  Game.prototype.winner = function() {
    if(this.player1.score() >= this.winningScore()) {
      return this.player1;
    }
    if(this.player2.score() >= this.winningScore()) {
      return this.player2;
    }
    return { name: function() { return 'Nobody!!!!'; } }
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

  exports.Game = Game;
})(this);
