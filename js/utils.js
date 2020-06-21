'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    addClass: function (item, className) {
      item.classList.add(className);
    },
    removeClass: function (item, className) {
      item.classList.remove(className);
    },
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },
    shuffleArray: function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }

      return arr;
    },
    isEscEvent: function (event, callback) {
      if (event.keyCode === ESC_KEYCODE) {
        callback();
      }
    },
    isEnterEvent: function (event, callback) {
      if (event.keyCode === ENTER_KEYCODE) {
        callback();
      }
    }
  };
})();
