(function(exports) {
  'use strict';

  var miscKeyRange = {
    "min": 8,
    "max": 46,
  };
  var numberKeyRange = {
    "min": 48,
    "max": 57,
  };
  var upperLetterKeyRange = {
    "min": 65,
    "max": 90,
  };
  var lowerLetterKeyRange = {
    "min": 97,
    "max": 122,
  };
  exports.keyRanges = {
    "miscKeys": miscKeyRange,
    "numberKeys": numberKeyRange,
    "upperLetterKeys": upperLetterKeyRange,
    "lowerLetterKeys": lowerLetterKeyRange
  };
})(this);
