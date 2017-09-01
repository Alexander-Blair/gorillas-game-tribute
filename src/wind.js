(function(exports){
  'use strict';

  function Wind() {
    this.x = 0;
    this.y = 0;
    this.wind = 0;
    this.windArrow = "";
  }

  Wind.prototype = {
    generateWind: function(terrainUnitWidth, terrainUnitHeight) {
      this.wind = ((Math.random() * 2) - 1) / 10;
      this.generateWindCoords(terrainUnitWidth, terrainUnitHeight);
    },
    generateWindCoords: function(terrainUnitWidth, terrainUnitHeight) {
      this.x = (terrainUnitWidth * 50) / 2;
      this.y = (terrainUnitHeight * 48);
    },
    drawArrow: function(context, fromx, fromy, tox, toy){
      //variables to be used when creating the arrow
      var headlen = 10;
      var angle = Math.atan2(toy-fromy,tox-fromx);

      //starting path of the arrow from the start square to the end square and drawing the stroke
      context.beginPath();
      context.moveTo(fromx, fromy);
      context.lineTo(tox, toy);
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();

      //starting a new path from the head of the arrow to one of the sides of the point
      context.beginPath();
      context.moveTo(tox, toy);
      context.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

      //path from the side point of the arrow, to the other side point
      context.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

      //path from the side point back to the tip of the arrow, and then again to the opposite side point
      context.lineTo(tox, toy);
      context.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

      //draws the paths created above
      context.strokeStyle = "black";
      context.lineWidth = 2;
      context.stroke();
      context.fillStyle = "black";
      context.fill();
    }
  };

  exports.Wind = Wind;
})(this);
