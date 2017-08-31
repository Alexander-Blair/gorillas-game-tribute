describe("GameController", function() {
  var mockWindow, mockCanvasElement, mockGameEngine, gameController;

  function MockWindow() {
    this.addEventListenerCallCount = 0;
  }
  MockWindow.prototype = {
    addEventListener: function() {
      this.addEventListenerCallCount++
      this.addEventListenerArguments = arguments;
    }
  }
  mockWindow = new MockWindow();
  mockGameEngine = jasmine.createSpyObj("gameEngine", ["processNumber", "processMiscKey", "initialize"])
  gameController = new GameController(mockWindow, mockGameEngine)

  gameController.setupKeystrokeListener();
  it("sets up an event listener", function() {
    expect(mockWindow.addEventListenerCallCount).toEqual(1);
  });
  it("asks window to listen for a keydown event", function() {
    expect(mockWindow.addEventListenerArguments[0]).toEqual("keydown");
  });

  gameController.initializeGameEngine();
  it("initializes the game engine", function() {
    expect(mockGameEngine.initialize).toHaveBeenCalled();
  });

  gameController.delegateKeyStroke(48);
  it("asks game engine to process a number code", function() {
    expect(mockGameEngine.processNumber).toHaveBeenCalledWith(String.fromCharCode(48));
  });

  gameController.delegateKeyStroke(8);
  it("asks game engine to process a misc key (i.e. enter, space) code", function() {
    expect(mockGameEngine.processMiscKey).toHaveBeenCalledWith(8);
  });
});
