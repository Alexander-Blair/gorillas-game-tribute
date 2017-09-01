(function(exports){

  function Player(name, gorilla) {
    this._name = name;
    this._score = 0;
    this.gorilla = gorilla;
  }

  Player.prototype.score = function() {
    return this._score;
  }

  Player.prototype.name = function() {
    return this._name;
  }

  Player.prototype.setName = function(name) {
    this._name = name;
  }

  Player.prototype.incrementScore = function() {
    this._score += 1;
  }

  exports.Player = Player;
})(this);
