(function() {
  'use strict';

  var gameController, gameEngine;
  var gorillaCollisionDetector, buildingCollisionDetector;
  var terrainConstructor, terrainRenderer, gorillaRenderer, bananaRenderer;
  var banana, gorillas, canvasElement, canvasContext, windowObject;
  windowObject = window;
  canvasElement = document.getElementById("canvas");
  canvasContext = canvasElement.getContext('2d');

  banana = new Banana();
  gorillas = [];
  gorillas.push(new Gorilla());
  gorillas.push(new Gorilla());

  gorillaCollisionDetector = new GorillaCollisionDetector();
  // buildingCollisionDetector = new BuildingCollisionDetector;
  buildingCollisionDetector = {};
  terrainRenderer = new TerrainRenderer(canvasContext);
  terrainConstructor = Terrain;
  bananaRenderer = new BananaRenderer(canvasContext);
  gorillaRenderer = new GorillaRenderer(canvasContext);

  gameEngine = new GameEngine(canvasElement,
                              canvasContext,
                              banana,
                              gorillas,
                              gorillaCollisionDetector,
                              buildingCollisionDetector,
                              gorillaRenderer,
                              bananaRenderer,
                              terrainRenderer,
                              terrainConstructor);

  gameController = new GameController(windowObject,
                                      gameEngine);

  gameController.setupKeystrokeListener();
  gameController.initializeGameEngine();

})();
