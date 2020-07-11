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
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
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
