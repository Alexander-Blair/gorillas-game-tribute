(function(exports){
  'use strict';

  function Wind() {
    this.x = 0;
    this.y = 0;
    this.wind = 0;
    this.windArrow = "";
  }

  Wind.prototype = {
    generateWind: function() {
      this.wind = ((Math.random() * 2) - 1) / 10;
    },
    generateWindArrow: function(terrainUnitWidth, terrainUnitHeight) {
      var windArrow = "-".repeat(Math.floor((Math.abs(this.wind) * 100))) ;
      if(this.wind > 0) {
        console.log(terrainUnitWidth)
        this.windArrow = windArrow + ">";
        this.x = (terrainUnitWidth * 50) / 2;
        this.y = (terrainUnitHeight * 48);
      } else if(this.wind < 0) {
        this.windArrow = "<" + windArrow;
        this.x = ((terrainUnitWidth * 50) / 2) - (windArrow.length * 5) - 10;
        this.y = (terrainUnitHeight * 48);
      } else return;
    }
  };

  exports.Wind = Wind;
})(this);
