'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function addClass(item, className) {
    item.classList.add(className);
  }

  function removeClass(item, className) {
    item.classList.remove(className);
  }

  function shuffleArray(arr) {
    var copiedArray = arr.slice();

    for (var i = copiedArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copiedArray[i];
      copiedArray[i] = copiedArray[j];
      copiedArray[j] = temp;
    }

    return copiedArray;
  }

  function isEscEvent(event, callback) {
    if (event.keyCode === ESC_KEYCODE) {
      callback();
    }
  }

  function isEnterEvent(event, callback) {
    if (event.keyCode === ENTER_KEYCODE) {
      callback();
    }
  }

  window.utils = {
    addClass: addClass,
    removeClass: removeClass,
    shuffleArray: shuffleArray,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
