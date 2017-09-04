(function(exports) {
  'use strict';

  var airResistance, dx, dy, gravity;

  airResistance = 0;
  dx = 0; dy = 0;
  gravity = 0;

  function BananaMotion(banana, wind) {
    this._banana = banana;
    this._wind = wind;
  }

  BananaMotion.prototype = {
    waitForInput: function() {
      dx = 0; dy = 0;
    },
    setVelocities: function(angle, velocity, isPlayerOne) {
      if(!isPlayerOne) { angle = 180 - angle; }
      dx = velocity / 4 * Math.cos(angle * (Math.PI / 180));
      dy = -velocity / 4 * Math.sin(angle * (Math.PI / 180));
      this.resetAirResistanceAndGravity();
    },
    moveBanana: function() {
      this._banana.move(dx + airResistance, dy + gravity);
      this.incrementAirResistanceAndGravity();
    },
    resetAirResistanceAndGravity: function() {
      gravity = 0;
      airResistance = 0;
    },
    incrementAirResistanceAndGravity: function() {
      gravity += 0.4;
      airResistance += this._wind.wind;
    }
  }
  exports.BananaMotion = BananaMotion;
})(this);
