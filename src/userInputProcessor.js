(function(exports) {
  'use strict';

  function UserInputProcessor() {
    this.gotPlayerOneName = false;
    this.gotPlayerTwoName = false;
    this.playerOneName = '';
    this.playerTwoName = '';
    this._bestOf = '';
    this.gotAngle = false;
    this.velocity = '';
    this.angle = '';
    this._gameStatus = "intro";
  }

  UserInputProcessor.prototype = {
    gameStatus: function() {
      return this._gameStatus;
    },
    updateStatus: function(status) {
      this._gameStatus = status;
    },
    bestOf: function() {
      return this._bestOf;
    },
    processNumber: function(key) {
      if(!this.introComplete) {
        if(this.gotPlayerTwoName) {
          this.append('_bestOf', key)
        }
      } else {
        if(this.gotAngle) { this.append('velocity', key); }
        else { this.append('angle', key); }
      }
    },
    append: function(property, value) {
      this[property] += value;
    },
    set: function(property, value) {

    },
    processLetter: function(key) {
      if(!this.introComplete) {
        if(this.gotPlayerTwoName) { return; }
        if(this.gotPlayerOneName) { this.append('playerTwoName', key); }
        else { this.append('playerOneName', key); }
      }
    },
    processMiscKey: function(keyCode) {
      if(keyCode === 13) {
        this.processEnter();
      } else if(keyCode === 8) {
        this.processBackspace();
      } else if(keyCode === 32) {
        this.processSpace();
      }
    },
    deleteLastChar: function(property) {
      this[property] = this[property].substring(0, this[property].length - 1);
    },
    processEnter: function() {
      this.introComplete ? this.processGameEnter() : this.processIntroEnter();
    },
    processGameEnter: function() {
      if(this.gotAngle && this.velocity.length > 0) {
        this.updateStatus("readyToThrow");
      } else if(!this.gotAngle && this.angle.length > 0) {
        this.gotAngle = true;
      }
    },
    processIntroEnter: function() {
      if(this.gotPlayerTwoName) {
        this.introComplete = true;
        this.updateStatus("waiting");
      }
      else if(this.gotPlayerOneName) { this.gotPlayerTwoName = true; }
      else { this.gotPlayerOneName = true; }
    },
    processBackspace: function() {
      if(!this.introComplete) {
        this.processIntroBackspace();
      } else {
        this.processGameBackSpace();
      }
    },
    processGameBackSpace: function() {
      if(this.gotAngle) {
        this.deleteLastChar('velocity')
      } else {
        this.deleteLastChar('angle')
      }
    },
    processIntroBackspace: function() {
      if(this.gotPlayerTwoName) { this.deleteLastChar('_bestOf'); }
      else if(this.gotPlayerOneName) {
        this.deleteLastChar('playerTwoName')
      }
      else { this.deleteLastChar('playerOneName') }
    },

    resetChoices: function() {
      this.gotAngle = false;
      this.angle = ''; this.velocity = '';
    }
  }
  exports.UserInputProcessor = UserInputProcessor;
})(this);
