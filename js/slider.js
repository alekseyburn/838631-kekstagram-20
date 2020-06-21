'use strict';

(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');

  function initSlider(callback) {
    effectLevelPin.addEventListener('mousedown', function (event) {
      event.preventDefault();
      var sliderLineWidth = effectLevelLine.clientWidth;
      var startCoordX = event.clientX;
      var MIN_PERCENT = 0;
      var MAX_PERCENT = 100;

      function onMouseMove(moveEvent) {
        moveEvent.preventDefault();
        var shiftCoordX = startCoordX - moveEvent.clientX;
        startCoordX = moveEvent.clientX;

        var pinXpercentage = ((effectLevelPin.offsetLeft - shiftCoordX) * 100) / sliderLineWidth;
        if (pinXpercentage > MAX_PERCENT) {
          pinXpercentage = MAX_PERCENT;
        } else if (pinXpercentage < MIN_PERCENT) {
          pinXpercentage = MIN_PERCENT;
        }

        callback(pinXpercentage);
      }

      function onMouseUp(upEvent) {
        upEvent.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  window.slider = {
    initSlider: initSlider
  };
})();
