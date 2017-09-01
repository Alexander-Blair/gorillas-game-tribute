(function(exports) {
  'use strict';

  var run, dx, dy, gravity, gotAngle, velocity, angle, wind, airResistance;
  var terrainUnitWidth, terrainUnitHeight;
  var newTerrain, terrainCoordArray, terrainTileArray;
  var loopInterval;

  run = false;
  airResistance = 0;
  terrainUnitWidth = 24;
  terrainUnitHeight = 16;
  gotAngle = false;
  velocity = '';
  angle = '';

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
                      updateDisplay) {
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
  }

  GameEngine.prototype = {
    initialize: function() {
      this.generateFixtures();
      var self = this;
      loopInterval = setInterval(function(){ self.gameLoop(); }, 20);
    },

    generateFixtures: function() {
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
      var terrain;
      terrain = this._terrainConstructor;
      newTerrain = new terrain(terrainUnitWidth, terrainUnitHeight);
      newTerrain.generate();
      terrainTileArray = newTerrain.tileArray;
      terrainCoordArray = this._terrainRenderer.generateCoordArray(terrainTileArray);
    },
    // THIS IS TO BE REFACTORED!!
    gameLoop: function() {
      var gorillas = this._gorillas;
      var banana = this._banana;

      this.drawEverything(gorillas);
      if (run === true) {
        for(var i = 0; i < 2; i++) {
          if(this.isGorillaHit(banana, gorillas[i])) {
            run = false;
            this._game.switchTurn()
            this._game.updateScore(gorillas[i])
            if(this._game.isGameOver()) {
              this.endGame(this._game.winner())
              return;
            } else {
              this.generateFixtures()
            }
            return;
          }
        }
        if(this.hasBananaStopped(banana)) {
          this._game.switchTurn()
          run = false;
          return;
        }
        this.moveBanana();
        this._bananaRenderer.drawBanana(banana);
      } else {
        this.waitForInput();
        this._updateDisplay.drawAngle(angle, gotAngle, this.textXCoord());
        if(gotAngle) {
          this._updateDisplay.drawVelocity(velocity, this.textXCoord());
        }
      }
    },
    drawEverything: function(gorillas) {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._terrainRenderer.fillBlocks(terrainCoordArray, newTerrain.colourArray);
      this._gorillaRenderer.drawGorilla1(gorillas[1].xCoord(), gorillas[1].yCoord());
      this._gorillaRenderer.drawGorilla2(gorillas[0].xCoord(), gorillas[0].yCoord());
      this.drawWind();
      this._updateDisplay.drawScore(this._game.score(), toCoords(terrainUnitWidth) / 2);
      this._updateDisplay.drawNames(this._game.player1.name(), this._game.player2.name());
    },
    hasBananaStopped: function(banana) {
      return this._buildingCollisionDetector.isHit(banana, terrainTileArray) ||
             this.offScreen();
    },
    isGorillaHit: function(banana, gorilla) {
      return this._gorillaCollisionDetector.isHit(gorilla, banana);
    },
    startGameLoop: function(angle, velocity) {
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
      run = true;
      this.resetChoices();
    },
    resetChoices: function() {
      gotAngle = false;
      angle = ''; velocity = '';
    },
    waitForInput: function() {
      dx = 0; dy = 0;
    },
    setVelocities: function(angle, velocity) {
      if(!this._game.isPlayerOne()) { angle = 180 - angle; }
      dx = velocity / 5 * Math.cos(angle * (Math.PI / 180));
      dy = -velocity / 5 * Math.sin(angle * (Math.PI / 180));
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
    processNumber: function(key) {
      if(gotAngle) { velocity += key; }
      else { angle += key; }
    },
    processMiscKey: function(keyCode) {
      if(keyCode === 13) {
        this.processEnter();
      } else if(keyCode === 8) {
        this.processBackspace();
      }
    },
    processBackspace: function() {
      if(gotAngle) {
        velocity = velocity.substring(0, velocity.length - 1);
      } else {
        angle = angle.substring(0, angle.length - 1);
      }
    },
    processEnter: function() {
      if(gotAngle && velocity.length > 0) {
        this.startGameLoop(angle, velocity);
      } else if(!gotAngle && angle.length > 0) {
        gotAngle = true;
      }
    },
    textXCoord: function() {
      return this._game.isPlayerOne() ? 10 : 1000;
    },
    drawWind: function() {
      var wind = this._wind;
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
    offScreen: function() {
      if(this._banana.yCoord() > (terrainUnitHeight * 50) ||
        this._banana.xCoord() + this._banana.width() < 0 ||
        this._banana.xCoord() > (terrainUnitWidth * 50)) {
        return true;
      }
    },
    endGame: function(winner) {
      clearInterval(loopInterval)
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvasContext.fillStyle = 'white';
      this.canvasContext.fillText(winner.name() + " WON!", 100, 100);
    }
  };

  function toCoords(value) {
    return value * 50;
  }
  exports.GameEngine = GameEngine;
})(this);
