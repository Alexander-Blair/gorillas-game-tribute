'use strict';
(function() {
  var gameController, gameEngine;
  var gorillaCollisionDetector, buildingCollisionDetector;
  var terrainConstructor, terrainRenderer, gorillaRenderer, bananaRenderer;
  var banana, canvasElement, canvasContext, windowObject;
  windowObject = window;
  canvasElement = document.getElementById("canvas");
  canvasContext = canvasElement.getContext('2d');

  banana = new Banana();
  gorillaCollisionDetector = new GorillaCollisionDetector();
  // buildingCollisionDetector = new BuildingCollisionDetector;
  buildingCollisionDetector = {};
  terrainRenderer = new TerrainRenderer(canvasContext);
  terrainConstructor = Terrain;
  // bananaRenderer = new BananaRenderer;
  bananaRenderer = {};
  // gorillaRenderer = new GorillaRenderer;
  gorillaRenderer = {};

  gameEngine = new GameEngine(canvas,
                              canvasContext,
                              banana,
                              gorillaCollisionDetector,
                              buildingCollisionDetector,
                              gorillaRenderer,
                              bananaRenderer,
                              terrainRenderer,
                              terrainConstructor)

  gameController = new GameController(windowObject,
                                      canvasElement,
                                      gameEngine)

  gameController.setupKeystrokeListener();
  gameController.initializeGameEngine();

})();
