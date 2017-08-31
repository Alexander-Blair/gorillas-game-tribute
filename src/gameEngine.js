(function(exports) {
  'use strict';
  
  var run, dx, dy, gravity, gotAngle, velocity, angle;
  var terrainUnitWidth, terrainUnitHeight;
  var newTerrain, terrainCoordArray;

  run = false;
  terrainUnitWidth = 24;
  terrainUnitHeight = 16;
  gotAngle = false;
  velocity = '';
  angle = '';

  // THIS SHOULD ALL BE EXTRACTED
  var bananaStartXCoord = 860;
  var bananaStartYCoord = 540;
  var gorillas = [];
  gorillas.push(new Gorilla(800, 550));
  gorillas.push(new Gorilla(200, 550));
  // To here

  function GameEngine(canvas,
                      canvasContext,
                      banana,
                      gorillaCollisionDetector,
                      buildingCollisionDetector,
                      gorillaRenderer,
                      bananaRenderer,
                      terrainRenderer,
                      terrainConstructor) {
    this.canvas = canvas;
    this.canvasContext = canvasContext;
    this._banana = banana;
    this._gorillaCollisionDetector = gorillaCollisionDetector;
    this._buildingCollisionDetector = buildingCollisionDetector;
    this._gorillaRenderer = gorillaRenderer;
    this._bananaRenderer = bananaRenderer;
    this._terrainRenderer = terrainRenderer;
    this._terrainConstructor = terrainConstructor;
  }

  GameEngine.prototype = {
    initialize: function() {
      this.generateLandscape();
      var self = this;
      setInterval(function(){self.gameLoop();}, 20);
    },
    generateLandscape: function() {
      var terrain, terrainTileArray;
      terrain = this._terrainConstructor;
      newTerrain = new terrain(terrainUnitWidth, terrainUnitHeight);
      newTerrain.generate();
      terrainTileArray = newTerrain.tileArray;
      terrainCoordArray = this._terrainRenderer.generateCoordArray(terrainTileArray);
    },
    // THIS IS TO BE REFACTORED!!
    gameLoop: function() {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._terrainRenderer.fillBlocks(terrainCoordArray, newTerrain.colourArray);
      this._gorillaRenderer.drawGorillas(gorillas);
      var banana = this._banana;

      if (run === true) {
        if(this._gorillaCollisionDetector.isHit(gorillas[1], banana)) {
          run = false;
          return;
        }
        this._bananaRenderer.drawBanana(banana);
        if(this.offScreen()) { run = false; }
        this.moveBanana();
      } else {
        this.waitForInput();
        this.drawAngle();
        if(gotAngle) {
          this.drawVelocity();
        }
        this._bananaRenderer.drawBanana(banana);
      }
    },
    startGameLoop: function(angle, velocity) {
      this._banana.set(bananaStartXCoord, bananaStartYCoord);
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
      dx = -(velocity / 5 * Math.cos(angle * (Math.PI / 180)));
      dy = -(velocity / 5 * Math.sin(angle * (Math.PI / 180)));
      gravity = 0;
    },
    moveBanana: function() {
      this._banana._yCoord += dy + gravity;
      this._banana._xCoord += dx;
      gravity += 0.4;
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
    drawVelocity: function() {
      this.canvasContext.font = "16px Arial";
      this.canvasContext.fillText("Velocity: " + velocity + "_", 10, 100);
    },
    drawAngle: function() {
      this.canvasContext.font = "16px Arial";
      var text = "Angle: " + angle;
      if(!gotAngle) { text += "_"; }
      this.canvasContext.fillText(text, 10, 50);
    },
    offScreen: function() {
      if(this._banana.yCoord() > (terrainUnitHeight * 50) ||
        this._banana.xCoord() + this._banana.width() < 0 ||
        this._banana.xCoord() > (terrainUnitWidth * 50)) {
        return true;
      }
    }
  };
  exports.GameEngine = GameEngine;
})(this);
