(function() {
  var canvas, context, x, y, dx, dy;
  var gravity, airResistance, xdecel;
  var banana, rectangle, collisionDetector;

  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  dx = -7;
  dy = -6;
  gravity= 0;
  airResistance = 0;
  xdecel = 0.02;

  banana = {
    xCoord: 800,
    yCoord: 550
  }
  rectangle = {
    leftXCoord: 175,
    topYCoord: 450,
    width: 100,
    height: 150
  }
  collisionDetector = new CollisionDetector(rectangle)

  function drawBall() {
    context.beginPath();
    context.arc(banana.xCoord, banana.yCoord, 10, 0, Math.PI * 1.5, false);
    context.fillStyle = 'yellow';
    context.fill();
  }
  function drawRect() {
    var rect = collisionDetector.rectangle()
    context.beginPath();
    context.rect(rect.leftXCoord,
                 rect.topYCoord,
                 rect.width,
                 rect.height);
    context.fillStyle = 'red';
    context.fill();
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRect();
    if(dx + airResistance < 0) {
      banana.xCoord += dx + airResistance;
    }
    banana.yCoord += dy + gravity;
    gravity+= 0.1;
    airResistance += xdecel;
    if(collisionDetector.isHit(banana)) {
      freeze()
    }
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
