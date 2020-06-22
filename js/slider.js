'use strict';

(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');

  function initSlider(callback) {
    effectLevelPin.addEventListener('mousedown', function (event) {
      event.preventDefault();
      var sliderLineWidth = effectLevelLine.clientWidth;
      var MIN_PERCENT = 0;
      var MAX_PERCENT = 100;

      function getCoordX(coordEvent) {
        var coordX = ((coordEvent.clientX - effectLevelLine.getBoundingClientRect().left) * 100) / sliderLineWidth;

        if (coordX > MAX_PERCENT) {
          coordX = MAX_PERCENT;
        } else if (coordX < MIN_PERCENT) {
          coordX = MIN_PERCENT;
        }

        return coordX;
      }

      callback(getCoordX(event));

      function onMouseMove(moveEvent) {
        moveEvent.preventDefault();
        callback(getCoordX(moveEvent));
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
