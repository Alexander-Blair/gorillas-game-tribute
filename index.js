(function() {
  'use strict';

  var gameController, gameEngine, game, player1, player2;
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

  player1 = new Player("Dave", gorillas[0]);
  player2 = new Player("Jim", gorillas[1]);

  game = new Game(player1, player2);

  gorillaCollisionDetector = new GorillaCollisionDetector();
  buildingCollisionDetector = new CollisionDetector();

  terrainRenderer = new TerrainRenderer(canvasContext);
  terrainConstructor = Terrain;
  bananaRenderer = new BananaRenderer(canvasContext);
  gorillaRenderer = new GorillaRenderer(canvasContext);
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
                              game,
                              wind);


  gameController = new GameController(windowObject,
                                      gameEngine);

  gameController.setupKeystrokeListener();
  gameController.initializeGameEngine();

})();
