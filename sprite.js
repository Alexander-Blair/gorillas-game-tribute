'use strict';

function Sprite (context, width, height, image) {
  this.context = context
  this.width = width
  this.height = height
  this.image = image
}

Sprite.prototype.render = function() {
   this.context.drawImage(
      this.image,
      115,
      0,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height);
};


var gorillaImage = new Image();
gorillaImage.src = "./images/gorillasSpritesheet.png";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d")

var gorilla = new Sprite(context,50,50,gorillaImage);
gorilla.render();
