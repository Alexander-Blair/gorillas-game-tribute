(function(exports) {
  'use strict';

  var terrainUnitWidth, terrainUnitHeight;
  var newTerrain, terrainCoordArray, terrainTileArray;
  var loopInterval, introInterval;

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
                      userInputProcessor,
                      bananaMotion) {
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
    this._userInputProcessor = userInputProcessor;
    this._bananaMotion = bananaMotion;
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
      this.drawEverything(gorillas);
      if (this.gameStatus() === "throw") {
        if(this.checkGorillaCollision() || this.checkBananaCollision()) { return; }
        this._bananaMotion.moveBanana();
        this._bananaRenderer.drawBanana(banana);
      } else if (this.gameStatus() === "bananaExplode") {
        this.explodeBanana(banana);
      } else if (this.gameStatus() === "waiting") {
        this.processWaitScreen();
      }
      if(this.gameStatus() === "readyToThrow") {
        this.restartGameLoop(this._userInputProcessor.angle, this._userInputProcessor.velocity);
      }
    },
    drawEverything: function(gorillas) {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._terrainRenderer.fillBlocks(terrainCoordArray, newTerrain.colourArray);
      this._gorillaRenderer.drawGorillas(gorillas)
      this._updateDisplay.drawWind(this._wind);
      this._updateDisplay.drawScore(this._game.score(), toCoords(terrainUnitWidth) / 2);
      this._updateDisplay.drawNames(this._game.player1.name(), this._game.player2.name());
    },
    checkGorillaCollision: function() {
      for(var i = 0; i < 2; i++) {
        if(this.isGorillaHit(this._banana, this._gorillas[i])) {
          this.processGorillaCollision(this._gorillas[i]);
          var self = this;
          setTimeout(function(){
            self.endRound();
            return true;
          }, 1400);
        }
      }
    },
    checkBananaCollision: function() {
      if(this.hasBananaStopped(this._banana)) {
        this._bananaRenderer.explode(this._banana);
        this.updateStatus("bananaExplode");
        this._game.switchTurn();
        return true;
      }
    },
    explodeBanana: function(banana) {
      this._bananaRenderer.drawBanana(banana);
      var self = this;
      setTimeout(function(){
        self.updateStatus("waiting");
      }, 1000);
    },
    processGorillaCollision: function(gorilla) {
      var gorillaNum = gorilla.isPlayerOne() ? 0 : 1;
      this._gorillaRenderer.kill(gorillaNum);
      this.updateStatus("gorillaExplode");
      this._game.switchTurn();
      this._game.updateScore(gorilla);
    },
    endRound: function() {
      if(this._game.isGameOver()) { this.endGame() }
      else {
        this.generateFixtures();
        this.updateStatus("waiting");
      }
    },
    endGame: function() {
      clearInterval(loopInterval);
      this._updateDisplay.drawEndGameScreen(this._game.winner(),
                                            this.canvas,
                                            this.canvasContext,
                                            this._game.spriteSheet);
    },
    processWaitScreen: function() {
      this._bananaMotion.waitForInput();
      this._updateDisplay.drawAngle(this._userInputProcessor.angle,
                                    this._userInputProcessor.gotAngle,
                                    this.textXCoord());
      if(this._userInputProcessor.gotAngle) {
        this._updateDisplay.drawVelocity(this._userInputProcessor.velocity, this.textXCoord());
      }
    },
    updateStatus: function(status) {
      this._userInputProcessor.updateStatus(status)
    },
    gameStatus: function() {
      return this._userInputProcessor.gameStatus();
    },
    hasBananaStopped: function(banana) {
      return this._buildingCollisionDetector.isHit(banana, terrainTileArray) ||
             this._banana.offScreen(toCoords(terrainUnitHeight),
                                    toCoords(terrainUnitWidth));
    },
    isGorillaHit: function(banana, gorilla) {
      return this._gorillaCollisionDetector.isHit(gorilla, banana);
    },
    restartGameLoop: function(angle, velocity) {
      var xCoord, yCoord;
      if(this._game.isPlayerOne()) {
        xCoord = this._gorillas[0].xCoord() - 10
        yCoord = this._gorillas[0].yCoord() - 10
      } else {
        xCoord = this._gorillas[1].xCoord() + 50
        yCoord = this._gorillas[1].yCoord() - 10
      }
      this._bananaRenderer.reset();
      this._banana.set(xCoord, yCoord);
      this._bananaMotion.setVelocities(angle, velocity, this._game.isPlayerOne());
      this._gorillaRenderer.throw(this._game.isPlayerOne());
      this.updateStatus("throw");
      this._userInputProcessor.resetChoices();
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
