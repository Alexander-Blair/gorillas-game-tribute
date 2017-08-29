(function() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var x = 800;
  var y = 550;
  var dx = -6.2;
  var dy = -6;
  var gravity= 0;
  var airResistance = 0;
  var xdecel = 0.02;


  function drawBall() {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 1.5, false);
    context.fillStyle = 'green';
    context.fill();
  }
  function drawRect() {
    context.beginPath();
    context.rect(175, 500, 50, 100);
    context.fillStyle = 'red';
    context.fill();
  }

  function collisionDetector(leftXCoord, rightXCoord, topYCoord, bottomYCoord) {
    if (x < rightXCoord + 10 && x > leftXCoord - 10) {
      if (y < bottomYCoord + 10 && y > topYCoord + 10) {
        dx = 0;
        dy = 0;
        gravity = 0;
        airResistance = 0;
        xdecel = 0;
      }
    }
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawRect();
    if(dx + airResistance < 0) {
      x += dx + airResistance;
    }
    y += dy + gravity;
    gravity+= 0.1;
    airResistance += xdecel;
    collisionDetector();
  }

  setInterval(draw, 20);
})();
