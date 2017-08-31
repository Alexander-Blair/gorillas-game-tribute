(function() {
  'use strict';

  var gameController, gameEngine;
  var gorillaCollisionDetector, buildingCollisionDetector;
  var terrainConstructor, terrainRenderer, gorillaRenderer, bananaRenderer;
  var banana, gorillas, canvasElement, canvasContext, windowObject, wind;
  windowObject = window;
  canvasElement = document.getElementById("canvas");
  canvasContext = canvasElement.getContext('2d');

  banana = new Banana();
  gorillas = [];
  gorillas.push(new Gorilla({ isPlayerOne: true } ));
  gorillas.push(new Gorilla({ isPlayerOne: false } ));

  gorillaCollisionDetector = new GorillaCollisionDetector();
  buildingCollisionDetector = new CollisionDetector();

  var spriteSheet = new Image();
  spriteSheet.src = "./images/gorillasSpritesheet.png";

  terrainRenderer = new TerrainRenderer(canvasContext, spriteSheet);
  terrainConstructor = Terrain;
  bananaRenderer = new BananaRenderer(canvasContext);
  gorillaRenderer = new Animator(canvasContext, spriteSheet);
  wind = new Wind();

  gameEngine = new GameEngine(canvasElement,
                              canvasContext,
                              banana,
                              gorillas,
                              gorillaCollisionDetector,
                              buildingCollisionDetector,
                              gorillaRenderer,
                              bananaRenderer,
                              terrainRenderer,
                              terrainConstructor,
                              wind);

  gameController = new GameController(windowObject,
                                      gameEngine);

  gameController.setupKeystrokeListener();
  gameController.initializeGameEngine();

})();
