'use strict';
(function(exports) {
  var run, dx, dy, gravity, gotAngle, velocity, angle;
  var terrainUnitWidth, terrainUnitHeight;
  var terrainCoordArray;

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
  gorillas.push(new Gorilla(800, 550))
  gorillas.push(new Gorilla(200, 550))
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
      var terrain, newTerrain, terrainTileArray;
      terrain = this._terrainConstructor;
      newTerrain = new terrain(terrainUnitWidth, terrainUnitHeight);
      newTerrain.generate();
      terrainTileArray = newTerrain.tileArray;
      terrainCoordArray = this._terrainRenderer.generateCoordArray(terrainTileArray);
    },
    // THIS IS TO BE REFACTORED!!
    gameLoop: function() {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this._terrainRenderer.fillBlocks(terrainCoordArray);
      this.drawGorillas();
      if (run === true) {
        var banana = this._banana;
        if(this._gorillaCollisionDetector.isHit(gorillas[1], banana)) {
          run = false
          return
        }
        this.drawBanana();
        if(banana.yCoord() > 600) {
          run = false;
        }
        if(banana.xCoord() + banana.width() < 0) {
          run = false;
        }
        banana._yCoord += dy + gravity;
        banana._xCoord += dx;
        gravity += 0.4;
      } else {
        this.waitForInput();
        this.drawAngle();
        if(gotAngle) {
          this.drawVelocity();
        }
        this.drawBanana();
      }
    },
    startGameLoop: function(angle, velocity) {
      this._banana.set(bananaStartXCoord, bananaStartYCoord)
      this.setVelocities(angle, velocity);
      run = true;
      this.resetChoices();
    },
    resetChoices: function() {
      gotAngle = false;
      angle = '', velocity = '';
    },
    waitForInput: function() {
      dx = 0, dy = 0;
    },
    setVelocities: function(angle, velocity) {
      dx = -(velocity / 5 * Math.cos(angle * (Math.PI / 180)));
      dy = -(velocity / 5 * Math.sin(angle * (Math.PI / 180)));
      gravity = 0;
    },
    // following functions to be extracted
    drawBanana: function() {
      var context = this.canvasContext, banana = this._banana;
      context.beginPath();
      context.rect(banana.xCoord(), banana.yCoord(), 20, 20);
      context.fillStyle = 'yellow';
      context.fill();
    },
    drawGorillas: function() {
      var context = this.canvasContext;
      for(var i = 0; i < 2; i++) {
        context.beginPath();
        context.rect(gorillas[i].xCoord(),
                     gorillas[i].yCoord(),
                     gorillas[i].width(),
                     gorillas[i].height());
        context.fillStyle = 'gray';
        context.fill();
      }
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
    }
  }
  exports.GameEngine = GameEngine;
})(this);
