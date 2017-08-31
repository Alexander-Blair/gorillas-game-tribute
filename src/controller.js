(function() {
  var canvas, context, x, y, dx, dy;
  var gravity, airResistance, xdecel;
  var banana, rectangle, collisionDetector;
  var numberText = "Velocity: ";
  var terrainUnitWidth = 30;
  var terrainUnitHeight = 18;

  document.getElementById("canvas").outerHTML = '<canvas id="canvas" width="' + String(terrainUnitWidth * 50) + '" height="' + String(terrainUnitHeight * 50) + '" style="background-color: lightblue"></canvas>';
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  // movement constants to be extracted
  dx = -7;
  dy = -6;
  gravity= 0;
  airResistance = 0;
  xdecel = 0.02;

  // objects to be extracted
  banana = {
    xCoord: 950,
    yCoord: 300
  };
  rectangle = {
    leftXCoord: 175,
    topYCoord: 450,
    width: 100,
    height: 150
  };

  collisionDetector = new CollisionDetector();

  var numberListener = window.addEventListener("keypress", function(event) {
    var numKeys = keyHashes.numberKeys;
    if(event.which >= numKeys.min && event.which <= numKeys.max) {
      numberText += numKeys[event.which];
    }
  });

  var enterListener = window.addEventListener("keypress", function(event) {
    var miscKeys = keyHashes.miscKeys;
    if(event.which >= miscKeys.min && event.which <= miscKeys.max) {
      if(miscKeys[event.which] === "enter") {
        console.log('you pressed enter!');
      }
    }
  });

  var terrain = new Terrain(terrainUnitWidth, terrainUnitHeight);
  var terrainRenderer = new TerrainRenderer(context);
  terrain.generate();
  var colourArray = terrain.colourArray;
  var terrainTileArray = terrain.tileArray;
  var terrainCoordArray = terrainRenderer.generateCoordArray(terrainTileArray);

  // draw functions to be extracted
  function drawText() {
    context.font = "16px Arial";
    context.fillText(numberText, 10, 50);
  }

  function drawBall() {
    context.beginPath();
    context.arc(banana.xCoord, banana.yCoord, 10, 0, Math.PI * 1.5, false);
    context.fillStyle = 'yellow';
    context.fill();
  }
  function drawRect() {
    context.beginPath();
    context.rect(rectangle.leftXCoord,
                 rectangle.topYCoord,
                 rectangle.width,
                 rectangle.height);
    context.fillStyle = 'red';
    context.fill();
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawText();
    drawBall();
    terrainRenderer.fillBlocks(terrainCoordArray, colourArray);
    if(dx + airResistance < 0) {
      banana.xCoord += dx + airResistance;
    }
    banana.yCoord += dy + gravity;
    gravity+= 0.1;
    airResistance += xdecel;
    // if(collisionDetector.isHit(rectangle, banana)) {
    //   freeze();
    // }
  }

  function freeze() {
    dx = 0;
    dy = 0;
    gravity = 0;
    airResistance = 0;
    xdecel = 0;
  }

  setInterval(draw, 20);
})();
