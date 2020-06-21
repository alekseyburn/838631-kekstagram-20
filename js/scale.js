'use strict';

(function () {
  var scaleControlInput = document.querySelector('.scale__control--value');
  var scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;

  function initScale() {
    function changePictureScale(value) {
      scaleControlInput.value = value + '%';
      window.filter.imgUploadPreview.style.transform = 'scale(' + (value / 100) + ')';
    }

    scaleControlSmallerButton.addEventListener('click', function () {
      var scaleValue = Number(scaleControlInput.value.slice(0, -1));
      scaleValue -= SCALE_STEP;

      if (scaleValue <= MIN_SCALE_VALUE) {
        scaleValue = MIN_SCALE_VALUE;
      }

      changePictureScale(scaleValue);
    });
    scaleControlBiggerButton.addEventListener('click', function () {
      var scaleValue = Number(scaleControlInput.value.slice(0, -1));
      scaleValue += SCALE_STEP;

      if (scaleValue > MAX_SCALE_VALUE) {
        scaleValue = MAX_SCALE_VALUE;
      }

      changePictureScale(scaleValue);
    });
  }

  window.scale = {
    initScale: initScale
  };
})();
