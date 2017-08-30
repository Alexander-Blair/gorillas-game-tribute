(function() {
  var canvas, context, dx, dy, gravity, xdecel;
  var banana, gorillas, collisionDetector;
  var velocity = '';
  var run = false;
  var terrainUnitWidth = 20;
  var terrainUnitHeight = 12;
  var bananaStartXCoord = 860;
  var bananaStartYCoord = 540;

  document.getElementById("canvas").outerHTML = '<canvas id="canvas" width="' + String(terrainUnitWidth * 50) + '" height="' + String(terrainUnitHeight * 50) + '" style="background-color: lightblue"></canvas>';
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  gorillas = [];
  gorillas.push(new Gorilla(800, 550))
  gorillas.push(new Gorilla(200, 550))
  banana = new Banana(bananaStartXCoord, bananaStartYCoord)
  gorillaCollisionDetector = new GorillaCollisionDetector();

  var numberListener = window.addEventListener("keypress", function(event) {
    var numKeys = keyRanges.numberKeys;
    var key = String.fromCharCode(event.which);
    if(event.which >= numKeys.min && event.which <= numKeys.max) {
      velocity += key;
    }
  });

  var enterListener = window.addEventListener("keypress", function(event) {
    var miscKeys = keyRanges.miscKeys;
    var key = String.fromCharCode(event.which);
    if(event.which >= miscKeys.min && event.which <= miscKeys.max) {
      if(key === "\r") {
        unfreeze();
        run = true;
        banana.set(bananaStartXCoord, bananaStartYCoord)
      }
    }
  });

  terrain = new Terrain(terrainUnitWidth, terrainUnitHeight);
  terrainRenderer = new TerrainRenderer(context);
  terrainTileMap = terrain.generate();
  terrainCoordArray = terrainRenderer.generateCoordArray(terrainTileMap);

  // draw functions to be extracted
  function drawText() {
    context.font = "16px Arial";
    context.fillText("Velocity: " + velocity, 10, 50);
  }

  function drawBall() {
    context.beginPath();
    context.rect(banana.xCoord(), banana.yCoord(), 20, 20);
    context.fillStyle = 'yellow';
    context.fill();
  }
  function drawGorillas() {
    for(var i = 0; i < 2; i++) {
      context.beginPath();
      context.rect(gorillas[i].xCoord(),
        gorillas[i].yCoord(),
        gorillas[i].width(),
        gorillas[i].height());
        context.fillStyle = 'gray';
        context.fill();
    }
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGorillas();
    if (run === true) {
      drawBall();
      if(gorillaCollisionDetector.isHit(gorillas[1], banana)) { run = false }
      // terrainRenderer.fillBlocks(terrainCoordArray);
      if(banana.yCoord() > 600) {
        run = false;
      }
      if(dx < 0) {
        banana._xCoord += dx;
      }
      banana._yCoord += dy + gravity;
      gravity+= 0.3;
    } else {
      freeze();
      drawText();
      drawBall();
    }
  }

  function freeze() {
    dx = 0;
    dy = 0;
    gravity = 0;
    xdecel = 0;
  }
// movement to be extracted
  function unfreeze() {
    dx = -9.6;
    dy = -9.6;
    gravity= 0;
    xdecel = 0.02;
    velocity = '';
  }

  setInterval(draw, 20);
})();
