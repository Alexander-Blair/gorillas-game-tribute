(function() {
  'use strict';

  var gameController, gameEngine, game;
  var gorillaCollisionDetector, buildingCollisionDetector;
  var terrainConstructor, terrainRenderer, gorillaRenderer, bananaRenderer;
  var banana, gorillas, canvasElement, canvasContext, windowObject;
  windowObject = window;
  canvasElement = document.getElementById("canvas");
  canvasContext = canvasElement.getContext('2d');

  game = new Game();

  banana = new Banana();
  gorillas = [];
  gorillas.push(new Gorilla());
  gorillas.push(new Gorilla());

  gorillaCollisionDetector = new GorillaCollisionDetector();
  buildingCollisionDetector = new CollisionDetector();

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
                              terrainConstructor,
                              game);

  gameController = new GameController(windowObject,
                                      gameEngine);

  gameController.setupKeystrokeListener();
  gameController.initializeGameEngine();

})();
