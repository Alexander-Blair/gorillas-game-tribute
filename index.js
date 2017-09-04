(function() {
  'use strict';

  var gameController, gameEngine, game, player1, player2, userInputProcessor;
  var gorillaCollisionDetector, buildingCollisionDetector, updateDisplay, bananaMotion;
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

  player1 = new Player("Player1", gorillas[0]);
  player2 = new Player("Player2", gorillas[1]);
  game = new Game(player1, player2, spriteSheet);
  terrainRenderer = new TerrainRenderer(canvasContext, spriteSheet);
  terrainConstructor = Terrain;
  bananaRenderer = new BananaRenderer(canvasContext, spriteSheet);
  gorillaRenderer = new GorillaRenderer(canvasContext, spriteSheet);
  wind = new Wind();
  updateDisplay = new UpdateDisplay(canvas, canvasContext);
  userInputProcessor = new UserInputProcessor();
  bananaMotion = new BananaMotion(banana, wind);

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
                              wind,
                              updateDisplay,
                              userInputProcessor,
                              bananaMotion);


  gameController = new GameController(windowObject,
                                      gameEngine);

  gameController.setupKeystrokeListener();
  gameController.initializeGameEngine();

})();
