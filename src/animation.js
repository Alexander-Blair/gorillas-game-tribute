/**
  A simple animation object.
*/
function AnimationData(frames, options) {
  this.frames = frames || [{ x: 0, y: 0, w: 0, h: 0, length: 0 }];
  this.options = options || {
    repeats: false,
    keyframe: 0
  };
}

/**
  Each object would have one of these to play any animation back.
*/
function AnimationPlayer(animation) {
  var ani = animation || new AnimationData();
  this.length = 0;
  this.frame = undefined;
  this.index = 0;
  this.elapsed = 0;

  this.setAnimation(ani);
  this.reset();
}

AnimationPlayer.prototype.reset = function() {
  this.elapsed = 0;
  this.index = 0;
  this.frame = this.animation.frames[this.index];
};

AnimationPlayer.prototype.update = function(dt) {
  this.elapsed = this.elapsed + dt;

  if(this.elapsed >= this.frame.length) {
    this.index++;
    this.elapsed = this.elapsed - this.frame.length;
  }

  if(this.index >= this.length) {
    if(this.animation.options.repeats) {
      this.index = this.animation.options.keyframe;
    } else {
      this.index--;
    }
  }

  this.frame = this.animation.frames[this.index];
};

AnimationPlayer.prototype.setAnimation = function(animation, reset) {
  this.animation = animation;
  this.length = this.animation.frames.length;
};
