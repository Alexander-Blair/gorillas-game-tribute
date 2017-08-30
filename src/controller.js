(function() {
  var canvas, context, dx, dy, gravity;
  var banana, gorillas, collisionDetector;
  var velocity = '';
  var gotAngle = false;
  var angle = '';
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
      if(gotAngle) {
        velocity += key;
      } else {
        angle += key;
      }
    }
  });

  var enterListener = window.addEventListener("keypress", function(event) {
    var miscKeys = keyRanges.miscKeys;
    var key = String.fromCharCode(event.which);
    if(event.which >= miscKeys.min && event.which <= miscKeys.max) {
      if(key === "\r") {
        if(gotAngle && velocity.length > 0) {
          banana.set(bananaStartXCoord, bananaStartYCoord)
          unfreeze(velocity, angle);
          run = true;
          gotAngle = false;
        } else if(!gotAngle && angle.length > 0) {
          gotAngle = true;
        }
      }
    }
  });

  terrain = new Terrain(terrainUnitWidth, terrainUnitHeight);
  terrainRenderer = new TerrainRenderer(context);
  terrainTileMap = terrain.generate();
  terrainCoordArray = terrainRenderer.generateCoordArray(terrainTileMap);

  // draw functions to be extracted
  function drawVelocity() {
    context.font = "16px Arial";
    context.fillText("Velocity: " + velocity, 10, 100);
  }

  function drawAngle() {
    context.font = "16px Arial";
    context.fillText("Angle: " + angle, 10, 50);
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
    terrainRenderer.fillBlocks(terrainCoordArray);
    drawGorillas();
    if (run === true) {
      if(gorillaCollisionDetector.isHit(gorillas[1], banana)) {
        run = false
        return
      }
      drawBall();
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
      freeze();
      drawAngle();
      if(gotAngle) {
        drawVelocity();
      }
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
  function unfreeze(shotVelocity, shotAngle) {
    dx = -(shotVelocity / 5 * Math.cos(shotAngle * (Math.PI / 180)));
    dy = -(shotVelocity / 5 * Math.sin(shotAngle * (Math.PI / 180)));
    gravity = 0;
    velocity = '';
    angle = '';
  }

  setInterval(draw, 20);
})();
