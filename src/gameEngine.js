(function(exports) {
  'use strict';

  var run, dx, dy, gravity, wind, airResistance;
  var terrainUnitWidth, terrainUnitHeight;
  var newTerrain, terrainCoordArray, terrainTileArray;
  var loopInterval, introInterval;

  run = false;
  airResistance = 0;
  dx = 0;
  dy = 0;
  gravity = 0;
  terrainUnitWidth = 24;
  terrainUnitHeight = 16;

  function GameEngine(canvas,
                      canvasContext,
                      banana,
                      gorillas,
                      gorillaCollisionDetector,
                      buildingCollisionDetector,
                      gorillaRenderer,
                      bananaRenderer,
                      terrainRenderer,
                      terrainConstructor,
                      game,
                      wind,
                      updateDisplay,
                      userInputProcessor) {
    this.canvas = canvas;
    this.canvasContext = canvasContext;
    this._banana = banana;
    this._gorillas = gorillas;
    this._gorillaCollisionDetector = gorillaCollisionDetector;
    this._buildingCollisionDetector = buildingCollisionDetector;
    this._gorillaRenderer = gorillaRenderer;
    this._bananaRenderer = bananaRenderer;
    this._terrainRenderer = terrainRenderer;
    this._terrainConstructor = terrainConstructor;
    this._game = game;
    this._wind = wind;
    this._updateDisplay = updateDisplay;
    this._userInputProcessor = userInputProcessor
  }

  GameEngine.prototype = {
    intro: function() {
      var self = this;
      introInterval = setInterval(function(){ self.introLoop(); }, 20);
    },
    introLoop: function() {
      if(this._userInputProcessor.introComplete) {
        clearInterval(introInterval)
        this.initialize();
        return;
      }
      var xCoord = toCoords(terrainUnitWidth) / 2;
      this._updateDisplay.drawIntroScreen(this.canvas,
                                          xCoord,
                                          this._userInputProcessor.playerOneName,
                                          this._userInputProcessor.playerTwoName,
                                          this._userInputProcessor.gotPlayerOneName,
                                          this._userInputProcessor.gotPlayerTwoName,
                                          this._userInputProcessor.bestOf())
    },
    initialize: function() {
      if(this._userInputProcessor.playerOneName.length > 0) {
        this._game.player1.setName(this._userInputProcessor.playerOneName); }
      if(this._userInputProcessor.playerTwoName.length > 0) {
        this._game.player2.setName(this._userInputProcessor.playerTwoName); }
      if(this._userInputProcessor.bestOf().length > 0) { this._game.setBestOf(this._userInputProcessor.bestOf()); }
      this.generateFixtures();
      var self = this;
      loopInterval = setInterval(function() { self.gameLoop(); }, 20);
    },
    generateFixtures: function() {
      this._gorillaRenderer.reset();
      this.generateLandscape();
      this._wind.generateWind(terrainUnitWidth, terrainUnitHeight);
      for(var i = 0; i <= 1; i ++) {
        var tile = this._gorillas[i].returnRandomTile(terrainTileArray,
                                                      terrainUnitWidth,
                                                      terrainUnitHeight);
        this._gorillas[i].set(toCoords(tile[1]), toCoords(tile[0]))
      }
    },
    generateLandscape: function() {
      newTerrain = new this._terrainConstructor(terrainUnitWidth, terrainUnitHeight);
      newTerrain.generate();
      terrainTileArray = newTerrain.tileArray;
      terrainCoordArray = this._terrainRenderer.generateCoordArray(terrainTileArray);
    },

    gameLoop: function() {
      var gorillas = this._gorillas;
      var banana = this._banana;
      var self = this;
      this.drawEverything(gorillas);
      if (this.gameStatus() === "throw") {
        for(var i = 0; i < 2; i++) {
          if(this.isGorillaHit(banana, gorillas[i])) {
            this._gorillaRenderer.kill(i)
            this.updateStatus("gorillaExplode");
            this._game.switchTurn();
            this._game.updateScore(gorillas[i]);
            var self = this
            setTimeout(function(){
              if(self._game.isGameOver()) {
                clearInterval(loopInterval);
                self._updateDisplay.drawEndGameScreen(self._game.winner(),
                                                      self.canvas,
                                                      self.canvasContext,
                                                      self._game.spriteSheet);
                return;
              } else {
                self.generateFixtures();
                self.updateStatus("waiting");
              }
              return;
            }, 1400);
          }
        }
        if(this.hasBananaStopped(banana)) {
          this._bananaRenderer.explode(banana);
          this.updateStatus("bananaExplode");
          this._game.switchTurn();
          return;
        }
        this.moveBanana();
        this._bananaRenderer.drawBanana(banana);
      } else if (this.gameStatus() === "bananaExplode") {
        this._bananaRenderer.drawBanana(banana);
        var self = this;
        setTimeout(function(){
          self.updateStatus("waiting")
        }, 1000);
      } else if (this.gameStatus() === "waiting") {
        this.waitForInput();
        this._updateDisplay.drawAngle(this._userInputProcessor.angle, this._userInputProcessor.gotAngle, this.textXCoord());
        if(this._userInputProcessor.gotAngle) {
          this._updateDisplay.drawVelocity(this._userInputProcessor.velocity, this.textXCoord());
        }
      }
      if(this.gameStatus() === "readyToThrow") {
        this.startGameLoop(this._userInputProcessor.angle, this._userInputProcessor.velocity);
        this.updateStatus("throw");
      }
    },
    updateStatus: function(status) {
      this._userInputProcessor.updateStatus(status)
    },
    gameStatus: function() {
      return this._userInputProcessor.gameStatus();
    },
    checkBananaCollision: function(banana) {
      if(this.hasBananaStopped(banana)) {
        this._bananaRenderer.explode(banana);
        this.updateStatus("bananaExplode");
        this._game.switchTurn();
        return;
      }
    },
    drawEverything: function(gorillas) {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._terrainRenderer.fillBlocks(terrainCoordArray, newTerrain.colourArray);
      this._gorillaRenderer.drawGorilla1(gorillas[1].xCoord(), gorillas[1].yCoord());
      this._gorillaRenderer.drawGorilla2(gorillas[0].xCoord(), gorillas[0].yCoord());
      this._updateDisplay.drawWind(this._wind);
      this._updateDisplay.drawScore(this._game.score(), toCoords(terrainUnitWidth) / 2);
      this._updateDisplay.drawNames(this._game.player1.name(), this._game.player2.name());
    },
    hasBananaStopped: function(banana) {
      return this._buildingCollisionDetector.isHit(banana, terrainTileArray) ||
             this._banana.offScreen(toCoords(terrainUnitHeight),
                                    toCoords(terrainUnitWidth));
    },
    isGorillaHit: function(banana, gorilla) {
      return this._gorillaCollisionDetector.isHit(gorilla, banana);
    },
    startGameLoop: function(angle, velocity) {
      this._bananaRenderer.reset();
      var xCoord, yCoord;
      if(this._game.isPlayerOne()) {
        xCoord = this._gorillas[0].xCoord() - 10
        yCoord = this._gorillas[0].yCoord() - 10
      } else {
        xCoord = this._gorillas[1].xCoord() + 50
        yCoord = this._gorillas[1].yCoord() - 10
      }
      this._banana.set(xCoord, yCoord);
      this.setVelocities(angle, velocity);
      this._gorillaRenderer.throw(this._game.isPlayerOne());
      this.updateStatus("throw");
      this._userInputProcessor.resetChoices();
    },
    waitForInput: function() {
      dx = 0; dy = 0;
    },
    setVelocities: function(angle, velocity) {
      if(!this._game.isPlayerOne()) { angle = 180 - angle; }
      dx = velocity / 4 * Math.cos(angle * (Math.PI / 180));
      dy = -velocity / 4 * Math.sin(angle * (Math.PI / 180));
      this.resetAirResistanceAndGravity();
    },
    moveBanana: function() {
      this._banana.move(dx + airResistance, dy + gravity);
      this.incrementAirResistanceAndGravity()
    },
    resetAirResistanceAndGravity: function() {
      gravity = 0;
      airResistance = 0;
    },
    incrementAirResistanceAndGravity: function() {
      gravity += 0.4;
      airResistance += this._wind.wind;
    },
    textXCoord: function() {
      return this._game.isPlayerOne() ? 10 : 900;
    }
  };

  function toCoords(value) {
    return value * 50;
  }
  exports.GameEngine = GameEngine;
})(this);
