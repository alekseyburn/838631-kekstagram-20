'use strict';

(function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgEffectsContainer = document.querySelector('.effects__list');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevelSlider.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelSlider.querySelector('.effect-level__depth');
  var effectLevelInput = effectLevelSlider.querySelector('.effect-level__value');
  var ORIGINAL_IMAGE_EFFECT = 'none';
  var INITIAL_FILTER_VALUE = 100;

  function showSlider() {
    window.utils.removeClass(effectLevelSlider, 'hidden');
  }

  function hideSlider() {
    window.utils.addClass(effectLevelSlider, 'hidden');
  }

  function onFilterChange(event) {
    imgUploadPreview.className = '';
    imgUploadPreview.style.filter = null;
    window.utils.addClass(imgUploadPreview, 'effects__preview--' + event.target.value);
    effectLevelInput.value = INITIAL_FILTER_VALUE;
    effectLevelPin.style.left = INITIAL_FILTER_VALUE + '%';
    effectLevelDepth.style.width = INITIAL_FILTER_VALUE + '%';

    if (event.target.value === ORIGINAL_IMAGE_EFFECT) {
      hideSlider();
    } else {
      showSlider();
    }
  }

  imgEffectsContainer.addEventListener('change', onFilterChange);

  function onEffectLevelChange(value) {
    effectLevelPin.style.left = value + '%';
    effectLevelDepth.style.width = value + '%';
    effectLevelInput.value = Math.floor(value);

    switch (imgUploadPreview.className) {
      case 'effects__preview--chrome':
        imgUploadPreview.style.filter = 'grayscale(' + (effectLevelInput.value / 100) + ')';
        break;
      case 'effects__preview--sepia':
        imgUploadPreview.style.filter = 'sepia(' + (effectLevelInput.value / 100) + ')';
        break;
      case 'effects__preview--marvin':
        imgUploadPreview.style.filter = 'invert(' + effectLevelInput.value + '%)';
        break;
      case 'effects__preview--phobos':
        imgUploadPreview.style.filter = 'blur(' + (effectLevelInput.value * 3 / 100) + 'px)';
        break;
      case 'effects__preview--heat':
        var resultInputValue = effectLevelInput.value * 3 / 100;
        resultInputValue = (resultInputValue < 1) ? 1 : resultInputValue;
        imgUploadPreview.style.filter = 'brightness(' + resultInputValue + ')';
        break;
      default:
        imgUploadPreview.style.filter = null;
    }
  }

  window.slider.initSlider(onEffectLevelChange);

  window.filter = {
    effectLevelInput: effectLevelInput,
    imgUploadPreview: imgUploadPreview,
    hideSlider: hideSlider
  };
})();
